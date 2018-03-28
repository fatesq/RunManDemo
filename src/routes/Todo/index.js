import React from 'react';
import { Icon, Form } from 'antd';
import { WingBlank, List, InputItem, Stepper, WhiteSpace, Radio, Flex, Tag, Checkbox, DatePicker } from 'antd-mobile';
import { Link } from 'dva/router';
import styles from './index.less';


const { Item } = List;
const { RadioItem } = Radio;
@Form.create()
export default class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInsured: false,
      radio: 1,
      tip: 1,
    };
  }
  onRadioChange = (radio) => {
    this.setState({ radio });
  }

  onChangeTip = (val) => {
    console.log(val);
    this.setState({ tip: val });
  }
  handleShowInsured = () => {
    this.setState({ showInsured: !this.state.showInsured });
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <List>
          <Item><div className={styles.center}>附近有 <a>3</a> 位跑男为您服务</div></Item>
          <Item>
            <Flex>
              <Flex.Item>
                <Radio checked={this.state.radio === 0} name="logId" onChange={() => this.onRadioChange(0)}>
                  需要取资料
                </Radio>
              </Flex.Item>
              <Flex.Item style={{ textAlign: 'right' }}>
                <Radio className={styles['my-radio']} checked={this.state.radio === 1} name="logId" onChange={() => this.onRadioChange(1)}>
                  不需要取资料
                </Radio>
              </Flex.Item>
            </Flex>
          </Item>
          {this.state.radio === 0 ? <Item arrow="horizontal" onClick={() => {}}>取资料地址</Item> : ''}
          <Link to="/map"><Item arrow="horizontal" onClick={() => {}}>填写办事地址</Item></Link>
          <Item align="top" multipleLine>
            <DatePicker
              okText="确定"
              dismissText="取消"
              value={this.state.date}
              onChange={date => console.log(date)}
            >
              <div className={styles.center}><Icon type="clock-circle-o" /> 立刻发单</div>
            </DatePicker>
          </Item>
          <InputItem
            {...getFieldProps('account', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: 'Please input account' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            placeholder="输入时间不少于"
            extra="min"
          >购买时长
          </InputItem>
          <div className={styles['tag-container']}>
            <Flex wrap="wrap">
              {['其他', '医院排队', '小时工', '万能排队', '照看宠物', '餐厅占座' ].map((i) => {
                return <Tag className={styles.goodsTag} key={i} >{i}</Tag>;
              })}
            </Flex>
          </div>
          <InputItem
            {...getFieldProps('account', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: 'Please input account' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            placeholder="请输入您的备注信息"
          >备注信息
          </InputItem>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <Item
            extra={
              <Stepper
                style={{ width: '100%', minWidth: '100px' }}
                showNumber
                min={0}
                value={this.state.tip}
                onChange={this.onChangeTip}
              />
            }
          >
            小费
          </Item>
          <Item extra={`￥ ${1}`}>夜班津贴</Item>
          <Item extra={`￥ ${1}`}>跑腿费</Item>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <Item>
            支付方式
            <RadioItem
              style={{ paddingLeft: 0 }}
              checked
              onChange={() => { }}
            >
              <Icon type="wechat" style={{ color: '#1aad19' }} />&nbsp;微信支付
            </RadioItem>
          </Item>
        </List>
        <WhiteSpace />
        <div className={styles.actionBarContainer}>
          <div className={styles.actionBarWrap}>
            <div className={styles.left}>
              1234
            </div>
            <div className={styles.trade}>
              <a className={styles.buy} role="button">
                发布
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
