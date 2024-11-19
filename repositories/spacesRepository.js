import { query } from "../config/db.js";
import { differenceInMinutes } from "date-fns";

const VALUE_HOUR = 10;
const LIMIT_MINUTES = 60;
const FRACTION_MINUTES = 15;
const VALUE_FRACTION = 3;

const SpacesRepository = {
    async getSpaces() {
        const text = 'SELECT * FROM spaces;';
        const result = await query(text);
        return result.rows;
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
        const values = [space.name, space.occuped, space.floor, space.lastEntry, id];
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
    },

    async getPriceOfExit(id) {
        const text = 'SELECT lastEntry FROM spaces WHERE id = $1';
        const values = [id];
        const result = await query(text, values);

        let lastEntry = result.rows[0].lastentry; // new Date();
        let now = new Date();

        let minutesPassed = differenceInMinutes(now, lastEntry);  
        let finalValue = 0;

        if (minutesPassed > LIMIT_MINUTES) {
            finalValue = VALUE_HOUR + (minutesPassed - 60) / FRACTION_MINUTES * VALUE_FRACTION
        } else {
            finalValue = VALUE_HOUR
        }
        
        return finalValue.toFixed(2);
    },

    async exitSpace(id) {
        const text = 'UPDATE spaces SET lastEntry = null, occuped = false WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await query(text, values);
        return result.rows[0];
    }



};

export default SpacesRepository;