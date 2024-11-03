import { Card, Layout, List, Statistic, Typography, Tag } from "antd"
import style from './AppSider.module.scss'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from "../../../utility/utilis";
import { useContext } from "react";
import CryptoContext from "../../../context/crypto-context";

const { Sider } = Layout
const { Text } = Typography;


function AppSider() {
  const { CryptoAssets } = useContext(CryptoContext)


  return (
    <>

      <Sider width='25%' className={style.Sider}>
        <Typography.Title style={{ color: '#fff' }}>
          Assets:
        </Typography.Title>
        {CryptoAssets.map(asset =>
        (<div key={asset.id}>

          <Card className={style.Card} key={asset.id} >
            <Statistic title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$" />
            <List
              size="small"
              dataSource={[
                { title: 'Total Profit', value: asset.totalProfit, withTag: true },
                { title: 'Total Amount', value: asset.totalAmount, isPlane: true },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                    {item.isPlane && <Text type={asset.grow ? 'success' : 'danger'}>{item.value?.toFixed(2)}</Text>}
                    {!item.isPlane && <Text type={asset.grow ? 'success' : 'danger'}>{item.value?.toFixed(2)}$</Text>}
                  </span>

                </List.Item>
              )}
            />
          </Card>
        </div>)
        )}

      </Sider>
    </>

  )
}

export default AppSider