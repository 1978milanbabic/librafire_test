import { Route, Routes } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

// apollo
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graphqlzero.almansi.me/api'
})

// components
import Home from './scenes/Home'
import Posts from './scenes/Posts'
import Post from './scenes/Post'
import NotFound from './scenes/NotFound'

const App = () => (
  <ApolloProvider client={client}>
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <Home />
          }
        />
        <Route
          path='/posts'
          exact
          element={
            <Posts />
          }
        />
        <Route
          path='/posts/:id'
          element={
            <Post />
          }
        />
        <Route
          path='*'
          element={
            <NotFound />
          }
        />
      </Routes>
    </div>
  </ApolloProvider>
)

export default App
