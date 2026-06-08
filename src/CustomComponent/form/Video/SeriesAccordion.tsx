import { useReducer, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";

import { VideoSeries, VideoTutorials } from "../Patterns.types";
import { Button } from "../../../components/ui/button";
import { Trash } from "lucide-react";
import './styles.css'

type StateProps = {
  series: VideoSeries[];
};

type Action =
  | { type: "ADD_SERIES"; payload: VideoSeries }
  | { type: "REMOVE_SERIES"; payload: string }
  | { type: "ADD_LESSON"; payload: { seriesId: string; lesson: VideoTutorials } }
  | {
      type: "REMOVE_LESSON";
      payload: { seriesId: string; lessonId: string };
    };

const reducer = (state: StateProps, action: Action): StateProps => {
  switch (action.type) {
    case "ADD_SERIES":
      return {
        ...state,
        series: [...state.series, action.payload],
      };

    case "REMOVE_SERIES":
      return {
        ...state,
        series: state.series.filter((s) => s.id !== action.payload),
      };

    case "ADD_LESSON":
      return {
        ...state,
        series: state.series.map((s) =>
          s.id === action.payload.seriesId
            ? {
                ...s,
                lessons: [...s.lessons, action.payload.lesson],
              }
            : s
        ),
      };

    case "REMOVE_LESSON":
      return {
        ...state,
        series: state.series.map((s) =>
          s.id === action.payload.seriesId
            ? {
                ...s,
                lessons: s.lessons.filter(
                  (lesson) => lesson.id !== action.payload.lessonId
                ),
              }
            : s
        ),
      };

    default:
      return state;
  }
};

export const SeriesAccordion = () => {
    const initialState: StateProps = {
    series: [],
    };

    const [state, dispatch] = useReducer(reducer, initialState);


    const [newSeriesTitle, setNewSeriesTitle] = useState("");
    const [lessonForms, setLessonForms] = useState<
    Record<string, { title: string; file: File | null }>
    >({});


    return (

        <div className="series-accordion-wrapper">
        <div className="add-series-bar">
            <input type="text" value={newSeriesTitle}
                onChange={(e)=> setNewSeriesTitle(e.target.value)}
                placeholder="Series Title"
                className="border rounded p-2"
            />

<Button
onClick={() => {
    if (!newSeriesTitle) return;

    dispatch({
        type: "ADD_SERIES",
        payload: {
            id: crypto.randomUUID(),
            title: newSeriesTitle,
            lessons: []
        }
    });
    setNewSeriesTitle(""); //reset
}
}
>
    Add Series

</Button>
        </div>
        
   <Accordion type="single" collapsible className="series-accordion">
        {state.series.map((series) => (
          <AccordionItem key={series.id} value={series.id} className="accordion-item">
            <AccordionTrigger className="accordion-trigger">
              {series.title} 
              <Button onClick={()=> dispatch({type: "REMOVE_SERIES", payload: series.id})}>Remove <Trash/> </Button>
            </AccordionTrigger>

            <AccordionContent className="accordion-content">
              {/* LESSON LIST */}
              {series.lessons.length === 0 && (
                <p className="text-sm text-gray-500">
                  No lessons yet
                </p>
              )}

              {series.lessons.map((lesson) => (
                <div key={lesson.id} className="lesson-card">
                  <p>{lesson.title}</p>
                  <video src={lesson.videoUrl} controls />
                </div>
              ))}

                <div className="add-lesson-form">
                    {/* TITLE INPUT */}
                    <input
                        type="text"
                        placeholder="Lesson Title"
                        value={lessonForms[series.id]?.title || ""}
                        onChange={(e) =>
                        setLessonForms((prev) => ({
                            ...prev,
                            [series.id]: {
                            ...prev[series.id],
                            title: e.target.value,
                            file: prev?.[series.id]?.file || null,
                            },
                        }))
                        }
                    />

                    {/* FILE INPUT */}
                    <input
                        type="file"
                        onChange={(e) =>
                        setLessonForms((prev) => ({
                            ...prev,
                            [series.id]: {
                            ...prev[series.id],
                            title: prev?.[series.id]?.title || "",
                            file: e.target.files?.[0] || null,
                            },
                        }))
                        }
                    />

                    {/* ADD BUTTON */}
                    <Button
                        onClick={() => {
                        const form = lessonForms[series.id];

                        if (!form?.title || !form?.file) return;

                        const videoUrl = URL.createObjectURL(form.file);

                        dispatch({
                            type: "ADD_LESSON",
                            payload: {
                            seriesId: series.id,
                            lesson: {
                                id: crypto.randomUUID(),
                                title: form.title,
                                videoUrl,
                            },
                            },
                        });

                        // reset
                        setLessonForms((prev) => ({
                            ...prev,
                            [series.id]: { title: "", file: null },
                        }));
                        }}
                    >
                        Add Lesson
                    </Button>
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};