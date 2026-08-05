ALTER TABLE t_p37034511_ozon_store_creation.orders
  ADD COLUMN IF NOT EXISTS user_id INTEGER NULL REFERENCES t_p37034511_ozon_store_creation.users(id);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON t_p37034511_ozon_store_creation.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON t_p37034511_ozon_store_creation.orders(email);
