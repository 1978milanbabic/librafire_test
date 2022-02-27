import { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
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
    }
  }
`

const Post = props => {
  // states
  const [article, setArticle] = useState()

  // params
  let { id: postId } = useParams()

  // posts list of ids
  let postIds = useContext(PostsContext)

  const [getArticle, { called, loading, data }] = useLazyQuery(GET_ARTICLE, {
    fetchPolicy: 'network-only',
    onCompleted: resp => {
      console.log(resp)
      if (resp && resp.post) {

      } else {
        // fault response
        let err = new Error('graphQL server bad response!')
        return Promise.reject(err)
      }
    }
  })

  useEffect(() => {
    let postIdent = parseInt(postId)
    // fetch article data
    getArticle({ variables: { id: postIdent } }).catch(err => {
      console.log(err)
      // **** here we can redirect to some graphql error page!!!
    })
  }, [])

  return (
    <article className='Post'>
      <header>{postIds.postsIDs}</header>
      <p onClick={() => postIds.setPostsIDs('clicked!')}>this is Post</p>
    </article>
  )
}

export default Post
