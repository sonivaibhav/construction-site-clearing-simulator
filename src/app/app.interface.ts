export interface ConstructionSiteState {
  bulldozer: Bulldozer;
  error: string | null;
  fuelUsage: number;
  isProtectedTree: boolean;
  site: string[][];
  transactionalCost: number;
  vehicleHistory: VehicleHistory[];
}

export interface ValidateBulldozerPosition {
  valid: Boolean;
  bulldozer: Bulldozer;
  error: string | null;
  end: boolean;
  isProtectedTree: boolean;
}

export interface Bulldozer {
  xPos: number;
  yPos: number;
  facing: string;
  damage: number;
}

export interface VehicleHistory {
  bulldozer: Bulldozer,
  command: string
}

export interface VehicleDirection {
  [key: string]: {
    angle: number;
    scaleX: number;
    scaleY: number;
  }
}

export interface ExpenseReport {
  quantity: number;
  cost: number;
  item: string;
}

export interface TableCell {
  [key: string]: {
    fuelUsage: number;
    svg: string;
  }
}

export type FileContent = string | null | undefined | ArrayBuffer;

export interface ValidateSiteMap {
  isValid: boolean;
  errorMessage: string;
  siteData: string[][];
}

export const enum Direction {
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
  NORTH = 'NORTH'
}

export const enum SimulatorActions {
  CREATE_SITE = 'CREATE_SITE',
  UPDATE_SITE = 'UPDATE_SITE',
  UPDATE_FUEL_USAGE = 'UPDATE_FUEL_USAGE',
  UPDATE_VEHICLE_LOCATION = 'UPDATE_VEHICLE_LOCATION',
  UPDATE_PROTECTED_TREE_FOUND = 'UPDATE_PROTECTED_TREE_FOUND',
  ERROR = 'ERROR'
}
