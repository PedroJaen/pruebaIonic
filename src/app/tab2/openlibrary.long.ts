export class OpenLibraryLong {
    publishers: [{ name: string; }];
    title: string;
    number_of_pages: number;
    cover: {
        small: string;
        large: string;
        medium: string;
    };
    subjects: [{
        url: string;
        name: string;
    }];
    authors: [{
        url: string;
        name: string;
    }];
    publish_date: string;
    publish_places: [{ name: string; }];
}
