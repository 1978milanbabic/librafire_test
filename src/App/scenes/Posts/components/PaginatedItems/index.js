import { useState, useEffect } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { gql, useLazyQuery } from '@apollo/client'

// styles
import './assets/PaginatedItems.scss'

const GET_ALL_POSTS = gql`
  query GetAllPosts (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`

const items = []
for (let kk = 1; kk < 200; kk++) { items.push({name:kk}) }

// items display
const Items = ({ currentItems }) => (
  <>
    {currentItems && currentItems.map((item, i) => (
      <div key={i}>
        <h3>Item #{item.name}</h3>
      </div>
    ))}
  </>
)

const PaginatedItems = () => {
  // layout constant
  const itemsPerPage = 14

  // states
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(10)
  const [currentItems, setCurrentItems] = useState(null)

  const [getAllPosts, { called, loading, data }] = useLazyQuery(GET_ALL_POSTS)

  useEffect(() => {
    // Fetch items graphQL
    getAllPosts({ variables: {
      options: {
        paginate: {
          page,
          limit: itemsPerPage
        }
      }
    }}).then(data => {
      console.log(data)
    }).catch(err => console.log(err))

    let pageNmb = page - 1
    // *** test ***
    // set count
    setCount((items.length) / itemsPerPage)
    // set items
    let neededArr = items.slice(pageNmb * itemsPerPage, pageNmb * itemsPerPage + itemsPerPage)
    setCurrentItems(neededArr)
  }, [page])

  const handleChange = (event, value) => {
    setPage(value)
  }
  return (
    <>
      <Items currentItems={currentItems} />
      <Pagination count={count} page={page} onChange={handleChange} />
    </>
  )
}

export default PaginatedItems
