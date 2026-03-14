// mobile-header.tsx
import { getUserProgress, getUserSubscription } from "@/db/queries"
import { MobileSidebar } from "./mobile-sidebar"
import { InfinityIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"

export default async function MobileHeader() {
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ])

  const isPro = !!userSubscription?.isActive
  const hearts = userProgress?.hearts ?? 0
  const points = userProgress?.points ?? 0
  const streak = userProgress?.streak ?? 0

  return (
    <nav className="lg:hidden px-6 h-12.5 flex items-center bg-[#9B6DFF] border-b fixed top-0 w-full z-50">
      <MobileSidebar />

      <div className="ml-auto flex items-center gap-2">
        <Link href="/quests">
          <Button variant="ghostTrans" className="text-orange-200">
            <Image src="/points.svg" height={28} width={28} alt="Points" className="mr-2" />
            {points}
          </Button>
        </Link>

        <Link href="/shop">
          <Button
            variant="ghostTrans"
            className={isPro ? "text-gradient-to-b from-[#60A5FA] to-[#7C3AED]" : "text-blue-200"}
          >
            <Image
              src={isPro ? "/heart-premium.svg" : "/heart.svg"}
              height={22}
              width={22}
              alt="Hearts"
              className="mr-2"
            />
            {isPro ? <InfinityIcon className="h-4 w-4 stroke-3" /> : hearts}
          </Button>
        </Link>

        <Link href="/learn">
          <Button variant="ghostTrans" className="text-rose-200">
            <Image src={streak > 0 ? "/fire.svg" : "/fire_0.svg"} height={28} width={28} alt="Fire" className="mr-2" />
            {streak}
          </Button>
        </Link>
      </div>
    </nav>
  )
}