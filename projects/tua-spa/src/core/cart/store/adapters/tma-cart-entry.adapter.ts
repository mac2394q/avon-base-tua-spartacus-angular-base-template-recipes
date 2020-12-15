import { Observable } from 'rxjs';
import { TmaCartModification } from '../../../model/tma-cart.model';
import { CartEntryAdapter } from '@spartacus/core';
import { TmaOrderEntry } from '../../../model/tma-cart.entry.model';

export abstract class TmaCartEntryAdapter extends CartEntryAdapter {

  /**
   * Abstract method used to add an entry to the cart
   * @param userId The identifier of the user
   * @param cartId The identifier of the cart
   * @param cartEntry The entry to be added to the cart
   */
  abstract addCartEntry(
    userId: string,
    cartId: string,
    cartEntry: TmaOrderEntry,
  ): Observable<TmaCartModification>;

  /**
   * Abstract method used to update an entry
   * @param userId The identifier of the user
   * @param cartId The identifier of the cart
   * @param cartEntry The entry to be updated
   */
  abstract updateCartEntry(
    userId: string,
    cartId: string,
    cartEntry: TmaOrderEntry,
  ): Observable<TmaCartModification>;
}
