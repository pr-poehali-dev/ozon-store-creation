CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  delivery TEXT NOT NULL,
  address TEXT,
  comment TEXT,
  total NUMERIC(12,2) NOT NULL,
  items JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);