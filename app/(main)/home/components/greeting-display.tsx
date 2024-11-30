import { UserObject } from "@/lib/supabase/user-session";

interface GreetingDisplayProps {
  user: UserObject;
}

export default function GreetingDisplay({ user }: GreetingDisplayProps) {
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
  const greetingMessage = `${message()}, ${user?.user_metadata?.username}`;

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <span className="font-semibold text-sm">{dateToDisplay}</span>
      <span className="font-semibold text-3xl">{greetingMessage}</span>
    </div>
  );
}
