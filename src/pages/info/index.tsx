import React, {useEffect, useState} from "react";
import {PageContainer} from "@ant-design/pro-components";
import {Button, Card, Form, GetProp, Input, message, Select, Upload, UploadProps} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {useModel} from "@umijs/max";
import {getLoginUserUsingGet, updateUserUsingPut} from "@/services/byapi-backend/userController";

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
  const {setInitialState} = useModel('@@initialState')
  const [loginUser, setLoginUser] = useState<API.User>()

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const res = info.file.response
      if (res.code === 200) {
        setLoginUser({
          ...loginUser,
          userAvatar: res.data
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

  //修改性别
  const genderChange = (value: number) => {
    setLoginUser({
      ...loginUser,
      gender: value
    })
  }

  //获取当前登录用户
  const getLoginUser = async () => {
    const res = await getLoginUserUsingGet()
    if (res.code === 200) {
      setLoginUser(res.data)
    } else {
      message.error(res.message)
    }
  }

  //修改信息
  const updateUserInfo = async () => {
    const res = await updateUserUsingPut(loginUser as API.UserUpdateDto)
    if (res.code === 200) {
      message.success('保存成功')
      setInitialState({
        loginUser: loginUser
      })
    } else {
      message.error(res.message)
    }
  }

  useEffect(() => {
    getLoginUser().then()
  }, []);

  return (
    <PageContainer>
      <Card style={{width: 1000}}>
        <Form>
          <Form.Item<FileType> label='头像'>
            <div style={{marginLeft: 110}}>
              <Upload
                name="multipartFile"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:9000/api/user/upload/avatar"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                withCredentials={true}
              >
                {loginUser?.userAvatar ?
                  <img width={100} height={100} src={loginUser?.userAvatar} alt="avatar"
                       style={{width: '100%'}}/> : uploadButton}
              </Upload>
            </div>
          </Form.Item>
          <Form.Item<FileType> label='昵称'>
            <Input onChange={(e) => {
              setLoginUser({
                ...loginUser,
                userName: e.target.value
              })
            }} value={loginUser?.userName} style={{width: 800, marginLeft: 110}}/>
          </Form.Item>
          <Form.Item<FileType> label='账号'>
            <Input onChange={(e) => {
              setLoginUser({
                ...loginUser,
                userAccount: e.target.value
              })
            }} value={loginUser?.userAccount} style={{width: 800, marginLeft: 110}}/>
          </Form.Item>
          <Form.Item<FileType> label='邮箱'>
            <Input onChange={(e) => {
              setLoginUser({
                ...loginUser,
                email: e.target.value
              })
            }} value={loginUser?.email} style={{width: 800, marginLeft: 110}}/>
          </Form.Item>
          <Form.Item<FileType> label='性别'>
            <Select allowClear={true} onChange={genderChange} value={loginUser?.gender}
                    style={{width: 800, marginLeft: 110}} options={[
              {value: 0, label: '男'},
              {value: 1, label: '女'}
            ]}/>
          </Form.Item>
          <Form.Item<FileType> label='角色'>
            <Input value={loginUser?.userRole} style={{width: 800, marginLeft: 110}} readOnly/>
          </Form.Item>
          <Form.Item>
            <Button onClick={updateUserInfo} style={{width: 500}} type={"primary"}>保存</Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  )
}

export default Info
