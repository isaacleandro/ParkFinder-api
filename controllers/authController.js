import UserRepository from "../repositories/userRepository.js";
import { hashPassword,comparePasswords } from "../utils/hash.js";

const AuthController = {
    login: async (req, res) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Missing fields');
        }

        const user = await UserRepository.finderByEmail(email);

        if (!user ) {
            return res.status(404).send('User not found');
        }

        const isValidPassword = await comparePasswords(password, user.password);

        if (!isValidPassword) {
            return res.status(401).send('Invalid password');
        }

        res.send({
            email: user.email,
            name: user.name
        })
    },
    register:async (req, res) => {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('Missing fields');
        }

        const hashedPassword = await hashPassword(password);

        UserRepository.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        res.send({
            email,
            name
        })
    }
}

export default AuthController