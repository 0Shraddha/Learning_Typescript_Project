import React, { useState } from 'react'
import Detail from './Detail'
import Forum from './Forum'
import Tabs from '../../../../components/ui/custom/Tabs'

const MainTab = () => {

    const tabs = [
        { id: 1,
          name: 'Detail',
          component: Detail,
        },
        {
            id: 2,
            name: 'Forum',
            component: Forum,
        }
    ]


  return (
    <div>

            <Tabs tabs={tabs} className='bg-orange-200 my-4' />
    </div>
  )
}

export default MainTab
