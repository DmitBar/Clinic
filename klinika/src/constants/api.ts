import { TREASURY, DEPOSITS, CASH, REPORTS, COMMON } from './route-prefixes';

export const API_HOST = 'host';

const API_PREFIX = '/api';

export const API_URL = `${API_HOST}${API_PREFIX}`;

const TREASURY_URL = `${API_PREFIX}${TREASURY}`;
const DEPOSITS_URL = `${API_PREFIX}${DEPOSITS}`;
const CASH_URL = `${API_PREFIX}${CASH}`;
const REPORTS_URL = `${API_PREFIX}${REPORTS}`;
const COMMON_URL = `${API_PREFIX}${COMMON}`;

export default {
    GENERATE_PURCHASE_AND_SELL_FOREIGN_CURRENCIES_REPORT:
        TREASURY_URL + '/generate-purchase-and-sell-foreign-currencies-report',
    GENERATE_CASH_BALANCE_REPORT: CASH_URL + '/generate-cash-balance',
    GENERATE_AP_ONE_REPORT: DEPOSITS_URL + '/ap1',
    GENERATE_FOREIGN_CURRENCY_CASH_BALANCE_REPORT:
        CASH_URL + '/generate-foreign-currency-cash-balance',
    GENERATE_KHUJAND_CASH_FLOW_TABLE_REPORT: CASH_URL + '/generate-khujand-cash-flow',
    GET_REPORTS: REPORTS_URL + '/load',
    DOWNLOAD_REPORT: REPORTS_URL + '/:id/download',
    GENERATE_CURRENCY_POSITION_REPORT: TREASURY_URL + '/generate-currency-position',
    GENERATE_FOREIGN_CURRENCY_SALES_REPORT_FOR_ORGANIZATIONS:
        TREASURY_URL + '/generate-foreign-currency-sales-to-organizations',
    GENERATE_INTERBANK_CURRENCY_OPERATIONS_REPORT:
        TREASURY_URL + '/generate-interbank-currency-operations',
    GET_REGIONS: COMMON_URL + '/regions',
};
