import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PartyPopper } from "lucide-react";

export const ListComments = ({ comments }) => {
  return (
    <ScrollArea className="max-h-[200px]">
      {comments.length != 0 ? (
        <div className="flex flex-col space-y-4 ">
          {comments.map((item, index) => {
            return (
              <div className="flex space-x-3" key={index}>
                <Link href={`/profile/${item.userId}`}>
                  <Avatar>
                    <AvatarImage src={item.avatar} alt={item.authorName} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Link>

                <div className="bg-neutral-100/95 rounded-md px-4 py-2 flex flex-col">
                  <Link
                    href={`/profile/${item.userId}`}
                    className="font-medium hover:cursor-pointer"
                  >
                    {item.authorName}
                  </Link>
                  <span>{item.content}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center my-4 space-x-2">
          <span>Hãy là người bình luận đầu tiên </span>
          <PartyPopper />
        </div>
      )}
    </ScrollArea>
  );
};
