import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    // pegar vaga
    res.send('GET /spaces');
});

router.post("/", (req, res) => {
    // add vaga
    res.send('POST /spaces');
});

router.delete("/:id", (req, res) => {
    //delete vaga
    res.send('DELETE /spaces');
});

router.post('/:id/occupy', (req, res) => {
    //preencher vaga
})

router.post('/:id/fill-out', (req, res) => {
    //desocupar vaga
    res.send('POST /spaces/:id/fill-out');
})

export default router;