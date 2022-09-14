import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";

beforeAll(async () => {
  await prisma.users.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.sessions.deleteMany({});
});
describe("Authentication", () => {
  it("Create a new user it should return 201", async () => {
    const body = {
      email: "dani1@gmail.com",
      password: "123456",
      name: "Daniel",
      ascCode: "SLZ5286953",
    };

    const result = await supertest(app).post("/signup").send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });
  it("given a valid token it should return 200", async () => {
    // await prisma.$executeRaw`TRUNCATE TABLE users; `;
    const body = {
      email: "dani1@gmail.com",
      password: "123456",
    };
    const result = await supertest(app).post("/signin").send(body);
    const status = result.status;
    expect(status).toEqual(200);
  });
  it("given an invalid token it should return 401", async () => {
    const body = {
      email: "dani@gmail.com",
      password: "21323434",
    };
    const result = await supertest(app).post("/signin").send(body);
    const status = result.status;
    expect(status).toEqual(404);
  });
});
