import { useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { Accordion } from '../../../../components/ui/accordion'
import { StepsSection } from './patternsSteps/section'

export const StepsTutorial = () => {
  // Store items with unique string IDs
  const [rows, setRows] = useState([
    { id: 'row-1' }
  ])

  // Track open accordion sections so new rows open automatically
  const [openRows, setOpenRows] = useState(['row-1'])

  const handleAddNewRow = () => {
    const newId = `row-${crypto.randomUUID()}`
    setRows((prev) => [...prev, { id: newId }])
    
    // Automatically expand the newly added row
    setOpenRows((prev) => [...prev, newId])
  }

  const handleDeleteRow = (idToDelete) => {
    setRows((prev) => prev.filter((row) => row.id !== idToDelete))
    setOpenRows((prev) => prev.filter((id) => id !== idToDelete))
  }

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        value={openRows}
        onValueChange={setOpenRows}
        className="w-full"
      >
        {rows.map((row, idx) => (
          <StepsSection
            key={row.id}
            id={row.id}
            index={idx + 1}
            onDelete={() => handleDeleteRow(row.id)}
          />
        ))}
      </Accordion>

      <Button onClick={handleAddNewRow}>+ Add New Row</Button>
    </div>
  )
}