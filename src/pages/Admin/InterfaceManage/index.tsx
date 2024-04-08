import React, {useRef, useState} from "react";
import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, message, Popconfirm} from "antd";
import {
  addInterfaceInfoUsingPost,
  delInterfaceInfoUsingDelete,
  listInterfaceInfosByPageUsingGet,
  updateInterfaceInfoStatusUsingPut,
  updateInterfaceInfoUsingPut
} from "@/services/byapi-backend/interfaceInfoController";
import {PlusOutlined} from "@ant-design/icons";
import UpdateModal from "@/pages/Admin/InterfaceManage/components/UpdateModal";
import AddModal from "@/pages/Admin/InterfaceManage/components/AddModal";

const InterfaceInfoManage: React.FC = () => {
  //引用对象
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoVo>()
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  /**
   * 新增接口
   */
  const addInterfaceInfo = async (fields: API.InterfaceInfoAddDto) => {
    const hide = message.loading("新增中");
    const res = await addInterfaceInfoUsingPost({
      ...fields
    })
    hide();
    if (res.code === 200) {
      message.success("新增成功");
      handleAddModalVisible(false);
      actionRef.current?.reload();
    } else {
      message.error(res.message);
    }
  };

  /**
   * 修改接口
   */
  const updateInterfaceInfo = async (fields: API.InterfaceInfoVo) => {
    const hide = message.loading("修改中");
    const res = await updateInterfaceInfoUsingPut({
      id: currentRow?.id,
      ...fields
    })
    hide();
    if (res.code === 200) {
      message.success("修改成功");
      handleUpdateModalVisible(false);
      setCurrentRow(undefined);
      actionRef.current?.reload();
    } else {
      message.error(res.message);
    }
  };

  /**
   * 删除接口
   */
  const deleteInterfaceInfo = async (record: API.InterfaceInfoVo) => {
    const hide = message.loading("删除中");
    if (!record) {
      return;
    }
    const res = await delInterfaceInfoUsingDelete({
      id: record.id
    } as API.delInterfaceInfoUsingDELETEParams)
    hide();
    if (res.code === 200) {
      message.success("删除成功");
      actionRef.current?.reload();
    } else {
      message.error(res.message);
    }
  };

  /**
   * 修改接口状态
   */
  const updateStatus = async (record: API.InterfaceInfoVo) => {
    const hide = message.loading("修改中");
    let newStatus = 0;
    if (record.status === 0) {
      newStatus = 1;
    }
    const res = await updateInterfaceInfoStatusUsingPut({
      id: record.id,
      status: newStatus
    });
    hide();
    if (res.code === 200) {
      message.success("修改成功");
      actionRef.current?.reload();
    } else {
      message.error(res.message);
    }
  }

  //定义数据列表
  const columns: ProColumns<API.InterfaceInfoVo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      align: 'center',
      hideInForm: true,
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      align: 'center',
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'textarea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text',
      align: 'center',
    },
    {
      title: '请求类型',
      dataIndex: 'method',
      valueEnum: {
        'GET': {
          text: 'GET'
        },
        'POST': {
          text: 'POST',
        },
        'PUT': {
          text: 'PUT',
        },
        'DELETE': {
          text: 'DELETE',
        }
      },
      align: 'center',
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '接口状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default'
        },
        1: {
          text: '开启',
          status: 'Success'
        }
      },
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      align: 'center',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      align: 'center',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const buttons = [];
        buttons.push(
          <Button key="edit" type={"link"} onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}>
            修改
          </Button>,
          <Popconfirm key="pop" title="是否删除" description="确定删除这条数据吗？"
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => deleteInterfaceInfo(record)}
                      onCancel={() => {
                        message.info("已取消删除");
                      }}>
            <Button key="delete" type={"link"} danger>
              删除
            </Button>
          </Popconfirm>
        );
        if (record.status === 0) {
          buttons.push(
            <Button key="online" type={"link"} onClick={() => updateStatus(record)}>
              发布
            </Button>
          )
        } else {
          buttons.push(
            <Button key="outline" danger type={"link"} onClick={() => updateStatus(record)}>
              下线
            </Button>
          )
        }
        ;
        return buttons;
      },
      align: 'center',
    }
  ]

  return (
    <PageContainer>
      <ProTable<API.InterfaceInfoVo, API.listInterfaceInfosByPageUsingGETParams>
        headerTitle={"接口管理"}
        rowKey="key"
        actionRef={actionRef}
        scroll={{x: true}}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleAddModalVisible(true);
            }}
          >
            <PlusOutlined/> 新增接口
          </Button>,
        ]}
        request={async (
          params,
        ) => {
          const res = await listInterfaceInfosByPageUsingGet({
            ...params
          });
          if (res.data) {
            return {
              data: res?.data.records,
              success: true,
              total: res?.data.total,
            }
          }
          return {
            data: [],
            success: false,
            total: 0
          }
        }}
        columns={columns}>
      </ProTable>
      <AddModal columns={columns}
                onCancel={() => {
                  handleAddModalVisible(false);
                }}
                onSubmit={async (values) => {
                  await addInterfaceInfo(values);
                }}
                visible={addModalVisible}>
      </AddModal>
      <UpdateModal columns={columns} visible={updateModalVisible}
                   onCancel={() => {
                     handleUpdateModalVisible(false);
                   }}
                   onSubmit={async (values) => {
                     await updateInterfaceInfo(values)
                   }}
                   values={currentRow || {}}>
      </UpdateModal>
    </PageContainer>
  )
}

export default InterfaceInfoManage;
