import './App.css';
import Greet from './components/Greet';
import { Person } from './components/Person';
import { Pattern } from './components/Pattern';


function App() {
  const personName = {
    first : 'Shraddha',
    last : 'Dongol'
  }

  const PatternList = [
    {
      name : 'Pattern 1',
      description : 'This is the first pattern'
    },
    {
      name : 'Pattern 2',
      description : 'This is the second pattern'
    },
    {
      name : 'Pattern 3',
      description : 'This is the third pattern'
    }
  ]

  return (
    <div className="App">
     <Greet name="Shraddha" patternCount={10} hasPatterns={false} />

     <Greet name="Shraddha" patternCount={10} hasPatterns={true} />
    
    <Person name={personName} />

    <Pattern names={PatternList} />
    </div>
  );
}

export default App;
