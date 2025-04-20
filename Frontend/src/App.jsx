import { useState } from 'react'
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import { Toaster } from "react-hot-toast"
import Cart from './pages/cart/Cart'
import { CountProvider } from './components/context/CountContext'
import Navbar from './components/Navbar/Navbar'
import Order from "./pages/order/Order"
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <CountProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product/:id' element={<Products/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/order' element={<Order/>} />
    </Routes>
    </BrowserRouter>
    <Toaster/>
    </CountProvider>
    </>
  )
}

export default App
