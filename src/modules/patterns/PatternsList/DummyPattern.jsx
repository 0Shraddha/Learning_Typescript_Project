const DummyPattern = {
  title: "Cottage Bear Amigurumi",
  description:
    "A cozy, beginner-friendly amigurumi bear with a chunky sweater texture. Perfect for gifting or adding to your shelf collection.",
  coverImage: "/patterns/cottage-bear/cover.jpg",

  materials: {
    hook_size: "4.0mm",
    wool_type: "Worsted Weight Acrylic Yarn",
    wool_colors: ["Oatmeal", "Terracotta", "Cream", "Charcoal"],
  },

  sections: [
    {
      title: "Getting Started",
      video: {
        video_title: "Materials Overview & Gauge Swatch",
        video_url: "https://www.youtube.com/watch?v=example1",
      },
    },
    {
      title: "Basic Stitches Used",
      video: {
        video_title: "Magic Ring, sc, inc & dec Tutorial",
        video_url: "https://www.youtube.com/watch?v=example2",
      },
    },
  ],

  patterns: [
    {
      title: "Head",
      video: {
        video_title: "Crocheting the Head Shape",
        video_url: "https://www.youtube.com/watch?v=example3",
      },
      rows: [
        { row: 1, instruction: "Magic ring, 6 sc into ring. (6 st)" },
        { row: 2, instruction: "Inc in each st around. (12 st)" },
        { row: 3, instruction: "*Sc 1, inc* repeat around. (18 st)" },
        { row: 4, instruction: "*Sc 2, inc* repeat around. (24 st)" },
        { row: "5-8", instruction: "Sc around, no increases. (24 st)" },
        { row: 9, instruction: "*Sc 2, dec* repeat around. (18 st)" },
        { row: 10, instruction: "*Sc 1, dec* repeat around. (12 st)" },
        { row: 11, instruction: "Dec around, stuff firmly. (6 st)" },
        { row: 12, instruction: "Fasten off, leave tail for sewing." },
      ],
    },
    {
      title: "Body",
      video: {
        video_title: "Crocheting the Body & Sweater Texture",
        video_url: "https://www.youtube.com/watch?v=example4",
      },
      rows: [
        { row: 1, instruction: "Magic ring, 6 sc into ring. (6 st)" },
        { row: 2, instruction: "Inc in each st around. (12 st)" },
        { row: 3, instruction: "*Sc 1, inc* repeat around. (18 st)" },
        { row: 4, instruction: "*Sc 2, inc* repeat around. (24 st)" },
        { row: 5, instruction: "*Sc 3, inc* repeat around. (30 st)" },
        { row: "6-14", instruction: "Sc around in Terracotta, no increases. (30 st)" },
        { row: 15, instruction: "*Sc 3, dec* repeat around. (24 st)" },
        { row: 16, instruction: "Sc around, begin stuffing. (24 st)" },
      ],
    },
    {
      title: "Arms (make 2)",
      video: {
        video_title: "Quick Arm Tutorial",
        video_url: "https://www.youtube.com/watch?v=example5",
      },
      rows: [
        { row: 1, instruction: "Magic ring, 5 sc into ring. (5 st)" },
        { row: "2-6", instruction: "Sc around, no increases. (5 st)" },
        { row: 7, instruction: "Fasten off, leave long tail for attaching." },
      ],
    },
  ],
}

export default DummyPattern