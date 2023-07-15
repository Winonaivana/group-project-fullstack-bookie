import NavBar from '@/components/NavBar';
import { prisma } from '@/libs/db';
import { GetServerSideProps } from 'next';
import { IFeed } from '../home';
import BookForm from '@/components/BookForm';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.book.findMany();
  const post = {
    id: '',
    title: '',
    writer: '',
    genres: '',
    coverImgUrl: '',
    notes: '',
    done: false,
  };
  return {
    props: { feed, post },
  };
};

export interface IFormInput {
  title: string;
  writer: string;
  genres: string;
  coverImgUrl: string;
  notes: string;
  userId: string;
  done: boolean;
}

interface INewBookPageProps {
  feed: IFeed[];
  post: IFormInput;
}

const NewContactPage = ({ feed, post }: INewBookPageProps) => {
  return (
    <>
      <NavBar data={feed} />
      <main></main>
      <BookForm
        handleSubmit
        onSubmit
        errors
        register
        isSubmitting
        data={post}
        type="create"
      />
    </>
  );
};
export default NewContactPage;
