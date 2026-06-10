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

app.get("/status", (c)=>{
    return c.json({
        "server": "MMORPG world",
        "players_online": 0,
        "uptime": "just started"
    })
})

serve({
  fetch: app.fetch,
  port: 2999,

  
}, (info) => {
  console.log(`🏰 Server jalan di http://localhost:${info.port}`)
})