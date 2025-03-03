import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Home from './components/Home';
import Menu from './components/Menu';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App