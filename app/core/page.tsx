"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { CapIVCore } from "@/components/capiv-core"
import { ProtectedRoute } from "@/components/protected-route"

export default function CorePage() {
  const [selectedInvestor, setSelectedInvestor] = useState<string | null>(null)
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <CapIVCore
            selectedInvestor={selectedInvestor}
            onInvestorSelect={setSelectedInvestor}
            onDealSelect={setSelectedDeal}
          />
        </div>
      </div>
    </ProtectedRoute>
  )
}
