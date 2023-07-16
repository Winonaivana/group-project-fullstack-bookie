import Image from 'next/image';

const SearchBar = () => {
  return (
    <div
      className="relative "
      // onBlur={() => {
      //   setShowResult(false);
      // }}
    >
      <input
        placeholder="Search"
        className="py-3 pr-3 pl-11 rounded-3xl w-80 placeholder:text-[#4B5563]"
      />
      <Image
        src="/assets/icon/search-icon.svg"
        width={20}
        height={20}
        alt="search icon"
        className="absolute top-[14px] left-3"
      />
    </div>
  );
};

export default SearchBar;
