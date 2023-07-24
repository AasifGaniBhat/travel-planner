// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_SET_TICKET_DETAILS,
} from './constants';

export function setTicketDetails(data) {
  return {
    type: COMMON_SET_TICKET_DETAILS,
    data: data
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_TICKET_DETAILS:
      return {
        ...state,
        ticketDetails: action.data
      };

    default:
      return state;
  }
}
