import { SearchTimeSlot } from '../../../model';
import { Observable } from 'rxjs';

export abstract class SearchTimeSlotAdapter {
  /**
   * Abstract method used to get the list of available time slots
   * @param searchTimeSlot request time slot
   * @returns available time slots of {@link SearchTimeSlot}
   */
  abstract getTimeSlots(
    searchTimeSlot: SearchTimeSlot
  ): Observable<SearchTimeSlot>;
}
