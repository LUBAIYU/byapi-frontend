import React, {useEffect, useState} from "react";
import {PageContainer} from "@ant-design/pro-components";
import {listInterfaceInfosByPageUsingGet} from "@/services/byapi-backend/interfaceInfoController";
import {List, message} from "antd";

const Index: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<API.InterfaceInfoVo[]>([]);
  const [total, setTotal] = useState<number>(0);

  //获取接口数据列表
  const getDataList = async (current = 1, pageSize = 10) => {
    setLoading(true);
    const res = await listInterfaceInfosByPageUsingGet({current, pageSize});
    if (res.code === 200) {
      setDataList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } else {
      message.error(res.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <PageContainer title="在线接口开放平台">
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="detail" href={`/interface_info/${item.id}`}>查看</a>]}
          >
            <List.Item.Meta
              title={<a key="name" href={`/interface_info/${item.id}`}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
        pagination={{
          total,
          pageSize: 10,
          showTotal: (total) => {
            return `共 ${total} 条数据`
          },
          onChange: (current, pageSize) => {
            getDataList(current, pageSize);
          }
        }}
      />
    </PageContainer>
  )
}

export default Index;
