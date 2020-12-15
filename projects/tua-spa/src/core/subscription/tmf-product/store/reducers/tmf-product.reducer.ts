import {
  TmfProductActionType,
  TmfProductAction,
} from '../actions/tmf-product.action';
import { TmfProductMap } from '../tmf-product.state';

const initialState: TmfProductMap[] = [];

/**
 * Function to handle the transitions of TmfProductState
 * @param state The state of the TmfProductState
 * @param action Dispatched action of {@link TmfProductAction}
 * @returns list of {@link TmfProductMap} of {@link TmfProductState}
 */
export function tmfProductReducer(
  state = initialState,
  action: TmfProductAction
): TmfProductMap[] {
  switch (action.type) {
    case TmfProductActionType.LOAD_TMF_PRODUCT_SUCCESS: {
      if (
        !state.find(
          (tmfProductState: TmfProductMap) =>
            tmfProductState.tmfProductId === action.payload.tmfProductId &&
            tmfProductState.baseSiteId === action.payload.baseSiteId
        )
      ) {
        state = state.concat({
          tmfProduct: action.payload.tmfProduct,
          tmfProductId: action.payload.tmfProductId,
          baseSiteId: action.payload.baseSiteId,
        });
      }
      return state;
    }
    case TmfProductActionType.LOAD_TMF_PRODUCT_FAIL ||
      TmfProductActionType.CLEAR_TMF_PRODUCT: {
      return initialState;
    }
  }
  return state;
}
