import {Genre} from "../../infrastructure/jsondb/db";

export interface GenresRepository {
    all(): Promise<Genre[]>;
}
