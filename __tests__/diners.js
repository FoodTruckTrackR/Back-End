const supertest = require("supertest")
const server = require("../index")
const db = require("../data/config")
const bcrypt = require("bcryptjs")

afterAll(async () => {
    await db.destroy()
    
})

beforeAll(async () => {
    await db.seed.run()
})
// beforeEach(async () => {
//     await db.seed.run()
// })


describe("diner register tests", () => {

    it("POST /diners/register incomplete request body", async () => {
        const data = {username: "diner4"}
        const res = await supertest(server).post("/diners/register").send(data)
        expect(res.statusCode).toBe(404)
    })

    it("POST /diners/register", async () => {
        const data = {username: "diner4", password: "hello"}
        const res = await supertest(server).post("/diners/register").send(data)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("diner4")
    })

    it("POST /diners/register username taken", async () => {
        const data = {username: "diner1", password: "hello"}
        const res = await supertest(server).post("/diners/register").send(data)
        expect(res.statusCode).toBe(409)
    })

})

describe("diner login tests", () => {
    it("POST /diners/login invalid password", async () => {
        const data = {username: "diner4", password: "hell"}
        const res = await supertest(server).post("/diners/login").send(data)
        expect(res.statusCode).toBe(401)
    })

    it("POST /diners/login", async () => {
        const data = {username: "diner1", password: await bcrypt.hash("dpassword1", 13)}
        const res = await supertest(server).post("/diners/login").send(data)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("diner1")
    })
})