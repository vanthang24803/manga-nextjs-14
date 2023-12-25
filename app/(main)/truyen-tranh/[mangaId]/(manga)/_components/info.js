/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Saved } from "./saved";
import { Chapter } from "./chapter";
import { CommentForm } from "./comment-form";
import { ChevronRight, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ListComments } from "./list-comments";

export const Info = ({ data, url, currentUser, comments }) => {
  const lasted = data.chapters[0];
  const first = data.chapters[data.chapters.length - 1];

  return (
    <div className="flex flex-col lg:w-2/3 w-full">
      <div className="flex items-center space-x-3 text-sm font-medium hover:cursor-pointer ">
        <Link href="/" className="hover:text-blue-800">
          Trang chủ
        </Link>
        <ChevronRight className="w-4 h-4 text-neutral-400" />
        <Link href="/tim-truyen" className="hover:text-blue-800">
          Thể loại
        </Link>
        <ChevronRight className="w-4 h-4 text-neutral-400" />
        <span className="hover:text-blue-800">{data.name}</span>
      </div>

      <div className="flex flex-col items-center justify-center  mt-6 mb-4">
        <h1 className="font-medium uppercase lg:text-[25px] text-[20px]">
          {data.name}
        </h1>
        <span>{data.time}</span>
      </div>

      <div className="flex md:flex-row flex-col items-center md:items-start space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        <img
          src={data.thumbnail}
          alt={data.name}
          className="w-[200px] h-[240px]"
        />
        <div className="flex space-x-8">
          <div className="flex flex-col space-y-2">
            <span>Tác giả</span>
            <span>Tình trạng</span>
            <span>Lượt xem</span>
            <span>Thể loại</span>
          </div>
          <div className="flex flex-col  space-y-2">
            <span>{data.author}</span>
            <span>{data.status}</span>
            <span>{data.views}</span>
            <div className="grid grid-cols-3 gap-2">
              {data.categories.map((item, index) => {
                return (
                  <Link
                    href={`/tim-truyen/${item.href.split("/").pop()}`}
                    key={index}
                    className="hover:text-[#2980b9] hover:font-medium"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <span className="font-bold text-[#2980b9]">{data.name}</span>
        <span>{data.star}</span>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <Saved data={data} url={url} />
        <span>{data.followers} lượt theo dõi</span>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <Link href={`${first.href.split(`${process.env.API_URL}/v1`)[1]}`}>
          <Button>Đọc từ đầu</Button>
        </Link>
        <Link href={`${lasted.href.split(`${process.env.API_URL}/v1`)[1]}`}>
          <Button variant="destructive">Đọc mới nhất</Button>
        </Link>
      </div>

      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex flex-col space-y-1">
          <h4 className="uppercase text-[#2980b9]  font-medium">Nội dung</h4>
          <Separator />
        </div>
        <p className="text-sm ">{data.content}</p>
      </div>

      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex flex-col space-y-1">
          <h4 className="uppercase text-[#2980b9]  font-medium">
            Danh sách chương
          </h4>
          <Separator />
        </div>
        <Chapter chapters={data.chapters} />
      </div>

      <div className="my-4 flex flex-col space-y-2 ">
        <div className="flex flex-col space-y-1">
          <h4 className="uppercase text-[#2980b9]  font-medium">Bình luận</h4>
          <Separator />
        </div>
        <div className="w-full min-h-[20vh] rounded-md border border-neutral-200 p-4 flex flex-col space-y-6">
          <CommentForm currentUser={currentUser} url={url} />
          <ListComments comments={comments} />
        </div>
      </div>
    </div>
  );
};
