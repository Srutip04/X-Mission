const request = require("supertest");
const app = require("../../app");
const {mongoConnect,mongoDisconnect} = require("../../services/mongo");
const { loadPlanetsData } = require("../../models/planets.model");


describe('Launches API',() =>{
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  })

  afterAll(async () => {
    await mongoDisconnect();
  })

  describe("Test GET /launches", () => {
    test("should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "uss enterprise",
      rocket: "falcon 9",
      target: "Kepler-62 f",
      launchDate: "Januray 1, 2028",
    };

    const launchDataWithoutDate = {
      mission: "uss enterprise",
      rocket: "falcon 9",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "uss enterprise",
      rocket: "falcon 9",
      target: "Kepler-62 f",
      launchDate: "Zotoo",
    };

    test("should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("it should catch missing reqd fields", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
    test("it should catch invalid date", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });

})

