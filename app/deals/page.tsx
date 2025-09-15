"use client"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, TrendingUp, DollarSign, Calendar, MapPin } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

export default function DealsPage() {
  const deals = [
    {
      id: 1,
      name: "Harbor View Apartments",
      location: "Austin, TX",
      type: "Multifamily",
      status: "Active",
      investment: "$15M",
      irr: "14.2%",
      timeline: "Q2 2025",
      sponsor: "Harbor Partners",
    },
    {
      id: 2,
      name: "Downtown Office Complex",
      location: "Dallas, TX",
      type: "Office",
      status: "Due Diligence",
      investment: "$32M",
      irr: "12.8%",
      timeline: "Q3 2025",
      sponsor: "Sterling Capital",
    },
    {
      id: 3,
      name: "Retail Shopping Center",
      location: "Houston, TX",
      type: "Retail",
      status: "Closed",
      investment: "$8.5M",
      irr: "16.1%",
      timeline: "Q1 2025",
      sponsor: "Oakwood Holdings",
    },
  ]

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">All Deals</h1>
                <p className="text-gray-600 mt-1">Manage your investment opportunities</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Deal
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search deals..." className="pl-10 max-w-md" />
            </div>
          </div>

          {/* Deals Grid */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{deal.name}</CardTitle>
                      <Badge
                        variant={
                          deal.status === "Active" ? "default" : deal.status === "Closed" ? "secondary" : "outline"
                        }
                        className={deal.status === "Active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {deal.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{deal.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Investment</p>
                        <p className="font-semibold flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {deal.investment}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Target IRR</p>
                        <p className="font-semibold flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {deal.irr}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Sponsor</span>
                        <span className="font-medium">{deal.sponsor}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-500">Timeline</span>
                        <span className="font-medium flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {deal.timeline}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
