import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';
import NavBar from '@/components/NavBar1';
import { prisma } from '@/libs/db';
import { Book } from '@prisma/client';

import { GetServerSideProps } from 'next';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await prisma.book.findUnique({
    where: {
      id: params?.id as string,
    },
  });
  return {
    props: {
      data: book,
    },
  };
};

interface BookProp {
  data: Book;
}

const Book = ({ data }: BookProp) => {
  const handleDelete = () => {};
  return (
    <>
      <NavBar></NavBar>
      <div className="mt-8 flex justify-center items-center">
        <div>
          <div className="flex left-items-wrapper">
            <Image
              src="/assets/icon/book.svg"
              width={32.5}
              height={27.5}
              alt="file basket icon"
            />
            <h1 className="text-[32px] font-medium ml-3 ">Book Details</h1>
          </div>
          <div className="flex  mt-11 gap-6 max-w-2xl">
            <div>
              <div className="min-w-[200px]">
                <Image
                  src={'/assets/images/book-cover.svg'}
                  width={200}
                  height={250}
                  alt=""
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="flex gap-4 justify-center">
                <EditButton></EditButton>
                <DeleteButton onDelete={handleDelete}></DeleteButton>
              </div>
            </div>
            <div>
              <h1 className=" text-4xl font-semibold">
                The Design of Everyday Things
              </h1>
              <div className="flex gap-5">
                <div className="flex mt-4 author-wrapper">
                  <Image
                    src="/assets/icon/writer.svg"
                    width={14}
                    height={14}
                    alt="author icon"
                    className="mr-2 "
                  />{' '}
                  <p>Don Trevor</p>
                </div>
                <div className="flex px-3 py-1 mt-4 rounded-md bg-sky-600/20 max-w-fit">
                  <Image
                    src="/assets/icon/in-progress.svg"
                    width={14}
                    height={14}
                    alt="done icon"
                    className="mr-2"
                  />
                  <p className="text-sky-600 text-sm">In Progress</p>
                </div>
              </div>
              <div className="px-3 py-1 mt-2 rounded-md bg-gray-300 max-w-fit">
                <p className="text-gray-700 text-sm">Adventure</p>
              </div>
              <div className="mt-2">
                <p>
                  The Design of Everyday Things is a best-selling book by
                  cognitive scientist and usability engineer Donald Norman about
                  how design serves as the communication between object and
                  user, and how to optimize that conduit of communication in
                  order to make the experience of using the object pleasurable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
