CREATE TABLE users(
  id TEXT NOT NULL PRIMARY KEY,
  email TEXT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  phone BIGINT
);