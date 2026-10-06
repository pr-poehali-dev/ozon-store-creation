CREATE TABLE IF NOT EXISTS t_p37034511_ozon_store_creation.sessions (
  token_hash VARCHAR(64) PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON t_p37034511_ozon_store_creation.sessions (user_id);

CREATE TABLE IF NOT EXISTS t_p37034511_ozon_store_creation.products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO t_p37034511_ozon_store_creation.products (id, name, price) VALUES
  (8, 'Настенный светильник "Ворон крепление слева"', 850),
  (1, 'Настенный светильник "Ворон крепление справа"', 850),
  (2, 'Настольный светильник "Ворон белый"', 900),
  (7, 'Настенный светильник "Сова на ветке"', 1000),
  (6, 'Настенный светильник "Сова с шаром"', 1100),
  (5, 'Настенный светильник "Луна"', 1300),
  (4, 'Настенный светильник "Голова ворона"', 450),
  (3, 'Настольный светильник "Ворон"', 900),
  (9, 'Настольный светильник "Ворон черный"', 900),
  (10, 'Фигурка в холодильник "Мышь повесилась"', 260),
  (11, 'Подсвечник "Монах"', 300),
  (12, 'Крючок самозажимной', 85),
  (13, 'Ключница "Рука левая черная"', 370),
  (14, 'Ключница "Рука правая черная"', 370),
  (15, 'Ключница "Рука левая белая"', 370),
  (16, 'Ключница "Рука правая белая"', 370),
  (17, 'Подставка под Яндекс-станцию', 450)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price;
