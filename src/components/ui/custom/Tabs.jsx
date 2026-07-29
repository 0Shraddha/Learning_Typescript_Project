import React, { useState } from 'react'

const Tabs = ({tabs = [], defaultTabId, className=''}) => {
    const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id)
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    const ActiveComponent = activeTabData?.component;

    if(!tabs.length) return null;

  return (
   <div className={`w-full ${className}`}>
      {/* Tabs Header */}
      <div className="mb-6 flex items-center gap-1 border-b border-[#E8D3C0]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-[#C1440E]'
                  : 'text-[#8A7F70] hover:text-[#3A342C]'
              }`}
            >
              {tab.name}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#C1440E]" />
              )}
            </button>
          )
        })}
      </div>

      {/* Content Panel */}
      <div className="rounded-2xl bg-[#FBF7F2] border border-[#E8D3C0] p-8">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  )
}

export default Tabs
