/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import clear from '@assets/icons/clear.svg';
import loc from '@assets/icons/filter.svg';
import save from '@assets/icons/save_icon.svg';
import { Checkbox, DatePicker, Modal } from 'antd';
import valueNone from '@assets/images/file_null.png';
import valueNoneLight from '@assets/images/file_null_light.png';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StyledValue } from './styles';
import iconSearch from '@assets/icons/search.svg';
import { getListConversations } from '@/services/servicesApi/serviceApi';
import searchLightMode from '@/assets/icons/search-lightmode.svg';
import iconDrop from '@assets/icons/dropdown.svg';
import { Avatar, Select, Slider, Tooltip } from 'antd';

// import {
//   ConvertNumber,
//   ConvertStringToNumber,
// } from '@/components/convertNumber';
import { screenModeSelector } from '@/redux/screen/selector';
import { CloseOutlined, FallOutlined, RiseOutlined } from '@ant-design/icons';
import { LIST_PERCENT_FILTER } from '@/constants/common';
import {
  ConvertNumber,
  ConvertStringToNumber,
} from '@/components/ConvertNumber';
import { config } from '@/config/env';
import axios from 'axios';
import { random } from 'lodash';
import { ModalListFriend } from '@/components/modals/ModalListFriend/ModalListFriend';

const Value: FC<any> = (props): JSX.Element => {
  const {
    getListSignals,
    onChooseSignal,
    listSignal,
    listChiTieu,
    onFilter,
    curTab,
    setCurTab,
    user,
    day,
    setDay,
    rows,
    setRows,
    listTieuChiPicked,
    setListTieuChiPicked,
    anchorElLeft,
    openLeft,
    handleCloseLeft,
    currentChangeTieuChiLeft,
    anchorEl,
    handleClose,
    currentChangeTieuChi,
    anchorElRight,
    openRight,
    handleCloseRight,
    currentChangeTieuChiRight,
    anchorElInterval,
    openInterval,
    handleCloseInterval,
    currentChangeTieuChiInterval,
    bottomEl,
    isHoverRight,
    isHoverInterval,
    isHoverLeft,
    isHoverClear,
    setIsHoverClear,
    setIsHoverRight,
    setIsHoverLeft,
    setIsHoverInterval,
    handleClickListItemLeft,
    handleClickListItem,
    handleChangeSelectIndex,
    handleClickListItemInterval,
    handleClickListItemRight,
    handleClearTieuChi,
    handleToggle,
    anchorQuy,
    setCurrentChangeTieuChiQuy,
    handleClickQuy,
    setIsHoverQuy,
    isHoverQuy,
    currentChangeTieuChiQuy,
    openMonth,
    handleCloseMonth,
    open,
    handleClickListItemSession,
    setIsHoverSession,
    isHoverSession,
    setCurrentChangeSession,
    currentChangeSession,
    openSession,
    handleCloseSession,
    anchorElSession,
    setIsHoverPercent,
    currentChangePercent,
    isHoverPercent,
    handleClosePercent,
    openPercent,
    handleClickListItemPercent,
    anchorElPerCent,
    handleClickListBoolean,
    setIsHoverBoolean,
    isHoverBoolean,
    setCurrentChangeBoolean,
    currentChangeBoolean,
    openBoolean,
    setAnchorElBoolean,
    anchorElBoolean,
    handleCloseBoolean,
    totalResult,
    tabMenuTarget,
    setTabMenuTarget,
    listChiTieuAll,
    onChooseTieuChi,
    getListTieuChi,
  } = props;
  const token = localStorage.getItem('token');

  const screenMode = useSelector(screenModeSelector);
  const [friends, setFriends] = useState([]);
  const [sendFriends, setSendFriends] = useState([]);
  const [searchFriends, setSearchFriends] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onChange: CheckboxProps['onChange'] = (e) => {};
  const [sharingSignal, setSharingSignal] = useState<any>(null);
  const [isHover, setIsHover] = useState([]);
  useEffect(() => {
    getListConversations().then((res) => {
      if (res && res.status === 200) {
        const groups = res.data.conversations.groups.map((item, index) => {
          return {
            ...item,
            avatar: item.image_url,
          };
        });
        setFriends([...res.data.conversations.direct, ...groups]);
      } else {
      }
    });
  }, [isModalOpen]);
  const handlePicker = (date: any) => {
    setDay(date);
  };
  const filteredFriends = friends?.filter((friend) =>
    friend.name.toLowerCase().includes(searchFriends.toLowerCase())
  );
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
  const onChangeSlider = (value: any, index: any) => {
    handleChangeSelectIndex(
      index,
      [ConvertNumber(value[0]), ConvertNumber(value[1])],
      'rightIndexValue'
    );
  };
  const onDeleteSignal = (signalId: any) => {
    axios
      .delete(`${config.app.VITE_APP_API_URL}/signals/delete/${signalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getListSignals();
        const savedChart = localStorage.getItem('myChartDataFilter');
        if (savedChart) {
          const chartObj = JSON.parse(savedChart);

          const listTrendLine = chartObj?.charts[0]?.panes[0]?.sources;
          const listTrendLineFilter = listTrendLine.filter(
            (item: any) =>
              item?.type !== 'LineToolTrendLine' ||
              (item?.type === 'LineToolTrendLine' &&
                item?.state?.symbol !== curTab?.symbol &&
                item?.state?.symbol !== `HOSE:${curTab?.symbol}`)
          );
          chartObj.charts[0].panes[0].sources = listTrendLineFilter;
          const chartJson = JSON.stringify(chartObj);
          localStorage.setItem('myChartDataFilter', chartJson);

          const savedChartNew = localStorage.getItem('myChartDataFilter');
          if (savedChartNew) {
            const chartObjNew = JSON.parse(savedChartNew);
          }
          setCurTab((prevCurTab: any) => {
            return {
              ...prevCurTab,
              forceChange: random(1, 1000),
            };
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  };
  const onDeleteTieuChi = (signalId: any) => {
    axios
      .delete(`${config.app.VITE_APP_API_URL}/listChiTieu/delete/${signalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getListTieuChi();
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });
  };
  const { Option } = Select;

  const onChangeInputLeft = (item: any, value: any, index: any) => {
    handleChangeSelectIndex(
      index,
      [value, item?.rightIndexValue[1]],
      'rightIndexValue'
    );
    // setInputValueLeft(value);
  };
  const onChangeInputRight = (item: any, value: any, index: any) => {
    handleChangeSelectIndex(
      index,
      [item?.rightIndexValue[0], value],
      'rightIndexValue'
    );
    // setInputValueLeft(value);
  };
  const handleKeyDownLeft = (event: any, index: any, item: any) => {
    if (event.key === 'Enter') {
      onChangeInputLeft(item, ConvertNumber(item.rightIndexValue[0]), index);
    }
  };
  const handleKeyDownRight = (event: any, index: any, item: any) => {
    if (event.key === 'Enter') {
      onChangeInputRight(item, ConvertNumber(item.rightIndexValue[1]), index);
    }
  };
  const handleChangeInterval = (value: any) => {
    handleChangeSelectIndex(
      currentChangeTieuChiInterval.index,
      value,
      'interval'
    );
  };

  const showModal = (item: any) => {
    setSharingSignal(item);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/signals/share`,
        {
          SignalID: sharingSignal?.SignalID,
          receiverIDs: sendFriends?.map((item: any) => item.userID),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching account info:', error);
      });

    setSendFriends([]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <StyledValue screen_mode={screenMode}>
      {tabMenuTarget === 'setting' ? (
        <div className="box-indicator">
          <div className="header-indicator-first">
            Danh sách tín hiệu đã lưu
          </div>
          <div className="body-indicator-first">
            {listChiTieuAll.map((item: any, index: number) => {
              return (
                <Tooltip
                  title={
                    item?.OwnerID === user?.userID
                      ? null
                      : 'Tín hiệu được chia sẻ không thể chỉnh sửa'
                  }
                >
                  <div
                    style={{
                      background:
                        isHover[1] && isHover[0] === item.SignalID
                          ? screenMode === 'dark'
                            ? '#292B32'
                            : '#D5D7DC'
                          : screenMode === 'dark'
                            ? curTab?.SignalID === item?.SignalID
                              ? 'rgba(34, 48, 79, 1)'
                              : 'transparent'
                            : curTab?.SignalID === item?.SignalID
                              ? '#CCDDFF'
                              : 'transparent',
                      border:
                        screenMode === 'dark'
                          ? curTab?.SignalID === item?.SignalID
                            ? '1px solid rgba(34, 48, 79, 1)'
                            : '1px solid rgba(48, 50, 59, 1)'
                          : curTab?.SignalID === item?.SignalID
                            ? '1px solid #CCDDFF'
                            : '1px solid #D5D7DC',
                      marginBottom: '16px',
                      padding: '20px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                    className="items-signal"
                    onClick={() => {
                      onChooseTieuChi(item);
                    }}
                    onMouseEnter={() => {
                      setIsHover([item.SignalID, true]);
                    }}
                    onMouseLeave={() => {
                      setIsHover([item.SignalID, false]);
                    }}
                  >
                    <div className="title-signal">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 8C17.5 8 19 9.5 19 12C19 14.5 17.5 16 17.5 16M20.5 5C20.5 5 23 7.5 23 12C23 16.5 20.5 19 20.5 19M6.5 8C6.5 8 5 9.5 5 12C5 14.5 6.5 16 6.5 16M3.5 5C3.5 5 1 7.5 1 12C1 16.5 3.5 19 3.5 19"
                          stroke={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13Z"
                          fill={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                          stroke={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {item?.OwnerID === user?.userID
                        ? item?.SignalName
                        : `Chia sẻ bởi ${item?.name}`}
                    </div>

                    <div
                      className="btn-share-signal"
                      onClick={() => {
                        showModal(item);
                      }}
                    >
                      {' '}
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.4333 11.9548L15.3333 6.75282V9.54082L14.3778 9.68815C9.58889 10.3795 6.34444 12.9408 4.48889 16.8622C7.06667 15.0035 10.2667 14.1082 14.2222 14.1082H15.3333V17.1568M13.1111 15.2642C8.14444 15.5022 4.58889 17.3268 2 21.0215C3.11111 15.3548 6.44444 9.68815 14.2222 8.55482V4.02148L22 11.9548L14.2222 19.8882V15.2415C13.8556 15.2415 13.4889 15.2528 13.1111 15.2642Z"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                        />
                      </svg>
                      Chia sẻ
                    </div>
                    <div
                      onClick={() => {
                        onDeleteTieuChi(item.SignalID);
                      }}
                      className="icon-clear-signal"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0675 12.2046C13.1256 12.2627 13.1717 12.3317 13.2031 12.4075C13.2345 12.4834 13.2507 12.5647 13.2507 12.6468C13.2507 12.729 13.2345 12.8103 13.2031 12.8861C13.1717 12.962 13.1256 13.031 13.0675 13.089C13.0095 13.1471 12.9405 13.1932 12.8647 13.2246C12.7888 13.256 12.7075 13.2722 12.6253 13.2722C12.5432 13.2722 12.4619 13.256 12.386 13.2246C12.3102 13.1932 12.2412 13.1471 12.1832 13.089L7.00035 7.90543L1.81753 13.089C1.70026 13.2063 1.5412 13.2722 1.37535 13.2722C1.2095 13.2722 1.05044 13.2063 0.93316 13.089C0.815885 12.9717 0.75 12.8127 0.75 12.6468C0.75 12.481 0.815885 12.3219 0.93316 12.2046L6.11675 7.02183L0.93316 1.83902C0.815885 1.72174 0.75 1.56268 0.75 1.39683C0.75 1.23098 0.815885 1.07192 0.93316 0.954644C1.05044 0.837369 1.2095 0.771484 1.37535 0.771484C1.5412 0.771484 1.70026 0.837369 1.81753 0.954644L7.00035 6.13824L12.1832 0.954644C12.3004 0.837369 12.4595 0.771484 12.6253 0.771484C12.7912 0.771484 12.9503 0.837369 13.0675 0.954644C13.1848 1.07192 13.2507 1.23098 13.2507 1.39683C13.2507 1.56268 13.1848 1.72174 13.0675 1.83902L7.88394 7.02183L13.0675 12.2046Z"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                        />
                      </svg>
                    </div>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      ) : tabMenuTarget === 'congcu' ? (
        <div className="box-indicator">
          <div className="header-indicator-first">
            Danh sách tín hiệu đã lưu
          </div>
          <div
            style={{
              overflow: 'scroll',
              marginTop: '16px',
            }}
            className="body-indicator-first"
          >
            {listSignal.map((item: any, index: number) => {
              return (
                <Tooltip
                  title={
                    item?.OwnerID === user?.userID
                      ? null
                      : 'Tín hiệu được chia sẻ không thể chỉnh sửa'
                  }
                >
                  <div
                    style={{
                      background:
                        isHover[1] && isHover[0] === item.SignalID
                          ? screenMode === 'dark'
                            ? '#292B32'
                            : '#D5D7DC'
                          : screenMode === 'dark'
                            ? curTab?.SignalID === item?.SignalID
                              ? 'rgba(34, 48, 79, 1)'
                              : 'transparent'
                            : curTab?.SignalID === item?.SignalID
                              ? '#CCDDFF'
                              : 'transparent',
                      border:
                        screenMode === 'dark'
                          ? curTab?.SignalID === item?.SignalID
                            ? '1px solid rgba(34, 48, 79, 1)'
                            : '1px solid rgba(48, 50, 59, 1)'
                          : curTab?.SignalID === item?.SignalID
                            ? '1px solid #CCDDFF'
                            : '1px solid #D5D7DC',
                      marginBottom: '16px',
                      padding: '20px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                    className="items-signal"
                    onClick={() => {
                      onChooseSignal(item);
                    }}
                    onMouseEnter={() => {
                      setIsHover([item.SignalID, true]);
                    }}
                    onMouseLeave={() => {
                      setIsHover([item.SignalID, false]);
                    }}
                  >
                    <div className="title-signal">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 8C17.5 8 19 9.5 19 12C19 14.5 17.5 16 17.5 16M20.5 5C20.5 5 23 7.5 23 12C23 16.5 20.5 19 20.5 19M6.5 8C6.5 8 5 9.5 5 12C5 14.5 6.5 16 6.5 16M3.5 5C3.5 5 1 7.5 1 12C1 16.5 3.5 19 3.5 19"
                          stroke={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13Z"
                          fill={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                          stroke={screenMode === 'dark' ? '#99BAFF' : '#004AEA'}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {item?.OwnerID === user?.userID
                        ? item?.SignalName
                        : `Chia sẻ bởi ${item?.name}`}
                    </div>

                    <div
                      className="btn-share-signal"
                      onClick={() => {
                        showModal(item);
                      }}
                    >
                      {' '}
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.4333 11.9548L15.3333 6.75282V9.54082L14.3778 9.68815C9.58889 10.3795 6.34444 12.9408 4.48889 16.8622C7.06667 15.0035 10.2667 14.1082 14.2222 14.1082H15.3333V17.1568M13.1111 15.2642C8.14444 15.5022 4.58889 17.3268 2 21.0215C3.11111 15.3548 6.44444 9.68815 14.2222 8.55482V4.02148L22 11.9548L14.2222 19.8882V15.2415C13.8556 15.2415 13.4889 15.2528 13.1111 15.2642Z"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                        />
                      </svg>
                      Chia sẻ
                    </div>
                    <div
                      onClick={() => {
                        onDeleteSignal(item.SignalID);
                      }}
                      className="icon-clear-signal"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0675 12.2046C13.1256 12.2627 13.1717 12.3317 13.2031 12.4075C13.2345 12.4834 13.2507 12.5647 13.2507 12.6468C13.2507 12.729 13.2345 12.8103 13.2031 12.8861C13.1717 12.962 13.1256 13.031 13.0675 13.089C13.0095 13.1471 12.9405 13.1932 12.8647 13.2246C12.7888 13.256 12.7075 13.2722 12.6253 13.2722C12.5432 13.2722 12.4619 13.256 12.386 13.2246C12.3102 13.1932 12.2412 13.1471 12.1832 13.089L7.00035 7.90543L1.81753 13.089C1.70026 13.2063 1.5412 13.2722 1.37535 13.2722C1.2095 13.2722 1.05044 13.2063 0.93316 13.089C0.815885 12.9717 0.75 12.8127 0.75 12.6468C0.75 12.481 0.815885 12.3219 0.93316 12.2046L6.11675 7.02183L0.93316 1.83902C0.815885 1.72174 0.75 1.56268 0.75 1.39683C0.75 1.23098 0.815885 1.07192 0.93316 0.954644C1.05044 0.837369 1.2095 0.771484 1.37535 0.771484C1.5412 0.771484 1.70026 0.837369 1.81753 0.954644L7.00035 6.13824L12.1832 0.954644C12.3004 0.837369 12.4595 0.771484 12.6253 0.771484C12.7912 0.771484 12.9503 0.837369 13.0675 0.954644C13.1848 1.07192 13.2507 1.23098 13.2507 1.39683C13.2507 1.56268 13.1848 1.72174 13.0675 1.83902L7.88394 7.02183L13.0675 12.2046Z"
                          fill={screenMode === 'dark' ? '#ABADBA' : '#565B67'}
                        />
                      </svg>
                    </div>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={'frameParent852'}></div>
      )}
      <ModalListFriend
        title="Chia sẻ tín hiệu cho bạn bè"
        modal2Open={isModalOpen}
        setModal2Open={setIsModalOpen}
        onOk={handleOk}
        setSendFriends={setSendFriends}
        sendFriends={sendFriends}
      />
    </StyledValue>
  );
};
export default Value;
