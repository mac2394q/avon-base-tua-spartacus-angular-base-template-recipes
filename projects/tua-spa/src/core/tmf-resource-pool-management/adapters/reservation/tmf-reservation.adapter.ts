import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConverterService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { ReservationAdapter } from '../../../reservation/store/adapters';
import { TmfLogicalResource } from '../../tmf-resource-pool-management-models';
import { TmfResourcePoolManagementEndpointsService } from '../../services';
import { RESERVATION_NORMALIZER } from '../../../reservation';
import { Reservation } from '../../../model';

@Injectable({
  providedIn: 'root'
})
export class TmfReservationAdapter implements ReservationAdapter {
  constructor(
    protected http: HttpClient,
    protected tmfEndpointsService: TmfResourcePoolManagementEndpointsService,
    protected converterService: ConverterService
  ) {
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = this.tmfEndpointsService.getUrl('postReservation');
    return this.http
      .post<TmfLogicalResource.TmfReservation[]>(url, reservation, {
        headers
      })
      .pipe(this.converterService.pipeable(RESERVATION_NORMALIZER));
  }

  updateReservation(
    updateReservation: Reservation,
    reservationId: string
  ): Observable<Reservation> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = this.tmfEndpointsService.getUrl('updateReservation', {
      id: reservationId
    });
    return this.http
      .patch<TmfLogicalResource.TmfReservation[]>(url, updateReservation, {
        headers
      })
      .pipe(this.converterService.pipeable(RESERVATION_NORMALIZER));
  }

  getReservationsByUserId(
    userId: string,
    cartEntryResourceValues: string[]
  ): Observable<Reservation[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (userId === undefined) {
      userId = OCC_USER_ID_ANONYMOUS;
    }
    const queryParameters = Array();
    queryParameters['relatedParty.id'] = userId;

    queryParameters[
      'reservationItem.appliedCapacityAmount.resource.value'
      ] = cartEntryResourceValues;
    const url = this.tmfEndpointsService.getUrl(
      'getReservationById',
      [],
      queryParameters
    );
    return this.http
      .get<TmfLogicalResource.TmfReservation[]>(url, { headers })
      .pipe(this.converterService.pipeableMany(RESERVATION_NORMALIZER));
  }
}
