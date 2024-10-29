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

export default router;