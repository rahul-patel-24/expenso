import pool from "../db/pool.js";

export const getCategories = async (req, res) => {
  const search = req.query.search || "";
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE name ILIKE $1 ORDER BY id DESC",
    [`%${search}%`]
  );
  res.json(rows);
};

export const createCategory = async (req, res) => {
  const { name, icon } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO categories (name, icon) VALUES ($1, $2) RETURNING *",
    [name, icon]
  );
  res.status(201).json(rows[0]);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  const { rows } = await pool.query(
    "UPDATE categories SET name=$1, icon=$2 WHERE id=$3 RETURNING *",
    [name, icon, id]
  );
  res.json(rows[0]);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  res.sendStatus(204);
};