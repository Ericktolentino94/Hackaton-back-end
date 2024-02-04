DROP DATABASE IF EXISTS maps_dev;
CREATE DATABASE maps_dev;

\c maps_dev;

CREATE TABLE users (
 user_id SERIAL PRIMARY KEY,
 displayname TEXT DEFAULT "name",
 email TEXT DEFAULT "email"
);

CREATE TABLE placess (
    place_id SERIAL PRIMARY KEY,
    name TEXT DEFAULT "name",
    vicinity TEXT DEFAULT "address",
    rating NUMBER DEFAULT 0,
    opening_hours BOOLEAN DEFAULT false,
    icon TEXT DEFAULT 'icon',
    user_id INTEGER REFERENCES users (user_id)
    ON DELETE CASCADE
);