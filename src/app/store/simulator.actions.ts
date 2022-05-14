export const enum SimulatorActions {
  CREATE_SITE = 'CREATE_SITE',
}

export const createSiteSimulator = (data: string[][]) => (
  {type: SimulatorActions.CREATE_SITE, payload: data}
);
