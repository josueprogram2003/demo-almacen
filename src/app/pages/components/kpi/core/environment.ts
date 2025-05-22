// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: false,
  // appVersion: require('../../../../package.json').version + '-dev',
  url: 'https://api-kpi-dev.adra.org.pe/api',
  urlgth: 'https://api-gth-dev.adra.org.pe/api',
  sigla: 'KPI',
  // url: 'https://api-kpi.adra.org.pe/api',
  urlConfiguration: 'https://api-configuration-dev.adra.org.pe/api',
  api: {
    auth: '/security/oauth',
    main: '/kpi',
  },
  apigth: {
    auth: '/security/oauth',
    main: '/gth',
  },
  urlAdra: {
    sgerp: 'https://test-ant.adra.org.pe',
  },
  basicAuth: {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('sigei:2F0MbY9!P7@&'),
    }),
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
