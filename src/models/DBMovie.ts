// read model
export interface DBMovie {
    id: number;
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: string[];
    actors: string | null;
    plot: string | null;
    posterUrl: string | null;
}
