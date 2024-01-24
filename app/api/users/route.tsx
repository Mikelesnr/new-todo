import prisma from "@/app/utils/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error getting tasks", status: 500 });
  }
}
