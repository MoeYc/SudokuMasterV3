/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import { SudokuSolutionContext } from '@/context/SudokuSolutionContext';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popover, Table } from 'antd';
import { useContext, useRef, useState } from 'react';

import Position from './Position';

const StepTable = (props) => {
  let { state: sudokuState } = useContext(SudokuSolutionContext);
  let [loading] = useState(false);
  let [filteredInfo, setFilteredInfo] = useState({});
  let [, setSearchText] = useState('');
  let [, setSortedInfo] = useState({});

  let searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          //   icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select());
      }
    },
  });

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const positionContent = (position, cell, refCells, preChangeCandidates) => {
    return (
      <Position
        position={position}
        cell={cell}
        refCells={refCells}
        preChangeCandidates={preChangeCandidates}
      />
    );
  };

  const columns = [
    {
      title: '步数',
      dataIndex: 'index',
      width: 50,
    },
    {
      title: '格',
      dataIndex: 'cell',
      width: 40,
      ...getColumnSearchProps('cell'),
    },
    {
      title: '消息',
      dataIndex: 'message',
      ...getColumnSearchProps('message'),
    },
    {
      title: '技巧',
      dataIndex: 'techniques',
      width: 180,
      ...getColumnSearchProps('techniques'),
    },
    {
      title: '参考格',
      dataIndex: 'refCells',
      width: 80,
      ...getColumnSearchProps('refCells'),
    },
    {
      title: '详细',
      dataIndex: 'level',
      filters: [
        { text: '0', value: 0 },
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
      ],
      width: 70,
      //   filteredValue: filteredInfo.level || null,
      onFilter: (value, record) => record.level === value,
    },
    {
      title: '复盘',
      dataIndex: 'position',
      width: 50,
      render: (position, record) => (
        <span>
          <Popover
            placement="left"
            content={positionContent(
              position,
              record.cell,
              record.refCells,
              record.preChangeCandidates,
            )}
            title={`第${record.index}步 ${record.cell} ${record.message} ${record.techniques}`}
            trigger="hover"
          >
            查看
          </Popover>
        </span>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      size="middle"
      bordered={true}
      columns={columns}
      dataSource={sudokuState.resolution}
      rowKey="index"
      pagination={false}
      tableLayout="fixed"
      scroll={{ x: 'max-content', y: 610 }}
      onChange={handleChange}
      rowClassName={(record, index) => {
        let className = 'odd_row';
        if (index % 2 === 1) className = 'even_row';
        return className;
      }}
    />
  );
};
export default StepTable;
