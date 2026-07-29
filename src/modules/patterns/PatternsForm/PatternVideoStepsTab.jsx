import React, { useState } from 'react'
import PatternVideoSection from './PatternVideoSteps/Video/PatternVideoSection'
import PatternStepsSection from './PatternVideoSteps/Steps/PatternStepsSection'
import { Button } from '../../../components/ui/button'
import Tabs from '../../../components/ui/custom/Tabs'

export const PatternVideoStepsTab = () => {
  const tabs = [
    {
      id:1,
      name: 'Video Tutorial',
      component : PatternVideoSection,
    },{
      id:2,
      name: 'Steps',
      component : PatternStepsSection,
    }
  ]

  return (
    <div>

      <Tabs tabs={tabs} />
      
    </div>
  )
}

