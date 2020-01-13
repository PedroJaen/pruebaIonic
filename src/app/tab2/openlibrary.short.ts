export interface OpenLibraryShort {
    info_url: string;
    bib_key: string;
    preview_url: string;
    thumbnail_url: string;
    details: {
        number_of_pages: number;
        covers: number[];
        title: string;
        subtitle: string;
        languages: [{
            key: string;
        }];
        publish_country: string;
        publishers: string[];
        description: {
            type: string;
            value: string;
        };
        physical_format: string;
        publish_places: string[];
        isbn_13: string[];
        isbn_10: string[];
        publish_date: string;
    };
    preview: string;
}
