import { Flex, Typography } from "antd"
import { TResult } from "../../../../data"

function CoinInfo({ coin, withSymbol }: { coin: TResult, withSymbol: boolean }) {
  return (
    <Flex align="center">
      <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
      <Typography.Title style={{ margin: 0, }} level={2}>
        ({withSymbol && (coin.symbol)}) {coin.name}
      </Typography.Title>
    </Flex>
  )
}
export default CoinInfo