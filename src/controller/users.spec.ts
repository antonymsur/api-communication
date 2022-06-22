import { Express } from "express-serve-static-core";
import { createServer } from "../server";
import request from "supertest";
let server: Express;

beforeAll(async () => {
  try {
    server = await createServer();
    server.listen(6000, () => {
      console.log(`Listening on http://localhost:6000`);
    });
  } catch (error) {}
});

afterAll((done) => {
  done();
});

describe("GET /users", () => {
  it("should return 200", (done) => {
    request(server)
      .get(`/users`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let body = res.body;
        const apiResponse: object = JSON.parse(JSON.stringify(body));
        expect(apiResponse).toHaveProperty("message");
        done();
      });
  });

  it("should return 200", (done) => {
    request(server)
      .get(`/users/1`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let body = res.body;
        const apiResponse: object = JSON.parse(JSON.stringify(body));
        expect(apiResponse).toHaveProperty("message");
        done();
      });
  });
});
