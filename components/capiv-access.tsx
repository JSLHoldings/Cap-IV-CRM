"use client"

import { useState } from "react"
import { Search, Menu, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CapIVAccessProps {
  selectedDeal: string | null
  onDealSelect: (deal: string | null) => void
}

const recommendedDeals = [
  {
    title: "Apartment Build",
    location: "Atlanta, TX",
    image: "/modern-apartment-building.png",
  },
  {
    title: "Shopping Center",
    location: "Bellaire, TX",
    image: "/bustling-shopping-center.png",
  },
  {
    title: "Apartment Building",
    location: "Atlanta, TX",
    image: "/modern-apartment-living.png",
  },
]

export function CapIVAccess({ selectedDeal, onDealSelect }: CapIVAccessProps) {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="w-full bg-white flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">CAPIV Access</h2>
          <div className="flex items-center gap-4">
            {selectedDeal ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search" className="pl-10 w-48" />
              </div>
            ) : (
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            )}
            <Menu className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border-b border-gray-200">
        <nav className="flex gap-6">
          {["Home", "Search", "Deals", "Projections", "Documents", "Messages"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.toLowerCase()
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-6">
        {selectedDeal ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Apartment Building</h1>
              <p className="text-gray-600 mb-4">Austin, TX</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500">Minimum</span>
                  <p className="font-semibold">$500,000</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Projected NOI</span>
                  <p className="font-semibold">Projected IPR 14.5%</p>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <Button className="bg-blue-600 hover:bg-blue-700">Request Offering Memorandum</Button>
                <Button variant="outline">Deploy Capital</Button>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lorem ipsum diclor sit amet, co-secoseitur adipisscings E-- Duis aure are eni I Sccumson, prolales
                  quis.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CapIV Access</h1>
              <p className="text-gray-600 mb-4">A marketplace to connect with investors and capital partners.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Deals</Button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {recommendedDeals.map((deal, index) => (
                  <Card
                    key={index}
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => onDealSelect(deal.title)}
                  >
                    <div className="flex gap-4">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{deal.title}</h3>
                        <p className="text-sm text-gray-600">{deal.location}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
