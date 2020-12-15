import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../config/utils/tma-serialization-utils';
import { AppointmentActions } from '..';
import { AppointmentActionTypes } from '../actions/appointment.actions';
import { Action } from '@ngrx/store';
import { AppointmentConnector } from '../../connectors';
import { Appointment } from '../../..';

@Injectable()
export class AppointmentEffects {
  constructor(
    protected appointmentConnector: AppointmentConnector,
    private actions$: Actions
  ) {}

  @Effect()
  getAppointment$: Observable<
    | AppointmentActions.LoadAppointmentSuccess
    | AppointmentActions.LoadAppointmentFail
    | AppointmentActions.LoadAppointment
  > = this.actions$.pipe(
    ofType(AppointmentActionTypes.LOAD_APPOINTMENT),
    map((action: AppointmentActions.LoadAppointment) => action.payload),
    concatMap((payload) => {
      return this.appointmentConnector.getAppointmentById(payload.id).pipe(
        map(
          (appointment: Appointment) =>
            new AppointmentActions.LoadAppointmentSuccess(appointment)
        ),
        catchError((error: any) =>
          of(
            new AppointmentActions.LoadAppointmentFail({
              id: payload.id,
              errorResponse: makeErrorSerializable(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  createAppointment$: Observable<Action> = this.actions$.pipe(
    ofType(AppointmentActionTypes.CREATE_APPOINTMENT),
    map((action: AppointmentActions.CreateAppointment) => action.payload),
    mergeMap((payload) => {
      return this.appointmentConnector.setAppointment(payload.appointment).pipe(
        map((appointment: Appointment) => {
          return new AppointmentActions.CreateAppointmentSuccess({
            newAppointment: appointment,
          });
        }),
        catchError((error: any) =>
          of(
            new AppointmentActions.CreateAppointmentFail({
              errorResponse: makeErrorSerializable(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  updateAppointment$: Observable<Action> = this.actions$.pipe(
    ofType(AppointmentActionTypes.UPDATE_APPOINTMENT),
    map((action: AppointmentActions.CreateAppointment) => action.payload),
    mergeMap((payload) => {
      return this.appointmentConnector
        .updateAppointment(payload.id, payload.appointment)
        .pipe(
          map((appointment: Appointment) => {
            return new AppointmentActions.UpdateAppointmentSuccess({
              appointment: appointment,
            });
          }),
          catchError((error: any) =>
            of(
              new AppointmentActions.UpdateAppointmentFail({
                id: payload.id,
                errorResponse: makeErrorSerializable(error),
              })
            )
          )
        );
    })
  );
}
