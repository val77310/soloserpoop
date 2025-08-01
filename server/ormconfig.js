import pkg from 'pg';
const { Pool } = pkg;

export default new Pool({
  connectionString: process.env.DATABASE_URL || `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:5432/poopmap`
});
