
const db = require("./db");

db.all(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'",
    [],
    (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Database Tables:");
            console.log(rows);
        }

        db.close();
    }
);
