import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        default: "bg-white text-black border-slate-200 border-2 border-b-[4px] active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary: "bg-[#9bcfda] text-primary-foreground hover:bg-[#9bcfda]/90 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-[#9bcfda] hover:bg-slate-100",
        secondary: "bg-[#9B6DFF] text-primary-foreground hover:bg-[#9B6DFFE6] border-[#8658E6] border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-[#9B6DFF] hover:bg-slate-100",
        danger: "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
        ghost: "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
        sidebar: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
        sidebarOutline: "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",
        green: "bg-green-500 text-primary-foreground hover:bg-green/90 border-green-600 border-b-4 active:border-b-0",
        premium:
  "bg-gradient-to-b from-[#60A5FA] to-[#7C3AED] text-primary-foreground hover:from-[#3B82F6] hover:to-[#6D28D9] border-[#6D28D9] border-b-4 active:border-b-0 shadow-md",

premiumOutline:
  "bg-white text-[#7C3AED] border-[#7C3AED] border-2 hover:bg-gradient-to-b hover:from-[#EFF6FF] hover:to-[#F3E8FF]",
  ghostTrans: "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100/10",
      },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
