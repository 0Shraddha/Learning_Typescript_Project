import { SidebarSection, SidebarLesson } from './Lesons.type';
import './style.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { ChevronDown, ChevronUp } from "lucide-react"


interface LessonsProps {
    mockCurriculum: SidebarSection[];
}

export const Lessons = ({ mockCurriculum }: LessonsProps) => {
    console.log(mockCurriculum); // Debug log to verify data structure

    
    return(
        <>
  
        {mockCurriculum.map(section => (
                <Accordion type="single" collapsible defaultValue={section.id} className="sidebar" key={section.id}>
                    <AccordionItem value={section.id}>

                        <AccordionTrigger className="[&_[data-slot=accordion-trigger-icon]]:hidden w-full px-0 py-0 hover:no-underline">
                            <div className="sidebar-header w-full flex items-center justify-between">
                                <h3 className="sidebar-title">{section.name}</h3>
                                <small>{section.lessons.length} lessons</small>
                            </div>
                            <div className="accordion-icon">
                                <ChevronDown className="chevron-down" />
                                <ChevronUp className="chevron-up" />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="sidebar-lessons">
                                {section.lessons.map((lesson: SidebarLesson) => (
                                    <div key={lesson.id} className={`lesson-row ${lesson.active ? "active" : ""}`}>
                                        <div className="lesson-check">
                                            {lesson.active && <span className="checkmark">✓</span>}
                                        </div>
                                        <div className="lesson-row-info">
                                            <div className="lesson-row-name">{lesson.name}</div>
                                        </div>
                                        <span className="play-icon">▶</span>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
        ))}
        
        </>
    )
}