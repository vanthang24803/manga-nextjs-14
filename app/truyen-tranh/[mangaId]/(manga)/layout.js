import getDetailManga from "@/actions/get-detail-manga";

export async function generateMetadata({ params }) {

    const response = await getDetailManga(params.mangaId);

    return {
      title: response.name || "Manga",
    };
  }
  
  export default function DetailLayout({ children }) {
    return <>{children}</>;
  }
  