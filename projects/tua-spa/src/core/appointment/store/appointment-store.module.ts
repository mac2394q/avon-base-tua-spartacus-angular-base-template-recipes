import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StateModule } from '@spartacus/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { AppointmentEffects } from './effects';
import { APPOINTMENT_FEATURE } from './appointment-state';
import { reducerToken, reducerProvider } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StateModule,
    StoreModule.forFeature(APPOINTMENT_FEATURE, reducerToken, {}),
    EffectsModule.forFeature([AppointmentEffects]),
    RouterModule,
  ],
  providers: [reducerProvider],
})
export class AppointmentStoreModule {}
