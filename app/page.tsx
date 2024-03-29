"use client";
import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  const { tasks } = useGlobalState();
  // const tasks = [
  //   {
  //     assigned: "Ngoni Mike",
  //     attachment: false,
  //     createdAt: "2024-01-05T16:57:31.330Z",
  //     date: "2024-01-18",
  //     description: "go for a dinner date with bae",
  //     id: "clr0vq0ua0000xk3nu1g405g5",
  //     isCompleted: true,
  //     isImportant: true,
  //     title: "go for dinner",
  //     updatedAt: "2024-01-05T16:58:28.345Z",
  //     userId: "user_2aXCP17scwi6xa9kAGE7Ge57Fky",
  //   },
  //   {
  //     assigned: "Ngoni madhidhi",
  //     attachment: false,
  //     createdAt: "2024-01-05T16:51:59.027Z",
  //     date: "2024-01-13",
  //     description: "clean all the gutters at the hospital.",
  //     id: "clr0viwfm0006xkfqwgk8w3tw",
  //     isCompleted: false,
  //     isImportant: true,
  //     title: "Clean gutters",
  //     updatedAt: "2024-01-05T16:51:59.027Z",
  //     userId: "user_2aXCP17scwi6xa9kAGE7Ge57Fky",
  //   },
  // ];

  return (
    <div className="p-8">
      <div className="bg-white flex items-center rounded-full shadow-xl">
        <div className="p-4"></div>
      </div>
      <Tasks title="All Tasks" tasks={tasks} />;
    </div>
  );
}
