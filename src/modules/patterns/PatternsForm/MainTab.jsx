import React, { useState } from 'react'
import PatternDetailTab from './PatternDetailTab'
import PatternReviewTab from './PatternReviewTab'
import { PatternVideoStepsTab } from './PatternVideoStepsTab'
import Header from '../../../components/ui/custom/Header'

const MainUploadTab = () => {
  const [activeTab, setActiveTab] = useState(1)

  const tabs = [
    { id: 1, name: 'Detail', component: PatternDetailTab },
    { id: 2, name: 'Tutorial', component: PatternVideoStepsTab },
    { id: 3, name: 'Review & Submit', component: PatternReviewTab },
  ]

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component

  return (
    <div className="">

  <Header 
    sub="jotting down"
    heading="A New Pattern"
    />

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1 border-b border-[#E8D3C0]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-[#C1440E]'
                : 'text-[#8A7F70] hover:text-[#3A342C]'
            }`}
          >
            {tab.name}
            {activeTab === tab.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#C1440E]" />
            )}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="rounded-2xl bg-[#FBF7F2] border border-[#E8D3C0] p-8">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  )
}

export default MainUploadTab