import {Genre} from "../../db/schema";

export interface GenresRepository {
    fetchAll(): Promise<Genre[]>;
}
