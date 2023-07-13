import Image from 'next/image';
import { IFeed } from '@/pages/home';
import { useState } from 'react';

interface ISearchProps {
  data: IFeed[];
}
const SearchBar = ({ data }: ISearchProps) => {
  const [wordInput, setWordInput] = useState('test2');
  const [filteredData, setFilteredData] = useState<IFeed[]>([]);

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    setWordInput(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    console.log(newFilter, 'newFilter');
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
    <div className="relative">
      <input
        placeholder="Search"
        value={wordInput}
        onChange={handleFilter}
        className="py-3 pr-3 pl-11 rounded-3xl w-80 placeholder:text-[#4B5563]"
      />
      <Image
        src="/assets/icon/search-icon.svg"
        width={20}
        height={20}
        alt="search icon"
        className="absolute top-[14px] left-3"
      />

      {filteredData.length != 0 && (
        <div className="searchResult">
          {filteredData.slice(0, 2).map((value, key) => {
            return (
              <>
                <a>
                  <p>
                    {value.title}
                    <small>{value.writer}</small>
                  </p>
                </a>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
