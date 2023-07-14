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

interface INewContactPageProps {
  feed: IFeed[];
}

const NewContactPage = ({ feed }: INewContactPageProps) => {
  return <NavBar data={feed} />;
};
export default NewContactPage;
