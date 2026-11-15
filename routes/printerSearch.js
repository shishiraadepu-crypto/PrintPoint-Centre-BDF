
function searchPrinters(db) {
    return (req, res) => {
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
    };
}

module.exports = searchPrinters;
