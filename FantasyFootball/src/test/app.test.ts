const supertest = require('supertest')
const mongooseTEST = require('mongoose')
const app = require('../app')

// mongooseTEST.connect("mongodb://127.0.0.1:27017", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
// })

//const dbCON = mongooseTEST.connection

describe("Authentication:", () => {

    test("POST /users created a user" , async () => { 
        const res = await supertest(app)
            .post('/user')
            .send({
                name: 'Test Name',
                email: 'testemail@test.com', 
                password: 'TestPass'
            })

        expect(res.status).toBe(200)
    }) 

    afterAll(() => {
        dbCON.close();
    })
})