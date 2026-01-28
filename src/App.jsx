import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import EndPage from './pages/end-page'
import GamePage from './pages/game-page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path={'/'} element={<GamePage/>}></Route>
      <Route path={'/end'} element={<EndPage/>}></Route>
    </Routes>
  )
}

export default App
