import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

/* eslint-disable @next/next/no-img-element */
export const ListItems = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() =>
              router.push(`/truyen-tranh/${item.href.split("/").pop()}`)
            }
          >
            <div className="flex items-center space-x-4">
              <span className="text-[20px] font-medium text-[#2980b9]">
                {index + 1}
              </span>
              <div className="flex justify-between space-x-4 items-center">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-[80px] h-[60px] object-cover"
                />
                <span className="text-[11px]  line-clamp-1 w-[180px] hover:text-[#2980b9] hover:font-medium">
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ListItems.Skeleton = function ListItemsLoading() {
  return (
    <div className="flex flex-col space-y-2">
      {Array(10)
        .fill(0)
        .map((index) => {
          return <Skeleton className="w-full h-12" key={index} />;
        })}
    </div>
  );
};
