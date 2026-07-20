import { ChevronLeft, ChevronRight, SquareDashed } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import React from 'react'

const FooterNav = ({activeTab, setActiveTab}) => {
  return (
    <div className='flex justify-between my-2 mx-4'>
<div>
      Steps {activeTab + 1} of 3
</div>

<div>

    {activeTab === 0 && 
        <Button onClick={()=> setActiveTab(activeTab+1)}>Next <ChevronRight /> </Button>
    }

    {activeTab === 1 && 
    <>
        <Button onClick={()=> setActiveTab(activeTab-1)}>Prev <ChevronLeft /> </Button> 
            <Button>{activeTab+1}</Button>
        <Button onClick={()=> setActiveTab(activeTab+1)}>Next <ChevronRight /> </Button>
    </>
    }

    {activeTab === 2 && 
    <>
        <Button onClick={()=> setActiveTab(activeTab-1)}>Prev <ChevronLeft /> </Button> 
    </>
    }
</div>


    </div>
  )
}

export default FooterNav
