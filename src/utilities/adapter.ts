export const formatUseTableDataTableProps = (_tableProps: any) => ({
  ..._tableProps,
  dataSource: _tableProps.dataSource?.data,
  pagination: {
    ..._tableProps.pagination,
    total: _tableProps.meta?.total
  }
})