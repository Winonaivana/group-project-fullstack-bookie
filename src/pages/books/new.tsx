import NavBar from '@/components/NavBar';
import { prisma } from '@/libs/db';
import { GetServerSideProps } from 'next';
import { IFeed } from '../home';
import BookForm from '@/components/BookForm';
import * as yup from 'yup';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

const schema = yup.object({
  title: yup.string().required('Please fill in the book title'),
  writer: yup.string().required('Please fill in the writter'),
  genres: yup.string().required('Please specified the genre'),
  coverImgUrl: yup.string().required('Please find an image for the cover'),
  done: yup.boolean(),
  notes: yup
    .string()
    .required('Please tell us about your first impression about this book'),
});

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
  const {
    register,
    handleSubmit,
    formState: { errors },

    //this bug learn from https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29412 for implementation
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onTouched' });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    try {
      console.log({ formData }, 'formdata');
      // await axios.post(
      //   '/api/books',
      //   {
      //     ...formData,
      //     userId: session.data?.user.id,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar data={feed} />
      <main></main>
      <BookForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        data={post}
        type="create"
      />
    </>
  );
};
export default NewBookPage;
