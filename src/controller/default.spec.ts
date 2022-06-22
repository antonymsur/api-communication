import { Express } from "express-serve-static-core";
import { createServer } from "../server";
import request from "supertest";

let server: Express;
beforeAll(async () => {
  try {
    server = await createServer();
    server.listen(4000, () => {
      console.log(`Listening on http://localhost:4000`);
    });
  } catch (error) {}
});

afterAll((done) => {
  done();
});

describe("GET /", () => {
  it("should return 200 & valid response if request param list is empty", (done) => {
    request(server)
      .get(`/`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ message: "hello world" });
        done();
      });
  });

  it("should return 200 & valid response if name param is set", (done) => {
    request(server)
      .get(`/hello/Test%20Name`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ message: "hello Test Name" });
        done();
      });
  });

  it("should return 404 & valid error response if name param is empty", (done) => {
    request(server)
      .get(`/hello/`)
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({ message: "not found" });
        done();
      });
  });
});
