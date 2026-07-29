import React, { useState } from 'react'

const courseSections = [
  {
    id: 'sec-1',
    title: 'Section 1: Introduction & Environment Setup',
    totalDuration: '18 min',
    lessons: [
      { id: 'l-1', title: '1. Welcome to the Course', duration: '03:45', src: '/videos/intro.mp4', completed: true },
      { id: 'l-2', title: '2. Setting Up Your Development Tools', duration: '08:12', src: '/videos/setup.mp4', completed: true },
      { id: 'l-3', title: '3. Overview of the Architecture', duration: '06:15', src: '/videos/architecture.mp4', completed: false }
    ]
  },
  {
    id: 'sec-2',
    title: 'Section 2: Core Fundamentals',
    totalDuration: '42 min',
    lessons: [
      { id: 'l-4', title: '4. Understanding State & Props', duration: '12:30', src: '/videos/state-props.mp4', completed: false },
      { id: 'l-5', title: '5. Building Your First Component', duration: '18:40', src: '/videos/first-component.mp4', completed: false },
      { id: 'l-6', title: '6. Component Lifecycle Explained', duration: '11:10', src: '/videos/lifecycle.mp4', completed: false }
    ]
  }
]

const VideoList = ({ activeLessonId, onSelectLesson }) => {
  // Keep track of expanded sections (Section 1 open by default)
  const [openSections, setOpenSections] = useState(['sec-1'])

  const toggleSection = (sectionId) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className="w-full max-w-md bg-white overflow-hidden">
     

      <div className="divide-y divide-gray-200">
        {courseSections.map((section) => {
          const isOpen = openSections.includes(section.id)

          return (
            <div key={section.id} className="bg-white">
              {/* Accordion Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left p-4 hover:bg-gray-50 flex items-start justify-between transition-colors focus:outline-none"
              >
                <div className="pr-2">
                  <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                    {section.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {section.lessons.length} lectures • {section.totalDuration}
                  </p>
                </div>
                <span className="text-gray-400 text-xs mt-1">
                  {isOpen ? '▲' : '▼'}
                </span>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="bg-gray-50/50 divide-y divide-gray-100 border-t border-gray-100">
                  {section.lessons.map((lesson) => {
                    const isActive = activeLessonId === lesson.id

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson && onSelectLesson(lesson)}
                        className={`group flex items-start justify-between px-4 py-3 cursor-pointer text-xs transition-colors ${
                          isActive
                            ? 'bg-purple-50 text-purple-900 border-l-4 border-purple-600 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={lesson.completed}
                            onChange={() => {}} // Handle completion logic
                            className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                          />
                          <div>
                            <p className="line-clamp-2 leading-relaxed">
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-gray-400 text-[10px]">
                              {/* Play Icon SVG */}
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VideoList