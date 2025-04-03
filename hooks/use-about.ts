"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface Skill {
  id?: string
  name: string
  icon?: string
}

interface About {
  id: string
  title: string
  description: string
  skills: Skill[]
}

export function useAbout() {
  return useQuery<About>({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch("/api/about")
      if (!res.ok) {
        throw new Error("Failed to fetch about data")
      }
      return res.json()
    },
  })
}

export function useUpdateAbout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<About>) => {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to update about data")
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] })
    },
  })
}

export function useCreateAbout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Omit<About, "id">) => {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to create about data")
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] })
    },
  })
}

