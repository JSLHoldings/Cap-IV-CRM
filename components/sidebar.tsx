"use client"

import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "marketplace", label: "Marketplace" },
    { id: "deals", label: "All deals" },
    { id: "calculator", label: "Calculator" },
    { id: "account", label: "Account" },
  ]

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">JSL CRM</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            className={`w-full justify-start text-left font-medium ${
              activeView === item.id
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => onViewChange(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  )
}
