// write model

export class Movie {
    constructor(
        public id: number | null,
        private readonly title: string,
        private readonly year: number,
        private readonly runtime: number,
        private readonly director: string,
        private readonly genres: string[],
        private readonly actors: string | null,
        private readonly plot: string | null,
        private readonly posterUrl: string | null,
    ) {
    }
}
