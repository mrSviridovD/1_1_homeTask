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
        title: "Тачки",
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
const arrayType: Array<string> = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

let errorsArray: Array<object> = [];
let errors = { errorsMessages: errorsArray};

const errTitle = {message: "Incorrect values", field : "title"};
const errAuthor = {message: "Incorrect values", field : "author"};
const errCanBeDownloaded = {message: "Incorrect values", field : "canBeDownloaded"};
const errResolutions = {message: "Incorrect values", field : "availableResolutions"};
const errMinAgeRestriction = {message: "Incorrect values", field : "minAgeRestriction"};
const errPublicationDate = {message: "Incorrect values", field : "publicationDate"};

app.get('/', (req: Request, res: Response) => {
    let helloMes = 'Hello World!';
    res.send(helloMes)
})
app.get('/videos/:id',(req:Request, res:Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if (!video) {
        res.sendStatus(404)
        return;
    }

    res.json(video)
})

app.get('/videos',(req: Request,res:Response) => {
    res.send(videos)
})

app.delete('/videos/:id',(req:Request,res:Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if (!video) {
        res.sendStatus(404)
        return;
    }
    videos = videos.filter(v => v.id !== +req.params.id)

    res.sendStatus(204)

})
app.post('/videos',(req:Request,res:Response) => {

    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    let keyErr = 0;

    availableResolutions.forEach((a: string) => {
        if (!arrayType.includes(a)) {
            keyErr++;
        }
    })
    errorsArray = [];
    if (!title || !title.trim() || typeof title !== "string" || title.length > 40) {
        errorsArray.push(errTitle);
    }

    if (!author || !author.trim() || typeof author !== "string" || author.length > 20) {
        errorsArray.push(errAuthor);
    }

    if (keyErr > 0) {
        errorsArray.push(errResolutions);
    }


    if (errorsArray.length > 0) {
        errors = { errorsMessages: errorsArray};
        res
            .status(400)
            .json(errors)
        return;
    }

    const newVideo = {
            id: +(createdAt),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded || false,
            minAgeRestriction: req.body.minAgeRestriction || null,
            createdAt: createdAt2,
            publicationDate: nextDate.toISOString(),
            availableResolutions: req.body.availableResolutions
        }

    videos.push(newVideo)
    res.status(201).send(newVideo)
})
app.delete('/testing/all-data',(req:Request,res:Response) => {
    videos = []
    res.sendStatus(204)

})
app.put('/videos/:id',(req:Request, res:Response) => {
    errorsArray = [];
    let video = videos.find(v => v.id === +req.params.id)
    if (!video) {
        res.sendStatus(404)
        return;
    }
    const title = req.body.title;
    const author = req.body.author;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const publicationDate = req.body.publicationDate;

    if (!title) {
        errorsArray.push(errTitle);
        return;
    }

    if (!author) {
        errorsArray.push(author);
        return;
    }

    if (!title || !title.trim() || typeof title !== "string" || title.length > 40) {
        errorsArray.push(errTitle);
    }

    if (!author || !author.trim() || typeof author !== "string" || author.length > 20) {
        errorsArray.push(errAuthor);
    }

    if (typeof canBeDownloaded != "boolean") {
        errorsArray.push(errCanBeDownloaded);
    }

    if (typeof minAgeRestriction != "number" || minAgeRestriction < 1 || minAgeRestriction > 18) {
        errorsArray.push(errMinAgeRestriction);
    }

    if (typeof publicationDate != "string") {
        errorsArray.push(errPublicationDate);
    }

    if (errorsArray.length > 0) {
        errors = { errorsMessages: errorsArray};
        res
            .status(400)
            .json(errors)
        return;
    }
        video.title = req.body.title
        video.author = req.body.author
        video.availableResolutions = req.body.availableResolutions
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = createdAt2
        res.status(204)
    return;
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

