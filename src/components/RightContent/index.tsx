import {QuestionCircleOutlined} from '@ant-design/icons';
import '@umijs/max';

export type SiderTheme = 'light' | 'dark';
export const SelectLang = () => {
  return
};
export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://gitee.com/lzh_666/byapi-frontend');
      }}
    >
      <QuestionCircleOutlined/>
    </div>
  );
};
