import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';
import NavBar from '@/components/NavBar';
import { prisma } from '@/libs/db';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { IFeed } from '@/pages/home';
import axios from 'axios';

import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const books = await prisma.book.findMany({
    where: {
      userId: session.user.id,
    },
  });
  const book = await prisma.book.findUnique({
    where: {
      id: params?.id as string,
    },
  });

  if (!book) {
    return {
      notFound: true,
    };
  }

  if (session.user.id !== book.userId) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      books,
      book,
    },
  };
};

interface BookProp {
  books: IFeed[];

  book: IFeed;
}

const Book = ({ book, books }: BookProp) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/books/${book.id}`);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title>Book Detail| Bookie</title>
      </Head>
      <NavBar data={books}></NavBar>
      <div className="flex items-center justify-center mt-8">
        <div>
          <div className="flex left-items-wrapper">
            <Image
              src="/assets/icon/book-icon.svg"
              width={32.5}
              height={27.5}
              alt="file basket icon"
            />
            <h1 className="text-[32px] font-medium ml-3 ">Book Details</h1>
          </div>
          <div className="flex max-w-2xl gap-6 ph:max-w-xs ph:justify-center ph:items-center mt-11 ph:flex-col ">
            <div className="">
              <div className="min-w-[200px]">
                <img
                  className="w-[200px] h-[300px] rounded-md"
                  src={book.coverImgUrl}
                  // alt=""
                  onError={(e) =>
                    (e.currentTarget.src =
                      '/assets/images/dummy-book-cover.png')
                  }
                ></img>
              </div>
              <div className="flex gap-4 sm:justify-center">
                <Link href={`/books/${book.id}/edit`}>
                  {' '}
                  <EditButton></EditButton>
                </Link>
                <DeleteButton onDelete={handleDelete}></DeleteButton>
              </div>
            </div>

            <div className="ph:mb-12 ">
              <div>
                <h1 className="mt-4 text-4xl font-semibold sm:mt-0">
                  {book.title}
                </h1>

                <div className="flex gap-5">
                  <div className="flex mt-4 author-wrapper">
                    <Image
                      src="/assets/icon/writer-icon.svg"
                      width={14}
                      height={14}
                      alt="author icon"
                      className="mr-2 "
                    />{' '}
                    <p>{book.writer}</p>
                  </div>
                  {book.done ? (
                    <div className="flex px-3 py-1 mt-4 rounded-md bg-emerald-500/20 max-w-fit">
                      <Image
                        src="/assets/icon/done-icon.svg"
                        width={14}
                        height={14}
                        alt="done icon"
                        className="mr-2"
                      />
                      <p className="text-emerald-500">Done</p>
                    </div>
                  ) : (
                    <div className="flex px-3 py-1 mt-4 rounded-md bg-sky-600/20 max-w-fit">
                      <Image
                        src="/assets/icon/in-progress-icon.svg"
                        width={14}
                        height={14}
                        alt="done icon"
                        className="mr-2"
                      />
                      <p className="text-sm text-sky-600">In Progress</p>
                    </div>
                  )}
                </div>
                <div className="px-3 py-1 mt-2 bg-gray-300 rounded-md max-w-fit">
                  <p className="text-sm text-gray-700">{book.genres}</p>
                </div>
                <div className="mt-2">
                  <p className="whitespace-pre-line">{book.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
