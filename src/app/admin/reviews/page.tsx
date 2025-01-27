import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Plus, Save, Star, Trash } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage client reviews and testimonials.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Review
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Client Name</Label>
                  <Input id="name" placeholder="Enter client name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Client Role</Label>
                  <Input id="role" placeholder="e.g. CEO at Company" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review">Review Content</Label>
                <Textarea
                  id="review"
                  placeholder="Write the review content..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Client Image</Label>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline">
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Square image recommended
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      variant="outline"
                      size="icon"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Review
                </Button>
                <Button type="button" variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Example of existing review */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-muted" />
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-muted-foreground">CEO at TechCorp</p>
              </div>
            </div>
            <p className="mb-4">
              {
                "Amazing work! The project was delivered on time and exceeded our expectations."
              }
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-primary text-primary"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
