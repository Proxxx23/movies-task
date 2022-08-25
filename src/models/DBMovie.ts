// write model

export class DBMovie {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly year: number,
        public readonly runtime: number,
        public readonly director: string,
        public readonly genres: string[],
        public readonly actors: string | null,
        public readonly plot: string | null,
        public readonly posterUrl: string | null,
    ) {
    }
}
