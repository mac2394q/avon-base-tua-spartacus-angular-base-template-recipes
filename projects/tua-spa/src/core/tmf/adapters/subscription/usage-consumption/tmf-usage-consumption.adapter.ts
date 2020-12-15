import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TmfEndpointsService } from '../../../services';
import { ConverterService } from '@spartacus/core';
import { Tmf } from '../../../tmf-models';
import { UsageConsumptionReport } from '../../../../model';
import {
  UsageConsumptionAdapter,
  USAGE_CONSUMPTION_NORMALIZER,
} from '../../../../subscription';

@Injectable({
  providedIn: 'root',
})
export class TmfUsageConsumptionAdapter implements UsageConsumptionAdapter {
  constructor(
    protected http: HttpClient,
    protected tmfEndpointsService: TmfEndpointsService,
    protected converterService: ConverterService
  ) {}

  getUsageConsumption(
    baseSiteId: string,
    subscriptionBaseId: string
  ): Observable<UsageConsumptionReport[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const queryParameters = Array();
    queryParameters['baseSiteId'] = baseSiteId;
    queryParameters['subscriptionBase.id'] = subscriptionBaseId;

    const url = this.tmfEndpointsService.getUrl(
      'usageConsumptionReport',
      [],
      queryParameters
    );
    return this.http
      .get<Tmf.TmfUsageConsumptionReport[]>(url, { headers })
      .pipe(this.converterService.pipeableMany(USAGE_CONSUMPTION_NORMALIZER));
  }
}
