// @ts-ignore
/* eslint-disable */
import { getRequestInstance } from '@umijs/max';
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/login/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/login/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/logoff */
export async function logoff(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/logoff', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册用户 */
export async function signup(
  username: string,
  password: string,
  fullname: string,
  email: string,
  options?: { [key: string]: any },
) {
  return request<API.LoginResult>('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: username,
      password: password,
      fullname: fullname,
      email: email,
    },
    ...(options || {}),
  });
}

export const setupAxiosInterceptors = (token: string) => {
  const interceptor = getRequestInstance().interceptors.request.use((config) => {
    config.headers.authorization = createJWTToken(token);
    return config;
  });
  return interceptor;
};

const createJWTToken = (token: string) => {
  return 'Bearer ' + token;
};

export const teardownAxiosInterceptors = (interceptor?: number) => {
  if (interceptor) {
    getRequestInstance().interceptors.request.eject(interceptor);
  }
};

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
