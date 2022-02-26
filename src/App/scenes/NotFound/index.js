import { Link } from 'react-router-dom'

// styles
import './assets/NotFound.scss'

const NotFound = () => (
  <main className='NotFound'>
    <div className='centered'>
      <h1>404! - Page Not Found!!!!</h1>
      <p>The page you are looking for does not exists!</p>
      <p>Try with <Link to='/posts'>Posts</Link> page.</p>
    </div>
  </main>
)

export default NotFound
