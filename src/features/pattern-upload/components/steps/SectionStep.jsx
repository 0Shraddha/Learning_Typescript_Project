import React, { useState } from 'react'
import { VideoTutorial } from './VideoTutorial'
import { StepsTutorial } from './StepsTutorial'
import { Button } from '../../../../components/ui/button'

const SectionStep = () => {
  // 1. Set up state to track the active tab ID (defaulting to the first tab)
  const [activeTab, setActiveTab] = useState(1)

  const tutorialTabs = [
    {
      id: 1,
      name: 'Video',
      componentName: VideoTutorial,
    },
    {
      id: 2,
      name: 'Patterns',
      componentName: StepsTutorial,
    }
  ]

  // 2. Find the object for the currently active tab
  const ActiveComponent = tutorialTabs.find(tab => tab.id === activeTab)?.componentName

  return (
    <div className="w-full space-y-4">
      {/* Tab Headers Container */}
      <div className="flex gap-2 p-1 bg-secondary rounded-lg max-w-max">
        {tutorialTabs.map((tab) => {
          const isActive = tab.id === activeTab
          
          return (
            <Button
              key={tab.id}
              // Change the button variant dynamically based on active state
              variant={isActive ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="transition-all"
            >
              {tab.name}
            </Button>
          )
        })}
      </div>
      
      {/* Tab Content Window */}
      <div className="mt-4 p-4 border rounded-lg bg-background">
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </div>
  )
}

export default SectionStep