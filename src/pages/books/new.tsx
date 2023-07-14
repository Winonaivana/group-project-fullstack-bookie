import NavBar from '@/components/NavBar';
import { Form } from 'react-hook-form';
import { IFeed } from '../home';

export interface IFormInput {
  title: string;
  writer: string;
  genres: boolean;
  coverImgUrl: string;
  notes: string;
  userId: string;
}

interface INewBookPageProps {
  feed: IFeed[];
}

const NewContactPage = ({ feed }: INewBookPageProps) => {
  return <NavBar data={feed} />;
};
export default NewContactPage;
