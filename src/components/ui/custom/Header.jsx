import React from 'react'

const Header = ({sub="", heading=""}) => {
  return (
    <div>
      <p className="font-serif italic text-[#8A7F70] text-sm mb-1">{sub} —</p>
      <h1 className="font-serif text-3xl font-bold text-[#3A342C] mb-8">
       {heading}
      </h1>
    </div>
  )
}

export default Header
