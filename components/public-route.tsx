"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface PublicRouteProps {
  children: React.ReactNode
  redirectIfAuthenticated?: boolean
  redirectTo?: string
}

export function PublicRoute({ children, redirectIfAuthenticated = true, redirectTo = "/" }: PublicRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user && redirectIfAuthenticated) {
      router.push(redirectTo)
    }
  }, [user, isLoading, router, redirectIfAuthenticated, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
