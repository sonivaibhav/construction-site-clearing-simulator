import {ConstructionSiteState} from '../app.interface';
import {SimulatorActions} from './simulator.actions';

export const simulatorReducer = (siteState: ConstructionSiteState, simulatorAction: { type: string; payload: any }): ConstructionSiteState => {
  switch (simulatorAction.type) {
    case SimulatorActions.CREATE_SITE:
      siteState.site = simulatorAction.payload;
      return siteState;
    default:
      return siteState;
  }
}
