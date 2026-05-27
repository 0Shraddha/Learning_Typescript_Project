import { Info } from './component/about/Info';
import './App.css';
import { CardComponent } from './component/card/CardComponent';
import { Routes, Route} from 'react-router-dom';
import Navbar from './component/navbar/navbar';

import {Home} from './pages/Home'
import {PatternDetail} from './pages/PatternDetail';
import {UploadPattern} from './pages/UploadPattern';


function App() {

  return (
   <div className="App">
    <Navbar />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pattern-detail' element={<PatternDetail />} />
      <Route path='/upload-pattern' element={<UploadPattern />} />
    </Routes>

      <Info name='Shraddha Dongol' bio='Welcome to my Pattern Library' styles={{marginBottom: 0, color : 'palevioletred'}} />


      <div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(130px, 1fr))",

        gap: "24px",
        padding: "50px",
       
    }}
>

    <CardComponent
        title="Keychains Crochet"
        count={24}
    />

    <CardComponent
        title="Tapestry Crochet"
        count={18}
    />

    <CardComponent
        title="Knitting Collections"
        count={32}
    />


<CardComponent
        title="Keychains Crochet"
        count={24}
    />

</div>



   </div>
  );
}

export default App;
