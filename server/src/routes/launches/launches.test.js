import request from 'supertest';
import app from '../../app';

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('Test POST /launches', () => {

    const completeLaunchData = {
        mission: "ZTM115",
        rocket: "ZTM Experimental IS1",
        target: "kepler-186 f",
        launchDate: "January 24, 2030"
    }

    const LaunchDataWithoutDate = {
        mission: "ZTM115",
        rocket: "ZTM Experimental IS1",
        target: "kepler-186 f"
    }

    const LaunchDataWithInvalidDate = {
        mission: "ZTM115",
        rocket: "ZTM Experimental IS1",
        target: "kepler-186 f",
        launchDate: "zoot"
    }

    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(LaunchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(LaunchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing Required launch property'
        });
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(LaunchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
            
        expect(response.body).toStrictEqual({
            error: 'Invalid launch Date'
        });
    });
});