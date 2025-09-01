const Database = require('better-sqlite3');
const path = require('path');

const dbFile = path.join(process.cwd(), 'database', 'churchDb.db');
const db = new Database(dbFile);

db.prepare(`CREATE TABLE IF NOT EXISTS church (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS church_members (
    id INTEGER PRIMARY KEY,
    name_and_surname TEXT,
    parish TEXT,
    biblical_scripture TEXT,
    hymn TEXT,
    church_id INTEGER,
    FOREIGN KEY (church_id) REFERENCES church(id)
)`).run();

module.exports = db;
