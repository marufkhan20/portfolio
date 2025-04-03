import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const published = searchParams.get("published")

    const whereClause: any = {}

    if (featured === "true") {
      whereClause.featured = true
    }

    if (published === "true") {
      whereClause.published = true
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        technologies: true,
        features: true,
        gallery: true,
      },
      orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { technologies, features, gallery, ...projectData } = data

    const project = await prisma.project.create({
      data: {
        ...projectData,
        technologies: {
          create: technologies || [],
        },
        features: {
          create: features || [],
        },
        gallery: {
          create: gallery || [],
        },
      },
      include: {
        technologies: true,
        features: true,
        gallery: true,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

