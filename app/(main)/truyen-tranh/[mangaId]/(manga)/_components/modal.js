/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export const Modal = ({ items }) => {
  return (
    <div className="w-1/3 hidden lg:flex flex-col space-y-4 border border-neutral-200 p-4 max-h-screen">
      <Link href={`/bxh`} className="flex flex-col hover:cursor-pointer">
        <h4 className="uppercase text-[#2980b9]  font-medium">Bảng Xếp Hạng</h4>
        <div className="h-[1px] bg-[#2980b9] w-1/2"></div>
      </Link>
      <div className="flex flex-col space-y-4">
        {items.map((item, index) => {
          return (
            <Link
              href={`/truyen-tranh/${item.href.split("/").pop()}`}
              key={index}
              className="cursor-pointer"
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
            </Link>
          );
        })}
      </div>
    </div>
  );
};
