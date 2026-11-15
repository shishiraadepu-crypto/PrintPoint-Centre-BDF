
const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
    const { material } = req.query;

    let query = "SELECT * FROM printers";
    let params = [];

    if (material !== undefined) {
        if (typeof material !== "string" || !material.trim()) {
            return res.status(400).json({
                message: "Valid material is required for search"
            });
        }

        query += " WHERE LOWER(material) LIKE LOWER(?)";
        params.push(`%${material.trim()}%`);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(rows);
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.get(
        "SELECT * FROM printers WHERE printer_id = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Printer not found"
                });
            }

            res.status(200).json(row);
        }
    );
});

router.post("/", (req, res) => {
    const { name, material } = req.body || {};

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof material !== "string" ||
        !material.trim()
    ) {
        return res.status(400).json({
            message: "Valid name and material are required"
        });
    }

    const printerName = name.trim();
    const printerMaterial = material.trim();

    db.get(
        "SELECT printer_id FROM printers WHERE LOWER(name) = LOWER(?)",
        [printerName],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (row) {
                return res.status(409).json({
                    message: "Printer name already exists"
                });
            }

            db.run(
                "INSERT INTO printers (name, material) VALUES (?, ?)",
                [printerName, printerMaterial],
                function (err) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.status(201).json({
                        message: "Printer added successfully",
                        printer_id: this.lastID
                    });
                }
            );
        }
    );
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, material } = req.body || {};

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof material !== "string" ||
        !material.trim()
    ) {
        return res.status(400).json({
            message: "Valid name and material are required"
        });
    }

    const printerName = name.trim();
    const printerMaterial = material.trim();

    db.get(
        "SELECT printer_id FROM printers WHERE LOWER(name) = LOWER(?) AND printer_id != ?",
        [printerName, id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (row) {
                return res.status(409).json({
                    message: "Printer name already exists"
                });
            }

            db.run(
                "UPDATE printers SET name = ?, material = ? WHERE printer_id = ?",
                [printerName, printerMaterial, id],
                function (err) {
                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    if (this.changes === 0) {
                        return res.status(404).json({
                            message: "Printer not found"
                        });
                    }

                    res.status(200).json({
                        message: "Printer updated successfully"
                    });
                }
            );
        }
    );
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.run(
        "DELETE FROM printers WHERE printer_id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Printer not found"
                });
            }

            res.status(200).json({
                message: "Printer deleted successfully"
            });
        }
    );
});

module.exports = router;
