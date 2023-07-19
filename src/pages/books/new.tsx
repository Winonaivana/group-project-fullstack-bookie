import NavBar from '@/components/NavBar';
import { prisma } from '@/libs/db';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IFeed } from '../home';
import BookForm from '@/components/BookForm';
import * as yup from 'yup';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
// refactoring preparation, when use this type of code, remove <IFormInput> from useForm, and add the schema as usual with hookform. this code move the validation of type into the yup object scheme, so it will be easier to  write the error message.
// const schema:yup.ObjectSchema<IFormInput> = yup.object().shape({
//   title: yup.string().required('Please fill in the book title'),
//   writer: yup.string().required('Please fill in the writter'),
//   genres: yup.string().required('Please specified the genre'),
//   coverImgUrl: yup.string().required('Please find an image for the cover'),
//   done: yup.boolean(),
//   notes: yup
//     .string()
//     .required('Please tell us about your first impression about this book'),
// }).required();

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

const NewBookPage = ({ feed, post }: INewBookPageProps) => {
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      console.log({ formData }, 'formdata');
      await axios.post(
        '/api/books',
        {
          ...formData,
          userId: session.data?.user.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      router.push('/');
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Create Book | Bookie</title>
      </Head>
      <NavBar data={feed} />
      <main className="flex flex-col items-center mt-20">
        <BookForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          register={register}
          data={post}
          type="create"
        />
      </main>
    </>
  );
};
export default NewBookPage;
