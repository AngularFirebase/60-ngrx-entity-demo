import * as actions from './pizza.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface

export interface Pizza {
    id: string;
    size: string;
}

// Entity adapter
export const pizzaAdapter = createEntityAdapter<Pizza>();
export interface State extends EntityState<Pizza> { }


// Default data / initial state

const defaultPizza = {
    ids: ['123'],
    entities: {
        '123': {
            id: '123',
            size: 'small'
        }
    }
}

export const initialState: State = pizzaAdapter.getInitialState(defaultPizza);

// Reducer

export function pizzaReducer(
    state: State = initialState,
    action: actions.PizzaActions) {

    switch (action.type) {
        
        case actions.CREATE:
            return pizzaAdapter.addOne(action.pizza, state);

        case actions.UPDATE:
            return pizzaAdapter.updateOne({
                id: action.id,
                changes: action.changes,
            }, state);
        
        case actions.DELETE:
            return pizzaAdapter.removeOne(action.id, state)

        default:
            return state;
        }

}

// Create the default selectors

export const getPizzaState = createFeatureSelector<State>('pizza');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = pizzaAdapter.getSelectors(getPizzaState);



