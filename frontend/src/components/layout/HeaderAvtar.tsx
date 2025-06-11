import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  user: {
    name?: string;
    avatarUrl?: string;
  };
};

export const AvatarSection = ({ user }: Props) => {
  const getAvatarUrl = () => {
    if (user.avatarUrl) return user.avatarUrl;
    if (user.name)
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
      )}&background=random&color=fff`;
    return `https://ui-avatars.com/api/?name=U&background=ccc&color=fff`;
  };

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={getAvatarUrl()} alt={user.name ?? "User"} />
      <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
    </Avatar>
  );
};
