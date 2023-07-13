import { IFeed } from '@/pages/home';
import Image from 'next/image';
import Link from 'next/link';

interface IBookCardProps {
  data: IFeed;
}

const BookCard = ({ data }: IBookCardProps) => {
  return (
    <Link
      href={`/books/${data.id}`}
      className="book-card-wrapper max-w-[250px] rounded-md hover:bg-[#10B981]/20 "
    >
      <Image
        src={'/assets/images/dummy-book-cover.png'}
        width={190}
        height={250}
        alt=""
        className="w-full h-auto rounded-md"
      />
      <h2 className="mt-4 text-2xl font-semibold">{data.title}</h2>
      <div className="flex mt-4 author-wrapper">
        <Image
          src="/assets/icon/writer-icon.svg"
          width={14}
          height={14}
          alt="author icon"
          className="mr-2 "
        />{' '}
        <p>{data.writer}</p>
      </div>
      {data.done ? (
        <div className="flex px-4 py-2 bg-[#10B981]/20 max-w-fit rounded-md mt-4">
          <Image
            src="/assets/icon/done-icon.svg"
            width={14}
            height={14}
            alt="done icon"
            className="mr-2"
          />
          <p className="text-[#10B981]">Done</p>
        </div>
      ) : (
        <div className="flex px-4 py-2 bg-[#0284C7]/20 max-w-fit rounded-md mt-4">
          <Image
            src="/assets/icon/in-progress-icon.svg"
            width={14}
            height={14}
            alt="done icon"
            className="mr-2"
          />
          <p className="text-[#0284C7]">In Progress</p>
        </div>
      )}
    </Link>
  );
};
export default BookCard;
