"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "@/lib/utils"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal {...props} />
}

interface DropdownMenuContentProps extends MenuPrimitive.Popup.Props {
  align?: "start" | "center" | "end"
  sideOffset?: number
}

function DropdownMenuContent({
  className,
  align = "end",
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPortal>
      <MenuPrimitive.Positioner align={align} sideOffset={sideOffset}>
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 min-w-[10rem] overflow-hidden rounded-xl border border-border bg-popover/95 p-1 text-popover-foreground shadow-md transition duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:scale-95 data-starting-style:scale-95 supports-backdrop-filter:backdrop-blur-sm",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </DropdownMenuPortal>
  )
}

function DropdownMenuItem({
  className,
  ...props
}: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-xs font-medium outline-none transition-colors hover:bg-muted/70 hover:text-foreground focus:bg-muted/70 focus:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
}
