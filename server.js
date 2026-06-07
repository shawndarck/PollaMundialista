const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
let pg = null;

try {
  pg = require("pg");
} catch {
  pg = null;
}

const PORT = Number(process.env.PORT || 5174);
const ROOT = __dirname;
const WORLD_CUP_API = "https://worldcup26.ir/get/games";
const STATE_FILE = path.join(ROOT, ".polla-state.json");
const DATABASE_URL = process.env.DATABASE_URL;
const pool = DATABASE_URL && pg ? new pg.Pool({ connectionString: DATABASE_URL, ssl: DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false } }) : null;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Access-Control-Allow-Origin": "*",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 5_000_000) {
        reject(new Error("Payload demasiado grande"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function ensureDatabase() {
  if (!pool) return;
  await pool.query(`
    create table if not exists app_state (
      id text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )
  `);
}

async function getState() {
  if (pool) {
    await ensureDatabase();
    const result = await pool.query("select data from app_state where id = $1", ["main"]);
    return result.rows[0]?.data || null;
  }

  if (!fs.existsSync(STATE_FILE)) return null;
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

async function saveState(state) {
  if (pool) {
    await ensureDatabase();
    await pool.query(
      `
        insert into app_state (id, data, updated_at)
        values ($1, $2::jsonb, now())
        on conflict (id)
        do update set data = excluded.data, updated_at = now()
      `,
      ["main", JSON.stringify(state)],
    );
    return;
  }

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function handleState(req, res) {
  try {
    if (req.method === "GET") {
      send(res, 200, JSON.stringify({ state: await getState(), storage: pool ? "postgres" : "file" }), "application/json; charset=utf-8");
      return;
    }

    if (req.method === "POST") {
      const body = JSON.parse(await readBody(req));
      await saveState(body.state);
      send(res, 200, JSON.stringify({ ok: true, storage: pool ? "postgres" : "file" }), "application/json; charset=utf-8");
      return;
    }

    send(res, 405, JSON.stringify({ error: "Method not allowed" }), "application/json; charset=utf-8");
  } catch (error) {
    send(res, 500, JSON.stringify({ error: error.message }), "application/json; charset=utf-8");
  }
}

function fetchWorldCupResults(res) {
  https
    .get(WORLD_CUP_API, (apiRes) => {
      let body = "";
      apiRes.on("data", (chunk) => {
        body += chunk;
      });
      apiRes.on("end", () => {
        send(res, apiRes.statusCode || 200, body, "application/json; charset=utf-8");
      });
    })
    .on("error", (error) => {
      send(res, 502, JSON.stringify({ error: error.message }), "application/json; charset=utf-8");
    });
}

function serveStatic(req, res) {
  const requestPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const safePath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }

    send(res, 200, data, types[path.extname(filePath)] || "application/octet-stream");
  });
}

http
  .createServer((req, res) => {
    if (req.url.startsWith("/api/state")) {
      handleState(req, res);
      return;
    }

    if (req.url.startsWith("/api/worldcup-results")) {
      fetchWorldCupResults(res);
      return;
    }

    serveStatic(req, res);
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`Polla Mundialista disponible en http://127.0.0.1:${PORT}/`);
  });
