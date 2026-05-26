import React from 'react'

type GreetProps = {
    name: string,
    patternCount?: number,
    hasPatterns?: boolean
}

//TypeScript is a superset of JavaScript that adds static typing to the language. In TypeScript, you can define types for variables, function parameters, and return values. This helps catch errors at compile time and improves code readability.
//In the code snippet you provided, we define a type called GreetProps that has a single property name of type string. This type is used to specify the props that the Greet component expects to receive. By using TypeScript, we can ensure that the Greet component is used correctly and that the name prop is always a string.

const Greet = (props : GreetProps) => {
  return (
    <div>
      <h2>Helloo {props.name}  ! Welcome to My Crochet Pattern Series</h2>
     {props.hasPatterns || <p>There are {props.patternCount} patterns available</p>}
    </div>
  )
}

export default Greet
