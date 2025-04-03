"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  previewClassName?: string;
  buttonClassName?: string;
}

export function ImageUploader({
  value,
  onChange,
  className = "",
  previewClassName = "w-20 h-20 rounded-full",
  buttonClassName = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {value && (
        <div className={`relative overflow-hidden ${previewClassName}`}>
          <img
            src={value || "/placeholder.svg"}
            alt="Uploaded image"
            className="w-full h-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-0 right-0 h-6 w-6 rounded-full"
            onClick={() => onChange("")}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      <div className="flex-1">
        {isUploading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading...</span>
          </div>
        ) : (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              onChange(res[0].url);
              setIsUploading(false);
              toast({
                title: "Upload complete",
                description: "Your image has been uploaded successfully.",
              });
            }}
            onUploadError={(error: Error) => {
              setIsUploading(false);
              toast({
                title: "Upload failed",
                description: error.message || "Something went wrong",
                variant: "destructive",
              });
            }}
            onUploadBegin={() => {
              setIsUploading(true);
            }}
            className={buttonClassName}
          />
        )}
      </div>
    </div>
  );
}
