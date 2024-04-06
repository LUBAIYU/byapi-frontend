import React, {useRef, useState} from "react";
import {type ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {
  deleteUserUsingDelete,
  listUsersByPageUsingGet,
  updateUserUsingPut
} from "@/services/byapi-backend/userController";
import {Button, Image, message, Popconfirm} from "antd";
import UpdateModal from "@/pages/User/UserManage/components/UpdateModal";

const UserManage: React.FC = () => {

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.User>();

  /**
   * 更新用户数据
   * @param fields
   */
  const handleUpdate = async (fields: API.UserVo) => {
    const hide = message.loading('正在修改');
    const res = await updateUserUsingPut({
      id: currentRow?.id,
      ...fields
    });
    hide();
    if (res.code === 200) {
      message.success('修改成功');
      handleUpdateModalVisible(false);
      actionRef.current?.reload();
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  /**
   * 根据ID删除用户数据
   * @param record
   */
  const handleRemove = async (record: API.UserVo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    const res = await deleteUserUsingDelete({
      id: record.id
    } as API.deleteUserUsingDELETEParams);
    hide();
    if (res.code === 200) {
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };

  //定义数据列表
  const columns: ProColumns<API.UserVo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      width: 100,
      align: "center",
      hideInForm: true
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
      width: 100,
      align: "center",
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      width: 100,
      align: "center",
    },
    {
      title: '用户头像',
      hideInSearch: true,
      width: 100,
      align: "center",
      render: (_, record) => {
        return record.userAvatar ? (
          <Image src={record.userAvatar} width={100} height={100}/>
        ) : <div>-</div>
      },
      hideInForm: true
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: {
          text: '男',
        },
        1: {
          text: '女',
        }
      },
      width: 100,
      align: "center",
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '启用',
          status: 'Success',
        },
        1: {
          text: '禁用',
          status: 'Default'
        }
      },
      width: 100,
      align: "center",
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueEnum: {
        'admin': {
          text: '管理员'
        },
        'user': {
          text: '普通用户'
        }
      },
      hideInSearch: true,
      width: 100,
      align: "center",
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 200,
      align: "center",
      hideInForm: true
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 200,
      align: "center",
      hideInForm: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button key="edit" type={"link"} onClick={() => {
          handleUpdateModalVisible(true);
          setCurrentRow(record);
        }}>
          修改
        </Button>,
        <Popconfirm key="pop" title="是否删除" description="确定删除这条数据吗？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => handleRemove(record)}
                    onCancel={() => {
                      message.info("已取消删除");
                    }}>
          <Button key="del" type={"link"} danger>
            删除
          </Button>
        </Popconfirm>
      ],
      align: "center",
    }
  ]

  return (
    <PageContainer>
      <ProTable<API.UserVo, API.listUsersByPageUsingGETParams>
        headerTitle={"用户管理"}
        rowKey="key"
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={async (
          params,
        ) => {
          const res = await listUsersByPageUsingGet({
            current: params.current,
            pageSize: params.pageSize,
            id: params.id,
            userName: params.userName,
            userAccount: params.userAccount,
            gender: params.gender,
            status: params.status
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
        columns={columns}
      >
      </ProTable>
      <UpdateModal columns={columns} onSubmit={async (values) => {
        const success = await handleUpdate(values);
        if (success) {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }} onCancel={() => {
        handleUpdateModalVisible(false)
      }} visible={updateModalVisible} values={currentRow || {}}/>
    </PageContainer>
  )
}

export default UserManage;
