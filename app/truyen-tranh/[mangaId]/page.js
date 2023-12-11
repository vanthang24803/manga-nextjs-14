import getDetailManga from "@/actions/get-detail-manga";
import Link from "next/link";

const Detail = async ({ params }) => {
  const data = await getDetailManga(params.mangaId);

  return (
    <div className="flex items-center space-x-2">
      {data.chapters.map((item, index) => {
        return (
          <Link href={item.href} key={index}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Detail;
