import {DBMovie} from "../../models/DBMovie";

export interface GenresRepository {
    all(): Promise<DBMovie['genres']>; // decouple
}
