const supertest = require("supertest");
const app = require("../../app");
const serve = supertest.agent(app)
const {StatusCodes} = require("http-status-codes")

const {connectDb, closeDb} = require("../../db/database")




beforeAll(async () => await connectDb());
afterAll(async () => await closeDb());
 
const heyo = (a, b)=>{
    return `your  name is ${a} and age is ${b}`
}

// describe("hey my first test", ()=>{
//     test("first test", ()=>{
//         let a = 1;
//         let b = 2;
//         (a+b);
//         expect(a+b).toBe(3);
//     })

//     test("first test", ()=>{
//         let a = 1;
//         let b = 2;
//         // (a+b);
//         expect(a+b).not.toBe(5);
// expect(a+b).toBeGreaterThan(2);
//         expect(a+b).toBeGreaterThanOrEqual(2);
//         expect(a+b).toBeLessThanOrEqual(10);
//         expect(a+b).toBeLessThanOrEqual(10);
//         expect(a+b).toBeTruthy();
//     })
// })
const user = {
    firstname: "gbenga",
    lastname:"eruola",
    username:"ashley199",
    email:"ashleybaker10032@gmail.com",
    password:"secret"
}
describe("AUTH", ()=>{
    it("Register a user", async()=>{

        await serve.post("/api/v1/auth/register")
        .send(user)
        .then((res) => {
          expect(res.body.msg).toEqual("Successfully created, please verify your email");
          expect(res.statusCode).toEqual(StatusCodes.CREATED);
        });
    })

    it("Show User Already Exists", async()=>{
        await serve.post("/api/v1/auth/register")
        .send(user)
        .then((res) => {
          expect(res.body.msg).toEqual("Email already exist");
          expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        });
    })

    it("send Error if fields are not completely filled", async()=>{
        await serve.post("/api/v1/auth/register")
        .send({
            firstname: "gbenga",
            username:"ashley1990",
            email:"ashleybaker1002@gmail.com",
            password:"secret"
        })
        .then((res) => {
        //   expect(res.body.msg).toEqual(200);
          expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        });
    })


})