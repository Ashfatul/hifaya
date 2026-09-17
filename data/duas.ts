import { DuaItem } from '@/types/dua';
import duasJson from './duas.json';

/**
 * DUAS dataset loaded directly from data/duas.json
 * Anyone can modify, add, or remove duas in data/duas.json directly.
 */
export const DUAS: DuaItem[] = duasJson as DuaItem[];

export default DUAS;
