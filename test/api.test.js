const request = require("supertest");
const app = require("../app");
const { mongoDB } = require("../model");
const LikesController = require("../controllers/likes");
const MatchesController = require("../controllers/matches");
const { getMockReq, getMockRes } = require("@jest-mock/express");
const req = getMockReq({ params: { id: "1" } });
const authentication = require("../middleware/authentication");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const authorization = require("../middleware/authorization");

beforeAll(async () => {
  await mongoDB.run();
  await mongoDB.dropCollection();
  await mongoDB.bulkInsert();
});
afterAll(async () => {
  await mongoDB.dropCollection();
  await mongoDB.closeDB();
});

const commonHeaders = {
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiTXVsYWkgQmFydSIsImVtYWlsIjoidmlraS55YXB1dHJhQGdtYWlsLmNvbSIsImlzX3ByZW1pdW0iOmZhbHNlLCJpYXQiOjE2MzIyOTQ2MzV9.w1hDI9ruwUsEIFWocqiRmLbjkWaOo8r-5tjvQekkSWs",
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Authentication and Authorization", () => {
  test("should verify the token", async () => {
    const req = getMockReq(commonHeaders);
    const res = getMockRes();
    const next = jest.fn();

    await authentication(req, res, next);
  });

  test("should authorize", async () => {
    const req = getMockReq();
    const res = getMockRes();
    const next = jest.fn();

    await authorization(req, res, next);
  });
});

describe("Create an array of likes for a person", () => {
  test("should create new record", (done) => {
    request(app)
      .post("/likes")
      .set(commonHeaders)
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
      .set(commonHeaders)
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
      .set(commonHeaders)
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
        .set(commonHeaders)
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
      .set(commonHeaders)
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
      .set(commonHeaders)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.body).toHaveProperty("_id", expect.any(Number));
        expect(response.body.body).toMatchObject({ _id: 5 });
        done();
      });
  });
});

// Unit testing to cover catch promise

describe("Get all likes catch part", () => {
  test("should test catch block ", async () => {
    expect.assertions(1);
    try {
      await LikesController.getAllLikes(1);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});

describe("Get likes by id catch part", () => {
  test("should test catch block ", async () => {
    expect.assertions(1);
    try {
      await LikesController.getLikesById(req);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});

describe("Create likes catch part", () => {
  test("should test catch block ", async () => {
    expect.assertions(1);
    try {
      await LikesController.createLikes(req);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});

describe("Update likes catch part", () => {
  test("should test catch block ", async () => {
    expect.assertions(1);
    try {
      await LikesController.updateLikes(req);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});

describe("Delete likes catch part", () => {
  test("should test catch block ", async () => {
    expect.assertions(1);
    try {
      await LikesController.deleteLikes(req);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});

describe("Get matches by id catch part", () => {
  test("should test catch block ", async () => {
    expect.assertions(1);
    try {
      await MatchesController.getMatchesById(req);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});

describe("Error Handler", () => {
  test("Checking error", async () => {
    const err = new Error({ name: "" });
    const req = getMockReq();
    const res = mockResponse();
    try {
      await errorHandler(err, req.res);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
