import { ModuleWithProviders, NgModule } from '@angular/core';
import { TmaPremiseDetailService } from './facade';
import { TmaPremiseDetailStoreModule } from './store';

@NgModule({
  imports: [TmaPremiseDetailStoreModule]
})
export class TmaPremiseDetailModule {
  static forRoot(): ModuleWithProviders<TmaPremiseDetailModule> {
    return {
      ngModule: TmaPremiseDetailModule,
      providers: [TmaPremiseDetailService]
    };
  }
}
