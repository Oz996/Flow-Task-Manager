import { userSession } from "@/lib/supabase/user-session";

export default async function Home() {
  const user = await userSession();
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
    <section className="px-8">
      <h1 className="font-bold text-xl">Home</h1>
      <div className="flex flex-col gap-1 items-center justify-center">
        <span className="font-semibold text-sm">{dateToDisplay}</span>
        <span className="font-semibold text-3xl">{messageToDisplay}</span>
      </div>
    </section>
  );
}
