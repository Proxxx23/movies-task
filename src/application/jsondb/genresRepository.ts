import type {Genre} from "../../infrastructure/jsondb/db";

export interface GenresRepository {
    fetchAll(): Promise<Genre[]>;
}
