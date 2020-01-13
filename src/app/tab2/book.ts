export interface Book {
    id?: number;
    isbn: number;
    cdu?: string;
    publishers: string[];
    title: string;
    subtitle?: string;
    number_of_pages: number;
    cover?: string;
    subjects?: string[];
    authors?: string[];
    publish_date: string;
    publish_places: string[];
    description: string;
    physical_format: string;
}
