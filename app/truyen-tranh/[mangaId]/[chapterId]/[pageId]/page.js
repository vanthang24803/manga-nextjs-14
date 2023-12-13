import getChapter from "@/actions/get-chapter";


const Chapter = async ({params}) => {
  const response = await getChapter(
    params.mangaId,
    params.chapterId,
    params.pageId
  );
  return (
    <div>
      {response.name} {response.chapter}
    </div>
  )
}

export default Chapter
