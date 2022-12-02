import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000

const videos = [
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
        res.send(video)
    }else {
        res.send(404)
    }
})
app.get('/videos',(req: Request,res:Response) => {
    res.send(videos)
})

