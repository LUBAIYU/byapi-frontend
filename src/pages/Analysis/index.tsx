import { getInvokeCountListUsingGet } from '@/services/byapi-backend/userInterfaceController';
import { PageContainer } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';

const Analysis: React.FC = () => {
  //保存接口名称的值
  const [nameList] = useState<string[]>([]);
  //保存接口调用数量的值
  const [countList] = useState<number[]>([]);
  //保存图表实例
  let chart: any;

  //定义图表配置
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: [] as string[],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [] as number[],
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  };

  //初始化图表
  const initChart = () => {
    chart = echarts.init(document.getElementById('chart'));
  };

  //获取接口名称和调用数量
  const getInvokeCountList = async () => {
    const res = await getInvokeCountListUsingGet();
    if (res.code === 200) {
      res.data?.forEach((item: API.InvokeCountVo) => {
        nameList.push(item.name ?? '');
        countList.push(item.count ?? 0);
      });
      option.xAxis[0].data = nameList;
      option.series[0].data = countList;
      chart.setOption(option);
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    initChart();
    getInvokeCountList().then();
  }, []);

  return (
    <PageContainer>
      <Card title={'接口调用次数统计'}>
        <div id={'chart'} style={{ width: 500, height: 400 }}></div>
      </Card>
    </PageContainer>
  );
};

export default Analysis;
