// dev purpose only import
import { getLocalData } from '@/libs/localdata';
//
import NavBar from '@/components/NavBar';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await getLocalData();
  return {
    props: { feed },
  };
};

export interface IFeed {
  id: string;
  title: string;
  writer: string;
  done: boolean;
}

interface IHomeProps {
  feed: IFeed[];
}

const Page = ({ feed }: IHomeProps) => {
  console.log(feed, 'IHomeProps');
  return (
    <>
      <NavBar data={feed} />
      <main className="container flex justify-center ">
        {feed.map((book) => {
          return (
            <div key={book.id} className="flex flex-col m-3 border-4">
              <h1>{book.title}</h1>
              <h2>{book.writer}</h2>
            </div>
          );
        })}
      </main>
    </>
  );
};
export default Page;
