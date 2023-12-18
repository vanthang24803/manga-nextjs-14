import { Bookmark, Info, Notification } from "lucide-react";

export const Noti = () => {
  return (
    <div className="flex md:items-center justify-start w-full bg-neutral-100/60 md:p-3 p-4 rounded space-x-2">
      <Info className="w-6 h-6" />
      <span className="text-sm">
        Có thể ảnh truyện không tải được hoặc lỗi là do đường dẫn hình ảnh bị
        chặn! Rất xin lỗi độc giả 🙏
      </span>
    </div>
  );
};
