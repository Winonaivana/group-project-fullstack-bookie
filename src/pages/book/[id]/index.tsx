import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { prisma } from '@/libs/db';
import { Book } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const book = await prisma.book.findFirst({
    where: {
      id: params?.id as string,
    },
  });

  return {
    props: { book },
  };
};

interface IBookProps {
  book: Book;
}

const Page = ({ book }: IBookProps) => {
  return (
    <main>
      <p>{book.title}</p>
      <p>{book.writer}</p>
      <p className="test">{book.notes}</p>
    </main>
  );
};

export default Page;
