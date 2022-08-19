/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

//const BACKEND_API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8080';
const BACKEND_API_URL = '/api';
export const LOGIN_URL = BACKEND_API_URL + '/authenticate';
export const GRID_URL = BACKEND_API_URL + '/grid';
export const POSITION_URL = BACKEND_API_URL + '/position';
export const USER_URL = BACKEND_API_URL + '/user';
