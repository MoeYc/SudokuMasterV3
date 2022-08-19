/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import { getRequestInstance } from '@/.umi/plugin-request/request';

import { GRID_URL, POSITION_URL } from './config';

class GridService {
  getPosition = (cells) => cells.reduce((a, b) => a.concat('|').concat(b));

  resolveGrid = (gridId) => {
    return getRequestInstance().get(`${GRID_URL}/${gridId}/resolve`);
  };

  // export async function currentUser(options?: { [key: string]: any }) {
  //   return request<{
  //     data: API.CurrentUser;
  //   }>('/api/login/currentUser', {
  //     method: 'GET',
  //     ...(options || {}),
  //   });
  // }

  saveGrid = (gridId) => {
    return getRequestInstance().put(`${GRID_URL}/${gridId}`);
  };

  findAllGrid = () => {
    return getRequestInstance().get(`${GRID_URL + 's'}`);
  };

  resolvePosition = (gridId, cells) => {
    return getRequestInstance().get(`${POSITION_URL}/${gridId}/${this.getPosition(cells)}/resolve`);
  };

  ValidatePosition = (gridId, cells) => {
    return getRequestInstance().get(
      `${POSITION_URL}/${gridId}/${this.getPosition(cells)}/validate`,
    );
  };

  savePosition = (gridId, cells) => {
    return getRequestInstance().put(`${POSITION_URL}/${gridId}/${this.getPosition(cells)}`);
  };

  findAllPosition = () => {
    return getRequestInstance().get(`${POSITION_URL + 's'}`);
  };
}

export default new GridService();
