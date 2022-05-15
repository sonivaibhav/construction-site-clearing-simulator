import {ConstructionSiteState, SimulatorActions} from '../app.interface';
import {costs} from '../utils/constants';

const initialState: ConstructionSiteState = {
  site: [],
  bulldozer: {
    xPos: -1,
    yPos: -1,
    facing: 'EAST',
    damage: 0
  },
  fuelUsage: 0,
  transactionalCost: 0,
  error: '',
  vehicleHistory: [],
  isProtectedTree: false
};

export const simulatorReducer = (siteState: ConstructionSiteState, simulatorAction: { type: string; payload: any }): ConstructionSiteState => {
  switch (simulatorAction.type) {
    case SimulatorActions.CREATE_SITE:
      siteState.site = simulatorAction.payload;
      return siteState;
    case SimulatorActions.UPDATE_SITE:
      siteState.site = simulatorAction.payload;
      return siteState;
    case SimulatorActions.UPDATE_FUEL_USAGE:
      siteState.fuelUsage += simulatorAction.payload;
      return siteState;
    case SimulatorActions.UPDATE_VEHICLE_LOCATION:
      siteState.bulldozer = {...simulatorAction.payload.bulldozer};
      siteState.transactionalCost += costs['transaction'];
      siteState.vehicleHistory = [...siteState.vehicleHistory, {
        bulldozer: simulatorAction.payload.bulldozer,
        command: simulatorAction.payload.command
      }];
      return siteState;
    case SimulatorActions.ERROR:
      siteState.error = simulatorAction.payload;
      return siteState;
    case SimulatorActions.UPDATE_PROTECTED_TREE_FOUND:
      siteState.isProtectedTree = simulatorAction.payload;
      return siteState;
    case SimulatorActions.DESTROY_SITE:
      return initialState;
    default:
      return siteState;
  }
}
