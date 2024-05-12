import React, {useEffect, useState} from "react";
import {PageContainer, ProTable} from "@ant-design/pro-components";
import {Button, Card, Collapse, Descriptions, Divider, message, Tag, Typography} from "antd";
import {listInvokeRecordsUsingGet} from "@/services/byapi-backend/interfaceController";
import {applyKeyUsingPost, getKeyByIdUsingGet} from "@/services/byapi-backend/userController";

const Record: React.FC = () => {
  const [recordList, setRecordList] = useState<API.InterfaceVo[] | undefined>([]);
  const [keyData, setKeyData] = useState<API.KeyVo | undefined>({})
  const [show, setShow] = useState<boolean>(false)
  //获取调用记录
  const listInvokeRecords = async () => {
    const res = await listInvokeRecordsUsingGet()
    if (res.code === 200) {
      setRecordList(res.data)
    } else {
      message.error(res.message)
    }
  }

  //获取密钥信息
  const getKeyData = async () => {
    const res = await getKeyByIdUsingGet();
    if (res.code === 200) {
      setKeyData(res.data)
    } else {
      message.error(res.message)
    }
  }

  //重新生成密钥
  const applyKey = async () => {
    const res = await applyKeyUsingPost()
    if (res.code === 200) {
      setKeyData(res.data)
    } else {
      message.error(res.message)
    }
  }

  const items = recordList?.map((item) => ({
    key: `${item.id}`,
    label: item.name,
    children: (
      <Descriptions title={item.name} bordered column={2}>
        <Descriptions.Item label="接口描述">{item.description}</Descriptions.Item>
        <Descriptions.Item label="接口地址">{item.url}</Descriptions.Item>
        <Descriptions.Item label="请求类型">{item.method}</Descriptions.Item>
        <Descriptions.Item label="请求参数">{item.requestParams}</Descriptions.Item>
        <Descriptions.Item label="请求头">{item.requestHeader}</Descriptions.Item>
        <Descriptions.Item label="响应头">{item.responseHeader}</Descriptions.Item>
        <Descriptions.Item label="总调用次数">{item.totalNum}</Descriptions.Item>
        <Descriptions.Item label="剩余调用次数">{item.leftNum}</Descriptions.Item>
        <Descriptions.Item label="接口状态">{item.status === 0 && (<Tag color={"red"}>关闭</Tag>)}
          {item.status === 1 && (<Tag color={"green"}>开启</Tag>)}
        </Descriptions.Item>
      </Descriptions>
    )
  }))

  //下载SDK
  const downloadSDK = async () => {
    try {
      const link = document.createElement('a');
      link.href = 'http://localhost:9000/api/user/download/jar';
      // 设置下载属性，让浏览器弹出下载对话框
      link.setAttribute('download', '');
      document.body.appendChild(link);
      // 触发点击事件，开始下载
      link.click();
      // 下载完成后移除元素
      document.body.removeChild(link);
      message.success('下载成功');
    } catch (error) {
      message.error('下载失败');
    }
  }

  useEffect(() => {
    listInvokeRecords().then()
    getKeyData().then()
  }, []);

  return (
    <PageContainer>
      <Card>
        <Collapse items={items}/>
      </Card>
      <Divider/>
      <Card title={"开发者密钥（访问接口的凭证）"} extra={<Button onClick={applyKey} type={"link"}>重新生成</Button>}>
        <ProTable dataSource={[
          {
            accessKey: keyData?.accessKey,
            secretKey: keyData?.secretKey
          }
        ]} scroll={{y: 300}} pagination={false} search={false} options={false} bordered={true} columns={[
          {
            key: 'access',
            title: 'AccessKey',
            dataIndex: 'accessKey',
            render: (_, record) => (
              <Typography.Text copyable={true}>{show ? record.accessKey : "****************"}</Typography.Text>
            ),
          },
          {
            key: 'secret',
            title: 'SecretKey',
            dataIndex: 'secretKey',
            copyable: true,
            render: (_, record) => (
              <Typography.Text copyable={true}>{show ? record.secretKey : "****************"}</Typography.Text>
            )
          }
        ]}>
        </ProTable>
        <Button onClick={() => setShow(true)} style={{marginLeft: 10}} type={"link"}>显示密钥</Button>
        <Button onClick={downloadSDK} type={"link"}>下载SDK</Button>
      </Card>
    </PageContainer>
  )
}

export default Record
