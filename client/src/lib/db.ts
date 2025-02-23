import { openDB, type IDBPDatabase } from 'idb';
import { ModuleProgress, moduleProgressSchema } from '@shared/schema';

const DB_NAME = 'quality-sensei';
const STORE_NAME = 'progress';

export const db = openDB(DB_NAME, 1, {
  upgrade(db: IDBPDatabase) {
    db.createObjectStore(STORE_NAME);
  },
});

export async function saveProgress(progress: ModuleProgress) {
  const validatedProgress = moduleProgressSchema.parse(progress);
  return (await db).put(STORE_NAME, validatedProgress, progress.id);
}

export async function getProgress(moduleId: string): Promise<ModuleProgress | undefined> {
  return (await db).get(STORE_NAME, moduleId);
}

export async function getAllProgress(): Promise<ModuleProgress[]> {
  return (await db).getAll(STORE_NAME);
}