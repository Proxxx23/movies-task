import {DBMovie} from "../../models/DBMovie";

export type Genre = string;

export type MoviesSchema = {
    genres: Genre[],
    movies: DBMovie[],
}
