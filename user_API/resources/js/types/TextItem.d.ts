type TextItem = {
    title: string;
    description: string;
    author: string;
    publication_year: number;
    content: string;
    display_date: string; // e.g. "14 August 2025"
};

type TextCollection = {
    "@context": string;
    "@id": string;
    "@type": string;
    "totalItems": number;
    "member": TextItem[];
}