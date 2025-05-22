import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,
  // appVersion: require('../../../../package.json').version + '-dev',
  url: 'https://api-kpi.adra.org.pe/api',
  urlgth: 'https://api-gth.adra.org.pe/api',
  urlConfiguration: 'https://api-configuration.adra.org.pe/api',
  sigla: 'KPI',
  api: {
    auth: '/security/oauth',
    main: '/kpi',
  },
  apigth: {
    auth: '/security/oauth',
    main: '/gth',
  },
  urlAdra: {
    sgerp: 'https://ant.adra.org.pe',
  },
  basicAuth: {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('sigei:2F0MbY9!P7@&'),
    }),
  },
};
