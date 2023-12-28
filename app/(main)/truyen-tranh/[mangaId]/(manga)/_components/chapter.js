"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export const Chapter = ({ chapters }) => {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Số chương</TableHead>
          <TableHead>Cập nhật</TableHead>
          <TableHead className="text-right">Xem</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="hover:cursor-pointer">
        {chapters.map((item) => (
          <TableRow
            key={item.href}
            onClick={() =>
              router.push(
                `${item.href.split(`${process.env.NEXT_PUBLIC_API_URL}/v1`)[1]}`
              )
            }
          >
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell className="text-right">{item.views}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
