import React, { useState, useRef } from 'react';
import './BookableList.less';
import { bookables } from "../../mockData.json";

const BookableList = () => {
  const [bookIndex, setBookIndex] = useState(0);
  const [group, setGroup] = useState("Rooms");
  // 从 bookables 数组中提取出唯一的 group 值，并将它们存储到一个新的数组 groups 中
  const groups = [...new Set(bookables.map(item => item.group))];
  const bookablesInGroup = bookables.filter(item => item.group === group);

  const handleNext = () => {
    setBookIndex(prevIndex => (prevIndex + 1) % bookablesInGroup.length);
  };
  const changeGroup = (e) => {
    setGroup(e.target.value);
    setBookIndex(0);
  };
  const inputRef = useRef(null);

  const getInputValue = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div className='book-list-container'>
      <select
        value={group}
        onChange={changeGroup}>
        {groups.map((item, index) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <h1>Bookable List</h1>

      {bookablesInGroup.map((item, index) => (
        <button
          key={item.id}
          className={index === bookIndex ? "selected" : "room-button"}
          onClick={() => setBookIndex(index)}>
          {item.title}
        </button>
      ))}

      <button
        className='next-button'
        onClick={handleNext}
        autoFocus>
        Next
      </button>

      <input ref={inputRef} type="text" />
      <button onClick={getInputValue}>获取输入框中的值</button>
    </div>
  );
};

export default BookableList;