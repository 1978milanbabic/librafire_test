import { Route, Routes } from 'react-router-dom'

// components
import Home from './scenes/Home'
import Posts from './scenes/Posts'
import Post from './scenes/Post'
import NotFound from './scenes/NotFound'

const App = () => {

  return (
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
  )
}

export default App
