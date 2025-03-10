import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Home from './components/Home';
import Menu from './components/Menu';
import Order from './components/Order';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <BrowserRouter basename="/restaurant">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App