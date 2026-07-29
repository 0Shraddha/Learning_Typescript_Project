import React from 'react'

const PatternSection = ({ section, onToggleRow }) => {
  const completedCount = section.rows.filter((r) => r.completed).length
  const totalCount = section.rows.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="flex-1 w-full bg-white border border-[#EBE5DC] rounded-2xl shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 border-b border-[#F0EBE1] flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-[#4A433D]">{section.title}</h1>

        <div className="flex items-center gap-3">
          {/* Badge: In the Round / Flat */}
          {section.type && (
            <span className="px-3 py-1 bg-[#F5F2ED] text-[#8C8275] text-xs font-medium rounded-full border border-[#EAE3D9]">
              {section.type}
            </span>
          )}

          {/* Progress Counters & Mini Bar */}
          <div className="flex flex-col items-end gap-1">
            <span className="px-3 py-0.5 bg-[#F5F2ED] text-[#8C8275] text-xs font-semibold rounded-full border border-[#EAE3D9]">
              {completedCount}/{totalCount}
            </span>
            <div className="w-20 h-1.5 bg-[#F0EBE1] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E76F51] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Instruction Rows */}
      <div className="divide-y divide-[#F5F2ED]">
        {section.rows.map((row) => (
          <div
            key={row.id}
            onClick={() => onToggleRow(row.id)}
            className="p-5 flex items-start gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer select-none"
          >
            {/* Custom Checkbox */}
            <input
              type="checkbox"
              checked={row.completed}
              onChange={() => {}} // Handled by parent div click
              className="mt-1 h-5 w-5 rounded border-[#D3C9BC] text-[#108EE9] focus:ring-0 cursor-pointer accent-[#108EE9]"
            />

            {/* Row Content */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#4A433D]">
                  {row.label}
                </span>
                <span className="text-xs text-[#A89F91] font-normal">
                  {row.sts}
                </span>
              </div>

              <p
                className={`text-sm leading-relaxed transition-all ${
                  row.completed
                    ? 'line-through text-[#B8B0A5]'
                    : 'text-[#6B6258]'
                }`}
              >
                {row.instruction}
              </p>
            </div>
          </div>
        ))}

        {section.rows.length === 0 && (
          <div className="p-8 text-center text-xs text-[#A89F91]">
            No instructions added for this section yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default PatternSection