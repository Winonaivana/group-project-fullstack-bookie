import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';
import NavBar from '@/components/NavBar';
import { prisma } from '@/libs/db';

import { IFeed } from '@/pages/home';

import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const books = await prisma.book.findMany();
  const book = await prisma.book.findUnique({
    where: {
      id: params?.id as string,
    },
  });
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
  const handleDelete = () => {};
  return (
    <>
      <NavBar data={books}></NavBar>
      <div className="mt-8 flex justify-center items-center">
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
          <div className="flex  mt-11 gap-6 max-w-2xl">
            <div>
              <div className="min-w-[200px]">
                <img src={book.coverImgUrl} alt=""></img>
              </div>
              <div className="flex gap-4 justify-center">
                <Link href={`/books/${book.id}/edit`}>
                  {' '}
                  <EditButton></EditButton>
                </Link>
                <DeleteButton onDelete={handleDelete}></DeleteButton>
              </div>
            </div>
            <div>
              <h1 className=" text-4xl font-semibold">{book.title}</h1>
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
                <div className="flex px-3 py-1 mt-4 rounded-md bg-sky-600/20 max-w-fit">
                  <Image
                    src="/assets/icon/in-progress-icon.svg"
                    width={14}
                    height={14}
                    alt="done icon"
                    className="mr-2"
                  />
                  <p className="text-sky-600 text-sm">In Progress</p>
                </div>
              </div>
              <div className="px-3 py-1 mt-2 rounded-md bg-gray-300 max-w-fit">
                <p className="text-gray-700 text-sm">{book.genres}</p>
              </div>
              <div className="mt-2">
                <p>{book.notes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
