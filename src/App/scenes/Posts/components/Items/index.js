import { Link } from 'react-router-dom'

// styles
import './assets/Items.scss'

const Items = ({ currentItems }) => (
  <>
    {currentItems && currentItems.map((item, i) => (
      <article className='Items' key={i}>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
        <Link to={`/posts/${item.id}`}>Read more -</Link>
      </article>
    ))}
  </>
)

export default Items
