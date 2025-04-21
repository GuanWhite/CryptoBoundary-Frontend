import React, { useState, useEffect } from 'react';

const PickerUser = () => {
  const mokeUserData = [
    {
      uid: 1,
      uname: 'user1',
      uimage: "",
      unotes: "this is user 1",
    },
    {
      uid: 2,
      uname: 'user2',
      uimage: "",
      unotes: "this is user 2",
    },
    {
      uid: 3,
      uname: 'user3',
      uimage: "",
      unotes: "this is user 3",
    },
    {
      uid: 4,
      uname: 'user4',
      uimage: "",
      unotes: "this is user 4",
    },
  ];

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // fetch data from API
    setUserData(mokeUserData);
  }, []);

  return (
    <div>
      <select>
        {/* <option value="user1">User 1</option> */}
        {userData.map((user) => {
          return (
            <option key={user.uid} value={user.uid}>
              {user.uname}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PickerUser;