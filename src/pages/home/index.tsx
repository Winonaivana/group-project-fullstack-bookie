import NavBar from '@/components/NavBar';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import BookCard from '@/components/BookCard';
import { prisma } from '@/libs/db';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.book.findMany();
  return {
    props: { feed },
  };
};

export interface IFeed {
  id: string;
  title: string;
  writer: string;
  genres: string;
  coverImgUrl: string;
  notes: string;
  done: boolean;
  userId: string;
}

interface IHomeProps {
  feed: IFeed[];
}

const Page = ({ feed }: IHomeProps) => {
  return (
    <>
      <NavBar data={feed} />
      <main className="flex flex-col items-center">
        <div className="container flex justify-between px-14 mt-14 row-1-wrapper">
          <div className="flex left-items-wrapper">
            <Image
              src="/assets/icon/file-basket-icon.svg"
              width={32.5}
              height={27.5}
              alt="file basket icon"
            />
            <h1 className="text-[32px] font-medium ml-3 ">My books</h1>
            <p className="px-5 py-3 rounded-full ml-7 bg-gray-900/20">
              2 Done {feed.filter((value) => value.done === true).length}
            </p>
            <p className="px-5 py-3 ml-3 rounded-full bg-gray-900/20">
              10 In Progress{' '}
              {feed.filter((value) => value.done === false).length}
            </p>
          </div>
          <button className="px-5 py-3 border rounded-full border-emerald-500 bg-emerald-500/20 text-emerald-500">
            + Add New Book
          </button>
        </div>
        <div className="container grid justify-center grid-cols-5 gap-11 px-14 row-2-wrapper mt-11">
          {feed.map((book) => {
            return <BookCard key={book.id} data={book} />;
          })}
        </div>
      </main>
    </>
  );
};
export default Page;
