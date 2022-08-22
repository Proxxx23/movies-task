import {MoviesRepository} from "../application/jsondb/moviesRepository";
import {DBMovie} from "../models/DBMovie";
import {Movie} from "../models/Movie";

const randomMovie = (movies: Movie[]): Movie => movies[Math.floor((Math.random() * movies.length))];
const isWithinValidDuration = (movieRuntime: number, duration: number): boolean => movieRuntime > duration - 10 && movieRuntime < +duration + 10;

export class MovieService {
    constructor(private readonly moviesRepository: MoviesRepository) {
    }

    public async getRandomMovie(duration?: number): Promise<DBMovie> {
        const movies = await this.moviesRepository.all();

        if (duration) {
            const moviesWithinDuration = movies.filter((movie) => isWithinValidDuration(+movie.runtime, duration));

            return randomMovie(moviesWithinDuration);
        }

        return randomMovie(movies);
    }

    public async find(genresList: string[], duration?: number): Promise<DBMovie[]> {
        const allMovies = await this.moviesRepository.all();

        const filteredMovies = allMovies
            .map(movie => {
                    const matchingGenresCount = movie.genres.filter((genre) => genresList.includes(genre)).length;
                    const withinDurationLimit = !duration
                        ? true
                        : isWithinValidDuration(+movie.runtime, duration);

                    if (matchingGenresCount > 0 && withinDurationLimit) {
                        return {
                            ...movie,
                        }
                    }
                }
            )
            .filter((movie) => movie !== undefined);

        this.sortByMatchingGenres(filteredMovies, genresList);

        return this.retrieveUniqueMovies(filteredMovies);
    }

    sortByMatchingGenres(movies: Movie[], genresList: string[]) {
        movies.sort((movie1, movie2) => {
            const m1 = movie1.genres.filter((genre) => genresList.includes(genre)).length;
            const m2 = movie2.genres.filter((genre) => genresList.includes(genre)).length;

            return m2 - m1;
        });
    }

    retrieveUniqueMovies(movies: Movie[]): Movie[] {
        const map = new Map();

        for (const movie of movies) {
            map.set(movie.title, movie);
        }

        return [...map.values()];
    }
}
