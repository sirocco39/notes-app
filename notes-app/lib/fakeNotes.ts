import { title } from "process";

export type Note = { 
    id: string; 
    title: string; 
    content: string
};

export const notes: Note[] = [
    { id: "1", title: "First note", content: "Hello Next.js" },
    { id: "2", title: "Second note", content: "Props and map"}
];