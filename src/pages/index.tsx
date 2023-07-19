import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import BookCard from '@/components/BookCard';
import { prisma } from '@/libs/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const feed = await prisma.book.findMany({
    where: {
      userId: session.user.id,
    },
  });
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

const Home = ({ feed }: IHomeProps) => {
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
              {feed.filter((value) => value.done === true).length} Done
            </p>
            <p className="px-5 py-3 ml-3 rounded-full bg-gray-900/20">
              {feed.filter((value) => value.done === false).length} In Progress
            </p>
          </div>
          <Link
            href="/books/new"
            className="px-5 py-3 border rounded-full border-emerald-500 bg-emerald-500/20 text-emerald-500"
          >
            + Add New Book
          </Link>
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
export default Home;
