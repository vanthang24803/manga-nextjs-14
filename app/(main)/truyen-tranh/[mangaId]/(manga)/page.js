import { Info } from "./_components/info";
import { Modal } from "./_components/modal";
import { getServerSession } from "next-auth";
import getManga from "@/actions/get-list-manga";
import getDetailManga from "@/actions/get-detail-manga";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

const Detail = async ({ params }) => {
  const items = await getManga();
  const data = await getDetailManga(params.mangaId);
  const currentUser = await getServerSession(authOptions);

  const comments = await db.comment.findMany({
    where: {
      mangaId: params.mangaId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex justify-between space-x-6 w-full p-4">
      <Info
        data={data}
        url={params.mangaId}
        currentUser={currentUser}
        comments={comments}
      />
      <Modal items={items} />
    </div>
  );
};

export default Detail;
