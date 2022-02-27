import { Link } from 'react-router-dom'

// styles
import './assets/Items.scss'

const Items = ({ currentItems }) => (
  <section className='Items'>
    {currentItems && currentItems.map((item, i) => (
      <article className='Item' key={i}>
        <div className='Item-inner'>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <Link to={{
            pathname: `/posts/${item.id}`,
            state: { articlesIdList: [1, 2, 3] }
          }}>
            Read More <span>&#8594;</span>
          </Link>
        </div>
      </article>
    ))}
  </section>
)

export default Items
