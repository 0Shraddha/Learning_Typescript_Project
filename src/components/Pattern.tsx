// type PatternListProps = {
//    names: {
//     name: string,
//     description: string
//    }[] //array type
// }

//In this code snippet, we define a type called PatternListProps that has a single property names, which is an array of objects. Each object in the array has two properties: name and description, both of which are strings. This type is used to specify the props that the Pattern component expects to receive. By using TypeScript, we can ensure that the Pattern component is used correctly and that the names prop is always an array of objects with the specified structure.
// Array Types in TypeScript allow you to define the type of elements that an array can contain. In this case, we are defining an array of objects, where each object has a name and description property. This helps ensure that the data passed to the Pattern component is structured correctly and allows for better type checking and code readability.
import { PatternListProps } from "./Pattern.types"
export const Pattern = (props : PatternListProps) => {
    return (
        <>
            {props?.names?.map((pattern) => (
                <div key={pattern.name}>
                <h3>{pattern.name}</h3>
                <p>{pattern.description}</p>
                </div>
            ))}

        </>
    )
}