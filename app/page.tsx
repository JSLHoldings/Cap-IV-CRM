"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { Marketplace } from "@/components/marketplace"
import { Deals } from "@/components/deals"
import { Account } from "@/components/account"
import { CalculatorTools } from "@/components/calculator"

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "marketplace":
        return <Marketplace />
      case "deals":
        return <Deals />
      case "account":
        return <Account />
      case "calculator":
        return <CalculatorTools />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
