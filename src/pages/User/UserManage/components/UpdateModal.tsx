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
    //监听values的变化
    useEffect(() => {
      if (formRef) {
        formRef.current?.setFieldsValue(values);
      }
    }, [values]);
    return (
      <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
        <ProTable
          formRef={formRef}
          type={'form'}
          columns={columns}
          onSubmit={async (value) => {
            onSubmit?.(value);
          }}
        ></ProTable>
      </Modal>
    );
  }
;
export default UpdateModal;
