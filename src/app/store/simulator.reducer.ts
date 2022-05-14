import {ConstructionSiteState} from '../app.interface';
import {costs} from '../utils/constants';
import {SimulatorActions} from './simulator.actions';

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
    default:
      return siteState;
  }
}
