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
        const { name, occuped, floor, lastEntry } = req.body;
        const space = await SpacesRepository.createSpace({ name, occuped, floor, lastEntry });
        res.send(space);
    },
    updateSpace: async (req, res) => {
        const { id } = req.params;
        const { name, occuped, floor, lastEntry } = req.body;
        const space = await SpacesRepository.updateSpace({ id, name, occuped, floor, lastEntry });
        res.send(space);
    },

    deleteSpace: async (req, res) => {
        const id = req.params.id;
        await SpacesRepository.deleteSpace(id);
        res.sendStatus(204);
    },

    async markEntry (req, res) {
      const id = req.params.id;
      const updetedSpace = await SpacesRepository.markEntry(id);
      res.send(updetedSpace);
    },

    async getPriceOfExit (req, res) {
        const id = req.params.id;
        const price = await SpacesRepository.getPriceOfExit(id);
        res.send({ price });
    },

    async markExit(req, res) {
        const id = req.params.id;
        const updateSpace = await SpacesRepository.exitSpace(id);
        res.send(updateSpace);
    }
};

export default SpacesController;