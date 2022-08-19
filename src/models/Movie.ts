export interface Movie {
    id: number; // autoincrement
    title: string; // required, string, max 255 characters
    year: number; // required
    runtime: number; // required
    director: string; // required
    genres: string[]; // required, from DB only (predefined)
    actors: string | null; // opt
    plot: string | null;// opt
    posterUrl: string | null; // opt
}
