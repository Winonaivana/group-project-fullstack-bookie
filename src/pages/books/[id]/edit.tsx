import { useSession } from 'next-auth/react';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useEffect, useState } from 'react';
import { prisma } from '@/libs/db';
import { Book } from '@prisma/client';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export interface IFormInput {
  title: string;
  writer: string;
  genres: string;
  coverImgUrl: string;
  notes: string;
  done: boolean;
}

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
  const contact = await prisma.book.findFirst({
    where: {
      id: context.params?.id as string,
    },
  });

  if (!contact) {
    return {
      notFound: true,
    };
  }

  if (session.user.id !== contact.userId) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      feed,
      data: contact,
    },
  };
};

function NewBook({ feed, data }: { feed: Book[]; data: Book }) {
  const router = useRouter();
  const session = useSession();
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setShowError(false);
    try {
      await axios.put(
        `/api/books/${data.id}`,
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
      setShowError(true);
    }
  };

  useEffect(() => {
    reset({
      title: data.title,
      writer: data.writer,
      genres: data.genres,
      coverImgUrl: data.coverImgUrl,
      done: data.done,
      notes: data.notes,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Edit Book | Bookie</title>
      </Head>
      <NavBar data={feed} />
      <section className={`${inter.className} py-8`}>
        <div className="relative max-w-screen-xl px-8 py-6 mx-auto ">
          <div className="max-w-lg mx-auto space-y-10">
            <div className="flex items-center justify-between w-full gap-3 text-gray-00">
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <h1
                  className={`${jakarta.className} text-2xl sm:text-4xl font-bold`}
                >
                  Edit Book
                </h1>
              </div>
              <Link
                href={`/books/${data.id}`}
                className="text-[12px] text-red-500"
              >
                Cancel
              </Link>
            </div>

            {showError && (
              <div
                id="toast-danger"
                className={`${inter.className} flex items-center w-full max-w-lg p-4 rounded-lg shadow text-red-400 border-2 border-red-700/75 bg-red-700/20`}
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Error icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">
                  Failed to edit the contact. Please try again.
                </div>
              </div>
            )}

            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Title
                    </label>
                    {errors.title?.type === 'required' && (
                      <span className="text-xs text-red-500">
                        *Field required
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    id="title"
                    className="border  text-sm rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-white border-gray-700/20 placeholder-gray-400 text-gray-800 "
                    placeholder="Great Book"
                    {...register('title', { required: true })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="writer"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Writer
                    </label>
                    {errors.writer?.type === 'required' && (
                      <span className="text-xs text-red-500">
                        *Field required
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    id="writer"
                    className="border  text-sm rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-white border-gray-700/20 placeholder-gray-400 text-gray-800 "
                    placeholder="Daniel Kahneman"
                    {...register('writer', { required: true })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="genres"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Genres
                    </label>
                    {errors.genres?.type === 'required' && (
                      <span className="text-xs text-red-500">
                        *Field required
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    id="genres"
                    className="border  text-sm rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-white border-gray-700/20 placeholder-gray-400 text-gray-800 "
                    placeholder="Fiction"
                    {...register('genres', { required: true })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="coverImgUrl"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Cover Image URL
                    </label>
                    {errors.coverImgUrl && (
                      <span className="text-xs text-red-500">
                        *Enter valid URL
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    id="coverImgUrl"
                    className="border  text-sm rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-white border-gray-700/20 placeholder-gray-400 text-gray-800 "
                    placeholder="https://images.unsplash.com/profile"
                    {...register('coverImgUrl', {
                      required: true,
                      pattern: {
                        value:
                          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                        message: 'Enter valid URL',
                      },
                    })}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="doneReading"
                    type="checkbox"
                    {...register('done')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="doneReading"
                    className="ml-2 text-sm font-medium text-gray-800"
                  >
                    Done Reading
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Notes
                    </label>
                    {errors.notes?.type === 'required' && (
                      <span className="text-xs text-red-500">
                        *Field required
                      </span>
                    )}
                  </div>
                  <textarea
                    id="notes"
                    rows={6}
                    className="border  text-sm rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-white border-gray-700/20 placeholder-gray-400 text-gray-800 "
                    {...register('notes', { required: true })}
                    placeholder="Your bio here"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-5 min-w-[10rem] py-2.5 mt-4 sm:mt-6 text font-medium text-center text-white bg-emerald-500 rounded-lg focus:ring-4 focus:ring-blue-600  hover:bg-emerald-700"
              >
                {isSubmitting ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-6 h-6 text-gray-800 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      className="fill-emerald-200"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      className="fill-emerald-900"
                    />
                  </svg>
                ) : (
                  'Save'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewBook;
