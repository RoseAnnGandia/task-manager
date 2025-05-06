import app from "../../src/app";
import request from "supertest";
import mockData from "./auth.mock.json";

let token = "";
let refreshToken = "";

describe("POST /signup", () => {
  it("should sign up a user", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send(mockData.validUser);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("johndoe@gmail.com");
  });

  it("should return a 400 error for invalid email", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send(mockData.invalidEmail);

    expect(response.status).toBe(400);
  });

  it("should return a 409 error for existing email", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send(mockData.validUser);

    expect(response.status).toBe(409);
  });
});

describe("POST /signin", () => {
  it("should sign in a user", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: mockData.validUser.email,
      password: mockData.validUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();

    token = response.body.accessToken;
    refreshToken = response.body.refreshToken;
  });

  it("should return a 404 error for not registered email", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: mockData.notExistEmail,
      password: mockData.invalidPassword,
    });

    expect(response.status).toBe(404);
  });

  it("should return a 401 error for invalid password", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: mockData.validUser.email,
      password: mockData.invalidPassword,
    });

    expect(response.status).toBe(401);
  });
});
