"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"
import { Menu } from "lucide-react"

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Menu className="text-white relative z-50" />
        </button>
      </SheetTrigger>

      <SheetContent side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}