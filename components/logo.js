import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 ">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
      </div>
    </Link>
  );
};
