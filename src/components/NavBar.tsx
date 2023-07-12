import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <header className="h-[100px] bg-[#E5E7EB] flex justify-center">
      <div className="container flex flex-row items-center justify-between h-full">
        <Link href="/">
          <Image
            src="/assets/logo/bookie-logo.svg"
            width={140}
            height={32}
            alt="bookie logo"
            className=""
          />
        </Link>
        <div className="relative">
          <input
            placeholder="Search"
            className="py-3 pr-3 pl-11 rounded-3xl w-80 placeholder:text-[#4B5563]"
          />
          <Image
            src="/assets/icon/search-icon.svg"
            width={20}
            height={20}
            alt="search icon"
            className="absolute top-[14px] left-3"
          />
        </div>
        <button className="font-semibold text-[#f1f1f1] rounded-lg bg-[#10b891] py-3 px-6">
          Sign out
        </button>
      </div>
    </header>
  );
};
export default NavBar;
