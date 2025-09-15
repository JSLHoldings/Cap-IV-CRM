"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"

export default function Home() {
  const [capitalAmount, setCapitalAmount] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  const [annualRate, setAnnualRate] = useState("")
  const [results, setResults] = useState({ amount: 0, roi: 0 })

  const calculateROI = () => {
    const capital = Number.parseFloat(capitalAmount) || 0
    const time = Number.parseFloat(timePeriod) || 0
    const rate = Number.parseFloat(annualRate) || 0

    const finalAmount = capital * Math.pow(1 + rate / 100, time)
    const roiPercentage = ((finalAmount - capital) / capital) * 100

    setResults({
      amount: Math.round(finalAmount),
      roi: Number.parseFloat(roiPercentage.toFixed(1)),
    })
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome User,</h1>
                <p className="text-gray-600">Manage your real estate investments and partnerships</p>
              </CardContent>
            </Card>

            {/* Featured Entity */}
            <Card className="bg-slate-800 text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-1">Family Wealth Partners</h2>
                <p className="text-slate-300">Office</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tools & Documents */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate LOI</Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate NDA</Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate OM</Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">ROI and IRR Calculator</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full bg-transparent">
                      Download
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Upload
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Notes Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Notes</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Co-GP
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Value-Add
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Core
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Notes content area</p>
                </div>
              </CardContent>
            </Card>

            {/* Calculator Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calculator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="capital">Capital Investment Amount</Label>
                    <Input
                      id="capital"
                      type="number"
                      value={capitalAmount}
                      onChange={(e) => setCapitalAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time period</Label>
                    <Input
                      id="time"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      placeholder="Years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rate">Annual rate</Label>
                    <Input
                      id="rate"
                      type="number"
                      value={annualRate}
                      onChange={(e) => setAnnualRate(e.target.value)}
                      placeholder="Percentage"
                    />
                  </div>
                  <Button onClick={calculateROI} className="w-full bg-blue-600 hover:bg-blue-700">
                    Calculate
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-gray-900">${results.amount.toLocaleString()}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Annual ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-gray-900">{results.roi}%</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
