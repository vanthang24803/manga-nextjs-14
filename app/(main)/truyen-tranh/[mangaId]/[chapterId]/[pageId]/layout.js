import getChapter from "@/actions/get-chapter";

export async function generateMetadata({ params }) {
  const response = await getChapter(
    params.mangaId,
    params.chapterId,
    params.pageId
  );

  return {
    title: response.name + response.chapter || "MangaDex",
  };
}

export default function DetailLayout({ children }) {
  return <>{children}</>;
}
