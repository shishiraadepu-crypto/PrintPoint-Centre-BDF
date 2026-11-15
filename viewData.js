
const db = require("./db");

db.serialize(() => {
    db.all("SELECT * FROM designers", [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Designers:");
            console.table(rows);
        }
    });

    db.all("SELECT * FROM printers", [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Printers:");
            console.table(rows);
        }
    });

    db.all("SELECT * FROM reservations", [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Reservations:");
            console.table(rows);
        }
    });

    db.all(
        `SELECT reservations.reservation_id, designers.name AS designer_name,
        printers.name AS printer_name, printers.material
        FROM reservations
        JOIN designers ON reservations.designer_id = designers.designer_id
        JOIN printers ON reservations.printer_id = printers.printer_id`,
        [],
        (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Reservation Details:");
                console.table(rows);
            }
        }
    );
});

db.close();
