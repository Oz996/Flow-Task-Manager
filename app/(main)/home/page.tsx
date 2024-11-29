import { userSession } from "@/lib/supabase/user-session";
import Image from "next/image";
import Container from "../../../components/container";
import { createClient } from "@/lib/supabase/server";
import { Task } from "@/lib/types";

export default async function Home() {
  const supabase = createClient();
  const user = await userSession();

  const { data, error } = await supabase
    .from("task_assignments")
    .select("tasks (*)")
    .eq("user_id", user?.id);

  if (error) console.error(error.message);

  const tasks = data?.map((task) => task.tasks);

  console.log("dataa", tasks);

  const completedTasks = tasks?.flat().filter((task) => task.completed);
  console.log("completedTasks", completedTasks);

  const date = new Date();

  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const month = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const time = date.getHours();

  function message() {
    if (time < 12) return "Good morning";
    else if (time >= 17 && time < 0) return "Good evening";
    else return "Good afternoon";
  }

  const dateToDisplay = `${day}, ${month}`;
  const messageToDisplay = `${message()}, ${user?.user_metadata?.username}`;

  return (
    <section className="px-8 pt-10">
      <Container>
        <div className="flex flex-col gap-1 items-center justify-center">
          <span className="font-semibold text-sm">{dateToDisplay}</span>
          <span className="font-semibold text-3xl">{messageToDisplay}</span>
        </div>

        <div className="flex flex-col rounded-lg border p-6">
          <div className="flex items-center gap-4">
            <Image
              src={user?.user_metadata.avatar_url!}
              width={50}
              height={50}
              alt=""
              className="size-12 rounded-full"
            />
            <h2 className="text-xl font-semibold">My tasks</h2>
            <span className="bg-slate-500 p-2 rounded-full text-sm">
              {`${completedTasks?.length} tasks completed`}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
