export interface GenresRepository {
    all(): Promise<string[]>;
}
