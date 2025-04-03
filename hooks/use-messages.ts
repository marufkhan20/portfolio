"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface Message {
  id: string
  name: string
  email: string
  subject?: string
  content: string
  read: boolean
}

export function useMessages() {
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch("/api/messages")
      if (!res.ok) {
        throw new Error("Failed to fetch messages")
      }
      return res.json()
    },
  })
}

export function useMessage(id: string) {
  return useQuery<Message>({
    queryKey: ["message", id],
    queryFn: async () => {
      const res = await fetch(`/api/messages/${id}`)
      if (!res.ok) {
        throw new Error("Failed to fetch message")
      }
      return res.json()
    },
    enabled: !!id,
  })
}

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: Omit<Message, "id" | "read">) => {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to send message")
      }

      return res.json()
    },
  })
}

export function useUpdateMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Message>) => {
      const res = await fetch(`/api/messages/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error("Failed to update message")
      }

      return res.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
      queryClient.invalidateQueries({ queryKey: ["message", data.id] })
    },
  })
}

export function useDeleteMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to delete message")
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    },
  })
}

