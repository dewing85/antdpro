import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, Popconfirm } from 'antd';
import StandardTable from '../../../components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './StudentMag.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['--', '多次重修', '签证即将到期', '需要调班'];
// const columns = [
//   {
//     title: '规则编号',
//     dataIndex: 'no',
//   },
//   {
//     title: '描述',
//     dataIndex: 'description',
//   },
//   {
//     title: '服务调用次数',
//     dataIndex: 'callNo',
//     sorter: true,
//     align: 'right',
//     render: val => `${val} 万`,
//     // mark to display a total number
//     needTotal: true,
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     filters: [
//       {
//         text: status[0],
//         value: 0,
//       },
//       {
//         text: status[1],
//         value: 1,
//       },
//       {
//         text: status[2],
//         value: 2,
//       },
//       {
//         text: status[3],
//         value: 3,
//       },
//     ],
//     render(val) {
//       return <Badge status={statusMap[val]} text={status[val]} />;
//     },
//   },
//   {
//     title: '更新时间',
//     dataIndex: 'updatedAt',
//     sorter: true,
//     render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
//   },
//   {
//     title: '操作',
//     render: () => (
//       <Fragment>
//         <a href="">配置</a>
//         <Divider type="vertical" />
//         <a href="">订阅警报</a>
//       </Fragment>
//     ),
//   },
// ];

const EditableCell = ({ editable, value, onChange }) => {
  return (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  )
};

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="描述"
      >
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input placeholder="请输入" />
          )}
      </FormItem>
    </Modal>
  );
});

const CreateChangeForm = Form.create()((props) => {
  const { changemodalVisible, form, handleAdd, handlechangeModalVisible, id, course } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      handleAdd(fieldsValue, id);
    });
  };
  return (
    <Modal
      title="转班"
      visible={changemodalVisible}
      onOk={okHandle}
      onCancel={() => handlechangeModalVisible(false, id)}
    >


      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="目前所在班级"
      >
        {course}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="将转到班级"
      >
        {form.getFieldDecorator('courseid', {
          rules: [{ required: true, message: 'Please input some course...' }],
        })(
          <Select style={{ width: 320 }}>
            <Option value="0">全栈开发项目实践课程2017Fall01</Option>
            <Option value="1">软件工程师旗舰核心课程2017Fall01、全栈开发</Option>
            <Option value="2">人工智能与数据科学强化课程2017Fall01</Option>
          </Select>
          )}
      </FormItem>
    </Modal>
  );
});

@connect(({ student, loading }) => ({
  student,
  loading: loading.models.student,
}))
@Form.create()
export default class StudentMag extends PureComponent {
  state = {
    data:[],
    cacheData:[],
    modalVisible: false,
    changemodalVisible: false,
    changeid: 0,
    changecourse: '',
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'student/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'student/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'student/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'student/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'student/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    window.location.href = "#/eduadmin/studentadd";
    // this.setState({
    //   modalVisible: !!flag,
    // });
  }

  handlechangeModalVisible = (flag, id, course) => {
    this.setState({
      changeid: id,
      changecourse: course,
      changemodalVisible: !!flag,
    });
  }

  removeStudent = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'student/remove',
      payload: {
        id: id,
      },
      callback: () => {
        message.success('删除成功' + id);
        // this.setState({
        //   selectedRows: [],
        // });
      },
    });

  }

  handleAdd = (fields, id) => {
    console.log("cid:" + fields.courseid + "  id:" + id);
    this.props.dispatch({
      type: 'student/updatecourseid',
      payload: {
        courseid: fields.courseid,
        id: id,
      },
      callback: () => {
        message.success('添加成功');
        this.setState({
          modalVisible: false,
        })
      },
    });
  }

  handleChange = (fields) => {
    this.props.dispatch({
      type: 'student/add',
      payload: {
        description: fields.desc,
      },
      callback: () => {
        message.success('修改成功');
        this.setState({
          changemodalVisible: false,
        })
      },
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="课程：">
              {getFieldDecorator('courseid')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">全栈开发项目实践课程</Option>
                  <Option value="1">软件工程师旗舰核心课程</Option>
                  <Option value="2">人工智能与数据科学强化课程</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="班级：">
              {getFieldDecorator('classid')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="10">2017Fall01</Option>
                  <Option value="9">2017Summer03</Option>
                  <Option value="8">2017Summer02</Option>
                  <Option value="7">2017Summer01</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="输入关键词：">
              {getFieldDecorator('key')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  handleItemChange(value, key, column) {
    console.log(value);
    const newData = [...this.state.data.list];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  renderColumns(text, record, column) {
    return (
      <div>
        <EditableCell
          editable={record.editable}
          value={text}
          onChange={value => this.handleItemChange(value, record.key, column)}
        />
      </div>
    );
  }

  edit(key) {
    const newData = [...this.state.data.list];
    const target = newData.filter(item => key === item.key)[0];
    console.log(target);
    if (target) {
      target.editable = true;
      this.setState({ data: {list:newData} });
    }
  }
  save(key) {
    const newData = [...this.state.data.list];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      this.handleFormReset();
      // delete target.editable;
      // this.setState({ data: newData });
      // this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data.list];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      this.handleFormReset();
      // Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      // delete target.editable;
      // this.setState({ data: {list:newData} });
    }
  }

  render() {


    const { student: { data }, loading } = this.props;
    const { selectedRows, modalVisible, changemodalVisible, changeid, changecourse } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const parentMethods2 = {
      handleAdd: this.handleAdd,
      handlechangeModalVisible: this.handlechangeModalVisible,
    };

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        render: (text, record, index) => {
          return (
            this.renderColumns(text, record, 'name')
          )
        },
      },
      {
        title: '学号',
        dataIndex: 'no',
      },
      {
        title: '邮件',
        dataIndex: 'email',
        render: (text, record, index) => {
          return (
            this.renderColumns(text, record, 'email')
          )
        },
      },
      {
        title: '电话',
        dataIndex: 'tel',
        render: (text, record, index) => {
          return (
            this.renderColumns(text, record, 'tel')
          )
        },
      },
      {
        title: '课程',
        dataIndex: 'course',
      },
      {
        title: '标签',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
        render: (text, record, index) => {
          const id = record.id;
          const course = record.course;
          const { editable } = record;
          return (
            <Fragment>
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                      <a onClick={() => this.save(record.key)}>Save</a>
                      <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                    : <a onClick={() => this.edit(record.key)}>{record.key}Edit</a>
                }
              </div>

              <a href="" >详情</a>
              <Divider type="vertical" />
              <Popconfirm title="确定删除?" onConfirm={() => this.removeStudent(id)}>
                <a>删除</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => this.handlechangeModalVisible(true, id, course)}>转班</a>
            </Fragment>
          )
        },
      },
    ];
    console.log(data.list);

    // if (data.list.length > 0) {
      this.state.data = data;
      // console.log(data.list.map(item => ({ ...item })));
      this.state.cacheData = data.list.map(item => ({ ...item }));

    // }

    return (
      <div>
        {/* <PageHeaderLayout title="学生管理"> */}
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderSimpleForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增学生
              </Button>
              {/* {
                selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              } */}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
        <CreateChangeForm
          {...parentMethods2}
          id={changeid}
          course={changecourse}
          changemodalVisible={changemodalVisible}
        />
        {/* </PageHeaderLayout> */}
      </div>
    );
  }
}
