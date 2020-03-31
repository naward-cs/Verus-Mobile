/*
  This reducer stores error handling data for API call information
*/

import {
  API_GET_TRANSACTIONS,
  API_GET_BALANCES,
  API_GET_FIATPRICE,
  API_GET_INFO,
  ELECTRUM,
  DLIGHT,
  GENERAL
} from "../utils/constants/intervalConstants";
import {
  ERROR_BALANCES,
  ERROR_INFO,
  ERROR_TRANSACTIONS,
  ERROR_RATES,
  SET_BALANCES,
  SET_INFO,
  SET_TRANSACTIONS,
  SET_RATES
} from "../utils/constants/storeType";

export const errors = (state = {
  // Ledger calls for coins
  [API_GET_TRANSACTIONS]: {
    [ELECTRUM]: {},
    [DLIGHT]: {},
    [GENERAL]: {},
  },
  [API_GET_BALANCES]: {
    [ELECTRUM]: {},
    [DLIGHT]: {},
    [GENERAL]: {},
  },
  [API_GET_FIATPRICE]: {
    [ELECTRUM]: {},
    [DLIGHT]: {},
    [GENERAL]: {},
  },
  [API_GET_INFO]: {
    [ELECTRUM]: {},
    [DLIGHT]: {},
    [GENERAL]: {},
  },
}, action) => {
  const { channel, error, chainTicker } = action.payload || {}

  switch (action.type) {
    case ERROR_BALANCES:
      return {
        ...state,
        [API_GET_BALANCES]: {
          ...state[API_GET_BALANCES],
          [error.channel]: {
            ...state[API_GET_BALANCES][error.channel],
            [error.chainTicker]: error
          }
        }
      };
    case ERROR_INFO:
      return {
        ...state,
        [API_GET_INFO]: {
          ...state[API_GET_INFO],
          [error.channel]: {
            ...state[API_GET_INFO][error.channel],
            [error.chainTicker]: error
          }
        }
      };
    case ERROR_TRANSACTIONS:
      return {
        ...state,
        [API_GET_TRANSACTIONS]: {
          ...state[API_GET_TRANSACTIONS],
          [error.channel]: {
            ...state[API_GET_TRANSACTIONS][error.channel],
            [error.chainTicker]: error
          }
        }
      };
    case ERROR_RATES:
      return {
        ...state,
        [API_GET_FIATPRICE]: {
          ...state[API_GET_FIATPRICE],
          [error.channel]: {
            ...state[API_GET_FIATPRICE][error.channel],
            [error.chainTicker]: error
          }
        }
      };
    case SET_BALANCES:
      return {
        ...state,
        [API_GET_BALANCES]: {
          ...state[API_GET_BALANCES],
          [channel]: {
            ...state[API_GET_BALANCES][channel],
            [chainTicker]: null
          }
        }
      };
    case SET_INFO:
      return {
        ...state,
        [API_GET_INFO]: {
          ...state[API_GET_INFO],
          [channel]: {
            ...state[API_GET_INFO][channel],
            [chainTicker]: null
          }
        }
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        [API_GET_TRANSACTIONS]: {
          ...state[API_GET_TRANSACTIONS],
          [channel]: {
            ...state[API_GET_TRANSACTIONS][channel],
            [chainTicker]: null
          }
        }
      };
    case SET_RATES:
      return {
        ...state,
        [API_GET_FIATPRICE]: {
          ...state[API_GET_FIATPRICE],
          [channel]: {
            ...state[API_GET_FIATPRICE][channel],
            [chainTicker]: null
          }
        }
      };
    default:
      return state;
  }
}