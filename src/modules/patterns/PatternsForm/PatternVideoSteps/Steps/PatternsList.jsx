import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { Play, X, Plus, Info, FishingHook } from 'lucide-react'

const PatternsList = ({ sectionIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.patterns`,
  })

  return (
    <div className="space-y-2">
      {fields.map((pattern, patternIndex) => (
        <div
          key={pattern.id}
          className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
          style={{ borderColor: '#E4E6EE', backgroundColor: '#FAFAFC' }}
        >
          <span
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold"
            style={{
              backgroundColor: '#F2A93B22',
              color: '#B87A12',
            }}
          >
            <span>{patternIndex+1}</span>
          </span>

          <Input
            {...register(`sections.${sectionIndex}.patterns.${patternIndex}.title`, {
              required: 'Row-wise Pattern should be included',
            })}
            placeholder={`Row ${patternIndex + 1}`}
            className="h-8 flex-1 border-0 bg-transparent px-0 text-sm font-medium shadow-none focus-visible:ring-0"
            style={{ color: '#14151A' }}
          />

          <div className="flex flex-1 items-center gap-1.5" style={{ minWidth: 0 }}>
            <Info className="h-3.5 w-3.5 flex-none" style={{ color: '#9599A8' }} />
            <Input
              {...register(`sections.${sectionIndex}.patterns.${patternIndex}.instruction`)}
              placeholder="Instruction (Optional)"
              className="h-8 flex-1 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
              style={{ color: '#5A5D6B' }}
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={fields.length <= 1}
            onClick={() => {
              if (fields.length > 1) remove(patternIndex)
              else alert('At least one pattern must remain')
            }}
            className="h-7 w-7 flex-none disabled:opacity-30"
            style={{ color: '#9599A8' }}
            aria-label={`Remove lesson ${patternIndex + 1}`}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ title: '', instruction: '' })}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2 text-xs font-semibold transition-colors hover:bg-white"
        style={{ borderColor: '#D8DAE3', color: '#B87A12' }}
      >
        <Plus className="h-3.5 w-3.5" />
        Add pattern
      </button>
    </div>
  )
}

export default PatternsList