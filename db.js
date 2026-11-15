
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "printpoint.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to PrintPoint Centre Database");
    }
});

db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON");

    db.run(`
        CREATE TABLE IF NOT EXISTS designers (
            designer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS printers (
            printer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            material TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS reservations (
            reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
            designer_id INTEGER NOT NULL,
            printer_id INTEGER NOT NULL,
            FOREIGN KEY (designer_id) REFERENCES designers(designer_id),
            FOREIGN KEY (printer_id) REFERENCES printers(printer_id)
        )
    `);
});

module.exports = db;
