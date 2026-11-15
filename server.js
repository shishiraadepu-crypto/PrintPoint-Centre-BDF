
const express = require("express");

const app = express();

const designersRouter = require("./routes/designers");
const printersRouter = require("./routes/printers");
const reservationsRouter = require("./routes/reservations");

const db = require("./database/db");

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to PrintPoint Centre Backend!"
    });
});

app.use("/designers", designersRouter);
app.use("/printers", printersRouter);
app.use("/reservations", reservationsRouter);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
