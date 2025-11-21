export interface MicroCMSImage {
    url: string;
    height: number;
    width: number;
}

export interface MicroCMSCategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
}

export interface Blog {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    content: string;
    eyecatch?: MicroCMSImage;
    category?: MicroCMSCategory;
}

export type Article = Blog; // Alias for backward compatibility if needed

export interface Member {
    id: string;
    name: string;
    role: string;
    grade: string;
    introduction: string;
    image?: MicroCMSImage;
}
