import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Tabs, Row, Col, Upload,
} from 'antd';
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import moment from 'moment';
import styles from './StudentAdd.less';
const Dragger = Upload.Dragger;
const upload_props = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const TabPane = Tabs.TabPane;

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD';
let uuid = 0;
let uuid2 = 0;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class StudentAdd extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      console.log(values);
      if (!err) {
        // this.props.dispatch({
        //   type: 'form/submitRegularForm',
        //   payload: values,
        // });
      }
    });
  }

  taghandleChange = (value) => {
    console.log(`selected ${value}`);
  }

  renderForm1() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const tagchildren = [];
    for (let i = 10; i < 36; i++) {
      tagchildren.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return (

      <Card bordered={false}>

        <Form
          onSubmit={this.handleSubmit}
          // hideRequiredMark
          style={{ marginTop: 8 }}
        >

          <Row gutter={16}>

            <Col span={12}>

              <FormItem
                {...formItemLayout}
                label="姓名"
                hasFeedback
              >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: '请输入姓名',
                  }],
                })(
                  <Input placeholder="请输入姓名" />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="国籍"
              >
                {getFieldDecorator('guoji', {
                  rules: [{
                    required: true, message: '请输入国籍',
                  }],
                })(
                  <Input placeholder="请输入国籍" />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="学号"
              >
                {getFieldDecorator('no', {
                  rules: [{
                    required: true, message: '请输入学号',
                  }],
                })(
                  <Input placeholder="请输入学号" />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="联系方式"
              >
                {getFieldDecorator('tel', {
                  rules: [{
                    required: true, message: '请输入电话号码',
                  }],
                })(
                  <Input type="tel" placeholder="请输入电话号码" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="电子邮箱"
              >
                {getFieldDecorator('teacher_email', {
                  rules: [{
                    type: 'email', message: '邮件格式不正确!',
                  }, {
                    required: true, message: '请输入邮件地址!',
                  }],
                })(
                  <Input type="email" placeholder="请输入邮件地址" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="WeChat"
              >
                {getFieldDecorator('wechat', {

                })(
                  <Input type="tel" placeholder="请输入微信号" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="LinkedIn"
              >
                {getFieldDecorator('linkedin', {

                })(
                  <Input type="tel" placeholder="请输入linkedin" />
                  )}
              </FormItem>


              <FormItem
                {...formItemLayout}
                label="标签"
              >
                {getFieldDecorator('labels', {})(
                  <Select
                    mode="multiple"
                    placeholder="打标签"
                    onChange={this.taghandleChange}
                    tokenSeparators={[',']}
                  >
                    {tagchildren}
                  </Select>
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="备注"
              >
                {getFieldDecorator('goal', {

                })(
                  <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={4} />
                  )}
              </FormItem>

            </Col>
            <Col span={12}>

              <FormItem
                {...formItemLayout}
                label="性别"
              >
                {getFieldDecorator('sex', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="0">女</Radio>
                  </Radio.Group>
                  )}

              </FormItem>

              <FormItem
                {...formItemLayout}
                label="出生日期"
              >
                {getFieldDecorator('birthday', {
                  rules: [{ type: 'object', required: true, message: '请输入生日!' }],
                  initialValue: moment("1995/01/01", dateFormat),
                })(
                  <DatePicker format={dateFormat} />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="班级"
              >
                <div>
                  {getFieldDecorator('courseid', {
                    rules: [{
                      required: true, message: '请输入标题',
                    }],
                  })(
                    <Select
                      placeholder="课程名"
                      style={{
                        margin: '8px 0', padding: '0', width: '45%'
                      }}
                    >
                      <Option value="1">课程名1</Option>
                      <Option value="2">课程名2</Option>
                      <Option value="3">课程名3</Option>
                    </Select>
                    )}
                  {getFieldDecorator('classid', {
                    rules: [{
                      required: true, message: '请选择班级',
                    }],
                  })(
                    <Select
                      placeholder="班级"
                      style={{
                        margin: '8px 10px', padding: '0', width: '45%'
                      }}
                    >
                      <Option value="1">班级1</Option>
                      <Option value="2">班级2</Option>
                      <Option value="3">班级3</Option>
                    </Select>
                    )}
                </div>
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="Weibo"
              >
                {getFieldDecorator('weibo', {

                })(
                  <Input type="tel" placeholder="请输入Weibo号" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="Facebook"
              >
                {getFieldDecorator('facebook', {

                })(
                  <Input type="tel" placeholder="请输入Facebook号" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="Twitter"
              >
                {getFieldDecorator('twitter', {

                })(
                  <Input type="tel" placeholder="请输入Twitter号" />
                  )}
              </FormItem>

            </Col>
          </Row>

        </Form>
      </Card>
    );
  }

  formremove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  formadd = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  renderForm2() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;


    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <Row gutter={16}
          key={k}
          className={styles.formitems_body}
        >
          <Col span={12}>

            <FormItem
              {...formItemLayout}
              label="学校"
              hasFeedback
            >
              {getFieldDecorator('school-' + k, {
                rules: [{
                  required: true, message: '请输入学校名',
                }],
              })(
                <Input placeholder="请输入学校名" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="专业"
            >
              {getFieldDecorator('zhuanye-' + k, {
                rules: [{
                  required: true, message: '请输入专业',
                }],
              })(
                <Input placeholder="请输入专业" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('goal2-' + k, {

              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={4} />
                )}
            </FormItem>
          </Col>
          <Col span={12}>

            <FormItem
              {...formItemLayout}
              label="时间"
            >
              {getFieldDecorator('date-' + k, {
                rules: [{
                  required: true, message: '请选择起止时间',
                }],
              })(
                <RangePicker style={{ width: '100%' }} placeholder={['开始时间', '结束时间']} />
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="学历/学位"
            >
              {getFieldDecorator('degree-' + k, {
                rules: [{
                  required: true, message: '请选择 学历/学位',
                }],
              })(
                <Select
                  placeholder="学历/学位"
                  style={{
                    margin: '8px 0', padding: '0'
                  }}
                >
                  <Option value="1">学历/学位1</Option>
                  <Option value="2">学历/学位2</Option>
                  <Option value="3">学历/学位3</Option>
                </Select>
                )}

            </FormItem>

            <FormItem
              {...formItemLayout}
              label="清除"
            >
              <Icon
                className={styles.dynamic_delete_button}
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.formremove(k)}
              />

            </FormItem>

          </Col>
        </Row>
      );
    });

    return (

      <div>

        
          <Form
            onSubmit={this.handleSubmit}
            // hideRequiredMark
            style={{ marginTop: 8 }}
          >

            {formItems}

          </Form>

          <div className={styles.plus_div}>
            <Button type="dashed" onClick={this.formadd} style={{ width: '30%' }}>
              <Icon type="plus" />添加</Button>
          </div>

        
      </div>
    );
  }


  formremove2 = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const key2s = form.getFieldValue('key2s');
    // We need at least one passenger
    if (key2s.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      key2s: key2s.filter(key => key !== k),
    });
  }

  formadd2 = () => {
    uuid2++;
    const { form } = this.props;
    // can use data-binding to get
    const key2s = form.getFieldValue('key2s');
    const nextKeys = key2s.concat(uuid2);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      key2s: nextKeys,
    });
  }

  renderForm3() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    getFieldDecorator('key2s', { initialValue: [0] });
    const key2s = getFieldValue('key2s');
    const formItem2s = key2s.map((k, index) => {
      return (
        <Row gutter={16}
          key={k}
          className={styles.formitems_body}
        >

          <Col span={12}>

            <FormItem
              {...formItemLayout}
              label="企业名称"
              hasFeedback
            >
              {getFieldDecorator('enterprise-' + k, {
              })(
                <Input placeholder="请输入企业名称" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="行业类别"
            >
              {getFieldDecorator('industry-' + k, {
              })(
                <Select
                  placeholder="请选择行业类别"
                  style={{
                    margin: '8px 0', padding: '0',
                  }}
                >
                  <Option value="1">学历/学位1</Option>
                  <Option value="2">学历/学位2</Option>
                  <Option value="3">学历/学位3</Option>
                </Select>
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="企业性质"
            >
              {getFieldDecorator('nature-' + k, {
              })(
                <Select
                  placeholder="请选择企业性质"
                  style={{
                    margin: '8px 0', padding: '0',
                  }}
                >
                  <Option value="1">学历/学位1</Option>
                  <Option value="2">学历/学位2</Option>
                  <Option value="3">学历/学位3</Option>
                </Select>
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="职位月薪"
              hasFeedback
            >
              {getFieldDecorator('salary-' + k, {
              })(
                <InputNumber formatter={value => `$ ${value}`} />
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('goal3-' + k, {

              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={4} />
                )}
            </FormItem>
          </Col>
          <Col span={12}>

            <FormItem
              {...formItemLayout}
              label="工作时间"
            >
              {getFieldDecorator('date3-' + k, {
                rules: [{
                  required: true, message: '请选择起止时间',
                }],
              })(
                <RangePicker style={{ width: '100%' }} placeholder={['开始时间', '结束时间']} />
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="职位名称"
              hasFeedback
            >
              {getFieldDecorator('position-' + k, {
              })(
                <Input placeholder="请输入职位名称" />
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="企业规模"
            >
              {getFieldDecorator('scale-' + k, {
                rules: [{
                  required: true, message: '请选择企业规模 ',
                }],
              })(
                <Select
                  placeholder="企业规模"
                  style={{
                    margin: '8px 0', padding: '0',
                  }}
                >
                  <Option value="1">学历/学位1</Option>
                  <Option value="2">学历/学位2</Option>
                  <Option value="3">学历/学位3</Option>
                </Select>
                )}

            </FormItem>

            <FormItem
              {...formItemLayout}
              label="清除"
            >
              <Icon
                className={styles.dynamic_delete_button}
                type="minus-circle-o"
                disabled={key2s.length === 1}
                onClick={() => this.formremove2(k)}
              />

            </FormItem>

          </Col>
        </Row>
      );
    });

    return (

      <div>

        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            // hideRequiredMark
            style={{ marginTop: 8 }}
          >

            {formItem2s}

          </Form>

          <div className={styles.plus_div}>
            <Button type="dashed" onClick={this.formadd2} style={{ width: '30%' }}>
              <Icon type="plus" />添加</Button>
          </div>

        </Card>
      </div>
    );
  }


  renderForm4() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 16 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const tagchildren = [];
    for (let i = 10; i < 36; i++) {
      tagchildren.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return (
      <Card bordered={false}>

        <Form
          onSubmit={this.handleSubmit}
          // hideRequiredMark
          style={{ marginTop: 8 }}
        >

          <FormItem
            {...formItemLayout}
            label="标题"
            hasFeedback
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入标题',
              }],
            })(
              <Input placeholder="请输入标题" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注"
          >
            {getFieldDecorator('beizhu', {
              rules: [{
                required: true, message: '请输入备注',
              }],
            })(
              <Input placeholder="请输入备注" />
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={<b>上传简历</b>}
            hasFeedback
          >
            {getFieldDecorator('file', {
            })(
              <Input type="hidden" />
              )}
            <div style={{ marginTop: 16, height: 180, width: 320 }}>
              <Dragger {...upload_props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="cloud-upload" />
                </p>
                <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                <p className="ant-upload-hint">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</p>
              </Dragger>
            </div>
          </FormItem>

        </Form>
      </Card>
    );
  }

  render() {

    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (

      <div className="studentadd">


        <Tabs className={styles.tabstyleA} defaultActiveKey="1" onChange={this.callback} onTabClick={this.onclick} type='line'>

          <TabPane tab="基本信息" key="1" src="src1">
            <Card bordered={false}>
              <Row gutter={16} className={styles.formitems_title}>
                <Col span={24}><h4>修改个人信息（<i className={styles.i_color_f00}>*</i> 为必填项）</h4></Col>
              </Row>
              {this.renderForm1()}
            </Card>
          </TabPane>
          <TabPane tab="教育背景" key="2" src="src2">
            <Card bordered={false}>
              <Row gutter={16} className={styles.formitems_title}>
                <Col span={24}><h4>修改个人信息（<i className={styles.i_color_f00}>*</i> 为必填项）</h4></Col>
              </Row>
            </Card>
            {this.renderForm2()}
          </TabPane>
          <TabPane tab="工作经验" key="3" src="src3">
            <Card bordered={false}>
              <Row gutter={16} className={styles.formitems_title}>
                <Col span={24}><h4>修改个人信息（<i className={styles.i_color_f00}>*</i> 为必填项）</h4></Col>
              </Row>
              {this.renderForm3()}
            </Card>
          </TabPane>
          <TabPane tab="个人简历" key="4" src="src4">
            <Card bordered={false}>
              <Row gutter={16} className={styles.formitems_title}>
                <Col span={24}><h4>修改个人信息（<i className={styles.i_color_f00}>*</i> 为必填项）</h4></Col>
              </Row>
              {this.renderForm4()}
            </Card>
          </TabPane>

        </Tabs>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{ marginTop: 0, position: 'absolute', right: 40, top: 70 }}
        >
          <FormItem style={{ marginTop: 0 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              保存
            </Button>
          </FormItem>
        </Form>
      </div>

    );
  }
}
