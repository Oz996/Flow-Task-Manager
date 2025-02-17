import { userSession } from "@/lib/supabase/user-session";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleUserImage } from "@/lib/utils";

export default async function HeaderAvatar() {
  const user = await userSession();
  // const supabase = createClient();

  // const getAvatarUrl = async (userId: string) => {
  //   const { data, error } = await supabase
  //     .from("profiles")
  //     .select("avatar_url")
  //     .eq("id", userId)
  //     .single();

  //   if (error) {
  //     console.error(error.message);
  //     return null;
  //   }

  //   return data?.avatar_url;
  // };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="size-8 rounded-full">
              <Image
                priority
                width={100}
                height={200}
                alt="User image"
                src={handleUserImage(user?.user_metadata?.avatar_url!)}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="text-left">
            <p>{user?.user_metadata?.username}</p>
            <p>Configurations</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
