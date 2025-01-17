import React, { useState } from "react";
import styles from "../../styles/SearchInput.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ ...props }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className={styles.searchInputWrapper}>
      <input
        className={styles.searchInput}
        placeholder="Search for your tasks here..."
        value={searchQuery}
        onChange={handleChange}
        {...props}
      />
      <div className={styles.iconWrapper}>
        {searchQuery ? <IoCloseOutline onClick={handleClear} /> : <CiSearch />}
      </div>
    </div>
  );
};

export default SearchInput;
