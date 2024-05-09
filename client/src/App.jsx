import './App.css'
import { useNavigate, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import 'react-multi-carousel/lib/styles.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={'/'} element={<Homepage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
