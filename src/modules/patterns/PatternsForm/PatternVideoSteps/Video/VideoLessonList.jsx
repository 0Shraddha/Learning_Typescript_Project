import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { Play, X, Link2, Plus } from 'lucide-react'

const VideoLessonList = ({ sectionIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons`,
  })

  return (
    <div className="space-y-2">
      {fields.map((lesson, lessonIndex) => (
        <div
          key={lesson.id}
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
            <Play className="h-3 w-3 fill-current" />
          </span>

          <Input
            {...register(`sections.${sectionIndex}.lessons.${lessonIndex}.title`, {
              required: 'Lesson title is required',
            })}
            placeholder={`Lesson ${lessonIndex + 1} title`}
            className="h-8 flex-1 border-0 bg-transparent px-0 text-sm font-medium shadow-none focus-visible:ring-0"
            style={{ color: '#14151A' }}
          />

          <div className="flex flex-1 items-center gap-1.5" style={{ minWidth: 0 }}>
            <Link2 className="h-3.5 w-3.5 flex-none" style={{ color: '#9599A8' }} />
            <Input
              {...register(`sections.${sectionIndex}.lessons.${lessonIndex}.videoUrl`)}
              type="file"
              placeholder="Video URL"
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
              if (fields.length > 1) remove(lessonIndex)
              else alert('A section needs at least one lesson')
            }}
            className="h-7 w-7 flex-none disabled:opacity-30"
            style={{ color: '#9599A8' }}
            aria-label={`Remove lesson ${lessonIndex + 1}`}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ title: '', videoUrl: '' })}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2 text-xs font-semibold transition-colors hover:bg-white"
        style={{ borderColor: '#D8DAE3', color: '#B87A12' }}
      >
        <Plus className="h-3.5 w-3.5" />
        Add lesson
      </button>
    </div>
  )
}

export default VideoLessonList