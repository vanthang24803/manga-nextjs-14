import Link from "next/link";
import getChapter from "@/actions/get-chapter";
import { Button } from "@/components/ui/button";
import { Images } from "./_components/images";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Chapter = async ({ params }) => {
  const response = await getChapter(
    params.mangaId,
    params.chapterId,
    params.pageId
  );

  const idPrev = response.prevChapter.split("/").pop();
  const idNext = response.nextChapter.split("/").pop();

  return (
    <div className="flex w-full my-4 flex-col space-y-4 p-4">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3 text-sm font-medium hover:cursor-pointer overflow-auto">
          <Link href="/" className="hover:text-blue-800">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
          <Link href="/tim-truyen" className="hover:text-blue-800">
            Thể loại
          </Link>
          <ChevronRight className="w-4 h-4 text-neutral-400 hidden md:block" />
          {/* <Link href={`/truyen-tranh/${params.mangaId}`}> */}
          <span className="hover:text-blue-800 hidden md:block">
            {response.name}
          </span>
          {/* </Link> */}
          <ChevronRight className="w-4 h-4 text-neutral-400 hidden md:block" />
          <span className="hover:text-blue-800 hidden md:block">
            {response.chapter}
          </span>
        </div>
        <span>{response.time}</span>
      </div>

      <div className="flex items-center justify-center space-x-4">
        {idPrev != "v1undefined" ? (
          <Link
            href={response.prevChapter.replace(`${process.env.API_URL}/v1`, "")}
          >
            <Button size="icon">
              <ChevronLeft />
            </Button>
          </Link>
        ) : (
          <Button size="icon" disabled variant="outline">
            <ChevronLeft />
          </Button>
        )}
        <Button disabled variant="ghost" className="md:block hidden">
          {response.name} {response.chapter}
        </Button>
        <Button disabled variant="ghost" className="block md:hidden">
          {response.chapter}
        </Button>
        {idNext != "v1undefined" ? (
          <Link
            href={response.nextChapter.replace(`${process.env.API_URL}/v1`, "")}
          >
            <Button size="icon">
              <ChevronRight />
            </Button>
          </Link>
        ) : (
          <Button size="icon" disabled variant="outline">
            <ChevronRight />
          </Button>
        )}
      </div>

      <Images images={response.images} />

      <div className="flex items-center justify-center space-x-4">
        {idPrev != "v1undefined" ? (
          <Link
            href={response.prevChapter.replace(`${process.env.API_URL}/v1`, "")}
          >
            <Button>
              <ChevronLeft /> Prev
            </Button>
          </Link>
        ) : (
          <Button disabled variant="outline">
            <ChevronLeft /> Prev
          </Button>
        )}
        <Button disabled variant="ghost" className="md:block hidden">
          {response.name} {response.chapter}
        </Button>
        <Button disabled variant="ghost" className="block md:hidden">
          {response.chapter}
        </Button>
        {idNext != "v1undefined" ? (
          <Link
            href={response.nextChapter.replace(`${process.env.API_URL}/v1`, "")}
          >
            <Button>
              Next <ChevronRight />
            </Button>
          </Link>
        ) : (
          <Button disabled variant="outline">
            Next <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Chapter;
