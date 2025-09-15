"use client"

import { useState } from "react"
import { Search, FileText, TrendingUp, Building, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CapIVCoreProps {
  selectedInvestor: string | null
  onInvestorSelect: (investor: string | null) => void
  onDealSelect: (deal: string | null) => void
}

const investors = [
  {
    name: "Harbor Partners",
    capital: "Capital $30M",
    type: "Ercent Cap",
    category: "Equity",
  },
  {
    name: "Sterling Capital",
    capital: "Eran Investance",
    type: "Equity",
    category: "Investment",
  },
  {
    name: "Oakwood Holdings",
    capital: "Central Strategy",
    type: "Eeart",
    category: "Development",
  },
  {
    name: "Summit Group",
    capital: "Target Shortow",
    type: "Cold",
    category: "Acquisition",
  },
  {
    name: "Evergreen Investments",
    capital: "Captivisted Tancy",
    type: "CPC",
    category: "Fund",
  },
]

const activityLog = [
  { action: "Offering memorandum", date: "02/1/24" },
  { action: "Meeting scheduled", date: "03/12/24" },
]

export function CapIVCore({ selectedInvestor, onInvestorSelect, onDealSelect }: CapIVCoreProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="w-full bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-semibold text-gray-900">CapIV Core</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              Accounts
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-48 bg-gray-50 border-r border-gray-200 p-4">
          <nav className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "investments", label: "Investments", icon: Building },
              { id: "deals", label: "Deals", icon: FileText },
              { id: "documents", label: "Documents", icon: Users },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-6">
          {selectedInvestor ? (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Oakwood Holdings</h1>

                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    $22M-100M
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Equity
                  </Badge>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Esset</Badge>
                    <Badge variant="secondary">Hotel</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Deal Process</h3>
                    <div className="space-y-2 text-sm">
                      <div>7¼ 497 remily</div>
                      <div>70° - 8.0%</div>
                      <div className="font-medium">Deal Structure</div>
                      <div>JP LP</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Activity Log</h3>
                    <div className="space-y-3">
                      {activityLog.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.action}</span>
                          <span className="text-gray-500">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">Activity Log</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Offering memorand</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm">Meeting scheduled</span>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Investor Profiles</h1>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search..." className="pl-10" />
                </div>
              </div>

              <div className="space-y-3">
                {investors.map((investor, index) => (
                  <Card
                    key={index}
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => onInvestorSelect(investor.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{investor.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>{investor.capital}</span>
                          <span>{investor.type}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {investor.category}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
