import {MoviesRepository} from "../application/jsondb/moviesRepository";
import {DBMovie} from "../models/DBMovie";
import {Movie} from "../models/Movie";

type MoviesWithCounter = (Movie & {
    matchingGenresCount: number
})[];

export class MovieService {
    constructor(private readonly moviesRepository: MoviesRepository) { }

    public async getRandomMovie(): Promise<DBMovie> {
        const movies = await this.moviesRepository.all();

        return movies[Math.floor((Math.random() * movies.length))];
    }

    public async find(genresList?: string[], duration?: number): Promise<DBMovie[]> {
        let movies = await this.moviesRepository.all();

        const filtered: MoviesWithCounter = [];

        movies.forEach((movie) => {
            if (genresList) {
                if (movie.genres === []) {
                    // todo: test if below won't be sufficient
                    return; // no genres at all
                }

                const hasNoMatchingGenres = movie.genres.filter((genre) => genresList.includes(genre)) === [];
                if (hasNoMatchingGenres) {
                    return;
                }

                const matchingGenresCount = movie.genres.filter((genre) => genresList.includes(genre)).length;
                if (matchingGenresCount > 0) {
                    filtered.push(
                        {
                            ...movie,
                            matchingGenresCount
                        }
                    );
                }
            }


            if (+movie.runtime < duration - 10 || +movie.runtime > +duration + 10) {
                const index = filtered.findIndex((item: Movie) => item.id === movie.id); // index to remove
                if (index > -1) { // found index
                    filtered.splice(index, 1);
                }
            }
        });

        filtered.sort((movie1, movie2) => movie2.matchingGenresCount - movie1.matchingGenresCount);

        movies = filtered;

        return movies;
    }
}
