export interface MicroCMSImage {
    url: string;
    height: number;
    width: number;
}

export interface Article {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    content: string;
    eyecatch?: MicroCMSImage;
    category: {
        id: string;
        name: string;
    };
}

export interface Member {
    id: string;
    name: string;
    role: string;
    grade: string;
    introduction: string;
    image?: MicroCMSImage;
}
