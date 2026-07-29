import React from 'react'

const PatternList = ({ sections, activeSectionId, onSelectSection }) => {
  return (
    <div className="w-full md:w-64 bg-[#F8F5F0] border border-[#EBE5DC] rounded-2xl p-5 shrink-0 shadow-sm">
      <h2 className="text-xs font-bold tracking-widest text-[#B5ABA0] uppercase mb-4 px-2">
        Sections
      </h2>
      
      <nav className="space-y-1">
        {sections.map((section, index) => {
          const isActive = section.id === activeSectionId
          return (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-[#4A433D] shadow-sm font-semibold'
                  : 'text-[#8C8275] hover:text-[#4A433D] hover:bg-[#F0EBE1]'
              }`}
            >
              {index + 1}. {section.title}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default PatternList