import prisma from "@/app/utils/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { NextResponse } from "next/server";
import { sendMail, compileTaskCreateTemplate } from "@/lib/mail";
import { writeFile } from "fs/promises";
import splitString from "@/app/utils/splitString";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let userId: any = session?.user.id;
    const isAdmin = session?.user.isAdmin;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const {
      title,
      assigned,
      description,
      file,
      date,
      completed,
      important,
      attachment,
    } = await req.json();

    const nameArr = splitString(assigned, " ");
    const fName = nameArr[0];
    const lName = nameArr[nameArr.length - 1];
    const records: any =
      await prisma.$queryRaw`SELECT * FROM User WHERE firstName = ${fName} AND lastName = ${lName} `;
    const assignedId = records[0].id;
    const email = records[0].email;

    const body = compileTaskCreateTemplate(fName, title, description);
    await sendMail({
      to: email,
      subject: "New Task",
      body: body,
      attachments: [],
    });

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }
    userId = assignedId;

    if (isAdmin) {
      const task = await prisma.task.create({
        data: {
          title,
          assigned,
          description,
          date,
          isCompleted: completed,
          isImportant: important,
          attachment: attachment,
          userId,
        },
      });

      return NextResponse.json(task);
    }

    return NextResponse.json("only admin can create task");
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    const isAdmin = session?.user.isAdmin;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (isAdmin) {
      const tasks = await prisma.task.findMany();

      return NextResponse.json(tasks);
    }

    if (!isAdmin) {
      const tasks = await prisma.task.findMany({
        where: {
          userId,
        },
      });

      return NextResponse.json(tasks);
    }
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error getting tasks", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    const { isCompleted, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
