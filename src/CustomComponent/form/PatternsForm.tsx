import React, { useState } from "react";
import { PatternProps, PatternStep } from "./Patterns.types";
import "./styles.css";
import { WritePatterns } from "./WritePatterns";
import Label from "./Label";
import { UploadMedia } from "./UploadMedia";
import { PatternVideoSeries } from "./Video/PatternVideoSeries";
import { AddPatternSeries } from "./Patterns/AddPatternSeries";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const buildPatternsString = (steps: PatternStep[]) =>
  steps
    .map(
      (step, index) =>
        `${index + 1}. ${step.type === "row" ? "Row" : "Info"}: ${step.text}`,
    )
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        step.id === id ? { ...step, text } : step,
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
              <UploadMedia
                onUpload={(file) => handleMediaUpload(file, "imageUrl")}
              />
              <PatternVideoSeries handleMediaUpload={handleMediaUpload} />
            </div>
          </div>
        </div>
      </div>


 <div className="flex gap-4 mb-4">
       <Label name="Patterns & Instructions" isRequired={true} />
          <Link to='/playground'>
          <button
                className="upload-container"
                style={{ background: "antiquewhite", color : 'palevioletred', borderStyle : 'solid', padding: '8px 12px' }}
              >
                {/* <Edit style={{ color: "palevioletred" }} /> */}
                <div className="text-area">
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    CROCHET PLAYGROUND
                  </p>
                  {/* <span style={{ fontSize: "12px", color: "white" }}>
                    Create Your Own Pattern
                  </span> */}
                </div>
          </button>
        </Link>
 </div>

    <div className="flex gap-5">
        <AddPatternSeries />


      
    </div>




      <br />
      {/* <WritePatterns
        items={pattern.steps}
        onAddItem={addStep}
        onUpdateItem={updateStep}
        onDeleteItem={deleteStep}
      /> */}



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
