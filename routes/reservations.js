
const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
    const query = `
        SELECT
            reservations.reservation_id,
            designers.name AS designer_name,
            printers.name AS printer_name
        FROM reservations
        JOIN designers
            ON reservations.designer_id = designers.designer_id
        JOIN printers
            ON reservations.printer_id = printers.printer_id
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(rows);
    });
});

module.exports = router;
