
const db = require("./db");

db.serialize(() => {
    db.run(
        "INSERT INTO designers (name) VALUES (?)",
        ["Rahul"]
    );

    db.run(
        "INSERT INTO designers (name) VALUES (?)",
        ["Priya"]
    );

    db.run(
        "INSERT INTO designers (name) VALUES (?)",
        ["Sneha"]
    );

    db.run(
        "INSERT INTO printers (name, material) VALUES (?, ?)",
        ["Printer 1", "PLA"]
    );

    db.run(
        "INSERT INTO printers (name, material) VALUES (?, ?)",
        ["Printer 2", "ABS"]
    );

    db.run(
        "INSERT INTO printers (name, material) VALUES (?, ?)",
        ["Printer 3", "Resin"]
    );

    db.run(
        "INSERT INTO reservations (designer_id, printer_id) VALUES (?, ?)",
        [1, 1]
    );

    db.run(
        "INSERT INTO reservations (designer_id, printer_id) VALUES (?, ?)",
        [2, 2]
    );

    db.run(
        "INSERT INTO reservations (designer_id, printer_id) VALUES (?, ?)",
        [3, 3]
    );
});

db.close(() => {
    console.log("Sample records inserted successfully");
});
