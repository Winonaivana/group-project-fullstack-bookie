import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import BookCard from '@/components/BookCard';
import { prisma } from '@/libs/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';
import Head from 'next/head';

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
      <Head>
        <title>Home | Bookie</title>
      </Head>
      <NavBar data={feed} />
      <main className="flex flex-col items-center">
        <div className="container flex justify-between px-14 mt-14 row-1-wrapper ph:px-6">
          <div className="flex left-items-wrapper ph:flex-col">
            <div className="flex items-center my-books-wrapper">
              <Image
                src="/assets/icon/file-basket-icon.svg"
                width={32.5}
                height={27.5}
                alt="file basket icon"
              />
              <h1 className="text-[32px] font-medium ml-3 ph:text-2xl ">
                My books
              </h1>
            </div>
            <div className="flex items-center book-status-wrapper ph:mt-3">
              <p className="px-5 py-3 rounded-full bg-gray-900/20 ml-7 ph:ml-0 ph:py-1 ph:text-xs">
                {feed.filter((value) => value.done === true).length} Done
              </p>
              <p className="px-5 py-3 ml-3 rounded-full bg-gray-900/20 ph:py-1 ph:text-xs">
                {feed.filter((value) => value.done === false).length} In
                Progress
              </p>
            </div>
          </div>
          <Link
            href="/books/new"
            className="px-5 py-3 border rounded-full border-emerald-500 bg-emerald-500/20 text-emerald-500 ph:h-[36px]  ph:py-1"
          >
            + Add
          </Link>
        </div>
        <div className="container grid justify-center grid-cols-5 gap-11 px-14 row-2-wrapper mt-11 ph:grid-cols-1">
          {feed.map((book) => {
            return <BookCard key={book.id} data={book} />;
          })}
        </div>
      </main>
    </>
  );
};
export default Home;
