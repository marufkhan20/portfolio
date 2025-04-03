"use client"

import { useMutation } from "@tanstack/react-query"

export function useUpload() {
  return useMutation({
    mutationFn: async ({ file, folder }: { file: File; folder?: string }) => {
      const formData = new FormData()
      formData.append("file", file)
      if (folder) {
        formData.append("folder", folder)
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to upload file")
      }

      return res.json()
    },
  })
}

