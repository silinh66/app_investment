/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';

import { screenModeSelector } from '@/redux/screen/selector';

import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { StyledTable } from './styled';
import moment from 'moment/moment';

const ResultTable: FC<any> = ({
  setRows,
  totalResult,
  totalFin,
  rows,
  setTab,
  tab,
  columns,
  setPageTable,
  pageTable,
  setPageSize,
  pageSize,
  loading,
  setLoading,
  tabMenuTarget,
  setTabMenuTarget,
}) => {
  const listCol: any = [];

  const screenMode = useSelector(screenModeSelector);
  const dataSource = rows?.map((item, index) => ({
    ...item,
    key: index + 1,
  }));
  const [searchFriends, setSearchFriends] = useState('');
  const [sendFriends, setSendFriends] = useState([]);

  const firstItem = rows?.length > 0 ? rows[0] : {};

  const listKey = firstItem && Object.keys(firstItem);
  const handlePageChange = (page: any, pageSize: any) => {
    setPageTable(page);
    setPageSize(pageSize);
  };

  const handleCheckSend = (item) => {
    setSendFriends((prev) => {
      const isExisting = prev.includes(item);
      if (isExisting) {
        return prev.filter((currentItem) => currentItem !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const isItemInArray = (item) => sendFriends.includes(item);

  const showTotal = (total: any, range: any) => {
    return `Page ${Math.ceil(range[0] / 10)} of ${Math.ceil(total / 10)}`;
  };
  return (
    <StyledTable screen_mode={screenMode}>
      {tabMenuTarget === 'target' ? (
        <div className="root">
          <div style={{ width: '100%', position: 'relative' }}>
            <Table
              loading={loading}
              className="table-result"
              dataSource={dataSource}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                defaultPageSize: 27,
                showSizeChanger: true,
                pageSizeOptions: ['10', '25', '30'],
                onChange: handlePageChange,
                total: totalFin,
              }}
              onRow={(record, index: any) => {
                return {
                  style: {
                    backgroundColor:
                      screenMode === 'dark' ? 'rgba(32, 33, 39, 1)' : '#ECECEF',
                    borderTop:
                      screenMode === 'dark'
                        ? '1px solid rgba(48, 50, 59, 1)'
                        : '1px solid #D5D7DC',
                  },
                };
              }}
            />
            <div
              style={{
                position: 'absolute',
                color:
                  screenMode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#747B8B',
                fontSize: '14px',
                fontWeight: '400',
                bottom: '21px',
              }}
            >
              Kết quả:{' '}
              <span
                style={{
                  color: screenMode === 'dark' ? '#fff' : '#2E3138',
                }}
              >
                {totalResult}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="root">
          <div style={{ width: '100%', position: 'relative' }}>
            <Table
              loading={loading}
              className="table-result"
              dataSource={dataSource}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                defaultPageSize: 27,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '30'],
                onChange: handlePageChange,
                total: totalFin,
              }}
              onRow={(record, index: any) => {
                return {
                  style: {
                    backgroundColor:
                      screenMode === 'dark' ? 'rgba(32, 33, 39, 1)' : '#ECECEF',
                    borderTop:
                      screenMode === 'dark'
                        ? '1px solid rgba(48, 50, 59, 1)'
                        : '1px solid #D5D7DC',
                  },
                };
              }}
            />
            <div
              style={{
                position: 'absolute',
                color:
                  screenMode === 'dark' ? 'rgba(129, 132, 152, 1)' : '#747B8B',
                fontSize: '14px',
                fontWeight: '400',
                bottom: '21px',
              }}
            >
              Kết quả:{' '}
              <span
                style={{
                  color: screenMode === 'dark' ? '#fff' : '#2E3138',
                }}
              >
                {totalResult}
              </span>
            </div>
          </div>
        </div>
      )}
    </StyledTable>
  );
};
export default ResultTable;
