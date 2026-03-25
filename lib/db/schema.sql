-- =========================
-- ENUMS
-- =========================
CREATE TYPE rarity_enum AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');
CREATE TYPE ranking_enum AS ENUM ('S', 'A', 'B', 'C', 'D', 'E', 'F');
CREATE TYPE stat_name_enum AS ENUM ('POWER', 'DURABILITY', 'SPECIAL');

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
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
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO categories (name) VALUES
('Tool'), ('Weapon'), ('Vehicle'), ('Costume'), ('Misc');

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
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
CREATE TABLE product_categories (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

-- =========================
-- PRODUCT STATS
-- =========================
CREATE TABLE product_stats (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    stat_name stat_name_enum NOT NULL,
    value INT CHECK (value BETWEEN 1 AND 10)
);

-- =========================
-- SUPERHEROES
-- =========================
CREATE TABLE superheroes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2),
    description TEXT,
    superpowers TEXT,
    stats JSONB, -- flexible stats
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ranking ranking_enum
);

-- =========================
-- ORDERS (better structure)
-- =========================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products in orders
CREATE TABLE order_products (
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT DEFAULT 1,
    PRIMARY KEY (order_id, product_id)
);

-- Heroes in orders
CREATE TABLE order_heroes (
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    hero_id INT REFERENCES superheroes(id),
    PRIMARY KEY (order_id, hero_id)
);