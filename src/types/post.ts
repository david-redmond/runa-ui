export interface Comment {
    id: number;
    ownerId: string;
    name: string;
    picture: string;
    text: string;
    creator: string;
    createdAt?: string;
}

export interface Post {
    id: number;
    title: string;
    creator: string;
    location: string;
    description: string;
    images?: string[];
    comments: any[] // Comment[];
    attributes: any;
    createdAt: string
}
