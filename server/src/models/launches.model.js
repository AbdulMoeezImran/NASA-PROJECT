import launchesDatabase from './launches.mongo.js';
import planets from './planets.mongo.js';

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ztm', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planet found');
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

export async function getAllLaunches() {
    return await launchesDatabase.find({}, {
        '_id': 0,
        '__v': 0
    })
}

export async function addNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        customers: ['ztm', 'NASA'],
        upcoming: true,
        success: true,
    })

    await saveLaunch(newLaunch);
}

export async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

export async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false,
    })

    return aborted.matchedCount === 1 && aborted.modifiedCount === 1;
} 