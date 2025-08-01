import db from '../ormconfig.js';

export async function addPoop(userId, lat, lng, description) {
  const { rows } = await db.query(
    'INSERT INTO poops (user_id, location, description) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326), $4) RETURNING *',
    [userId, lng, lat, description]
  );
  return rows[0];
}

export async function getRecentPoops(limit = 50) {
  const { rows } = await db.query(
    'SELECT p.id, u.username, p.description, ST_Y(p.location::geometry) AS lat, ST_X(p.location::geometry) AS lng, p.created_at \
     FROM poops p JOIN users u ON u.id = p.user_id ORDER BY p.created_at DESC LIMIT $1',
    [limit]
  );
  return rows;
}
