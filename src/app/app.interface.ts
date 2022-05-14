export interface ConstructionSiteState {
  bulldozer: Bulldozer;
  error: string | null;
  fuelUsage: number;
  isProtectedTree: boolean;
  site: string[][];
  transactionalCost: number;
  vehicleHistory: VehicleHistory[];
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
