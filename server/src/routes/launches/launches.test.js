const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "uss enterprise",
    rocket: "falcon 9",
    target: "Kepler-186 f",
    launchDate: "Januray 1, 2028",
  };

  const launchDataWithoutDate = {
    mission: "uss enterprise",
    rocket: "falcon 9",
    target: "Kepler-186 f",
  };

  const launchDataWithInvalidDate = {
    mission: "uss enterprise",
    rocket: "falcon 9",
    target: "Kepler-186 f",
    launchDate: "Zotoo",
  };
 
  test("should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
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
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  test("it should catch invalid date",async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
