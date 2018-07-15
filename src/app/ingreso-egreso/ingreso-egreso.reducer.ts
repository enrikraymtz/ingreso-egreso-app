import { IngresoEgreso } from './ingreso-egreso.model';

import * as fromIngresoEgreso from './ingreso-egreso.actions';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const estadoIncial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer( state = estadoIncial, action: fromIngresoEgreso.actions ): IngresoEgresoState {

    switch ( action.type ) {

        case fromIngresoEgreso.SET_ITEMS:
            return {
                        items: [
                            ...action.items.map( item => {
                                return {
                                    ...item
                                };
                            })
                        ]
                   };

        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            };

        default:
            return state;
    }
}
