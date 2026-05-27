import React, { useState } from "react";
import { PatternProps } from "./Patterns.types";
import './styles.css';

export const PatternsForm = () => {

    const [pattern, setPattern] = useState<PatternProps>({
        title : '',
        patterns : '',
        description : '',
        price : 0,
    })

    const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPattern((prevPattern) => ({
          ...prevPattern,
          [name]: value,
        }));
    }

    const handleSubmit = () => {
        localStorage.setItem('pattern', JSON.stringify(pattern));

        console.log("saved:" , pattern);
    }

    return (
        <>
        <h4>Create a new Pattern</h4>

        <input type="text" name="title" id="id_title" value={pattern.title} placeholder="Title" onChange={handleChange}/>
        <br/>
        <textarea name="patterns" id="id_patterns" value={pattern.patterns} placeholder="Patterns" onChange={handleChange}></textarea>
        <br/>

        <textarea name="description" id="id_description" value={pattern.description} placeholder="Description (Optional)" onChange={handleChange}></textarea>
        <br/>

        <input type="number" name="price" id="id_number" value={pattern.price} placeholder="Price" onChange={handleChange}/>
        <br/>

        <button type="button" onClick={handleSubmit}>Create</button>
        </>
    )
}