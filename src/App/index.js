import { createContext, useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'

// components
import Home from './scenes/Home'
import Posts from './scenes/Posts'
import Post from './scenes/Post'
import NotFound from './scenes/NotFound'

// get all IDs of available posts
const GET_IDS = gql`
  query GetIDs {
    posts {
      data {
        id
      }
    }
  }
`

// list of posts IDs context (for diferent posts lists - full & filtered)
export const PostsContext = createContext()

const App = () =>{
  const [postsIDs, setPostsIDs] = useState()

  let [getIDs] = useLazyQuery(GET_IDS, {
    fetchPolicy: 'network-only',
    onCompleted: resp => {
      if (resp && resp.posts && resp.posts.data) {
        setPostsIDs(resp.posts.data.map(post => {
          return post.id
        }))
      } else {
        // response incorrect
        throw new Error('graphQL server bad response!')
      }
    },
    onError: err => {
      console.log(err)
      // **** here we can redirect to some graphql error page!!!
    }
  })

  // set context of IDs once on load
  useMemo(() => {
    getIDs()
  }, [])

  // ****************** test ******************
  useEffect(() => {
    console.log('from main -> post IDs changed: ', postsIDs)
  }, [postsIDs])

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
