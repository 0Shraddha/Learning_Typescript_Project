
import React, { useState } from 'react'
import PatternList from './Patterns/PatternList'
import PatternSection from './Patterns/PatternSection'
const patternData = [
  {
    id: 'sec-1',
    title: 'Body',
    type: 'In the Round',
    rows: [
      { id: 'r1', label: 'Row 1', sts: '67 sts', instruction: 'Ch 68, sc in 2nd ch from hook and each ch across. (67)', completed: true },
      { id: 'r2', label: 'Row 2', sts: '66 sts', instruction: '[Sc 66, dec] repeat around. (66)', completed: true },
      { id: 'r3', label: 'Row 3', sts: '65 sts', instruction: '[Sc 65, dec] repeat around. (65)', completed: false },
      { id: 'r4', label: 'Row 4', sts: '64 sts', instruction: '[Sc 64, dec] repeat around. (64)', completed: false },
      { id: 'r5', label: 'Row 5', sts: '63 sts', instruction: '[Sc 63, dec] repeat around. (63)', completed: false },
      { id: 'r6', label: 'Row 6', sts: '62 sts', instruction: '[Sc 62, dec] repeat around. (62)', completed: false },
    ],
  },
  {
    id: 'sec-2',
    title: 'Head',
    type: 'In the Round',
    rows: [
      { id: 'r7', label: 'Row 1', sts: '12 sts', instruction: '6 sc in magic ring. (12)', completed: false },
      { id: 'r8', label: 'Row 2', sts: '18 sts', instruction: '[Inc] repeat around. (18)', completed: false },
    ],
  },
]

export default function CrochetPattern() {
  const [sections, setSections] = useState(patternData)
  const [activeSectionId, setActiveSectionId] = useState('sec-1')

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0]

  // Toggle completion of a specific row
  const handleToggleRow = (sectionId, rowId) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec
        return {
          ...sec,
          rows: sec.rows.map((row) =>
            row.id === rowId ? { ...row, completed: !row.completed } : row
          ),
        }
      })
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-6 text-[#5C554E] font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        {/* Left Sidebar */}
        <PatternList
          sections={sections}
          activeSectionId={activeSectionId}
          onSelectSection={setActiveSectionId}
        />

        {/* Right Main Details */}
        <PatternSection
          section={activeSection}
          onToggleRow={(rowId) => handleToggleRow(activeSection.id, rowId)}
        />
      </div>
    </div>
  )
}