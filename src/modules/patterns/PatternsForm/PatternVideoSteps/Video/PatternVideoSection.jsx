import { useForm } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import React, { useState } from 'react'
import { Plus, Trash2, Rocket, ChevronDown } from 'lucide-react'
import VideoLessonList from './VideoLessonList'

/**
 * Design tokens for this curriculum builder
 * (add to index.html / global CSS if you want the exact display + mono faces to load):
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
 *
 * Paper   #F5F6FA   Ink      #14151A
 * Violet '#B87A12'  Amber    #F2A93B
 * Slate   #D8DAE3   Danger   #E14F4F
 */

const DISPLAY_FONT = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" }

const PatternVideoSection = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      sections: [
        {
          title: 'Section 1: Introduction',
          lessons: [
            {
              title: 'Welcome to the Course',
              videoUrl: '',
            },
          ],
        },
      ],
    },
  })

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: 'sections',
  })

    // Accordion state — keyed by field id, open by default. New sections
  // (which get a fresh field id from useFieldArray) start open too.
  const [openSections, setOpenSections] = useState({});
  const isSectionOpen = (id) => openSections[id] !== false
  const toggleSection = (id) =>
    setOpenSections((prev) => ({ ...prev, [id]: !isSectionOpen(id) }))
 

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="min-h-screen"
    >
      <div className="mx-auto max-w-4xl px-6 py-14">
        

        {/* Timeline rail */}
        <div className="relative">
          <div
            className="absolute left-[19px] top-6 bottom-6 w-px"
            style={{ backgroundColor: '#D8DAE3' }}
            aria-hidden="true"
          />

          <div className="space-y-6">
            {sectionFields.map((section, sectionIndex) => (
              <div key={section.id} className="relative flex gap-4">
                {/* Numbered marker */}
                <div
                  className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 text-sm font-bold"
                  style={{
                    backgroundColor: '#FFF',
                    borderColor: '#B87A12',
                    color: '#B87A12',
                  }}
                >
                  {String(sectionIndex+1).padStart(2, '0')}
                </div>

                {/* Section card */}
                <div
                  className="flex-1 rounded-2xl border bg-white p-5 shadow-sm"
                  style={{ borderColor: '#E4E6EE' }}
                >
                  <div className="flex items-start gap-3">
                    {/* Toggle — expands/collapses the lesson list, separate from the
                        editable title so clicking to expand never fights with typing */}
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-md transition-colors hover:bg-black/5"
                      style={{ color: '#9599A8' }}
                      aria-expanded={isSectionOpen(section.id)}
                      aria-label={`${isSectionOpen(section.id) ? 'Collapse' : 'Expand'} section ${sectionIndex}`}
                    >
                      <ChevronDown
                        className="h-4 w-4 transition-transform duration-200"
                        style={{
                          transform: isSectionOpen(section.id) ? 'rotate(0deg)' : 'rotate(-90deg)',
                        }}
                      />
                    </button>

                    <div className="flex-1">
                      <Input
                        {...register(`sections.${sectionIndex}.title`, {
                          required: 'Section title is required',
                        })}
                        placeholder="Untitled section"
                        className="border-0 border-b-2 rounded-none px-0 text-lg font-semibold shadow-none focus-visible:ring-0"
                        style={{
                          ...DISPLAY_FONT,
                          borderColor: '#D8DAE3',
                          color: '#14151A',
                        }}
                      />
                      {errors?.sections?.[sectionIndex]?.title && (
                        <p className="mt-1.5 text-xs font-medium" style={{ color: '#E14F4F' }}>
                          {errors.sections[sectionIndex].title.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={sectionFields.length <= 1}
                      onClick={() => {
                        if (sectionFields.length > 1) removeSection(sectionIndex)
                        else alert('At least one section must remain')
                      }}
                      className="flex-none disabled:opacity-30"
                      style={{ color: '#E14F4F' }}
                      aria-label={`Delete section ${sectionIndex}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Animated collapse — grid-rows trick avoids measuring heights */}
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: isSectionOpen(section.id) ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-4 pt-4">
                        <VideoLessonList
                          register={register}
                          control={control}
                          sectionIndex={sectionIndex}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add section — single action at the end of the timeline */}
        <button
          type="button"
          onClick={() => appendSection({ title: '', lessons: [{ title: '', videoUrl: '' }] })}
          className="mt-6 ml-14 flex items-center gap-2 rounded-xl border-2 border-dashed px-4 py-3 text-sm font-semibold transition-colors hover:bg-white"
          style={{ borderColor: '#D8DAE3', color: '#B87A12' }}
        >
          <Plus className="h-4 w-4" />
          Add section
        </button>

      </div>
      <input type="submit" />
    </form>
  )
}

export default PatternVideoSection       