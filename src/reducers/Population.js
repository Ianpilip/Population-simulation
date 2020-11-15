// @flow

import { createPopulation } from '../utils/Population';
import { DEFAULT_GRID_SIZE } from '../constants/Population';

const defaultStore = createPopulation(DEFAULT_GRID_SIZE);
const reducer = (store: Array<Array<number>> = defaultStore, action: Object): Object => {
    switch (action.type) {
        case 'UPDATE_POPULATION': {
            return action.payload;
        }
        default: {
            return store;
        }
    }
} 

export default reducer;