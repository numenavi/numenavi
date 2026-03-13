import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
};

export const Header = ({
    hearts,
    percentage,
    hasActiveSubscription,
}: Props) => {
    const { open } = useExitModal();

    return (
        <header className="lg:pt-12.5 pt-5 px-10 flex gap-x-7 items-center justify-between max-w-285 mx-auto w-full">
            <X 
                onClick={open}
                className="text-slate-500 hover:opacity-75 transition cursor-pointer"
            />
            <Progress value={percentage} />
            <div className={hasActiveSubscription ? "text-gradient-to-b from-[#60A5FA] to-[#7C3AED] flex items-center font-bold" : "text-blue-500 flex items-center font-bold"}>
                <Image 
                    src={hasActiveSubscription ? "/heart-premium.svg" : "/heart.svg"}
                    height={28}
                    width={28}
                    alt="Heart"
                    className="mr-2"
                />
                {hasActiveSubscription 
                ? <InfinityIcon className="h-6 w-6 stroke-3 shrink-0" /> 
                :hearts
                }
            </div>
        </header>
    );
};