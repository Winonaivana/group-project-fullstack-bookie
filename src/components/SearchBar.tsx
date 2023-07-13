import Image from 'next/image';
import { IFeed } from '@/pages/home';
import { useState } from 'react';
import Link from 'next/link';

interface ISearchProps {
  data: IFeed[];
}
const SearchBar = ({ data }: ISearchProps) => {
  const [wordInput, setWordInput] = useState('');
  const [filteredData, setFilteredData] = useState<IFeed[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    setWordInput(searchWord);
    const newFilter = data.filter((value) => {
      return (value.title + value.writer + value.genres) //can add the possible search value here
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });
    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordInput('');
  };

  return (
    <div
      className="relative "
      // onBlur={() => {
      //   setShowResult(false);
      // }}
    >
      <input
        placeholder="Search"
        value={wordInput}
        onChange={handleFilter}
        className="py-3 pr-3 pl-11 rounded-3xl w-80 placeholder:text-[#4B5563]"
        onFocus={() => {
          setShowResult(true);
        }}
      />
      <Image
        src="/assets/icon/search-icon.svg"
        width={20}
        height={20}
        alt="search icon"
        className="absolute top-[14px] left-3"
      />

      {filteredData.length != 0 && (
        <button onClick={clearInput} className="absolute top-[14px] right-5">
          X
        </button>
      )}

      {filteredData.length != 0 && showResult && (
        <>
          <div className="absolute searchResult top-[0px] rounded-3xl w-full mt-[48px] bg-white overflow-hidden ">
            {filteredData.slice(0, 5).map((value, key) => {
              return (
                <div
                  key={key}
                  className="p-3 bg-white border searchResultCard hover:bg-[#10b891]/20 hover:text-[#10b891]"
                >
                  <Link href={`/book/${value.id}`} className="">
                    <p className="">
                      {value.title}
                      <small> by {value.writer}</small>
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
