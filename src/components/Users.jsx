import React,  { useState, useEffect }  from 'react'
import {getUser,getUserById, getUserByUserName, createUser, updateUser } from '../services/usersService'


const Users = () => {

    const [userList, setUserList] = useState([]);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [fetchedUser, setFetchedUser] = useState(null); // משתמש שאוחזר לפי ID או שם


    
    const fetchData = async () => {
        try {
          const users =   await getUser();
          setUserList(users)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchData()
    },[])

    const handleFetchUserById = async () => {
        try {
            const userbyId = await getUserById(userId);
            setFetchedUser(userbyId); // שמירת המשתמש שנמצא לפי ID
            console.log(userbyId);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFetchUserByUserName = async () => {
        try {
            const userByName = await getUserByUserName(userName);
            setFetchedUser(userByName); // שמירת המשתמש שנמצא לפי שם משתמש
            console.log(userByName);
        } catch (error) {
            console.log(error);
        }
    };
   
const handleCreateUser = async () => {
    try {
        const newUser = {userName: "new user", email: "newuser@gmail.com", password: "22555new", createdAt:"2020-10-11T12:34:56" };
        const createdUser = await createUser(newUser);
        setUserList(prevList=> [...prevList, createdUser]);
    } catch (error) {
        console.log(error);
    }
};

const handleUpdateUser = async (user) => {
    const userToUpdate = { ...user, userName: "updated user" };
    try {
        const updatedUser = await updateUser(userToUpdate);
        const updatedList = userList.map((u) => (u.userId === userToUpdate.userId ? updatedUser : u));
        setUserList(updatedList);
    } catch (error) {
        console.log(error);
    }
};


    
  return (
    <>
    <h2>All Users</h2>
    <button onClick={handleCreateUser}>Create User</button>
            <div>
                <h3>Fetch User by ID</h3>
                <input
                    type="text"
                    placeholder="Enter user ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={handleFetchUserById}>Fetch by ID</button>
            </div>
            <div>
                <h3>Fetch User by Username</h3>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={handleFetchUserByUserName}>Fetch by Username</button>
                </div>

                <>
                    <h3>All Users:</h3>
                    { userList.map(u =>   
                            <div key={u.userId}>
                                <h2>{u.userName}</h2>
                                <h4>{u.email}</h4>
                                <h4>{u.password}</h4>
                                <h4>{u.createdAt}</h4>
                                <button onClick={() => handleUpdateUser(u)}>Update user</button>
                            </div>
                        )

                    }
                </>
            
            {fetchedUser && (
                <div>
                    <h3>Fetched User:</h3>
                    <p>Id: {fetchedUser.userId}</p>
                    <Orders userId={fetchedUser?.userId} />
                    <p>Name: {fetchedUser.userName}</p>
                    <p>Email: {fetchedUser.email}</p>
                    <p>Password: {fetchedUser.password}</p>
                    <p>Created At: {fetchedUser.createdAt}</p>
                </div>
            )}
        </>

  )
}

export default Users

