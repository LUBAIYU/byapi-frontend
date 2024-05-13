import {
  getCodeExampleUsingGet,
  getInterfaceByIdUsingGet,
  invokeInterfaceUsingPost,
  openPermissionUsingPost,
} from '@/services/byapi-backend/interfaceController';
import { addInvokeCountUsingPost } from '@/services/byapi-backend/userInterfaceController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Divider,
  Drawer,
  Form,
  Input,
  message,
} from 'antd';
import 'codemirror/mode/clike/clike.js'; // 导入 Java 语言支持
import 'codemirror/mode/yaml/yaml.js'; // 导入 YAML 语言支持
import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'; // 导入 React CodeMirror

import { getKeyByIdUsingGet } from '@/services/byapi-backend/userController'; // 导入 CodeMirror 主题样式
import 'codemirror/lib/codemirror.css'; // 导入 CodeMirror 样式
import 'codemirror/theme/material.css';

const Index: React.FC = () => {
  const [record, setRecord] = useState<API.InterfaceVo>();
  const [invokeResult, setInvokeResult] = useState<any>();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<string>('');
  const [ymlConfig, setYmlConfig] = useState<string>('');

  //关闭抽屉
  const closeDrawer = () => {
    setOpen(false);
  };

  const items: DescriptionsProps['items'] = [
    {
      key: 1,
      label: '接口描述',
      children: record?.description,
    },
    ...(record?.totalNum !== null
      ? [
          {
            key: 2,
            label: '接口总调用次数',
            children: record?.totalNum,
          },
        ]
      : []),
    ...(record?.leftNum !== null
      ? [
          {
            key: 3,
            label: '接口剩余调用次数',
            children: record?.leftNum,
          },
        ]
      : []),
    {
      key: 4,
      label: '接口地址',
      children: record?.url,
    },
    {
      key: 5,
      label: '请求类型',
      children: record?.method,
    },
    {
      key: 6,
      label: '请求参数',
      children: record?.requestParams,
    },
    {
      key: 7,
      label: '请求头',
      children: record?.requestHeader,
    },
    {
      key: 8,
      label: '响应头',
      children: record?.responseHeader,
    },
    {
      key: 9,
      label: '接口状态',
      children: record?.status === 0 ? '关闭' : '开启',
    },
  ];

  const params = useParams();
  const getInterfaceInfoById = async () => {
    const res = await getInterfaceByIdUsingGet({
      id: Number(params?.id),
    });
    if (res.code === 200) {
      setRecord(res.data);
    } else {
      message.error(res.message);
    }
  };

  const invokeInterface = async (values: any) => {
    if (!params.id) {
      message.error('id不能为空');
      return;
    }
    const res = await invokeInterfaceUsingPost({
      id: Number(params.id),
      ...values,
    });
    if (res.code === 200) {
      setInvokeResult(res.data);
      getInterfaceInfoById().then();
    } else {
      message.error(res.message);
    }
  };

  //开通接口调用权限
  const openPermission = async () => {
    const res = await openPermissionUsingPost({
      interfaceId: Number(params.id),
    });
    if (res.code === 200) {
      message.success('开通成功');
      getInterfaceInfoById().then();
    } else {
      message.error(res.message);
    }
  };

  //获取接口调用次数
  const addInvokeCount = async () => {
    const res = await addInvokeCountUsingPost({
      interfaceId: Number(params.id),
    });
    if (res.code === 200) {
      message.success('获取成功');
      getInterfaceInfoById().then();
    } else {
      message.error(res.message);
    }
  };

  //根据接口ID获取示例代码
  const getCode = async () => {
    const res = await getCodeExampleUsingGet({
      interfaceId: Number(params.id),
    });
    if (res.code === 200) {
      setCode(res.data as string);
    } else {
      message.error(res.message);
    }
  };

  //根据当前登录用户获取对应密钥
  const getKey = async () => {
    const res = await getKeyByIdUsingGet();
    if (res.code === 200) {
      const accessKey = res.data?.accessKey;
      const secretKey = res.data?.secretKey;
      setYmlConfig(
        `    byapi:
      client:
        access-key: ${accessKey}
        secret-key: ${secretKey}`,
      );
    } else {
      message.error(res.message);
    }
  };

  //打开抽屉
  const openDrawer = () => {
    setOpen(true);
    getCode().then();
    getKey().then();
  };

  useEffect(() => {
    getInterfaceInfoById().then();
  }, []);

  return (
    <PageContainer title="">
      <Card
        title={record?.name}
        extra={
          record?.leftNum === 0 && (
            <Button onClick={addInvokeCount} type={'link'}>
              获取调用次数
            </Button>
          )
        }
      >
        {record ? <Descriptions items={items} column={1} /> : <>接口不存在</>}
        {record?.totalNum === null && record?.leftNum === null && (
          <Button onClick={openPermission} type={'primary'}>
            开通接口调用权限
          </Button>
        )}
      </Card>
      <Divider />
      <Card
        title="在线调试"
        extra={
          <Button onClick={openDrawer} type={'link'}>
            示例代码
          </Button>
        }
      >
        <Form layout="vertical" onFinish={invokeInterface}>
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="测试结果">{invokeResult}</Card>
      <Drawer size={'large'} open={open} onClose={closeDrawer}>
        <Card title={'yaml配置'}>
          <CodeMirror
            options={{
              mode: 'yaml', // 设置编辑器语言为yaml
              theme: 'material', // 设置编辑器主题
              lineNumbers: true, // 显示行号
              readOnly: true, // 设置为只读
            }}
            onBeforeChange={(value) => {
              setCode(value);
            }}
            value={ymlConfig}
          ></CodeMirror>
        </Card>
        <Divider />
        <Card title={'示例代码'}>
          <CodeMirror
            options={{
              mode: 'text/x-java', // 设置编辑器语言为Java
              theme: 'material', // 设置编辑器主题
              lineNumbers: true, // 显示行号
              readOnly: true, // 设置为只读
            }}
            onBeforeChange={(value) => {
              setCode(value);
            }}
            value={code}
          />
        </Card>
      </Drawer>
    </PageContainer>
  );
};

export default Index;
