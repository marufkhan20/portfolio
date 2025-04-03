"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface Hero {
  id: string
  name: string
  title: string
  description: string
  image?: string
  linkedin?: string
  github?: string
  instagram?: string
  twitter?: string
  fiverr?: string
  upwork?: string
}

export function useHero() {
  return useQuery<Hero>({
    queryKey: ["hero"],
    queryFn: async () => {
      const res = await fetch("/api/hero")
      if (!res.ok) {
        throw new Error("Failed to fetch hero data")
      }
      return res.json()
    },
  })
}

export function useUpdateHero() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Hero>) => {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to update hero data")
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] })
    },
  })
}

export function useCreateHero() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<Hero, "id">) => {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to create hero data")
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] })
    },
  })
}

