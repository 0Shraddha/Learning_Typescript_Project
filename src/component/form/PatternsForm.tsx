import React, { useState } from "react";
import { PatternProps } from "./Patterns.types";
import './styles.css';

export const PatternsForm = () => {
    const [pattern, setPattern] = useState<PatternProps>({
      title: "",
      patterns: "",
      description: "",
      price: 0,
    });
  
    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target;
  
      setPattern((prev) => ({
        ...prev,
        [name]: name === "price" ? Number(value) : value,
      }));
    };
  
    const handleSubmit = () => {
      localStorage.setItem("pattern", JSON.stringify(pattern));
      console.log("saved:", pattern);
    };
  
    return (
      <div className="pattern-form-wrapper">
        <input
          className="input-field"
          type="text"
          name="title"
          value={pattern.title}
          placeholder="Title"
          onChange={handleChange}
        />
  
        <textarea
          className="textarea-field"
          name="patterns"
          value={pattern.patterns}
          placeholder="Patterns"
          onChange={handleChange}
        />
  
        <textarea
          className="textarea-field"
          name="description"
          value={pattern.description}
          placeholder="Description (Optional)"
          onChange={handleChange}
        />
  
        <input
          className="input-field"
          type="number"
          name="price"
          value={pattern.price}
          placeholder="Price"
          onChange={handleChange}
        />
  
        <button className="submit-btn" type="button" onClick={handleSubmit}>
          Create Pattern
        </button>
      </div>
    );
  };