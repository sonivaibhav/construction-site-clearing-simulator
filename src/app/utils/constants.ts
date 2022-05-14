import {ConstructionSiteState} from '../app.interface';

export const tableCells: {
  [key: string]: {
    svg: string;
  }
} = {
  o: {
    svg: "plain-land.svg"
  },
  r: {
    svg: "rocky-land.svg"
  },
  t: {
    svg: "removable-trees.svg"
  },
  T: {
    svg: "protected-tree.svg"
  }
};

export const initialState: ConstructionSiteState = {
  site: [],
  bulldozer: {
    xPos: -1,
    yPos: -1,
    facing: "EAST",
    damage: 0
  },
  fuelUsage: 0,
  transactionalCost: 0,
  error: null,
  vehicleHistory: [],
  isProtectedTree: false
};
