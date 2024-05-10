import {LockOutlined, MobileOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormInstance, ProFormText,} from '@ant-design/pro-components';
import {Helmet, history} from '@umijs/max';
import {Button, message, Tabs} from 'antd';
import {createStyles} from 'antd-style';
import React, {useRef, useState} from 'react';
import Settings from '../../../../config/defaultSettings';
import {
  emailRegisterUsingPost,
  sendMailUsingPost,
  userRegisterUsingPost
} from "@/services/byapi-backend/userController";
import {Footer} from "@/components";


const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Register: React.FC = () => {
  const {styles} = useStyles();
  const [activeTab, setActiveTab] = useState<string>('account')
  const formRef = useRef<ProFormInstance>(null)

  const handleSubmit = async (values: any) => {
    try {
      // 根据不同的注册方式执行不同的方法
      let res;
      if (activeTab === 'account') {
        res = await userRegisterUsingPost({
          ...values,
        });
      } else {
        res = await emailRegisterUsingPost({
          ...values
        })
      }
      if (res.code === 200) {
        message.success("注册成功");
        history.push('/user/login');
        return;
      } else {
        throw new Error(res.message)
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  //发送邮件
  const sendMail = async () => {
    const value = formRef?.current?.getFieldValue("email")
    const res = await sendMailUsingPost({
      email: value
    })
    if (res.code === 200) {
      message.success('发送成功')
    } else {
      message.error(res.message)
    }
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          formRef={formRef}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="https://img2.imgtp.com/2024/05/10/226I3pTg.svg"/>}
          title="By API"
          subTitle={'一个基于API网关的接口开放平台'}
          submitter={{
            searchConfig: {
              submitText: "注册"
            }
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterDto);
          }}
        >
          <Tabs
            centered
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            items={[
              {
                key: 'account',
                label: '用户注册',
              },
              {
                key: 'email',
                label: '邮箱注册'
              }
            ]}
          />
          {activeTab === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min: 4,
                    message: '账号长度不能小于4位！',
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    message: '密码长度不能小于8位！'
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  ({getFieldValue}) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('userPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('密码不一致!'));
                    },
                  }),
                ]}
              />
              <div
                style={{
                  marginBottom: 24,
                }}
              >
            <span style={{float: 'right', marginTop: -10, marginBottom: 10}}>
              已经有账号？
              <a href={'/user/login'}>去登录</a>
            </span>
              </div>
            </>
          )}
          {activeTab === 'email' && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined/>,
                }}
                placeholder={'请输入QQ邮箱'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
              <div style={{display: "flex"}}>
                <ProFormText
                  width={214}
                  name="verCode"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined/>,
                  }}
                  placeholder={'请输入验证码'}
                  rules={[
                    {
                      required: true,
                      message: '验证码是必填项！',
                    },
                  ]}
                />
                <Button onClick={() => sendMail()} style={{height: 39.6, marginLeft: 10}}>获取验证码</Button>
              </div>
              <div
                style={{
                  marginBottom: 24,
                }}
              >
            <span style={{float: 'right', marginTop: -10, marginBottom: 10}}>
              已经有账号？
              <a href={'/user/login'}>去登录</a>
            </span>
              </div>
            </>
          )}
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
