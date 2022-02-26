import { Link } from 'react-router-dom'

// styles
import './assets/Home.scss'

const Home = () => (
  <main className='Home'>
    <div className='centered'>
      <p>No specifications for Home - please navigate to <Link to='/posts'>posts</Link> page.</p>
    </div>
  </main>
)

export default Home
