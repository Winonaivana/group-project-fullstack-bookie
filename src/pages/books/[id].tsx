import NavBar from '@/components/NavBar';
import { prisma } from '@/libs/db';
import { Book } from '@prisma/client';
import { GetServerSideProps } from 'next';

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
  return (
    <>
      <NavBar></NavBar>
    </>
  );
};

export default Book;
