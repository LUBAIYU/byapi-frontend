import {type ProColumns, ProFormInstance, ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React, {useEffect, useRef} from 'react';


export type Props = {
  columns: ProColumns<API.InterfaceInfoVo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoVo) => Promise<void>;
  visible: boolean;
  values: API.InterfaceInfoVo;
};

const UpdateModal: React.FC<Props> = (props) => {
    const {values, onSubmit, onCancel, visible, columns} = props;
    const formRef = useRef<ProFormInstance>();
    //提交表单
    const handleSubmit = async (values: API.InterfaceInfoVo) => {
      const currentStatus = formRef.current?.getFieldValue("status");
      const newValues = {
        ...values,
        status: currentStatus === '关闭' || currentStatus === '0' ? 0 : 1
      };
      await onSubmit(newValues);
    }

    //监听values的变化
    useEffect(() => {
      if (formRef) {
        formRef.current?.setFieldsValue(values);
        const statusMap = {0: '关闭', 1: '开启'};
        formRef.current?.setFieldsValue({
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
