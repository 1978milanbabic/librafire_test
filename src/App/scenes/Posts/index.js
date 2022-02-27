import { useState, useEffect } from 'react'

// components
import PaginatedItems from './components/PaginatedItems'

// styles
import './assets/Posts.scss'

const Posts = () => {
  // states
  const [nmbOfPosts, setNmbOfPosts] = useState()

  return (
    <main className='Posts'>

      <p>Posts found: {nmbOfPosts || ''}</p>
      {/* search inputs */}

      {/* show paginated Items and pagination nav */}
      <PaginatedItems setPostsFound={val => setNmbOfPosts(val)} />
    </main>
  )

}

export default Posts
