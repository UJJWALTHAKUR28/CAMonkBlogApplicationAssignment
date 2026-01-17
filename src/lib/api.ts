import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const API_BASE_URL = "http://localhost:3001";

export interface Blog {
    id: number;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export type NewBlog = Omit<Blog, "id">;

export const api = {
    getBlogs: async (): Promise<Blog[]> => {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (!response.ok) {
            throw new Error("Failed to fetch blogs");
        }
        return response.json();
    },

    getBlogById: async (id: string): Promise<Blog> => {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch blog");
        }
        return response.json();
    },

    createBlog: async (blog: NewBlog): Promise<Blog> => {
        const response = await fetch(`${API_BASE_URL}/blogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        });
        if (!response.ok) {
            throw new Error("Failed to create blog");
        }
        return response.json();
    },

    updateBlog: async (id: string, blog: Partial<Blog>): Promise<Blog> => {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });
        if (!response.ok) {
            throw new Error('Failed to update blog');
        }
        return response.json();
    }
};
