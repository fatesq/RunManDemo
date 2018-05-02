import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Button, WhiteSpace, WingBlank, Icon, NavBar } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getQueryString } from '../../utils/utils';

const { Item } = List;

@connect(({ map }) => ({ map }))
@createForm()
export default class Address extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    
  }

  openMap = () => {
    window.location.hash = '/map';
  }

  handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'map/sendInfo',
          payload: this.props.form.getFieldsValue(),
        });
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('填写错误');
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { type, send, receiver } = this.props.map;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        />
        <List renderHeader={() => `完善${type === 1 ? '发' : '收'}货人信息`}>
          <InputItem
            value={type === 1 ? send.sendAddress : receiver.receiverAddress}
            extra={<Icon type="right" />}
            onExtraClick={this.openMap}
            disabled
            placeholder="点击右侧选择地址"
          >地址
          </InputItem>
          <InputItem
            {...getFieldProps('floor', {
              initialValue: type === 1 ? send.sendFloor : receiver.receiverFloor,
              rules: [
                { required: true, message: '请输入楼层或者门牌号码' },
              ],
            })}
            clear
            autoFocus
            error={!!getFieldError('floor')}
            onErrorClick={() => {
              alert(getFieldError('floor').join('、'));
            }}
            placeholder="楼层或者门牌号码"
          >楼层门牌
          </InputItem>
          <InputItem
            {...getFieldProps('name', {
              initialValue: type === 1 ? send.sendName : receiver.receiverName,
              rules: [
                { required: true, message: '请输入姓名' },
              ],
            })}
            clear
            error={!!getFieldError('name')}
            onErrorClick={() => {
              alert(getFieldError('name').join('、'));
            }}
            placeholder={`${type === 1 ? '发' : '收'}货人姓名`}
          >姓名
          </InputItem>
          <InputItem
            {...getFieldProps('phone', {
              initialValue: type === 1 ? send.sendPhone : receiver.receiverPhone,
              rules: [
                { required: true, message: '请输入手机号码' },
              ],
            })}
            type="phone"
            clear
            error={!!getFieldError('phone')}
            onErrorClick={() => {
              alert(getFieldError('phone').join('、'));
            }}
            placeholder={`${type === 1 ? '发' : '收'}货人手机`}
          >电话
          </InputItem>
        </List>
        <WhiteSpace />
        <WingBlank><Button onClick={this.handleSubmit} type="primary">确认地址</Button></WingBlank>
      </div>
    );
  }

}
