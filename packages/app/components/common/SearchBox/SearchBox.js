import React from "react";
import styles from "./styles.css";

const SearchBox = () => {
  return (
    <div className={styles.searchBox}>
      <input className={styles.input} type="text"></input>
    </div>
  );
};

export default SearchBox;
