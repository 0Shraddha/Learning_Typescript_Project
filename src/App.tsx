import './App.css';
import { CardComponent } from './CustomComponent/card/CardComponent';
import { Routes, Route} from 'react-router-dom';
import Navbar from './CustomComponent/navbar/navbar';

import {Home} from './pages/Home'
import {PatternList} from './pages/PatternList';
import {UploadPattern} from './pages/UploadPattern';
import { WindowContainer } from './CustomComponent/window/WindowContainer';
import { PatternDetail } from './pages/PatternDetail';
import Playground from './pages/Playground';


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
      <Route path='/playground' element={<Playground />} />
    </Routes>
</WindowContainer>



   </div>
  );
}

export default App;
