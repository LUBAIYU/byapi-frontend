import {BookFilled, GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={'2024 路白榆出品'}
      links={[
        {
          key: 'blog',
          title: (
            <span>
              <span style={{marginRight: 5}}>Blog</span>
              <BookFilled/>
            </span>
          ),
          href: 'https://pro-test.asia',
          blankTarget: true,
        },
        {
          key: 'Github',
          title: (
            <span>
              <span style={{marginRight: 5}}>GitHub</span>
               <GithubOutlined/>
            </span>
          ),
          href: 'https://github.com/LUBAIYU',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
