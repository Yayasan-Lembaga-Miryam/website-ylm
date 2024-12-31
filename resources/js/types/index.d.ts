export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PaginatedData<T = never> = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page_url: string | null;
    last_page_url: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    from: number;
    to: number;
    data: T[];
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
