import { useReducer, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { PatternsSeries, PatternItem } from "../Patterns.types";
import { Button } from "../../../components/ui/button";
import { Plus, Trash } from "lucide-react";

type PatternState = {
  patterns: PatternsSeries[];
};

type PatternForm = {
  steps: string;
  type: "row" | "info" | null;
};

type Action =
  | { type: "ADD_SERIES"; payload: PatternsSeries }
  | { type: "REMOVE_SERIES"; payload: string }
  | { type: "ADD_PATTERN_ITEM"; payload: { patternsId: string; pattern: PatternItem } }
  | {
      type: "REMOVE_PATTERN_ITEM";
      payload: { patternsId: string; patternId: string };
    };

const reducer = (state: PatternState, action: Action): PatternState => {
  switch (action.type) {
    case "ADD_SERIES":
      return {
        ...state,
        patterns: [...state.patterns, action.payload],
      };

    case "REMOVE_SERIES":
      return {
        ...state,
        patterns: state.patterns.filter((p) => p.id !== action.payload),
      };

    case "ADD_PATTERN_ITEM":
      return {
        ...state,
        patterns: state.patterns.map((s) =>
          s.id === action.payload.patternsId
            ? {
                ...s,
                patterns: [...s.patterns, action.payload.pattern],
              }
            : s
        ),
      };

    case "REMOVE_PATTERN_ITEM":
      return {
        ...state,
        patterns: state.patterns.map((s) =>
          s.id === action.payload.patternsId
            ? {
                ...s,
                patterns: s.patterns.filter(
                  (lesson) => lesson.id !== action.payload.patternId
                ),
              }
            : s
        ),
      };

    default:
      return state;
  }
};

const RowsInfosAccordion = () => {
  const initialState: PatternState = {
    patterns: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [newPatternSeriesTitle, setNewPatternSeriesTitle] = useState("");
  const [patternItemsForm, setPatternItemsForm] = useState<Record<string, PatternForm>>({});


  return (
       
   <div className="series-accordion-wrapper">
        <div className="add-series-bar">
          <input type="text"
            placeholder="Section Name (Head/Body)"
            name="section-name"
            onChange={(e) => setNewPatternSeriesTitle(e.target.value)}
          />

      <Button
      className="btn btn-primary"
      onClick={()=> {
        if(!newPatternSeriesTitle) return;

        dispatch({
          type: "ADD_SERIES",
          payload: {
            id: crypto.randomUUID(),
            title: newPatternSeriesTitle,
            patterns: []
          }
        });

        setNewPatternSeriesTitle(""); //reset
      }}
      >

        <Plus /> Add
      </Button>
        </div>
        
   <Accordion type="single" collapsible className="series-accordion">
        {state.patterns.map((pattern) => (
          <AccordionItem key={pattern.id} value={pattern.id} className="accordion-item">
            <AccordionTrigger className="accordion-trigger">
              <h6 className="accordion-trigger-title">
                {pattern.title}
              </h6>

              <div className="btn-sm btn-primary">
                {pattern.patterns.length}
              </div>

              <Button className="btn-danger"
              onClick={()=> { dispatch({ type: "REMOVE_SERIES", payload: pattern.id})}}
              > <Trash/> </Button>
            </AccordionTrigger>

            <AccordionContent className="accordion-content">
              {pattern.patterns.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No patterns yet for the section!
                </div>
              ) : (
                <div className="space-y-2 mb-4">
                  {pattern.patterns.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 rounded border p-3"
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {item.type === "row" ? "Row" : "Info"}
                        </div>
                        <div className="text-sm text-gray-700">{item.text}</div>
                      </div>
                      <Button
                        className="btn btn-danger"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_PATTERN_ITEM",
                            payload: {
                              patternsId: pattern.id,
                              patternId: item.id,
                            },
                          })
                        }
                      >
                        <Trash />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="add-lesson-form">
                <span className="block mb-2 font-medium">Add a row or info item</span>
                <input
                  type="text"
                  placeholder="Row-wise Patterns"
                  value={patternItemsForm[pattern.id]?.steps ?? ""}
                  onChange={(e) => {
                    setPatternItemsForm((prev) => ({
                      ...prev,
                      [pattern.id]: {
                        ...prev[pattern.id],
                        steps: e.target.value,
                        type: prev[pattern.id]?.type ?? null,
                      },
                    }));
                  }}
                />
                <div className="flex items-center gap-4 mt-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`pattern-type-${pattern.id}`}
                      value="row"
                      checked={patternItemsForm[pattern.id]?.type === "row"}
                      onChange={() => {
                        setPatternItemsForm((prev) => ({
                          ...prev,
                          [pattern.id]: {
                            ...prev[pattern.id],
                            type: "row",
                          },
                        }));
                      }}
                    />
                    Row
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`pattern-type-${pattern.id}`}
                      value="info"
                      checked={patternItemsForm[pattern.id]?.type === "info"}
                      onChange={() => {
                        setPatternItemsForm((prev) => ({
                          ...prev,
                          [pattern.id]: {
                            ...prev[pattern.id],
                            type: "info",
                          },
                        }));
                      }}
                    />
                    Info
                  </label>
                </div>

                <Button
                  className="btn btn-primary mt-4"
                  onClick={() => {
                    const form = patternItemsForm[pattern.id];
                    if (!form?.steps?.trim() || !form?.type) return;

                    dispatch({
                      type: "ADD_PATTERN_ITEM",
                      payload: {
                        patternsId: pattern.id,
                        pattern: {
                          id: crypto.randomUUID(),
                          type: form.type,
                          text: form.steps.trim(),
                        },
                      },
                    });

                    setPatternItemsForm((prev) => ({
                      ...prev,
                      [pattern.id]: {
                        steps: "",
                        type: null,
                      },
                    }));
                  }}
                >
                  Add Pattern Item
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>




        <br/>
        <br/>
<p>
            Introduction
            <br/>
            ├─ Row 1 <br/>
            ├─ Info 1<br/>
            ├─ Row 2<br/>
<br/>
            Body<br/>
            ├─ Row 3<br/>
            ├─ Info 2<br/>
<br/>
            Sleeve<br/>
            ├─ Row 4<br/>
      </p>
    </div>
  )
}

export default RowsInfosAccordion
