import express from 'express'
const app =  express()
const port =  process.env.port
import dotenv from "dotenv";
import { startConsumer } from './consumer.js';
dotenv.config()

startConsumer()
// startPostConsumer()


app.get('/api/v1/testing', (req, res) => {
  res.send('👋  Hello Notification service!')
})

app.listen(port, () => {
  console.log(`✅  Notification service listening on port http://localhost:${port}`)
})