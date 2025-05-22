import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  // appVersion: require('../../../../package.json').version + '-dev',
  url: 'https://api-accountancy-dev.adra.org.pe/api',
  url_gth: 'https://api-gth-dev.adra.org.pe/api',
  url_log:'https://api-logistica-dev.adra.org.pe/api',
  sigla: 'CONT',
  api: {
    auth: '/security/oauth',
    main: '/accountancy',
    main_gth:'/gth',
    submain: '/documents',
    main_budget: '/budget',
    costCenter: '/cost-center',
    businessUnit: '/business-unit',
    period: '/period',
    budget: '/budget',
    costCenterExonerated: '/cost-center-exonerated',
    accountCostCenterExonerated: '/account-cost-center-exonerated',
    userCostCenter: '/user-cost-center',
  },
  basicAuth: {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('siscon:lZrOhd3djN4j#9NaQ'),
    }),
  },
  urlAdra: {
    sgerp: 'https://test-ant.adra.org.pe',
  },
  configuration:{
    url: 'https://api-configuration-dev.adra.org.pe/api',
    main: '/configuration'
  }
};