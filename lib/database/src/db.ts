import promisedFs from "fs/promises";

// fixme: it should all be defined in .env to be lib unaware
const PROD_DB = 'db.json';
export const ORIG_DB = 'db-orig.json';
export const TEST_DB = 'db-test.json';

type IdentifiableObject = { id: number } & Readonly<Record<string, any>>;

// In real DB this connection will be open but let's leave it for now
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
export const insert = async (table: string, object: IdentifiableObject): Promise<IdentifiableObject['id']> => {
    return all().then(async (database) => {
        const records = database[table] as IdentifiableObject[];

        let lastId = await lastInsertedId(records);
        object.id = ++lastId;

        if (!database.hasOwnProperty(table)) {
            throw new Error(`Table ${table} does not exist in database.`);
        }

        database[table].push(object);

        await promisedFs.writeFile(await dbPath(), JSON.stringify(database, null, 4));

        return object.id;
    });
}

export const lastInsertedId = async (records: IdentifiableObject[]): Promise<IdentifiableObject['id']> => {
    return records[records.length - 1].id;
}

/**
 * @throws Error
 */
const dbPath = async (): Promise<string> => {

    let path: string;
    switch (process.env.NODE_ENV) {
        case 'production':
            path = `${__dirname}/../${PROD_DB}`;
            break;
        case 'test':
            path = `${__dirname}/../${TEST_DB}`;
            break;
        default:
            throw new Error('Could not connect to a database: invalid environment');
    }

    try {
        await promisedFs.access(path);
    } catch (err) {
        throw new Error('Could not connect to a database: no database found');
    }

    return path;
}

