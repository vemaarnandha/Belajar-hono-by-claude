## Topik 1 — Apa itu Hono, dan kenapa dipakai? 🏰

Bayangkan kamu sedang membangun dunia MMORPG. Dungeon-mu punya satu **pintu gerbang utama** — setiap pemain (request) yang datang harus diarahkan ke tempat yang benar:

- Pemain minta `/characters` → diarahkan ke ruang **Character Creation**
- Pemain minta `/inventory` → diarahkan ke **Gudang Item**
- Pemain minta `/battle` → diarahkan ke **Arena**

**Hono** adalah si **NPC Resepsionis** di pintu gerbang itu. Dia yang mengatur semua lalu lintas. Express juga bisa jadi resepsionis — tapi dia resepsionis lama yang masih pakai buku besar dan pena. Hono adalah resepsionis modern: lebih cepat, native TypeScript, dan bisa kerja di mana saja.---

## 🎯 Latihan pertama

Setelah server berhasil jalan, tambahkan **satu route baru** di `src/index.ts`:

```
GET /status
```

Yang mengembalikan JSON seperti ini:
```json
{
  "server": "MMORPG World",
  "players_online": 0,
  "uptime": "just started"
}
```

Cukup tambahkan `app.get('/status', ...)` di bawah route `/characters` yang sudah ada. Kalau berhasil, buka `http://localhost:3000/status` di browser.

---

Kalau setup sudah jalan dan latihan selesai, kita lanjut ke **Topik 2: Routing lengkap** — GET, POST, PUT, DELETE untuk sistem karakter MMORPG. Mau lanjut sekarang atau ada yang ingin ditanyakan dulu?

<user submit full code>
```typescript
import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: '⚔️  Server MMORPG siap!',
    status: 'online'
  })
})

app.get('/characters', (c) => {
  return c.json({
    characters: [
      { id: 1, name: 'Aragorn', class: 'Warrior', level: 42 },
      { id: 2, name: 'Gandalf', class: 'Mage',    level: 99 },
    ]
  })
})

app.get("/status", (C)=>{
    return C.json({
        "server": "MMORPG world",
        "players_online": 0,
        "uptime": "just started"
    })
})

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`🏰 Server jalan di http://localhost:${info.port}`)
})
```

selesai. seperti ini bukan?

<response claude>
✅ **Benar banget!** Server-nya sudah punya 3 route dan semuanya jalan dengan benar.

Ada satu hal kecil yang perlu dicatat — bukan error, tapi soal **konvensi**:

```typescript
// Kamu tulis:
app.get("/status", (C) => {   // ← C kapital

// Konvensi umum di Hono:
app.get("/status", (c) => {   // ← c kecil
```

`C` kapital tetap jalan, TypeScript tidak protes. Tapi di seluruh dokumentasi Hono dan codebase perusahaan, huruf kecil `c` adalah standar. Lebih baik biasakan dari sekarang supaya kode kamu konsisten dengan tim nanti.

`c` itu singkatan dari **Context** — objek yang berisi semua informasi tentang request yang masuk dan alat untuk membuat response. Nanti kita akan pakai `c` lebih banyak lagi, misalnya:

```typescript
c.req.param('id')     // ambil parameter dari URL
c.req.json()          // baca body request
c.json({ ... })       // kirim response JSON
c.text('hello')       // kirim response teks
c.status(404)         // set status code
```

---

Kode kamu sudah solid. Mau lanjut ke **Topik 2: Routing lengkap** — GET, POST, PUT, DELETE untuk sistem karakter MMORPG?

<responku : Okay>
<!--  -->
<response : Claude>
