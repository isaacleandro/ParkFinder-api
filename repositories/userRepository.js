import { query } from "../config/db.js"

const UserRepository = {
    async create(user) {
        const text = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *';
        const values = [user.name, user.email, user.password];
        const result = await query(text, values);
        return result.rows[0];
    },
    async finderByEmail(email) {
        const text = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await query(text, values);
        return result.rows[0];
    },
   
}

export default UserRepository;