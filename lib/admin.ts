import { auth } from "@clerk/nextjs/server"

const allowedIds = [
    "user_35knFqTrDEo70Pj38pBlKCcvLmz",
];

export const getIsAdmin = async () => {
    const { userId } = await auth()

    if(!userId) {
        return false
    }

return allowedIds.indexOf(userId) !== -1
}