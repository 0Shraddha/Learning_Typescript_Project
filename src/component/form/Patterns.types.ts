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