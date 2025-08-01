import db from '../ormconfig.js';
import bcrypt from 'bcrypt';

export async function createUser(username, password) {
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await db.query(
    'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
    [username, hash]
  );
  return rows[0];
}

export async function findByCredentials(username, password) {
  const { rows } = await db.query(
    'SELECT * FROM users WHERE username=$1',
    [username]
  );
  if (rows.length === 0) return null;
  const user = rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  return match ? user : null;
}
