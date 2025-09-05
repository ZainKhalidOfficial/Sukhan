import { 
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle
 } from "./ui/sheet";

import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const MobileSidebar = () => {
    return ( 
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side="left"> 
                <VisuallyHidden> {/* Radix requires a <SheetTitle> for accessibility. Hidden since no visible title is needed. */}
                    <SheetHeader>
                        <SheetTitle>Mobile Sidebar</SheetTitle>
                    </SheetHeader>
                </VisuallyHidden>

                <Sidebar />
            </SheetContent>
        </Sheet>
     );
}
 