import request from 'supertest'
import {app} from "../src";

describe('/video',() => {

    // beforeAll(async () => {
    //     await request(app)
    //         .delete('/videos/')
    // })

    it('Should return 200',async() =>{

        await request(app)
            .get('/videos')
            .expect(200)
    })

    it('Should return 404 for not existing video',async() =>{
        await request(app)
            .get('/videos/999999')
            .expect(404)
    })

    let newVideo: any = null;
    it('Create new Video', async() => {
        const createResponse = await request(app)
            .post('/videos')
            .send({
                title: 'Test',
                author: 'King'
            })
            .expect(201)

        newVideo = createResponse.body

        expect(newVideo).toEqual({
            id:expect.any(Number),
            title: 'Test',
            author: 'King'
        })

        await request(app)
            .get('/videos')
            .expect(200,[newVideo])

    })

    it(`Should'nt update with incorrect input data`, async() => {
        await request(app)
            .put('/videos/999999')
            .send({title: ''})
            .expect(404)
    } )

    it(`Should'nt update with incorrect input data`, async() => {
        await request(app)
            .put('/videos/1')
            .send({title: ''})
            .expect(400)
    } )

    it(`Should update with correct input data`, async() => {
        await request(app)
            .put('/videos/1')
            .send({title: 'Good'})
            .expect(204)

        await request(app)
            .get('/videos/1')
            .expect(404,{
                title: 'Good'
            })
    } )

})