import React, {useEffect, useState} from "react";
import {PageContainer} from "@ant-design/pro-components";
import {Button, Card, Descriptions, DescriptionsProps, Divider, Form, Input, message} from "antd";
import {useParams} from "@@/exports";
import {
  getInterfaceByIdUsingGet,
  invokeInterfaceUsingPost,
  openPermissionUsingPost
} from "@/services/byapi-backend/interfaceController";

const Index: React.FC = () => {
  const [record, setRecord] = useState<API.InterfaceInfo>();
  const [invokeResult, setInvokeResult] = useState<any>()

  const items: DescriptionsProps['items'] = [
    {
      key: 1,
      label: '接口名称',
      children: record?.name
    },
    {
      key: 2,
      label: '接口描述',
      children: record?.description
    },
    {
      key: 3,
      label: '接口地址',
      children: record?.url
    },
    {
      key: 4,
      label: '请求类型',
      children: record?.method
    },
    {
      key: 5,
      label: '请求参数',
      children: record?.requestParams
    },
    {
      key: 6,
      label: '请求头',
      children: record?.requestHeader
    },
    {
      key: 7,
      label: '响应头',
      children: record?.responseHeader
    },
    {
      key: 8,
      label: '接口状态',
      children: record?.status === 0 ? '关闭' : '开启'
    },
  ]

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
  }

  const invokeInterface = async (values: any) => {
    if (!params.id) {
      message.error('id不能为空');
      return;
    }
    const res = await invokeInterfaceUsingPost({
      id: Number(params.id),
      ...values
    })
    if (res.code === 200) {
      setInvokeResult(res.data)
    } else {
      message.error(res.message)
    }
  }

  //开通接口调用权限
  const openPermission = async () => {
    const res = await openPermissionUsingPost({
      interfaceId: Number(params.id)
    })
    if (res.code === 200) {
      message.success('开通成功')
    } else {
      message.error(res.message)
    }
  }

  useEffect(() => {
    getInterfaceInfoById().then();
  }, []);

  return (
    <PageContainer title="">
      <Card>
        {
          record ? <Descriptions items={items} column={1}/> : <>接口不存在</>
        }
        <Button onClick={openPermission} type={"primary"}>开通接口调用权限</Button>
      </Card>
      <Divider/>
      <Card title="在线调试">
        <Form layout="vertical" onFinish={invokeInterface}>
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea/>
          </Form.Item>
          <Form.Item wrapperCol={{span: 16}}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>
      <Card title="测试结果">
        {invokeResult}
      </Card>
    </PageContainer>
  )
}

export default Index;
