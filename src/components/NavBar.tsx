import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
<<<<<<< HEAD
import { IFeed } from '@/pages/home';

interface IProps {
  data: IFeed[];
}

const NavBar = ({ data }: IProps) => {
  console.log(data, 'IProps');
=======

const NavBar = () => {
>>>>>>> 6276cc8701adef86f55819830448a17143d8909c
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
<<<<<<< HEAD
        <SearchBar data={data} />
=======
        <SearchBar />
>>>>>>> 6276cc8701adef86f55819830448a17143d8909c
        <button className="font-semibold text-[#f1f1f1] rounded-lg bg-[#10b891] py-3 px-6">
          Sign out
        </button>
      </div>
    </header>
  );
};
export default NavBar;
