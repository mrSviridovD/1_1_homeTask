import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {videosRouter} from "./routes/videos-router";

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware =bodyParser({})
app.use(parserMiddleware)
app.use('/videos', videosRouter)

app.get('/', (req: Request, res: Response) => {
    let helloMes = 'Hello World!';
    res.send(helloMes)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

