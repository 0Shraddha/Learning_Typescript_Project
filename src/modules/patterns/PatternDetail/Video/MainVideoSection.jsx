import React from 'react'

const MainVideoSection = () => {
  return (
    <div className="mx-auto w-full h-[60vh] bg-primary my-0 py-0">
      <video 
        className="h-full w-full"
        controls
        // autoPlay
        muted
        playsInline
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
        <source src="/videos/video1.mov" type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default MainVideoSection