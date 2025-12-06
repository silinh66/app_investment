/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useRef } from "react";
import iconDrop from "@assets/icons/dropdown.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import star from "@assets/icons/star.svg";
import { CiSettings } from "react-icons/ci";
import star_none from "@assets/icons/star_none.svg";
import checkIcon from "@assets/icons/check.svg";
import searchTarget from "@assets/icons/search_white_icon.svg";
import searchTargetDark from "@assets/icons/search-lightmode.svg";
import deleteFil from "@assets/icons/delete_icon.svg";
import { screenModeSelector } from "@/redux/screen/selector";
import valueNone from "@assets/images/file_null.png";
import valueNoneLight from "@assets/images/file_null_light.png";
import { Checkbox, notification, Select, Slider, Switch, Tooltip } from "antd";
import { config } from "@/config/env";
import doubleIcon from "@assets/icons/multiple.svg";
import { StyledCommunity } from "./styled";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import icon_chart from "@assets/images/image 45.png";
import axios from "axios";
import plus from "@assets/icons/plus.svg";
import minus from "@assets/icons/minus.svg";
import { use } from "echarts";
import luu from "@assets/images/direct-normal.png";
import { requestToken } from "@/config/api";
import {
  ConvertNumber,
  ConvertStringToNumber,
  formatNumber,
} from "@/components/ConvertNumber";
import { ModalFilter } from "@/components/modals/ModalFilter/ModalFilter";
import { LIST_PERCENT_FILTER } from "@/constants/common";
import { useLocation } from "react-router-dom";
const Targets: FC<any> = ({
  pickerPopular,
  setPickerPopular,
  pickerBasic,
  setPickerBasic,
  pickerTechnique,
  setPickerTechnique,
  pickerFluctuation,
  setPickerFluctuation,
  pickerMyFilter,
  setPickerMyFilter,
  curTab,
  isHoverClear,
  setIsHoverClear,
  setTrendingLine,
  onFilter,
  handleToggle,
  currentChangePercent,
  handleClearTieuChi,
  handleClickListItem,
  handleClickListItemRight,
  onSaveSignal,
  currentChangeTieuChiQuy,
  trendingLine,
  priceUp,
  totalResult,
  handleClickListItemInterval,
  handleClickListItemLeft,
  setPriceDown,
  listSignal,
  currentChangeTieuChiRight,
  setPriceUp,
  currentChangeTieuChiLeft,
  currentChangeTieuChi,
  priceDown,
  currentChangeTieuChiInterval,
  setSearchCriteria,
  handleClickQuy,
  setListMyFilter,
  listMyFilter,
  searchCriteria,
  handleClickListItemSession,
  isHoverChiTieu,
  selectedValue,
  setIsHoverChiTieu,
  setSelectedValue,
  listTieuChiPicked,
  currentChangeSession,
  setListTieuChiPicked,
  scrollToBottom,
  selectedChild,
  handleChangeSelectIndex,
  setSelectedChild,
  setTabMenuTarget,
  tabMenuTarget,
  setListIdConfig,
  listIdConfig,
  listChiTieuAll,
  listTieuChi,
  setListTieuChi,
  onSaveListChiTieu,
  listSymbol,
  setListSymbol,
  listSymbolPicked,
  setListSymbolPicked,
}): JSX.Element => {
  const listKhangCu = trendingLine?.filter((item) => item?.position);
  const listHoTro = trendingLine?.filter((item) => !item?.position);
  const [api, contextHolder] = notification.useNotification();
  const [listSearch, setListSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const token = localStorage.getItem("token");
  const [listSaveMyFilter, setListSaveMyFilter] = useState([]);
  const [hasFilterChanged, setHasFilterChanged] = useState(false);
  const screenMode = useSelector(screenModeSelector);
  const [listOpenTieuChi, setListOpenTieuChi] = useState<any>([]);
  const [listOpenTieuChiKyThuat, setListOpenTieuChiKyThuat] = useState<any>([]);
  const [isHover, setIsHover] = useState([]);
  const [switchMa, setSwitchMa] = useState();
  let [lastOrder, setLastOrder] = useState({});
  const [switchMacd, setSwitchMacd] = useState();
  const [switchRsi, setSwitchRsi] = useState();
  const [switchEma, setSwitchEma] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueCode, setValueCode] = useState({
    ma: "",
    rsi: "",
    macd: "",
    ema: "",
  });
  const [err, setErr] = useState(false);
  const [isOpenModalSignal, setIsOpenModalSignal] = useState(false);
  const [listInterval, setListInterval] = useState([]);

  const [listNganh, setListNganh] = useState([
    "Cổ phiếu tự chọn",
    "Bất động sản",
    "Ngân hàng",
    "Phòng thủ",
    "Dầu khí",
    "Logistics",
    "Tiêu dùng",
    "Chứng khoán",
  ]);

  const [listNganhPicked, setListNganhPicked] = useState([]);
  const [listVonHoaPicked, setListVonHoaPicked] = useState([]);
  const [checkSave, setCheckSave] = useState(false);
  // const [thresholds, setThresholds] = useState({ lower: 30, upper: 70 });
  const [checkedState, setCheckedState] = useState({
    belowLower: false,
    aboveUpper: false,
  });

  const listChiTieu = [
    {
      value: "nhomThongDung",
      label: "Lọc phổ biến",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="20"
            height="20"
            rx="10"
            fill={selectedValue === "nhomThongDung" ? "#fff" : "#575a6a"}
          />
          <path
            d="M14.6415 8.13829L11.6662 7.70586L10.3361 5.00938C10.2997 4.93555 10.24 4.87579 10.1662 4.83946C9.981 4.74805 9.756 4.82422 9.66342 5.00938L8.33334 7.70586L5.35795 8.13829C5.27592 8.15 5.20092 8.18868 5.1435 8.24727C5.07408 8.31862 5.03582 8.41461 5.03714 8.51416C5.03846 8.6137 5.07924 8.70864 5.15053 8.77813L7.30326 10.877L6.79467 13.8406C6.78274 13.9096 6.79037 13.9805 6.81669 14.0453C6.84301 14.1101 6.88697 14.1663 6.94358 14.2074C7.00019 14.2485 7.06719 14.2729 7.13697 14.2779C7.20676 14.2829 7.27655 14.2682 7.33842 14.2356L9.99975 12.8363L12.6611 14.2356C12.7337 14.2742 12.8181 14.2871 12.899 14.2731C13.1029 14.2379 13.24 14.0445 13.2048 13.8406L12.6962 10.877L14.849 8.77813C14.9076 8.72071 14.9462 8.64571 14.958 8.56368C14.9896 8.3586 14.8466 8.16875 14.6415 8.13829Z"
            fill={selectedValue === "nhomThongDung" ? "#575a6a" : "#fff"}
          />
        </svg>
      ),
      numberPick: pickerPopular,
    },
    {
      value: "coban",
      label: "Lọc cơ bản",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="20"
            height="20"
            rx="10"
            fill={selectedValue === "coban" ? "#fff" : "#575a6a"}
          />
          <path
            d="M14.875 5.88672H12.1938C11.6184 5.88672 11.0559 6.05195 10.5719 6.36367L10 6.73047L9.42813 6.36367C8.94462 6.05201 8.38149 5.88641 7.80625 5.88672H5.125C4.91758 5.88672 4.75 6.0543 4.75 6.26172V12.918C4.75 13.1254 4.91758 13.293 5.125 13.293H7.80625C8.38164 13.293 8.94414 13.4582 9.42813 13.7699L9.94844 14.1051C9.96367 14.1145 9.98125 14.1203 9.99883 14.1203C10.0164 14.1203 10.034 14.1156 10.0492 14.1051L10.5695 13.7699C11.0547 13.4582 11.6184 13.293 12.1938 13.293H14.875C15.0824 13.293 15.25 13.1254 15.25 12.918V6.26172C15.25 6.0543 15.0824 5.88672 14.875 5.88672ZM8.73438 10.4863C8.73438 10.5344 8.69687 10.5742 8.65117 10.5742H6.47383C6.42813 10.5742 6.39062 10.5344 6.39062 10.4863V9.95898C6.39062 9.91094 6.42813 9.87109 6.47383 9.87109H8.65C8.6957 9.87109 8.7332 9.91094 8.7332 9.95898V10.4863H8.73438ZM8.73438 8.8457C8.73438 8.89375 8.69687 8.93359 8.65117 8.93359H6.47383C6.42813 8.93359 6.39062 8.89375 6.39062 8.8457V8.31836C6.39062 8.27031 6.42813 8.23047 6.47383 8.23047H8.65C8.6957 8.23047 8.7332 8.27031 8.7332 8.31836V8.8457H8.73438ZM13.6094 10.4863C13.6094 10.5344 13.5719 10.5742 13.5262 10.5742H11.3488C11.3031 10.5742 11.2656 10.5344 11.2656 10.4863V9.95898C11.2656 9.91094 11.3031 9.87109 11.3488 9.87109H13.525C13.5707 9.87109 13.6082 9.91094 13.6082 9.95898V10.4863H13.6094ZM13.6094 8.8457C13.6094 8.89375 13.5719 8.93359 13.5262 8.93359H11.3488C11.3031 8.93359 11.2656 8.89375 11.2656 8.8457V8.31836C11.2656 8.27031 11.3031 8.23047 11.3488 8.23047H13.525C13.5707 8.23047 13.6082 8.27031 13.6082 8.31836V8.8457H13.6094Z"
            fill={selectedValue === "coban" ? "#575a6a" : "#fff"}
          />
        </svg>
      ),
      dropdown: true,
      numberPick: pickerBasic,

      // childrens: [
      //   {
      //     value: 'nhomTiSuatTaiChinh',
      //     label: 'Chỉ số tài chính',
      //   },
      //   {
      //     value: 'nhomTangTruong',
      //     label: 'Nhóm tăng trưởng',
      //   },
      //   {
      //     value: 'nhomCoBan',
      //     label: 'Thông số cơ bản',
      //   },
      //   {
      //     value: 'nhomCoTuc',
      //     label: 'Nhóm cổ tức',
      //   },
      // ],
    },
    {
      value: "nhomChiBaoKyThuat",
      label: "Lọc kỹ thuật",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="20"
            height="20"
            rx="10"
            fill={selectedValue === "nhomChiBaoKyThuat" ? "#fff" : "#575a6a"}
          />
          <path
            d="M14.7464 6.47352L12.412 6.75477C12.3347 6.76414 12.3018 6.85906 12.3569 6.91414L13.0518 7.60906L10.4034 10.2575L9.21044 9.06571C9.13661 8.99188 9.01825 8.99305 8.94559 9.06571L5.17567 12.8368C5.15822 12.8544 5.14844 12.8782 5.14844 12.903C5.14844 12.9278 5.15822 12.9516 5.17567 12.9692L5.70302 13.4989C5.73934 13.5352 5.79911 13.5352 5.83544 13.4989L9.07802 10.2575L10.2698 11.4493C10.3436 11.522 10.462 11.522 10.5347 11.4493L13.7151 8.27117L14.41 8.9661C14.4225 8.97849 14.4382 8.98714 14.4553 8.99106C14.4724 8.99498 14.4903 8.99402 14.5069 8.98828C14.5235 8.98254 14.5382 8.97226 14.5492 8.9586C14.5603 8.94494 14.5673 8.92845 14.5694 8.91102L14.8507 6.57664C14.8589 6.51688 14.8073 6.46532 14.7464 6.47352Z"
            fill={selectedValue === "nhomChiBaoKyThuat" ? "#575a6a" : "#fff"}
          />
        </svg>
      ),
      numberPick: pickerTechnique,
    },
    {
      value: "bienDongGia",
      label: "Lọc biến động",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="20"
            height="20"
            rx="10"
            fill={selectedValue === "bienDongGia" ? "#fff" : "#575a6a"}
          />
          <path
            d="M10.618 9.27708V7.08875C10.9919 7.13818 11.3571 7.23944 11.703 7.38958L12.263 7.66542L12.8168 6.54458L12.2555 6.26833C11.7376 6.0329 11.1844 5.88438 10.618 5.82875V5H9.78342V5.82625C8.30741 5.95375 7.37432 6.78458 7.37432 8.01958C7.37432 9.57208 8.69885 10.0404 9.78342 10.3433V12.5375C9.18075 12.5053 8.58538 12.3905 8.01405 12.1962L7.42523 11.9842L7 13.1596L7.58882 13.3721C8.29622 13.617 9.03543 13.7584 9.78342 13.7917V15H10.618V13.7863C12.7567 13.6067 13 12.2129 13 11.5929C13 10.0538 11.6976 9.58042 10.618 9.27708ZM8.62623 8.01958C8.62623 7.35292 9.29392 7.14458 9.78342 7.0825V9.0375C8.99054 8.78833 8.62623 8.55125 8.62623 8.01958ZM10.618 12.53V10.5833C11.393 10.8296 11.7481 11.0671 11.7481 11.5925C11.7481 11.8258 11.7447 12.4038 10.618 12.53Z"
            fill={selectedValue === "bienDongGia" ? "#575a6a" : "#fff"}
          />
        </svg>
      ),
      numberPick: pickerFluctuation,
    },
    {
      value: "bolocCuaToi",
      label: "Bộ lọc của tôi",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="20"
            height="20"
            rx="10"
            fill={selectedValue === "bolocCuaToi" ? "#fff" : "#575a6a"}
          />
          <path
            d="M11.3844 10.8429C10.9696 11.0967 10.5032 11.25 10 11.25C9.4968 11.25 9.0304 11.0967 8.6156 10.8429C7.1576 10.9425 6 12.2067 6 13.75V14.4708L6.278 14.5637C6.3316 14.5812 7.6152 15 10 15C12.3848 15 13.6684 14.5812 13.722 14.5637L14 14.4708V13.75C14 12.2067 12.8424 10.9425 11.3844 10.8429Z"
            fill={selectedValue === "bolocCuaToi" ? "#575a6a" : "#fff"}
          />
          <path
            d="M10 10.4167C11.3516 10.4167 12.4 8.84875 12.4 7.5C12.4 6.12125 11.3236 5 10 5C8.6764 5 7.6 6.12125 7.6 7.5C7.6 8.84875 8.6484 10.4167 10 10.4167Z"
            fill={selectedValue === "bolocCuaToi" ? "#575a6a" : "#fff"}
          />
        </svg>
      ),
      numberPick: pickerMyFilter,
    },
  ];
  const location = useLocation();

  useEffect(() => {
    const tab = location.state?.tab || "target";
    switch (tab) {
      case "bo-loc-chi-tieu":
        setTabMenuTarget("target");
        break;
      case "bo-loc-ky-thuat":
        setTabMenuTarget("setting");
        break;
      case "cai-dat-tin-hieu":
        setTabMenuTarget("congcu");
        break;

      default:
        break;
    }
  }, [location]);
  const openModalSignal = () => {
    setIsOpenModalSignal((prev) => !prev);
  };
  const dropdownRef = useRef(null);

  // Toggle dropdown state
  const handleClickKyThuat = (state) => {
    if (listOpenTieuChiKyThuat.includes(state)) {
      // Remove state from the list to close dropdown
      const newListOpenTieuChi = listOpenTieuChiKyThuat.filter(
        (item) => item !== state
      );
      setListOpenTieuChiKyThuat(newListOpenTieuChi);
    } else {
      // Add state to open dropdown
      const newListOpenTieuChi = [...listOpenTieuChiKyThuat, state];
      setListOpenTieuChiKyThuat(newListOpenTieuChi);
    }
  };

  // Close dropdown if click happens outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click happened outside the dropdown and its toggling container
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".drop-kythuat") // Add this check to ensure clicks within the dropdown toggle don't trigger closing
      ) {
        setListOpenTieuChiKyThuat([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const getCaiDatBot = async () => {
  //   const settingBotResponse = await requestToken({
  //     method: 'GET',
  //     url: '/user/settings',
  //   });
  //   // axios.get(
  //   //   `${config.app.VITE_APP_API_URL}/user/settings`
  //   // );
  //   const settingBotData = settingBotResponse?.data?.settings;
  //   const thresholds = settingBotData[0]?.conditions;
  //   setThresholds({
  //     lower: +thresholds[1]?.value,
  //     upper: +thresholds[0]?.value,
  //   });
  // };

  // const updateCaiDatBot = async () => {
  //   const settingBotResponse = await requestToken({
  //     method: 'POST',
  //     url: '/settings/updateConditions',
  //     data: {
  //       settingID: 1,
  //       conditions: [
  //         {
  //           name: 'QUA_MUA',
  //           value: thresholds?.lower,
  //         },
  //         {
  //           name: 'QUA_BAN',
  //           value: thresholds?.upper,
  //         },
  //       ],
  //     },
  //   });
  //   // getCaiDatBot();
  // };

  // Hàm xử lý thay đổi giá trị của input
  // const handleInputChange = (even: AnyKindOfDictionary) => {
  //   const { name, value } = event.target;
  //   setThresholds((prevThresholds) => ({ ...prevThresholds, [name]: value }));
  // };
  const onChangeSliderSinger = (value: any, index: any) => {
    handleChangeSelectIndex(index, value, "rightIndexValue");
  };
  // Hàm xử lý thay đổi trạng thái của checkbox
  const handleCheckboxChange = (event: any) => {
    const { name } = event.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const handleClickTime = (index) => {
    setClickItemTime(index);
  };

  // const isItemTime = (item) => clickItemTime.includes(item);
  const changeValue = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    if (name !== "macd" && numericValue < 0) {
      setErr(true);
    } else {
      setErr(false);
    }

    setValueCode((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveConfig = () => {
    // updateCaiDatBot();
    setListOpenTieuChiKyThuat([]);
  };
  const deleteItem = (item) => {
    const newList = listInterval.filter(
      (intervalItem) => intervalItem !== item
    );
    setListInterval(newList);
  };

  const handleMyFilter = (item: any) => {
    if (!token) {
      api.error({
        message: `Thông báo!`,
        description: "Bạn vui lòng đăng nhập để sử dụng tính năng này!",
        placement: "topRight",
      });
    } else {
      setListSaveMyFilter((prevItems: any) => {
        const exists = prevItems.some(
          (prevItem: any) => prevItem.label === item.label
        );

        if (exists) {
          return prevItems.filter(
            (prevItem: any) => prevItem.label !== item.label
          );
        } else {
          return [...prevItems, item];
        }
      });
      setHasFilterChanged(true);
    }
  };
  const onChangeSwitchMa = (checked: boolean) => {
    setSwitchMa(checked);
  };
  const onChangeSwitchMacd = (checked: boolean) => {
    setSwitchMacd(checked);
  };
  const onChangeSwitchEma = (checked: boolean) => {
    setSwitchEma(checked);
  };
  const onChangeSwitchRsi = (checked: boolean) => {
    setSwitchRsi(checked);
  };
  const onChangeSwitchKyThuat = (checked, itemDropdown, itemPick) => {
    const listTieuChiNew = listTieuChi.map((item) => {
      // Check if the current item is the one being updated
      if (item.label === itemPick.label) {
        // Map through the dropdown to update the isCheck property for the matching item
        const updatedDropdown = item.dropdown.map((dropdownItem) => {
          if (
            dropdownItem.label === itemDropdown.label &&
            dropdownItem.value === itemDropdown.value
          ) {
            return { ...dropdownItem, isCheck: checked }; // Update isCheck based on the switch
          }
          return dropdownItem; // Return the item unchanged if it doesn't match
        });
        return { ...item, dropdown: updatedDropdown }; // Return the updated item with the new dropdown
      }
      return item; // Return the item unchanged if it's not the one being updated
    });

    setListTieuChi(listTieuChiNew); // Update the state with the new list
  };

  const onChangeInputKyThuat = (
    value: any,
    itemDropdown: any,
    itemPick: any
  ) => {
    const listTieuChiNew = listTieuChi.map((item) => {
      // Check if the current item is the one being updated
      if (item.label === itemPick.label) {
        // Map through the dropdown to update the isCheck property for the matching item
        const updatedDropdown = item.dropdown.map((dropdownItem) => {
          if (
            dropdownItem.label === itemDropdown.label &&
            dropdownItem.value === itemDropdown.value
          ) {
            return { ...dropdownItem, value: value }; // Update isCheck based on the switch
          }
          return dropdownItem; // Return the item unchanged if it doesn't match
        });
        return { ...item, dropdown: updatedDropdown }; // Return the updated item with the new dropdown
      }
      return item; // Return the item unchanged if it's not the one being updated
    });

    setListTieuChi(listTieuChiNew); // Update the state with the new list
  };
  const onChangeInputKyThuatPlus = (
    value: any,
    itemDropdown: any,
    itemPick: any
  ) => {
    const listTieuChiNew = listTieuChi.map((item) => {
      // Check if the current item is the one being updated
      if (item.label === itemPick.label) {
        // Map through the dropdown to update the isCheck property for the matching item
        const updatedDropdown = item.dropdown.map((dropdownItem) => {
          if (
            dropdownItem.label === itemDropdown.label &&
            dropdownItem.value === itemDropdown.value
          ) {
            return { ...dropdownItem, value: value + 1 }; // Update isCheck based on the switch
          }
          return dropdownItem; // Return the item unchanged if it doesn't match
        });
        return { ...item, dropdown: updatedDropdown }; // Return the updated item with the new dropdown
      }
      return item; // Return the item unchanged if it's not the one being updated
    });

    setListTieuChi(listTieuChiNew);
  };
  const onChangeInputKyThuatMinus = (
    value: any,
    itemDropdown: any,
    itemPick: any
  ) => {
    const listTieuChiNew = listTieuChi.map((item) => {
      // Check if the current item is the one being updated
      if (item.label === itemPick.label) {
        // Map through the dropdown to update the isCheck property for the matching item
        const updatedDropdown = item.dropdown.map((dropdownItem) => {
          if (
            dropdownItem.label === itemDropdown.label &&
            dropdownItem.value === itemDropdown.value
          ) {
            return { ...dropdownItem, value: value - 1 }; // Update isCheck based on the switch
          }
          return dropdownItem; // Return the item unchanged if it doesn't match
        });
        return { ...item, dropdown: updatedDropdown }; // Return the updated item with the new dropdown
      }
      return item; // Return the item unchanged if it's not the one being updated
    });

    setListTieuChi(listTieuChiNew); // Update the state with the new list
  };

  const handleChangePricePlus = (type) => {
    if (type === "ma") {
      const newValue = parseInt(valueCode.ma, 10) + 1;
      setValueCode({
        ...valueCode,
        ma: newValue.toString(),
      });
    } else if (type === "rsi") {
      const newValue = parseInt(valueCode.rsi, 10) + 1;
      setValueCode({
        ...valueCode,
        rsi: newValue.toString(),
      });
    } else if (type === "macd") {
      const newValue = parseInt(valueCode.macd, 10) + 1;
      setValueCode({
        ...valueCode,
        macd: newValue.toString(),
      });
    } else if (type === "ema") {
      const newValue = parseInt(valueCode.ema, 10) + 1;
      setValueCode({
        ...valueCode,
        ema: newValue.toString(),
      });
    }
  };
  const handleChangePriceMinus = (type) => {
    let newValue = parseInt(valueCode[type], 10) - 1;

    if (type === "macd") {
      setValueCode({
        ...valueCode,
        [type]: newValue.toString(),
      });
    } else {
      newValue = Math.max(0, newValue);
      setValueCode({
        ...valueCode,
        [type]: newValue.toString(),
      });
    }
  };

  useEffect(() => {
    if (hasFilterChanged === true) {
      axios
        .post(
          `${config.app.VITE_APP_API_URL}/add-my-filter`,
          {
            listFilter: listSaveMyFilter,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Custom-Header": "foobar",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) =>
          axios
            .get(`${config.app.VITE_APP_API_URL}/get-my-filter`, {
              headers: {
                "Content-Type": "application/json",
                "X-Custom-Header": "foobar",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res1) => {
              setHasFilterChanged(false);

              setListMyFilter(res1.data.data);
              setListSaveMyFilter(res1.data.data);
            })
        );
    } else {
      axios
        .get(`${config.app.VITE_APP_API_URL}/get-my-filter`, {
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": "foobar",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setListMyFilter(res.data.data);
          setListSaveMyFilter(res.data.data);
        });
    }
  }, [hasFilterChanged]);
  useEffect(() => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/user-config-get`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": "foobar",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValueCode({
          ma: res.data.config.MAValue,
          rsi: res.data.config.RSIValue,
          macd: res.data.config.MACDValue,
          ema: res.data.config.EMAValue,
        });
        setListIdConfig((prev) => [...prev, res.data.config.userID]);
        setSwitchMacd(res.data.config.MACD);
        setSwitchMa(res.data.config.MA);
        setSwitchEma(res.data.config.EMA);
        setSwitchRsi(res.data.config.RSI);
        const convertInterval = res.data.config.listInterval.map(
          (item, index) => ({
            label: item,
            value: item,
          })
        );
        setListInterval(convertInterval);
        // getCaiDatBot();
      });
  }, [checkSave]);

  const handleChange = (
    value: string[] | { label: string; value: string }[]
  ) => {
    // Cập nhật trạng thái dựa trên giá trị mới
    setListSymbolPicked(() => {
      if (value.length === 0) {
        return [];
      }
      const newValue = value.map((item) =>
        typeof item === "object" ? item.value : item
      );
      return newValue;
    });
  };
  const onChangeTrendingLine = (trendingLine: any) => {
    setListMatch((prevListMatch: any) => {
      const listMatchNew = [];
      for (let i = 0; i < trendingLine?.length; i++) {
        const element = trendingLine[i];

        const listItemOld = prevListMatch.filter((item2: any) => {
          return item2.id === element.id;
        });

        for (let j = 0; j < listItemOld?.length; j++) {
          const itemOld = listItemOld[j];
          listMatchNew.push({
            ...itemOld,
            ...element,
          });
        }
      }
      return listMatchNew;
    });
    setTrendingLine((prevTrendingLine) => {
      const prevTrendingLineMap = trendingLine?.map((item: any) => {
        const itemOld: any = prevTrendingLine.find((item2: any) => {
          return item2.id === item.id;
        });
        if (itemOld) {
          return {
            ...itemOld,
            ...item,
          };
        } else {
          return item;
        }
      });
      return prevTrendingLineMap;
    });
  };
  const handleChangeListNganh = (
    value: string[] | { label: string; value: string }[]
  ) => {
    if (value === "All") {
    }
    // Cập nhật trạng thái dựa trên giá trị mới
    setListNganhPicked(() => {
      if (value.length === 0) {
        return [];
      }
      const newValue = value.map((item) =>
        typeof item === "object" ? item.value : item
      );
      return newValue;
    });
  };
  const handleChangeListVonHoa = (
    value: string[] | { label: string; value: string }[]
  ) => {
    if (value === "All") {
    }
    // Cập nhật trạng thái dựa trên giá trị mới
    setListVonHoaPicked(() => {
      if (value.length === 0) {
        return [];
      }
      const newValue = value.map((item) =>
        typeof item === "object" ? item.value : item
      );
      return newValue;
    });
  };
  const showModal = (value) => {
    setSelectedValue(value);
    setSelectedChild("");
    setIsModalVisible(true);
  };
  const onChangeSlider = (value: any, index: any) => {
    handleChangeSelectIndex(
      index,
      [ConvertNumber(value[0]), ConvertNumber(value[1])],
      "rightIndexValue"
    );
  };
  return (
    <StyledCommunity
      style={{
        height: tabMenuTarget === "target" ? "100%" : "584px",
      }}
      screen_mode={screenMode}
    >
      {contextHolder}
      <div
        className={
          tabMenuTarget === "target"
            ? "target-box-filter"
            : "frameParent-change"
        }
      >
        <div className={"chTiuParent8"}>
          <div
            onClick={() => setTabMenuTarget("target")}
            className={tabMenuTarget === "target" ? "btn2" : "btn1"}
          >
            <div
              className={tabMenuTarget === "target" ? "icon-btn2" : "icon-btn1"}
            >
              <svg
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.166992 1.41304C0.166992 1.17089 0.262771 0.938653 0.433259 0.767424C0.603746 0.596195 0.834977 0.5 1.07608 0.5H19.2579C19.499 0.5 19.7302 0.596195 19.9007 0.767424C20.0712 0.938653 20.167 1.17089 20.167 1.41304C20.167 1.6552 20.0712 1.88743 19.9007 2.05866C19.7302 2.22989 19.499 2.32609 19.2579 2.32609H1.07608C0.834977 2.32609 0.603746 2.22989 0.433259 2.05866C0.262771 1.88743 0.166992 1.6552 0.166992 1.41304ZM3.1973 7.5C3.1973 7.25785 3.29307 7.02561 3.46356 6.85438C3.63405 6.68315 3.86528 6.58696 4.10639 6.58696H16.2276C16.4687 6.58696 16.6999 6.68315 16.8704 6.85438C17.0409 7.02561 17.1367 7.25785 17.1367 7.5C17.1367 7.74215 17.0409 7.97439 16.8704 8.14562C16.6999 8.31685 16.4687 8.41304 16.2276 8.41304H4.10639C3.86528 8.41304 3.63405 8.31685 3.46356 8.14562C3.29307 7.97439 3.1973 7.74215 3.1973 7.5ZM6.83366 13.587C6.83366 13.3448 6.92944 13.1126 7.09993 12.9413C7.27041 12.7701 7.50164 12.6739 7.74275 12.6739H12.5912C12.8323 12.6739 13.0636 12.7701 13.2341 12.9413C13.4045 13.1126 13.5003 13.3448 13.5003 13.587C13.5003 13.8291 13.4045 14.0613 13.2341 14.2326C13.0636 14.4038 12.8323 14.5 12.5912 14.5H7.74275C7.50164 14.5 7.27041 14.4038 7.09993 14.2326C6.92944 14.0613 6.83366 13.8291 6.83366 13.587Z"
                  fill={
                    tabMenuTarget === "target"
                      ? screenMode === "dark"
                        ? "#99BAFF"
                        : "rgba(0, 74, 234, 1)"
                      : "#818498"
                  }
                />
              </svg>
            </div>
            <div className="chTiu10">Bộ lọc chỉ tiêu</div>
          </div>
          <div
            onClick={() => setTabMenuTarget("setting")}
            className={tabMenuTarget === "setting" ? "btn2" : "btn1"}
          >
            <div
              className={
                tabMenuTarget === "setting" ? "icon-btn2" : "icon-btn1"
              }
            >
              <svg
                width="24"
                height="23"
                viewBox="0 0 24 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.25 0.5C3.66421 0.5 4 0.843595 4 1.26744V10.8215C5.43335 11.168 6.5 12.4856 6.5 14.0581C6.5 15.6307 5.43335 16.9483 4 17.2947V21.7326C4 22.1564 3.66421 22.5 3.25 22.5C2.83579 22.5 2.5 22.1564 2.5 21.7326V17.2947C1.06665 16.9483 0 15.6307 0 14.0581C0 12.4856 1.06665 11.168 2.5 10.8215V1.26744C2.5 0.843595 2.83579 0.5 3.25 0.5ZM12 0.5C12.4142 0.5 12.75 0.843595 12.75 1.26744V4.4262C14.1834 4.77265 15.25 6.09026 15.25 7.66279C15.25 9.23532 14.1834 10.5529 12.75 10.8994V21.7326C12.75 22.1564 12.4142 22.5 12 22.5C11.5858 22.5 11.25 22.1564 11.25 21.7326V10.8994C9.81665 10.5529 8.75 9.23532 8.75 7.66279C8.75 6.09026 9.81665 4.77265 11.25 4.4262V1.26744C11.25 0.843595 11.5858 0.5 12 0.5ZM20.75 0.5C21.1642 0.5 21.5 0.843595 21.5 1.26744V12.1006C22.9333 12.4471 24 13.7647 24 15.3372C24 16.9097 22.9333 18.2273 21.5 18.5738V21.7326C21.5 22.1564 21.1642 22.5 20.75 22.5C20.3358 22.5 20 22.1564 20 21.7326V18.5738C18.5667 18.2273 17.5 16.9097 17.5 15.3372C17.5 13.7647 18.5667 12.4471 20 12.1006V1.26744C20 0.843595 20.3358 0.5 20.75 0.5ZM12 5.87209C11.0335 5.87209 10.25 6.67382 10.25 7.66279C10.25 8.65176 11.0335 9.45349 12 9.45349C12.9665 9.45349 13.75 8.65176 13.75 7.66279C13.75 6.67382 12.9665 5.87209 12 5.87209ZM3.25 12.2674C2.2835 12.2674 1.5 13.0692 1.5 14.0581C1.5 15.0471 2.2835 15.8488 3.25 15.8488C4.2165 15.8488 5 15.0471 5 14.0581C5 13.0692 4.2165 12.2674 3.25 12.2674ZM20.75 13.5465C19.7835 13.5465 19 14.3482 19 15.3372C19 16.3262 19.7835 17.1279 20.75 17.1279C21.7165 17.1279 22.5 16.3262 22.5 15.3372C22.5 14.3482 21.7165 13.5465 20.75 13.5465Z"
                  fill={
                    tabMenuTarget === "setting"
                      ? screenMode === "dark"
                        ? "#99BAFF"
                        : "rgba(0, 74, 234, 1)"
                      : "#818498"
                  }
                />
              </svg>
            </div>
            <div className="chTiu10">Bộ lọc kỹ thuật</div>
          </div>

          <div
            onClick={() => setTabMenuTarget("congcu")}
            className={tabMenuTarget === "congcu" ? "btn2" : "btn1"}
          >
            <div
              className={
                tabMenuTarget === "congcu"
                  ? "icon-congcu-active"
                  : "icon-congcu"
              }
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8342 7.63123C12.1948 7.63123 11.5617 7.75717 10.9709 8.00186C10.3802 8.24655 9.84344 8.6052 9.39131 9.05732C8.93918 9.50945 8.58053 10.0462 8.33584 10.6369C8.09115 11.2277 7.96521 11.8608 7.96521 12.5002C7.96521 13.1396 8.09115 13.7728 8.33584 14.3635C8.58053 14.9542 8.93918 15.491 9.39131 15.9431C9.84344 16.3953 10.3802 16.7539 10.9709 16.9986C11.5617 17.2433 12.1948 17.3692 12.8342 17.3692C14.1255 17.3692 15.364 16.8562 16.2771 15.9431C17.1902 15.03 17.7032 13.7916 17.7032 12.5002C17.7032 11.2089 17.1902 9.97044 16.2771 9.05732C15.364 8.14421 14.1255 7.63123 12.8342 7.63123ZM9.46521 12.5002C9.46521 11.6067 9.82016 10.7498 10.452 10.118C11.0838 9.48617 11.9407 9.13123 12.8342 9.13123C13.7277 9.13123 14.5846 9.48617 15.2165 10.118C15.8483 10.7498 16.2032 11.6067 16.2032 12.5002C16.2032 13.3937 15.8483 14.2507 15.2165 14.8825C14.5846 15.5143 13.7277 15.8692 12.8342 15.8692C11.9407 15.8692 11.0838 15.5143 10.452 14.8825C9.82016 14.2507 9.46521 13.3937 9.46521 12.5002Z"
                  fill={
                    tabMenuTarget === "congcu"
                      ? screenMode === "dark"
                        ? "#99BAFF"
                        : "rgba(0, 74, 234, 1)"
                      : "#818498"
                  }
                />
                <path
                  d="M15.5282 2.51473C14.7377 -0.170273 10.9307 -0.170273 10.1402 2.51473L9.99921 2.99323C9.94401 3.18065 9.84756 3.35335 9.71694 3.49866C9.58631 3.64397 9.42483 3.75821 9.24432 3.833C9.06382 3.9078 8.86886 3.94125 8.67374 3.9309C8.47863 3.92056 8.2883 3.86668 8.11671 3.77323L7.67871 3.53323C5.21871 2.19523 2.52921 4.88623 3.86871 7.34473L4.10721 7.78273C4.20067 7.95431 4.25454 8.14464 4.26489 8.33976C4.27523 8.53487 4.24178 8.72983 4.16699 8.91034C4.0922 9.09085 3.97796 9.25233 3.83265 9.38295C3.68734 9.51357 3.51464 9.61002 3.32721 9.66523L2.84871 9.80623C0.163711 10.5967 0.163711 14.4037 2.84871 15.1942L3.32721 15.3352C3.51464 15.3904 3.68734 15.4869 3.83265 15.6175C3.97796 15.7481 4.0922 15.9096 4.16699 16.0901C4.24178 16.2706 4.27523 16.4656 4.26489 16.6607C4.25454 16.8558 4.20067 17.0461 4.10721 17.2177L3.86721 17.6557C2.52921 20.1157 5.21871 22.8067 7.67871 21.4657L8.11671 21.2272C8.2883 21.1338 8.47863 21.0799 8.67374 21.0695C8.86886 21.0592 9.06382 21.0927 9.24432 21.1674C9.42483 21.2422 9.58631 21.3565 9.71694 21.5018C9.84756 21.6471 9.94401 21.8198 9.99921 22.0072L10.1402 22.4857C10.9307 25.1707 14.7377 25.1707 15.5282 22.4857L15.6692 22.0072C15.7244 21.8198 15.8209 21.6471 15.9515 21.5018C16.0821 21.3565 16.2436 21.2422 16.4241 21.1674C16.6046 21.0927 16.7996 21.0592 16.9947 21.0695C17.1898 21.0799 17.3801 21.1338 17.5517 21.2272L17.9897 21.4672C20.4497 22.8067 23.1407 20.1142 21.7997 17.6557L21.5612 17.2177C21.4678 17.0461 21.4139 16.8558 21.4035 16.6607C21.3932 16.4656 21.4266 16.2706 21.5014 16.0901C21.5762 15.9096 21.6905 15.7481 21.8358 15.6175C21.9811 15.4869 22.1538 15.3904 22.3412 15.3352L22.8197 15.1942C25.5047 14.4037 25.5047 10.5967 22.8197 9.80623L22.3412 9.66523C22.1538 9.61002 21.9811 9.51357 21.8358 9.38295C21.6905 9.25233 21.5762 9.09085 21.5014 8.91034C21.4266 8.72983 21.3932 8.53487 21.4035 8.33976C21.4139 8.14464 21.4678 7.95431 21.5612 7.78273L21.8012 7.34473C23.1407 4.88473 20.4482 2.19523 17.9897 3.53473L17.5517 3.77323C17.3801 3.86668 17.1898 3.92056 16.9947 3.9309C16.7996 3.94125 16.6046 3.9078 16.4241 3.833C16.2436 3.75821 16.0821 3.64397 15.9515 3.49866C15.8209 3.35335 15.7244 3.18065 15.6692 2.99323L15.5282 2.51473ZM11.5787 2.93923C11.9477 1.68673 13.7207 1.68673 14.0897 2.93923L14.2307 3.41773C14.3492 3.81985 14.5563 4.19036 14.8366 4.50208C15.1169 4.81379 15.4635 5.05882 15.8508 5.2192C16.2382 5.37957 16.6565 5.45123 17.0751 5.42891C17.4938 5.40659 17.9021 5.29087 18.2702 5.09023L18.7067 4.85023C19.8527 4.22773 21.1067 5.48023 20.4827 6.62773L20.2442 7.06573C20.0439 7.43387 19.9284 7.84217 19.9064 8.26071C19.8843 8.67925 19.9561 9.09743 20.1166 9.4846C20.2771 9.87178 20.5222 10.2181 20.834 10.4983C21.1457 10.7785 21.5162 10.9853 21.9182 11.1037L22.3952 11.2447C23.6477 11.6137 23.6477 13.3867 22.3952 13.7557L21.9167 13.8967C21.5146 14.0153 21.1441 14.2223 20.8324 14.5026C20.5206 14.783 20.2756 15.1295 20.1152 15.5168C19.9549 15.9042 19.8832 16.3225 19.9055 16.7411C19.9278 17.1598 20.0436 17.5681 20.2442 17.9362L20.4842 18.3727C21.1067 19.5187 19.8542 20.7727 18.7067 20.1487L18.2702 19.9102C17.902 19.7096 17.4936 19.5939 17.0749 19.5717C16.6561 19.5495 16.2377 19.6213 15.8504 19.7818C15.463 19.9423 15.1165 20.1875 14.8362 20.4994C14.556 20.8113 14.3491 21.182 14.2307 21.5842L14.0897 22.0612C13.7207 23.3137 11.9477 23.3137 11.5787 22.0612L11.4377 21.5827C11.3191 21.1808 11.1121 20.8105 10.8319 20.4989C10.5517 20.1874 10.2053 19.9425 9.81815 19.7821C9.43099 19.6217 9.01287 19.55 8.59441 19.5722C8.17595 19.5944 7.76775 19.7099 7.39971 19.9102L6.96171 20.1502C5.81571 20.7727 4.56171 19.5202 5.18571 18.3727L5.42421 17.9362C5.62514 17.5681 5.74109 17.1596 5.76355 16.7408C5.78601 16.322 5.71442 15.9034 5.55403 15.5159C5.39363 15.1284 5.1485 14.7816 4.83663 14.5012C4.52475 14.2208 4.15405 14.0137 3.75171 13.8952L3.27321 13.7542C2.02071 13.3852 2.02071 11.6122 3.27321 11.2432L3.75171 11.1022C4.15342 10.9836 4.52352 10.7766 4.83492 10.4965C5.14633 10.2164 5.39116 9.87017 5.55149 9.48321C5.71183 9.09625 5.78361 8.67834 5.76159 8.26006C5.73956 7.84177 5.62429 7.43371 5.42421 7.06573L5.18421 6.62773C4.56171 5.48173 5.81421 4.22773 6.96171 4.85173L7.39971 5.09023C7.76775 5.29059 8.17595 5.40609 8.59441 5.42826C9.01287 5.45043 9.43099 5.37871 9.81815 5.21835C10.2053 5.058 10.5517 4.81307 10.8319 4.50151C11.1121 4.18995 11.3191 3.81964 11.4377 3.41773L11.5787 2.93923Z"
                  fill={
                    tabMenuTarget === "congcu"
                      ? screenMode === "dark"
                        ? "#99BAFF"
                        : "rgba(0, 74, 234, 1)"
                      : "#818498"
                  }
                />
              </svg>
            </div>
            <div className="chTiu10">Cài đặt tín hiệu</div>
          </div>
        </div>

        {tabMenuTarget === "target" ? (
          <div className={"frameParent847"}>
            <div className={"frameParent848"}>
              {listChiTieu.map((item: any, index: any) => {
                const ishover =
                  isHoverChiTieu[1] && isHoverChiTieu[0] === item.label;

                return (
                  <div
                    onClick={() => {
                      showModal(item.value);
                    }}
                    className={
                      item.numberPick > 0 ? "is-number-pick" : "item-change"
                    }
                  >
                    <div className={"nhmThngDng10"}>{item.label}</div>
                    {item?.numberPick > 0 && (
                      <div className="el">{item?.numberPick}</div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={"frameParent854"}>
              <div
                className="box-value"
                style={{
                  display: listTieuChiPicked.length === 0 ? "flex" : "block",
                }}
              >
                {listTieuChiPicked.length > 0 &&
                  listTieuChiPicked.map((item: any, index: any) => {
                    return (
                      <div
                        className="item-value"
                        // ref={bottomEl}
                        key={index}
                      >
                        <div className="header-value">
                          <Tooltip title={item.label}>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "20px",
                                color:
                                  screenMode === "light"
                                    ? "rgba(46, 49, 56, 1)"
                                    : "rgba(255, 255, 255, 1)",
                              }}
                            >
                              • {item.label}
                            </div>
                          </Tooltip>
                          <CloseOutlined
                            onMouseEnter={() => {
                              setIsHoverClear([item, true]);
                            }}
                            onMouseLeave={() => {
                              setIsHoverClear([item, false]);
                            }}
                            onClick={() => {
                              handleClearTieuChi(index);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                          }}
                        >
                          {item?.leftIndexList?.length === 1 ? (
                            <div
                              style={{
                                width: 120,
                                color:
                                  screenMode === "light"
                                    ? "rgba(46, 49, 56, 1)"
                                    : "rgba(255, 255, 255, 1)",
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              {item.leftIndexList[0]}
                            </div>
                          ) : (
                            <></>
                          )}
                          {item?.leftIndexList?.length > 1 && (
                            <Select
                              suffixIcon={<img src={iconDrop}></img>}
                              value={item.leftIndexList[item.leftIndexValue]}
                              onSelect={(e) => {
                                handleChangeSelectIndex(
                                  currentChangeTieuChiLeft.index,
                                  index,
                                  "leftIndexValue"
                                );
                              }}
                              optionLabelProp="label"
                              onClick={(e) => {
                                handleClickListItemLeft(e, { index, ...item });
                              }}
                              options={currentChangeTieuChiLeft?.leftIndexList?.map(
                                (item: any, index: any) => {
                                  return {
                                    label: item,
                                    value: index,
                                  };
                                }
                              )}
                            ></Select>
                          )}

                          {/* {item.compareList.length === 0 && (
                            <div style={{ width: 76 }}></div>
                          )} */}

                          {item.compareList.length === 1 &&
                            item.compareList[0] === "range" && (
                              <div
                                style={{
                                  width:
                                    item?.leftIndexList?.length === 1 ||
                                    item?.compareList.length === 3 ||
                                    item.compareList[0] === "slider" ||
                                    (item?.compareList.length === 3 &&
                                      item.compareList[0] === "nen") ||
                                    item?.compareList.length === 3 ||
                                    item?.percentList?.length > 0 ||
                                    item.rightIndexList.length === 1 ||
                                    (item.rightIndexList.length > 1 &&
                                      item.compareList[0] !== "range") ||
                                    item.intervalList.length > 0 ||
                                    item?.listMonth?.length ||
                                    item?.sessionList?.length > 0 ||
                                    item?.compareList.length === 2
                                      ? "100%"
                                      : "100%",
                                  minWidth:
                                    item.compareList.length === 1 &&
                                    item.compareList[0] === "range"
                                      ? "none"
                                      : "330px",

                                  position: "relative",
                                  marginTop: 0,
                                  fontSize: 12,

                                  color:
                                    screenMode === "light"
                                      ? "rgba(46, 49, 56, 1)"
                                      : "rgba(255, 255, 255, 1)",
                                  fontWeight: "bold",
                                  userSelect: "none",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 12,
                                    marginRight: 20,
                                    // marginBottom: 4,
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    className="input-value-pick"
                                    onKeyDown={(e) => {
                                      handleKeyDownLeft(e, index, item);
                                    }}
                                    style={{
                                      lineHeight: "20px",
                                      fontSize: "14px",
                                      fontWeight: 400,

                                      padding: "10px 16px",

                                      borderRadius: "6px",
                                      background:
                                        screenMode === "dark"
                                          ? "transparent"
                                          : "#fff",
                                      color:
                                        screenMode === "light"
                                          ? "rgba(46, 49, 56, 1)"
                                          : "rgba(255, 255, 255, 1)",
                                      outline: "none",
                                      height: "40px",
                                    }}
                                    type="text"
                                    value={item.rightIndexValue[0]}
                                    onChange={(e) => {
                                      if (
                                        +e.target.value < item.rightIndexList[0]
                                      )
                                        return;
                                      if (
                                        +e.target.value > item.rightIndexList[1]
                                      )
                                        return;
                                      onChangeInputLeft(
                                        item,
                                        e.target.value,
                                        index
                                      );
                                    }}
                                  />
                                  <span style={{ fontSize: "14px" }}>
                                    {LIST_PERCENT_FILTER.includes(
                                      item?.label
                                    ) && "%"}
                                  </span>
                                </div>
                                <Slider
                                  tooltip={{
                                    formatter: (e: any) => {
                                      return <div>{ConvertNumber(e)}</div>;
                                    },
                                  }}
                                  style={{
                                    width: "100%",
                                  }}
                                  range
                                  // step={1}
                                  value={[
                                    ConvertStringToNumber(
                                      item?.rightIndexValue[0]
                                    ),
                                    ConvertStringToNumber(
                                      item?.rightIndexValue[1]
                                    ),
                                  ]}
                                  onChange={(value) => {
                                    onChangeSlider(value, index);
                                  }}
                                  // onChangeComplete={(value: any) => {
                                  //   onChangeComplete(value);
                                  // }}
                                  min={item.rightIndexList[0]}
                                  max={item.rightIndexList[1]}
                                />
                                {/* <Checkbox
                                style={{ marginLeft: '10px' }}
                                onChange={onChange}
                              ></Checkbox> */}
                                <div
                                  style={{
                                    fontSize: 12,
                                    marginLeft: 20,

                                    fontWeight: "bold",
                                    display: "flex",
                                  }}
                                >
                                  <input
                                    className="input-value-pick"
                                    onKeyDown={(e) => {
                                      handleKeyDownRight(e, index, item);
                                    }}
                                    style={{
                                      lineHeight: "20px",
                                      fontSize: "14px",
                                      height: "40px",
                                      fontWeight: 400,

                                      padding: "10px 16px",

                                      borderRadius: "6px",
                                      background:
                                        screenMode === "dark"
                                          ? "transparent"
                                          : "#fff",
                                      color:
                                        screenMode === "light"
                                          ? "rgba(46, 49, 56, 1)"
                                          : "rgba(255, 255, 255, 1)",
                                      outline: "none",
                                    }}
                                    type="text"
                                    value={item.rightIndexValue[1]}
                                    onChange={(e) => {
                                      if (
                                        +e.target.value < item.rightIndexList[0]
                                      )
                                        return;
                                      if (
                                        +e.target.value > item.rightIndexList[1]
                                      )
                                        return;
                                      onChangeInputRight(
                                        item,
                                        e.target.value,
                                        index
                                      );
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {LIST_PERCENT_FILTER.includes(
                                      item?.label
                                    ) && "%"}
                                  </span>
                                </div>
                              </div>
                            )}
                          {item?.compareList.length === 2 && (
                            <Select
                              style={{ width: "141px" }}
                              suffixIcon={<img src={iconDrop}></img>}
                              value={item.compareList[item.compare]}
                              onSelect={(e) => {
                                handleChangeSelectIndex(
                                  currentChangeTieuChi.index,
                                  e === "Cắt lên trên" ? 0 : 1,
                                  "compare"
                                );
                              }}
                              optionLabelProp="label"
                              onClick={(e) => {
                                handleClickListItem(e, { index, ...item });
                              }}
                            >
                              {currentChangeTieuChi?.compareList?.map(
                                (item2: any, index: any) => {
                                  return (
                                    <Option
                                      key={item2}
                                      value={item2}
                                      // label={
                                      //   <div>
                                      //     {index === 0 ? (
                                      //       <RiseOutlined />
                                      //     ) : (
                                      //       <FallOutlined />
                                      //     )}
                                      //   </div>
                                      // }
                                    >
                                      <div>{item2}</div>
                                    </Option>
                                  );
                                }
                              )}
                            </Select>
                          )}
                          {item?.compareList.length === 3 &&
                            item.compareList[0] === "slider" && (
                              <div
                                style={{
                                  width: 330,

                                  position: "relative",
                                  marginTop: 0,
                                  fontSize: 12,
                                  marginLeft: "10px",
                                  marginRight: 8,

                                  color:
                                    screenMode === "light"
                                      ? "rgba(46, 49, 56, 1)"
                                      : "rgba(255, 255, 255, 1)",
                                  fontWeight: "bold",
                                  userSelect: "none",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}
                              >
                                <Slider
                                  style={{ width: "135px" }}
                                  value={item.rightIndexValue}
                                  min={item.compareList[1]}
                                  max={item.compareList[2]}
                                  onChange={(value) => {
                                    onChangeSliderSinger(value, index);
                                  }}
                                />
                                <div
                                  style={{
                                    fontSize: 12,
                                    marginLeft: 28,
                                    fontWeight: "bold",
                                    display: "flex",
                                    width: "58px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: "bold",
                                      marginRight: 8,
                                      // color:
                                      //   screenMode === 'light'
                                      //     ? 'rgba(46, 49, 56, 1)'
                                      //     : 'rgba(255, 255, 255, 1)',
                                    }}
                                  >
                                    {" "}
                                    {item.rightIndexValue}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: "bold",
                                      // color:
                                      //   screenMode === 'light'
                                      //     ? 'rgba(46, 49, 56, 1)'
                                      //     : 'rgba(255, 255, 255, 1)',
                                    }}
                                  >
                                    phiên
                                  </div>
                                </div>
                              </div>
                            )}
                          {item?.compareList.length === 3 &&
                            item.compareList[0] === "nen" && (
                              <div
                                style={{
                                  width: 330,
                                  height: 20,
                                  position: "relative",
                                  marginTop: 0,
                                  fontSize: 12,
                                  marginLeft: "10px",
                                  marginRight: 8,
                                  color:
                                    screenMode === "light"
                                      ? "rgba(46, 49, 56, 1)"
                                      : "rgba(255, 255, 255, 1)",
                                  fontWeight: "bold",
                                  userSelect: "none",
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "flex-end",
                                }}
                              >
                                <Slider
                                  style={{ width: "135px" }}
                                  value={item.rightIndexValue}
                                  min={item.compareList[1]}
                                  max={item.compareList[2]}
                                  onChange={(value) => {
                                    onChangeSliderSinger(value, index);
                                  }}
                                />
                                <div
                                  style={{
                                    fontSize: 12,
                                    marginLeft: 28,
                                    marginBottom: 4,
                                    fontWeight: "bold",
                                    display: "flex",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: "bold",
                                      marginRight: 8,
                                      color:
                                        screenMode === "light"
                                          ? "rgba(46, 49, 56, 1)"
                                          : "rgba(255, 255, 255, 1)",
                                    }}
                                  >
                                    {" "}
                                    {item.rightIndexValue}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: "bold",
                                      color:
                                        screenMode === "light"
                                          ? "rgba(46, 49, 56, 1)"
                                          : "rgba(255, 255, 255, 1)",
                                    }}
                                  >
                                    nến
                                  </div>
                                </div>
                              </div>
                            )}
                          {/* {item?.compareList.length === 3 && (
                          <Select
                            suffixIcon={<img src={iconDrop}></img>}
                            value={item.compareList[item.compare]}
                            onSelect={(e) => {
                              handleChangeSelectIndex(
                                currentChangeTieuChi.index,
                                e,
                                'compare'
                              );
                            }}
                            optionLabelProp="label"
                            onClick={(e) => {
                              handleClickListItem(e, { index, ...item });
                            }}
                            options={currentChangeTieuChi?.compareList?.map(
                              (item: any, index: any) => {
                                return {
                                  label: item,
                                  value: index,
                                };
                              }
                            )}
                          ></Select>
                          // <div
                          //   style={{
                          //     width: '285px',
                          //     height: 20,
                          //     position: 'relative',

                          //     fontSize:
                          //       item.compare === 1 || item.compare === 4
                          //         ? 17
                          //         : 20,
                          //     marginRight: 8,
                          //     color:
                          //       item.compare < 2
                          //         ? '#3CDC96'
                          //         : item.compare > 2
                          //         ? '#FF5858'
                          //         : '#FFA758',
                          //     fontWeight: 'bold',
                          //     userSelect: 'none',
                          //     cursor: 'pointer',
                          //     display: 'flex',
                          //     justifyContent: 'center',
                          //     alignItems: 'flex-end',
                          //   }}
                          //   onClick={(e) => {
                          //     handleClickListItem(e, { index, ...item });
                          //   }}
                          // >
                          //   {item.compare === 0 && '>'}
                          //   {item.compare === 1 && '≥'}
                          //   {item.compare === 2 && '='}
                          //   {item.compare === 3 && '<'}
                          //   {item.compare === 4 && '≤'}
                          //   <div
                          //     style={{
                          //       fontSize: 10,
                          //       marginLeft: '5px',
                          //     }}
                          //   >
                          //     <img src={iconDrop} alt="" />
                          //   </div>
                          // </div>
                        )} */}

                          {item?.percentList?.length > 0 && (
                            <Select
                              suffixIcon={<img src={iconDrop}></img>}
                              value={item.percentList[item.percent]}
                              onSelect={(e) => {
                                handleChangeSelectIndex(
                                  currentChangePercent.index,
                                  e,
                                  "percent"
                                );
                              }}
                              options={currentChangePercent?.percentList?.map(
                                (item: any, index: any) => {
                                  return {
                                    label: item,
                                    value: index,
                                  };
                                }
                              )}
                              onClick={(e) => {
                                handleClickListItemPercent(e, {
                                  index,
                                  ...item,
                                });
                              }}
                            >
                              {/* {item.intervalList[item.interval]} */}
                            </Select>
                            // <div
                            //   onMouseEnter={() => {
                            //     setIsHoverPercent([item, true]);
                            //   }}
                            //   onMouseLeave={() => {
                            //     setIsHoverPercent([item, false]);
                            //   }}
                            //   style={{
                            //     color:
                            //       isHoverPercent[1] && isHoverPercent[0] === item
                            //         ? '#856DFC'
                            //         : '#fff',
                            //     width: 140,
                            //     fontWeight: 'bold',
                            //     userSelect: 'none',
                            //     cursor: 'pointer',
                            //     display: 'flex',
                            //     justifyContent: 'flex-end',
                            //     alignItems: 'center',
                            //     fontSize: 12,
                            //   }}
                            //   onClick={(e) => {
                            //     handleClickListItemPercent(e, { index, ...item });
                            //   }}
                            // >
                            //   {item.percentList[item.percent]}
                            //   <div style={{ fontSize: 10 }}>
                            //     <img src={iconDrop} alt="" />
                            //   </div>
                            // </div>
                          )}
                          {item.rightIndexList.length === 1 && (
                            <div
                              style={{
                                fontSize: 12,
                                color:
                                  screenMode === "light"
                                    ? "rgba(46, 49, 56, 1)"
                                    : "rgba(255, 255, 255, 1)",
                              }}
                            >
                              {item.rightIndexList[0]}
                            </div>
                          )}
                          {item.rightIndexList.length > 1 &&
                            item.compareList[0] !== "range" && (
                              <Select
                                suffixIcon={<img src={iconDrop}></img>}
                                value={
                                  item.rightIndexList[item.rightIndexValue]
                                }
                                onSelect={(e) => {
                                  handleChangeSelectIndex(
                                    currentChangeTieuChiRight.index,
                                    e,
                                    "rightIndexValue"
                                  );
                                }}
                                options={currentChangeTieuChiRight?.rightIndexList?.map(
                                  (item: any, index: any) => {
                                    return {
                                      label: item,
                                      value: index,
                                    };
                                  }
                                )}
                                onClick={(e) => {
                                  handleClickListItemRight(e, {
                                    index,
                                    ...item,
                                  });
                                }}
                              ></Select>
                            )}

                          {item.leftIndexList.length === 0 &&
                            item.compareList.length === 0 &&
                            item.rightIndexList.length === 0 &&
                            item.compareList[0] === "range" && (
                              <div style={{ width: 260 }}></div>
                            )}
                          {item.intervalList.length > 0 && (
                            <Select
                              suffixIcon={<img src={iconDrop}></img>}
                              value={item.intervalList[item.interval]}
                              onSelect={(e) => {
                                handleChangeInterval(e);
                              }}
                              options={currentChangeTieuChiInterval?.intervalList?.map(
                                (item: any, index: any) => {
                                  return {
                                    label: item,
                                    value: index,
                                  };
                                }
                              )}
                              onClick={(e) => {
                                handleClickListItemInterval(e, {
                                  index,
                                  ...item,
                                });
                              }}
                            >
                              {item.intervalList[item.interval]}
                            </Select>
                          )}

                          {item?.listMonth?.length > 0 && (
                            <Select
                              suffixIcon={<img src={iconDrop}></img>}
                              value={item.listMonth[item.month]}
                              onSelect={(e) => {
                                handleChangeSelectIndex(
                                  currentChangeTieuChiQuy.index,
                                  e,
                                  "month"
                                );
                              }}
                              options={currentChangeTieuChiQuy?.listMonth?.map(
                                (item: any, index: any) => {
                                  return {
                                    label: item,
                                    value: index,
                                  };
                                }
                              )}
                              onClick={(e) => {
                                handleClickQuy(e, { index, ...item });
                              }}
                            >
                              {item.listMonth[item.month]}
                            </Select>
                            // <div
                            //   onMouseEnter={() => {
                            //     setIsHoverQuy([item, true]);
                            //   }}
                            //   onMouseLeave={() => {
                            //     setIsHoverQuy([item, false]);
                            //   }}
                            //   style={{
                            //     color:
                            //       isHoverQuy[1] && isHoverQuy[0] === item
                            //         ? '#856DFC'
                            //         : '#fff',
                            //     width: 140,
                            //     fontWeight: 'bold',
                            //     userSelect: 'none',
                            //     cursor: 'pointer',
                            //     display: 'flex',
                            //     justifyContent: 'flex-end',
                            //     alignItems: 'center',
                            //     fontSize: 12,
                            //   }}
                            //   onClick={(e) => {
                            //     handleClickQuy(e, { index, ...item });
                            //   }}
                            // >
                            //   {item.listMonth[item.month]}
                            //   <div style={{ fontSize: 10 }}>
                            //     <img src={iconDrop} alt="" />
                            //   </div>
                            // </div>
                          )}
                          {item?.sessionList?.length > 0 && (
                            <Select
                              suffixIcon={<img src={iconDrop}></img>}
                              value={item.sessionList[item.session]}
                              onSelect={(e) => {
                                handleChangeSelectIndex(
                                  currentChangeSession.index,
                                  e,
                                  "session"
                                );
                              }}
                              options={currentChangeSession?.sessionList?.map(
                                (item: any, index: any) => {
                                  return {
                                    label: item,
                                    value: index,
                                  };
                                }
                              )}
                              onClick={(e) => {
                                handleClickListItemSession(e, {
                                  index,
                                  ...item,
                                });
                              }}
                            >
                              {item.sessionList[item.session]}
                            </Select>
                            // <div
                            //   onMouseEnter={() => {
                            //     setIsHoverSession([item, true]);
                            //   }}
                            //   onMouseLeave={() => {
                            //     setIsHoverSession([item, false]);
                            //   }}
                            //   style={{
                            //     color:
                            //       isHoverSession[1] && isHoverSession[0] === item
                            //         ? '#856DFC'
                            //         : '#fff',
                            //     width: 140,
                            //     fontWeight: 'bold',
                            //     userSelect: 'none',
                            //     cursor: 'pointer',
                            //     display: 'flex',
                            //     justifyContent: 'flex-end',
                            //     alignItems: 'center',
                            //     fontSize: 12,
                            //   }}
                            //   onClick={(e) => {
                            //     handleClickListItemSession(e, { index, ...item });
                            //   }}
                            // >
                            //   {item.sessionList[item.session]}
                            //   <div style={{ fontSize: 10 }}>
                            //     <img src={iconDrop} alt="" />
                            //   </div>
                            // </div>
                          )}
                          {item?.booleanList?.length > 0 && (
                            <Select
                              style={{ width: "80px" }}
                              suffixIcon={<img src={iconDrop}></img>}
                              value={item.booleanList[item.boolean]}
                              onSelect={(e) => {
                                handleChangeSelectIndex(
                                  currentChangeBoolean.index,
                                  e,
                                  "boolean"
                                );
                              }}
                              options={currentChangeBoolean?.booleanList?.map(
                                (item: any, index: any) => {
                                  return {
                                    label: item,
                                    value: index,
                                  };
                                }
                              )}
                              onClick={(e) => {
                                handleClickListBoolean(e, { index, ...item });
                              }}
                            >
                              {item.booleanList[item.boolean]}
                            </Select>
                            // <div
                            //   onMouseEnter={() => {
                            //     setIsHoverBoolean([item, true]);
                            //   }}
                            //   onMouseLeave={() => {
                            //     setIsHoverBoolean([item, false]);
                            //   }}
                            //   style={{
                            //     color:
                            //       isHoverBoolean[1] && isHoverBoolean[0] === item
                            //         ? '#856DFC'
                            //         : '#fff',
                            //     width: 140,
                            //     fontWeight: 'bold',
                            //     userSelect: 'none',
                            //     cursor: 'pointer',
                            //     display: 'flex',
                            //     justifyContent: 'flex-end',
                            //     alignItems: 'center',
                            //     fontSize: 12,
                            //   }}
                            //   onClick={(e) => {
                            //     handleClickListBoolean(e, { index, ...item });
                            //   }}
                            // >
                            //   {item.booleanList[item.boolean]}
                            //   <div style={{ fontSize: 10 }}>
                            //     <img src={iconDrop} alt="" />
                            //   </div>
                            // </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                {listTieuChiPicked.length === 0 && (
                  <div
                    style={{
                      boxShadow: "none",
                      padding: "0px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      flexDirection: "column",
                    }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.1667 22.5H15.8333V13.3333H14.1667V22.5ZM15 10.9617C15.2911 10.9617 15.535 10.8633 15.7317 10.6667C15.9283 10.47 16.0261 10.2261 16.025 9.935C16.0239 9.64389 15.9256 9.40056 15.73 9.205C15.5344 9.00945 15.2911 8.91111 15 8.91C14.7089 8.90889 14.4656 9.00722 14.27 9.205C14.0744 9.40278 13.9761 9.64667 13.975 9.93667C13.9739 10.2267 14.0722 10.47 14.27 10.6667C14.4678 10.8633 14.7111 10.9617 15 10.9617ZM15.005 30C12.9306 30 10.9806 29.6067 9.155 28.82C7.32944 28.0322 5.74111 26.9633 4.39 25.6133C3.03889 24.2633 1.96944 22.6767 1.18167 20.8533C0.393889 19.03 0 17.0806 0 15.005C0 12.9294 0.393889 10.9794 1.18167 9.155C1.96833 7.32945 3.03556 5.74111 4.38333 4.39C5.73111 3.03889 7.31833 1.96944 9.145 1.18167C10.9717 0.393889 12.9217 0 14.995 0C17.0683 0 19.0183 0.393889 20.845 1.18167C22.6706 1.96833 24.2589 3.03611 25.61 4.385C26.9611 5.73389 28.0306 7.32111 28.8183 9.14667C29.6061 10.9722 30 12.9217 30 14.995C30 17.0683 29.6067 19.0183 28.82 20.845C28.0333 22.6717 26.9644 24.26 25.6133 25.61C24.2622 26.96 22.6756 28.0294 20.8533 28.8183C19.0311 29.6072 17.0817 30.0011 15.005 30ZM15 28.3333C18.7222 28.3333 21.875 27.0417 24.4583 24.4583C27.0417 21.875 28.3333 18.7222 28.3333 15C28.3333 11.2778 27.0417 8.125 24.4583 5.54167C21.875 2.95833 18.7222 1.66667 15 1.66667C11.2778 1.66667 8.125 2.95833 5.54167 5.54167C2.95833 8.125 1.66667 11.2778 1.66667 15C1.66667 18.7222 2.95833 21.875 5.54167 24.4583C8.125 27.0417 11.2778 28.3333 15 28.3333Z"
                        fill="#818498"
                      />
                    </svg>

                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        letterSpacing: "0em",
                        textAlign: "left",
                        marginTop: "12px",
                        color:
                          screenMode === "light"
                            ? "rgba(46, 49, 56, 1)"
                            : "rgba(255, 255, 255, 1)",
                      }}
                    >
                      Vui lòng chọn các chỉ tiêu lọc cổ phiếu ở trên
                    </div>
                  </div>
                )}
              </div>
              <div className="footer-target">
                <div className={"parent885"}>
                  <div className={"label"}>K: Nghìn</div>
                  <div className={"label"}>M: Triệu</div>
                  <div className={"label"}>B: Tỷ</div>
                  <div className={"label"}>T: Nghìn tỷ</div>
                </div>

                <div className={"gitrParent8"}>
                  <div
                    onClick={() => setListTieuChiPicked([])}
                    // style={styles.button}
                    className={"iconoutlinededitordelete"}
                  >
                    Reset
                  </div>
                  <div
                    style={{
                      cursor: listTieuChiPicked.length <= 0 ? "none" : "auto",
                    }}
                    className={
                      listTieuChiPicked.length <= 0
                        ? "filter filter-disable"
                        : "filter"
                    }
                    aria-disabled={listTieuChiPicked.length < 0}
                    onClick={() => {
                      if (listTieuChiPicked.length > 0) {
                        onFilter();
                        handleToggle();
                      }
                    }}
                  >
                    Lọc
                  </div>
                </div>
              </div>
            </div>
            {isModalVisible && (
              <ModalFilter
                setValueSearch={setValueSearch}
                setSelectedChild={setSelectedChild}
                setSelectedValue={setSelectedValue}
                setIsModalVisible={setIsModalVisible}
                isModalVisible={isModalVisible}
                selectedChild={selectedChild}
                listSearch={listSearch}
                setListSearch={setListSearch}
                listMyFilter={listMyFilter}
                selectedValue={selectedValue}
                listOpenTieuChi={listOpenTieuChi}
                valueSearch={valueSearch}
                searchTarget={searchTarget}
                setListOpenTieuChi={setListOpenTieuChi}
                setListTieuChiPicked={setListTieuChiPicked}
                listTieuChiPicked={listTieuChiPicked}
                handleMyFilter={handleMyFilter}
                screenMode={screenMode}
                setPickerPopular={setPickerPopular}
                setPickerMyFilter={setPickerMyFilter}
                setPickerFluctuation={setPickerFluctuation}
                setPickerTechnique={setPickerTechnique}
                setPickerBasic={setPickerBasic}
              />
            )}
          </div>
        ) : tabMenuTarget === "congcu" ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <div>
              <div>
                <div>
                  <Tooltip title="Cài đặt thông báo báo về điện thoại khi giá cắt qua đường trendline">
                    <div
                      style={{
                        color:
                          screenMode === "light"
                            ? "rgba(46, 49, 56, 1)"
                            : "rgba(255, 255, 255, 1)",
                        display: "flex",

                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",

                        alignItems: "center",
                        cursor: "pointer",
                        gap: 8,
                      }}
                    >
                      Cài đặt cảnh báo đường kháng cự - hỗ trợ cổ phiếu
                      <span
                        style={{
                          color:
                            lastOrder?.LastPrice > lastOrder?.RefPrice
                              ? "#575a6a"
                              : "rgb(228, 54, 55)",
                          marginLeft: "4px",
                        }}
                      >
                        {curTab?.symbol} -{" "}
                        {formatNumber(
                          lastOrder?.LastPrice || lastOrder?.RefPrice
                        )}
                      </span>
                    </div>
                  </Tooltip>
                </div>
                {trendingLine.length > 0 ? (
                  <div>
                    <div
                      style={{
                        height: "260px",
                        overflowY: "auto",

                        borderRadius: "6px",
                        border:
                          screenMode === "dark"
                            ? "1px solid rgba(48, 50, 59, 1)"
                            : "1px solid #D5D7DC",
                        marginTop: "8px",
                        marginBottom: "32px",
                      }}
                    >
                      {trendingLine &&
                        trendingLine?.map((item: any, index: any) => {
                          let indexInListKhangCu = listKhangCu.findIndex(
                            (el) => el.id === item.id
                          );
                          let indexInListHoTro = listHoTro.findIndex(
                            (el) => el.id === item.id
                          );
                          let indexFinal =
                            indexInListKhangCu === -1
                              ? indexInListHoTro
                              : indexInListKhangCu;
                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                width: "100%",
                                marginBottom: "12px",
                                justifyContent: "space-between",
                                borderBottom:
                                  screenMode === "dark"
                                    ? "1px solid rgba(48, 50, 59, 1)"
                                    : "1px solid #D5D7DC",

                                padding: "16px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "16px",
                                  fontSize: "14px",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "9999999px",
                                    backgroundColor:
                                      screenMode === "dark"
                                        ? "rgba(75, 155, 99, 1)"
                                        : "#589B4B",
                                    // backgroundColor: `${item?.state.linecolor}`,
                                    // color: item?.state.linecolor,
                                    color: "rgba(255, 255, 255, 1)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {index + 1}
                                </div>
                                {item?.position === undefined ? (
                                  <span
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "14px",
                                      color:
                                        screenMode === "light"
                                          ? "rgba(46, 49, 56, 1)"
                                          : "rgba(255, 255, 255, 1)",

                                      fontStyle: "italic",
                                      minWidth: "140px",
                                    }}
                                  >
                                    Loading...
                                  </span>
                                ) : (
                                  <div
                                    style={{
                                      minWidth: "140px",
                                      color:
                                        screenMode === "light"
                                          ? "rgba(46, 49, 56, 1)"
                                          : "rgba(255, 255, 255, 1)",
                                    }}
                                  >
                                    {/* TRENDLINE {index + 1} */}
                                    {item?.position
                                      ? "Đường hỗ trợ"
                                      : "Đường kháng cự"}{" "}
                                    {indexFinal + 1}
                                  </div>
                                )}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "16px",
                                  width: "77%",
                                  height: "25px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "45%",
                                    height: "36px",
                                    display: "flex",
                                    gap: "16px",
                                    alignItems: "center",

                                    borderRadius: "24px",
                                  }}
                                >
                                  <div
                                    style={{
                                      background: ` ${item?.state.linecolor}`,
                                      height: "2px",
                                      width: "100%",
                                    }}
                                  ></div>
                                </div>
                                <div
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "400",
                                    height: "36px",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    width: "100%",

                                    gap: "16px",

                                    borderRadius: "24px",

                                    color:
                                      screenMode === "dark"
                                        ? "rgba(171, 173, 186, 1)"
                                        : "#747B8B",
                                  }}
                                >
                                  Nhận thông báo khi giá cắt qua
                                  <Checkbox />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: "8px",
                      marginBottom: "32px",
                      padding: "16px",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color:
                        screenMode === "dark"
                          ? "rgba(171, 173, 186, 1)"
                          : "#747B8B",
                      border:
                        screenMode === "dark"
                          ? "1px solid rgba(48, 50, 59, 1)"
                          : "1px solid #D5D7DC",
                      borderRadius: "6px",
                    }}
                  >
                    Chọn công cụ{" "}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.30522 16.3034L16.3052 4.30339L15.6992 3.69739L3.69922 15.6974L4.30522 16.3034Z"
                        fill={screenMode === "dark" ? "#FFFFFF" : "#2E3138"}
                      />
                      <path
                        d="M17.2866 3.99998C17.9963 3.99998 18.5723 3.42398 18.5723 2.71427C18.5723 2.00455 17.9963 1.42855 17.2866 1.42855C16.5768 1.42855 16.0008 2.00455 16.0008 2.71427C16.0008 3.42398 16.5768 3.99998 17.2866 3.99998ZM17.2866 4.85713C16.1028 4.85713 15.1437 3.89798 15.1437 2.71427C15.1437 1.53055 16.1028 0.571411 17.2866 0.571411C18.4703 0.571411 19.4294 1.53055 19.4294 2.71427C19.4294 3.89798 18.4703 4.85713 17.2866 4.85713ZM2.71512 18.5714C3.42484 18.5714 4.00084 17.9954 4.00084 17.2857C4.00084 16.576 3.42484 16 2.71512 16C2.00541 16 1.42941 16.576 1.42941 17.2857C1.42941 17.9954 2.00541 18.5714 2.71512 18.5714ZM2.71512 19.4286C1.53141 19.4286 0.572266 18.4694 0.572266 17.2857C0.572266 16.102 1.53141 15.1428 2.71512 15.1428C3.89884 15.1428 4.85798 16.102 4.85798 17.2857C4.85798 18.4694 3.89884 19.4286 2.71512 19.4286Z"
                        fill={screenMode === "dark" ? "#FFFFFF" : "#2E3138"}
                      />
                    </svg>
                    kẻ đường kháng cự và hỗ trợ trên biểu đồ
                  </div>
                )}
              </div>
              <div className="setting-indicator-chart">
                <Tooltip title="Cài đặt thông báo báo về điện thoại khi giá vượt qua mốc">
                  <div
                    className="title"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "14px",
                      width: "100%",
                      color:
                        screenMode === "light"
                          ? "rgba(46, 49, 56, 1)"
                          : "rgba(255, 255, 255, 1)",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        color:
                          screenMode === "light"
                            ? "rgba(46, 49, 56, 1)"
                            : "rgba(255, 255, 255, 1)",
                        display: "flex",

                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",

                        alignItems: "center",
                        cursor: "pointer",
                        gap: 8,
                      }}
                    >
                      Cài đặt cảnh báo giá cổ phiếu
                    </div>
                    <span
                      style={{
                        color:
                          lastOrder?.LastPrice > lastOrder?.RefPrice
                            ? "#575a6a"
                            : "rgb(228, 54, 55)",
                        marginLeft: "4px",
                      }}
                    >
                      {curTab?.symbol} -{" "}
                      {formatNumber(
                        lastOrder?.LastPrice || lastOrder?.RefPrice
                      )}
                    </span>
                  </div>
                </Tooltip>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                      width: "100%",

                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",

                        padding: "8px 16px",
                        borderRadius: "6px",
                        border:
                          screenMode === "dark"
                            ? "1px solid rgba(48, 50, 59, 1)"
                            : "1px solid #D5D7DC",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color:
                            screenMode === "light"
                              ? "rgba(46, 49, 56, 1)"
                              : "rgba(255, 255, 255, 1)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "25px",
                        }}
                      >
                        Nhận cảnh báo khi giá vượt lên{" "}
                      </div>
                      <input
                        value={priceUp}
                        onChange={(e: any) => {
                          setPriceUp(e.target.value);
                        }}
                        style={{
                          height: "40px",
                          borderRadius: "6px",
                          textAlign: "center",
                          border:
                            screenMode === "dark"
                              ? "1px solid rgba(48, 50, 59, 1)"
                              : "1px solid #D5D7DC",
                          background:
                            screenMode === "dark" ? "transparent" : "#fff",
                          color:
                            screenMode === "dark"
                              ? "rgba(53, 148, 239, 1)"
                              : "#000",
                          outline: "none",

                          width: "90px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",

                        padding: "8px 16px",
                        borderRadius: "6px",
                        border:
                          screenMode === "dark"
                            ? "1px solid rgba(48, 50, 59, 1)"
                            : "1px solid #D5D7DC",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",

                          color:
                            screenMode === "light"
                              ? "rgba(46, 49, 56, 1)"
                              : "rgba(255, 255, 255, 1)",
                          width: "100%",

                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "25px",
                        }}
                      >
                        Nhận cảnh báo khi giá vượt xuống
                      </div>
                      <input
                        value={priceDown}
                        onChange={(e: any) => {
                          setPriceDown(e.target.value);
                        }}
                        style={{
                          height: "40px",
                          borderRadius: "6px",
                          textAlign: "center",
                          border:
                            screenMode === "dark"
                              ? "1px solid rgba(48, 50, 59, 1)"
                              : "1px solid #D5D7DC",
                          background:
                            screenMode === "dark" ? "transparent" : "#fff",
                          color:
                            screenMode === "dark"
                              ? "rgba(53, 148, 239, 1)"
                              : "#000",
                          outline: "none",
                          width: "90px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="wrapper-btn-footer"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "16px",
                borderTop:
                  screenMode === "dark"
                    ? "1px solid rgba(48, 50, 59, 1)"
                    : "1px solid #D5D7DC",
                marginTop: "24px",
                gap: "16px",
              }}
            >
              {/* <div
                className="iconoutlinededitordelete"
                onClick={() => {
                  console.log('curTabbbbbbb', curTab);
                  setPriceDown('');
                  setPriceUp('');
                  setTrendingLine([]);
                }}
              >
                Reset
              </div> */}
              <div
                onClick={() => {
                  if (
                    trendingLine?.length === 0 &&
                    priceUp === 0 &&
                    priceDown === 0
                  ) {
                    notification.error({
                      message: "Vui lòng cài đặt tín hiệu",
                      description:
                        "Kẻ đường trendline và cài đặt giá thông báo cho tín hiệu",
                      duration: 2,
                      placement: "bottomRight",
                    });
                  } else {
                    onSaveSignal();
                  }
                }}
                style={{ cursor: "pointer" }}
                className="button-indicator-chart"
              >
                Lưu tín hiệu cổ phiếu {curTab?.symbol}{" "}
              </div>
            </div>
          </div>
        ) : (
          <div className="container-setting">
            <div className="first-box">
              <div className="list-index">
                {listTieuChi?.map((item: any, index: any) => {
                  const isOpen = listOpenTieuChiKyThuat.includes(item.label);
                  return (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "100%",
                      }}
                      ref={dropdownRef}
                    >
                      <div className="title-technique">{item.label}</div>
                      <div
                        style={{
                          display: "flex",
                          padding: " 8px",

                          borderRadius: "6px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          position: "relative",

                          background:
                            screenMode === "dark" ? "transparent" : "#fff",
                        }}
                        onClick={() => handleClickKyThuat(item.label)}
                        className="drop-kythuat"
                      >
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "400",
                            color:
                              isHoverChiTieu[1] &&
                              isHoverChiTieu[0] === item.label
                                ? "#fff"
                                : screenMode === "light"
                                  ? "rgba(8, 8, 8, 1)"
                                  : "rgba(255, 255, 255)",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <div
                            className="container-box-drop"
                            style={{
                              fontSize: "11.5px",
                              margin: "3px 0",
                            }}
                          >
                            {item?.dropdown?.filter(
                              (item) => item?.isCheck === true
                            )?.length > 0 ? (
                              <span
                                style={{
                                  display: "flex",
                                  gap: "8px",
                                  justifyContent: "center",
                                  alignContent: "center",
                                  fontSize: "14px",
                                  lineHeight: "20px",
                                  color: "rgba(255, 255, 255, 1)",
                                }}
                              >
                                {item?.dropdown
                                  ?.map((el, index) => ({
                                    ...el,
                                    indexOrigin: index + 1,
                                  }))
                                  ?.filter(
                                    (itemFilter) => itemFilter?.isCheck === true
                                  )
                                  ?.slice(0, 2) // Lấy hai phần tử đầu tiên
                                  ?.map((itemchild, index) => (
                                    <div
                                      className="item-child-option"
                                      key={index}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onChangeSwitchKyThuat(
                                          !itemchild.isCheck,
                                          itemchild,
                                          item
                                        );
                                      }}
                                      style={{
                                        display: "flex",
                                        gap: "8px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "14px",
                                        lineHeight: "20px",
                                        padding: "2px 8px",
                                        color:
                                          screenMode === "dark"
                                            ? "rgba(255, 255, 255, 1)"
                                            : "#004AEA",
                                        fontStyle: "normal",
                                        borderRadius: "100px",
                                        background:
                                          screenMode === "dark"
                                            ? "rgba(54, 66, 99, 1)"
                                            : "#E0EAFF",
                                      }}
                                    >
                                      {itemchild?.label}
                                      <svg
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onChangeSwitchKyThuat(
                                            !itemchild.isCheck,
                                            itemchild,
                                            item
                                          );
                                        }}
                                        style={{ cursor: "pointer" }}
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M9.85403 9.14653C9.90048 9.19298 9.93733 9.24813 9.96247 9.30883C9.98762 9.36953 10.0006 9.43458 10.0006 9.50028C10.0006 9.56598 9.98762 9.63103 9.96247 9.69173C9.93733 9.75242 9.90048 9.80757 9.85403 9.85403C9.80757 9.90048 9.75242 9.93733 9.69173 9.96247C9.63103 9.98762 9.56598 10.0006 9.50028 10.0006C9.43458 10.0006 9.36953 9.98762 9.30883 9.96247C9.24813 9.93733 9.19298 9.90048 9.14653 9.85403L5.00028 5.70715L0.854028 9.85403C0.760208 9.94785 0.63296 10.0006 0.500278 10.0006C0.367596 10.0006 0.240348 9.94785 0.146528 9.85403C0.0527077 9.76021 2.61548e-09 9.63296 0 9.50028C-2.61548e-09 9.3676 0.0527077 9.24035 0.146528 9.14653L4.2934 5.00028L0.146528 0.854028C0.0527077 0.760208 -9.88558e-10 0.63296 0 0.500278C9.88558e-10 0.367596 0.0527077 0.240348 0.146528 0.146528C0.240348 0.0527077 0.367596 9.88558e-10 0.500278 0C0.63296 -9.88558e-10 0.760208 0.0527077 0.854028 0.146528L5.00028 4.2934L9.14653 0.146528C9.24035 0.0527077 9.3676 -2.61548e-09 9.50028 0C9.63296 2.61548e-09 9.76021 0.0527077 9.85403 0.146528C9.94785 0.240348 10.0006 0.367596 10.0006 0.500278C10.0006 0.63296 9.94785 0.760208 9.85403 0.854028L5.70715 5.00028L9.85403 9.14653Z"
                                          fill={
                                            screenMode === "dark"
                                              ? "#ABADBA"
                                              : "#747B8B"
                                          }
                                        />
                                      </svg>
                                    </div>
                                  ))}
                                {item?.dropdown?.filter(
                                  (itemFilter) => itemFilter?.isCheck === true
                                )?.length > 2 && (
                                  <span
                                    style={{
                                      display: "inline-block",
                                      padding: "2px 8px",
                                      color:
                                        screenMode === "dark"
                                          ? "rgba(255, 255, 255, 1)"
                                          : "#2E3138",
                                      fontStyle: "normal",

                                      borderRadius: "100px",
                                    }}
                                  >
                                    ...
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span style={{ color: "rgb(228, 54, 55)" }}>
                                Chưa cài đặt chỉ báo
                              </span>
                            )}
                          </div>
                        </div>
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.410419 0.91107C0.735856 0.585633 1.26349 0.585633 1.58893 0.91107L5.99967 5.32181L10.4104 0.91107C10.7359 0.585633 11.2635 0.585633 11.5889 0.91107C11.9144 1.23651 11.9144 1.76414 11.5889 2.08958L6.58893 7.08958C6.26349 7.41502 5.73586 7.41502 5.41042 7.08958L0.410419 2.08958C0.0849819 1.76414 0.0849819 1.23651 0.410419 0.91107Z"
                            fill={screenMode === "dark" ? "#E3E4E8" : "#747B8B"}
                          />
                        </svg>
                      </div>
                      {isOpen && (
                        <div ref={dropdownRef} className="wrapper-drop">
                          {item?.dropdown?.map(
                            (itemDropdown: any, index: number) => {
                              return (
                                <div
                                  style={{
                                    background:
                                      isHover[1] &&
                                      isHover[0] === itemDropdown.label
                                        ? screenMode === "dark"
                                          ? "#292B32"
                                          : "#D5D7DC"
                                        : screenMode === "dark"
                                          ? !itemDropdown?.isCheck
                                            ? "transparent"
                                            : "rgba(34, 48, 79, 1)"
                                          : !itemDropdown?.isCheck
                                            ? "#fff"
                                            : "#E0EAFF",
                                    borderBottom:
                                      screenMode === "dark"
                                        ? itemDropdown?.isCheck &&
                                          "1px solid rgba(55, 57, 67, 1)"
                                        : itemDropdown?.isCheck &&
                                          "1px solid #D5D7DC",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onChangeSwitchKyThuat(
                                      !itemDropdown?.isCheck,
                                      itemDropdown,
                                      item
                                    );
                                  }}
                                  onMouseEnter={() => {
                                    setIsHover([itemDropdown.label, true]);
                                  }}
                                  onMouseLeave={() => {
                                    setIsHover([itemDropdown.label, false]);
                                  }}
                                  className="setting-target"
                                  key={itemDropdown?.label || index}
                                >
                                  <div className="setting1">
                                    <div className="form-group1">
                                      <label
                                        style={{
                                          color:
                                            screenMode === "light" &&
                                            itemDropdown?.isCheck &&
                                            "#004AEA",
                                        }}
                                      >
                                        {itemDropdown?.label}
                                      </label>

                                      {item?.label === "RSI" && (
                                        <div className="up-down">
                                          <input
                                            className="input-target"
                                            onChange={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              onChangeInputKyThuat(
                                                e?.target?.value,
                                                itemDropdown,
                                                item
                                              );
                                            }}
                                            name="rsi"
                                            value={itemDropdown?.value}
                                            style={{
                                              fontSize: "14px",
                                              height: "32px",
                                              fontWeight: 400,
                                              width: "179.5px",
                                              borderRadius: "8px",
                                              padding: "8px",
                                              backgroundColor:
                                                screenMode === "light"
                                                  ? "#fff"
                                                  : "#33343C",
                                              border:
                                                screenMode === "light"
                                                  ? "1px solid #fff"
                                                  : "1px solid #33343C",
                                              color:
                                                screenMode === "light"
                                                  ? "rgba(46, 49, 56, 1)"
                                                  : "rgba(255, 255, 255, 1)",
                                              paddingRight: "60px",
                                            }}
                                          />
                                          <div className="list-plus">
                                            <img
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onChangeInputKyThuatPlus(
                                                  itemDropdown?.value,
                                                  itemDropdown,
                                                  item
                                                );
                                              }}
                                              style={{
                                                marginRight: "4px",
                                                cursor: "pointer",
                                              }}
                                              src={plus}
                                              alt=""
                                            />
                                            <img
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onChangeInputKyThuatMinus(
                                                  itemDropdown?.value,
                                                  itemDropdown,
                                                  item
                                                );
                                              }}
                                              style={{ cursor: "pointer" }}
                                              src={minus}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                      )}
                                      {/* <Checkbox
                                      checked={itemDropdown?.isCheck}
                                      onChange={(e) => {
                                        onChangeSwitchKyThuat(
                                          e.target.checked,
                                          itemDropdown,
                                          item
                                        );
                                      }}
                                    /> */}
                                      {!itemDropdown?.isCheck ? (
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M1 6C1 3.23858 3.23858 1 6 1H18C20.7614 1 23 3.23858 23 6V18C23 20.7614 20.7614 23 18 23H6C3.23858 23 1 20.7614 1 18V6Z"
                                            stroke={
                                              screenMode === "dark"
                                                ? "#40424E"
                                                : "#D5D7DC"
                                            }
                                            stroke-width="2"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
                                            fill="#004AEA"
                                          />
                                          <path
                                            d="M18.6663 7L9.49967 16.1667L5.33301 12"
                                            stroke="white"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="second-box">
              <div
                style={{
                  color:
                    screenMode === "light"
                      ? "rgba(46, 49, 56, 1)"
                      : "rgba(255, 255, 255, 1)",
                }}
                className="title-firt"
              >
                Cổ phiếu nhận tín hiệu
              </div>
              <Select
                mode="multiple"
                allowClear
                value={listSymbolPicked}
                style={{ width: "100%" }}
                onChange={handleChange}
                options={listSymbol?.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "16px",
                marginTop: "16px",

                borderTop:
                  screenMode === "dark"
                    ? "1px solid rgba(48, 50, 59, 1)"
                    : "1px solid #D5D7DC",
              }}
            >
              <div className="warning">
                *Vui lòng tải app dautubenvung về điện thoại để nhận tín hiệu
                cảnh báo
              </div>
              <div className="btn-technique">
                <div
                  className="iconoutlinededitordelete"
                  onClick={() => {
                    setListSymbolPicked([]);
                    setListTieuChi([
                      {
                        dropdown: [
                          {
                            label: "Đi vào vùng quá mua",
                            value: 30,
                            isCheck: false,
                          },
                          {
                            label: "Thoát khỏi vùng quá mua",
                            value: 70,
                            isCheck: false,
                          },
                          {
                            label: "Đi vào vùng quá bán",
                            value: 70,
                            isCheck: false,
                          },
                          {
                            label: "Thoát khỏi vùng quá bán",
                            value: 30,
                            isCheck: false,
                          },
                        ],
                        label: "Chỉ số RSI",
                      },
                      {
                        dropdown: [
                          {
                            label: "Giá cắt lên MA 20",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt lên MA 50",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt lên MA 100",
                            value: 0,
                            isCheck: false,
                          },
                          { label: "Giá cắt lên MA 200", value: 0 },
                          {
                            label: "Giá cắt xuống MA 20",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt xuống MA 50",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt xuống MA 100",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt xuống MA 200",
                            value: 0,
                            isCheck: false,
                          },
                        ],
                        label: "Chỉ số MA",
                      },
                      {
                        dropdown: [
                          {
                            label: "Giá cắt lên EMA 20",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt lên EMA 50",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt lên EMA 100",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt lên EMA 200",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt xuống EMA 20",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt xuống EMA 50",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt xuống EMA 100",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Giá cắt xuống EMA 200",
                            value: 0,
                            isCheck: false,
                          },
                        ],
                        label: "Chỉ số EMA",
                      },
                      {
                        dropdown: [
                          {
                            label: "Cắt lên đường tín hiệu",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Cắt xuống đường tín hiệu",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Cắt lên đường 0",
                            value: 0,
                            isCheck: false,
                          },
                          {
                            label: "Cắt xuống đường 0",
                            value: 0,
                            isCheck: false,
                          },
                        ],
                        label: "Chỉ số MACD",
                      },
                    ]);
                  }}
                >
                  Reset
                </div>
                <button
                  disabled={err}
                  onClick={onSaveListChiTieu}
                  className="save-target"
                >
                  Lưu bộ lọc
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledCommunity>
  );
};

export default Targets;
