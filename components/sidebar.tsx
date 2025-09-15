"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", href: "/" },
    { id: "core", label: "CapIV Core", href: "/core" },
    { id: "access", label: "CapIV Access", href: "/access" },
    { id: "deals", label: "All deals", href: "/deals" },
    { id: "calculator", label: "Calculator", href: "/calculator" },
    { id: "account", label: "Account", href: "/account" },
  ]

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">CapIV</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={`w-full justify-start text-left font-medium ${
                pathname === item.href ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-600 text-white text-sm">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "User"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="w-full text-gray-700 hover:bg-gray-100 bg-transparent"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}
