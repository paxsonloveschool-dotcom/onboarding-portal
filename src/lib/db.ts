import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'onboarding.db');

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;

  _db = new Database(dbPath);
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');
  _db.pragma('busy_timeout = 5000');

  _db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'employee',
      team TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS w9_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      business_name TEXT,
      federal_tax_classification TEXT,
      address TEXT NOT NULL,
      city_state_zip TEXT NOT NULL,
      ssn_or_ein TEXT NOT NULL,
      signature TEXT NOT NULL,
      date_signed TEXT NOT NULL,
      submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      doc_type TEXT NOT NULL,
      uploaded_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS checklist_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      order_num INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS checklist_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      checklist_item_id INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (checklist_item_id) REFERENCES checklist_items(id),
      UNIQUE(user_id, checklist_item_id)
    );
  `);

  // Seed checklist items
  const count = _db.prepare('SELECT COUNT(*) as cnt FROM checklist_items').get() as { cnt: number };
  if (count.cnt === 0) {
    const insertItem = _db.prepare(
      'INSERT INTO checklist_items (team, title, description, order_num) VALUES (?, ?, ?, ?)'
    );

    const items = [
      ['hp', 'Complete W-9 Tax Form', 'Submit your W-9 form for tax purposes', 1],
      ['hp', 'Upload Government ID', "Upload a valid photo ID (driver's license or passport)", 2],
      ['hp', 'Read Employee Handbook', 'Review the HP Landscaping employee handbook', 3],
      ['hp', 'Review Safety SOPs', 'Read all safety standard operating procedures', 4],
      ['hp', 'Upload Certifications', 'Upload any relevant landscaping certifications', 5],
      ['hp', 'Equipment Training', 'Complete equipment safety training acknowledgment', 6],
      ['hp', 'Emergency Contact Info', 'Provide emergency contact information', 7],
      ['hp', 'Uniform Size Submission', 'Submit your uniform size preferences', 8],
      ['restore', 'Complete W-9 Tax Form', 'Submit your W-9 form for tax purposes', 1],
      ['restore', 'Upload Government ID', "Upload a valid photo ID (driver's license or passport)", 2],
      ['restore', 'Read Employee Handbook', 'Review the Restore employee handbook', 3],
      ['restore', 'Review Restoration SOPs', 'Read all restoration standard operating procedures', 4],
      ['restore', 'Upload Certifications', 'Upload any relevant restoration certifications (IICRC, etc.)', 5],
      ['restore', 'Safety Protocol Training', 'Complete safety protocol training acknowledgment', 6],
      ['restore', 'Emergency Contact Info', 'Provide emergency contact information', 7],
      ['restore', 'Vehicle & Insurance Info', 'Submit vehicle and insurance documentation', 8],
    ];

    const insertMany = _db.transaction((rows: (string | number)[][]) => {
      for (const row of rows) {
        insertItem.run(...row);
      }
    });
    insertMany(items);
  }

  // Seed admin
  const userCount = _db.prepare('SELECT COUNT(*) as cnt FROM users').get() as { cnt: number };
  if (userCount.cnt === 0) {
    const hash = bcrypt.hashSync('admin123', 10);
    _db.prepare(
      'INSERT INTO users (email, password_hash, name, role, team) VALUES (?, ?, ?, ?, ?)'
    ).run('admin@hplandscaping.com', hash, 'Admin User', 'admin', 'hp');
  }

  return _db;
}

const db = new Proxy({} as Database.Database, {
  get(_target, prop) {
    const instance = getDb();
    const val = (instance as any)[prop];
    if (typeof val === 'function') {
      return val.bind(instance);
    }
    return val;
  },
});

export default db;
