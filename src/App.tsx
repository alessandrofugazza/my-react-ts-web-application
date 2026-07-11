import './App.css'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Notepad from './pages/Notepad'

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notepad" element={<Notepad />} />
      </Routes>
    </>
  )
}

export default App
