import { query } from "../config/db.js";

const VALUE_HOUR = 10;
const LIMIT_HOUR = 1;
const MINUTES_FRACTION = 15;
const VALUE_FRACTION = 3;

const SpacesRepository = {
    async getSpaces() {
        const text = 'SELECT * FROM spaces;';
        const result = await query(text);
        return result.rows[0];
    },

    async getSpaceById(id) {
        const text = 'SELECT * FROM spaces WHERE id = $1;';
        const values = [id];
        const result = await query(text, values);
        return result.rows[0];
    },

    async createSpace(space) {
        const text = 'INSERT INTO spaces(name, occuped, floor, lastEntry) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [space.name, space.occuped, space.floor, space.lastEntry];
        const result = await query(text, values);
        return result.rows[0];
    },

    async updateSpace(id, space) {
        const text = 'UPDATE spaces SET name = $1, occuped = $2, floor = $3, lastEntry = $4 RETURNING *';
        const values = [space.name, space.occuped,  space.floor, space.lastEntry, id];
        const result = await query(text, values);
        return result.rows[0];
    },

    async deleteSpace(id) {
        const text = 'DELETE FROM spaces WHERE id = $1 RETURNING *';
        const values = [id];
        await query(text, values);
    },

    async markEntry(id) {
        const text = 'UPDATE spaces SET lastEntry = NOW(), occuped = true WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await query(text, values);
        return result.rows[0];
    }
};

export default SpacesRepository;