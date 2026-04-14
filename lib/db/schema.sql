-- =========================================================
-- FULL IDPOTENT SUPERHERO STORE SETUP + SEEDING
-- Creates only what does not already exist
-- Seeds data without deleting existing tables
-- Adds superheroes_stats properly
-- =========================================================

-- =========================
-- ENUMS
-- =========================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'rarity_enum'
    ) THEN
        CREATE TYPE rarity_enum AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'ranking_enum'
    ) THEN
        CREATE TYPE ranking_enum AS ENUM ('S', 'A', 'B', 'C', 'D', 'E', 'F');
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'stat_name_enum'
    ) THEN
        CREATE TYPE stat_name_enum AS ENUM ('POWER', 'DURABILITY', 'SPECIAL');
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'superhero_stat_name_enum'
    ) THEN
        CREATE TYPE superhero_stat_name_enum AS ENUM (
            'STRENGTH',
            'SPEED',
            'INTELLIGENCE',
            'DURABILITY',
            'ENERGY',
            'COMBAT'
        );
    END IF;
END
$$;

-- =========================
-- USERS
-- =========================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address TEXT,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50),
    password TEXT NOT NULL
);

-- =========================
-- CATEGORIES
-- =========================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT,
    stock INT DEFAULT 0,
    image_url TEXT,
    rarity rarity_enum NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Many-to-many: products <-> categories
CREATE TABLE IF NOT EXISTS product_categories (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

-- =========================
-- PRODUCT STATS
-- =========================
CREATE TABLE IF NOT EXISTS product_stats (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    stat_name stat_name_enum NOT NULL,
    value INT CHECK (value BETWEEN 1 AND 10)
);

-- =========================
-- SUPERHEROES
-- =========================
CREATE TABLE IF NOT EXISTS superheroes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2),
    description TEXT,
    superpowers TEXT,
    stats JSONB,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ranking ranking_enum
);

-- =========================
-- SUPERHEROES STATS
-- =========================
CREATE TABLE IF NOT EXISTS superheroes_stats (
    id SERIAL PRIMARY KEY,
    hero_id INT NOT NULL REFERENCES superheroes(id) ON DELETE CASCADE,
    stat_name superhero_stat_name_enum NOT NULL,
    value INT NOT NULL CHECK (value BETWEEN 1 AND 100),
    UNIQUE (hero_id, stat_name)
);

CREATE INDEX IF NOT EXISTS idx_superheroes_stats_hero_id
    ON superheroes_stats(hero_id);

-- =========================
-- ORDERS
-- =========================
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products in orders
CREATE TABLE IF NOT EXISTS order_products (
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT DEFAULT 1,
    PRIMARY KEY (order_id, product_id)
);

-- Heroes in orders
CREATE TABLE IF NOT EXISTS order_heroes (
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    hero_id INT REFERENCES superheroes(id),
    PRIMARY KEY (order_id, hero_id)
);

-- =========================================================
-- SEED CATEGORIES
-- =========================================================
INSERT INTO categories (name)
VALUES
    ('Tool'),
    ('Weapon'),
    ('Vehicle'),
    ('Costume'),
    ('Misc')
ON CONFLICT (name) DO NOTHING;

-- =========================================================
-- SEED USERS
-- Replace passwords later with real bcrypt hashes if needed
-- =========================================================
INSERT INTO users (first_name, last_name, address, email, phone_number, password)
VALUES
    ('Tony', 'Stark', '10880 Malibu Point', 'tony@stark.com', '0700000001', '$2b$10$examplehashedpassword1'),
    ('Bruce', 'Wayne', '1007 Mountain Drive', 'bruce@wayne.com', '0700000002', '$2b$10$examplehashedpassword2'),
    ('Diana', 'Prince', 'Themyscira Embassy', 'diana@amazon.com', '0700000003', '$2b$10$examplehashedpassword3')
ON CONFLICT (email) DO NOTHING;

-- =========================================================
-- SEED PRODUCTS
-- Uses high ids to avoid clashing with older rows
-- =========================================================
INSERT INTO products (id, name, price, description, stock, image_url, rarity, created_at, updated_at)
VALUES
    (1001, 'Arc Reactor Core', 2499.00, 'High-output energy core for advanced suits.', 8, 'https://images.unsplash.com/photo-1518770660439-4636190af475', 'LEGENDARY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1002, 'Grapnel Launcher', 699.00, 'Compact traversal launcher with reinforced cable.', 20, 'https://images.unsplash.com/photo-1517048676732-d65bc937f952', 'EPIC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1003, 'Hoverbike X', 12999.00, 'Fast urban patrol vehicle for elite heroes.', 3, 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c', 'LEGENDARY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1004, 'Shadow Suit', 1899.00, 'Stealth-focused tactical suit.', 12, 'https://images.unsplash.com/photo-1523398002811-999ca8dec234', 'RARE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO UPDATE
SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    description = EXCLUDED.description,
    stock = EXCLUDED.stock,
    image_url = EXCLUDED.image_url,
    rarity = EXCLUDED.rarity,
    updated_at = CURRENT_TIMESTAMP;

-- =========================================================
-- SEED PRODUCT <-> CATEGORY LINKS
-- =========================================================
INSERT INTO product_categories (product_id, category_id)
SELECT 1001, id FROM categories WHERE name = 'Tool'
ON CONFLICT DO NOTHING;

INSERT INTO product_categories (product_id, category_id)
SELECT 1002, id FROM categories WHERE name = 'Weapon'
ON CONFLICT DO NOTHING;

INSERT INTO product_categories (product_id, category_id)
SELECT 1003, id FROM categories WHERE name = 'Vehicle'
ON CONFLICT DO NOTHING;

INSERT INTO product_categories (product_id, category_id)
SELECT 1004, id FROM categories WHERE name = 'Costume'
ON CONFLICT DO NOTHING;

-- =========================================================
-- SEED PRODUCT STATS
-- =========================================================
WITH seed_data (product_id, stat_name, value) AS (
    VALUES
        (1001, 'POWER'::stat_name_enum, 10),
        (1001, 'DURABILITY'::stat_name_enum, 9),
        (1001, 'SPECIAL'::stat_name_enum, 10),

        (1002, 'POWER'::stat_name_enum, 7),
        (1002, 'DURABILITY'::stat_name_enum, 6),
        (1002, 'SPECIAL'::stat_name_enum, 8),

        (1003, 'POWER'::stat_name_enum, 9),
        (1003, 'DURABILITY'::stat_name_enum, 8),
        (1003, 'SPECIAL'::stat_name_enum, 9),

        (1004, 'POWER'::stat_name_enum, 6),
        (1004, 'DURABILITY'::stat_name_enum, 7),
        (1004, 'SPECIAL'::stat_name_enum, 8)
)
INSERT INTO product_stats (product_id, stat_name, value)
SELECT s.product_id, s.stat_name, s.value
FROM seed_data s
WHERE NOT EXISTS (
    SELECT 1
    FROM product_stats ps
    WHERE ps.product_id = s.product_id
      AND ps.stat_name = s.stat_name
);

-- =========================================================
-- SEED SUPERHEROES
-- Keeps old JSONB stats column too
-- =========================================================
INSERT INTO superheroes (
    id,
    name,
    price,
    description,
    superpowers,
    stats,
    image_url,
    is_available,
    joined_at,
    ranking
)
VALUES
    (
        2001,
        'Captain Nova',
        25000.00,
        'Flight-capable energy hero and natural team leader.',
        'Flight, energy projection, force shields',
        '{"strength": 88, "speed": 91, "intelligence": 84, "durability": 90, "energy": 97, "combat": 79}'::jsonb,
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        TRUE,
        CURRENT_TIMESTAMP,
        'S'
    ),
    (
        2002,
        'Shadow Lynx',
        18000.00,
        'Elite stealth operative built for infiltration and silent takedowns.',
        'Stealth, enhanced reflexes, night vision',
        '{"strength": 63, "speed": 94, "intelligence": 81, "durability": 68, "energy": 40, "combat": 92}'::jsonb,
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
        TRUE,
        CURRENT_TIMESTAMP,
        'A'
    ),
    (
        2003,
        'Titan Forge',
        22000.00,
        'Heavy-impact powerhouse with metal skin and seismic punches.',
        'Super strength, seismic shockwaves, metal skin',
        '{"strength": 98, "speed": 52, "intelligence": 67, "durability": 96, "energy": 58, "combat": 81}'::jsonb,
        'https://images.unsplash.com/photo-1504593811423-6dd665756598',
        TRUE,
        CURRENT_TIMESTAMP,
        'S'
    ),
    (
        2004,
        'Mindflare',
        23000.00,
        'Psychic strategist who controls the battlefield with telepathy and illusions.',
        'Telepathy, illusion casting, psionic blast',
        '{"strength": 42, "speed": 70, "intelligence": 98, "durability": 60, "energy": 94, "combat": 73}'::jsonb,
        'https://images.unsplash.com/photo-1507591064344-4c6ce005b128',
        TRUE,
        CURRENT_TIMESTAMP,
        'A'
    )
ON CONFLICT (id) DO UPDATE
SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    description = EXCLUDED.description,
    superpowers = EXCLUDED.superpowers,
    stats = EXCLUDED.stats,
    image_url = EXCLUDED.image_url,
    is_available = EXCLUDED.is_available,
    joined_at = EXCLUDED.joined_at,
    ranking = EXCLUDED.ranking;

-- =========================================================
-- SEED SUPERHEROES_STATS
-- =========================================================
INSERT INTO superheroes_stats (hero_id, stat_name, value)
VALUES
    (2001, 'STRENGTH', 88),
    (2001, 'SPEED', 91),
    (2001, 'INTELLIGENCE', 84),
    (2001, 'DURABILITY', 90),
    (2001, 'ENERGY', 97),
    (2001, 'COMBAT', 79),

    (2002, 'STRENGTH', 63),
    (2002, 'SPEED', 94),
    (2002, 'INTELLIGENCE', 81),
    (2002, 'DURABILITY', 68),
    (2002, 'ENERGY', 40),
    (2002, 'COMBAT', 92),

    (2003, 'STRENGTH', 98),
    (2003, 'SPEED', 52),
    (2003, 'INTELLIGENCE', 67),
    (2003, 'DURABILITY', 96),
    (2003, 'ENERGY', 58),
    (2003, 'COMBAT', 81),

    (2004, 'STRENGTH', 42),
    (2004, 'SPEED', 70),
    (2004, 'INTELLIGENCE', 98),
    (2004, 'DURABILITY', 60),
    (2004, 'ENERGY', 94),
    (2004, 'COMBAT', 73)
ON CONFLICT (hero_id, stat_name) DO UPDATE
SET value = EXCLUDED.value;

-- =========================================================
-- SEED ORDERS
-- =========================================================
INSERT INTO orders (id, user_id, created_at)
VALUES
    (
        3001,
        (SELECT id FROM users WHERE email = 'tony@stark.com'),
        CURRENT_TIMESTAMP - INTERVAL '7 days'
    ),
    (
        3002,
        (SELECT id FROM users WHERE email = 'bruce@wayne.com'),
        CURRENT_TIMESTAMP - INTERVAL '3 days'
    ),
    (
        3003,
        (SELECT id FROM users WHERE email = 'diana@amazon.com'),
        CURRENT_TIMESTAMP - INTERVAL '1 day'
    )
ON CONFLICT (id) DO NOTHING;

-- =========================================================
-- SEED ORDER_PRODUCTS
-- =========================================================
INSERT INTO order_products (order_id, product_id, quantity)
VALUES
    (3001, 1001, 1),
    (3001, 1004, 1),
    (3002, 1002, 2),
    (3003, 1003, 1)
ON CONFLICT DO NOTHING;

-- =========================================================
-- SEED ORDER_HEROES
-- =========================================================
INSERT INTO order_heroes (order_id, hero_id)
VALUES
    (3001, 2001),
    (3002, 2002),
    (3003, 2004)
ON CONFLICT DO NOTHING;

-- =========================================================
-- FIX SEQUENCES AFTER MANUAL IDS
-- =========================================================
SELECT setval(
    pg_get_serial_sequence('products', 'id'),
    GREATEST(COALESCE((SELECT MAX(id) FROM products), 1), 1004),
    true
);

SELECT setval(
    pg_get_serial_sequence('superheroes', 'id'),
    GREATEST(COALESCE((SELECT MAX(id) FROM superheroes), 1), 2004),
    true
);

SELECT setval(
    pg_get_serial_sequence('orders', 'id'),
    GREATEST(COALESCE((SELECT MAX(id) FROM orders), 1), 3003),
    true
);

SELECT setval(
    pg_get_serial_sequence('superheroes_stats', 'id'),
    COALESCE((SELECT MAX(id) FROM superheroes_stats), 1),
    true
);