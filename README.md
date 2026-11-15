

# PrintPoint Centre – Backend Development

## Project Overview

PrintPoint Centre is a backend application developed using Node.js, Express.js, and SQLite. It manages designers, printers, and printer reservations through RESTful API endpoints.

The application supports CRUD operations, material-based printer searching, input validation, duplicate printer name checking, and reservation details retrieval.

## Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- Postman
- Git and GitHub

## Project Structure

```text
PrintPoint-Centre-BDF/
│
├── database/
│   ├── db.js
│   ├── checkDatabase.js
│   ├── insertData.js
│   ├── viewData.js
│   └── printpoint.db
│
├── routes/
│   ├── designers.js
│   ├── printers.js
│   └── reservations.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Database Design

The application uses an SQLite database named `printpoint.db`.

It contains three related tables:

### 1. Designers
- designer_id – Primary Key
- name – Designer name

### 2. Printers
- printer_id – Primary Key
- name – Printer name
- material – Printing material

### 3. Reservations
- reservation_id – Primary Key
- designer_id – Foreign Key
- printer_id – Foreign Key

Foreign key constraints maintain relationships between the tables.

## API Endpoints

Base URL:

`http://localhost:3000`

### Printer Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /printers | Retrieve all printers |
| GET | /printers/:id | Retrieve a printer by ID |
| POST | /printers | Add a new printer |
| PUT | /printers/:id | Update printer details |
| DELETE | /printers/:id | Delete a printer |
| GET | /printers?material=PLA | Search printers by material |

### Reservation Endpoint

| Method | Endpoint | Description |
|---|---|---|
| GET | /reservations | Retrieve reservation details with designer and printer names |

### Designer Endpoint

| Method | Endpoint | Description |
|---|---|---|
| GET | /designers | Retrieve the designers route response |

## Special Features

1. **CRUD Operations:** Create, retrieve, update, and delete printer records.
2. **Input Validation:** Rejects missing or invalid printer names and materials.
3. **Material Search:** Supports case-insensitive partial matching.
4. **Duplicate Name Validation:** Prevents duplicate printer names and returns HTTP 409 Conflict.
5. **Reservation JOIN:** Retrieves reservation information along with designer and printer names.
6. **Foreign Key Constraints:** Protects relationships between database tables.

## HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

## Installation and Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/shishiraadepu-crypto/PrintPoint-Centre-BDF.git
```

### Step 2: Navigate to the project folder

```bash
cd PrintPoint-Centre-BDF
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the server

```bash
node server.js
```

The server runs at:

`http://localhost:3000`

## Testing

The API endpoints were tested using Postman.

Testing includes:

- Retrieving all printers
- Retrieving printers by ID
- Creating printer records
- Updating printer records
- Deleting unreferenced printer records
- Searching printers by material
- Validating required input fields
- Checking duplicate printer names
- Retrieving reservation details using JOIN operations

## Conclusion

The PrintPoint Centre backend provides a structured solution for managing designers, printers, and reservations. It demonstrates REST API development, database integration, CRUD operations, input validation, search functionality, and relational database concepts using Node.js, Express.js, and SQLite.

## Repository

GitHub: https://github.com/shishiraadepu-crypto/PrintPoint-Centre-BDF
