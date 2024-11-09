import TooltipContainer from "@/components/tooltip-container";
import { User } from "@/lib/types";
import classNames from "classnames";
import Image from "next/image";

interface UserAvatarProps {
  user: User;
  small?: boolean;
}

export default function UserAvatar({ user, small }: UserAvatarProps) {
  return (
    <TooltipContainer
      className="bg-main text-white"
      trigger={
        <Image
          width={100}
          height={100}
          src={user.avatar_url}
          alt="User avatar"
          className={classNames({
            "size-7 rounded-full": true,
            "size-6": small,
          })}
        />
      }
    >
      <p>{user.username}</p>
    </TooltipContainer>
  );
}
