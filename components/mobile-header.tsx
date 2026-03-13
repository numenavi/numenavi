import { getUserProgress, getUserSubscription } from "@/db/queries";
import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
    ]);

    if (!userProgress) {
        return (
            <nav className="lg:hidden px-6 h-12.5 flex items-center bg-[#9B6DFF] border-b fixed top-0 w-full z-50">
                <MobileSidebar 
                    hearts={0}
                    points={0}
                    hasActiveSubscription={false}
                    streak={0}
                />
            </nav>
        );
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <nav className="lg:hidden px-6 h-12.5 flex items-center bg-[#9B6DFF] border-b fixed top-0 w-full z-50">
            <MobileSidebar 
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={isPro}
                streak={userProgress.streak}
            />
        </nav>
    );
};