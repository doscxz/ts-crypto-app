import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../../../../context/crypto-context';

type TDataTable = {
  key: React.Key;
  name: string;
  price: number;
  amount: number;
}

const columns: TableColumnsType<TDataTable> = [
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: { target: 'full-header' },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  }
];

function AssetsTable() {
  const { CryptoAssets } = useContext(CryptoContext)

  const data = CryptoAssets.map((CryptoAsset) => {
    if (typeof CryptoAsset.name === 'string') {
      return ({
        key: CryptoAsset.id,
        name: CryptoAsset.name,
        price: CryptoAsset.price,
        amount: CryptoAsset.amount
      })
    }

  })

  return (
    <Table<TDataTable>
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  )
}

export default AssetsTable