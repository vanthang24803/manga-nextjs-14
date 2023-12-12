import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export const ListCategories = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-2">
      <span
        className="text-[12px] hover:font-medium hover:text-[#2980b9] hover:cursor-pointer"
        onClick={() => router.push("/tim-truyen")}
      >
        Tất cả thể loại
      </span>
      <Separator />
      <div className="grid grid-cols-2 gap-2">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() =>
                router.push(`/tim-truyen/${item.href.split("/").pop()}`)
              }
            >
              <span className="text-[12px] hover:font-medium hover:text-[#2980b9]">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


ListCategories.Skeleton =  function ListCategoriesLoading() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Array(20).fill(0).map((index) => {
        return (
          <Skeleton className="w-full h-8 bg-neutral-200" key={index} />
        )
      })}
    </div>
  )
}