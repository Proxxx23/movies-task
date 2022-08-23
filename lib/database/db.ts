import promisedFs from "fs/promises";

export const PROD_DB_NAME = 'db.json';
export const ORIG_DB_NAME = 'db-orig.json';
export const TEST_DB_NAME = 'db-test.json';

export const PROD_DB_PATH = '/../../src/db/' + PROD_DB_NAME;
export const TEST_DB_PATH = '/../../src/db/' + TEST_DB_NAME;

type IdentifiableObject = { id: number } & object;

// In real DB this connection will be open and shared but let's leave it for now
const connection = async <TSchema extends object>(): Promise<TSchema> => {
    const data = await promisedFs.readFile(await dbPath(), {encoding: 'utf8'});
    const buffer = Buffer.from(data);

    return JSON.parse(buffer.toString()) as TSchema;
}

export const all = async <TSchema extends object>(): Promise<TSchema> => {
    return await connection<TSchema>();
}

/**
 * @throws Error
 */
export const insert = async <TSchema extends object>(table: string, object: IdentifiableObject): Promise<number> => {
    return all<TSchema>().then(async (database) => {
        const records = database[table] as IdentifiableObject[];

        object.id = await lastInsertedId(records);

        if (!database.hasOwnProperty(table)) {
            throw new Error(`Table ${table} does not exist in database.`);
        }

        database[table].push(object);

        await promisedFs.writeFile(await dbPath(), JSON.stringify(database));

        return await lastInsertedId(database[table]);
    });
}

const lastInsertedId = async (records: IdentifiableObject[]): Promise<number> => {
    return ++records[records.length - 1].id;
}

const dbPath = async (): Promise<string> => {

    let path: string;
    switch (process.env.NODE_ENV) {
        case 'production':
            path = PROD_DB_PATH;
            break;
        case 'test':
            path = TEST_DB_PATH;
            break;
        default:
            throw new Error('Could not connect to a database: invalid environment');
    }

    try {
        await promisedFs.access(__dirname + path);
    } catch (err) {
        throw new Error('Could not connect to a database: no database found');
    }

    return __dirname + path;
}

