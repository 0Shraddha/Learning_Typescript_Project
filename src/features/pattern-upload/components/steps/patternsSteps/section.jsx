import React, { useState } from 'react'
import { Trash2, X } from 'lucide-react'
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../../../../components/ui/accordion' // Adjust import path if needed
import { Button } from '../../../../../components/ui/button'

export const StepsSection = ({ id, index, onDelete }) => {
  const [instruction, setInstruction] = useState(false)

  const handleAddInstruction = (e) => {
    e.stopPropagation() // Prevents accordion toggle
    setInstruction(true)
  }

  return (
    <div className="relative flex gap-6 pb-6 last:pb-0">
      {/* --- Left Timeline Indicator --- */}
      <div className="flex flex-col items-center">
        {/* Number Circle Badge */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#702943] text-xs font-semibold text-white shadow-sm z-10">
          {index}
        </div>
        {/* Vertical Dashed Line */}
        <div className="h-full w-0.5 border-l-2 border-dashed border-[#D5CBB9] mt-2" />
      </div>

      {/* --- Main Card Accordion --- */}
      <AccordionItem
        value={id}
        className="flex-1 rounded-xl border border-[#EBE3D5] bg-[#FFFDF9] px-5 shadow-sm transition-all hover:shadow-md border-b-0"
      >
        {/* Accordion Header / Trigger */}
        <div className="flex w-full items-center justify-between py-4 pr-4">
          {/* We wrap only the text in AccordionTrigger using asChild to avoid button nesting */}
          <AccordionTrigger className="hover:no-underline py-0">
            <span className="text-xs font-bold tracking-wider text-[#702943] uppercase">
              ROW {index}
            </span>
          </AccordionTrigger>

          <div className="flex items-center gap-2 z-10">
            {!instruction && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddInstruction}
                className="text-xs border-[#E7DEC9] text-[#702943] hover:bg-[#F7F3EB]"
              >
                + Add Instruction
              </Button>
            )}

            {/* Trash Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation() // Prevents accordion toggle
                onDelete()
              }}
              className="rounded p-1 text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Delete row"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Inputs Content */}
        <AccordionContent className="pb-5 pt-1">
          <div className="space-y-3">
            <textarea
              rows={2}
              placeholder="e.g. Ch 2, 2 dc in first st, dc in each st across"
              className="w-full rounded-lg border border-[#E7DEC9] bg-white p-3 text-sm text-stone-700 placeholder:text-stone-300 focus:border-[#702943] focus:outline-none focus:ring-1 focus:ring-[#702943] resize-none"
            />

            {/* Render note input only when instruction === true */}
            {instruction && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Optional note, e.g. join with a slip stitch"
                  className="w-full rounded-lg border border-[#E7DEC9] bg-white px-3 py-3 pr-10 text-sm text-stone-700 placeholder:text-stone-300 focus:border-[#702943] focus:outline-none focus:ring-1 focus:ring-[#702943]"
                />
                <button
                  type="button"
                  onClick={() => setInstruction(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  title="Remove note"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  )
}