// All TypeScript interfaces

 export interface Materials {
    hook: string;
    woolType: string;
    woolColors: string;
 }

 export interface VideoSection{
    sectionId: string;
    sectionTitle: string;
    videoTitle: string;
    videoUrl: string;
 }

 export interface StepsSection{
    sectionId: string;
    sectionTitle: string;
    instructions: string[];
 }

 export interface FormData {
    title: string;
    materials: Materials;
    coverImage: string;
    description: string;
    pattern: {
        videos: VideoSection[];
        steps: StepsSection[];
    };
 }