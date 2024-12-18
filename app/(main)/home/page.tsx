import { userSession } from "@/lib/supabase/user-session";
import Image from "next/image";
import Container from "../../../components/container";
import { createClient } from "@/lib/supabase/server";
import { Task } from "@/lib/types";
import TaskListItem from "../project/[id]/components/task-list-item";
import { Check } from "lucide-react";
import { iconSize } from "@/lib/constants";
import TaskListCategories from "./components/task-list-categories";
import GreetingDisplay from "./components/greeting-display";

export default async function Home() {
  const supabase = createClient();
  const user = await userSession();

  const { data, error } = await supabase
    .from("task_assignments")
    .select(
      "tasks (*, section:sections (project:projects (id, name)), subtasks (*), profiles (*), labels (*))"
    )
    .eq("user_id", user?.id);

  if (error) return console.error(error.message);

  const tasks = data?.flatMap((item) => item.tasks) as Task[];
  const completedTasks = tasks?.flat().filter((task) => task.completed);

  return (
    <section className="px-8 pt-10">
      <Container>
        <GreetingDisplay user={user!} />

        <div className="flex flex-col rounded-lg border p-6 mt-10 w-[65%] mx-auto">
          <div className="flex items-center gap-4">
            <Image
              src={user?.user_metadata.avatar_url!}
              width={50}
              height={50}
              alt=""
              className="size-12 rounded-full"
            />
            <h2 className="text-xl font-semibold">My tasks</h2>
            <div className="flex items-center">
              <Check size={iconSize - 2} className="text-green-600" />
              <span className="rounded-full text-sm">
                {`${completedTasks?.length} tasks completed`}
              </span>
            </div>
          </div>

          <div className={`mt-5 pt-5 ${tasks.length === 0 && "border-t"}`}>
            {tasks.length > 0 ? (
              <>
                <TaskListCategories />

                <ul className="pt-5">
                  {tasks?.map((task) => (
                    <TaskListItem key={task.id} task={task} homeList />
                  ))}
                </ul>
              </>
            ) : (
              <span>You are currently not assigned to any tasks.</span>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
