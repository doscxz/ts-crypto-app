import { Layout, Typography } from "antd"
import styles from './AppContent.module.scss'
import { useContext } from "react"
import CryptoContext from "../../../context/crypto-context"
import { cryptoData } from "../../../data"
import PortfolioChart from "./PortfolioChart/PortfolioChart"
import AssetsTable from "./AssetsTable/AssetsTable"

const { Content } = Layout


type TCryptoPriceMap = {
  [K in (typeof cryptoData)['result'][number]["id"]]: number
}

function AppContent() {
  const { CryptoAssets, CryptoData } = useContext(CryptoContext)

  const cryptoPriceMap = CryptoData.reduce((acc: TCryptoPriceMap, coin) => {
    acc[coin.id] = coin.price
    return acc
  }, {})
  console.log(cryptoPriceMap);

  return (
    <Content className={styles.Content} style={{ paddingInline: '50px' }}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio: {CryptoAssets
          .map((CryptoAsset) => (CryptoAsset.amount * cryptoPriceMap[CryptoAsset.id]))
          .reduce((acc, value) => acc += value, 0)
          ?.toFixed(2)}$
      </Typography.Title>
      <Typography.Title>
        <PortfolioChart />
      </Typography.Title>
      <Typography.Title>
        <AssetsTable />
      </Typography.Title>
    </Content>
  )
}

export default AppContent