
export async function generateMetadata({ params }) {
  return {
    title: params.categoryId.toUpperCase() || "Manga",
  };
}

export default function CategoryLayout({ children }) {
  return <>{children}</>;
}
