import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        return new NextResponse(`Webhook Error: ${(error as Error).message}`, { status: 400 });
    }

    // Helper: update or create subscription
    const upsertSubscription = async (subscription: Stripe.Subscription, userId?: string) => {
        const existingRecord = await db.query.userSubscription.findFirst({
            where: eq(userSubscription.stripeSubscriptionId, subscription.id),
        });

        if (!existingRecord) {
            if (!userId) {
                throw new Error("User ID is required to create subscription");
            }

            await db.insert(userSubscription).values({
                userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
            });
        } else {
            await db.update(userSubscription)
                .set({
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                })
                .where(eq(userSubscription.stripeSubscriptionId, subscription.id));
        }
    };

    try {
        switch (event.type) {

            // ✅ Checkout completed → create subscription if new
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const subscriptionId = session.subscription as string;

                if (!session.metadata?.userId) {
                    return new NextResponse("User ID missing in metadata", { status: 400 });
                }

                const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                await upsertSubscription(subscription, session.metadata.userId);
                break;
            }

            // ✅ Subscription created (from API or Checkout)
            case "customer.subscription.created": {
                const subscription = event.data.object as Stripe.Subscription;
                await upsertSubscription(subscription);
                break;
            }

            // ✅ Subscription updated (upgrade/downgrade/trial end)
            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                await upsertSubscription(subscription);
                break;
            }

            // ✅ Subscription canceled / deleted
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                await db.delete(userSubscription)
                    .where(eq(userSubscription.stripeSubscriptionId, subscription.id));
                break;
            }

            // ✅ Recurring payment succeeded → update period end
            case "invoice.payment_succeeded": {
                const invoice = event.data.object;

                // Check if invoice is a Stripe.Invoice and has a subscription
                if ("subscription" in invoice && typeof invoice.subscription === "string") {
                    const subscriptionId = invoice.subscription;

                    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                    await upsertSubscription(subscription);
                }

                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return new NextResponse("Success", { status: 200 });

    } catch (error) {
        return new NextResponse(`Webhook processing error: ${(error as Error).message}`, { status: 500 });
    }
}
