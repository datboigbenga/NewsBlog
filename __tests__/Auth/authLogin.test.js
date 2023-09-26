const supertest = require("supertest");
const app = require("../../app");
const serve = supertest.agent(app)
const {StatusCodes} = require("http-status-codes")

const {connectDb, closeDb} = require("../../db/database")

const {userLoginData} = require("../../mockData");


beforeAll(async () => await connectDb());
afterAll(async () => await closeDb());
 


describe("AUTH", ()=>{
  describe("Login as user", ()=>{
    it("If details are correct and user exist, return success", async()=>{

        await serve.post("/api/v1/auth/login")
        .set("User-Agent", "test")
        .send({
            email: "eruolagbenga@lass.com",
            password: "secret",
          })
        .then((res) => {
        //   expect(res.body.msg).toEqual("Successfully created, please verify your email");
          expect(res.statusCode).toEqual(StatusCodes.OK);
        });
    })

    it("Show 400 Error, if psassword is not filled ", async()=>{
      await serve.post("/api/v1/auth/login")
      .send({email: "eruolagbenga@lass.com"})
      .then((res) => {
      //   expect(res.body.msg).toEqual("");
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      });
  })

  it("Show 400 Error, if username is not filled ", async()=>{
      await serve.post("/api/v1/auth/login")
      .send({password: "secret"})
      .then((res) => {
      //   expect(res.body.msg).toEqual("");
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      });
  })

  
  it("returrn error if user does not exist", async()=>{
    await serve.post("/api/v1/auth/login")
    .send({ email: 'invalid_user@email.com', password: '123' })
    .then((res) => {
    //   expect(res.body.msg).toEqual("");
      expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    });
  })

  it("returrn error if user does not exist", async()=>{
    await serve.post("/api/v1/auth/login")
    .send({ email: "eruolagbenga@lass.com", password: "123" })
    .then((res) => {
      expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    });
  })
  })
})