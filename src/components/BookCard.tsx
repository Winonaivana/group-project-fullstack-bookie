import Image from 'next/image';

const BookCard = () => {
  return (
    <div className="book-card-wrapper">
      <Image src="https://fakeimg.pl/190x250" width={190} height={250} alt="" />
    </div>
  );
};
export default BookCard;
