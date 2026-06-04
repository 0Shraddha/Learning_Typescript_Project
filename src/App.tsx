import './App.css';
import { CardComponent } from './components/card/CardComponent';
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar/navbar';

import {Home} from './pages/Home'
import {PatternList} from './pages/PatternList';
import {UploadPattern} from './pages/UploadPattern';
import { WindowContainer } from './components/window/WindowContainer';
import { PatternDetail } from './pages/PatternDetail';


function App() {

  return (
    
   <div className="App">

    <Navbar />


<WindowContainer>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pattern-list' element={<PatternList />} />
      <Route path='/upload-pattern' element={<UploadPattern />} />
      <Route path='/pattern-detail' element={<PatternDetail />} />
    </Routes>
</WindowContainer>



   </div>
  );
}

export default App;
