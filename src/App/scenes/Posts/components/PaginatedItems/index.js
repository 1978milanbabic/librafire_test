import { useState, useEffect } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { gql, useLazyQuery } from '@apollo/client'

// styles
import './assets/PaginatedItems.scss'

// components
import Items from '../Items'

const GET_ALL_POSTS = gql`
  query GetAllPosts (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          id
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`

const PaginatedItems = props => {
  // layout constant
  const itemsPerPage = 14

  // states
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(10)
  const [currentItems, setCurrentItems] = useState(null)

  // gql lazyQuery
  const [getAllPosts, { called, loading, data }] = useLazyQuery(GET_ALL_POSTS, {
    fetchPolicy: 'network-only',
    onCompleted: resp => {
      if (resp && resp.posts && resp.posts && resp.posts.meta) {
        // set data
        setCurrentItems(resp.posts.data)
        // set number of posts
        let nmb = resp.posts.meta.totalCount
        setCount(Math.ceil(nmb / itemsPerPage))
        // send number of post to parent component - to set header
        props.setPostsFound(nmb)
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

  // Fetch items graphQL on page set (also on initial page)
  useEffect(() => {
    getAllPosts({ variables: {
      options: {
        paginate: {
          page,
          limit: itemsPerPage
        }
      }
    }})
  }, [page])

  // paginate/page change
  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <>
      {called && loading && (
        <p>Loading...</p>
      )}
      {!loading && data && (
        <>

          <Items currentItems={currentItems} />
        </>
      )}
      <Pagination count={count} page={page} onChange={handleChange} />
    </>
  )
}

export default PaginatedItems
