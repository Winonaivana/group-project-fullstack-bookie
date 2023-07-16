import BookCard from '@/components/BookCard';
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

export interface Feed {
  id: string;
  title: string;
  writer: string;
  genres: string;
  coverImgUrl: string;
  notes: string;
  done: boolean;
  userId: string;
}

interface BookProp {
  data: Book;
}

const Book = ({ data }: BookProp) => {
  return (
    <>
      <div>{data.title}</div>
    </>
  );
};

export default Book;
