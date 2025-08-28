"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ArrowRight, Plus, MapPin, DollarSign, Calendar, Building } from "lucide-react"
import { SearchFilters } from "@/components/search-filters"

interface Deal {
  id: string
  title: string
  location: string
  assetType: string
  dealSize: string
  status: "Active" | "Pending" | "Closed" | "Under Review"
  sponsor: string
  targetReturn: string
  holdPeriod: string
  description: string
  dateAdded: string
  investmentType: "Equity" | "Debt" | "Hybrid"
  riskProfile: "Core" | "Core-Plus" | "Value-Add" | "Opportunistic"
}

export function Deals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filters, setFilters] = useState({
    status: [],
    assetType: [],
    location: [],
    riskProfile: [],
    investmentSize: { min: "", max: "" },
    role: [],
  })
  const [sortBy, setSortBy] = useState("date")

  useEffect(() => {
    const sampleDeals: Deal[] = [
      {
        id: "1",
        title: "Downtown Mixed-Use Development",
        location: "Los Angeles, CA",
        assetType: "Mixed-Use",
        dealSize: "$45M",
        status: "Active",
        sponsor: "Urban Axis Capital",
        targetReturn: "18-22%",
        holdPeriod: "5-7 years",
        description: "Prime downtown location with retail and residential components. Opportunity Zone qualified.",
        dateAdded: "2025-01-15",
        investmentType: "Equity",
        riskProfile: "Value-Add",
      },
      {
        id: "2",
        title: "Industrial Logistics Portfolio",
        location: "Phoenix, AZ",
        assetType: "Industrial",
        dealSize: "$120M",
        status: "Under Review",
        sponsor: "Pacific Real Estate Partners",
        targetReturn: "12-15%",
        holdPeriod: "3-5 years",
        description: "Class A industrial properties with long-term triple net leases to investment grade tenants.",
        dateAdded: "2025-01-10",
        investmentType: "Equity",
        riskProfile: "Core-Plus",
      },
      {
        id: "3",
        title: "Luxury Multifamily Complex",
        location: "Austin, TX",
        assetType: "Multifamily",
        dealSize: "$85M",
        status: "Pending",
        sponsor: "Metropolitan Investment Group",
        targetReturn: "15-18%",
        holdPeriod: "4-6 years",
        description: "350-unit luxury apartment complex in high-growth submarket with value-add opportunities.",
        dateAdded: "2025-01-08",
        investmentType: "Equity",
        riskProfile: "Value-Add",
      },
      {
        id: "4",
        title: "Office Building Acquisition",
        location: "Denver, CO",
        assetType: "Office",
        dealSize: "$65M",
        status: "Active",
        sponsor: "Rocky Mountain Capital",
        targetReturn: "10-13%",
        holdPeriod: "7-10 years",
        description: "Class A office building with stable tenant base and below-market rents.",
        dateAdded: "2025-01-05",
        investmentType: "Equity",
        riskProfile: "Core",
      },
      {
        id: "5",
        title: "Retail Strip Center",
        location: "Miami, FL",
        assetType: "Retail",
        dealSize: "$28M",
        status: "Closed",
        sponsor: "Sunshine Properties",
        targetReturn: "14-17%",
        holdPeriod: "3-5 years",
        description: "Anchored retail center with renovation and re-leasing opportunities.",
        dateAdded: "2024-12-20",
        investmentType: "Equity",
        riskProfile: "Opportunistic",
      },
      {
        id: "6",
        title: "Student Housing Development",
        location: "Chapel Hill, NC",
        assetType: "Student Housing",
        dealSize: "$52M",
        status: "Active",
        sponsor: "Education Realty Partners",
        targetReturn: "16-20%",
        holdPeriod: "5-7 years",
        description: "Purpose-built student housing near major university campus with guaranteed occupancy.",
        dateAdded: "2024-12-15",
        investmentType: "Equity",
        riskProfile: "Value-Add",
      },
    ]
    setDeals(sampleDeals)
    setFilteredDeals(sampleDeals)
  }, [])

  useEffect(() => {
    const filtered = deals.filter((deal) => {
      // Text search
      const matchesSearch =
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.assetType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.sponsor.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = !filters.status?.length || filters.status.includes(deal.status)

      // Asset type filter
      const matchesAssetType = !filters.assetType?.length || filters.assetType.includes(deal.assetType)

      // Location filter (check if deal location contains any of the filtered locations)
      const matchesLocation =
        !filters.location?.length ||
        filters.location.some((loc) => deal.location.toLowerCase().includes(loc.toLowerCase()))

      // Risk profile filter
      const matchesRiskProfile = !filters.riskProfile?.length || filters.riskProfile.includes(deal.riskProfile)

      // Investment size filter
      const dealSizeNum = Number.parseFloat(deal.dealSize.replace(/[$M,]/g, ""))
      const minSize = filters.investmentSize?.min ? Number.parseFloat(filters.investmentSize.min) : 0
      const maxSize = filters.investmentSize?.max
        ? Number.parseFloat(filters.investmentSize.max)
        : Number.POSITIVE_INFINITY
      const matchesSize = dealSizeNum >= minSize && dealSizeNum <= maxSize

      return matchesSearch && matchesStatus && matchesAssetType && matchesLocation && matchesRiskProfile && matchesSize
    })

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        case "date":
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case "size":
          return (
            Number.parseFloat(b.dealSize.replace(/[$M,]/g, "")) - Number.parseFloat(a.dealSize.replace(/[$M,]/g, ""))
          )
        case "return":
          return Number.parseFloat(b.targetReturn.split("-")[0]) - Number.parseFloat(a.targetReturn.split("-")[0])
        default:
          return 0
      }
    })

    setFilteredDeals(filtered)
  }, [deals, searchTerm, filters, sortBy])

  const getStatusColor = (status: Deal["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskProfileColor = (risk: Deal["riskProfile"]) => {
    switch (risk) {
      case "Core":
        return "bg-blue-100 text-blue-800"
      case "Core-Plus":
        return "bg-green-100 text-green-800"
      case "Value-Add":
        return "bg-purple-100 text-purple-800"
      case "Opportunistic":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddDeal = (newDeal: Omit<Deal, "id">) => {
    const deal: Deal = {
      ...newDeal,
      id: Date.now().toString(),
    }
    setDeals((prev) => [...prev, deal])
    setIsAddDialogOpen(false)
  }

  const handleClearFilters = () => {
    setFilters({
      status: [],
      assetType: [],
      location: [],
      riskProfile: [],
      investmentSize: { min: "", max: "" },
      role: [],
    })
    setSearchTerm("")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">All deals</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
            </DialogHeader>
            <DealForm onSubmit={handleAddDeal} />
          </DialogContent>
        </Dialog>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={filteredDeals.length}
        onClearFilters={handleClearFilters}
      />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Deal Summary */}
        <div className="space-y-6">
          <Card className="bg-gray-100">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{deals.length}</div>
                  <div className="text-sm text-gray-600">Total Deals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {deals.filter((d) => d.status === "Active").length}
                  </div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {deals.filter((d) => d.status === "Under Review").length}
                  </div>
                  <div className="text-sm text-gray-600">Under Review</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center space-x-2">
            <span>All Deals</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Right Columns - Deal Cards */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">{filteredDeals.length} deals found</p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                Filter
              </Button>
              <Button size="sm" variant="outline">
                Sort
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onViewDetails={() => setSelectedDeal(deal)}
                getStatusColor={getStatusColor}
                getRiskProfileColor={getRiskProfileColor}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Deal Details Dialog */}
      <Dialog open={!!selectedDeal} onOpenChange={() => setSelectedDeal(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDeal?.title}</DialogTitle>
          </DialogHeader>
          {selectedDeal && <DealDetails deal={selectedDeal} getRiskProfileColor={getRiskProfileColor} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DealCard({
  deal,
  onViewDetails,
  getStatusColor,
  getRiskProfileColor,
}: {
  deal: Deal
  onViewDetails: () => void
  getStatusColor: (status: Deal["status"]) => string
  getRiskProfileColor: (risk: Deal["riskProfile"]) => string
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewDetails}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{deal.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{deal.location}</span>
            </div>
          </div>
          <Badge className={getStatusColor(deal.status)}>{deal.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{deal.assetType}</span>
          </div>
          <Badge className={getRiskProfileColor(deal.riskProfile)}>{deal.riskProfile}</Badge>
        </div>

        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">{deal.dealSize}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{deal.holdPeriod}</span>
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-1">Sponsor:</p>
          <p className="text-sm font-medium text-gray-900">{deal.sponsor}</p>
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-1">Target Return:</p>
          <p className="text-sm font-medium text-green-600">{deal.targetReturn}</p>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-gray-700 line-clamp-2">{deal.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DealDetails({
  deal,
  getRiskProfileColor,
}: {
  deal: Deal
  getRiskProfileColor: (risk: Deal["riskProfile"]) => string
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deal Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Location</Label>
              <p className="text-sm text-gray-900">{deal.location}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Asset Type</Label>
              <p className="text-sm text-gray-900">{deal.assetType}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Deal Size</Label>
              <p className="text-sm font-semibold text-gray-900">{deal.dealSize}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Risk Profile</Label>
              <Badge className={getRiskProfileColor(deal.riskProfile)}>{deal.riskProfile}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Sponsor</Label>
              <p className="text-sm text-gray-900">{deal.sponsor}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Target Return</Label>
              <p className="text-sm font-semibold text-green-600">{deal.targetReturn}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Hold Period</Label>
              <p className="text-sm text-gray-900">{deal.holdPeriod}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Investment Type</Label>
              <p className="text-sm text-gray-900">{deal.investmentType}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 leading-relaxed">{deal.description}</p>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Download Materials</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Express Interest</Button>
      </div>
    </div>
  )
}

function DealForm({ onSubmit }: { onSubmit: (deal: Omit<Deal, "id">) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    assetType: "",
    dealSize: "",
    status: "Active" as Deal["status"],
    sponsor: "",
    targetReturn: "",
    holdPeriod: "",
    description: "",
    dateAdded: new Date().toISOString().split("T")[0],
    investmentType: "Equity" as Deal["investmentType"],
    riskProfile: "Core" as Deal["riskProfile"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Deal Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="assetType">Asset Type</Label>
          <Input
            id="assetType"
            value={formData.assetType}
            onChange={(e) => setFormData((prev) => ({ ...prev, assetType: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="dealSize">Deal Size</Label>
          <Input
            id="dealSize"
            value={formData.dealSize}
            onChange={(e) => setFormData((prev) => ({ ...prev, dealSize: e.target.value }))}
            placeholder="$50M"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sponsor">Sponsor</Label>
          <Input
            id="sponsor"
            value={formData.sponsor}
            onChange={(e) => setFormData((prev) => ({ ...prev, sponsor: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="targetReturn">Target Return</Label>
          <Input
            id="targetReturn"
            value={formData.targetReturn}
            onChange={(e) => setFormData((prev) => ({ ...prev, targetReturn: e.target.value }))}
            placeholder="15-18%"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          Add Deal
        </Button>
      </div>
    </form>
  )
}
