import React, {useState} from "react";
import {PageContainer} from "@ant-design/pro-components";
import {Card, Form, GetProp, message, Upload, UploadProps} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {useModel} from "@umijs/max";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!').then();
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!').then();
    return isJpgOrPng && isLt2M;
  }
};

const Info: React.FC = () => {
  //加载状态
  const [loading, setLoading] = useState(false);
  //获取登录用户
  const {initialState, setInitialState} = useModel('@@initialState')

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const res = info.file.response
      if (res.code === 200) {
        setInitialState({
          loginUser: {
            userAvatar: res.data
          }
        })
      } else {
        message.error(res.message).then()
      }
    }
  };


  //上传按钮
  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type="button">
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
    </button>
  );

  return (
    <PageContainer>
      <Card>
        <Form>
          <Form.Item<FileType> label='头像'>
            <Upload
              name="multipartFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:9000/api/user/upload/avatar"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {initialState?.loginUser?.userAvatar ?
                <img width={100} height={100} src={initialState?.loginUser?.userAvatar} alt="avatar"
                     style={{width: '100%'}}/> : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  )
}

export default Info
