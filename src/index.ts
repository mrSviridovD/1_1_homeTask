import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware =bodyParser({})
app.use(parserMiddleware)

let createdAt = new Date();
let createdAt2 = createdAt.toISOString()
let nextDay = 60 * 60 * 24 * 1000;
let nextDate = new Date(createdAt.getTime() + nextDay)


let videos = [
    {
        id: 1,
        title: "Звёздные войны: Эпизод 1 – Скрытая угроза",
        author: "Джордж Лукас",
        canBeDownloaded: true,
        minAgeRestriction: 16,
        createdAt: "1991-05-19",
        publicationDate: "2022-12-02T16:09:48.979Z",
        availableResolutions: [
        "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"
        ]
    },
    {
        id: 2,
        title: "Звёздные войны: Эпизод 1 – Скрытая угроза",
        author: "Джон Лассетер",
        canBeDownloaded: true,
        minAgeRestriction: 3,
        createdAt: "2005-08-16",
        publicationDate: "2022-12-02T11:09:48.979Z",
        availableResolutions: [
            "P360", "P480", "P720", "P1080"
        ]
    },

]



app.get('/', (req: Request, res: Response) => {
    let helloMes = 'Hello World!';
    res.send(helloMes)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/videos/:id',(req:Request, res:Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if(video){
        res.status(200).send(video)
    }else {
        res.sendStatus(404)
    }
})
app.get('/videos',(req: Request,res:Response) => {
    res.send(videos)
})
app.delete('/videos/:id',(req:Request,res:Response) => {
    for (let i = 0; i < videos.length; i++) {
        if(videos[i].id === +req.params.id){
            videos.splice(i,1);
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)

})
app.post('/videos',(req:Request,res:Response) => {

    if (!req.body.title){
        let errorList = [{errorsMessages:[{massage: 'title не заполнен', field:'title'}] }]
        res.status(400).send(errorList.pop())
        return;
    }
    if (!req.body.author){
        let errorList = [{errorsMessages:[{massage: 'author не заполнен', field:'author'}] }]
        res.status(400).send(errorList.pop())
        return;
    }
    if (req.body.title.length > 40 ){
        let errorList = [{errorsMessages:[{massage: 'Длина title больше 40 символов', field:'title'}] }]
        res.status(400).send(errorList.pop())
        return
    }
    if (req.body.author.length > 40 ){
        let errorList = [{errorsMessages:[{massage: 'Длина author больше 40 символов', field:'author'}] }]
        res.status(400).send(errorList.pop())
        return
    }
    const newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded || false,
            minAgeRestriction: req.body.minAgeRestriction || null,
            createdAt: createdAt2,
            publicationDate: nextDate.toISOString(),
            availableResolutions: req.body.availableResolutions || ['P144']
        }

    videos.push(newVideo)
    res.status(201).send(newVideo)
})


app.put('/videos/:id',(req:Request, res:Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if(video){
        video.title = req.body.title
        res.status(201)
    }else {
        res.status(404)
    }
})

