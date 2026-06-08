export interface SidebarLesson {
  id: string;
  name: string;
  type: string;
  active?: boolean;
}

export interface SidebarSection {
  id: string;
  name: string;
  lessons: SidebarLesson[];
}

export const mockCurriculum: SidebarSection[] = [
{
    id: "s1",
    name: "Getting Started",
    lessons: [
      { id: "l1", name: "Introduction & Materials", type: "Video" },
      { id: "l2", name: "Reading the Pattern", type: "Guide" },
      { id: "l3", name: "Hook & Yarn Setup", type: "Video" },
    ],
  },
  {
    id: "s2",
    name: "Core Pattern",
    lessons: [
      { id: "l4", name: "Tutorial Video", type: "Video", active: true },
      { id: "l5", name: "Row-by-Row Steps", type: "Steps" },
      { id: "l6", name: "Joining & Finishing", type: "Video" },
    ],
  },
  {
    id: "s3",
    name: "Final Touches",
    lessons: [
      { id: "l7", name: "Blocking & Shaping", type: "Video" },
      { id: "l8", name: "Troubleshooting Guide", type: "Guide" },
    ],
  },
];
