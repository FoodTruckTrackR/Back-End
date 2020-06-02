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


describe("operator register tests", () => {

    it("POST /operators/register incomplete request body", async () => {
        const data = {username: "operator4"}
        const res = await supertest(server).post("/operators/register").send(data)
        expect(res.statusCode).toBe(404)
    })

    it("POST /operators/register", async () => {
        const data = {username: "operator4", password: "hello"}
        const res = await supertest(server).post("/operators/register").send(data)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("operator4")
    })

    it("POST /operators/register username taken", async () => {
        const data = {username: "operator1", password: "hello"}
        const res = await supertest(server).post("/operators/register").send(data)
        expect(res.statusCode).toBe(409)
    })

})

describe("user login tests", () => {
    it("POST /operators/login invalid password", async () => {
        const data = {username: "operator4", password: "hell"}
        const res = await supertest(server).post("/operators/login").send(data)
        expect(res.statusCode).toBe(401)
    })

    it("POST /operators/login", async () => {
        const data = {username: "operator1", password: await bcrypt.hash("opassword1", 13)}
        const res = await supertest(server).post("/operators/login").send(data)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("operator1")
    })
})