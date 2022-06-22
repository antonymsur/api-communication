import { Express } from "express-serve-static-core";
import { createServer } from "../server";
import request from "supertest";
let server: Express;
beforeAll(async () => {
  try {
    server = await createServer();
    server.listen(5000, () => {
      console.log(`Listening on http://localhost:5000`);
    });
  } catch (error) {}
});

afterAll((done) => {
  done();
});

describe("GET /posts", () => {
  it("should return 200 & valid response if request param list is empty", (done) => {
    request(server)
      .get(`/posts`)
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

  it("should return 200 & valid response if name param is set", (done) => {
    request(server)
      .get(`/posts/1`)
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
