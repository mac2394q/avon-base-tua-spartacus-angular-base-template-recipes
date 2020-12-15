import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigInitializer, CONFIG_INITIALIZER } from '@spartacus/core';
import { TmaBillingFrequencyConfig } from '../config';
import { TmaBillingFrequencyConfigLoaderService } from './tma-billing-frequency-config-loader.service';

@NgModule()
export class TmaBillingFrequencyConfigLoaderModule {
  static forRoot(): ModuleWithProviders<TmaBillingFrequencyConfigLoaderModule> {
    return {
      ngModule: TmaBillingFrequencyConfigLoaderModule,
      providers: [
        {
          provide: CONFIG_INITIALIZER,
          useFactory: initConfig,
          deps: [TmaBillingFrequencyConfigLoaderService, TmaBillingFrequencyConfig],
          multi: true
        }
      ]
    };
  }
}

/**
 * Initializes the Spartacus config asynchronously basing on the external config
 */
export function initConfig(
  configLoader: TmaBillingFrequencyConfigLoaderService,
  config: TmaBillingFrequencyConfig
): ConfigInitializer {
  /**
   * Load config for `billing frequency`
   */
  if (!config || !config.billingFrequency) {
    return {
      scopes: ['billingFrequency'],
      configFactory: () => configLoader.loadConfig()
    };
  }
  return null;
}
