import React, { useState } from 'react'
import DetailStep from './steps/DetailStep';
import ReviewStep from './steps/ReviewStep';
import SectionStep from './steps/SectionStep';

const tabs = [
    {
        id: 0,
        label: 'Patterns Detail',
        component : DetailStep
    },
    {
        id: 1,
        label: 'Video Section',
        component : SectionStep
    },
    {
        id: 2,
        label: 'Review and Submit',
        component: ReviewStep
    }
]

const ProgressTabs = ({activeTab, setActiveTab}) => {
    // const [activeTab, setActiveTab] = useState(1);

    const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component

  return (
    <div>
    <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.id
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
            <br/>
            <div className='h-80 bg-gray-200 p-4'>
                {ActiveComponent && <ActiveComponent />}
            </div>

     
    </div>
  )
}

export default ProgressTabs
