import React, { useState } from 'react'
import PatternDetailTab from './PatternDetailTab'
import PatternReviewTab from './PatternReviewTab'
import { PatternVideoStepsTab } from './PatternVideoStepsTab'
import { Button } from '../../../components/ui/button'

const MainUploadTab = () => {

    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        {
            id: 1,
            name: 'Detail',
            component: PatternDetailTab,
        },{
            id: 2,
            name: 'Tutorial',
            component: PatternVideoStepsTab,
        },{
            id: 3,
            name: 'Review & Submit',
            component: PatternReviewTab,
        }
    ]

    const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

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

export default MainUploadTab
