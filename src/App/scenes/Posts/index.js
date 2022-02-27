import { useState } from 'react'

// components
import PaginatedItems from './components/PaginatedItems'

// styles
import './assets/Posts.scss'

const Posts = () => {
  // states
  const [nmbOfPosts, setNmbOfPosts] = useState()

  return (
    <main className='Posts'>
      <header>
        <div className='inner-container'>
          <p>Posts found: {nmbOfPosts || '0'}</p>
        </div>
      </header>
      {/* show paginated Items and pagination nav */}
      <section className='paginated-items'>
        <div className='inner-container'>
          <PaginatedItems setPostsFound={val => setNmbOfPosts(val)} />
        </div>
      </section>
    </main>
  )

}

export default Posts
