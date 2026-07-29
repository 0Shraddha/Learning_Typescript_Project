import Header from '../../../components/ui/custom/Header'
import React, { useState } from 'react'
import MainTab from './Tab/MainTab'
import VideoTutorial from './VideoTutorial'
import PatternTutorial from './PatternTutorial'
import Tabs from '../../../components/ui/custom/Tabs'

const PatternDetail = () => {

  const tutorial = [
    {
      id: 1,
      name: 'Video',
      component: VideoTutorial,
    },
    {
      id: 2,
      name: 'Pattern',
      component: PatternTutorial,
    },
  ]

  return (
    <div>
      <Header sub="pattern detail page" heading="Bear arugumi crochet" />

      <Tabs tabs={tutorial} />
      
      <MainTab />
    </div>
  )
}

export default PatternDetail