import { HashRouter, Routes ,Route } from 'react-router-dom' 
import Pokemon from './components/pokemon'
import NotFound from './components/NotFound'
import Home from './components/home'
import Navbar from "./components/Navbar";

function App() {
 
  return (
   <HashRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pokemon/:id' element={<Pokemon />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
   </HashRouter>
  )
}

export default App
