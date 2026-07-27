import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Plus, Trash2, ChevronDown } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import PatternsList from './PatternsList'

const PatternStepsSection = () => {

  const { register, control , handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      sections: [
        {
          title: 'Section 1: Head Part',
          patterns: [{
            title: 'Row 1: Chain 10 stiches',
            instruction: 'Turn the work after row 1'
          }]
        }
      ]
    }
  })

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: 'sections'
  }) 

  const [openSections, setOpenSections] = useState({});
  const isSectionOpen = (id) => openSections[id] !== false;
  const toggleSection = (id) => setOpenSections((prev) => ({...prev, [id]: !isSectionOpen(id)}))

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>

      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="relative">
          <div 
            className="absolute left-[19px] top-6 bottom-6 w-px"
            style={{ backgroundColor: '#D8DAE3' }}
            aria-hidden="true"
          />

          <div className="space-y-6">
            {sectionFields.map((section, sectionIndex) => (
              <div key={section.id} className="relative flex gap-4">
                <div
                  className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 text-sm font-bold"
                  style={{
                    backgroundColor: '#FFF',
                    borderColor: '#B87A12',
                    color: '#B87A12',
                  }}
                >
                  {String(sectionIndex+1).padStart(2, '0')} {/* If it's shorter than 2 characters, it adds "0" at the beginning. */}
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
                      <PatternsList 
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
          onClick={() => appendSection({ title: '', patterns: [{ title: '', instruction: '' }] })}
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

export default PatternStepsSection
