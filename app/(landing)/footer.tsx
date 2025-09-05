import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return ( 
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-center h-full">
                <Button size="lg" variant={"ghost"}>
                    <Image 
                        src="/us.svg" 
                        alt="United States" 
                        height={32} 
                        width={40}
                        className="mr-4 rounded-md" />
                    United States
                </Button>
                <Button size="lg" variant={"ghost"} >
                    <Image 
                        src="/canada.svg" 
                        alt="Canada" 
                        height={32} 
                        width={40}
                        className="mr-4 rounded-md" />
                    Canada
                </Button>
                <Button size="lg" variant={"ghost"}>
                    <Image 
                        src="/uk.svg" 
                        alt="United Kingdom" 
                        height={32} 
                        width={40}
                        className="mr-4 rounded-md" />
                    United Kingdom
                </Button>
                <Button size="lg" variant={"ghost"}>
                    <Image 
                        src="/ireland.svg" 
                        alt="Ireland" 
                        height={32} 
                        width={40}
                        className="mr-4 rounded-md" />
                    Ireland
                </Button>
                <Button size="lg" variant={"ghost"}>
                    <Image 
                        src="/australia.svg" 
                        alt="Australia" 
                        height={32} 
                        width={40}
                        className="mr-4 rounded-md" />
                    Australia
                </Button>
            </div>
        </footer>
     );
}