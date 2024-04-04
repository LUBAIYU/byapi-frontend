import React from "react";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import {Modal} from "antd";

export type Props = {
  columns: ProColumns<API.InterfaceInfoVo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoVo) => Promise<void>;
  visible: boolean;
}
const AddModal: React.FC<Props> = (props) => {
  const {columns, visible, onSubmit, onCancel} = props;
  return (
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      ></ProTable>
    </Modal>
  );
}
export default AddModal;
