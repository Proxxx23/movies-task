import {Genre} from "./schema";

export interface GenresRepository {
    fetchAll(): Promise<Genre[]>;
}
