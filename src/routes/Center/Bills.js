import React from 'react';
import { Flex, Radio, List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { process, invoice } from '../../services/api';

const { Item } = List;
const { Brief } = Item;
const orderType = ['帮我送', '帮我取', '帮我买', '帮办事'];
@createForm()
export default class Bills extends React.PureComponent {
  state = {
    data: [],
    id: '',
    showInvocie: false,
    radio: 1,
  }
  componentWillMount() {
    this.getList();
  }

  onRadioChange = (radio) => {
    this.setState({ radio });
  }
  getList = () => {
    const info = {
      userId: this.props.userId,
      bean: 'order',
      method: 'pageOrder',
      page: 1,
      rows: 999,
      isInvoice: 0,
      price: 0,
    };
    process(info).then((res) => {
      this.setState({ data: res.rows });
    });
  }
  handleInvoice = (id, price) => {
    this.setState({ id, price, showInvocie: true });
  }
  submit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const info = {
          headType: this.state.radio,
          ...this.props.form.getFieldsValue(),
          payCount: this.props.form.getFieldsValue().price * 100,
          orderId: this.state.id,
        }
        invoice(info).then((res) => {
          if (res.status == '00') {
            this.getList();
            this.setState({ showInvocie: false });
          } else {
            alert(res.msg)
            this.setState({ showInvocie: false });
          }
        })
      }
    })    
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <List renderHeader={() => ''} className="my-list" style={{ display: this.state.showInvocie ? 'none' : '' }}>
          {
            this.state.data.map((item) => {
              return (
                <Item onClick={() => this.handleInvoice(item.orderId, item.payPrice)} key={item.id} extra={<div>{orderType[item.orderType]}<div style={{ marginTop: 6 }}>{item.payPrice / 100}元</div></div>} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                  {item.departureTime}
                  <Brief>
                    <div>{item.sendAddress}</div>
                    <div>{item.receiverAddress}</div>
                  </Brief>
                </Item>
              );
            })
          }
        </List>
        <List renderHeader={() => '发票详情'} className="my-list" style={{ display: this.state.showInvocie ? '' : 'none' }}>
          <Item>
            <Flex>
              <Flex.Item>
                <Radio checked={this.state.radio === 1} name="logId" onChange={() => this.onRadioChange(1)}>
                  企业抬头
                </Radio>
              </Flex.Item>
              <Flex.Item style={{ textAlign: 'right' }}>
                <Radio checked={this.state.radio === 2} name="logId" onChange={() => this.onRadioChange(2)}>
                  个人/非企业抬头
                </Radio>
              </Flex.Item>
            </Flex>
          </Item>
          <InputItem
            {...getFieldProps('head', {
              rules: [
                { required: true, message: '请填写发票抬头' },
              ],
            })}
            clear
            error={!!getFieldError('head')}
            onErrorClick={() => {
              alert(getFieldError('head').join('、'));
            }}
            placeholder="请填写发票抬头"
          >发票抬头
          </InputItem>
          <InputItem
            {...getFieldProps('num', {
              rules: [
                { required: true, message: '请填写税号' },
              ],
            })}
            clear
            error={!!getFieldError('num')}
            onErrorClick={() => {
              alert(getFieldError('num').join('、'));
            }}
            placeholder="请填写税号"
          >税号
          </InputItem>
          <InputItem
            {...getFieldProps('context', {
              rules: [
                { required: true, message: '请填写发票内容' },
              ],
            })}
            clear
            error={!!getFieldError('context')}
            onErrorClick={() => {
              alert(getFieldError('context').join('、'));
            }}
            placeholder="请填写发票内容"
          >发票内容
          </InputItem>
          <InputItem
            {...getFieldProps('price', {
              initialValue: (this.state.price / 100),
              rules: [
                { required: true, message: '请填写发票金额' },
              ],
            })}
            clear
            error={!!getFieldError('price')}
            onErrorClick={() => {
              alert(getFieldError('price').join('、'));
            }}
            placeholder="请填写发票金额"
          >发票金额
          </InputItem>
          <InputItem
            {...getFieldProps('tip', {
              rules: [
                { required: true, message: '请填写备注' },
              ],
            })}
            clear
            error={!!getFieldError('tip')}
            onErrorClick={() => {
              alert(getFieldError('tip').join('、'));
            }}
            placeholder="请填写备注"
          >备注
          </InputItem>
          <InputItem
            {...getFieldProps('receiver', {
              rules: [
                { required: true, message: '收件人' },
              ],
            })}
            clear
            error={!!getFieldError('receiver')}
            onErrorClick={() => {
              alert(getFieldError('receiver').join('、'));
            }}
            placeholder="收件人"
          >收件人
          </InputItem>
          <InputItem
            {...getFieldProps('phone', {
              rules: [
                { required: true, message: '联系电话' },
              ],
            })}
            clear
            error={!!getFieldError('phone')}
            onErrorClick={() => {
              alert(getFieldError('phone').join('、'));
            }}
            placeholder="联系电话"
          >联系电话
          </InputItem>
          <InputItem
            {...getFieldProps('address', {
              rules: [
                { required: true, message: '详细地址' },
              ],
            })}
            clear
            error={!!getFieldError('address')}
            onErrorClick={() => {
              alert(getFieldError('address').join('、'));
            }}
            placeholder="详细地址"
          >详细地址
          </InputItem>
          <Button onClick={this.submit}>提交</Button>
        </List>
      </div>
    );
  }
}
