import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import { PostsContext } from '../..'

// styles
import './assets/Post.scss'

const GET_ARTICLE = gql`
  query GetArticle (
    $id: ID!
  ) {
    post (id: $id) {
      id
      title
      body
      user {
        id
        name
        address {
          city
          zipcode
          street
        }
      }
      comments {
        data {
          body
          name
        }
      }
    }
  }
`

const Post = () => {
  // states
  const [article, setArticle] = useState()
  const [prevID, setPrevID] = useState(null)
  const [nextID, setNextID] = useState(null)
  const [forceRerender, setForceRerender] = useState(0)

  // params
  let { id: postId } = useParams()

  // posts list of IDs from context
  let { postsIDs } = useContext(PostsContext)

  // define fetch article
  const [getArticle, { called, loading, data }] = useLazyQuery(GET_ARTICLE, {
    fetchPolicy: 'network-only',
    onCompleted: resp => {
      if (resp && resp.post) {
        setArticle(resp.post)
      } else {
        // fault response
        let err = new Error('graphQL server bad response!')
        return Promise.reject(err)
      }
    }
  })

  useEffect(() => {
    // fetch article data
    let postIdent = parseInt(postId)
    getArticle({ variables: { id: postIdent } }).catch(err => {
      console.log(err)
      // **** here we can redirect to some graphql error page!!!
    })
    // set previous and next page
    if (postsIDs) {
      // get to page from list
      let currentPosition = postsIDs.indexOf(postId)
      setPrevID(currentPosition === 0 ? null : postsIDs[currentPosition - 1])
      setNextID(currentPosition === postsIDs.length - 1 ? null : postsIDs[currentPosition + 1])
    } else {
      // get to page form url
      setPrevID(null)
      setNextID(null)
    }
  }, [forceRerender, postsIDs])

  // navigation links
  const handlePreventDisabledLink = event => {
    if (event.target.className === 'disabled') {
      event.preventDefault()
    } else {
      setForceRerender(forceRerender + 1)
    }
  }

  return (
    <article className='Post'>
      {called && loading && (
        <p>loading</p>
      )}
      {data && article && (
        <>
          <div className='article'>
            <header>
              <h1>{article.title}</h1>
            </header>
            <p>{article.body}</p>
          </div>
          <nav>
            <Link
              className={(prevID !== null) ? '' : 'disabled'}
              to={`${(prevID === null) ? '/' : `/posts/${prevID}`}`}
              onClick={handlePreventDisabledLink}
            >
                go previous
            </Link>
            <Link
              className={(nextID !== null ? '' : 'disabled')}
              to={`${(nextID === null) ? '/' : `/posts/${nextID}`}`}
              onClick={handlePreventDisabledLink}
            >
              go next
            </Link>
          </nav>
          <div className='author'>
            <div className='author-name'>
              <p>Author Name</p>
              <p>{article.user.name}</p>
            </div>
            <div className='author-address'>
              <p>Address</p>
              <p>{`${article.user.address.city}, ${article.user.address.zipcode}, ${article.user.address.street}`}</p>
            </div>
          </div>
          <h2>Comments</h2>
          {article.comments &&
            article.comments.data &&
            article.comments.data.length > 0 &&
            article.comments.data.map((comment, i) => (
              <div className='comment' key={i}>
                <h3>{comment.name}</h3>
                <p>{comment.body}</p>
              </div>
          ))}
        </>
      )}
    </article>
  )
}

export default Post
