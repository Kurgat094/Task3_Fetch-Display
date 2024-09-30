import './App.css';
import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();

        // Fetch posts
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsResponse.json();

        // Map users to their post count
        const usersWithPostCount = usersData.map(user => {
          const postCount = postsData.filter(post => post.userId === user.id).length;
          return { ...user, postCount };
        });

        setUsers(usersWithPostCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUsersAndPosts();
  }, []);

  return (
    <div className="app-container">
      <h1>User List with Post Count</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-card">
              <h2>{user.name}</h2>
              <p>Posts: {user.postCount}</p>
            </li>
          ))}
        </ul>
        </div>
        
      )}
    </div>
  );
}

export default App;



