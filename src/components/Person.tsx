// type PersonProps = {
//    name : {
//     first : string,
//     last : string
//    }
// }
//Object Types in TypeScript allow you to define the shape of an object by specifying the properties it should have and their types. In this case, we are defining a type called PersonProps that has a single property name, which is an object with two properties: first and last, both of which are strings. This type is used to specify the props that the Person component expects to receive. By using TypeScript, we can ensure that the Person component is used correctly and that the name prop is always an object with the specified structure.
import { PersonProps } from "./Person.types"
export const Person = (props: PersonProps) => {
    return <div>{props.name.first} {props.name.last}</div>
}