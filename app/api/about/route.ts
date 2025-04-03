import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      orderBy: { updatedAt: "desc" },
      include: { skills: true },
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { skills, ...aboutData } = data;

    const about = await prisma.about.create({
      data: {
        ...aboutData,
        skills: {
          create: skills || [],
        },
      },
      include: { skills: true },
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error creating about:", error);
    return NextResponse.json(
      { error: "Failed to create about data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, skills, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // First update the about data
    const about = await prisma.about.update({
      where: { id },
      data: updateData,
    });

    // If skills are provided, delete existing skills and create new ones
    if (skills) {
      // Delete existing skills
      await prisma.skill.deleteMany({
        where: { aboutId: id },
      });

      // Create new skills
      await prisma.skill.createMany({
        data: skills.map((skill: any) => ({
          ...skill,
          aboutId: id,
        })),
      });
    }

    // Fetch the updated about with skills
    const updatedAbout = await prisma.about.findUnique({
      where: { id },
      include: { skills: true },
    });

    return NextResponse.json(updatedAbout);
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json(
      { error: "Failed to update about data" },
      { status: 500 }
    );
  }
}
