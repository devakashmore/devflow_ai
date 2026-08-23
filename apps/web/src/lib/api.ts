const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }
    return data;
}