"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { CapIVAccess } from "@/components/capiv-access"
import { ProtectedRoute } from "@/components/protected-route"

export default function AccessPage() {
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <CapIVAccess selectedDeal={selectedDeal} onDealSelect={setSelectedDeal} />
        </div>
      </div>
    </ProtectedRoute>
  )
}
