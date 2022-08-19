import Footer from '@/components/Footer';
import { login, setupAxiosInterceptors, signup } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { Alert, Button, message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  // const changeSubmitButton = () => {

  // };

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: any) => {
    if (type === 'account') {
      try {
        // 登录
        const msg = await login({ ...values, type });

        if (msg.status === 'success') {
          const jwtToken = msg.token;
          const axiosInterceptor = setupAxiosInterceptors(jwtToken);
          await setInitialState((s) => ({
            ...s,
            axiosInterceptor: axiosInterceptor,
          }));

          const defaultLoginSuccessMessage = intl.formatMessage({
            id: 'pages.login.success',
            defaultMessage: '登录成功！',
          });
          message.success(defaultLoginSuccessMessage);
          await fetchUserInfo();
          //Although we add "await" before setInitialState and fetchUserInfo, but still get old initialstate.currentUser, workaround as add sleep(0)
          await sleep(0);
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          return;
        }
        // 如果失败去设置用户错误信息
        setUserLoginState(msg);
      } catch (error) {
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: '登录失败，请重试！',
        });
        console.log(error);
        message.error(defaultLoginFailureMessage);
      }
    } else {
      try {
        //type === signup
        const msg = await signup(
          values.newusername,
          values.newpassword,
          values.fullname,
          values.email,
        );

        if (msg.status === 'success') {
          const defaultLoginSuccessMessage = intl.formatMessage({
            id: 'pages.signup.success',
            defaultMessage: '注册成功！',
          });
          message.success(defaultLoginSuccessMessage);
          await sleep(2000);
          location.reload();
          return;
        }
        // 如果注册失败显示错误信息
        message.warn(msg);
      } catch (error) {
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'pages.signup.failure',
          defaultMessage: '注冊失败，请更改用戶名后重试！',
        });
        console.log(error);
        message.error(defaultLoginFailureMessage);
      }
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && (
          <SelectLang
            postLocalesData={() => {
              return [
                {
                  lang: 'en-US',
                  label: 'English',
                  icon: '🇺🇸',
                  title: 'Language',
                },
                {
                  lang: 'zh-CN',
                  label: '简体中文',
                  icon: '🇨🇳',
                  title: '语言',
                },
              ];
            }}
          />
        )}
      </div>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: { submitText: <FormattedMessage id={'pages.login.' + type} /> },
          }}
          logo={<img alt="logo" src="/favicon.ico" />}
          title="Sudoku Master"
          // subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          // actions={[
          //   <FormattedMessage
          //     key="loginWith"
          //     id="pages.login.loginWith"
          //     defaultMessage="其他登录方式"
          //   />,
          //   <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
          //   <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
          //   <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          // ]}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账户密码登录',
              })}
            />
            <Tabs.TabPane
              key="signup"
              tab={intl.formatMessage({
                id: 'pages.login.signup.tab',
                defaultMessage: '注册账户',
              })}
            />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
                </ProFormCheckbox>

                <Button
                  onClick={() => {
                    handleSubmit({ username: 'guest', password: 'guest' });
                  }}
                  size="small"
                  style={{ width: 90, float: 'right' }}
                >
                  游客模式
                </Button>
              </div>
            </>
          )}

          {type === 'signup' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                name="newusername"
                placeholder={intl.formatMessage({
                  id: 'pages.signup.newusername',
                  defaultMessage: '注册用户名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.signup.newusername.required"
                        defaultMessage="请输入用户名！"
                      />
                    ),
                  },
                  {
                    pattern: /^[A-Za-z0-9]{6,12}$/,
                    message: (
                      <FormattedMessage
                        id="pages.signup.newusername.invalid"
                        defaultMessage="用户名为6至12位字母数字"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText
                name="fullname"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.signup.fullname.placeholder',
                  defaultMessage: '全名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.signup.fullname.required"
                        defaultMessage="请输入全名!"
                      />
                    ),
                  },
                  {
                    pattern: /^[A-Za-z0-9 ]{6,30}$/,
                    message: (
                      <FormattedMessage
                        id="pages.signup.fullname.invalid"
                        defaultMessage="全名为6至30位字母数字或空格"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.signup.emali.placeholder',
                  defaultMessage: '邮箱',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.signup.email.required"
                        defaultMessage="请输入邮箱!"
                      />
                    ),
                  },
                  {
                    pattern:
                      /^[a-zA-Z0-9_-]{1,20}@[a-zA-Z0-9_-]{1,15}(\.[a-zA-Z0-9_-]{1,15}){0,3}$/,
                    message: (
                      <FormattedMessage
                        id="pages.signup.email.invalid"
                        defaultMessage="请输入合法邮箱"
                      />
                    ),
                  },
                ]}
              />{' '}
              <ProFormText.Password
                name="newpassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.signup.password.placeholder',
                  defaultMessage: '密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.signup.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                  {
                    pattern: /^[A-Za-z0-9]{3,12}$/,
                    message: (
                      <FormattedMessage
                        id="pages.signup.newpassword.invalid"
                        defaultMessage="密码为3至12位字母数字"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
