const { expect, describe } = require("@jest/globals");
const { async } = require("q");
const request = require("supertest");
const app = require("../app");
const { mongoDB } = require("../model");
mongoDB.dropCollection;

beforeAll(async () => {
  await mongoDB.run().then(async () => {
    await mongoDB.dropCollection();
    await mongoDB.bulkInsert();
  });
});
afterAll(async () => {
  await mongoDB.closeDB();
});

describe("Create an array of likes for a person", () => {
  test("should create new record", (done) => {
    request(app)
      .post("/likes")
      .send({
        _id: 11,
        likes: [2, 4, 6, 8],
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.body).toMatchObject({ _id: 11 });
        done();
      });
  });
});

describe("Get likes of all person", () => {
  test("should get likes of all person", (done) => {
    request(app)
      .get("/likes")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.body).toHaveProperty("likes", expect.any(Array));
        expect(response.body.body.likes).toHaveLength(6);
        expect(response.body.body.likes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ _id: 1, likes: [2, 3, 4, 5] }),
            expect.objectContaining({ _id: 2, likes: [5, 7] }),
          ])
        );
        done();
      });
  });
});

describe("Get likes of a person", () => {
  test("should get likes of a person", (done) => {
    request(app)
      .get("/likes/1")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.body).toHaveProperty("likes", expect.any(Array));
        expect(response.body.body.likes).toHaveLength(1);
        expect(response.body.body.likes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ _id: 1, likes: [2, 3, 4, 5] }),
          ])
        );
        done();
      });
  });

  describe("Get matches of a person", () => {
    test("should get matches of a person", (done) => {
      request(app)
        .get("/matches/1")
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.body).toHaveProperty(
            "matches",
            expect.any(Array)
          );
          expect(response.body.body.matches).toHaveLength(2);
          expect(response.body.body.matches).toEqual([3, 4]);
          done();
        });
    });
  });
});

describe("Update likes of person", () => {
  test("Should update value of field likes", (done) => {
    request(app)
      .patch("/likes/4")
      .send({
        likes: [1, 2],
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.body).toHaveProperty("_id", expect.any(Number));
        expect(response.body.body).toMatchObject({ _id: 4 });
        expect(response.body.body).toHaveProperty("likes", expect.any(Array));
        done();
      });
  });
});

describe("Delete likes of person", () => {
  test("Should delete a record", (done) => {
    request(app)
      .delete("/likes/5")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.body).toHaveProperty("_id", expect.any(Number));
        expect(response.body.body).toMatchObject({ _id: 5 });
        done();
      });
  });
});
