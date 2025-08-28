"use client"

import { Card, CardContent } from "@/components/ui/card"

export function Account() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account</h1>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <CardContent className="p-8 flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <span className="text-purple-600 font-semibold">JS</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">JSL User</h2>
            <p className="text-purple-100">Real Estate Consultant</p>
          </div>
        </CardContent>
      </Card>

      {/* Account Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-48 bg-gray-200">
          <CardContent className="p-6 flex items-center justify-center h-full">
            <p className="text-gray-500">Account Settings</p>
          </CardContent>
        </Card>

        <Card className="h-48 bg-gray-200">
          <CardContent className="p-6 flex items-center justify-center h-full">
            <p className="text-gray-500">Profile Information</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
