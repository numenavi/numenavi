import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { InfinityIcon, Loader, Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
    streak: number;
};

export const MobileSidebar = ({ points, hearts, hasActiveSubscription, streak }: Props) => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white z-101 relative" />
            </SheetTrigger>
            <SheetContent className="p-0 z-100" side="left" >
                <SheetTitle>
                    <VisuallyHidden>Sidebar</VisuallyHidden>
                </SheetTitle>
                <Sidebar className="mt-5"/>
            </SheetContent>
            <div className="absolute left-0 right-0 top-0 flex items-center justify-end px-4 py-0.5">
                <Link href="/quests">
                    <Button variant="ghostTrans" className="text-orange-200">
                        <Image src="/points.svg" height={28} width={28} alt="Points" className="mr-2" />
                        {points}
                    </Button>
                </Link>
                <Link href="/shop">
                    <Button variant="ghostTrans" className={hasActiveSubscription ? "text-gradient-to-b from-[#60A5FA] to-[#7C3AED]" : "text-blue-200"}>
                        <Image src={hasActiveSubscription ? "/heart-premium.svg" : "/heart.svg"} height={22} width={22} alt="Hearts" className="mr-2" />
                        {hasActiveSubscription 
                        ? <InfinityIcon className="h-4 w-4 stroke-3" /> 
                        : hearts
                        }
                    </Button>
                </Link>
                <Link href="/learn">
                    <Button variant="ghostTrans" className="text-rose-200">
                        <Image src={
                                streak > 0 ? "/fire.svg"
                                : "/fire_0.svg"
                            }
                            height={28} 
                            width={28} 
                            alt="Fire" 
                            className="mr-2" 
                        />
                        {streak}
                    </Button>
                </Link>
            </div>
        </Sheet>
    );
};