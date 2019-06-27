import axios from 'axios';

export const DELETE_FLIGHT = 'DELETE_FLIGHT';
export const DELETE_FLIGHT_SUCCESS = 'DELETE_FLIGHT_SUCCESS';
export const DELETE_FLIGHT_FAILURE = 'DELETE_FLIGHT_FAILURE';
export const RESET_DELETED_FLIGHT = 'RESET_DELETED_FLIGHT';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function deleteFlightSuccess(deletedFlight) {
    return {
      type: DELETE_FLIGHT_SUCCESS,
      payload: deletedFlight
    };
  }
  
  export function deleteFlightFailure(response) {
    return {
      type: DELETE_FLIGHT_FAILURE,
      payload: response
    };
  }