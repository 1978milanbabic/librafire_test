import { createContext, useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

// components
import Home from './scenes/Home'
import Posts from './scenes/Posts'
import Post from './scenes/Post'
import NotFound from './scenes/NotFound'



// list of posts ids context
export const PostsContext = createContext()

const App = () =>{
  const [postsIDs, setPostsIDs] = useState()

  // set context of IDs once on load
  let posts = useMemo(() => {
    return 'starting point!'
  }, [])
  useEffect(() => {
    setPostsIDs(posts)
  }, [])

  return (
    <PostsContext.Provider value={{postsIDs, setPostsIDs}}>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home />
            }
          />
          <Route
            path='/posts'
            exact
            element={
              <Posts />
            }
          />
          <Route
            path='/posts/:id'
            element={
              <Post />
            }
          />
          <Route
            path='*'
            element={
              <NotFound />
            }
          />
        </Routes>
      </div>
    </PostsContext.Provider>
  )
}

export default App
