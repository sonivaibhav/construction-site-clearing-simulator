import {Bulldozer} from '../app.interface';

export const enum SimulatorActions {
  CREATE_SITE = 'CREATE_SITE',
  UPDATE_SITE = 'UPDATE_SITE',
  UPDATE_FUEL_USAGE = 'UPDATE_FUEL_USAGE',
  UPDATE_VEHICLE_LOCATION = 'UPDATE_VEHICLE_LOCATION',
  UPDATE_PROTECTED_TREE_FOUND = 'UPDATE_PROTECTED_TREE_FOUND',
  ERROR = 'ERROR'
}

// Create sire simulator
export const createSiteSimulator = (data: string[][]) => (
  {type: SimulatorActions.CREATE_SITE, payload: data}
);

// Update site simulator
export const updateSiteSimulator = (site: string[][]) => (
  {type: SimulatorActions.UPDATE_SITE, payload: site}
);

// Update vehicle location
export const updateVehicleLocation = (bulldozer: Bulldozer, command: string) => (
  {type: SimulatorActions.UPDATE_VEHICLE_LOCATION, payload: {bulldozer, command}}
);

// protected tree present on cell
export const protectedTreeFound = (isProtectedTree: boolean) => (
  {type: SimulatorActions.UPDATE_PROTECTED_TREE_FOUND, payload: isProtectedTree}
);

// simulation errors
export const vehicleError = (error: string | null) => (
  {type: SimulatorActions.ERROR, payload: error}
);

// fuel consumptions
export const updateFuelUsage = (fuel: number) => (
  {type: SimulatorActions.UPDATE_FUEL_USAGE, payload: fuel}
)
