import SpacesRepository from "../repositories/spacesRepository.js";

const SpacesController = {
    getSpaces: async (req, res) => {
        const spaces = await SpacesRepository.getSpaces();
        res.send(spaces);
    },
    getSpaceById: async (req, res) => {
        const { id } = req.params;
        const space = await SpacesRepository.getSpaceById(id);
        res.send(space);
    },
    createSpace: async (req, res) => {
        const { name, occupied, floor, lastEntry } = req.body;
        const space = await SpacesRepository.createSpace({ name, occupied, floor, lastEntry });
        res.send(space);
    },
    updateSpace: async (req, res) => {
        const { id } = req.params;
        const { name, occupied, floor, lastEntry } = req.body;
        const space = await SpacesRepository.updateSpace({ id, name, occupied, floor, lastEntry });
        res.send(space);
    },

    deleteSpace: async (req, res) => {
        const id = req.params.id;
        await SpacesRepository.deleteSpace(id);
        res.sendStatus(204);
    }
};

export default SpacesController;