import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav";
import Home from './components/Home';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App