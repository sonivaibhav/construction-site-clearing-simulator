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

export const enum Direction {
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
  NORTH = 'NORTH'
}

export interface ExpenseReport {
  quantity: number;
  cost: number;
  item: string;
}
