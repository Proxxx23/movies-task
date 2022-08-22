import {MoviesDB} from "../../infrastructure/jsondb/db";

export interface GenresRepository {
    all(): Promise<MoviesDB['genres']>;
}
