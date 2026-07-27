import { Routes, Route} from 'react-router-dom';
import Home from './modules/dashboard/Home';
import { PatternList } from './modules/patterns/PatternsList/PatternList';
import MainUploadTab from './modules/patterns/PatternsForm/MainTab';
import Navbar from './modules/navbar/Navbar';


function App() {

  return (
    
   <div className="App">

    <Navbar />


<div className='mx-auto max-w-6xl px-4 py-8'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/pattern-list' element={<PatternList />} />
      <Route path='/upload-pattern' element={<MainUploadTab />} />
      {/* <Route path='/pattern-detail' element={<PatternDetail />} /> */}
      {/* <Route path='/playground' element={<Playground />} /> */}
    </Routes>
</div>



   </div>
  );
}

export default App;
