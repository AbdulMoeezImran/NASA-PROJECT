const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'kepler-442 b',
    customers: ['ztm', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

export function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}

export function getAllLaunches() {
    return Array.from(launches.values())
}

export function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            flightNumber: latestFlightNumber,
            customers: ['ztm', 'NASA'],
            upcoming: true,
            success: true,
        })
    );
}

export function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}