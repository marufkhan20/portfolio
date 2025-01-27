/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO at TechCorp",
    content:
      "Working with this developer was an absolute pleasure. They delivered exceptional results and exceeded our expectations.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jane Smith",
    role: "Founder at StartupX",
    content:
      "Incredible attention to detail and professional communication throughout the project. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Mike Johnson",
    role: "Product Manager",
    content:
      "Outstanding work quality and great problem-solving skills. Will definitely work together again!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Client Reviews</h2>
          <p className="text-muted-foreground">
            {"Here's"} what my clients say about working with me
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col p-6">
                        <Quote className="w-10 h-10 text-primary mb-4 mx-auto" />
                        <p className="text-center mb-4">
                          {testimonial.content}
                        </p>
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
