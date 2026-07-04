import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-auto w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-3xl border border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-zinc-800 text-zinc-100 border border-zinc-700 [a]:hover:bg-zinc-700",
        secondary:
          "bg-zinc-900/60 text-zinc-300 border border-zinc-800 [a]:hover:bg-zinc-850",
        destructive:
          "bg-red-950/20 text-red-400 border border-red-900/50",
        outline:
          "border border-zinc-800 text-zinc-300 bg-zinc-950/40 [a]:hover:bg-zinc-850 [a]:hover:text-zinc-100",
        ghost:
          "hover:bg-zinc-900 hover:text-zinc-100",
        link: "text-zinc-200 underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
