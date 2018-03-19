import React from 'react';
import { List, InputItem, Button, WhiteSpace, WingBlank, Icon, NavBar } from 'antd-mobile';
import { createForm } from 'rc-form';
import { getQueryString } from '../../utils/utils';

const { Item } = List;
@createForm()
export default class Address extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: getQueryString('name', this.props.location.search),
      // latng: getQueryString('latng', this.props.location.search),
      // addr: getQueryString('addr', this.props.location.search),
      // addr: getQueryString('city', this.props.location.search),
    };
  }

  openMap = () => {
    const length = window.location.href.indexOf('?') < 0 ? 0 : window.location.href.indexOf('?');
    const url = encodeURIComponent(length ? window.location.href.slice(0, length) : window.location.href);
    window.location.href =
    `http://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=${url}&key=Y5VBZ-AL5KJ-RGYFO-KWSZW-JO6M3-VQFAN&referer=babi`;
  }

  handleSubmit = () => {

  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-2)}
        />
        <List renderHeader={() => '完善发货人信息'}>
          <InputItem
            value={this.state.name}
            extra={<Icon type="right" />}
            onExtraClick={this.openMap}
            disabled
            placeholder="点击右侧选择地址"
          >地址
          </InputItem>
          <InputItem
            {...getFieldProps('address', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入备注信息' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            onChange={(val) => { this.setState({ tip: val }); }}
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            placeholder="楼层或者门牌号码"
          >楼层门牌
          </InputItem>
          <InputItem
            {...getFieldProps('account', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入备注信息' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            onChange={(val) => { this.setState({ tip: val }); }}
            error={!!getFieldError('name')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            placeholder="发货人姓名"
          >姓名
          </InputItem>
          <InputItem
            {...getFieldProps('mobile', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入备注信息' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            onChange={(val) => { this.setState({ tip: val }); }}
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            placeholder="发货人手机"
          >电话
          </InputItem>
        </List>
        <WhiteSpace />
        <WingBlank><Button type="primary">确认地址</Button></WingBlank>
      </div>
    );
  }

}
