"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, TrendingUp, DollarSign } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

export default function CalculatorPage() {
  const [roiInputs, setRoiInputs] = useState({
    initialInvestment: "",
    finalValue: "",
    timeYears: "",
  })

  const [irrInputs, setIrrInputs] = useState({
    initialInvestment: "",
    cashFlows: "",
    timeYears: "",
  })

  const calculateROI = () => {
    const initial = Number.parseFloat(roiInputs.initialInvestment)
    const final = Number.parseFloat(roiInputs.finalValue)
    const years = Number.parseFloat(roiInputs.timeYears)

    if (initial && final && years) {
      const totalReturn = ((final - initial) / initial) * 100
      const annualizedReturn = (Math.pow(final / initial, 1 / years) - 1) * 100
      return { totalReturn, annualizedReturn }
    }
    return null
  }

  const roiResults = calculateROI()

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Investment Calculator</h1>
                <p className="text-gray-600 mt-1">Calculate ROI, IRR, and other investment metrics</p>
              </div>
            </div>
          </div>

          {/* Calculator Content */}
          <div className="flex-1 p-6">
            <Tabs defaultValue="roi" className="max-w-4xl">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
                <TabsTrigger value="irr">IRR Calculator</TabsTrigger>
                <TabsTrigger value="cap-rate">Cap Rate</TabsTrigger>
              </TabsList>

              <TabsContent value="roi" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                        ROI Inputs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="initial">Initial Investment ($)</Label>
                        <Input
                          id="initial"
                          type="number"
                          placeholder="100000"
                          value={roiInputs.initialInvestment}
                          onChange={(e) => setRoiInputs({ ...roiInputs, initialInvestment: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="final">Final Value ($)</Label>
                        <Input
                          id="final"
                          type="number"
                          placeholder="150000"
                          value={roiInputs.finalValue}
                          onChange={(e) => setRoiInputs({ ...roiInputs, finalValue: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="years">Time Period (Years)</Label>
                        <Input
                          id="years"
                          type="number"
                          placeholder="5"
                          value={roiInputs.timeYears}
                          onChange={(e) => setRoiInputs({ ...roiInputs, timeYears: e.target.value })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                        Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {roiResults ? (
                        <>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Total Return</span>
                              <span className="text-2xl font-bold text-blue-600">
                                {roiResults.totalReturn.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Annualized Return</span>
                              <span className="text-2xl font-bold text-green-600">
                                {roiResults.annualizedReturn.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Enter values to see results</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="irr" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>IRR Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">IRR calculator coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cap-rate" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cap Rate Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Cap rate calculator coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
