/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { screenModeSelector } from "@/redux/screen/selector";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  ConvertNumber,
  ConvertNumberTooltip,
  convertToTrillion,
  formatNumberToBillion,
  formatToBillion,
} from "@/components/ConvertNumber";
import { config } from "@/config/env";
import { convertDate, convertDateMin } from "@/components/ConvertDate";
import moment from "moment";
import { set } from "lodash";
export type ReceivedProps = object;
Highcharts.SVGRenderer.prototype.symbols.leftArrow = function (x, y, w, h) {
  return [
    "M",
    x + w / 2,
    y, // Top
    "L",
    x,
    y + h / 2, // Left
    "L",
    x + w / 2,
    y + h, // Bottom
    "Z",
  ];
};

Highcharts.SVGRenderer.prototype.symbols.rightArrow = function (x, y, w, h) {
  return [
    "M",
    x,
    y, // Top-left
    "L",
    x + w / 2,
    y + h / 2, // Center
    "L",
    x,
    y + h, // Bottom-left
    "Z",
  ];
};
const useBieudotaichinh = (props: ReceivedProps) => {
  const screenMode = useSelector(screenModeSelector);
  const [valueTab, setValueTab] = useState<string | null>("general");
  const [transaction, setTransaction] = useState<string>("past_price");
  const [newsData, setNewsData] = useState<any[]>([]);
  const [downloadReport, setDownloadReport] = useState<any[]>([]);
  const [leadership, setLeadership] = useState<any[]>([]);
  const [allCompanySub, setAllCompanySub] = useState<any[]>([]);
  const [generalIndex, setGeneralIndex] = useState<any>([]);
  const [businessPlan, setBusinessPlan] = useState<any>();
  const [chartNew, setChartNew] = useState<any>([]);
  const [chartSinceNew, setChartSinceNew] = useState([]);

  const [companyData, setCompanyData] = useState<any>();

  const [dayStart, setDayStart] = useState<string | null>(
    moment().subtract(30, "days").format("DD%2FMM%2FYYYY")
  );
  const [dayEnd, setDayEnd] = useState<string | null>(
    moment().format("DD%2FMM%2FYYYY")
  );
  const [dataStatistic, setDataStatistic] = useState<any>();
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>();
  const [check, setCheck] = useState<boolean>(true);
  const [listCompany, setListCompany] = useState<any>([]);
  const [company, setCompany] = useState<string>("VIC");

  const [financialChart, setFinancialChart] = useState<any>([]);
  const [assetChange, setAssetChange] = useState<string>("quarter");
  const [valuationPBChange, setValuationPBChange] = useState<string>("quarter");
  const [debtRatioChange, setDebtRatioChange] = useState("quarter");
  const [valuationChange, setValuationChange] = useState("quarter");
  const [changeProfitMargin, setChangeProfitMargin] = useState("quarter");
  const [changeValuationEV, setChangeValuationEV] = useState("quarter");
  const [capitalChange, setCapitalChange] = useState<string>("quarter");
  const [cashFlowChange, setCashFlowChange] = useState<string>("quarter");
  const [netReveNueChange, setNetRevenueChange] = useState<string>("quarter");

  const [changeKetQuaKinhDoanh1, setChangeKetQuaKinhDoanh1] =
    useState<string>("quarter");
  const [changeKetQuaKinhDoanh2, setChangeKetQuaKinhDoanh2] =
    useState<string>("quarter");
  const [changeKetQuaKinhDoanh3, setChangeKetQuaKinhDoanh3] =
    useState<string>("quarter");
  const [profitBeforeTaxChange, setProfitBeforeTaxChange] =
    useState<string>("quarter");
  const [profitAfterTaxChange, setProfitAfterTaxChange] =
    useState<string>("quarter");
  const [profitAfterTaxChangeEnterprise, setProfitAfterTaxChangeEnterprise] =
    useState<string>("quarter");

  const [profitInsurance, setProfitInsurance] = useState<string>("quarter");
  const [incomeChange, setIncomeChange] = useState<string>("quarter");
  const [chiPhiDuPhong, setChiPhiDuPhong] = useState<string>("quarter");
  const [profitAfterTaxBankChange, setProfitAfterTaxBankChange] =
    useState<string>("quarter");
  const [insuranceAssetChange, setInsuranceAssetChange] =
    useState<string>("quarter");
  const [bankAssetChange, setBankAssetChange] = useState<string>("quarter");
  const [financialAssetChange, setFinancialAssetChange] =
    useState<string>("quarter");
  const [shortFinancialAssetChange, setShortFinancialAssetChange] =
    useState<string>("quarter");
  const [capitalInsuranceChange, setCapitalInsuraceChange] =
    useState<string>("quarter");
  const [capitalBankChange, setCapitalBankChange] = useState<string>("quarter");
  const [capitalFinancialChange, setCapitalFinancialChange] =
    useState<string>("quarter");
  const [openStock, setOpenStock] = useState<boolean>(false);
  const [financialTable, setFinancialTable] = useState<any>([]);
  const [shareholderStructure, setShareholderStructure] = useState<any>([]);
  const [socketData, setSocketData] = useState<any>({});
  const [dataClosedSession, setDataClosedSession] = useState<any>([]);
  const [sortFinancial, setSortFinancial] = useState<boolean>(true);
  const [firstFinancialColumn, setFirstFinancialColumn] =
    useState<boolean>(true);
  const [secondFinancialColumn, setSecondFinancialColumn] =
    useState<boolean>(false);
  const [thirdFinancialColumn, setThirdFinancialColumn] =
    useState<boolean>(false);
  const [fourthFinancialColumn, setFourthFinancialColumn] =
    useState<boolean>(false);
  const [fifthFinancialColumn, setFifthFinancialColumn] =
    useState<boolean>(false);
  const [financialChartYear, setFinancialChartYear] = useState<any>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [listAnalysisReport, setListAnalysisReport] = useState<any>([]);
  const [checkDataResponse, setCheckDataResponse] = useState<string>("");
  const [dataNewChart, setDataNewChart] = useState([]);
  const [quarterDataNewChart, setQuarterDataNewChart] = useState([]);
  const [startYearSinceChart, setStartYearSinceChart] = useState([]);
  const [dataYearChartNew, setDataYearChartNew] = useState();
  useEffect(() => {
    setCapitalFinancialChange("quarter");
    setCapitalBankChange("quarter");
    setCapitalInsuraceChange("quarter");
    setShortFinancialAssetChange("quarter");
    setFinancialAssetChange("quarter");
    setBankAssetChange("quarter");
    setInsuranceAssetChange("quarter");
    setProfitAfterTaxBankChange("quarter");
    setChiPhiDuPhong("quarter");
    setIncomeChange("quarter");
    setProfitInsurance("quarter");
    setProfitAfterTaxChangeEnterprise("quarter");
    setProfitAfterTaxChange("quarter");
    setProfitBeforeTaxChange("quarter");
    setChangeKetQuaKinhDoanh3("quarter");
    setChangeKetQuaKinhDoanh2("quarter");
    setChangeKetQuaKinhDoanh1("quarter");
    setNetRevenueChange("quarter");
    setCashFlowChange("quarter");
    setCapitalChange("quarter");
    setChangeValuationEV("quarter");
    setChangeProfitMargin("quarter");
    setValuationChange("quarter");
    setDebtRatioChange("quarter");
    setValuationPBChange("quarter");
    setAssetChange("quarter");
  }, [company]);
  function convertKey(key) {
    const [year, quarter] = key?.split("_");
    let quarterStr;
    switch (quarter) {
      case "1":
        quarterStr = "Q1'";
        break;
      case "2":
        quarterStr = "Q2'";
        break;
      case "3":
        quarterStr = "Q3'";
        break;
      case "4":
        quarterStr = "Q4'";
        break;
      default:
        return key;
    }
    return quarterStr + year.slice(-2);
  }
  function convertKeyYear(key) {
    const [year, quarter] = key?.split("_");
    let quarterStr;
    switch (quarter) {
      case "5":
        quarterStr = "";
        break;

      default:
        return key;
    }
    return quarterStr + year.slice(-2);
  }

  const location = useLocation();

  useEffect(() => {
    const tab = location.state?.tab || "general";
    switch (tab) {
      case "tong-quan":
        setValueTab("general");
        handleAnalysisChange("general");
        break;
      case "ho-so":
        setValueTab("profile");
        handleAnalysisChange("profile");
        break;
      case "tai-chinh-phan-tich":
        setValueTab("financial");
        handleAnalysisChange("financial");
        break;
      case "thong-ke-giao-dich":
        setValueTab("transaction");
        handleAnalysisChange("transaction");
        break;
      case "bieu-do-tai-chinh":
        setValueTab("financial-chart");
        handleAnalysisChange("financial-chart");
        break;

      default:
        break;
    }
  }, [location]);
  useEffect(() => {
    if (Array.isArray(chartNew) && chartNew.length > 0) {
      const latestYear = parseInt(
        chartNew[chartNew.length - 1].key?.split("_")[0]
      );
      const startYear = latestYear - 3;

      const newData = chartNew
        .filter((item) => {
          const itemYear = parseInt(item?.key.split("_")[0]);
          return itemYear >= startYear && itemYear <= latestYear;
        })
        .map((item) => {
          return {
            ...item,
            key: convertKey(item.key),
          };
        });
      const quarterFilter = newData.map((item) => item.key);
      setQuarterDataNewChart([...quarterFilter, "Q1'99"]);
      setDataNewChart(newData);
    }

    if (Array.isArray(chartSinceNew) && chartSinceNew.length > 0) {
      const latestYear = parseInt(
        chartSinceNew[chartSinceNew.length - 1]?.key.split("_")[0]
      );
      const startYear = latestYear - 4;

      const newDataYear = chartSinceNew
        .filter((item) => {
          const itemYear = parseInt(item?.key?.split("_")[0]);

          return itemYear >= startYear && itemYear <= latestYear;
        })
        .map((item) => {
          return {
            ...item,
            key: convertKeyYear(item.key),
          };
        });
      const yearFilter = newDataYear.map((item) => item.value.yearReport);
      setStartYearSinceChart(yearFilter);
      setDataYearChartNew(newDataYear);
    }
  }, [chartNew, chartSinceNew]);
  const emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };

  const timeQuarter = [
    "Q1'20",
    "Q2'20",
    "Q3'20",
    "Q4'20",
    "Q1'21",
    "Q2'21",
    "Q3'21",
    "Q4'21",
    "Q1'22",
    "Q2'22",
    "Q3'22",
    "Q4'22",
    "Q1'23",
    "Q2'23",
    "Q3'23",
  ];

  const timeSince = ["2019", "2020", "2021", "2022", "2023"];

  // Socket for analysis
  useEffect(() => {
    const ws = new WebSocket(config.socket.VITE_REACT_APP_SOCKET_IO);
    // const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "SUBSCRIBE", symbol: `${company}` }));
    };
    ws.addEventListener("message", (receivedData) => {
      const receicedData = JSON.parse(receivedData?.data);
      if (!!receicedData) setSocketData(receicedData);
    });
  }, [company]);

  // CHECK OPEN OR CLOSED SESSION
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: false,
      });
      const openTime = "09:15:00";
      const closeTime = "14:30:00";
      const middleBreakTime = "11:30:00";
      const middleBreakTimeEnd = "13:00:00";
      // if (now >= openTime && now <= closeTime) {
      //   setOpenStock(true);
      // } else {
      //   setOpenStock(false);
      // }
      if (now >= openTime && now <= middleBreakTime) {
        setOpenStock(true);
      } else if (now >= middleBreakTimeEnd && now <= closeTime) {
        setOpenStock(true);
      } else {
        setOpenStock(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // GET DATA WHEN SESSION CLOSED
  useEffect(() => {
    if (openStock === false) {
      const dayClosedSession = new Date().toLocaleDateString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: false,
      });
      const formattedDate = dayjs(dayClosedSession).format("DD/MM/YYYY");
      const encodedDate = encodeURIComponent(formattedDate);
      // axios
      //   .get(
      //     `${config.app.VITE_APP_API_URL}/statistics/company/stock-price?symbol=${company}&page=1&pageSize=20&fromDate=${dayStart}&toDate=${dayEnd}`
      //   )
      //   .then((res) => {
      //     setDataClosedSession(res?.data?.data[0]);
      //   })
      //   .catch((err) => {
      //   });
      const date = new Date();
      const dateMin = moment(date).subtract(5, "days").format("DD/MM/YYYY");
      // axios
      //   .get(
      //     `${config.app.VITE_APP_API_URL
      //     }/DailyStockPrice?symbol=${company}&fromDate=${dateMin}&toDate=${convertDate(
      //       date
      //     )}`
      //     // `${
      //     //   config.app.VITE_APP_API_URL
      //     // }/DailyStockPrice?symbol=${company}&fromDate=${convertDateMin(
      //     //   date
      //     // )}&toDate=${convertDate(date)}`
      //   )
      //   .then((res) => {
      //     const dataCloseSession = res?.data?.data.pop();
      //     setDataClosedSession(dataCloseSession);
      //   })
      //   .catch((err) => { });
    }
  }, [company, openStock]);
  function generateYearArray() {
    const years = [];

    for (let year = 2019; year <= 2023; year++) {
      for (let i = 1; i <= 4; i++) {
        years.push("Timeline=" + year + "_" + i);
      }
    }

    return years;
  }

  const resultArray = generateYearArray();
  function yearArray() {
    const years = [];

    for (let year = 2019; year <= 2023; year++) {
      years.push("Timeline=" + year + "_" + 5);
    }

    return years;
  }

  const resultArraySince = yearArray();

  useEffect(() => {
    Promise.all([
      // BIỂU ĐỒ TÀI CHÍNH
      api.get(`/report-chart?symbol=${company}`),
      // CƠ CẤU CỔ ĐÔNG

      // API MÀN TÀI CHÍNH
      // axios.get(
      //   `https://fiin-fundamental.ssi.com.vn/FinancialAnalysis/GetFinancialRatioV2?language=vi&Type=Company&OrganCode=${company}&${resultArray.join(
      //     '&'
      //   )}`
      // ),
      api.get(`/financial-ratio?symbol=${company}&type=quater`),
      api.get(`/financial-ratio?symbol=${company}&type=year`),
      // axios.get(
      //   `https://fiin-fundamental.ssi.com.vn/FinancialAnalysis/GetFinancialRatioV2?language=vi&Type=Company&OrganCode=${company}&${resultArraySince.join(
      //     '&'
      //   )}`
      // ),
    ])
      .then(([resFinancialChart, resFinancialTable, resSinceTable]) => {
        setChartNew(resFinancialTable?.data.items);
        setChartSinceNew(resSinceTable.data.items);
        setFinancialChart(resFinancialChart?.data?.data?.quarter);
        setFinancialChartYear(resFinancialChart?.data?.data?.year);
        setCheckDataResponse(resFinancialChart?.data?.data?.superSector);
        setFinancialTable(resFinancialTable?.data?.items);
        setIsExpanded(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        // // Chỉ số chung công ty
        // axios
        //   .get(
        //     `${config.app.VITE_APP_API_URL}/statistics/company/stock-price?symbol=${company}&page=${current}&pageSize=${pageSize}&fromDate=${dayStart}&toDate=${dayEnd}`
        //   )
        //   .then((res) => {
        //     setDataStatistic(res?.data?.data);
        //     setCurrent(res?.data?.paging?.page);
        //     setPageSize(res?.data?.paging?.pageSize);
        //     setTotal(res?.data?.paging?.total);
        //   })
        //   .catch((error) => {
        //     console.error('Error fetching data: ', error);
        //   });
      });
  }, [company]);

  const formatDataFinancialTable = financialTable.map((item) => {
    return {
      time: item.key,
      EV_EBITDA: item?.value?.ryd30?.toFixed(2),
      Von_hoa: convertToTrillion(item?.value?.ryd11),
      So_cp: (item?.value?.ryd3 / 100000000)?.toFixed(2),
      Doanh_thu: convertToTrillion(item?.value?.rev),
      Tang_truong_doanh_thu: item?.value?.ryq34?.toFixed(2),
      Loi_nhuan_sau_thue: convertToTrillion(item?.value?.isa22),
      Tang_truong_doanh_thu_percent: item?.value?.ryq39?.toFixed(2),
      Bien_EDIT_percent: item?.value?.ryq27?.toFixed(2)?.toString() + "%",
      ROE: item?.value?.ryq12?.toFixed(2)?.toString() + "%",
      ROIC: Number(item?.value?.ryq76?.toFixed(2))?.toString() + "%",
      Bien_loi_nhuan_rong_percent:
        Number(item?.value?.ryq29?.toFixed(2))?.toString() + "%",
      Bien_loi_nhuan_gop_percent:
        Number(item?.value?.ryq25?.toFixed(2))?.toString() + "%",
      Chi_so_thanh_toan_hien_tai: Number(item?.value?.ryq3?.toFixed(2)),
      Chi_so_thanh_toan_tien_mat: Number(item?.value?.ryq1?.toFixed(2)),
      Chi_so_thanh_toan_nhanh: Number(item?.value?.ryq2?.toFixed(2)),
      Kha_nang_chi_tra_lai_vay:
        Number(item?.value?.ryq77?.toFixed(2))?.toString() + "%",
      Vong_quay_tai_san: Number(item?.value?.ryq31?.toFixed(2)),
      Vong_quay_tai_san_CD: Number(item?.value?.ryq91?.toFixed(2)),
      So_ngay_thu_tien_binh_quan: Number(item?.value?.ryq16?.toFixed(2)),
      So_ngay_ton_kho_binh_quan: Number(item?.value?.ryq18?.toFixed(2)),
      So_ngay_thanh_toan_binh_quan: Number(item?.value?.ryq20?.toFixed(2)),
      Chu_ky_tien: Number(item?.value?.cashCycle?.toFixed(2)),
      No_VCSH: Number(item?.value?.ryq10?.toFixed(2)),
      Vay_NH_DH_VCSH: Number(item?.value?.ryq6?.toFixed(2)),
      Don_bay_tai_chinh: Number(item?.value?.ryq71?.toFixed(2)),
    };
  });

  const firstQuarter2018 = financialTable?.[0]?.value;
  const secondQuarter2018 = financialTable?.[1]?.value;
  const thirdQuarter2018 = financialTable?.[2]?.value;
  const fourthQuarter2018 = financialTable?.[3]?.value;
  const firstQuarter2019 = financialTable?.[4]?.value;
  const secondQuarter2019 = financialTable?.[5]?.value;
  const thirdQuarter2019 = financialTable?.[6]?.value;
  const fourthQuarter2019 = financialTable?.[7]?.value;
  const firstQuarter2020 = financialTable?.[8]?.value;
  const secondQuarter2020 = financialTable?.[9]?.value;
  const thirdQuarter2020 = financialTable?.[10]?.value;
  const fourthQuarter2020 = financialTable?.[11]?.value;
  const firstQuarter2021 = financialTable?.[12]?.value;
  const secondQuarter2021 = financialTable?.[13]?.value;
  const thirdQuarter2021 = financialTable?.[14]?.value;
  const fourthQuarter2021 = financialTable?.[15]?.value;
  const firstQuarter2022 = financialTable?.[16]?.value;
  const secondQuarter2022 = financialTable?.[17]?.value;
  const thirdQuarter2022 = financialTable?.[18]?.value;
  const fourthQuarter2022 = financialTable?.[19]?.value;
  const getQuarter = (dateString) => {
    const quarterPart = dateString.split("_")[1];
    return parseInt(quarterPart, 10);
  };

  const organizeDataByYearAndQuarter = (data) => {
    const organizedData = {}; // { year: { Q1: data, Q2: data, ... } }

    data.forEach((item) => {
      const year = item.time.split("_")[0];
      const quarter = `Q${getQuarter(item.time)}`;
      if (!organizedData[year]) {
        organizedData[year] = { Q1: [], Q2: [], Q3: [], Q4: [] };
      }
      organizedData[year][quarter].push(item);
    });

    return organizedData;
  };

  const organizedData = organizeDataByYearAndQuarter(formatDataFinancialTable);

  const DATA_FINANCIAL_TABLE: any[] = [
    {
      key: "1",
      firstColumn: "EV/EBITDA",
      secondColumn: Number(firstQuarter2018?.ryd30?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryd30?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryd30?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryd30?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryd30?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryd30?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryd30?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryd30?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryd30?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryd30?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryd30?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryd30?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryd30?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryd30?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryd30?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryd30?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryd30?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryd30?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryd30?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryd30?.toFixed(2)),
    },
    {
      key: "2",
      firstColumn: "Nhóm thông tin doanh nghiệp",
    },
    {
      key: "3",
      firstColumn: "Vốn hoá (Nghìn tỷ)",

      secondColumn: convertToTrillion(firstQuarter2018?.ryd11),
      thirdColumn: convertToTrillion(secondQuarter2018?.ryd11),
      fourthColumn: convertToTrillion(thirdQuarter2018?.ryd11),
      fifthColumn: convertToTrillion(fourthQuarter2018?.ryd11),
      sixthColumn: convertToTrillion(firstQuarter2019?.ryd11),
      seventhColumn: convertToTrillion(secondQuarter2019?.ryd11),
      eighthColumn: convertToTrillion(thirdQuarter2019?.ryd11),
      ninthColumn: convertToTrillion(fourthQuarter2019?.ryd11),
      tenthColumn: convertToTrillion(firstQuarter2020?.ryd11),
      eleventhColumn: convertToTrillion(secondQuarter2020?.ryd11),
      twelfthColumn: convertToTrillion(thirdQuarter2020?.ryd11),
      thirteenthColumn: convertToTrillion(fourthQuarter2020?.ryd11),
      fourteenthColumn: convertToTrillion(firstQuarter2021?.ryd11),
      fifteenthColumn: convertToTrillion(secondQuarter2021?.ryd11),
      sixteenthColumn: convertToTrillion(thirdQuarter2021?.ryd11),
      seventeenthColumn: convertToTrillion(fourthQuarter2021?.ryd11),
      eighteenthColumn: convertToTrillion(firstQuarter2022?.ryd11),
      nineteenthColumn: convertToTrillion(secondQuarter2022?.ryd11),
      twentiethColumn: convertToTrillion(thirdQuarter2022?.ryd11),
      twentyFirstColumn: convertToTrillion(fourthQuarter2022?.ryd11),
    },
    {
      key: "4",
      firstColumn: "Số CP lưu hành (Triệu CP)",
      secondColumn: Number(firstQuarter2018?.ryd3 / 100000000)?.toFixed(2),
      thirdColumn: Number(secondQuarter2018?.ryd3 / 100000000)?.toFixed(2),
      fourthColumn: Number(thirdQuarter2018?.ryd3 / 100000000)?.toFixed(2),
      fifthColumn: Number(fourthQuarter2018?.ryd3 / 100000000)?.toFixed(2),
      sixthColumn: Number(firstQuarter2019?.ryd3 / 100000000)?.toFixed(2),
      seventhColumn: Number(secondQuarter2019?.ryd3 / 100000000)?.toFixed(2),
      eighthColumn: Number(thirdQuarter2019?.ryd3 / 100000000)?.toFixed(2),
      ninthColumn: Number(fourthQuarter2019?.ryd3 / 100000000)?.toFixed(2),
      tenthColumn: Number(firstQuarter2020?.ryd3 / 100000000)?.toFixed(2),
      eleventhColumn: Number(secondQuarter2020?.ryd3 / 100000000)?.toFixed(2),
      twelfthColumn: Number(thirdQuarter2020?.ryd3 / 100000000)?.toFixed(2),
      thirteenthColumn: Number(fourthQuarter2020?.ryd3 / 100000000)?.toFixed(2),
      fourteenthColumn: Number(firstQuarter2021?.ryd3 / 100000000)?.toFixed(2),
      fifteenthColumn: Number(secondQuarter2021?.ryd3 / 1000000000)?.toFixed(2),
      sixteenthColumn: Number(thirdQuarter2021?.ryd3 / 1000000000)?.toFixed(2),
      seventeenthColumn: Number(fourthQuarter2021?.ryd3 / 1000000000)?.toFixed(
        2
      ),
      eighteenthColumn: Number(firstQuarter2022?.ryd3 / 1000000000)?.toFixed(2),
      nineteenthColumn: Number(secondQuarter2022?.ryd3 / 1000000000)?.toFixed(
        2
      ),
      twentiethColumn: Number(thirdQuarter2022?.ryd3 / 1000000000)?.toFixed(2),
      twentyFirstColumn: Number(fourthQuarter2022?.ryd3 / 1000000000)?.toFixed(
        2
      ),
    },
    {
      key: "5",
      firstColumn: "Nhóm hiệu quả hoạt động",
    },
    {
      key: "6",
      firstColumn: "Doanh thu (Nghìn tỷ)",
      secondColumn: convertToTrillion(firstQuarter2018?.rev),
      thirdColumn: convertToTrillion(secondQuarter2018?.rev),
      fourthColumn: convertToTrillion(thirdQuarter2018?.rev),
      fifthColumn: convertToTrillion(fourthQuarter2018?.rev),
      sixthColumn: convertToTrillion(firstQuarter2019?.rev),
      seventhColumn: convertToTrillion(secondQuarter2019?.rev),
      eighthColumn: convertToTrillion(thirdQuarter2019?.rev),
      ninthColumn: convertToTrillion(fourthQuarter2019?.rev),
      tenthColumn: convertToTrillion(firstQuarter2020?.rev),
      eleventhColumn: convertToTrillion(secondQuarter2020?.rev),
      twelfthColumn: convertToTrillion(thirdQuarter2020?.rev),
      thirteenthColumn: convertToTrillion(fourthQuarter2020?.rev),
      fourteenthColumn: convertToTrillion(firstQuarter2021?.rev),
      fifteenthColumn: convertToTrillion(secondQuarter2021?.rev),
      sixteenthColumn: convertToTrillion(thirdQuarter2021?.rev),
      seventeenthColumn: convertToTrillion(fourthQuarter2021?.rev),
      eighteenthColumn: convertToTrillion(firstQuarter2022?.rev),
      nineteenthColumn: convertToTrillion(secondQuarter2022?.rev),
      twentiethColumn: convertToTrillion(thirdQuarter2022?.rev),
      twentyFirstColumn: convertToTrillion(fourthQuarter2022?.rev),
    },
    {
      key: "7",
      firstColumn: "Tăng trưởng doanh thu (%)",
      secondColumn: Number(firstQuarter2018?.ryq34?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq34?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq34?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq34?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq34?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq34?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq34?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq34?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq34?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq34?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq34?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq34?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq34?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq34?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq34?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq34?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq34?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq34?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq34?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq34?.toFixed(2)),
    },
    {
      key: "8",
      firstColumn: "Lợi nhuận sau thuế (Nghìn tỷ)",
      secondColumn: convertToTrillion(firstQuarter2018?.isa22),
      thirdColumn: convertToTrillion(secondQuarter2018?.isa22),
      fourthColumn: convertToTrillion(thirdQuarter2018?.isa22),
      fifthColumn: convertToTrillion(fourthQuarter2018?.isa22),
      sixthColumn: convertToTrillion(firstQuarter2019?.isa22),
      seventhColumn: convertToTrillion(secondQuarter2019?.isa22),
      eighthColumn: convertToTrillion(thirdQuarter2019?.isa22),
      ninthColumn: convertToTrillion(fourthQuarter2019?.isa22),
      tenthColumn: convertToTrillion(firstQuarter2020?.isa22),
      eleventhColumn: convertToTrillion(secondQuarter2020?.isa22),
      twelfthColumn: convertToTrillion(thirdQuarter2020?.isa22),
      thirteenthColumn: convertToTrillion(fourthQuarter2020?.isa22),
      fourteenthColumn: convertToTrillion(firstQuarter2021?.isa22),
      fifteenthColumn: convertToTrillion(secondQuarter2021?.isa22),
      sixteenthColumn: convertToTrillion(thirdQuarter2021?.isa22),
      seventeenthColumn: convertToTrillion(fourthQuarter2021?.isa22),
      eighteenthColumn: convertToTrillion(firstQuarter2022?.isa22),
      nineteenthColumn: convertToTrillion(secondQuarter2022?.isa22),
      twentiethColumn: convertToTrillion(thirdQuarter2022?.isa22),
      twentyFirstColumn: convertToTrillion(fourthQuarter2022?.isa22),
    },
    {
      key: "9",
      firstColumn: "Tăng trưởng doanh thu (%)",
      secondColumn: Number(firstQuarter2018?.ryq39?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq39?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq39?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq39?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq39?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq39?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq39?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq39?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq39?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq39?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq39?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq39?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq39?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq39?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq39?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq39?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq39?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq39?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq39?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq39?.toFixed(2)),
    },
    {
      key: "10",
      firstColumn: "Biên EBIT (%)",
      secondColumn:
        Number(firstQuarter2018?.ryq27?.toFixed(2))?.toString() + "%",
      thirdColumn:
        Number(secondQuarter2018?.ryq27?.toFixed(2))?.toString() + "%",
      fourthColumn:
        Number(thirdQuarter2018?.ryq27?.toFixed(2))?.toString() + "%",
      fifthColumn:
        Number(fourthQuarter2018?.ryq27?.toFixed(2))?.toString() + "%",
      sixthColumn:
        Number(firstQuarter2019?.ryq27?.toFixed(2))?.toString() + "%",
      seventhColumn:
        Number(secondQuarter2019?.ryq27?.toFixed(2))?.toString() + "%",
      eighthColumn:
        Number(thirdQuarter2019?.ryq27?.toFixed(2))?.toString() + "%",
      ninthColumn:
        Number(fourthQuarter2019?.ryq27?.toFixed(2))?.toString() + "%",
      tenthColumn:
        Number(firstQuarter2020?.ryq27?.toFixed(2))?.toString() + "%",
      eleventhColumn:
        Number(secondQuarter2020?.ryq27?.toFixed(2))?.toString() + "%",
      twelfthColumn:
        Number(thirdQuarter2020?.ryq27?.toFixed(2))?.toString() + "%",
      thirteenthColumn:
        Number(fourthQuarter2020?.ryq27?.toFixed(2))?.toString() + "%",
      fourteenthColumn:
        Number(firstQuarter2021?.ryq27?.toFixed(2))?.toString() + "%",
      fifteenthColumn:
        Number(secondQuarter2021?.ryq27?.toFixed(2))?.toString() + "%",
      sixteenthColumn:
        Number(thirdQuarter2021?.ryq27?.toFixed(2))?.toString() + "%",
      seventeenthColumn:
        Number(fourthQuarter2021?.ryq27?.toFixed(2))?.toString() + "%",
      eighteenthColumn:
        Number(firstQuarter2022?.ryq27?.toFixed(2))?.toString() + "%",
      nineteenthColumn:
        Number(secondQuarter2022?.ryq27?.toFixed(2))?.toString() + "%",
      twentiethColumn:
        Number(thirdQuarter2022?.ryq27?.toFixed(2))?.toString() + "%",
      twentyFirstColumn:
        Number(fourthQuarter2022?.ryq27?.toFixed(2))?.toString() + "%",
    },
    {
      key: "11",
      firstColumn: "ROE (%)",
      secondColumn:
        Number(firstQuarter2018?.ryq12?.toFixed(2))?.toString() + "%",
      thirdColumn:
        Number(secondQuarter2018?.ryq12?.toFixed(2))?.toString() + "%",
      fourthColumn:
        Number(thirdQuarter2018?.ryq12?.toFixed(2))?.toString() + "%",
      fifthColumn:
        Number(fourthQuarter2018?.ryq12?.toFixed(2))?.toString() + "%",
      sixthColumn:
        Number(firstQuarter2019?.ryq12?.toFixed(2))?.toString() + "%",
      seventhColumn:
        Number(secondQuarter2019?.ryq12?.toFixed(2))?.toString() + "%",
      eighthColumn:
        Number(thirdQuarter2019?.ryq12?.toFixed(2))?.toString() + "%",
      ninthColumn:
        Number(fourthQuarter2019?.ryq12?.toFixed(2))?.toString() + "%",
      tenthColumn:
        Number(firstQuarter2020?.ryq12?.toFixed(2))?.toString() + "%",
      eleventhColumn:
        Number(secondQuarter2020?.ryq12?.toFixed(2))?.toString() + "%",
      twelfthColumn:
        Number(thirdQuarter2020?.ryq12?.toFixed(2))?.toString() + "%",
      thirteenthColumn:
        Number(fourthQuarter2020?.ryq12?.toFixed(2))?.toString() + "%",
      fourteenthColumn:
        Number(firstQuarter2021?.ryq12?.toFixed(2))?.toString() + "%",
      fifteenthColumn:
        Number(secondQuarter2021?.ryq12?.toFixed(2))?.toString() + "%",
      sixteenthColumn:
        Number(thirdQuarter2021?.ryq12?.toFixed(2))?.toString() + "%",
      seventeenthColumn:
        Number(fourthQuarter2021?.ryq12?.toFixed(2))?.toString() + "%",
      eighteenthColumn:
        Number(firstQuarter2022?.ryq12?.toFixed(2))?.toString() + "%",
      nineteenthColumn:
        Number(secondQuarter2022?.ryq12?.toFixed(2))?.toString() + "%",
      twentiethColumn:
        Number(thirdQuarter2022?.ryq12?.toFixed(2))?.toString() + "%",
      twentyFirstColumn:
        Number(fourthQuarter2022?.ryq12?.toFixed(2))?.toString() + "%",
    },
    {
      key: "12",
      firstColumn: "ROIC (%)",
      secondColumn:
        Number(firstQuarter2018?.ryq76?.toFixed(2))?.toString() + "%",
      thirdColumn:
        Number(secondQuarter2018?.ryq76?.toFixed(2))?.toString() + "%",
      fourthColumn:
        Number(thirdQuarter2018?.ryq76?.toFixed(2))?.toString() + "%",
      fifthColumn:
        Number(fourthQuarter2018?.ryq76?.toFixed(2))?.toString() + "%",
      sixthColumn:
        Number(firstQuarter2019?.ryq76?.toFixed(2))?.toString() + "%",
      seventhColumn:
        Number(secondQuarter2019?.ryq76?.toFixed(2))?.toString() + "%",
      eighthColumn:
        Number(thirdQuarter2019?.ryq76?.toFixed(2))?.toString() + "%",
      ninthColumn:
        Number(fourthQuarter2019?.ryq76?.toFixed(2))?.toString() + "%",
      tenthColumn:
        Number(firstQuarter2020?.ryq76?.toFixed(2))?.toString() + "%",
      eleventhColumn:
        Number(secondQuarter2020?.ryq76?.toFixed(2))?.toString() + "%",
      twelfthColumn:
        Number(thirdQuarter2020?.ryq76?.toFixed(2))?.toString() + "%",
      thirteenthColumn:
        Number(fourthQuarter2020?.ryq76?.toFixed(2))?.toString() + "%",
      fourteenthColumn:
        Number(firstQuarter2021?.ryq76?.toFixed(2))?.toString() + "%",
      fifteenthColumn:
        Number(secondQuarter2021?.ryq76?.toFixed(2))?.toString() + "%",
      sixteenthColumn:
        Number(thirdQuarter2021?.ryq76?.toFixed(2))?.toString() + "%",
      seventeenthColumn:
        Number(fourthQuarter2021?.ryq76?.toFixed(2))?.toString() + "%",
      eighteenthColumn:
        Number(firstQuarter2022?.ryq76?.toFixed(2))?.toString() + "%",
      nineteenthColumn:
        Number(secondQuarter2022?.ryq76?.toFixed(2))?.toString() + "%",
      twentiethColumn:
        Number(thirdQuarter2022?.ryq76?.toFixed(2))?.toString() + "%",
      twentyFirstColumn:
        Number(fourthQuarter2022?.ryq76?.toFixed(2))?.toString() + "%",
    },
    {
      key: "13",
      firstColumn: "Biên lợi nhuận ròng (%)",
      secondColumn:
        Number(firstQuarter2018?.ryq29?.toFixed(2))?.toString() + "%",
      thirdColumn:
        Number(secondQuarter2018?.ryq29?.toFixed(2))?.toString() + "%",
      fourthColumn:
        Number(thirdQuarter2018?.ryq29?.toFixed(2))?.toString() + "%",
      fifthColumn:
        Number(fourthQuarter2018?.ryq29?.toFixed(2))?.toString() + "%",
      sixthColumn:
        Number(firstQuarter2019?.ryq29?.toFixed(2))?.toString() + "%",
      seventhColumn:
        Number(secondQuarter2019?.ryq29?.toFixed(2))?.toString() + "%",
      eighthColumn:
        Number(thirdQuarter2019?.ryq29?.toFixed(2))?.toString() + "%",
      ninthColumn:
        Number(fourthQuarter2019?.ryq29?.toFixed(2))?.toString() + "%",
      tenthColumn:
        Number(firstQuarter2020?.ryq29?.toFixed(2))?.toString() + "%",
      eleventhColumn:
        Number(secondQuarter2020?.ryq29?.toFixed(2))?.toString() + "%",
      twelfthColumn:
        Number(thirdQuarter2020?.ryq29?.toFixed(2))?.toString() + "%",
      thirteenthColumn:
        Number(fourthQuarter2020?.ryq29?.toFixed(2))?.toString() + "%",
      fourteenthColumn:
        Number(firstQuarter2021?.ryq29?.toFixed(2))?.toString() + "%",
      fifteenthColumn:
        Number(secondQuarter2021?.ryq29?.toFixed(2))?.toString() + "%",
      sixteenthColumn:
        Number(thirdQuarter2021?.ryq29?.toFixed(2))?.toString() + "%",
      seventeenthColumn:
        Number(fourthQuarter2021?.ryq29?.toFixed(2))?.toString() + "%",
      eighteenthColumn:
        Number(firstQuarter2022?.ryq29?.toFixed(2))?.toString() + "%",
      nineteenthColumn:
        Number(secondQuarter2022?.ryq29?.toFixed(2))?.toString() + "%",
      twentiethColumn:
        Number(thirdQuarter2022?.ryq29?.toFixed(2))?.toString() + "%",
      twentyFirstColumn:
        Number(fourthQuarter2022?.ryq29?.toFixed(2))?.toString() + "%",
    },
    {
      key: "14",
      firstColumn: "Biên lợi nhuận gộp (%)",
      secondColumn:
        Number(firstQuarter2018?.ryq25?.toFixed(2))?.toString() + "%",
      thirdColumn:
        Number(secondQuarter2018?.ryq25?.toFixed(2))?.toString() + "%",
      fourthColumn:
        Number(thirdQuarter2018?.ryq25?.toFixed(2))?.toString() + "%",
      fifthColumn:
        Number(fourthQuarter2018?.ryq25?.toFixed(2))?.toString() + "%",
      sixthColumn:
        Number(firstQuarter2019?.ryq25?.toFixed(2))?.toString() + "%",
      seventhColumn:
        Number(secondQuarter2019?.ryq25?.toFixed(2))?.toString() + "%",
      eighthColumn:
        Number(thirdQuarter2019?.ryq25?.toFixed(2))?.toString() + "%",
      ninthColumn:
        Number(fourthQuarter2019?.ryq25?.toFixed(2))?.toString() + "%",
      tenthColumn:
        Number(firstQuarter2020?.ryq25?.toFixed(2))?.toString() + "%",
      eleventhColumn:
        Number(secondQuarter2020?.ryq25?.toFixed(2))?.toString() + "%",
      twelfthColumn:
        Number(thirdQuarter2020?.ryq25?.toFixed(2))?.toString() + "%",
      thirteenthColumn:
        Number(fourthQuarter2020?.ryq25?.toFixed(2))?.toString() + "%",
      fourteenthColumn:
        Number(firstQuarter2021?.ryq25?.toFixed(2))?.toString() + "%",
      fifteenthColumn:
        Number(secondQuarter2021?.ryq25?.toFixed(2))?.toString() + "%",
      sixteenthColumn:
        Number(thirdQuarter2021?.ryq25?.toFixed(2))?.toString() + "%",
      seventeenthColumn:
        Number(fourthQuarter2021?.ryq25?.toFixed(2))?.toString() + "%",
      eighteenthColumn:
        Number(firstQuarter2022?.ryq25?.toFixed(2))?.toString() + "%",
      nineteenthColumn:
        Number(secondQuarter2022?.ryq25?.toFixed(2))?.toString() + "%",
      twentiethColumn:
        Number(thirdQuarter2022?.ryq25?.toFixed(2))?.toString() + "%",
      twentyFirstColumn:
        Number(fourthQuarter2022?.ryq25?.toFixed(2))?.toString() + "%",
    },
    {
      key: "15",
      firstColumn: "Nhóm chỉ số thanh toán",
    },
    {
      key: "16",
      firstColumn: "Chỉ số thanh toán hiện tại",
      secondColumn: Number(firstQuarter2018?.ryq3?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq3?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq3?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq3?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq3?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq3?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq3?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq3?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq3?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq3?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq3?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq3?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq3?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq3?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq3?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq3?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq3?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq3?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq3?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq3?.toFixed(2)),
    },
    {
      key: "17",
      firstColumn: "Chỉ số thanh toán tiền mặt",
      secondColumn: Number(firstQuarter2018?.ryq1?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq1?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq1?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq1?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq1?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq1?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq1?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq1?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq1?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq1?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq1?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq1?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq1?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq1?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq1?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq1?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq1?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq1?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq1?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq1?.toFixed(2)),
    },
    {
      key: "18",
      firstColumn: "Chỉ số thanh toán nhanh",
      secondColumn: Number(firstQuarter2018?.ryq2?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq2?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq2?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq2?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq2?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq2?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq2?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq2?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq2?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq2?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq2?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq2?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq2?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq2?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq2?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq2?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq2?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq2?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq2?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq2?.toFixed(2)),
    },
    {
      key: "19",
      firstColumn: "Khả năng chi trả lãi vay (%)",
      secondColumn:
        Number(firstQuarter2018?.ryq77?.toFixed(2))?.toString() + "%",
      thirdColumn:
        Number(secondQuarter2018?.ryq77?.toFixed(2))?.toString() + "%",
      fourthColumn:
        Number(thirdQuarter2018?.ryq77?.toFixed(2))?.toString() + "%",
      fifthColumn:
        Number(fourthQuarter2018?.ryq77?.toFixed(2))?.toString() + "%",
      sixthColumn:
        Number(firstQuarter2019?.ryq77?.toFixed(2))?.toString() + "%",
      seventhColumn:
        Number(secondQuarter2019?.ryq77?.toFixed(2))?.toString() + "%",
      eighthColumn:
        Number(thirdQuarter2019?.ryq77?.toFixed(2))?.toString() + "%",
      ninthColumn:
        Number(fourthQuarter2019?.ryq77?.toFixed(2))?.toString() + "%",
      tenthColumn:
        Number(firstQuarter2020?.ryq77?.toFixed(2))?.toString() + "%",
      eleventhColumn:
        Number(secondQuarter2020?.ryq77?.toFixed(2))?.toString() + "%",
      twelfthColumn:
        Number(thirdQuarter2020?.ryq77?.toFixed(2))?.toString() + "%",
      thirteenthColumn:
        Number(fourthQuarter2020?.ryq77?.toFixed(2))?.toString() + "%",
      fourteenthColumn:
        Number(firstQuarter2021?.ryq77?.toFixed(2))?.toString() + "%",
      fifteenthColumn:
        Number(secondQuarter2021?.ryq77?.toFixed(2))?.toString() + "%",
      sixteenthColumn:
        Number(thirdQuarter2021?.ryq77?.toFixed(2))?.toString() + "%",
      seventeenthColumn:
        Number(fourthQuarter2021?.ryq77?.toFixed(2))?.toString() + "%",
      eighteenthColumn:
        Number(firstQuarter2022?.ryq77?.toFixed(2))?.toString() + "%",
      nineteenthColumn:
        Number(secondQuarter2022?.ryq77?.toFixed(2))?.toString() + "%",
      twentiethColumn:
        Number(thirdQuarter2022?.ryq77?.toFixed(2))?.toString() + "%",
      twentyFirstColumn:
        Number(fourthQuarter2022?.ryq77?.toFixed(2))?.toString() + "%",
    },
    {
      key: "20",
      firstColumn: "Nhóm hiệu suất hoạt động",
    },
    {
      key: "21",
      firstColumn: "Vòng quay tài sản",
      secondColumn: Number(firstQuarter2018?.ryq31?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq31?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq31?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq31?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq31?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq31?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq31?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq31?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq31?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq31?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq31?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq31?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq31?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq31?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq31?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq31?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq31?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq31?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq31?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq31?.toFixed(2)),
    },
    {
      key: "22",
      firstColumn: "Vòng quay TSCĐ",
      secondColumn: Number(firstQuarter2018?.ryq91?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq91?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq91?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq91?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq91?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq91?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq91?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq91?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq91?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq91?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq91?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq91?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq91?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq91?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq91?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq91?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq91?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq91?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq91?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq91?.toFixed(2)),
    },
    {
      key: "23",
      firstColumn: "Số ngày thu tiền bình quân",
      secondColumn: Number(firstQuarter2018?.ryq16?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq16?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq16?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq16?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq16?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq16?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq16?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq16?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq16?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq16?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq16?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq16?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq16?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq16?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq16?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq16?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq16?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq16?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq16?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq16?.toFixed(2)),
    },
    {
      key: "24",
      firstColumn: "Số ngày tồn kho bình quân",
      secondColumn: Number(firstQuarter2018?.ryq18?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq18?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq18?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq18?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq18?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq18?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq18?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq18?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq18?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq18?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq18?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq18?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq18?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq18?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq18?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq18?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq18?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq18?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq18?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq18?.toFixed(2)),
    },
    {
      key: "25",
      firstColumn: "Số ngày thanh toán bình quân",
      secondColumn: Number(firstQuarter2018?.ryq20?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq20?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq20?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq20?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq20?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq20?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq20?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq20?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq20?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq20?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq20?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq20?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq20?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq20?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq20?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq20?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq20?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq20?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq20?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq20?.toFixed(2)),
    },
    {
      key: "26",
      firstColumn: "Chu kỳ tiền",
      secondColumn: Number(firstQuarter2018?.cashCycle?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.cashCycle?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.cashCycle?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.cashCycle?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.cashCycle?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.cashCycle?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.cashCycle?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.cashCycle?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.cashCycle?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.cashCycle?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.cashCycle?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.cashCycle?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.cashCycle?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.cashCycle?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.cashCycle?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.cashCycle?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.cashCycle?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.cashCycle?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.cashCycle?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.cashCycle?.toFixed(2)),
    },
    {
      key: "27",
      firstColumn: "Nhóm cơ cấu nguồn vốn",
      secondColumn: "",
    },
    {
      key: "28",
      firstColumn: "Nợ/VCSH",
      secondColumn: Number(firstQuarter2018?.ryq10?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq10?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq10?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq10?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq10?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq10?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq10?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq10?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq10?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq10?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq10?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq10?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq10?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq10?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq10?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq10?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq10?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq10?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq10?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq10?.toFixed(2)),
    },
    {
      key: "29",
      firstColumn: "(Vay NH+DH)/VCSH",
      secondColumn: Number(firstQuarter2018?.ryq6?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq6?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq6?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq6?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq6?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq6?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq6?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq6?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq6?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq6?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq6?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq6?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq6?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq6?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq6?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq6?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq6?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq6?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq6?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq6?.toFixed(2)),
    },
    {
      key: "30",
      firstColumn: "Đòn bẩy tài chính",
      secondColumn: Number(firstQuarter2018?.ryq71?.toFixed(2)),
      thirdColumn: Number(secondQuarter2018?.ryq71?.toFixed(2)),
      fourthColumn: Number(thirdQuarter2018?.ryq71?.toFixed(2)),
      fifthColumn: Number(fourthQuarter2018?.ryq71?.toFixed(2)),
      sixthColumn: Number(firstQuarter2019?.ryq71?.toFixed(2)),
      seventhColumn: Number(secondQuarter2019?.ryq71?.toFixed(2)),
      eighthColumn: Number(thirdQuarter2019?.ryq71?.toFixed(2)),
      ninthColumn: Number(fourthQuarter2019?.ryq71?.toFixed(2)),
      tenthColumn: Number(firstQuarter2020?.ryq71?.toFixed(2)),
      eleventhColumn: Number(secondQuarter2020?.ryq71?.toFixed(2)),
      twelfthColumn: Number(thirdQuarter2020?.ryq71?.toFixed(2)),
      thirteenthColumn: Number(fourthQuarter2020?.ryq71?.toFixed(2)),
      fourteenthColumn: Number(firstQuarter2021?.ryq71?.toFixed(2)),
      fifteenthColumn: Number(secondQuarter2021?.ryq71?.toFixed(2)),
      sixteenthColumn: Number(thirdQuarter2021?.ryq71?.toFixed(2)),
      seventeenthColumn: Number(fourthQuarter2021?.ryq71?.toFixed(2)),
      eighteenthColumn: Number(firstQuarter2022?.ryq71?.toFixed(2)),
      nineteenthColumn: Number(secondQuarter2022?.ryq71?.toFixed(2)),
      twentiethColumn: Number(thirdQuarter2022?.ryq71?.toFixed(2)),
      twentyFirstColumn: Number(fourthQuarter2022?.ryq71?.toFixed(2)),
    },
  ];

  const newListCompany = listCompany?.map((obj: any) => ({
    name: obj.organTypeCode,
    value: obj.comTypeCode,
  }));

  // DATA QUÝ
  const companyAsset = financialChart?.taiSan;
  const companyCapital = financialChart?.nguonVon;
  const companyCashFlow = financialChart?.luuChuyenTien;
  const ketQuaKinhDoanhQuater = financialChart?.ketQuaKinhDoanh;
  const netReveNueQuater = financialChart?.doanhThuThuan;
  const profitBeforeTax = financialChart?.coCauLoiNhuanTruocThue;
  const profitAfterTax = financialChart?.loiNhuanSauThue;
  const riskProvisionCostsQuarter = financialChart?.ketQuaKinhDoanh;

  // DATA NĂM
  const companyAssetYear = financialChartYear?.taiSan;
  const companyCapitalYear = financialChartYear?.nguonVon;
  const companyCashFlowYear = financialChartYear?.luuChuyenTien;
  const netReveNueYear = financialChartYear?.doanhThuThuan;
  const ketQuaKinhDoanh = financialChartYear?.ketQuaKinhDoanh;
  const profitBeforeTaxYear = financialChartYear?.coCauLoiNhuanTruocThue;
  const profitAfterTaxYear = financialChartYear?.loiNhuanSauThue;
  const riskProvisionCostsYear = financialChartYear?.ketQuaKinhDoanh;

  // DATA CHART TÀI SẢN BẢO HIỂM
  const insuranceAssetQuarter = financialChart?.taiSan;
  const insuranceAssetYear = financialChartYear?.taiSan;

  // DATA CHART TÀI SẢN NGÂN HÀNG
  const bankAssetQuarter = financialChart?.taiSan;
  const bankAssetYear = financialChartYear?.taiSan;

  const bankAssetQuarterThuNhap = financialChart?.taiSan;
  const bankAssetYearThuNhap = financialChartYear?.taiSan;
  // DATA CHART TÀI SẢN DỊCH VỤ TÀI CHÍNH
  const financialAssetQuarter = financialChart?.taiSan;
  const financialAssetYear = financialChartYear?.taiSan;

  // DATA CHART NGUỒN VỐN BẢO HIỂM
  const insuranceCapitalQuarter = financialChart?.nguonVon;
  const insuranceCapitalYear = financialChartYear?.nguonVon;

  // DATA CHART NGUỒN VỐN NGÂN HÀNG
  const bankCapitalQuarter = financialChart?.nguonVon;
  const bankCapitalYear = financialChartYear?.nguonVon;

  // DATA CHART NGUỒN VỐN NGÂN HÀNG
  const financialCapitalQuarter = financialChart?.nguonVon;
  const financialCapitalYear = financialChart?.nguonVon;
  const [quarterCompanyAsset, setQuarterCompanyAsset] = useState([]);
  const [dataQuarterCompanyAsset, setDataQuarterCompanyAsset] = useState([]);
  const [startYear, setStartYear] = useState();

  const formatQuarterYear = (quarter, year) => {
    const quarterStr = `Q${quarter}`;
    const yearStr = year?.toString().slice(-2);
    return `${quarterStr}'${yearStr}`;
  };
  useEffect(() => {
    if (Array.isArray(companyAsset) && companyAsset.length > 0) {
      const convertedData = companyAsset.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(...companyAsset.map((item) => item.year));
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataQuarterCompanyAsset(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterCompanyAsset(quarterYearList);
    } else {
      console.error("companyAsset không phải là một mảng hoặc mảng rỗng.");
    }
    if (Array.isArray(companyCapitalYear) && companyCapitalYear.length > 0) {
      const latestYearIndex = companyCapitalYear.length - 1;
      const startYearLilter = companyCapitalYear[latestYearIndex].year - 12;
      setStartYear(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng companyCapitalYear không tồn tại hoặc rỗng.");
    }
  }, [companyAsset, companyCapitalYear]);

  // DATA CHART TÀI SẢN CHUNG (QUÝ)

  const [
    cashAssetQuarter,
    netShortTermInvestmentValueQuarter,
    longTermInvestmentQuarter,
    receivableQuarter,
    inventoryQuarter,
    fixedAssetQuarter,
    mobileAssetQuarter,
    longTermReceivableQuarter,
    valueInvestmentAssetQuarter,
    longTermUnfinishedAssetQuarter,
    otherLongTermAssetQuarter,
  ] = [
    "tienVaTuongDuongTien",
    "giaTriThuanDauTuNganHan",
    "dauTuDaiHan",
    "cacKhoanPhaiThu",
    "hangTonKhoRong",
    "taiSanCoDinh",
    "taiSanLuuDongKhac",
    "phaiThuDaiHan",
    "giaTriRongTaiSanDauTu",
    "taiSanDoDangDaiHan",
    "taiSanDaiHanKhac",
  ].map((field) => dataQuarterCompanyAsset?.map((asset: any) => asset[field]));

  // DATA CHART TÀI SẢN CHUNG (NĂM)
  const fourthQuarterAsset = companyAssetYear
    ?.filter((asset: any) => asset.quarter === 5 && asset.year >= startYear)
    .map((asset: any) => ({
      nam: asset.year,
      tienVaTuongDuongTien: asset.tienVaTuongDuongTien,
      giaTriThuanDauTuNganHan: asset.giaTriThuanDauTuNganHan,
      dauTuNganHan: asset.dauTuNganHan,
      dauTuDaiHan: asset.dauTuDaiHan,
      cacKhoanPhaiThu: asset.cacKhoanPhaiThu,
      hangTonKhoRong: asset.hangTonKhoRong,
      taiSanCoDinh: asset.taiSanCoDinh,
      taiSanLuuDongKhac: asset.taiSanLuuDongKhac,
      phaiThuDaiHan: asset.phaiThuDaiHan,
      giaTriRongTaiSanDauTu: asset.giaTriRongTaiSanDauTu,
      taiSanDoDangDaiHan: asset.taiSanDoDangDaiHan,
      taiSanDaiHanKhac: asset.taiSanDaiHanKhac,
    }));
  const year_01 = fourthQuarterAsset?.map((asset: any) => asset.nam);
  // ?.sort((a: number, b: number) => a - b);
  const [
    cashAssetYear,
    netShortTermInvestmentValueYear,
    longTermInvestmentYear,
    receivableYear,
    inventoryYear,
    fixedAssetYear,
    mobileAssetYear,
    longTermReceivableYear,
    valueInvestmentAssetYear,
    longTermUnfinishedAssetYear,
    otherLongTermAssetYear,
  ] = [
    "tienVaTuongDuongTien",
    "giaTriThuanDauTuNganHan",
    "dauTuDaiHan",
    "cacKhoanPhaiThu",
    "hangTonKhoRong",
    "taiSanCoDinh",
    "taiSanLuuDongKhac",
    "phaiThuDaiHan",
    "giaTriRongTaiSanDauTu",
    "taiSanDoDangDaiHan",
    "taiSanDaiHanKhac",
  ].map((field) =>
    fourthQuarterAsset?.map((asset: any) => {
      return asset[field];
    })
  );

  const DATA_ASSET_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      borderRadius: 8,
      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    xAxis: {
      categories: assetChange === "quarter" ? quarterCompanyAsset : year_01,
      tickInterval:
        assetChange === "quarter"
          ? parseInt(quarterCompanyAsset?.length / 4)
          : parseInt(year_01?.length / 4),
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },

    borderWidth: 0,
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal",
      itemWidth: window.innerWidth < 1600 ? 140 : 180, // Set width so that only 2 items fit per row
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1)"
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,
        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      y: 25,
      navigation: {
        activeColor: "#3E576F",
        inactiveColor: "#CCC",
        style: {
          color: "#CCC",
        },
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tiền và tương đương tiền",
        data: assetChange === "quarter" ? cashAssetQuarter : cashAssetYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#29DCFD',
        // },
      },
      {
        name: "Giá trị thuần đầu tư ngắn hạn",
        data:
          assetChange === "quarter"
            ? netShortTermInvestmentValueQuarter
            : netShortTermInvestmentValueYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#0FC384',
        // },
      },
      {
        name: "Đầu tư dài hạn",
        data:
          assetChange === "quarter"
            ? longTermInvestmentQuarter
            : longTermInvestmentYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#F51CDD',
        // },
      },
      {
        name: "Các khoản phải thu",
        data: assetChange === "quarter" ? receivableQuarter : receivableYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#a0d911',
        // },
      },
      {
        name: "Hàng tồn kho ròng",
        data: assetChange === "quarter" ? inventoryQuarter : inventoryYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#b37feb',
        // },
      },
      {
        name: "Tài sản cố định",
        data: assetChange === "quarter" ? fixedAssetQuarter : fixedAssetYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#ffd666',
        // },
      },
      {
        name: "Tài sản lưu động khác",
        data: assetChange === "quarter" ? mobileAssetQuarter : mobileAssetYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#ff7a45',
        // },
      },
      {
        name: "Phải thu dài hạn",
        data:
          assetChange === "quarter"
            ? longTermReceivableQuarter
            : longTermReceivableYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#eaff8f',
        // },
      },
      {
        name: "Giá trị ròng tài sản đầu tư",
        data:
          assetChange === "quarter"
            ? valueInvestmentAssetQuarter
            : valueInvestmentAssetYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#f759ab',
        // },
      },
      {
        name: "Tài sản dở dang dài hạn",
        data:
          assetChange === "quarter"
            ? longTermUnfinishedAssetQuarter
            : longTermUnfinishedAssetYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#d9f7be',
        // },
      },
      {
        name: "Tài sản dài hạn khác",
        data:
          assetChange === "quarter"
            ? otherLongTermAssetQuarter
            : otherLongTermAssetYear,
        // type: 'column',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#ffa39e',
        // },
      },
    ],
    credits: {
      enabled: false,
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Doanh thu thuần (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    //   positioner: function (width, height, point) {
    //     return {
    //       x: point.plotX,
    //       y: point.plotY - 50,
    //     };
    //   },
    //   borderWidth: 0,
    //   backgroundColor: 'rgba(255,255,255,0)',
    //   borderRadius: 0,
    //   shadow: false,
    //   useHTML: true,
    //   percentageDecimals: 2,
    //   formatter: function () {
    //     return `<span data-z-index="1" style="position: absolute; font-family: Inter, &quot;Nunito Sans&quot;, Lexend, &quot;Noto Sans&quot;, sans-serif; font-size: 12px; white-space: nowrap; color: rgb(255, 255, 255); cursor: default; margin-left: 0px; margin-top: 0px; left: 0px; top: 0px; display: block;"><ul style="list-style: none; font-size: 0.7rem; padding: 0; margin: 0; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24)"> <li style="color: #FFFFFF; padding: 0.5rem 0.8rem; background: rgba(128, 128, 128, 0.7)"><b>${
    //       this.x
    //     }</b></li><li style="color: #FFFFFF; padding: 0.5rem 0.8rem; background: rgba(50, 50, 50, 0.5)"><span style="background: ${
    //       this.color
    //     }; width: 0.7rem; height: 0.7rem; border-radius: 50%; display: inline-block"></span> <span>${
    //       this.series.name
    //     }</span>: <b>${
    //       this.point.y?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0
    //     }  Tỷ VNĐ (${this.percentage.toFixed(2)}%)</b></li></ul></span>`;
    //   },
    // },
    exporting: {
      chartOptions: {
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      },
    },
  };
  // DATA CHART TÀI SẢN BẢO HIỂM (QUÝ)
  const [quarterInsuranceAssetQuarter, setQuarterInsuranceAssetQuarter] =
    useState([]);
  const [dataInsuranceAssetQuarter, setDataInsuranceAssetQuarter] = useState(
    []
  );
  const [startYearInsuranceAsset, setStartYearInsuranceAsset] = useState();
  useEffect(() => {
    if (
      Array.isArray(insuranceAssetQuarter) &&
      insuranceAssetQuarter.length > 0
    ) {
      const convertedData = insuranceAssetQuarter.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(
        ...insuranceAssetQuarter.map((item) => item.year)
      );
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataInsuranceAssetQuarter(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterInsuranceAssetQuarter(quarterYearList);
    } else {
      console.error(
        "insuranceAssetQuarter không phải là một mảng hoặc mảng rỗng."
      );
    }
    if (Array.isArray(insuranceAssetYear) && insuranceAssetYear.length > 0) {
      const latestYearIndex = insuranceAssetYear.length - 1;
      const startYearLilter = insuranceAssetYear[latestYearIndex].year - 12;
      setStartYearInsuranceAsset(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng insuranceAssetYear không tồn tại hoặc rỗng.");
    }
  }, [insuranceAssetQuarter]);
  const firstQuarterAsset_01 = insuranceAssetQuarter?.slice(0, 15);
  const [
    cashAssetQuarter_01,
    shortTermInvestmentQuarter_01,
    longTermInvestmentQuarter_01,
    receivableQuarter_01,
    inventoryQuarter_01,
    otherCurrentAssetQuarter_01,
    insuranceAssetQuarter_01,
    longTermeceivableQuarter_01,
    fixedAssestQuarter_01,
    investmentRealEstateQuarter_01,
    longTermUnfinishedAssetQuarter_01,
    longTermFinancialInvestmentQuarter_01,
    otherLongTermAssetQuarter_01,
  ] = [
    "tienVaTuongDuongTien",
    "dauTuNganHan",
    "dauTuDaiHan",
    "cacKhoanPhaiThu",
    "hangTonKhoRong",
    "taiSanNganHanKhac",
    "taiSanTaiBaoHiem",
    "phaiThuDaiHan",
    "taiSanCoDinh",
    "batDongSanDauTu",
    "taiSanDoDangDaiHan",
    "cacKhoanDauTuTaiChinhDaiHan",
    "taiSanDaiHanKhac",
  ].map((field) =>
    dataInsuranceAssetQuarter?.map((asset: any) => asset[field])
  );

  // DATA CHART TÀI SẢN BẢO HIỂM (NĂM)
  const fourthQuarterAsset_01 = insuranceAssetYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearInsuranceAsset
    )
    .map((asset: any) => ({
      nam: asset.year,
      tienVaTuongDuongTien: asset.tienVaTuongDuongTien,
      giaTriThuanDauTuNganHan: asset.giaTriThuanDauTuNganHan,
      dauTuNganHan: asset.dauTuNganHan,
      dauTuDaiHan: asset.dauTuDaiHan,
      cacKhoanPhaiThu: asset.cacKhoanPhaiThu,
      hangTonKhoRong: asset.hangTonKhoRong,
      taiSanCoDinh: asset.taiSanCoDinh,
      taiSanLuuDongKhac: asset.taiSanLuuDongKhac,
      phaiThuDaiHan: asset.phaiThuDaiHan,
      giaTriRongTaiSanDauTu: asset.giaTriRongTaiSanDauTu,
      taiSanDoDangDaiHan: asset.taiSanDoDangDaiHan,
      taiSanDaiHanKhac: asset.taiSanDaiHanKhac,
    }));
  const year_001 = fourthQuarterAsset_01
    ?.map((asset: any) => asset.nam)
    ?.sort((a: number, b: number) => a - b);
  const [
    cashAssetYear_01,
    shortTermInvestmentYear_01,
    longTermInvestmentYear_01,
    receivableYear_01,
    inventoryYear_01,
    otherCurrentAssetYear_01,
    insuranceAssetYear_01,
    longTermeceivableYear_01,
    fixedAssestYear_01,
    investmentRealEstateYear_01,
    longTermUnfinishedAssetYear_01,
    longTermFinancialInvestmentYear_01,
    otherLongTermAssetYear_01,
  ] = [
    "tienVaTuongDuongTien",
    "dauTuNganHan",
    "dauTuDaiHan",
    "cacKhoanPhaiThu",
    "hangTonKhoRong",
    "taiSanNganHanKhac",
    "taiSanTaiBaoHiem",
    "phaiThuDaiHan",
    "taiSanCoDinh",
    "batDongSanDauTu",
    "taiSanDoDangDaiHan",
    "cacKhoanDauTuTaiChinhDaiHan",
    "taiSanDaiHanKhac",
  ].map((field) => fourthQuarterAsset_01?.map((asset: any) => asset[field]));

  // BIỂU ĐỒ TÀI SẢN BẢO HIỂM
  const DATA_INSURANCE_ASSET_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      borderRadius: 8,
      width: null,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      itemWidth: window.innerWidth < 1600 ? 140 : 180,
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      y: 20,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      categories:
        insuranceAssetChange === "quarter"
          ? quarterInsuranceAssetQuarter
          : year_001,

      tickInterval:
        insuranceAssetChange === "quarter"
          ? parseInt(quarterInsuranceAssetQuarter?.length / 4)
          : parseInt(year_001?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Tiền và tương đương tiền",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? cashAssetQuarter_01
            : cashAssetYear_01,

        color: "#29DCFD",
      },
      {
        name: "Đầu tư ngắn hạn",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? shortTermInvestmentQuarter_01
            : shortTermInvestmentYear_01,

        color: "#0FC384",
      },
      {
        name: "Đầu tư dài hạn",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? longTermInvestmentQuarter_01
            : longTermInvestmentYear_01,

        color: "#F51CDD",
      },
      {
        name: "Các khoản phải thu",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? receivableQuarter_01
            : receivableYear_01,

        color: "#a0d911",
      },
      {
        name: "Hàng tồn kho ròng",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? inventoryQuarter_01
            : inventoryYear_01,

        color: "#b37feb",
      },
      {
        name: "Tài sản ngắn hạn khác",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? otherCurrentAssetQuarter_01
            : otherCurrentAssetYear_01,

        color: "#ffd666",
      },
      {
        name: "Tài sản tái bảo hiểm",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? insuranceAssetQuarter_01
            : insuranceAssetYear_01,

        color: "#ff7a45",
      },
      {
        name: "Phải thu dài hạn",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? longTermeceivableQuarter_01
            : longTermeceivableYear_01,

        color: "#eaff8f",
      },
      {
        name: "Tài sản cố định",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? fixedAssestQuarter_01
            : fixedAssestYear_01,

        color: "#f759ab",
      },
      {
        name: "Bất động sản đầu tư",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? investmentRealEstateQuarter_01
            : investmentRealEstateYear_01,

        color: "#d9f7be",
      },
      {
        name: "Tài sản dở dang dài hạn",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? longTermUnfinishedAssetQuarter_01
            : longTermUnfinishedAssetYear_01,

        color: "#ffa39e",
      },
      {
        name: "Các khoản đầu tư tài chính dài hạn",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? longTermFinancialInvestmentQuarter_01
            : longTermFinancialInvestmentYear_01,

        color: "#ff7a45",
      },
      {
        name: "Tài sản dài hạn khác",
        type: "column",

        data:
          insuranceAssetChange === "quarter"
            ? otherLongTermAssetQuarter_01
            : otherLongTermAssetYear_01,

        color: "#0958d9",
      },
    ],
  };

  // DATA CHART TÀI SẢN NGÂN HÀNG (QUÝ)
  const firstQuarterAsset_02 = bankAssetQuarter?.slice(0, 15);
  const [quarterBankAssetQuarter, setQuarterBankAssetQuarter] = useState([]);
  const [dataBankAssetQuarter, setDataBankAssetQuarter] = useState([]);
  const [startYearBankAssetQuarter, setStartYearBankAssetQuarter] = useState();
  useEffect(() => {
    if (Array.isArray(bankAssetQuarter) && bankAssetQuarter.length > 0) {
      const convertedData = bankAssetQuarter.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(...bankAssetQuarter.map((item) => item.year));
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataBankAssetQuarter(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterBankAssetQuarter(quarterYearList);
    } else {
      console.error("bankAssetQuarter không phải là một mảng hoặc mảng rỗng.");
    }
    if (Array.isArray(bankAssetYear) && bankAssetYear.length > 0) {
      const latestYearIndex = bankAssetYear.length - 1;
      const startYearLilter = bankAssetYear[latestYearIndex].year - 12;
      setStartYearBankAssetQuarter(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng bankAssetYear không tồn tại hoặc rỗng.");
    }
  }, [bankAssetQuarter, bankAssetYear]);
  const [
    cashAssetQuarter_02,
    stateBankDepositsQuarter_02,
    differentBankDepositsQuarter_02,
    stockBusinessQuarter_02,
    financialInstrumentQuarter_02,
    customerLoanQuarter_02,
    stockInvestQuarter_02,
    capitalContributionQuarter_02,
    fixedAssetQuarter_02,
    netValueInvestmentAssetQuarter_02,
    longTermUnfinishedAssetQuarter_02,
    longTermInvestmentQuarter_02,
    otherLongTermAssetQuarter_02,
  ] = [
    "tienMatVangBacDaQuy",
    "tienGuiTaiNganHangNhaNuocVietNam",
    "tienGuiTaiCacTCTDKhacVaChoVayCacTCTDKhac",
    "chungKhoanKinhDoanh",
    "cacCongCuTaiChinhPhaiSinhVaCacTaiSanTaiChinhKhac",
    "choVayKhachHang",
    "chungKhoanDauTu",
    "gopVonDauTuDaiHan",
    "taiSanCoDinh",
    "giaTriRongTaiSanDauTu",
    "taiSanCoKhac",
    "cacKhoanDauTuTaiChinhDaiHan",
    "taiSanDaiHanKhac",
  ].map((field) => dataBankAssetQuarter?.map((asset: any) => asset[field]));

  // DATA CHART TÀI SẢN BẢO HIỂM (NĂM)
  const fourthQuarterAsset_02 = bankAssetYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearBankAssetQuarter
    )
    .map((asset: any) => ({
      nam: asset.year,
      tienMatVangBacDaQuy: asset.tienMatVangBacDaQuy,
      tienGuiTaiNganHangNhaNuocVietNam: asset.tienGuiTaiNganHangNhaNuocVietNam,
      tienGuiTaiCacTCTDKhacVaChoVayCacTCTDKhac:
        asset.tienGuiTaiCacTCTDKhacVaChoVayCacTCTDKhac,
      chungKhoanKinhDoanh: asset.chungKhoanKinhDoanh,
      cacCongCuTaiChinhPhaiSinhVaCacTaiSanTaiChinhKhac:
        asset.cacCongCuTaiChinhPhaiSinhVaCacTaiSanTaiChinhKhac,
      choVayKhachHang: asset.choVayKhachHang,
      chungKhoanDauTu: asset.chungKhoanDauTu,
      gopVonDauTuDaiHan: asset.gopVonDauTuDaiHan,
      taiSanCoDinh: asset.taiSanCoDinh,
      giaTriRongTaiSanDauTu: asset.giaTriRongTaiSanDauTu,
      taiSanCoKhac: asset.taiSanCoKhac,
      cacKhoanDauTuTaiChinhDaiHan: asset.cacKhoanDauTuTaiChinhDaiHan,
      taiSanDaiHanKhac: asset.taiSanDaiHanKhac,
    }));
  const year_002 = fourthQuarterAsset_02
    ?.map((asset: any) => asset.nam)
    ?.sort((a: number, b: number) => a - b);
  const [
    cashAssetYear_02,
    stateBankDepositsYear_02,
    differentBankDepositsYear_02,
    stockBusinessYear_02,
    financialInstrumentYear_02,
    customerLoanYear_02,
    stockInvestYear_02,
    capitalContributionYear_02,
    fixedAssetYear_02,
    netValueInvestmentAssetYear_02,
    longTermUnfinishedAssetYear_02,
    longTermInvestmentYear_02,
    otherLongTermAssetYear_02,
  ] = [
    "tienMatVangBacDaQuy",
    "tienGuiTaiNganHangNhaNuocVietNam",
    "tienGuiTaiCacTCTDKhacVaChoVayCacTCTDKhac",
    "chungKhoanKinhDoanh",
    "cacCongCuTaiChinhPhaiSinhVaCacTaiSanTaiChinhKhac",
    "choVayKhachHang",
    "chungKhoanDauTu",
    "gopVonDauTuDaiHan",
    "taiSanCoDinh",
    "giaTriRongTaiSanDauTu",
    "taiSanCoKhac",
    "cacKhoanDauTuTaiChinhDaiHan",
    "taiSanDaiHanKhac",
  ].map((field) => fourthQuarterAsset_02?.map((asset: any) => asset[field]));
  // BIỂU ĐỒ TÀI SẢN NGÂN HÀNG
  const DATA_BANK_ASSET_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      borderRadius: 8,
      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    xAxis: {
      categories:
        bankAssetChange === "quarter" ? quarterBankAssetQuarter : year_002,

      tickInterval:
        bankAssetChange === "quarter"
          ? parseInt(quarterBankAssetQuarter?.length / 4)
          : parseInt(year_002?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      lineWidth: 1, // Ensures the Y-axis line is visible
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      labels: {
        style: {
          color:
            screenMode === "dark"
              ? "rgba(171, 173, 186, 1)"
              : "rgba(86, 91, 103, 1)",
          fontSize: window.innerWidth < 1600 ? 10 : 13,
          fontWeight: 400,
        },
      },
      crosshair: {
        dashStyle: "dash",
        width: 1,
        color: "gray",
        zIndex: 5,
      },
      title: {
        text: null,
      },
    },

    borderWidth: 0,
    yAxis: [
      {
        min: 0,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      itemWidth: window.innerWidth < 1600 ? 140 : 180,
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      y: 23,
      maxWidth: 500,
    },

    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tiền mặt vàng bạc đá quý",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? cashAssetQuarter_02
            : cashAssetYear_02,

        color: "#29DCFD",
      },
      {
        name: "Tiền gửi tại ngân hàng nhà nước Việt Nam",
        type: "column",
        data:
          bankAssetChange === "quarter"
            ? stateBankDepositsQuarter_02
            : stateBankDepositsYear_02,

        color: "#0FC384",
      },
      {
        name: "Tiền gửi tại các TCTD khác và cho vay các TCTD khác",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? differentBankDepositsQuarter_02
            : differentBankDepositsYear_02,

        color: "#F51CDD",
      },
      {
        name: "Chứng khoán kinh doanh",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? stockBusinessQuarter_02
            : stockBusinessYear_02,

        color: "#a0d911",
      },
      {
        name: "Các công cụ tài chính phái sinh và các tài sản tài chính khác",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? financialInstrumentQuarter_02
            : financialInstrumentYear_02,

        color: "#b37feb",
      },
      {
        name: "Cho vay khách hàng",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? customerLoanQuarter_02
            : customerLoanYear_02,

        color: "#ffd666",
      },
      {
        name: "Chứng khoán đầu tư",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? stockInvestQuarter_02
            : stockInvestYear_02,

        color: "#ff7a45",
      },
      {
        name: "Góp vốn đầu tư dài hạn",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? capitalContributionQuarter_02
            : capitalContributionYear_02,

        color: "#eaff8f",
      },
      {
        name: "Tài sản cố định",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? fixedAssetQuarter_02
            : fixedAssetYear_02,

        color: "#f759ab",
      },
      {
        name: "Giá trị ròng tài sản đầu tư",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? netValueInvestmentAssetQuarter_02
            : netValueInvestmentAssetYear_02,

        color: "#d9f7be",
      },
      {
        name: "Tài sản dở dang dài hạn",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? longTermUnfinishedAssetQuarter_02
            : longTermUnfinishedAssetYear_02,

        color: "#ffa39e",
      },
      {
        name: "Các khoản đầu tư tài chính dài hạn",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? longTermInvestmentQuarter_02
            : longTermInvestmentYear_02,

        color: "#ff7a45",
      },
      {
        name: "Tài sản dài hạn khác",
        type: "column",

        data:
          bankAssetChange === "quarter"
            ? otherLongTermAssetQuarter_02
            : otherLongTermAssetYear_02,

        color: "#0958d9",
      },
    ],
    credits: {
      enabled: false,
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Doanh thu thuần (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },

    // exporting: {
    //   chartOptions: {
    //     plotOptions: {
    //       series: {
    //         dataLabels: {
    //           enabled: true,
    //         },
    //       },
    //     },
    //   },
    // },
  };

  // DATA CHART TÀI SẢN DỊCH VỤ TÀI CHÍNH (QUÝ)
  const firstQuarterAsset_03 = financialAssetQuarter?.slice(44, 59);

  const [quarterFinancialAssetQuarter, setQuarterFinancialAssetQuarter] =
    useState([]);
  const [dataFinancialAssetQuarter, setDataFinancialAssetQuarter] = useState(
    []
  );
  const [startYearFinancialAssetQuarter, setStartYearFinancialAssetQuarter] =
    useState();
  useEffect(() => {
    if (
      Array.isArray(financialAssetQuarter) &&
      financialAssetQuarter.length > 0
    ) {
      const convertedData = financialAssetQuarter.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(
        ...financialAssetQuarter.map((item) => item.year)
      );
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataFinancialAssetQuarter(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterFinancialAssetQuarter(quarterYearList);
    } else {
      console.error(
        "financialAssetQuarter không phải là một mảng hoặc mảng rỗng."
      );
    }
    if (Array.isArray(financialAssetYear) && financialAssetYear.length > 0) {
      const latestYearIndex = financialAssetYear.length - 1;
      const startYearLilter = financialAssetYear[latestYearIndex].year - 12;
      setStartYearFinancialAssetQuarter(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng financialAssetYear không tồn tại hoặc rỗng.");
    }
  }, [financialAssetQuarter, financialAssetYear]);
  const [
    tienVaTuongDuongTien_03,
    giaTriThuanDauTuTaiSanTaiChinhNganHan_03,
    tongCacKhoanPhaiThu_03,
    hangTonKhoRong_03,
    taiSanLuuDongKhac_03,
    taiSanTaiChinhDaiHan_03,
    taiSanCoDinh_03,
    giaTriRongBatDongSanDauTu_03,
    taiSanDoDangDaiHan_03,
    taiSanDaiHanKhac_03,
    dauTuNganHan_03,
    dauTuTaiChinhNganHanYoy_03,
  ] = [
    "tienVaTuongDuongTien",
    "giaTriThuanDauTuTaiSanTaiChinhNganHan",
    "tongCacKhoanPhaiThu",
    "hangTonKhoRong",
    "taiSanLuuDongKhac",
    "taiSanTaiChinhDaiHan",
    "taiSanCoDinh",
    "giaTriRongBatDongSanDauTu",
    "taiSanDoDangDaiHan",
    "taiSanDaiHanKhac",
    "dauTuNganHan",
    "dauTuTaiChinhNganHanYoy",
  ].map((field) =>
    dataFinancialAssetQuarter?.map((asset: any) => asset[field])
  );
  // DATA CHART TÀI SẢN DỊCH VỤ TÀI CHÍNH (NĂM)
  const fourthQuarterAsset_03 = financialAssetYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearFinancialAssetQuarter
    )
    .map((asset: any) => ({
      nam: asset.year,
      dauTuDaiHan: asset.dauTuDaiHan,
      giaTriRongBatDongSanDauTu: asset.giaTriRongBatDongSanDauTu,
      giaTriThuanDauTuTaiSanTaiChinhNganHan:
        asset.giaTriThuanDauTuTaiSanTaiChinhNganHan,
      hangTonKhoRong: asset.hangTonKhoRong,
      taiSanCoDinh: asset.taiSanCoDinh,
      taiSanDaiHanKhac: asset.taiSanDaiHanKhac,
      taiSanDoDangDaiHan: asset.taiSanDoDangDaiHan,
      taiSanLuuDongKhac: asset.taiSanLuuDongKhac,
      taiSanTaiChinhDaiHan: asset.taiSanTaiChinhDaiHan,
      taiSanTaiChinhNganHan: asset.taiSanTaiChinhNganHan,
      tienVaTuongDuongTien: asset.tienVaTuongDuongTien,
      tongCacKhoanPhaiThu: asset.tongCacKhoanPhaiThu,
      dauTuNganHan: asset.dauTuNganHan,
      dauTuTaiChinhNganHanYoy: asset.dauTuTaiChinhNganHanYoy,
    }));
  const year_003 = fourthQuarterAsset_03
    ?.map((asset: any) => asset.nam)
    ?.sort((a: number, b: number) => a - b);

  const [
    dauTuDaiHanYear_03,
    tienVaTuongDuongTienYear_03,
    giaTriThuanDauTuTaiSanTaiChinhNganHanYear_03,
    hangTonKhoRongYear_03,
    tongCacKhoanPhaiThuYear_03,
    shortTermFinancialAssetYear_03,
    mobileAssetYear_03,
    longTermFinancialAssetYear_03,
    fixedAssetYear_03,
    netValueInvestmentRealEstateYear_03,
    longTermUnfinishedAssetYear_03,
    otherLongTermAssetYear_03,
    dauTuNganHanYear_03,
    dauTuTaiChinhNganHanYoyYear_03,
  ] = [
    "dauTuDaiHan",
    "tienVaTuongDuongTien",
    "giaTriThuanDauTuTaiSanTaiChinhNganHan",
    "hangTonKhoRong",
    "tongCacKhoanPhaiThu",
    "taiSanTaiChinhNganHan",
    "taiSanLuuDongKhac",
    "taiSanTaiChinhDaiHan",
    "taiSanCoDinh",
    "giaTriRongBatDongSanDauTu",
    "taiSanDoDangDaiHan",
    "taiSanDaiHanKhac",
    "dauTuNganHan",
    "dauTuTaiChinhNganHanYoy",
  ].map((field) => fourthQuarterAsset_03?.map((asset: any) => asset[field]));

  // BIỂU ĐỒ TÀI SẢN DỊCH VỤ TÀI CHÍNH
  const DATA_FINANCIAL_ASSET_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      borderRadius: 8,
      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    xAxis: {
      categories:
        financialAssetChange === "quarter"
          ? quarterFinancialAssetQuarter
          : year_003,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        financialAssetChange === "quarter"
          ? parseInt(quarterFinancialAssetQuarter?.length / 4)
          : parseInt(year_003?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },

    borderWidth: 0,
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      y: 17,
    },

    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tiền và tương đương tiền",
        data:
          financialAssetChange === "quarter"
            ? tienVaTuongDuongTien_03
            : tienVaTuongDuongTienYear_03,
        type: "column",

        color: "#0FC384",
      },
      {
        name: "Tổng các khoản phải thu",
        data:
          financialAssetChange === "quarter"
            ? tongCacKhoanPhaiThu_03
            : tongCacKhoanPhaiThuYear_03,
        type: "column",

        color: "#b37feb",
      },
      {
        name: "Giá trị thuần đầu tư tài sản tài chính ngắn hạn",
        data:
          financialAssetChange === "quarter"
            ? giaTriThuanDauTuTaiSanTaiChinhNganHan_03
            : giaTriThuanDauTuTaiSanTaiChinhNganHanYear_03,
        type: "column",
      },

      {
        name: "Tổng các khoản phải thu (Ròng)",
        data:
          assetChange === "quarter" ? hangTonKhoRong_03 : hangTonKhoRongYear_03,

        color: "#ffd666",
      },
      {
        name: "Tài sản lưu động khác",
        data:
          financialAssetChange === "quarter"
            ? taiSanLuuDongKhac_03
            : mobileAssetYear_03,
        type: "column",

        color: "#0FC384",
      },
      {
        name: "Tài sản chính dài hạn",
        data:
          financialAssetChange === "quarter"
            ? taiSanTaiChinhDaiHan_03
            : longTermFinancialAssetYear_03,
        type: "column",

        color: "#F51CDD",
      },

      {
        name: "Đầu tư dài hạn",
        data:
          financialAssetChange === "quarter"
            ? dauTuDaiHanYear_03
            : dauTuDaiHanYear_03,
        type: "column",

        color: "#ffa39e",
      },
      {
        name: "Tài sản cố định",
        data:
          financialAssetChange === "quarter"
            ? taiSanCoDinh_03
            : fixedAssetYear_03,
        type: "column",

        color: "#fadaaa",
      },
      {
        name: "Giá trị ròng bất động sản đầu tư",
        data:
          financialAssetChange === "quarter"
            ? giaTriRongBatDongSanDauTu_03
            : netValueInvestmentRealEstateYear_03,
        type: "column",

        color: "#fadaaa",
      },
      {
        name: "Tài sản dở dang dài hạn",
        data:
          financialAssetChange === "quarter"
            ? taiSanDoDangDaiHan_03
            : longTermUnfinishedAssetYear_03,
        type: "column",

        color: "blue",
      },
      {
        name: "Tài sản dài hạn khác",
        data:
          financialAssetChange === "quarter"
            ? taiSanDaiHanKhac_03
            : otherLongTermAssetYear_03,
        type: "column",

        color: "red",
      },
    ],
    credits: {
      enabled: false,
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Doanh thu thuần (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },

    // exporting: {
    //   chartOptions: {
    //     plotOptions: {
    //       series: {
    //         dataLabels: {
    //           enabled: true,
    //         },
    //       },
    //     },
    //   },
    // },
  };
  const DATA_SHORT_FINANCIAL_ASSET_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      borderRadius: 8,
      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      categories:
        shortFinancialAssetChange === "quarter"
          ? quarterFinancialAssetQuarter
          : year_003,
      tickInterval:
        shortFinancialAssetChange === "quarter"
          ? parseInt(quarterFinancialAssetQuarter?.length / 4)
          : parseInt(year_003?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Đầu tư tài chính ngắn hạn",
        data:
          shortFinancialAssetChange === "quarter"
            ? dauTuNganHan_03
            : dauTuNganHanYear_03,
        type: "column",
        yAxis: 0,
        color: "#0FC384",
      },
      {
        name: "Tăng trưởng cùng kỳ",
        data:
          shortFinancialAssetChange === "quarter"
            ? dauTuTaiChinhNganHanYoy_03
            : dauTuTaiChinhNganHanYoyYear_03,
        type: "spline",
        color: "#1900fc",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
        yAxis: 1,
        tooltip: {
          valueSuffix: "", // Ensures no suffix is added in the tooltip
        }, // Linked to the second yAxis which is now hidden
      },
    ],
  };

  // DATA CHART NGUỒN VỐN (QUÝ)
  const firstQuarterCapital = companyCapital?.slice(52, 66);
  const [quarterCompanyCapita, setQuarterCompanyCapita] = useState([]);
  const [dataQuarterCompanyCapita, setDataQuarterCompanyCapita] = useState([]);
  const [startYearCompanyCapita, setStartYearCompanyCapita] = useState();
  useEffect(() => {
    if (Array.isArray(companyCapital) && companyCapital.length > 0) {
      const convertedData = companyCapital.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(...companyCapital.map((item) => item.year));
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataQuarterCompanyCapita(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterCompanyCapita(quarterYearList);
    } else {
      console.error("companyCapital không phải là một mảng hoặc mảng rỗng.");
    }
    if (Array.isArray(companyCapitalYear) && companyCapitalYear.length > 0) {
      const latestYearIndex = companyCapitalYear.length - 1;
      const startYearLilter = companyCapitalYear[latestYearIndex].year - 12;
      setStartYearCompanyCapita(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng companyCapitalYear không tồn tại hoặc rỗng.");
    }
  }, [companyCapital, companyCapitalYear]);
  const [
    shortLoanQuarter,
    longLoanQuarter,
    capitalAndFoundationQuarter,
    interestsMinorityCommunitiesQuarter,
  ] = ["noNganHan", "noDaiHan", "vonVaCacQuy", "loiIchCuaCoDongThieuSo"].map(
    (field) => dataQuarterCompanyCapita?.map((asset: any) => asset[field])
  );

  // DATA CHART NGUỒN VỐN (NĂM)
  const fourthQuarterCapital = companyCapitalYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearCompanyCapita
    )
    .map((asset: any) => ({
      nam: asset.year,
      noNganHan: asset.noNganHan,
      noDaiHan: asset.noDaiHan,
      vonVaCacQuy: asset.vonVaCacQuy,
    }));
  const year_02 = fourthQuarterCapital?.map((asset: any) => asset.nam);
  // ?.sort((a: number, b: number) => a - b);
  const [
    shortLoanYear,
    longLoanYear,
    capitalAndFoundationYear,
    interestsMinorityCommunitiesYear,
  ] = ["noNganHan", "noDaiHan", "vonVaCacQuy", "loiIchCuaCoDongThieuSo"].map(
    (field) => fourthQuarterCapital?.map((asset: any) => asset[field])
  );

  const DATA_CAPITAL_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      borderRadius: 8,
      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    xAxis: {
      categories: capitalChange === "quarter" ? quarterCompanyCapita : year_02,
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        capitalChange === "quarter"
          ? parseInt(quarterCompanyCapita?.length / 4)
          : parseInt(year_02?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    borderWidth: 0,
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    legend: {
      navigation: {
        activeColor: "#CCC", // Arrow active color
        inactiveColor: "#444", // Arrow inactive color
        animation: true,
        buttonOptions: {
          symbolSize: 16, // Adjust arrow size
          symbol: "leftArrow", // Left arrow
          theme: {
            fill: "transparent", // Transparent circle
            stroke: "rgba(255, 255, 255, 0.2)", // Circle border color
            r: 15, // Rounded corners for the circle
            states: {
              hover: {
                fill: "rgba(255, 255, 255, 0.1)", // Background on hover
              },
              select: {
                fill: "rgba(255, 255, 255, 0.2)", // Selected background
              },
            },
          },
        },
      },
      itemWidth: window.innerWidth < 1600 ? 140 : 180,
      align: "left",
      //itemWidth: window.innerWidth < 1600 ? 140 : 180,
      itemHeight: 30,
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      y: window.innerWidth < 1600 ? 17 : 23,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    credits: {
      enabled: false,
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Doanh thu thuần (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    exporting: {
      chartOptions: {
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      },
    },

    series: [
      {
        name: "Nợ ngắn hạn",
        data: capitalChange === "quarter" ? shortLoanQuarter : shortLoanYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#29DCFD',
        // },
      },
      {
        name: "Nợ dài hạn",
        data: capitalChange === "quarter" ? longLoanQuarter : longLoanYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#0FC384',
        // },
      },
      {
        name: "Vốn và các quỹ",
        data:
          capitalChange === "quarter"
            ? capitalAndFoundationQuarter
            : capitalAndFoundationYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#4064E1',
        // },
      },
      {
        name: "Lợi ích của cổ đông thiểu số",
        data:
          capitalChange === "quarter"
            ? interestsMinorityCommunitiesQuarter
            : interestsMinorityCommunitiesYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#ff4d4f',
        // },
      },
    ],
  };

  // DATA CHART NGUỒN VỐN BẢO HIỂM (QUÝ)
  const firstQuarterCapital_07 = insuranceCapitalQuarter?.slice(0, 15);
  const [quarterInsuranceCapitalQuarter, setQuarterInsuranceCapitalQuarter] =
    useState([]);
  const [dataInsuranceCapitalQuarter, setDataInsuranceCapitalQuarter] =
    useState([]);
  const [startYearInsuranceCapitalYear, setStartYearInsuranceCapitalYear] =
    useState();
  useEffect(() => {
    if (
      Array.isArray(insuranceCapitalQuarter) &&
      insuranceCapitalQuarter.length > 0
    ) {
      const convertedData = insuranceCapitalQuarter.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(
        ...insuranceCapitalQuarter.map((item) => item.year)
      );
      const startYear = latestYear - 2;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataInsuranceCapitalQuarter(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterInsuranceCapitalQuarter(quarterYearList);
    } else {
      console.error(
        "insuranceCapitalQuarter không phải là một mảng hoặc mảng rỗng."
      );
    }
    if (
      Array.isArray(insuranceCapitalYear) &&
      insuranceCapitalYear.length > 0
    ) {
      const latestYearIndex = insuranceCapitalYear.length - 1;
      const startYearLilter = insuranceCapitalYear[latestYearIndex].year - 12;
      setStartYearInsuranceCapitalYear(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng insuranceCapitalYear không tồn tại hoặc rỗng.");
    }
  }, [insuranceCapitalQuarter, insuranceCapitalYear]);
  const [shortLoanQuarter_07, longLoanQuarter_07, equityQuarter_07] = [
    "noNganHan",
    "noDaiHan",
    "vonChuSoHuu",
  ].map((field) =>
    dataInsuranceCapitalQuarter?.map((asset: any) => asset[field])
  );

  // DATA CHART NGUỒN VỐN BẢO (NĂM)
  const fourthQuarterCapital_07 = insuranceCapitalYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearInsuranceCapitalYear
    )
    .map((asset: any) => ({
      nam: asset.year,
      noNganHan: asset.noNganHan,
      noDaiHan: asset.noDaiHan,
      vonChuSoHuu: asset.vonChuSoHuu,
    }));
  const year_07 = fourthQuarterCapital_07?.map((asset: any) => asset.nam);

  // ?.sort((a: number, b: number) => a - b);
  const [shortLoanYear_07, longLoanYear_07, equityYear_07] = [
    "noNganHan",
    "noDaiHan",
    "vonChuSoHuu",
  ].map((field) => fourthQuarterCapital_07?.map((asset: any) => asset[field]));

  const DATA_CAPITAL_INSURANCE_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      width: null,

      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      y: 0,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      categories:
        capitalInsuranceChange === "quarter"
          ? quarterInsuranceCapitalQuarter
          : year_07,
      tickInterval:
        capitalInsuranceChange === "quarter"
          ? parseInt(quarterInsuranceCapitalQuarter?.length / 4)
          : parseInt(year_07?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Nợ ngắn hạn",
        type: "column",

        data:
          capitalInsuranceChange === "quarter"
            ? shortLoanQuarter_07
            : shortLoanYear_07,

        color: "#29DCFD",
      },
      {
        name: "Nợ dài hạn",
        type: "column",

        data:
          capitalInsuranceChange === "quarter"
            ? longLoanQuarter_07
            : longLoanYear_07,

        color: "#0FC384",
      },
      {
        name: "Vốn chủ sở hữu",
        type: "column",

        data:
          capitalInsuranceChange === "quarter"
            ? equityQuarter_07
            : equityYear_07,

        color: "#4064E1",
      },
    ],
  };

  // DATA CHART NGUỒN VỐN NGÂN HÀNG (QUÝ)
  const firstQuarterCapital_08 = bankCapitalQuarter?.slice(0, 15);
  const [quarterBankCapitalQuarter, setQuarterBankCapitalQuarter] = useState(
    []
  );
  const [dataBankCapitalQuarter, setDataBankCapitalQuarter] = useState([]);
  const [startYearBankCapitalQuarter, setStartYearBankCapitalQuarter] =
    useState();
  useEffect(() => {
    if (Array.isArray(bankCapitalQuarter) && bankCapitalQuarter.length > 0) {
      const convertedData = bankCapitalQuarter.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(
        ...bankCapitalQuarter.map((item) => item.year)
      );
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataBankCapitalQuarter(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterBankCapitalQuarter(quarterYearList);
    } else {
      console.error(
        "bankCapitalQuarter không phải là một mảng hoặc mảng rỗng."
      );
    }
    if (Array.isArray(bankCapitalYear) && bankCapitalYear.length > 0) {
      const latestYearIndex = bankCapitalYear.length - 1;
      const startYearLilter = bankCapitalYear[latestYearIndex].year - 12;
      setStartYearBankCapitalQuarter(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng bankCapitalYear không tồn tại hoặc rỗng.");
    }
  }, [bankCapitalQuarter, bankCapitalYear]);
  const [
    governmentDebtQuarter_08,
    moneyCreditInstitutionQuarter_08,
    customerDepositQuarter_08,
    financialInstrumentQuarter_08,
    fundingCapitalQuarter_08,
    releaseDocumentsQuarter_08,
    otherDebtsQuarter_08,
    capitalCreditInstitutionQuarter_08,
    creditInstitutionFundsQuarter_08,
    exchangeRateDifferenceQuarter_08,
    undistributedProfitQuarter_08,
    tienGuiVaVayCacToChucTinDungKhacQuarter_08,
    cacKhoanNoChinhPhuVaNHNNVietNamQuarter_08,
  ] = [
    "loiIchCuaCoDongThieuSo",
    "chenhLechDanhGiaLaiTaiSan",
    "tienGuiCuaKhacHang",
    "cacCongCuTaiChinhPhaiSinhVaCacKhoanNoTaiChinhKhac",
    "vonTaiTroUyThacDauTuCuaChinhPhuVaCacToChucTinDungKhac",
    "phatHanhGiayToCoGia",
    "cacKhoanNoKhac",
    "vonCuaToChucTinDung",
    "quyCuaToChucTinDung",
    "chenhLechTiGiaHoiDoai",
    "loiNhuanChuaPhanPhoi",
    "tienGuiVaVayCacToChucTinDungKhac",
    "cacKhoanNoChinhPhuVaNHNNVietNam",
  ].map((field) => dataBankCapitalQuarter?.map((asset: any) => asset[field]));

  // DATA CHART NGUỒN VỐN NGÂN HÀNG (NĂM)

  const fourthQuarterCapital_08 = bankCapitalYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearBankCapitalQuarter
    )
    .map((asset: any) => ({
      loiIchCuaCoDongThieuSo: asset.loiIchCuaCoDongThieuSo,
      chenhLechDanhGiaLaiTaiSan: asset.chenhLechDanhGiaLaiTaiSan,
      tienGuiCuaKhacHang: asset.tienGuiCuaKhacHang,
      cacCongCuTaiChinhPhaiSinhVaCacKhoanNoTaiChinhKhac:
        asset.cacCongCuTaiChinhPhaiSinhVaCacKhoanNoTaiChinhKhac,
      vonTaiTroUyThacDauTuCuaChinhPhuVaCacToChucTinDungKhac:
        asset.vonTaiTroUyThacDauTuCuaChinhPhuVaCacToChucTinDungKhac,
      phatHanhGiayToCoGia: asset.phatHanhGiayToCoGia,
      cacKhoanNoKhac: asset.cacKhoanNoKhac,
      vonCuaToChucTinDung: asset.vonCuaToChucTinDung,
      quyCuaToChucTinDung: asset.quyCuaToChucTinDung,
      chenhLechTiGiaHoiDoai: asset.chenhLechTiGiaHoiDoai,
      loiNhuanChuaPhanPhoi: asset.loiNhuanChuaPhanPhoi,
      nam: asset.year,
      tienGuiVaVayCacToChucTinDungKhac: asset.tienGuiVaVayCacToChucTinDungKhac,
      cacKhoanNoChinhPhuVaNHNNVietNam: asset.cacKhoanNoChinhPhuVaNHNNVietNam,
    }));
  const year_08 = fourthQuarterCapital_08?.map((asset: any) => asset.nam);
  // ?.sort((a: number, b: number) => a - b);

  const [
    governmentDebtYear_08,
    moneyCreditInstitutionYear_08,
    customerDepositYear_08,
    financialInstrumentYear_08,
    fundingCapitalYear_08,
    releaseDocumentsYear_08,
    otherDebtsYear_08,
    capitalCreditInstitutionYear_08,
    creditInstitutionFundsYear_08,
    exchangeRateDifferenceYear_08,
    undistributedProfitYear_08,
    tienGuiVaVayCacToChucTinDungKhacYear_08,
    cacKhoanNoChinhPhuVaNHNNVietNamYear_08,
  ] = [
    "loiIchCuaCoDongThieuSo",
    "chenhLechDanhGiaLaiTaiSan",
    "tienGuiCuaKhacHang",
    "cacCongCuTaiChinhPhaiSinhVaCacKhoanNoTaiChinhKhac",
    "vonTaiTroUyThacDauTuCuaChinhPhuVaCacToChucTinDungKhac",
    "phatHanhGiayToCoGia",
    "cacKhoanNoKhac",
    "vonCuaToChucTinDung",
    "quyCuaToChucTinDung",
    "chenhLechTiGiaHoiDoai",
    "loiNhuanChuaPhanPhoi",
    "tienGuiVaVayCacToChucTinDungKhac",
    "cacKhoanNoChinhPhuVaNHNNVietNam",
  ].map((field) => fourthQuarterCapital_08?.map((asset: any) => asset[field]));

  const DATA_CAPITAL_BANK_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,

      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    xAxis: {
      categories:
        capitalBankChange === "quarter" ? quarterBankCapitalQuarter : year_08,
      tickInterval:
        capitalBankChange === "quarter"
          ? parseInt(quarterBankCapitalQuarter?.length / 4)
          : parseInt(year_08?.length / 4),
      labels: {
        rotation: 0,
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },

    borderWidth: 0,
    yAxis: [
      {
        min: 0,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      itemWidth: window.innerWidth < 1600 ? 140 : 180,
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      y: 22,
    },

    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Lợi ích của cộng đồng thiểu số",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? governmentDebtQuarter_08
            : governmentDebtYear_08,

        color: "#29DCFD",
      },
      {
        name: "Chênh lệch giá lãi tài sản",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? moneyCreditInstitutionQuarter_08
            : moneyCreditInstitutionYear_08,

        color: "#0FC384",
      },
      {
        name: "Tiền gửi của khách hàng",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? customerDepositQuarter_08
            : customerDepositYear_08,

        color: "#4064E1",
      },
      {
        name: "Các công cụ tài chính phái sinh và các khoản nợ tài chính khác",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? financialInstrumentQuarter_08
            : financialInstrumentYear_08,

        color: "#ff7875",
      },
      {
        name: "Vốn tài trợ uỷ thác đầu tư của chính phủ và các tổ chức tín dụng khác",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? fundingCapitalQuarter_08
            : fundingCapitalYear_08,

        color: "#d3f261",
      },
      {
        name: "Phát hành giấy tờ có giá",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? releaseDocumentsQuarter_08
            : releaseDocumentsYear_08,

        color: "#5cdbd3",
      },
      {
        name: "Các khoản nợ khác",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? otherDebtsQuarter_08
            : otherDebtsYear_08,

        color: "#4064E1",
      },
      {
        name: "Vốn của tổ chức tín dụng",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? capitalCreditInstitutionQuarter_08
            : capitalCreditInstitutionYear_08,

        color: "#eb2f96",
      },
      {
        name: "Quỹ của tổ chức tín dụng",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? creditInstitutionFundsQuarter_08
            : creditInstitutionFundsYear_08,

        color: "#bae0ff",
      },
      {
        name: "Chênh lệch tỷ giá hối đoái",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? exchangeRateDifferenceQuarter_08
            : exchangeRateDifferenceYear_08,

        color: "#4064E1",
      },
      {
        name: "Lợi nhuận chưa phân phối",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? undistributedProfitQuarter_08
            : undistributedProfitYear_08,

        color: "#85a5ff",
      },
      {
        name: "Tiền gửi và vay các tổ chức tín dụng khác",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? tienGuiVaVayCacToChucTinDungKhacQuarter_08
            : tienGuiVaVayCacToChucTinDungKhacYear_08,

        color: "#85a5ff",
      },
      {
        name: "Các khoản nợ chính phủ và NHNN Việt Nam",
        type: "column",

        data:
          capitalBankChange === "quarter"
            ? cacKhoanNoChinhPhuVaNHNNVietNamQuarter_08
            : cacKhoanNoChinhPhuVaNHNNVietNamYear_08,

        color: "#85a5ff",
      },
    ],
    credits: {
      enabled: false,
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Doanh thu thuần (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },

    // exporting: {
    //   chartOptions: {
    //     plotOptions: {
    //       series: {
    //         dataLabels: {
    //           enabled: true,
    //         },
    //       },
    //     },
    //   },
    // },
  };

  // DATA CHART NGUỒN VỐN DỊCH VỤ TÀI CHÍNH (QUÝ)
  const firstQuarterCapital_09 = financialCapitalQuarter?.slice(53, 67);
  const [quarterFinancialCapitalQuarter, setQuarterFinancialCapitalQuarter] =
    useState([]);
  const [dataFinancialCapitalQuarter, setDataFinancialCapitalQuarter] =
    useState([]);
  const [
    startYearFinancialCapitalQuarter,
    setStartYearFinancialCapitalQuarter,
  ] = useState();
  useEffect(() => {
    if (
      Array.isArray(financialCapitalQuarter) &&
      financialCapitalQuarter.length > 0
    ) {
      const convertedData = financialCapitalQuarter.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(
        ...financialCapitalQuarter.map((item) => item.year)
      );
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataFinancialCapitalQuarter(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterFinancialCapitalQuarter(quarterYearList);
    } else {
      console.error(
        "financialCapitalQuarter không phải là một mảng hoặc mảng rỗng."
      );
    }
    if (
      Array.isArray(financialCapitalYear) &&
      financialCapitalYear.length > 0
    ) {
      const latestYearIndex = financialCapitalYear.length - 1;
      const startYearLilter = financialCapitalYear[latestYearIndex].year - 12;
      setStartYearFinancialCapitalQuarter(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng financialCapitalYear không tồn tại hoặc rỗng.");
    }
  }, [financialCapitalQuarter, financialCapitalYear]);
  const [
    shortLoanQuarter_09,
    longLoanQuarter_09,
    capitalAndReserveQuarter_09,
    interestMinorityShareholderQuarter_09,
  ] = ["noNganHan", "noDaiHan", "vonVaCacQuy", "loiIchCuaCoDongThieuSo"].map(
    (field) => dataFinancialCapitalQuarter?.map((asset: any) => asset[field])
  );

  // DATA CHART NGUỒN VỐN DỊCH VỤ TÀI CHÍNH (NĂM)
  const fourthQuarterCapital_09 = financialCapitalYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearFinancialCapitalQuarter
    )
    .map((asset: any) => ({
      noNganHan: asset.noNganHan,
      noDaiHan: asset.noDaiHan,
      vonChuSoHuu: asset.vonChuSoHuu,
    }));
  const year_09 = fourthQuarterCapital_09
    ?.map((asset: any) => asset.nam)
    ?.sort((a: number, b: number) => a - b);
  const [
    shortLoanYear_09,
    longLoanYear_09,
    capitalAndReserveYear_09,
    interestMinorityShareholderYear_09,
  ] = ["noNganHan", "noDaiHan", "vonVaCacQuy", "loiIchCuaCoDongThieuSo"].map(
    (field) => fourthQuarterCapital_09?.map((asset: any) => asset[field])
  );

  const DATA_CAPITAL_FINANCIAL_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      borderRadius: 8,
      width: null,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      itemWidth: 110,
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      y: -2,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        capitalFinancialChange === "quarter"
          ? quarterFinancialCapitalQuarter
          : year_09,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        capitalFinancialChange === "quarter"
          ? parseInt(quarterFinancialCapitalQuarter?.length / 4)
          : parseInt(year_09?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Nợ ngắn hạn",
        data:
          capitalFinancialChange === "quarter"
            ? shortLoanQuarter_09
            : shortLoanYear_09,
        type: "column",
      },
      {
        name: "Nợ dài hạn",
        data:
          capitalFinancialChange === "quarter"
            ? longLoanQuarter_09
            : longLoanYear_09,
        type: "column",
      },
      {
        name: "Vốn và các quỹ",
        data:
          capitalFinancialChange === "quarter"
            ? capitalAndReserveQuarter_09
            : capitalAndReserveYear_09,
        type: "column",
      },
      // {
      //   name: 'Lợi ích của cộng đồng thiểu số',
      //   data:
      //     capitalBankChange === 'quarter'
      //       ? interestMinorityShareholderQuarter_09
      //       : interestMinorityShareholderYear_09,
      //   type: 'column',
      // },
    ],
  };

  // DATA CHART LƯU CHUYỂN TIỀN TỆ (QUÝ)
  const firstQuarterCashFlow = companyCashFlow?.slice(40, 54);
  const [quarterCompanyCashFlow, setQuarterCompanyCashFlow] = useState([]);
  const [dataCompanyCashFlow, setDataCompanyCashFlow] = useState([]);
  const [startYearCompanyCashFlow, setStartYearCompanyCashFlow] = useState();
  useEffect(() => {
    if (Array.isArray(companyCashFlow) && companyCashFlow.length > 0) {
      const convertedData = companyCashFlow.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(...companyCashFlow.map((item) => item.year));
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataCompanyCashFlow(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterCompanyCashFlow(quarterYearList);
    } else {
      console.error("companyCashFlow không phải là một mảng hoặc mảng rỗng.");
    }
    if (Array.isArray(companyCashFlowYear) && companyCashFlowYear.length > 0) {
      const latestYearIndex = companyCashFlowYear.length - 1;
      const startYearLilter = companyCashFlowYear[latestYearIndex].year - 12;
      setStartYearCompanyCashFlow(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng companyCashFlowYear không tồn tại hoặc rỗng.");
    }
  }, [companyCashFlow, companyCashFlowYear]);
  const [investQuarter, businessQuarter, financeQuarter, moneyAndAssetQuarter] =
    [
      "LCTTTuHoatDongDauTu",
      "LCTTTuHoatDongKinhDoanh",
      "LCTTTuaHoatDongTaiChinh",
      "tienVaTuongDuongCuoiKi",
    ].map((field) => dataCompanyCashFlow?.map((asset: any) => asset[field]));

  // DATA CHART LƯU CHUYỂN TIỀN TỆ (NẮM);
  const fourthQuarterCashFlow = companyCashFlowYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearCompanyCashFlow
    )
    .map((asset: any) => ({
      nam: asset.year,
      dauTu: asset.LCTTTuHoatDongDauTu,
      kinhDoanh: asset.LCTTTuHoatDongKinhDoanh,
      taiChinh: asset.LCTTTuaHoatDongTaiChinh,
      tienVaTuongDuongCuoiKi: asset.tienVaTuongDuongCuoiKi,
    }));
  const year_03 = fourthQuarterCashFlow?.map((asset: any) => asset.nam);
  // ?.sort((a: number, b: number) => a - b);
  const [investYear, businessYear, financeYear, moneyAndAssetYear] = [
    "dauTu",
    "kinhDoanh",
    "taiChinh",
    "tienVaTuongDuongCuoiKi",
  ].map((field) => fourthQuarterCashFlow?.map((asset: any) => asset[field]));

  const DATA_CASH_FLOW_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      marginTop: 24,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      width: null,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Doanh thu thuần (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      tickInterval:
        cashFlowChange === "quarter"
          ? parseInt(quarterCompanyCashFlow?.length / 6)
          : parseInt(year_03?.length / 6),
      categories:
        cashFlowChange === "quarter" ? quarterCompanyCashFlow : year_03,
      color: screenMode === "dark" ? "rgba(255, 255, 255, 0.5)" : "#fff",
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Hoạt động đầu tư",
        type: "column",
        stack: "one",
        data: cashFlowChange === "quarter" ? investQuarter : investYear,
        emphasis: emphasisStyle,
        itemStyle: {
          color: "#29DCFD",
        },
      },
      {
        name: "Hoạt động kinh doanh",
        type: "column",

        stack: "one",
        emphasis: emphasisStyle,
        data: cashFlowChange === "quarter" ? businessQuarter : businessYear,
        itemStyle: {
          color: "#0FC384",
        },
      },
      {
        name: "Hoạt động tài chính",
        type: "column",

        stack: "one",
        emphasis: emphasisStyle,
        data: cashFlowChange === "quarter" ? financeQuarter : financeYear,
        itemStyle: {
          color: "#4064E1",
        },
      },
      {
        name: "Tiền và tương đương cuối kì",
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
        showSymbol: false,
        emphasis: emphasisStyle,
        data:
          cashFlowChange === "quarter"
            ? moneyAndAssetQuarter
            : moneyAndAssetYear,
        itemStyle: {
          color: "#F9B670",
        },
      },
    ],
  };

  // DATA CHART DOANH THU THUẦN (QUÝ)
  const firstQuarterNetRevenue = netReveNueQuater?.slice(64, 78);
  const [quarternNetReveNueQuater, setQuarterNetReveNueQuater] = useState([]);
  const [dataNetReveNueQuater, setDataNetReveNueQuater] = useState([]);
  const [startYearNetReveNueQuater, setStartYearNetReveNueQuater] = useState();
  useEffect(() => {
    if (Array.isArray(netReveNueQuater) && netReveNueQuater.length > 0) {
      const convertedData = netReveNueQuater.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(...netReveNueQuater.map((item) => item.year));
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataNetReveNueQuater(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterNetReveNueQuater(quarterYearList);
    } else {
      console.error("netReveNueQuater không phải là một mảng hoặc mảng rỗng.");
    }
    if (Array.isArray(netReveNueYear) && netReveNueYear.length > 0) {
      const latestYearIndex = netReveNueYear.length - 1;
      const startYearLilter = netReveNueYear[latestYearIndex].year - 12;
      setStartYearNetReveNueQuater(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng netReveNueYear không tồn tại hoặc rỗng.");
    }
  }, [netReveNueQuater, netReveNueYear]);
  const [firtNetRevenueQuarter, secondNetRevenueQuater, thirtNetRevenueQuater] =
    ["doanhThuThuan", "doanhThuThuanYoY", "doanhThuHoatDongTaiChinh"].map(
      (field) => dataNetReveNueQuater?.map((asset: any) => asset[field])
    );

  // DATA CHART DOANH THU THUẦN (NẮM)
  const dataReveNueEndYear = netReveNueYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearNetReveNueQuater
    )
    .map((asset: any) => ({
      nam: asset.year,
      doanhThuThuan: asset.doanhThuThuan,
      doanhThuThuanYoY: asset.doanhThuThuanYoY,
      doanhThuHoatDongTaiChinh: asset.doanhThuHoatDongTaiChinh,
    }));

  const year_04 = dataReveNueEndYear?.map((asset: any) => asset.nam);
  // ?.sort((a: number, b: number) => a - b);
  const [firtNetRevenueYear, secondNetRevenueYear, thirtNetRevenueYear] = [
    "doanhThuThuan",
    "doanhThuThuanYoY",
    "doanhThuHoatDongTaiChinh",
  ].map((field) => dataReveNueEndYear?.map((asset: any) => asset[field]));

  const DATA_NET_REVENUE_CHART = {
    chart: {
      type: "column",

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      width: null,
      marginTop: 24,
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
      y: 0,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this?.x}</b><br/>`;
        if (this.series.name === "Doanh thu thuần (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this?.y?.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        netReveNueChange === "quarter" ? quarternNetReveNueQuater : year_04,
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      tickInterval:
        netReveNueChange === "quarter"
          ? parseInt(quarternNetReveNueQuater?.length / 4)
          : parseInt(year_04?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },

    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],

    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Doanh thu thuần",
        data:
          netReveNueChange === "quarter"
            ? firtNetRevenueQuarter
            : firtNetRevenueYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#63BCDA',
        // },
      },
      {
        name: "Doanh thu thuần (YoY)",
        data:
          netReveNueChange === "quarter"
            ? secondNetRevenueQuater
            : secondNetRevenueYear,
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
        yAxis: 1, // this links the series to the second yAxis
        // ... other series options ...
      },
    ],
  };

  const DATA_NET_BANK_CHART = {
    chart: {
      type: "column",
      backgroundColor: screenMode === "dark" ? "#202127" : "#ECECEF",

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      height: 350,
      width: null,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Doanh thu thuần (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        netReveNueChange === "quarter" ? quarternNetReveNueQuater : year_04,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: 12,
        },
      },

      tickInterval:
        netReveNueChange === "quarter"
          ? parseInt(quarternNetReveNueQuater?.length / 6)
          : parseInt(year_04?.length / 6), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],

    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Doanh thu thuần",
        data:
          netReveNueChange === "quarter"
            ? firtNetRevenueQuarter
            : firtNetRevenueYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#63BCDA',
        // },
      },
      {
        name: "Doanh thu thuần (YoY)",
        data:
          netReveNueChange === "quarter"
            ? secondNetRevenueQuater
            : secondNetRevenueYear,
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
        yAxis: 1, // this links the series to the second yAxis
        // ... other series options ...
      },
    ],
  };

  const firstQuaterKetQuaKinhDoanh = ketQuaKinhDoanhQuater?.slice(56, 70);
  const [quarternKetQuaKinhDoanhQuater, setQuarterKetQuaKinhDoanhQuater] =
    useState([]);
  const [dataKetQuaKinhDoanhQuater, setDataKetQuaKinhDoanhQuater] = useState(
    []
  );
  const [startYearKetQuaKinhDoanhQuater, setStartYearKetQuaKinhDoanhQuater] =
    useState();
  useEffect(() => {
    if (
      Array.isArray(ketQuaKinhDoanhQuater) &&
      ketQuaKinhDoanhQuater.length > 0
    ) {
      const convertedData = ketQuaKinhDoanhQuater.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarterReport, item.yearReport),
      }));

      const latestYear = Math.max(
        ...ketQuaKinhDoanhQuater.map((item) => item.yearReport)
      );
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.yearReport >= startYear && item.yearReport <= latestYear;
      });
      setDataKetQuaKinhDoanhQuater(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterKetQuaKinhDoanhQuater(quarterYearList);
    } else {
      console.error(
        "ketQuaKinhDoanhQuater không phải là một mảng hoặc mảng rỗng."
      );
    }
    if (Array.isArray(ketQuaKinhDoanh) && ketQuaKinhDoanh.length > 0) {
      const latestYearIndex = ketQuaKinhDoanh.length - 1;
      const startYearLilter = ketQuaKinhDoanh[latestYearIndex].yearReport - 12;
      setStartYearKetQuaKinhDoanhQuater(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng ketQuaKinhDoanh không tồn tại hoặc rỗng.");
    }
  }, [ketQuaKinhDoanhQuater, ketQuaKinhDoanh]);
  const [
    laiTuCacTaiSanTaiChinhGhiNhanQuater,
    laiTuCacKhoanDauTuNamGiuDenNgayDaoHanQuater,
    laiTuCacKhoanChoVayVaThuQuater,
    laiTuCacTaiSanTaiChinhSanSangQuater,
    doanhThuHoatDongMoiGioiChungKhoanQuater,
    doanhThuBaoLanhPhatHanhChungKhoanQuater,
    doanhThuDaiLyPhatHanhChungKhoanQuater,
    doanhThuHoatDongTuVanDauTuChungKhoanQuater,
    doanhThuHoatDongUyThacDauGiaQuater,
    doanhThuLuuKyChungKhoanQuater,
    doanhThuHoatDongDauTuChungKhoanGopVonQuater,
    doanhThuHoatDongTuVanTaiChinhQuater,
    doanhThuKhacQuater,
    doanhThuHoatDongQuater,
    laiLoTuCongTyLienDoanhLienKetQuater,
    doanhThuHoatDongTaiChinhQuater,
    chiPhiHoatDongKinhDoanhQuater,
    chiPhiQuanLyCongTyChungKhoanQuater,
    chiPhiTaiChinhQuater,
  ] = [
    "iss115",
    "iss119",
    "iss120",
    "iss121",
    "iss42",
    "iss44",
    "iss45",
    "iss46",
    "iss48",
    "iss47",
    "iss43",
    "iss123",
    "iss50",
    "isa1",
    "isa102",
    "iss141",
    "isa4",
    "iss146",
    "isa10",
  ].map((field) =>
    dataKetQuaKinhDoanhQuater?.map((asset: any) => asset[field])
  );
  const dataKetQuaKinhDoanh = ketQuaKinhDoanh
    ?.filter(
      (asset: any) =>
        asset.quarterReport === 5 &&
        asset.yearReport >= startYearKetQuaKinhDoanhQuater
    )
    .map((asset: any) => ({
      nam: asset.yearReport,
      laiTuCacTaiSanTaiChinhGhiNhan: asset.iss115,
      laiTuCacKhoanDauTuNamGiuDenNgayDaoHan: asset.iss119,
      laiTuCacKhoanChoVayVaThu: asset.iss120,
      laiTuCacTaiSanTaiChinhSanSang: asset.iss121,
      doanhThuHoatDongMoiGioiChungKhoan: asset.iss42,
      doanhThuBaoLanhPhatHanhChungKhoan: asset.iss44,
      doanhThuDaiLyPhatHanhChungKhoan: asset.iss45,
      doanhThuHoatDongTuVanDauTuChungKhoan: asset.iss46,
      doanhThuHoatDongUyThacDauGia: asset.iss48,
      doanhThuLuuKyChungKhoan: asset.iss47,
      doanhThuHoatDongDauTuChungKhoanGopVon: asset.iss43,
      doanhThuHoatDongTuVanTaiChinh: asset.iss123,
      doanhThuKhac: asset.iss50,
      doanhThuHoatDong: asset.isa1,
      doanhThuHoatDongTaiChinh: asset.iss141,
      laiLoTuCongTyLienDoanhLienKet: asset.isa102,
      chiPhiHoatDongKinhDoanh: asset.isa4,
      chiPhiTaiChinh: asset.iss146,
      chiPhiQuanLyCongTyChungKhoan: asset.isa10,
    }));
  const year1_doanhthu = dataKetQuaKinhDoanh?.map((asset: any) => asset.nam);
  const [
    laiTuCacTaiSanTaiChinhGhiNhan,
    laiTuCacKhoanDauTuNamGiuDenNgayDaoHan,
    laiTuCacKhoanChoVayVaThu,
    laiTuCacTaiSanTaiChinhSanSang,
    doanhThuHoatDongMoiGioiChungKhoan,
    doanhThuBaoLanhPhatHanhChungKhoan,
    doanhThuDaiLyPhatHanhChungKhoan,
    doanhThuHoatDongTuVanDauTuChungKhoan,
    doanhThuHoatDongUyThacDauGia,
    doanhThuLuuKyChungKhoan,
    doanhThuHoatDongDauTuChungKhoanGopVon,
    doanhThuHoatDongTuVanTaiChinh,
    doanhThuKhac,
    chiPhiHoatDongKinhDoanh,
    chiPhiQuanLyCongTyChungKhoan,
    chiPhiTaiChinh,
  ] = [
    "laiTuCacTaiSanTaiChinhGhiNhan",
    "laiTuCacKhoanDauTuNamGiuDenNgayDaoHan",
    "laiTuCacKhoanChoVayVaThu",
    "laiTuCacTaiSanTaiChinhSanSang",
    "doanhThuHoatDongMoiGioiChungKhoan",
    "doanhThuBaoLanhPhatHanhChungKhoan",
    "doanhThuDaiLyPhatHanhChungKhoan",
    "doanhThuHoatDongTuVanDauTuChungKhoan",
    "doanhThuHoatDongUyThacDauGia",
    "doanhThuLuuKyChungKhoan",
    "doanhThuHoatDongDauTuChungKhoanGopVon",
    "doanhThuHoatDongTuVanTaiChinh",
    "doanhThuKhac",
    "chiPhiHoatDongKinhDoanh",
    "chiPhiQuanLyCongTyChungKhoan",
    "chiPhiTaiChinh",
  ].map((field) => dataKetQuaKinhDoanh?.map((asset: any) => asset[field]));

  const DATA_SSI_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,

      width: null,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
      itemWidth: window.innerWidth < 1600 ? 140 : 180,
      y: 25,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        changeKetQuaKinhDoanh1 === "quarter"
          ? quarternKetQuaKinhDoanhQuater
          : year1_doanhthu,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        changeKetQuaKinhDoanh1 === "quarter"
          ? parseInt(quarternKetQuaKinhDoanhQuater?.length / 4)
          : parseInt(year1_doanhthu?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Lãi từ các tài chính ghi nhận thông qua lãi/lỗ (FVTPL)",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? laiTuCacTaiSanTaiChinhGhiNhanQuater
            : laiTuCacTaiSanTaiChinhGhiNhan,
        type: "column",
      },
      {
        name: "Lãi từ các khoản đầu tư nắm giữ đến ngày đáo hạn (HTM)",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? laiTuCacKhoanDauTuNamGiuDenNgayDaoHanQuater
            : laiTuCacKhoanDauTuNamGiuDenNgayDaoHan,
        type: "column",
      },
      {
        name: "Lãi từ các khoản cho vay và phải thu",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? laiTuCacKhoanChoVayVaThuQuater
            : laiTuCacKhoanChoVayVaThu,
        type: "column",
      },
      {
        name: "Lãi từ các tài sản tài chính sẵn sàng để bán (AFS)",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? laiTuCacTaiSanTaiChinhSanSangQuater
            : laiTuCacTaiSanTaiChinhSanSang,
        type: "column",
      },
      {
        name: "Doanh thu hoạt động môi giới chứng khoán",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? doanhThuHoatDongMoiGioiChungKhoanQuater
            : doanhThuHoatDongMoiGioiChungKhoan,
        type: "column",
      },
      {
        name: "Doanh thu bảo lãnh phát hành chứng khoán",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? doanhThuBaoLanhPhatHanhChungKhoanQuater
            : doanhThuBaoLanhPhatHanhChungKhoan,
        type: "column",
      },
      {
        name: "Doanh thu đại lý phát hành chứng khoán",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? doanhThuDaiLyPhatHanhChungKhoanQuater
            : doanhThuDaiLyPhatHanhChungKhoan,
        type: "column",
      },
      {
        name: "Doanh thu hoạt động uy thác, đấu giá",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? doanhThuHoatDongUyThacDauGiaQuater
            : doanhThuHoatDongUyThacDauGia,
        type: "column",
      },
      {
        name: "Doanh thu lưu ký chứng khoán",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? doanhThuLuuKyChungKhoanQuater
            : doanhThuLuuKyChungKhoan,
        type: "column",
      },
      {
        name: "Doanh thu hoạt động đầu tư chứng khoán, góp vốn",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? doanhThuHoatDongDauTuChungKhoanGopVonQuater
            : doanhThuHoatDongDauTuChungKhoanGopVon,
        type: "column",
      },
      {
        name: "Doanh thu hoạt động tư vấn tài chính",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? doanhThuHoatDongTuVanTaiChinhQuater
            : doanhThuHoatDongTuVanTaiChinh,
        type: "column",
      },
      {
        name: "Doanh thu khác",
        data:
          changeKetQuaKinhDoanh1 === "quarter"
            ? doanhThuKhacQuater
            : doanhThuKhac,
        type: "column",
      },
    ],
  };

  const [
    doanhThuHoatDong,
    doanhThuHoatDongTaiChinh,
    laiLoTuCongTyLienDoanhLienKet,
  ] = [
    "doanhThuHoatDong",
    "doanhThuHoatDongTaiChinh",
    "laiLoTuCongTyLienDoanhLienKet",
  ].map((field) => dataKetQuaKinhDoanh?.map((asset: any) => asset[field]));

  const KET_QUA_KINH_DOANH_SSI_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,

      width: null,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,
        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      itemWidth: window.innerWidth < 1600 ? 140 : 180,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        changeKetQuaKinhDoanh2 === "quarter"
          ? quarternKetQuaKinhDoanhQuater
          : year1_doanhthu,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        changeKetQuaKinhDoanh2 === "quarter"
          ? parseInt(quarternKetQuaKinhDoanhQuater?.length / 4)
          : parseInt(year1_doanhthu?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        min: 0,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Doanh thu hoạt động",
        data:
          changeKetQuaKinhDoanh2 === "quarter"
            ? doanhThuHoatDongQuater
            : doanhThuHoatDong,
        type: "column",
      },
      {
        name: "Doanh thu hoạt động tài chính",
        data:
          changeKetQuaKinhDoanh2 === "quarter"
            ? doanhThuHoatDongTaiChinhQuater
            : doanhThuHoatDongTaiChinh,
        type: "column",
      },
      {
        name: "Lãi/lỗ từ công ty liên doanh, liên kết",
        data:
          changeKetQuaKinhDoanh2 === "quarter"
            ? laiLoTuCongTyLienDoanhLienKetQuater
            : laiLoTuCongTyLienDoanhLienKet,
        type: "column",
      },
    ],
  };
  const CHI_PHI_HOAT_DONG_SSI_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      width: null,

      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      itemWidth: window.innerWidth < 1600 ? 140 : 180,
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        changeKetQuaKinhDoanh3 === "quarter"
          ? quarternKetQuaKinhDoanhQuater
          : year1_doanhthu,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        changeKetQuaKinhDoanh3 === "quarter"
          ? parseInt(quarternKetQuaKinhDoanhQuater?.length / 4)
          : parseInt(year1_doanhthu?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Chi phí hoạt động kinh doanh",
        data:
          changeKetQuaKinhDoanh3 === "quarter"
            ? chiPhiHoatDongKinhDoanhQuater
            : chiPhiHoatDongKinhDoanh,
        type: "column",
      },
      {
        name: "Chi phí quản lý công ty chứng khoán",
        data:
          changeKetQuaKinhDoanh3 === "quarter"
            ? chiPhiQuanLyCongTyChungKhoanQuater
            : chiPhiQuanLyCongTyChungKhoan,
        type: "column",
      },
      {
        name: "Chi phí tài chính",
        data:
          changeKetQuaKinhDoanh3 === "quarter"
            ? chiPhiTaiChinhQuater
            : chiPhiTaiChinh,
        type: "column",
      },
    ],
  };
  // DATA CHART CƠ CÂU LỢI NHUẬN TRƯỚC THUẾ (QUÝ)
  const firstQuarterProfitBeforeTax = profitBeforeTax?.slice(0, 15);
  const [quarterProfitBeforeTax, setQuarterProfitBeforeTax] = useState([]);
  const [dataProfitBeforeTax, setDataProfitBeforeTax] = useState([]);
  const [startYearProfitBeforeTax, setStartYearProfitBeforeTax] = useState();
  useEffect(() => {
    if (Array.isArray(profitBeforeTax) && profitBeforeTax.length > 0) {
      const convertedData = profitBeforeTax.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(...profitBeforeTax.map((item) => item.year));
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataProfitBeforeTax(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterProfitBeforeTax(quarterYearList);
    } else {
      console.error("profitBeforeTax không phải là một mảng hoặc mảng rỗng.");
    }
    if (Array.isArray(profitBeforeTaxYear) && profitBeforeTaxYear.length > 0) {
      const latestYearIndex = profitBeforeTaxYear.length - 1;
      const startYearLilter = profitBeforeTaxYear[latestYearIndex].year - 12;
      setStartYearProfitBeforeTax(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng profitBeforeTaxYear không tồn tại hoặc rỗng.");
    }
  }, [profitBeforeTax, profitBeforeTaxYear]);
  const [
    differentProfitQuarter,
    moneyAffiliatedCompaniesQuarter,
    financialProfitQuarter,
    mainProfitQuarter,
    profitBeforeTaxQuarter,
  ] = [
    "loiNhuanKhac",
    "laiLoTuCongTyLDLK",
    "loiNhuanTaiChinh",
    "loiNhuanThuanTuHDKDChinh",
    "loiNhuanTruocThueYOY",
  ].map((field) => dataProfitBeforeTax?.map((asset: any) => asset[field]));

  // DATA CHART CƠ CÂU LỢI NHUẬN TRƯỚC THUẾ (NĂM)
  const fourthQuarterProfitBeforeTax = profitBeforeTaxYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearProfitBeforeTax
    )
    .map((asset: any) => ({
      loiNhuanKhac: asset.loiNhuanKhac,
      loiNhuanThuanTuHDKDChinh: asset.loiNhuanThuanTuHDKDChinh,
      loiNhuanTaiChinh: asset.loiNhuanTaiChinh,
      loiNhuanTruocThueYOY: asset.loiNhuanTruocThueYOY,
    }));
  const year_05 = profitBeforeTaxYear?.map((asset: any) => asset.nam);
  // ?.sort((a: number, b: number) => a - b);
  const [
    differentProfitYear,
    moneyAffiliatedCompaniesYear,
    financialProfitYear,
    mainProfitYear,
    profitBeforeTaxYears,
  ] = [
    "loiNhuanKhac",
    "laiLoTuCongTyLDLK",
    "loiNhuanTaiChinh",
    "loiNhuanThuanTuHDKDChinh",
    "loiNhuanTruocThueYOY",
  ].map((field) =>
    fourthQuarterProfitBeforeTax?.map((asset: any) => asset[field])
  );

  const DATA_PROFIT_BEFORE_TAX_CHART = {
    chart: {
      type: "column",
      backgroundColor: screenMode === "dark" ? "#202127" : "#ECECEF",

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      width: null,
      height: 350,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumber(value)}</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
        },
      },
      categories:
        profitBeforeTaxChange === "quarter" ? quarterProfitBeforeTax : year_05,

      lineWidth: 0,
      tickWidth: 0,

      gridLineWidth: 0,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    yAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
        },
      },
      title: {
        text: null, // Loại bỏ tiêu đề "Values" trên trục y
      },
      axisLabel: {
        formatter: function (value: number) {
          if (value > 1000000000) {
            return value / 1000000000 + " tỷ";
          }
          if (value < -1000000000) {
            return value / 1000000000 + " tỷ";
          }
          if (value === 0) return 0;
        },
      },
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash",
      splitLine: {
        lineStyle: {
          color:
            screenMode === "dark"
              ? "rgba(58, 63, 66, 0.5)"
              : "rgba(208, 210, 216, 1)", // làm mờ màu của splitLine
          dashStyle: "ShortDash", // đặt dashStyle thành dấu chấm
        },
      },
      crosshair: {
        dashStyle: "dash",
        width: 1,
        color: "gray",
        zIndex: 5,
      },
    },
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Lãi lỗ từ công ty LDLK",
        data:
          profitBeforeTaxChange === "quarter"
            ? differentProfitQuarter
            : differentProfitYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#d4380d',
        // },
      },
      {
        name: "Lợi nhuận khác",
        data:
          profitBeforeTaxChange === "quarter"
            ? moneyAffiliatedCompaniesQuarter
            : moneyAffiliatedCompaniesYear,
        // type: 'bar',
        // stack: 'one',
        // itemStyle: {
        //   color: '#FBE81A',
        // },
      },
      {
        name: "Lợi nhuận từ HĐKD chính",
        data:
          profitBeforeTaxChange === "quarter"
            ? financialProfitQuarter
            : financialProfitYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#4064E1',
        // },
      },
      {
        name: "Lợi nhuận tài chính",
        data:
          profitBeforeTaxChange === "quarter"
            ? mainProfitQuarter
            : mainProfitYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#d3f261',
        // },
      },
      {
        name: "Lợi nhuận tài chính",
        data:
          profitBeforeTaxChange === "quarter"
            ? profitBeforeTaxQuarter
            : profitBeforeTaxYears,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#d3f261',
        // },
      },
    ],
  };

  // DATA CHART CƠ CÂU LỢI NHUẬN SAU THUẾ (QUÝ)
  const firstQuarterProfitAfterTax = profitAfterTax?.slice(34, 48);
  const [quarternProfitAfterTax, setQuarterProfitAfterTax] = useState([]);
  const [dataProfitAfterTax, setDataProfitAfterTax] = useState([]);
  const [startYearProfitAfterTax, setStartYearProfitAfterTax] = useState();
  useEffect(() => {
    if (Array.isArray(profitAfterTax) && profitAfterTax.length > 0) {
      const convertedData = profitAfterTax.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarter, item.year),
      }));

      const latestYear = Math.max(...profitAfterTax.map((item) => item.year));
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.year >= startYear && item.year <= latestYear;
      });
      setDataProfitAfterTax(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterProfitAfterTax(quarterYearList);
    } else {
      console.error("profitAfterTax không phải là một mảng hoặc mảng rỗng.");
    }
    if (Array.isArray(profitAfterTaxYear) && profitAfterTaxYear.length > 0) {
      const latestYearIndex = profitAfterTaxYear.length - 1;
      const startYearLilter = profitAfterTaxYear[latestYearIndex].year - 12;
      setStartYearProfitAfterTax(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng profitAfterTaxYear không tồn tại hoặc rỗng.");
    }
  }, [profitAfterTax, profitAfterTaxYear]);
  const [
    profitAfterTaxQuarter,
    profitAfterTaxYoYQuarter,
    thuNhapLaiQuarter,
    thuNhapLaiYoYQuarter,
    loiNhuanSauThueChuSoHuuQuarter,
    loiNhuanSauThueChuSoHuuYOYQuarter,
    doanhThuPhiBaoHiemQuarter,
    doanhThuPhiBaoHiemYoyQuarter,
  ] = [
    "loiNhuanSauThue",
    "loiNhuanSauThueYOY",
    "thuNhapLaiVaCacKhoanTuongTu",
    "thuNhapLaiVaCacKhoanTuongTuYoy",
    "loiNhuanSauThueChuSoHuu",
    "loiNhuanSauThueChuSoHuuYOY",
    "doanhThuPhiBaoHiem",
    "doanhThuPhiBaoHiemYoy",
  ].map((field) => dataProfitAfterTax?.map((asset: any) => asset[field]));

  // DATA CHART CƠ CÂU LỢI NHUẬN SAU THUẾ (NĂM)
  const fourthQuarterProfitAfterTax = profitAfterTaxYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearProfitAfterTax
    )
    .map((asset: any) => ({
      nam: asset.year,
      loiNhuanSauThue: asset.loiNhuanSauThue,
      loiNhuanSauThueYOY: asset.loiNhuanSauThueYOY,
      thuNhapLaiVaCacKhoanTuongTu: asset.thuNhapLaiVaCacKhoanTuongTu,
      thuNhapLaiVaCacKhoanTuongTuYoy: asset.thuNhapLaiVaCacKhoanTuongTuYoy,
      loiNhuanSauThueChuSoHuu: asset.loiNhuanSauThueChuSoHuu,
      loiNhuanSauThueChuSoHuuYOY: asset.loiNhuanSauThueChuSoHuuYOY,
      doanhThuPhiBaoHiem: asset.doanhThuPhiBaoHiem,
      doanhThuPhiBaoHiemYoy: asset.doanhThuPhiBaoHiemYoy,
    }));
  const year_06 = fourthQuarterProfitAfterTax?.map((asset: any) => asset.nam);
  // ?.sort((a: number, b: number) => a - b);
  const [
    profitTaxYear,
    profitAfterTaxYoYYear,
    thuNhapLaiYear,
    thuNhapLaiYOYYear,
    loiNhuanSauThueChuSoHuuYear,
    loiNhuanSauThueChuSoHuuYOYYear,
    doanhThuPhiBaoHiemYear,
    doanhThuPhiBaoHiemYoyYear,
  ] = [
    "loiNhuanSauThue",
    "loiNhuanSauThueYOY",
    "thuNhapLaiVaCacKhoanTuongTu",
    "thuNhapLaiVaCacKhoanTuongTuYoy",
    "loiNhuanSauThueChuSoHuu",
    "loiNhuanSauThueChuSoHuuYOY",
    "doanhThuPhiBaoHiem",
    "doanhThuPhiBaoHiemYoy",
  ].map((field) =>
    fourthQuarterProfitAfterTax?.map((asset: any) => asset[field])
  );

  const DATA_PROFIT_AFTER_TAX_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      marginTop: 24,
      borderRadius: 8,
      width: null,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,
        lineHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 43,

      minWidth: 500,
      y: 0,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Lợi nhuận sau thuế (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        profitAfterTaxChange === "quarter" ? quarternProfitAfterTax : year_06,
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        profitAfterTaxChange === "quarter"
          ? parseInt(quarternProfitAfterTax?.length / 4)
          : parseInt(year_06?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Lợi nhuận sau thuế",
        data:
          profitAfterTaxChange === "quarter"
            ? profitAfterTaxQuarter
            : profitTaxYear,
        // type: 'bar',
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#0FC684',
        // },
      },
      {
        name: "Lợi nhuận sau thuế (YoY)",
        data:
          profitAfterTaxChange === "quarter"
            ? profitAfterTaxYoYQuarter
            : profitAfterTaxYoYYear,
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },

        yAxis: 1,
      },
    ],
  };
  const DATA_INCOME_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },

      borderRadius: 8,
      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    legend: {
      itemWidth: window.innerWidth < 1600 ? 140 : 180,
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 45,
      maxWidth: 500,
      y: 0,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      categories: incomeChange === "quarter" ? quarternProfitAfterTax : year_06,
      tickInterval:
        incomeChange === "quarter"
          ? parseInt(quarternProfitAfterTax?.length / 4)
          : parseInt(year_06?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Thu nhập lãi và các khoản phải thu tương tự",
        data: incomeChange === "quarter" ? thuNhapLaiQuarter : thuNhapLaiYear,
        type: "column",

        color: "#0FC684",
      },
      {
        name: "Tăng trưởng cùng kỳ",
        data:
          incomeChange === "quarter" ? thuNhapLaiYoYQuarter : thuNhapLaiYOYYear,
        type: "spline",
        color: "#43fb00",
        marker: {
          enabled: false,
        },
        yAxis: 1,
      },
    ],
  };
  const DATA_PROFIT_AFTER_TAX_ENTERPRISE_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      width: null,

      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 37,
      maxWidth: 500,
      y: 0,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      categories:
        profitAfterTaxChangeEnterprise === "quarter"
          ? quarternProfitAfterTax
          : year_06,
      tickInterval:
        profitAfterTaxChangeEnterprise === "quarter"
          ? parseInt(quarternProfitAfterTax?.length / 4)
          : parseInt(year_06?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Lợi nhuận sau thuế thu nhập",
        data:
          profitAfterTaxChangeEnterprise === "quarter"
            ? loiNhuanSauThueChuSoHuuQuarter
            : loiNhuanSauThueChuSoHuuYear,
        type: "column",

        color: "#0FC684",
      },
      {
        name: "Tăng trưởng cùng kỳ",
        data:
          profitAfterTaxChangeEnterprise === "quarter"
            ? loiNhuanSauThueChuSoHuuYOYQuarter
            : loiNhuanSauThueChuSoHuuYOYYear,
        type: "spline",
        color: "#43fb00",
        marker: {
          enabled: false,
        },
        yAxis: 1,
      },
    ],
  };
  const DATA_INSURANCE_CHART = {
    chart: {
      type: "column",

      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,

      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      categories:
        profitInsurance === "quarter" ? quarternProfitAfterTax : year_06,
      tickInterval:
        profitInsurance === "quarter"
          ? parseInt(quarternProfitAfterTax?.length / 4)
          : parseInt(year_06?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Doanh thu phí bảo hiểm",
        data:
          profitInsurance === "quarter"
            ? doanhThuPhiBaoHiemQuarter
            : doanhThuPhiBaoHiemYear,
        type: "column",

        color: "#0FC684",
      },
      {
        name: "Tăng trưởng cùng kỳ",
        data:
          profitInsurance === "quarter"
            ? doanhThuPhiBaoHiemYoyQuarter
            : doanhThuPhiBaoHiemYoyYear,
        type: "spline",
        color: "#43fb00",
        marker: {
          enabled: false,
        },
        yAxis: 1,
      },
    ],
  };
  const firstQuarterProfitAfterTaxBank = profitAfterTax?.slice(34, 48);

  const [profitAfterTaxBankQuarter, profitAfterTaxYoYBankQuarter] = [
    "loiNhuanSauThue",
    "loiNhuanSauThueYOY",
  ].map((field) => dataProfitAfterTax?.map((asset: any) => asset[field]));

  // DATA CHART CƠ CÂU LỢI NHUẬN SAU THUẾ (NĂM)
  const fourthQuarterProfitAfterBankTax = profitAfterTaxYear
    ?.filter(
      (asset: any) =>
        asset.quarter === 5 && asset.year >= startYearProfitAfterTax
    )
    .map((asset: any) => ({
      nam: asset.year,
      loiNhuanSauThue: asset.loiNhuanSauThue,
      loiNhuanSauThueYOY: asset.loiNhuanSauThueYOY,
    }));
  const year_06Bank = fourthQuarterProfitAfterBankTax?.map(
    (asset: any) => asset.nam
  );
  // ?.sort((a: number, b: number) => a - b);
  const [profitTaxYearBank, profitAfterTaxYoYYearBank] = [
    "loiNhuanSauThue",
    "loiNhuanSauThueYOY",
  ].map((field) =>
    fourthQuarterProfitAfterBankTax?.map((asset: any) => asset[field])
  );

  const DATA_PROFIT_AFTER_TAX_BANK_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,

      width: null,
      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Lợi nhuận sau thuế (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        profitAfterTaxBankChange === "quarter"
          ? quarternProfitAfterTax
          : year_06Bank,
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        profitAfterTaxBankChange === "quarter"
          ? parseInt(quarternProfitAfterTax?.length / 4)
          : parseInt(year_06Bank?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Lợi nhuận sau thuế",
        data:
          profitAfterTaxBankChange === "quarter"
            ? profitAfterTaxBankQuarter
            : profitTaxYearBank,
        type: "column",
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#0FC684',
        // },
      },
      {
        name: "Lợi nhuận sau thuế (YoY)",
        data:
          profitAfterTaxBankChange === "quarter"
            ? profitAfterTaxYoYBankQuarter
            : profitAfterTaxYoYYearBank,
        type: "spline",
        color: "#43fb00",
        marker: {
          enabled: false,
        },
        yAxis: 1,
      },
    ],
  };
  const firstQuarterRiskProvisionCostsBank = riskProvisionCostsQuarter?.slice(
    34,
    48
  );
  const [
    quarternRiskProvisionCostsQuarter,
    setQuarterRiskProvisionCostsQuarter,
  ] = useState([]);
  const [dataRiskProvisionCostsQuarter, setDataRiskProvisionCostsQuarter] =
    useState([]);
  const [
    startYearRiskProvisionCostsQuarter,
    setStartYearRiskProvisionCostsQuarter,
  ] = useState();
  useEffect(() => {
    if (
      Array.isArray(riskProvisionCostsQuarter) &&
      riskProvisionCostsQuarter.length > 0
    ) {
      const convertedData = riskProvisionCostsQuarter.map((item) => ({
        ...item,
        quarterYear: formatQuarterYear(item.quarterReport, item.yearReport),
      }));

      const latestYear = Math.max(
        ...riskProvisionCostsQuarter.map((item) => item.yearReport)
      );
      const startYear = latestYear - 3;

      const filteredData = convertedData.filter((item) => {
        return item.yearReport >= startYear && item.yearReport <= latestYear;
      });
      setDataRiskProvisionCostsQuarter(filteredData);

      const quarterYearList = filteredData.map((item) => item.quarterYear);
      setQuarterRiskProvisionCostsQuarter(quarterYearList);
    } else {
      console.error(
        "riskProvisionCostsQuarter không phải là một mảng hoặc mảng rỗng."
      );
    }
    if (
      Array.isArray(riskProvisionCostsYear) &&
      riskProvisionCostsYear.length > 0
    ) {
      const latestYearIndex = riskProvisionCostsYear.length - 1;
      const startYearLilter =
        riskProvisionCostsYear[latestYearIndex].yearReport - 12;
      setStartYearRiskProvisionCostsQuarter(startYearLilter);
      // Tiếp tục xử lý dữ liệu
    } else {
      console.error("Mảng riskProvisionCostsYear không tồn tại hoặc rỗng.");
    }
  }, [riskProvisionCostsQuarter, riskProvisionCostsYear]);
  const [profitRiskProvisionCostsQuarter] = ["isb41"].map((field) =>
    dataRiskProvisionCostsQuarter?.map((asset: any) => asset[field])
  );

  // DATA CHART CƠ CÂU LỢI NHUẬN SAU THUẾ (NĂM)
  const fourthQuarterChiPhiDuPhongBankTax = riskProvisionCostsYear
    ?.filter(
      (asset: any) =>
        asset.quarterReport === 5 &&
        asset.yearReport >= startYearRiskProvisionCostsQuarter
    )
    .map((asset: any) => ({
      nam: asset.yearReport,
      chiPhiDuPhong: asset.isb41,
    }));

  const year_07Bank = fourthQuarterChiPhiDuPhongBankTax?.map(
    (asset: any) => asset.nam
  );
  // ?.sort((a: number, b: number) => a - b);
  const [chiPhiDuPhongYearBank] = ["chiPhiDuPhong"].map((field) =>
    fourthQuarterChiPhiDuPhongBankTax?.map((asset: any) => asset[field])
  );

  const DATA_RISK_PROVISION_COSTS_BANK_CHART = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      width: null,

      marginTop: 24,
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Lợi nhuận sau thuế (YoY)") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumberTooltip(value)} VND</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
        },
      },
      categories:
        chiPhiDuPhong === "quarter"
          ? quarternRiskProvisionCostsQuarter
          : year_07Bank,
      tickInterval:
        chiPhiDuPhong === "quarter"
          ? parseInt(quarternRiskProvisionCostsQuarter?.length / 4)
          : parseInt(year_07Bank?.length / 4),
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Chi phí dự phòng rủi ro tín dụng",
        data:
          chiPhiDuPhong === "quarter"
            ? profitRiskProvisionCostsQuarter
            : chiPhiDuPhongYearBank,
        type: "column",
        // stack: 'one',
        // emphasis: emphasisStyle,
        // itemStyle: {
        //   color: '#0FC684',
        // },
      },
    ],
  };

  useEffect(() => {
    if (check === true) {
      if (dayStart === null || dayEnd === null) {
        setDataStatistic([]);
        setCurrent(1);
        setPageSize(10);
        setTotal(0);
        setCheck(false);
        return;
      }
      // Chỉ số chung công ty
      // axios
      //   .get(
      //     `${config.app.VITE_APP_API_URL}/statistics/company/stock-price?symbol=${company}&page=${current}&pageSize=${pageSize}&fromDate=${dayStart}&toDate=${dayEnd}`
      //   )
      //   .then((res) => {
      //     setDataStatistic(res?.data?.data);
      //     setCurrent(res?.data?.paging?.page);
      //     setPageSize(res?.data?.paging?.pageSize);
      //     setTotal(res?.data?.paging?.total);
      //   })
      //   .catch((error) => {
      //     console.error('Error fetching data: ', error);
      //   });
    } else {
      return;
    }
  }, [check, dayStart, dayEnd, current, pageSize, total, company]);

  const originalArray = (allCompanySub && [...allCompanySub]) || [];

  const subCompany =
    originalArray && originalArray.filter((item) => item.roleId === "11");
  const associatedCompany = originalArray.filter(
    (item) => item.roleId === "14"
  );

  const newSubCompany =
    subCompany &&
    subCompany.map((item) => ({
      childCompanyName: item.childCompanyName,
      charterCapital: formatToBillion(item.charterCapital),
      percentage: item.percentage,
    }));

  const newAssociatedCompany =
    associatedCompany &&
    associatedCompany.map((item) => ({
      childSymbol: item.childSymbol,
      childCompanyName: item.childCompanyName,
      charterCapital: formatToBillion(item.charterCapital),
      percentage: item.percentage,
    }));

  const newArray_01 = [
    "symbol",
    "marketCap",
    "sharesOutstanding",
    "totalRevenue",
    "profit",
    "asset",
  ].map((key) => {
    const value = generalIndex && generalIndex[key];

    if (["marketCap", "totalRevenue", "profit", "asset"].includes(key)) {
      return isNaN(value) ? value : formatToBillion(value);
    }
    return isNaN(value)
      ? value
      : parseInt(String(value)).toLocaleString("de-DE");
  });

  const newArray_02 = [
    "ryd21",
    "ryd25",
    "ryd26",
    "ryd14",
    "ryq14",
    "ryq12",
  ].map((key) => {
    const value = businessPlan && businessPlan[key];
    if (isNaN(value)) {
      return value;
    } else {
      let result = Number(Number(value)?.toFixed(2)).toLocaleString();
      if (["ryq14", "ryq12"].includes(key)) {
        result += "%";
      }
      return result;
    }
  });

  const [profitMargin, profitMargin1, profitMargin2] = [
    "ryq25",
    "ryq27",
    "ryq29",
  ].map((field) => dataNewChart?.map((asset: any) => asset.value[field]));

  const [profitMarginSince, profitMargin1Since, profitMargin2Since] = [
    "ryq25",
    "ryq27",
    "ryq29",
  ].map((field) => dataYearChartNew?.map((asset: any) => asset.value[field]));

  const PROFIT_MARGIN = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      width: null,

      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      itemWidth: 100,
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
      y: 0,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (
          this.series.name === "Biên lãi gộp" ||
          this.series.name === "Biên lãi EBIT" ||
          this.series.name === "Biên lãi sau thuế"
        ) {
          tooltipContent += `${this.series.name}: <b>${(this.y * 100).toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumber(value)}</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        changeProfitMargin === "quarter"
          ? quarterDataNewChart
          : startYearSinceChart,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        changeProfitMargin === "quarter"
          ? parseInt(quarterDataNewChart?.length / 4)
          : parseInt(startYearSinceChart?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Biên lãi gộp",
        data:
          changeProfitMargin === "quarter" ? profitMargin : profitMarginSince,
        yAxis: 1, // Linked to the second yAxis which is now hidden
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
      },

      {
        name: "Biên lãi EBIT",
        data:
          changeProfitMargin === "quarter" ? profitMargin1 : profitMargin1Since,
        yAxis: 1, // Linked to the second yAxis which is now hidden
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
      },
      {
        name: "Biên lãi sau thuế",
        data:
          changeProfitMargin === "quarter" ? profitMargin2 : profitMargin2Since,
        yAxis: 1, // Linked to the second yAxis which is now hidden
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
      },
    ],
  };
  const [debt, debt1] = ["ryq6", "ryq10"].map((field) =>
    dataNewChart?.map((asset: any) => asset.value[field])
  );
  const [debtSince, debt1Since] = ["ryq6", "ryq10"].map((field) =>
    dataYearChartNew?.map((asset: any) => {
      return asset.value[field];
    })
  );

  const EQUITY_DEBT = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,
      width: null,

      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
      y: 0,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        // Giả sử mọi dữ liệu trong series này đều được hiển thị dưới dạng phần trăm
        tooltipContent += `${this.series.name}: <b>${(this.y * 100).toFixed(2)}%</b>`;
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },

    xAxis: {
      categories:
        debtRatioChange === "quarter"
          ? quarterDataNewChart
          : startYearSinceChart,
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        debtRatioChange === "quarter"
          ? parseInt(quarterDataNewChart?.length / 4)
          : parseInt(startYearSinceChart?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "Vay tài chính/Vốn chủ sở hữu",
        data: debtRatioChange === "quarter" ? debt : debtSince,
        yAxis: 1, // Linked to the second yAxis which is now hidden
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
      },

      {
        name: "Nợ/Vốn chủ sở hữu",
        data: debtRatioChange === "quarter" ? debt1 : debt1Since,
        yAxis: 1, // Linked to the second yAxis which is now hidden
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
      },
    ],
  };

  const [valuation] = ["ryd21"].map((field) =>
    dataNewChart?.map((asset: any) => asset.value[field])
  );
  const [valuationSince] = ["ryd21"].map((field) =>
    dataYearChartNew?.map((asset: any) => asset.value[field])
  );
  const VALUATION = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,

      width: null,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumber(value)}</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        valuationChange === "quarter"
          ? quarterDataNewChart
          : startYearSinceChart,
      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        valuationChange === "quarter"
          ? parseInt(quarterDataNewChart?.length / 4)
          : parseInt(startYearSinceChart?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "P/E",
        data: valuationChange === "quarter" ? valuation : valuationSince,
        //  yAxis: 1, // Linked to the second yAxis which is now hidden
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
      },
    ],
  };
  const [valuationPB] = ["ryd25"].map((field) =>
    dataNewChart?.map((asset: any) => asset.value[field])
  );
  const [valuationPBSince] = ["ryd25"].map((field) =>
    dataYearChartNew?.map((asset: any) => asset.value[field])
  );

  const VALUATIONPB = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,

      width: null,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;
        if (this.series.name === "Tăng trưởng cùng kỳ") {
          tooltipContent += `${this.series.name}: <b>${this.y.toFixed(2)}%</b>`;
        } else {
          // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
          const value = this.y;

          tooltipContent += `${this.series.name}: <b>${ConvertNumber(value)}</b>`;
        }
        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        valuationPBChange === "quarter"
          ? quarterDataNewChart
          : startYearSinceChart,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        valuationPBChange === "quarter"
          ? parseInt(quarterDataNewChart?.length / 4)
          : parseInt(startYearSinceChart?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "P/B",
        data: valuationPBChange === "quarter" ? valuationPB : valuationPBSince,
        //  yAxis: 1, // Linked to the second yAxis which is now hidden
        type: "spline",
        marker: {
          enabled: false, // This will remove the ShortDashs on the line
        },
      },
    ],
  };

  const [valuationEV] = ["ryd30"].map((field) =>
    dataNewChart?.map((asset: any) => asset.value[field])
  );
  const [valuationEVSince] = ["ryd30"].map((field) =>
    dataYearChartNew?.map((asset: any) => asset.value[field])
  );

  const VALUATIONEV = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: window.innerWidth < 1600 ? 270 : 350,

      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
      borderRadius: 8,

      width: null,
      marginTop: 24,
    },
    credits: {
      enabled: false, // Loại bỏ chữ "Highcharts.com"
    },
    title: {
      text: null,
      style: {
        color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
      },
    },
    colors: [
      "#B28221",
      "#43F3FF",
      "#597BF8",
      "#30DF9D",
      "#FF36F5",
      "#FFD097",
      "#EF5E76",
      "#FFF92F",
    ],
    legend: {
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal", // Đặt layout là horizontal để legend hiển thị theo hàng ngang
      itemStyle: {
        color:
          screenMode === "dark"
            ? "rgba(171, 173, 186, 1) "
            : "rgba(86, 91, 103, 1)",
        fontSize: window.innerWidth < 1600 ? 10 : 13,

        fontHeight: "20px",
        fontWeight: 400,
      },
      maxHeight: 65,
      maxWidth: 500,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 0,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        let tooltipContent = `<b>${this.x}</b><br/>`;

        // Xác định đơn vị dựa trên giá trị và định dạng tương ứng
        const value = this.y;

        tooltipContent += `${this.series.name}: <b>${ConvertNumber(value)}</b>`;

        return tooltipContent;
      },
      useHTML: true,
      // ... other tooltip options ...
    },
    xAxis: {
      categories:
        changeValuationEV === "quarter"
          ? quarterDataNewChart
          : startYearSinceChart,

      labels: {
        style: {
          color: screenMode === "dark" ? "#fff" : "rgba(86, 91, 103, 1)",
          fontSize: "12px",
          fontWeight: 500,
        },
      },

      tickInterval:
        changeValuationEV === "quarter"
          ? parseInt(quarterDataNewChart?.length / 4)
          : parseInt(startYearSinceChart?.length / 4), // Thay đổi giá trị này để có khoảng cách mong muốn giữa các nhãn
      gridLineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      gridLineDashStyle: "ShortDash", // ShortDashted grid lines
      tickLength: 5, // Shorten the tick length
      tickColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)",
      lineColor:
        screenMode === "dark"
          ? "rgba(48, 50, 59, 1)"
          : "rgba(208, 210, 216, 1)", // Axis line color
      lineWidth: 1,
      tickWidth: 1,
      crosshair: {
        color: "gray",
        width: 1,
        zIndex: 5,
      },
    },
    yAxis: [
      {
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        labels: {
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
      {
        opposite: true,
        gridLineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)",
        gridLineDashStyle: "ShortDash", // ShortDashted grid lines
        lineWidth: 1, // Ensures the opposite Y-axis line is visible
        lineColor:
          screenMode === "dark"
            ? "rgba(48, 50, 59, 1)"
            : "rgba(208, 210, 216, 1)", // Color of the opposite Y-axis line
        labels: {
          formatter: function () {
            return this.value + "%";
          },
          style: {
            color:
              screenMode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "rgba(86, 91, 103, 1)",
            fontSize: window.innerWidth < 1600 ? 10 : 13,
            fontWeight: 400,
          },
        },
        crosshair: {
          dashStyle: "dash",
          width: 1,
          color: "gray",
          zIndex: 5,
        },
        title: {
          text: null,
        },
      },
    ],
    grid: {
      left: 80,
      right: 250,
      top: 100,
      bottom: 100,
    },
    series: [
      {
        name: "EV/EBITDA",
        data: changeValuationEV === "quarter" ? valuationEV : valuationEVSince,
      },
    ],
  };
  const newArray_03 = ["rev", "ryq27", "ryq29", "ryq25", "ryq71"].map((key) => {
    const value = businessPlan && businessPlan[key];
    if (isNaN(value)) {
      return value;
    } else {
      if (["rev"].includes(key)) {
        return isNaN(value) ? value : formatToBillion(value);
      }
      let result = Number(Number(value)?.toFixed(2)).toLocaleString();
      if (["ryq27", "ryq29", "ryq25"].includes(key)) {
        result += "%";
      }

      return result;
    }
  });

  const newCompanyData = [
    "symbol",
    "subSectorCode",
    "foundingDate",
    "charterCapital",
    "numberOfEmployee",
    "bankNumberOfBranch",
  ].map((key) => {
    let value = companyData && companyData[key];
    if (key === "foundingDate") {
      value = value?.split(" ")[0];
    }
    if (key === "charterCapital") {
      value = formatToBillion(value);
    }
    // if (key === 'charterCapital') {
    //   value = parseFloat(value).toLocaleString('de-DE');
    // }
    return value;
  });

  const listingInformation = [
    "listingDate",
    "exchange",
    "firstPrice",
    "issueShare",
    "quantity",
  ].map((key) => {
    let value = companyData && companyData[key];
    if (key === "listingDate") {
      value = value?.split(" ")[0];
    }
    if (["firstPrice", "issueShare", "quantity"].includes(key)) {
      value = parseFloat(value).toLocaleString("de-DE");
    }
    return value;
  });

  const dataStatistic_01 = dataStatistic?.map((item: any) => {
    return {
      tradingDate: item.tradingDate?.split(" ")[0],
      priceChange: parseFloat(item.priceChange),
      perPriceChange: parseFloat(item.perPriceChange),
      openPrice: (parseFloat(item.openPrice) / 1000)
        ?.toFixed(2)
        .toLocaleString(),
      highestPrice: (parseFloat(item.highestPrice) / 1000)
        ?.toFixed(2)
        .toLocaleString(),
      lowestPrice: (parseFloat(item.lowestPrice) / 1000)
        ?.toFixed(2)
        .toLocaleString(),
      closePrice: (parseFloat(item.closePrice) / 1000)
        ?.toFixed(2)
        .toLocaleString(),
      averagePrice: (parseFloat(item.averagePrice) / 1000)
        ?.toFixed(2)
        .toLocaleString(),
      closePriceAdjusted: (parseFloat(item.closePriceAdjusted) / 1000)
        ?.toFixed(2)
        .toLocaleString(),
      totalDealVol: parseFloat(item.totalDealVol).toLocaleString("de-DE"),
      totalDealVal: parseFloat(item.totalDealVal).toLocaleString("de-DE"),
      totalMatchVol: parseFloat(item.totalMatchVol).toLocaleString("de-DE"),
      totalMatchVal: parseFloat(item.totalMatchVal).toLocaleString("de-DE"),
    };
  });

  const dataStatistic_02 = dataStatistic?.map((item: any) => {
    const foreignSellVolTotal = parseFloat(item.foreignSellVolTotal);
    const foreignBuyVolTotal = parseFloat(item.foreignBuyVolTotal);
    const foreignBuyValTotal = parseFloat(item.foreignBuyValTotal);
    const foreignSellValTotal = parseFloat(item.foreignSellValTotal);
    return {
      tradingDate: item.tradingDate?.split(" ")[0],
      foreignCurrentRoom: parseFloat(item.foreignCurrentRoom).toLocaleString(
        "de-DE"
      ),
      foreignBuyVolTotal: parseFloat(item.foreignBuyVolTotal).toLocaleString(
        "de-DE"
      ),
      foreignSellVolTotal: parseFloat(item.foreignSellVolTotal).toLocaleString(
        "de-DE"
      ),
      differentVolTotal: (
        foreignBuyVolTotal - foreignSellVolTotal
      ).toLocaleString("de-DE"),
      foreignBuyValTotal: parseFloat(item.foreignBuyValTotal).toLocaleString(
        "de-DE"
      ),
      foreignSellValTotal: parseFloat(item.foreignSellValTotal).toLocaleString(
        "de-DE"
      ),
      differentValTotal: (
        foreignBuyValTotal - foreignSellValTotal
      ).toLocaleString("de-DE"),
    };
  });

  const dataStatistic_03 = dataStatistic?.map((item: any) => {
    return {
      tradingDate: item.tradingDate?.split(" ")[0],
      totalBuyTrade: parseFloat(item.totalBuyTrade).toLocaleString("de-DE"),
      totalBuyTradeVol: parseFloat(item.totalBuyTradeVol).toLocaleString(
        "de-DE"
      ),
      totalSellTrade: parseFloat(item.totalSellTrade).toLocaleString("de-DE"),
      totalSellTradeVol: parseFloat(item.totalSellTradeVol).toLocaleString(
        "de-DE"
      ),
      netBuySellVal: parseFloat(item.netBuySellVal).toLocaleString("de-DE"),
      netBuySellVol: parseFloat(item.netBuySellVol).toLocaleString("de-DE"),
    };
  });

  const FIRST_TABLE = [
    {
      label: "Mã CP:",
    },
    {
      label: "Vốn hoá:",
    },
    {
      label: "Số lượng cổ phiếu lưu hành:",
    },
    {
      label: "Tổng doanh thu:",
    },
    {
      label: "Lợi nhuận:",
    },
    {
      label: "Tài sản:",
    },
  ].map((item, index) => ({
    ...item,
    value: newArray_01[index],
  }));

  const SECOND_TABLE = [
    {
      label: "P/E (TTM):",
    },
    {
      label: "P/B (TTM):",
    },
    {
      label: "P/S (TTM):",
    },
    {
      label: "EPS (TTM):",
    },
    {
      label: "ROA (%):",
    },
    {
      label: "ROE (%):",
    },
  ].map((item, index) => ({
    ...item,
    value: newArray_02[index],
  }));

  const THIRD_TABLE = [
    {
      label: "Doanh thu:",
    },
    {
      label: "Biên EBIT (%):",
    },
    {
      label: "Lợi nhuận ròng (%):",
    },
    {
      label: "Lợi nhuận gộp (%):",
    },
    {
      label: "Đòn bẩy tài chính:",
    },
  ].map((item, index) => ({
    ...item,
    value: newArray_03[index],
  }));

  const COMPANY_DATA = [
    {
      label: "Mã chứng khoán",
    },
    {
      label: "Mã ngành ICB",
    },
    {
      label: "Năm thành lập",
    },
    {
      label: "Vốn điều lệ",
    },
    {
      label: "Số lượng nhân sự",
    },
    // {
    //   label: 'Số lượng chi nhánh',
    // },
  ].map((item, index) => {
    return {
      ...item,
      value: newCompanyData[index],
    };
  });

  const LISTING_INFORMATION = [
    {
      label: "Ngày niêm yết",
    },
    {
      label: "Nơi niêm yết",
    },
    {
      label: "Giá chào sàn",
    },
    {
      label: "KL đang niêm yết",
    },
    {
      label: "KL cổ phiếu đang lưu hành",
    },
  ].map((item, index) => ({
    ...item,
    value: listingInformation[index],
  }));

  const handleDateStart: DatePickerProps["onChange"] = (date) => {
    if (date === null) {
      setDayStart(null);
      return;
    }
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    const encodedDate = encodeURIComponent(formattedDate);

    setDayStart(encodedDate);
  };

  const handleDateEnd: DatePickerProps["onChange"] = (date) => {
    if (date === null) {
      setDayEnd(null);
      return;
    }
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    const encodedDate = encodeURIComponent(formattedDate);

    setDayEnd(encodedDate);
  };

  const handleSearchStatistic = useCallback(() => {
    setCheck(true);
  }, []);

  const handleTableChange = useCallback(
    (pagination: any) => {
      setCurrent(pagination?.current);
      setPageSize(pagination?.pageSize);
      setTotal(pagination?.total);
    },
    [setCurrent, setPageSize, setTotal]
  );

  const handleSelectCompany = useCallback((value: string) => {
    setCompany(value);
  }, []);

  const descriptionCompany = companyData?.companyProfile;

  const textToShow = isExpanded
    ? descriptionCompany
    : descriptionCompany?.slice(0, descriptionCompany?.length / 3);

  const handleSelectAssetChange = (value: string) => {
    setAssetChange(value);
  };
  const handleSelectvaluationPBChange = (value: string) => {
    setValuationPBChange(value);
  };
  const handleSelectRatioChange = (value: string) => {
    setDebtRatioChange(value);
  };
  const handleSelectValuationChange = (value: string) => {
    setValuationChange(value);
  };
  const handleChangeSelectMarginChange = (value) => {
    setChangeProfitMargin(value);
  };
  const handleChangeSelectValuationEVChange = (value) => {
    setChangeValuationEV(value);
  };
  const handleSelectCapitalChange = (value: string) => {
    setCapitalChange(value);
  };

  const handleSelectCashFlowChange = (value: string) => {
    setCashFlowChange(value);
  };

  const handleSelectNetRevenue = (value: string) => {
    setNetRevenueChange(value);
  };
  const handleSelectKetQuaKinhDoanh1 = (value: string) => {
    setChangeKetQuaKinhDoanh1(value);
  };
  const handleSelectKetQuaKinhDoanh2 = (value: string) => {
    setChangeKetQuaKinhDoanh2(value);
  };
  const handleSelectKetQuaKinhDoanh3 = (value: string) => {
    setChangeKetQuaKinhDoanh3(value);
  };
  const handleSelectShortFinancialAssets = (value: string) => {
    setShortFinancialAssetChange(value);
  };
  const handleSelectProfitBeforeTax = (value: string) => {
    setProfitBeforeTaxChange(value);
  };

  const handleSelectProfitAfterTax = (value: string) => {
    setProfitAfterTaxChange(value);
  };
  const handleSelectProfitAfterTaxEnterprise = (value: string) => {
    setProfitAfterTaxChangeEnterprise(value);
  };
  const handleSelectInsurance = (value: string) => {
    setProfitInsurance(value);
  };
  const handleSelectIncome = (value: string) => {
    setIncomeChange(value);
  };
  const handleSelectChiPhiDuPhong = (value: string) => {
    setChiPhiDuPhong(value);
  };
  const handleSelectProfitAfterBankTax = (value: string) => {
    setProfitAfterTaxBankChange(value);
  };
  const handleAnalysisChange = useCallback((e: string) => {
    setValueTab(e);
  }, []);

  const handleChangeTransaction = useCallback((e: string) => {
    setTransaction(e);
  }, []);

  const handleInsuranceAssetChange = useCallback((e: string) => {
    setInsuranceAssetChange(e);
  }, []);

  const handleBankAssetChange = useCallback((e: string) => {
    setBankAssetChange(e);
  }, []);

  const handleFinancialAssetChange = useCallback((e: string) => {
    setFinancialAssetChange(e);
  }, []);

  const handleCapitalInsuranceChange = useCallback((e: string) => {
    setCapitalInsuraceChange(e);
  }, []);

  const handleCapitalBankChange = useCallback((e: string) => {
    setCapitalBankChange(e);
  }, []);

  const handleCapitalFinancialChange = useCallback((e: string) => {
    setCapitalFinancialChange(e);
  }, []);

  return {
    PROFIT_MARGIN,
    shareholderStructure,
    screenMode,
    newsData,
    downloadReport,
    leadership,
    newSubCompany,
    FIRST_TABLE,
    SECOND_TABLE,
    THIRD_TABLE,
    companyData,
    newAssociatedCompany,
    dataStatistic_01,
    dataStatistic_02,
    dataStatistic_03,
    current,
    pageSize,
    total,
    COMPANY_DATA,
    LISTING_INFORMATION,
    newListCompany,
    textToShow,
    isExpanded,
    DATA_ASSET_CHART,
    DATA_CAPITAL_CHART,
    DATA_CASH_FLOW_CHART,
    DATA_NET_REVENUE_CHART,
    DATA_PROFIT_BEFORE_TAX_CHART,
    DATA_PROFIT_AFTER_TAX_CHART,
    valueTab,
    transaction,
    openStock,
    socketData,
    dataClosedSession,
    DATA_FINANCIAL_TABLE,
    organizedData,
    financialTable,
    formatDataFinancialTable,
    sortFinancial,
    firstFinancialColumn,
    secondFinancialColumn,
    thirdFinancialColumn,
    fourthFinancialColumn,
    fifthFinancialColumn,
    company,
    companyAsset,
    checkDataResponse,
    DATA_INSURANCE_ASSET_CHART,
    DATA_BANK_ASSET_CHART,
    DATA_FINANCIAL_ASSET_CHART,
    DATA_CAPITAL_INSURANCE_CHART,
    DATA_CAPITAL_BANK_CHART,
    DATA_CAPITAL_FINANCIAL_CHART,
    setSecondFinancialColumn,
    setFifthFinancialColumn,
    setFourthFinancialColumn,
    setThirdFinancialColumn,
    setSortFinancial,
    setFirstFinancialColumn,
    handleDateStart,
    handleDateEnd,
    handleTableChange,
    handleSearchStatistic,
    handleSelectCompany,
    setIsExpanded,
    listAnalysisReport,
    handleSelectAssetChange,
    handleChangeSelectMarginChange,
    handleSelectCapitalChange,
    handleSelectCashFlowChange,
    handleSelectNetRevenue,
    handleSelectKetQuaKinhDoanh1,
    handleSelectKetQuaKinhDoanh2,
    handleSelectKetQuaKinhDoanh3,
    CHI_PHI_HOAT_DONG_SSI_CHART,
    handleSelectProfitBeforeTax,
    handleSelectProfitAfterTax,
    handleSelectProfitAfterBankTax,
    handleAnalysisChange,
    handleChangeTransaction,
    handleInsuranceAssetChange,
    handleBankAssetChange,
    handleFinancialAssetChange,
    handleCapitalInsuranceChange,
    handleCapitalBankChange,
    handleCapitalFinancialChange,
    handleSelectRatioChange,
    handleSelectValuationChange,
    handleSelectvaluationPBChange,
    handleChangeSelectValuationEVChange,
    KET_QUA_KINH_DOANH_SSI_CHART,
    DATA_SSI_CHART,
    EQUITY_DEBT,
    VALUATION,
    VALUATIONPB,
    VALUATIONEV,
    DATA_PROFIT_AFTER_TAX_BANK_CHART,
    handleSelectChiPhiDuPhong,
    DATA_RISK_PROVISION_COSTS_BANK_CHART,
    DATA_INCOME_CHART,
    handleSelectIncome,
    handleSelectProfitAfterTaxEnterprise,
    DATA_PROFIT_AFTER_TAX_ENTERPRISE_CHART,
    handleSelectInsurance,
    DATA_INSURANCE_CHART,
    handleSelectShortFinancialAssets,
    DATA_SHORT_FINANCIAL_ASSET_CHART,
    netReveNueChange,
    changeKetQuaKinhDoanh1,
    incomeChange,
    profitInsurance,
    profitAfterTaxBankChange,
    changeKetQuaKinhDoanh2,
    profitAfterTaxChange,
    changeProfitMargin,
    changeKetQuaKinhDoanh3,
    chiPhiDuPhong,
    shortFinancialAssetChange,
    cashFlowChange,
    assetChange,
    financialAssetChange,
    bankAssetChange,
    insuranceAssetChange,
    capitalChange,
    capitalFinancialChange,
    capitalBankChange,
    capitalInsuranceChange,
    valuationChange,
    debtRatioChange,
    valuationPBChange,
    profitAfterTaxChangeEnterprise,
    changeValuationEV,
    setCompany,
  };
};

export type Props = ReturnType<typeof useBieudotaichinh>;

export default useBieudotaichinh;
