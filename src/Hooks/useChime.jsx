import { useCallback, useRef } from 'react'

// Generates a soft two-note "ting" using the Web Audio API — no audio file needed
const useChime = () => {
  const audioCtxRef = useRef(null)

  const playChime = useCallback(() => {
    // Reuse one AudioContext across plays
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    const ctx = audioCtxRef.current

    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.value = freq

      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02) // soft attack
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration) // gentle fade

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + duration)
    }

    const now = ctx.currentTime
    playNote(1046.5, now, 0.5)        // C6 — the "ting"
    playNote(1318.5, now + 0.08, 0.6) // E6 — a soft little sparkle after
  }, [])

  return playChime
}

export default useChime