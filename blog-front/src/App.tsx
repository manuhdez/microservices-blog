import React from 'react';
import Header from './components/Header/Header';
import PostCreate from './components/Posts/PostCreate';
import PostsList from './components/Posts/PostsList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <PostCreate />
        <PostsList />
      </main>
    </div>
  );
}

export default App;
