import React, { useState } from 'react'
import PatternVideoSection from './PatternVideoSteps/Video/PatternVideoSection'
import PatternStepsSection from './PatternVideoSteps/Steps/PatternStepsSection'
import { Button } from '../../../components/ui/button'

export const PatternVideoStepsTab = () => {
  const [activeTab, setActiveTab] = useState(1);
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

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component
  return (
    <div>

      {tabs.map((tab,index) => (
             <Button 
              key={index} 
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              >{tab.name}</Button> 
            ))}
      
      
            {ActiveComponent && <ActiveComponent />}

      
    </div>
  )
}

