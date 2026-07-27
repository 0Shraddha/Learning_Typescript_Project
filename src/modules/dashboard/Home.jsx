import Header from '../../components/ui/custom/Header'
import React from 'react'
import { Link } from 'react-router-dom'

const currentlyOnHook = {
  title: "Grandma's Granny Square Blanket",
  note: "Row 34 of... honestly I lost count. This one's for the couch.",
}

const recentThoughts = [
  { date: "Jul 22", text: "Finally figured out invisible decrease and I'm never going back." },
  { date: "Jul 14", text: "Frogged the whole sleeve. Twice. Worth it." },
  { date: "Jul 3", text: "Found the perfect oatmeal wool at the market — stocking up." },
]

const Home = () => {
  return (
    <div className="bg-[#FBF7F2] text-[#3A342C] min-h-screen">

      {/* Personal intro — like a page from a journal */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-14">
        <Header sub="a little collection of" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
          Crochet <span className="text-[#C1440E]">World</span>
        </h1>
        <p className="text-[#5A5248] leading-relaxed max-w-lg">
          This is where I keep the patterns I've made, the ones I'm still figuring out,
          and the ones I dream about finishing someday. Mostly for me. You're welcome to look around.
        </p>
      </section>

      {/* "On my hook right now" — pinned note style */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="relative bg-[#FFFDFB] border border-[#EFE6DC] rounded-2xl p-6 shadow-sm -rotate-1">
          <span className="absolute -top-3 left-6 bg-[#C1440E] text-[#FBF7F2] text-[10px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
            on my hook right now
          </span>
          <h3 className="font-serif text-xl font-semibold mt-2 mb-1">{currentlyOnHook.title}</h3>
          <p className="text-[#8A7F70] text-sm">{currentlyOnHook.note}</p>
        </div>
      </section>

      {/* Hand-drawn style divider */}
      <div className="max-w-2xl mx-auto px-6">
        <svg viewBox="0 0 400 12" className="w-full h-3 text-[#E8D3C0]">
          <path
            d="M0,6 C20,0 40,12 60,6 C80,0 100,12 120,6 C140,0 160,12 180,6 C200,0 220,12 240,6 C260,0 280,12 300,6 C320,0 340,12 360,6 C380,0 400,12 400,6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Little journal entries */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="font-serif text-lg font-semibold mb-6 text-[#3A342C]">notes to self</h2>
        <div className="space-y-5">
          {recentThoughts.map((entry) => (
            <div key={entry.date} className="flex gap-4 items-baseline">
              <span className="text-xs text-[#C1440E] font-medium whitespace-nowrap w-14">{entry.date}</span>
              <p className="text-[#5A5248] text-sm leading-relaxed">{entry.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simple links, not CTAs — just doors into the site */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/pattern-list"
            className="group bg-[#F1E4D8] rounded-2xl p-6 hover:bg-[#EAD9C8] transition-colors"
          >
            <p className="font-serif text-lg font-semibold mb-1">The Collection</p>
            <p className="text-xs text-[#8A7F70] group-hover:text-[#6b6053]">everything I've made so far</p>
          </Link>
          <Link
            to="/upload-pattern"
            className="group bg-[#FFFDFB] border border-[#EFE6DC] rounded-2xl p-6 hover:border-[#C1440E] transition-colors"
          >
            <p className="font-serif text-lg font-semibold mb-1">Add Something New</p>
            <p className="text-xs text-[#8A7F70] group-hover:text-[#C1440E]">jot down a fresh pattern</p>
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home