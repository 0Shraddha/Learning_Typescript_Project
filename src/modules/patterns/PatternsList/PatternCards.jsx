import React, { useState } from 'react'
import { Heart, Scissors, Layers } from 'lucide-react'
import './patternCard.css'
import DummyPattern from './DummyPattern'

const PatternCards = ({ pattern }) => {
  const [liked, setLiked] = useState(false)

  const data = pattern || DummyPattern

  if (!data || !data.title) {
    return <p className="empty-state">No patterns uploaded yet!</p>
  }

  const {
    title,
    description,
    coverImage,
    materials = {},
    patterns = [],
  } = data

  const { hook_size, wool_colors = [] } = materials

  return (
    <div className="pattern-card">
      <div className="pattern-thumb">
        <img src={coverImage} alt={title} />
        <button
          className={`fav-btn ${liked ? 'liked' : ''}`}
          onClick={() => setLiked(!liked)}
          aria-label="Save pattern"
        >
          <Heart size={16} fill={liked ? '#C1440E' : 'none'} />
        </button>
         <span className="difficulty-badge">Free</span>
      </div>

      <div className="pattern-stitch-line" />

      <div className="pattern-body">
        <h3 className="pattern-title">{title}</h3>
        <p className="pattern-description">{description}</p>

        {wool_colors.length > 0 && (
          <div className="wool-swatches">
            {wool_colors.map((color) => (
              <span key={color} className="swatch-dot" title={color} />
            ))}
          </div>
        )}

        <div className="pattern-footer">
          <span className="pattern-meta flex justify-between items-center gap-2">
            <Layers size={13} color='#d97d26' /> {patterns.length} sections
          </span>
          <span className="pattern-meta flex justify-between items-center gap-2">
            <Scissors size={13} color='#d97d26' /> {hook_size}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PatternCards