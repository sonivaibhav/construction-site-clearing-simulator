import {ConstructionSiteState} from '../app.interface';

export const tableCells: {
  [key: string]: {
    fuelUsage: number;
    svg: string;
  }
} = {
  o: {
    fuelUsage: 1,
    svg: 'plain-land.svg'
  },
  r: {
    fuelUsage: 2,
    svg: 'rocky-land.svg'
  },
  t: {
    fuelUsage: 2,
    svg: 'removable-trees.svg'
  },
  T: {
    fuelUsage: 0,
    svg: 'protected-tree.svg'
  }
};

export const initialState: ConstructionSiteState = {
  site: [],
  bulldozer: {
    xPos: -1,
    yPos: -1,
    facing: 'EAST',
    damage: 0
  },
  fuelUsage: 0,
  transactionalCost: 0,
  error: null,
  vehicleHistory: [],
  isProtectedTree: false
};

export const costs: { [key: string]: number } = {
  transaction: 1,
  fuelPerSq: 1,
  unclearedPerSq: 3,
  protectedTreeDamage: 10,
  damage: 2
}
