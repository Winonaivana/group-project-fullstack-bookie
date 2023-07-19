import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { IFeed } from '@/pages/home';
import { signOut } from 'next-auth/react';

interface IProps {
  data: IFeed[];
}

const NavBar = ({ data }: IProps) => {
  return (
    <header className="h-[100px] bg-gray-200 flex justify-center ph:h-[121px]">
      <div className="container flex flex-row items-center justify-between h-full ph:flex-col">
        <div className="flex flex-row items-center justify-between w-full wrapper ph:mt-7 ph:px-6">
          <Link href="/">
            <Image
              src="/assets/logo/bookie-logo.svg"
              width={140}
              height={32}
              alt="bookie logo"
              className=""
            />
          </Link>
          <div className="searchbar-wrapper ph:hidden">
            <SearchBar data={data} />
          </div>
          <button
            onClick={() => signOut()}
            className="font-semibold text-[#f1f1f1] rounded-lg bg-emerald-500 py-3 px-6 hover:scale-105 transition-all duration-300"
          >
            Sign out
          </button>
        </div>

        <div className="hidden searchbar-wrapper ph:block ph:mt-6">
          <SearchBar data={data} />
        </div>
      </div>
    </header>
  );
};
export default NavBar;
