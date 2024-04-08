import {type ProColumns, ProFormInstance, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  columns: ProColumns<API.UserVo>[];
  onCancel: () => void;
  onSubmit: (values: API.UserVo) => Promise<void>;
  visible: boolean;
  values: API.UserVo;
};

const UpdateModal: React.FC<Props> = (props) => {
    const {values, onSubmit, onCancel, visible, columns} = props;
    const formRef = useRef<ProFormInstance>();
    // 提交表单
    const handleSubmit = async (values: API.UserVo) => {
      const currentGender = formRef.current?.getFieldValue("gender");
      const currentStatus = formRef.current?.getFieldValue("status");
      const newValues = {
        ...values,
        gender: currentGender === '男' || currentGender === '0' ? 0 : 1,
        status: currentStatus === '启用' || currentStatus === '0' ? 0 : 1
      }
      await onSubmit(newValues);
    };

    //监听values的变化
    useEffect(() => {
      if (formRef) {
        formRef.current?.setFieldsValue(values);
        const statusMap = {0: '启用', 1: '禁用'};
        const genderMap = {0: '男', 1: '女'};
        formRef.current?.setFieldsValue({
          gender: values.gender === 0 ? genderMap[0] : genderMap[1],
          status: values.status === 0 ? statusMap[0] : statusMap[1]
        });
      }
    }, [values]);
    return (
      <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
        <ProTable
          formRef={formRef}
          type={'form'}
          columns={columns}
          onSubmit={async (value) => {
            handleSubmit?.(value);
          }}
        ></ProTable>
      </Modal>
    );
  }
;
export default UpdateModal;
