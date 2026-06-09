export type PatternStep = {
    id: string;
    type: "row" | "info";
    text: string;
};

export type PatternProps = {
    title: string;
    patterns: string;
    description?: string;
    price: number;
    hook: string;
    woolType: string;
    woolColors: string;
    imageUrl?: string;
    videoUrl?: string;
    steps: PatternStep[];
};

export type VideoSeries = {
    title: string;
    id: string;
    lessons: VideoTutorials[];
}

export type VideoTutorials = {
    title: string;
    id: string;
    videoUrl: string;
    videoType: string;
}

//VideoSeries and VideoTutorials
// [
//   {
//     id: "1",
//     title: "Getting Started",
//     lessons: [
//       {
//         id: "101",
//         title: "Introduction",
//         videoUrl: "blob:abc123"
//       },
//       {
//         id: "102",
//         title: "Materials",
//         videoUrl: ""
//       }
//     ]
//   }
// ]



//Patterns Rows and Infos
export type PatternsSeries = {
    title: string;
    id: string;
    patterns: PatternItem[];
}

export type PatternItem = {
    id: string;
    type: "row" | "info";
    text: string;
};