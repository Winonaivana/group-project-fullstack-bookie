// dev purpose only import
import { getLocalData } from '@/libs/localdata';
//
import NavBar from '@/components/NavBar';
import { GetServerSideProps } from 'next';

const getServerSideProps: GetServerSideProps = async () => {
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
  return (
    <>
      <NavBar data={feed} />
      <main className="container flex justify-center ">
        <p>test</p>
      </main>
    </>
  );
};
export default Page;
