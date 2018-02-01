import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Home.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = (rangePickerValue) => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = (type) => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;


    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };

    return (
      <div>
        <Row className={styles.trow} gutter={24}>
          <Col>
            <h2>通往世界顶级公司的职业道路</h2>
            <p className={styles.ptitle}>我们的使命是帮助人们实现他们的职业目标，使人们能够创造自己的明天。</p>
          </Col>
        </Row>
        <Row className={styles.mrow} gutter={24}>
          <Col {...topColResponsiveProps}>
            <a href="#/EduAdmin/StudentMag">
              <ChartCard
                bordered={false}
                title=""
                footer={<div><h3>教务管理</h3><p>在这里你可以对学生、员工及课程进行管理进行课表编排、企业信息的录入</p></div>}
                contentHeight={86}
              >
                <img src="./public/pic/u46.png" />
              </ChartCard>
            </a>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title=""
              footer={<div><h3>课程建设</h3><p>对课程的规划，师资队伍建设，教学内容及课程体系建设，教学方法与手段建设</p></div>}
              contentHeight={86}
            >
              <img src="./public/pic/u48.png" />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                title=""
                footer={<div><h3>考试管理</h3><p>在这里对课程题库进行补充与完善，试卷筛选制定试卷评分规则、教师与助教评分并上传</p></div>}
                contentHeight={86}
              >
                <img src="./public/pic/u52.png" />
            </ChartCard>
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                title=""
                footer={<div><h3>模拟面试</h3><p>对即将就业的学生进行笔试与面试的考核，以及评分与评价</p></div>}
                contentHeight={86}
              >
                <img src="./public/pic/u50.png" />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                title=""
                footer={<div><h3>简历修改</h3><p>对学生简历进行评价、更改及上传优化简历</p></div>}
                contentHeight={86}
              >
                <img src="./public/pic/u54.png" />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                title=""
                footer={<div><h3>权限管理</h3><p>对每种身份用户的操作权限进行权限的设置与管理</p></div>}
                contentHeight={86}
              >
                <img src="./public/pic/u56.png" />
            </ChartCard>
          </Col>
        </Row>

        
      </div>
    );
  }
}
