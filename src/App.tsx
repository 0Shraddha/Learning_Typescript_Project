import './App.css';
import Greet from './components/Greet';
import { Person } from './components/Person';
import { Pattern } from './components/Pattern';
import { Status } from './components/Status';
import { Heading } from './components/Heading';
import { MainHeading } from './components/MainHeading';
import { ButtonEvent } from './components/events/ButtonEvent';
import { InputChangeEvent } from './components/events/InputChangeEvent';
import { StylePropsDemo } from './components/events/StylePropsDemo';
import { LoggedIn } from './components/state/LoggedIn';


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
      <h1>DAY 1</h1>
    <Status status='loading' />
     <Greet name="Shraddha" patternCount={10} hasPatterns={false} />

     <Greet name="Shraddha" patternCount={10} hasPatterns={true} />
    
    <Person name={personName} />

    <Pattern names={PatternList} />

    <MainHeading>
      <Heading>This is children</Heading>
    </MainHeading>
<hr />
    <h1>DAY 2</h1>
    <ButtonEvent handleClick={(event, id)=> console.log("Button Clicked!", event, id)} />
<InputChangeEvent value="Hello" handleChange={() => console.log("Input Changed!")} />
<StylePropsDemo styles={{
            border: '1px solid black',
            borderRadius: '8px',
            padding: '1rem',
            margin: '1rem'
        }} />

<LoggedIn />




    {/* //Learnings
    //1. TypeScript is a superset of JavaScript that adds static typing to the language. In TypeScript, you can define types for variables, function parameters, and return values. This helps catch errors at compile time and improves code readability.
    //2. In the code snippet you provided, we define a type called GreetProps that has a single property name of type string. This type is used to specify the props that the Greet component expects to receive. By using TypeScript, we can ensure that the Greet component is used correctly and that the name prop is always a string.
    //3. Object Types in TypeScript allow you to define the shape of an object by specifying the properties it should have and their types. In this case, we are defining a type called PersonProps that has a single property name, which is an object with two properties: first and last, both of which are strings. This type is used to specify the props that the Person component expects to receive. By using TypeScript, we can ensure that the Person component is used correctly and that the name prop is always an object with the specified structure.
    //4. Array Types in TypeScript allow you to define the type of elements that an array can contain. In this case, we are defining an array of objects, where each object has a name and description property. This helps ensure that the data passed to the Pattern component is structured correctly and allows for better type checking and code readability.
    //5. Union of string literals can be used to restrict the possible values of a string type. In this case, we can define the status prop to only accept specific string values such as 'loading', 'success', or 'error'. This helps ensure that the Status component is used correctly and that the status prop is always one of the specified values.
    //6. The children prop in React is a special prop that allows you to pass components or elements as children to a parent component. In this case, we are using the children prop to pass a Heading component as a child to the MainHeading component. This allows us to create a reusable MainHeading component that can accept any child component and render it within the MainHeading layout.
    //7. By using TypeScript in our React components, we can ensure that our components are used correctly and that the props passed to them are of the expected types. This helps catch errors early and improves the overall quality of our code.
    //8. In summary, TypeScript provides static typing for JavaScript, which helps catch errors at compile time and improves code readability. By defining types for our components' props, we can ensure that our components are used correctly and that the data passed to them is structured as expected. This leads to more robust and maintainable code in our React applications. */}
    </div>
  );
}

export default App;
