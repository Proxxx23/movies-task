import promisedFs from "fs/promises";
import fs from "fs";

// Ideally this will be read by a lib from *.env file
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
    const database = await all();
    if (!database[table]) {
        throw new Error(`Could not read from database. Table "${table}" does not exist in database.`);
    }

    let lastId = await lastInsertedId(table);

    object.id = ++lastId;
    database[table].push(object);

    fs.writeFileSync(await dbPath(), JSON.stringify(database, null, 4));

    return object.id;
}

export const lastInsertedId = async (table: string): Promise<IdentifiableObject['id'] | undefined> => {
    const database = await all();
    const dbtable = database[table] || undefined;

    return Array.isArray(dbtable)
        ? database[table][database[table].length - 1].id
        : undefined;
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
