import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Header.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProductList from './pages/ProductList.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <Router> */}
          <Header />
          {/* <Routes> */}
            {/* <Route path="/" element={<ProductList />} /> */}
          {/* </Routes> */}
        {/* </Router> */}
      </div>
    </>
  )
}

export default App
