import { TmaTmfCartStoreModule } from './store/tma-tmf-cart-store.module';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  imports: [TmaTmfCartStoreModule]
})
export class TmaTmfCartModule {
  static forRoot(): ModuleWithProviders<TmaTmfCartModule> {
    return {
      ngModule: TmaTmfCartModule
    };
  }
}
