import { useState, useEffect } from 'react'

// components
import PaginatedItems from './components/PaginatedItems'

// styles
import './assets/Posts.scss'


// page component
const Posts = () => {
  // states


  return (
    <main className='Posts'>

      <p>this is Posts</p>
      {/* show paginated Items and pagination nav */}
      <PaginatedItems />
    </main>
  )

}

export default Posts
