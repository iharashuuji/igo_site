import { Blog } from "@/types";

// MicroCMS Settings
const SERVICE_DOMAIN = "k8z6onfj9h";
const API_KEY = process.env.MICROCMS_API_KEY;

if (!API_KEY) {
    console.warn("MICROCMS_API_KEY is not set");
}

export async function getBlogs(): Promise<Blog[]> {
    if (!API_KEY) return [];

    try {
        const res = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs`, {
            headers: {
                "X-MICROCMS-API-KEY": API_KEY,
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();
        return data.contents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBlog(id: string): Promise<Blog | null> {
    if (!API_KEY) return null;

    try {
        const res = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${id}`, {
            headers: {
                "X-MICROCMS-API-KEY": API_KEY,
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error("Failed to fetch blog");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
