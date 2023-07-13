import Image from 'next/image';

const BookCard = () => {
  return (
    <div className="book-card-wrapper max-w-[250px]">
      <Image
        src="/assets/images/dummy-book-cover.png"
        width={190}
        height={250}
        alt=""
        className="rounded-md"
      />
      <h2 className="mt-4 text-2xl font-semibold">
        The Design of Everyday Things
      </h2>
      <div className="flex mt-4 author-wrapper">
        <Image
          src="/assets/icon/writer-icon.svg"
          width={14}
          height={14}
          alt="author icon"
          className="mr-2 "
        />{' '}
        <p>Don Norman</p>
      </div>
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
    </div>
  );
};
export default BookCard;
