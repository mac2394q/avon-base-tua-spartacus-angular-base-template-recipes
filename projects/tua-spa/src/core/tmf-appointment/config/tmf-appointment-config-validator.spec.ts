import { tmfAppointmentConfigValidator } from '..';
import { TmfAppointmentConfig } from './tmf-appointment-config';

describe('tmfAppointmentConfigValidator', () => {
  it('should warn about undefined baseUrl', () => {
    const config: TmfAppointmentConfig = {
      backend: {},
    };
    expect(tmfAppointmentConfigValidator(config)).toBeTruthy();
  });

  it('should not warn about undefined baseUrl', () => {
    const config: TmfAppointmentConfig = {
      backend: {
        tmf_appointment: {
          baseUrl: '',
        },
      },
    };
    expect(tmfAppointmentConfigValidator(config)).toBeFalsy();
  });
});
