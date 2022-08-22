// write model
export interface Movie {
    id: number | null;
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: string[];
    actors: string | null;
    plot: string | null;
    posterUrl: string | null;
}
