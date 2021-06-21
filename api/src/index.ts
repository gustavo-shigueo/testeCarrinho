import express, { Application } from 'express'
import routes from './routes'
import cors from 'cors'

const app: Application = express()
app.use(express.json())
app.use(cors())
routes(app)

app.listen(3001, () => console.log('API iniciada'))
