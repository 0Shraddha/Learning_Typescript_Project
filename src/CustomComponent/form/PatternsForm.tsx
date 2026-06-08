import React, { useState } from "react";
import { PatternProps, PatternStep } from "./Patterns.types";
import './styles.css';
import { WritePatterns } from "./WritePatterns";
import Label from "./Label";
import { UploadMedia } from "./UploadMedia";
import { PatternVideoSeries } from "./Video/PatternVideoSeries";

const buildPatternsString = (steps: PatternStep[]) =>
  steps
    .map((step, index) => `${index + 1}. ${step.type === "row" ? "Row" : "Info"}: ${step.text}`)
    .join("\n");

export const PatternsForm = () => {
    const [pattern, setPattern] = useState<PatternProps>({
      title: "",
      patterns: "",
      description: "",
      price: 0,
      hook: "",
      woolType: "",
      woolColors: "",
      imageUrl: "",
      videoUrl: "",
      steps: [],
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

    const handleMediaUpload = (file: File, field: "imageUrl" | "videoUrl") => {
      const url = URL.createObjectURL(file);
      setPattern((prev) => ({
        ...prev,
        [field]: url,
      }));
    };

    const addStep = (type: "row" | "info") => {
      setPattern((prev) => ({
        ...prev,
        steps: [
          ...prev.steps,
          {
            id: crypto.randomUUID(),
            type,
            text: "",
          },
        ],
      }));
    };

    const updateStep = (id: string, text: string) => {
      setPattern((prev) => ({
        ...prev,
        steps: prev.steps.map((step) =>
          step.id === id ? { ...step, text } : step
        ),
      }));
    };

    const deleteStep = (id: string) => {
      setPattern((prev) => ({
        ...prev,
        steps: prev.steps.filter((step) => step.id !== id),
      }));
    };
  
    const handleSubmit = () => {
      const payload = {
        ...pattern,
        patterns: buildPatternsString(pattern.steps),
      };
      localStorage.setItem("pattern", JSON.stringify(payload));
      console.log("saved:", payload);
    };
  
    return (
      <div className="pattern-form-wrapper">

<div className="flex gap-6">
  <div className="col">
    <Label name="Title" isRequired={true} />
        <input
          className="input-field"
          type="text"
          name="title"
          value={pattern.title}
          placeholder="Title"
          onChange={handleChange}
        />

        <br />

        <div className="materials-wrapper">
          <Label name="Materials" isRequired={true} />
          <div className="hook-wool-wrapper">
            <input
              className="input-field"
              type="text"
              name="hook"
              value={pattern.hook}
              placeholder="Hook Size (mm)"
              onChange={handleChange}
            />

            <input
              className="input-field"
              type="text"
              name="woolType"
              value={pattern.woolType}
              placeholder="Wool Type"
              onChange={handleChange}
            />

            <input
              className="input-field"
              type="text"
              name="woolColors"
              value={pattern.woolColors}
              placeholder="Wool Colors"
              onChange={handleChange}
            />
          </div>
        </div>

  </div>
  <div className="col">
        <div className="media-container">
          <Label name="Media" isRequired={true} />
          <div className="media-wrapper">

            <UploadMedia onUpload={(file) => handleMediaUpload(file, "imageUrl")} />
            <PatternVideoSeries handleMediaUpload={handleMediaUpload} />

          </div>
        </div>
  </div>
</div>

        
        <div className="materials-wrapper" style={{ display : "none" }}>
          <Label name="Price" isRequired={false} />
          <input
            className="input-field"
            type="number"
            name="price"
            value={pattern.price}
            placeholder="Price"
            onChange={handleChange}
          />
        </div>


        <Label name="Patterns & Instructions" isRequired={true} />
        <WritePatterns
          items={pattern.steps}
          onAddItem={addStep}
          onUpdateItem={updateStep}
          onDeleteItem={deleteStep}
        />

        <br />
  
        <textarea
          className="textarea-field"
          name="description"
          value={pattern.description}
          placeholder="Description (Optional)"
          onChange={handleChange}
        />
  
        <button className="submit-btn" type="button" onClick={handleSubmit}>
          Create Pattern
        </button>
      </div>
    );
  };