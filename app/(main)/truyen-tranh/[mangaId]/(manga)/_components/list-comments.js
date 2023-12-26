import { ScrollArea } from "@/components/ui/scroll-area";
import { PartyPopper } from "lucide-react";

import { CommentItem } from "./comment-item";

export const ListComments = ({ comments, currentUser }) => {
  return (
    <ScrollArea className="max-h-[200px]">
      {comments.length != 0 ? (
        <div className="flex flex-col space-y-4 ">
          {comments.map((item, index) => {
            return (
              <CommentItem
                key={index}
                item={item}
                currentUser={currentUser}
              />
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
