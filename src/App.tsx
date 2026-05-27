import './App.css';
import { CardComponent } from './component/card/CardComponent';
import { Routes, Route} from 'react-router-dom';
import Navbar from './component/navbar/navbar';

import {Home} from './pages/Home'
import {PatternDetail} from './pages/PatternDetail';
import {UploadPattern} from './pages/UploadPattern';
import { WindowContainer } from './component/window/WindowContainer';


function App() {

  return (
    
   <div className="App">

    <Navbar />


<WindowContainer>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pattern-detail' element={<PatternDetail />} />
      <Route path='/upload-pattern' element={<UploadPattern />} />
    </Routes>

</WindowContainer>



   </div>
  );
}

export default App;
