import { Hono } from "hono";
import { serve } from "@hono/node-server";

// ── Tipe data karakter (TypeScript yang sudah kamu kuasai!) ──────
type Character = {
  id: number;
  name: string;
  class: string;
  level: number;
};

// ── "Database" sementara (array di memori) ───────────────────────
let characters: Character[] = [
  { id: 1, name: "Aragorn", class: "Warrior", level: 42 },
  { id: 2, name: "Gandalf", class: "Mage", level: 99 },
];
// let nextId = 3  // counter untuk ID karakter baru

type inventory = {
  id: number;
  name: string;
  type: "Sword" | "Shield";
  damage?: number;
  defense?: number;
};

let inv: inventory[] = [
  { id: 1, name: "Excalibur", type: "Sword", damage: 150 },
  { id: 2, name: "Mithril Shield", type: "Shield", defense: 80 },
];

const app = new Hono();

// ── GET /characters — lihat semua karakter ───────────────────────
app.get("/characters", (c) => {
  return c.json(characters);
});

// ── GET /characters/:id — lihat satu karakter ────────────────────
app.get("/characters/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const character = characters.find((x) => x.id === id);

  if (!character) {
    return c.json({ error: "Karakter tidak ditemukan" }, 404);
  }

  return c.json(character);
});

// ── POST /characters — buat karakter baru ────────────────────────
app.post("/characters", async (c) => {
  const body = await c.req.json(); // baca data yang dikirim pemain

  const newCharacter: Character = {
    id: characters.length > 0 ? characters[characters.length - 1].id + 1 : 1, // ID otomatis
    name: body.name,
    class: body.class,
    level: 1, // semua karakter baru mulai dari level 1
  };

  characters.push(newCharacter);
  return c.json(newCharacter, 201); // 201 = "berhasil dibuat"
});

// ── PUT /characters/:id — update stats karakter ──────────────────
app.put("/characters/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const index = characters.findIndex((ch) => ch.id === id);

  if (index === -1) {
    return c.json({ error: "Karakter tidak ditemukan" }, 404);
  }

  // Spread operator: ambil data lama, timpa dengan data baru
  characters[index] = { ...characters[index], ...body, id };
  return c.json(characters[index]);
});

// ── DELETE /characters/:id — hapus karakter ──────────────────────
app.delete("/characters/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const index = characters.findIndex((ch) => ch.id === id);

  if (index === -1) {
    return c.json({ error: "Karakter tidak ditemukan" }, 404);
  }

  const deleted = characters[index];
  characters.splice(index, 1); // character splice untuk apa ?
  return c.json({ message: `${deleted.name} telah dikeluarkan dari guild` });
});

// latihan by claud >
app.get("/inventory", (c) => {
  return c.json(inv);
});

app.get("/inventory/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const cariId = inv.find((x) => x.id === id);

  if (!cariId) {
    return c.json({ error: "Item tidak ditemukan" }, 404);
  }
  return c.json(cariId);
});

app.post("/inventory", async (c) => {
  const body = await c.req.json();
  const newItem:inventory = {
	id: inv.length > 0 ? inv[inv.length -1].id +1 : 1,
	name: body.name,
	type: body.type,
	damage: body.damage,
	defense: body.defense
  }
  inv.push(newItem);
  return c.json({ message: "item baru berhasil ditambahkan", item: newItem }, 201);
});
// ── Nyalakan server ──────────────────────────────────────────────
serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`🏰 Server jalan di http://localhost:${info.port}`);
});
