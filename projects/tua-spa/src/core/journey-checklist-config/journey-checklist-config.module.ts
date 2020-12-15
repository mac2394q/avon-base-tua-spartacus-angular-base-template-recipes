import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '@spartacus/core';
import {
  defaultJourneyChecklistConfig,
  JourneyChecklistConfig
} from './config';

@NgModule({})
export class JourneyChecklistConfigModule {
  static forRoot(): ModuleWithProviders<JourneyChecklistConfigModule> {
    return {
      ngModule: JourneyChecklistConfigModule,
      providers: [
        { provide: JourneyChecklistConfig, useExisting: Config },
        provideConfig(defaultJourneyChecklistConfig)
      ]
    };
  }
}
