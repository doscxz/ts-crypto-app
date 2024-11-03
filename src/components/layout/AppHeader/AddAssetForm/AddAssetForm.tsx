import { Button, DatePicker, Divider, Form, InputNumber, Result, Select, Space } from "antd"
import { useContext, useRef, useState } from "react"
import CryptoContext from "../../../../context/crypto-context"
import { TCryptoAssets, TResult } from "../../../../data"
import CoinInfo from "../CoinInfoModel/CoinInfo";

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} in not valid number'
  },
  number: {
    range: '${label} must be between ${min} to ${max}'
  }
};
export type TNewAsset = {
  id: string;
  amount: number;
  price: string;
  date: object;
}
function AddAssetForm({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm()
  const { CryptoData, addAsset } = useContext(CryptoContext)
  const [coin, setCoin] = useState<TResult | undefined>()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const assetRef = useRef<TCryptoAssets>()

  if (submitted && typeof assetRef.current === 'object') {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin?.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        onSelect={(v: string) => setCoin(CryptoData.find(c => c.id === (v)))}
        placeholder='Select'
        style={{ width: 250 }}
        options={CryptoData.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
    )
  }
  type TValues = {
    amount: number,
    date: undefined | object,
    price: string,
    total: string
  }

  const onFinish = (values: TValues) => {
    const newAsset: TCryptoAssets = {
      id: coin.id,
      amount: values.amount,
      price: +(values.price),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      date: values.date?.$d ?? new Date()

    }
    assetRef.current = newAsset

    setSubmitted(true)
    addAsset(newAsset)
  };

  function handleAmountChange(value: number | null): void {
    const price = form.getFieldValue('price')
    if (typeof value === 'number') {
      form.setFieldsValue({
        total: `${(value * price).toFixed(2)}$`
      })
    }
  }
  function handlePriceChange(value: number | null): void {
    const amount = form.getFieldValue('amount')
    if (typeof value === 'number') {
      form.setFieldsValue({
        total: `${(amount * value).toFixed(2)}$`
      })
    }
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: `${coin.price.toFixed(2)}`
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >

      <CoinInfo coin={coin} withSymbol={true} />
      <Divider />


      <Form.Item
        label="Amount"
        name="amount"
        rules={[{
          required: true,
          min: 0,
          type: 'number'
        }]}
      >
        <InputNumber placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber
          style={{ width: '100%' }}
          onChange={handlePriceChange} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime
        />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber style={{ width: '100%' }} disabled />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>

    </Form >
  )
}
export default AddAssetForm