"use strict";

const crypto = require("crypto");
const express = require("express");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "todos.json");
const PORT = Number(process.env.PORT) || 3000;
const MAX_TEXT_LEN = 500;

function ensureDataFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ todos: [] }, null, 2),
      "utf8",
    );
  }
}

/** @param {unknown} t */
function validTodo(t) {
  return (
    t != null &&
    typeof t === "object" &&
    typeof t.id === "string" &&
    typeof t.text === "string" &&
    typeof t.done === "boolean"
  );
}

function readStore() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  try {
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.todos)) return { todos: [] };
    return { todos: data.todos.filter(validTodo) };
  } catch {
    return { todos: [] };
  }
}

/** @param {{ todos: unknown[] }} store */
function writeStore(store) {
  ensureDataFile();
  const tmp = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2), "utf8");
  fs.renameSync(tmp, DATA_FILE);
}

const app = express();
app.use(express.json({ limit: "32kb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/todos", (_req, res) => {
  const store = readStore();
  res.json({ todos: store.todos });
});

app.post("/api/todos", (req, res) => {
  let text =
    req.body && req.body.text != null ? String(req.body.text).trim() : "";
  if (!text) {
    res.status(400).json({ error: "text required" });
    return;
  }
  if (text.length > MAX_TEXT_LEN) text = text.slice(0, MAX_TEXT_LEN);
  const store = readStore();
  const todo = { id: crypto.randomUUID(), text, done: false };
  store.todos.push(todo);
  writeStore(store);
  res.status(201).json({ todo });
});

app.patch("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const store = readStore();
  const idx = store.todos.findIndex((t) => t.id === id);
  if (idx === -1) {
    res.status(404).json({ error: "not found" });
    return;
  }
  const body = req.body || {};
  if (body.text != null) {
    let t = String(body.text).trim();
    if (!t) {
      res.status(400).json({ error: "text must not be empty" });
      return;
    }
    if (t.length > MAX_TEXT_LEN) t = t.slice(0, MAX_TEXT_LEN);
    store.todos[idx].text = t;
  }
  if (body.done != null) {
    if (typeof body.done !== "boolean") {
      res.status(400).json({ error: "done must be boolean" });
      return;
    }
    store.todos[idx].done = body.done;
  }
  writeStore(store);
  res.json({ todo: store.todos[idx] });
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const store = readStore();
  const before = store.todos.length;
  store.todos = store.todos.filter((t) => t.id !== id);
  if (store.todos.length === before) {
    res.status(404).json({ error: "not found" });
    return;
  }
  writeStore(store);
  res.status(204).end();
});

ensureDataFile();
app.listen(PORT, () => {
  console.error(`Todo app: http://localhost:${PORT}`);
});
