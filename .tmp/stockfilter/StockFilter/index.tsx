/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { screenModeSelector } from "@/redux/screen/selector";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { config } from "@/config/env";

import Value from "./Children/Value/Value";
import iconSearch from "@assets/icons/search.svg";
import ResultTable from "./Children/ResultTable/ResultTable";
import Targets from "./Children/Target/Targets";
import searchLightMode from "@/assets/icons/search-lightmode.svg";

import {
  ConvertNumber,
  ConvertStringToNumber,
  formatNumber,
} from "@/components/ConvertNumber";
import { StyledStockFilter } from "./styled";
import { LIST_PERCENT_FILTER } from "@/constants/common";
import { useAppSelector } from "@/redux/hooks";
import { useLocation } from "react-router-dom";
import { groupBy, sumBy } from "lodash";
import { convertDate, convertDateMin } from "@/components/ConvertDate";
import { TVChartContainer } from "@/components/ChartLocCoPhieu/Chart";
import { notification } from "antd";

const StockFilter: FC = (
  {
    // listSignal,
    // setListSignal,
    // listTabs,
    // setListTabs,
    // curTab,
    // setCurTab,
    // trendingLine,
    // setTrendingLine,
    // commonIndicator,
    // setCommonIndicator,
    // priceUp,
    // setPriceUp,
    // priceDown,
    // setPriceDown,
    // tvWidget,
    // setTvWidget,
  }: any
) => {
  const screenMode = useSelector(screenModeSelector);

  const [selectedValue, setSelectedValue] = useState<string>("nhomThongDung");
  // const [tieuChiSearch, setTieuChiSearch] = useState<string>('');
  const [listTieuChiPicked, setListTieuChiPicked] = useState<any>([]);
  const [listMyFilter, setListMyFilter] = useState<any>([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [tabMenuTarget, setTabMenuTarget] = useState("target");

  const [listIdConfig, setListIdConfig] = useState([]);
  const [pickerPopular, setPickerPopular] = useState(0);
  const [pickerBasic, setPickerBasic] = useState(0);

  const [pickerTechnique, setPickerTechnique] = useState(0);
  const [pickerFluctuation, setPickerFluctuation] = useState(0);
  const [pickerMyFilter, setPickerMyFilter] = useState(0);
  const [loading, setLoading] = useState<any>(false);
  const [totalResult, setTotalResult] = useState<any>();
  const bottomEl = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [anchorElLeft, setAnchorElLeft] = useState<any>(null);
  const [anchorElRight, setAnchorElRight] = useState<any>(null);
  const [anchorElInterval, setAnchorElInterval] = useState<any>(null);
  const [anchorElBoolean, setAnchorElBoolean] = useState<any>(null);
  const [anchorQuy, setAnchorQuy] = useState<any>(null);
  const [anchorElSession, setAnchorElSession] = useState<any>(null);
  const [anchorElPerCent, setAnchorElPercent] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const open = Boolean(anchorEl);
  const openBoolean = Boolean(anchorElBoolean);
  const openPercent = Boolean(anchorElPerCent);
  const openLeft = Boolean(anchorElLeft);
  const openRight = Boolean(anchorElRight);
  const openInterval = Boolean(anchorElInterval);
  const openMonth = Boolean(anchorQuy);
  const openSession = Boolean(anchorElSession);
  const [currentChangeTieuChi, setCurrentChangeTieuChi] = useState<any>({});
  const [currentChangeBoolean, setCurrentChangeBoolean] = useState<any>({});
  const [currentChangePercent, setCurrentChangePercent] = useState<any>({});
  const [currentChangeTieuChiLeft, setCurrentChangeTieuChiLeft] = useState<any>(
    {}
  );
  const [currentChangeTieuChiRight, setCurrentChangeTieuChiRight] =
    useState<any>({});
  const [currentChangeTieuChiInterval, setCurrentChangeTieuChiInterval] =
    useState<any>({});
  const [currentChangeTieuChiQuy, setCurrentChangeTieuChiQuy] = useState<any>(
    {}
  );
  const [currentChangeSession, setCurrentChangeSession] = useState<any>({});
  const [isHoverClear, setIsHoverClear] = useState<any>([]);
  const [isHoverBoolean, setIsHoverBoolean] = useState<any>([]);
  const [isHoverPercent, setIsHoverPercent] = useState<any>([]);
  const [isHoverLeft, setIsHoverLeft] = useState<any>([]);
  const [isHoverRight, setIsHoverRight] = useState<any>([]);
  const [isHoverInterval, setIsHoverInterval] = useState<any>([]);
  const [isHoverQuy, setIsHoverQuy] = useState<any>([]);
  const [isHoverSession, setIsHoverSession] = useState<any>([]);
  const [isHoverDeleteAll, setIsHoverDeleteAll] = useState<any>(false);
  const [isHoverSave, setIsHoverSave] = useState<any>(false);
  const [isHoverChiTieu, setIsHoverChiTieu] = useState<any>(false);
  const [isHoverFilter, setIsHoverFilter] = useState<any>(false);
  const [rows, setRows] = useState<any>([]);
  const [searchCriteria, setSearchCriteria] = useState<any>("");
  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  const [totalFin, setTotalFin] = useState<any>();
  const [columns, setColumns] = useState<any>([]);
  const [day, setDay] = useState<any>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("overview");
  const [pageTable, setPageTable] = useState<any>();
  const [pageSize, setPageSize] = useState<any>();
  const [searchFriends, setSearchFriends] = useState("");
  const [sendFriends, setSendFriends] = useState([]);

  const [listTieuChi, setListTieuChi] = useState([
    {
      dropdown: [
        { label: "Đi vào vùng quá mua", value: 30, isCheck: false },
        { label: "Thoát khỏi vùng quá mua", value: 70, isCheck: false },
        { label: "Đi vào vùng quá bán", value: 70, isCheck: false },
        { label: "Thoát khỏi vùng quá bán", value: 30, isCheck: false },
      ],
      label: "Chỉ số RSI",
    },
    {
      dropdown: [
        { label: "Giá cắt lên MA 20", value: 0, isCheck: false },
        { label: "Giá cắt lên MA 50", value: 0, isCheck: false },
        { label: "Giá cắt lên MA 100", value: 0, isCheck: false },
        { label: "Giá cắt lên MA 200", value: 0 },
        { label: "Giá cắt xuống MA 20", value: 0, isCheck: false },
        { label: "Giá cắt xuống MA 50", value: 0, isCheck: false },
        { label: "Giá cắt xuống MA 100", value: 0, isCheck: false },
        { label: "Giá cắt xuống MA 200", value: 0, isCheck: false },
      ],
      label: "Chỉ số MA",
    },
    {
      dropdown: [
        { label: "Giá cắt lên EMA 20", value: 0, isCheck: false },
        { label: "Giá cắt lên EMA 50", value: 0, isCheck: false },
        { label: "Giá cắt lên EMA 100", value: 0, isCheck: false },
        { label: "Giá cắt lên EMA 200", value: 0, isCheck: false },
        { label: "Giá cắt xuống EMA 20", value: 0, isCheck: false },
        { label: "Giá cắt xuống EMA 50", value: 0, isCheck: false },
        { label: "Giá cắt xuống EMA 100", value: 0, isCheck: false },
        { label: "Giá cắt xuống EMA 200", value: 0, isCheck: false },
      ],
      label: "Chỉ số EMA",
    },
    {
      dropdown: [
        { label: "Cắt lên đường tín hiệu", value: 0, isCheck: false },
        { label: "Cắt xuống đường tín hiệu", value: 0, isCheck: false },
        { label: "Cắt lên đường 0", value: 0, isCheck: false },
        { label: "Cắt xuống đường 0", value: 0, isCheck: false },
      ],
      label: "Chỉ số MACD",
    },
  ]);
  const [listSymbol, setListSymbol] = useState([
    "Tất cả",
    "Top 50",
    "Top 100",
    "Top 200",
    "Top 400",
    "A32",
    "AAA",
    "AAM",
    "AAS",
    "AAT",
    "AAV",
    "ABB",
    "ABC",
    "ABI",
    "ABR",
    "ABS",
    "ABT",
    "ABW",
    "ACB",
    "ACC",
    "ACE",
    "ACG",
    "ACL",
    "ACM",
    "ACS",
    "ACV",
    "ADC",
    "ADG",
    "ADP",
    "ADS",
    "AFX",
    "AG1",
    "AGE",
    "AGF",
    "AGG",
    "AGM",
    "AGP",
    "AGR",
    "AGX",
    "AIC",
    "ALT",
    "ALV",
    "AMC",
    "AME",
    "AMP",
    "AMS",
    "AMV",
    "ANT",
    "ANV",
    "APC",
    "APF",
    "APG",
    "APH",
    "API",
    "APL",
    "APP",
    "APS",
    "APT",
    "ARM",
    "ART",
    "ASA",
    "ASG",
    "ASM",
    "ASP",
    "AST",
    "ATA",
    "ATB",
    "ATG",
    "ATS",
    "AVC",
    "AVF",
    "B82",
    "BAB",
    "BAF",
    "BAF122029",
    "BAL",
    "BAX",
    "BBC",
    "BBH",
    "BBM",
    "BBS",
    "BBT",
    "BCA",
    "BCB",
    "BCC",
    "BCE",
    "BCF",
    "BCG",
    "BCG122006",
    "BCM",
    "BCP",
    "BCV",
    "BDB",
    "BDG",
    "BDT",
    "BDW",
    "BED",
    "BEL",
    "BFC",
    "BGW",
    "BHA",
    "BHC",
    "BHG",
    "BHK",
    "BHN",
    "BHP",
    "BIC",
    "BID",
    "BID121027",
    "BID121028",
    "BID122003",
    "BID122004",
    "BID122005",
    "BIG",
    "BIO",
    "BKC",
    "BKG",
    "BKH",
    "BLF",
    "BLI",
    "BLN",
    "BLT",
    "BLW",
    "BMC",
    "BMD",
    "BMF",
    "BMG",
    "BMI",
    "BMJ",
    "BMN",
    "BMP",
    "BMS",
    "BMV",
    "BNA",
    "BNW",
    "BOT",
    "BPC",
    "BQB",
    "BRC",
    "BRR",
    "BRS",
    "BSA",
    "BSC",
    "BSD",
    "BSG",
    "BSH",
    "BSI",
    "BSL",
    "BSP",
    "BSQ",
    "BSR",
    "BST",
    "BT1",
    "BT6",
    "BTB",
    "BTD",
    "BTG",
    "BTH",
    "BTN",
    "BTP",
    "BTS",
    "BTT",
    "BTU",
    "BTV",
    "BTW",
    "BVB",
    "BVB122028",
    "BVG",
    "BVH",
    "BVL",
    "BVN",
    "BVS",
    "BWA",
    "BWE",
    "BWS",
    "BXH",
    "C12",
    "C21",
    "C22",
    "C32",
    "C47",
    "C4G",
    "C69",
    "C92",
    "CAB",
    "CACB2208",
    "CACB2301",
    "CAD",
    "CAG",
    "CAN",
    "CAP",
    "CAR",
    "CAT",
    "CAV",
    "CBI",
    "CBS",
    "CC1",
    "CC4",
    "CCA",
    "CCI",
    "CCL",
    "CCM",
    "CCP",
    "CCR",
    "CCT",
    "CCV",
    "CDC",
    "CDG",
    "CDH",
    "CDN",
    "CDO",
    "CDP",
    "CDR",
    "CE1",
    "CEG",
    "CEN",
    "CEO",
    "CET",
    "CFM",
    "CFPT2210",
    "CFPT2212",
    "CFPT2213",
    "CFPT2214",
    "CFPT2303",
    "CFV",
    "CGV",
    "CH5",
    "CHC",
    "CHP",
    "CHPG2225",
    "CHPG2226",
    "CHPG2227",
    "CHPG2301",
    "CHPG2302",
    "CHPG2303",
    "CHPG2304",
    "CHPG2305",
    "CHPG2306",
    "CHS",
    "CI5",
    "CIA",
    "CID",
    "CIG",
    "CII",
    "CII120018",
    "CII121006",
    "CII121029",
    "CII42013",
    "CIP",
    "CJC",
    "CK8",
    "CKA",
    "CKD",
    "CKG",
    "CKV",
    "CLC",
    "CLG",
    "CLH",
    "CLL",
    "CLM",
    "CLW",
    "CLX",
    "CMBB2211",
    "CMBB2213",
    "CMBB2214",
    "CMBB2215",
    "CMBB2301",
    "CMBB2303",
    "CMC",
    "CMD",
    "CMF",
    "CMG",
    "CMI",
    "CMK",
    "CMM",
    "CMN",
    "CMP",
    "CMS",
    "CMSN2214",
    "CMSN2215",
    "CMT",
    "CMV",
    "CMW",
    "CMWG2213",
    "CMWG2214",
    "CMWG2215",
    "CMWG2301",
    "CMWG2302",
    "CMX",
    "CNA",
    "CNC",
    "CNG",
    "CNN",
    "CNT",
    "COM",
    "CPA",
    "CPC",
    "CPH",
    "CPI",
    "CPOW2210",
    "CQN",
    "CQT",
    "CRC",
    "CRE",
    "CSC",
    "CSI",
    "CSM",
    "CST",
    "CSTB2224",
    "CSTB2225",
    "CSTB2301",
    "CSTB2302",
    "CSTB2303",
    "CSV",
    "CT3",
    "CT6",
    "CTA",
    "CTB",
    "CTC",
    "CTCB2212",
    "CTCB2214",
    "CTCB2215",
    "CTCB2216",
    "CTD",
    "CTD122015",
    "CTF",
    "CTG",
    "CTG121030",
    "CTG121031",
    "CTI",
    "CTN",
    "CTP",
    "CTPB2301",
    "CTR",
    "CTS",
    "CTT",
    "CTW",
    "CTX",
    "CVHM2216",
    "CVHM2218",
    "CVHM2219",
    "CVHM2220",
    "CVIB2201",
    "CVIB2301",
    "CVN",
    "CVNM2211",
    "CVNM2212",
    "CVP",
    "CVPB2212",
    "CVPB2214",
    "CVPB2301",
    "CVPB2302",
    "CVRE2216",
    "CVRE2219",
    "CVRE2220",
    "CVRE2221",
    "CVT",
    "CVT122007",
    "CVT122008",
    "CVT122009",
    "CX8",
    "CYC",
    "D11",
    "D2D",
    "DAC",
    "DAD",
    "DAE",
    "DAG",
    "DAH",
    "DAN",
    "DAS",
    "DAT",
    "DBC",
    "DBD",
    "DBM",
    "DBT",
    "DC1",
    "DC2",
    "DC4",
    "DCF",
    "DCG",
    "DCH",
    "DCL",
    "DCM",
    "DCR",
    "DCS",
    "DCT",
    "DDG",
    "DDH",
    "DDM",
    "DDN",
    "DDV",
    "DFC",
    "DFF",
    "DGC",
    "DGT",
    "DGW",
    "DHA",
    "DHB",
    "DHC",
    "DHD",
    "DHG",
    "DHM",
    "DHN",
    "DHP",
    "DHT",
    "DIC",
    "DID",
    "DIG",
    "DIH",
    "DKC",
    "DL1",
    "DLD",
    "DLG",
    "DLM",
    "DLR",
    "DLT",
    "DM7",
    "DMC",
    "DMN",
    "DNA",
    "DNC",
    "DND",
    "DNE",
    "DNH",
    "DNL",
    "DNM",
    "DNN",
    "DNP",
    "DNT",
    "DNW",
    "DOC",
    "DOP",
    "DP1",
    "DP2",
    "DP3",
    "DPC",
    "DPG",
    "DPH",
    "DPM",
    "DPP",
    "DPR",
    "DPS",
    "DQC",
    "DRC",
    "DRG",
    "DRH",
    "DRI",
    "DRL",
    "DS3",
    "DSC",
    "DSD",
    "DSG",
    "DSN",
    "DSP",
    "DST",
    "DSV",
    "DTA",
    "DTB",
    "DTC",
    "DTD",
    "DTE",
    "DTG",
    "DTH",
    "DTI",
    "DTK",
    "DTL",
    "DTP",
    "DTT",
    "DTV",
    "DUS",
    "DVC",
    "DVG",
    "DVM",
    "DVN",
    "DVP",
    "DVW",
    "DWC",
    "DWS",
    "DXG",
    "DXL",
    "DXP",
    "DXS",
    "DXV",
    "DZM",
    "E12",
    "E1VFVN30",
    "E29",
    "EBS",
    "ECI",
    "EFI",
    "EIB",
    "EIC",
    "EID",
    "EIN",
    "ELC",
    "EMC",
    "EME",
    "EMG",
    "EMS",
    "EPC",
    "EPH",
    "EVE",
    "EVF",
    "EVG",
    "EVS",
    "FBA",
    "FBC",
    "FCC",
    "FCM",
    "FCN",
    "FCS",
    "FDC",
    "FGL",
    "FHN",
    "FHS",
    "FIC",
    "FID",
    "FIR",
    "FIT",
    "FLC",
    "FMC",
    "FOC",
    "FOX",
    "FPT",
    "FRC",
    "FRM",
    "FRT",
    "FSO",
    "FT1",
    "FTI",
    "FTM",
    "FTS",
    "FUCTVGF3",
    "FUCVREIT",
    "FUEDCMID",
    "FUEFCV50",
    "FUEIP100",
    "FUEKIV30",
    "FUEKIVFS",
    "FUEMAV30",
    "FUEMAVND",
    "FUESSV30",
    "FUESSV50",
    "FUESSVFL",
    "FUEVFVND",
    "FUEVN100",
    "G20",
    "G36",
    "GAS",
    "GB05F2306",
    "GB05F2309",
    "GB05F2312",
    "GB10F2306",
    "GB10F2309",
    "GB10F2312",
    "GCB",
    "GCF",
    "GDT",
    "GDW",
    "GEE",
    "GEG",
    "GEG121022",
    "GER",
    "GEX",
    "GGG",
    "GH3",
    "GHC",
    "GIC",
    "GIL",
    "GKM",
    "GLC",
    "GLH121019",
    "GLH121026",
    "GLT",
    "GLW",
    "GMA",
    "GMC",
    "GMD",
    "GMH",
    "GMX",
    "GND",
    "GPC",
    "GSM",
    "GSP",
    "GTA",
    "GTD",
    "GTS",
    "GTT",
    "GVR",
    "GVT",
    "H11",
    "HAC",
    "HAD",
    "HAF",
    "HAG",
    "HAH",
    "HAI",
    "HAM",
    "HAN",
    "HAP",
    "HAR",
    "HAT",
    "HAV",
    "HAX",
    "HBC",
    "HBD",
    "HBH",
    "HBS",
    "HC1",
    "HC3",
    "HCB",
    "HCC",
    "HCD",
    "HCI",
    "HCM",
    "HCT",
    "HD2",
    "HD6",
    "HD8",
    "HDA",
    "HDB",
    "HDC",
    "HDG",
    "HDM",
    "HDO",
    "HDP",
    "HDW",
    "HEC",
    "HEJ",
    "HEM",
    "HEP",
    "HES",
    "HEV",
    "HFB",
    "HFC",
    "HFX",
    "HGM",
    "HGT",
    "HGW",
    "HHC",
    "HHG",
    "HHN",
    "HHP",
    "HHR",
    "HHS",
    "HHV",
    "HID",
    "HIG",
    "HII",
    "HJC",
    "HJS",
    "HKB",
    "HKP",
    "HKT",
    "HLA",
    "HLB",
    "HLC",
    "HLD",
    "HLG",
    "HLR",
    "HLS",
    "HLT",
    "HLY",
    "HMC",
    "HMG",
    "HMH",
    "HMR",
    "HMS",
    "HNA",
    "HNB",
    "HND",
    "HNF",
    "HNG",
    "HNI",
    "HNM",
    "HNP",
    "HNR",
    "HOM",
    "HOT",
    "HPB",
    "HPD",
    "HPG",
    "HPH",
    "HPI",
    "HPM",
    "HPP",
    "HPT",
    "HPW",
    "HPX",
    "HQC",
    "HRB",
    "HRC",
    "HRT",
    "HSA",
    "HSG",
    "HSI",
    "HSL",
    "HSM",
    "HSP",
    "HSV",
    "HT1",
    "HTC",
    "HTE",
    "HTG",
    "HTI",
    "HTL",
    "HTM",
    "HTN",
    "HTP",
    "HTR",
    "HTT",
    "HTV",
    "HTW",
    "HU1",
    "HU3",
    "HU4",
    "HU6",
    "HUB",
    "HUG",
    "HUT",
    "HVA",
    "HVG",
    "HVH",
    "HVN",
    "HVT",
    "HVX",
    "HWS",
    "IBC",
    "IBD",
    "ICC",
    "ICF",
    "ICG",
    "ICI",
    "ICN",
    "ICT",
    "IDC",
    "IDI",
    "IDJ",
    "IDP",
    "IDV",
    "IFS",
    "IHK",
    "IJC",
    "ILA",
    "ILB",
    "ILC",
    "ILS",
    "IME",
    "IMP",
    "IN4",
    "INC",
    "INN",
    "IPA",
    "IRC",
    "ISG",
    "ISH",
    "IST",
    "ITA",
    "ITC",
    "ITD",
    "ITQ",
    "ITS",
    "IVS",
    "JOS",
    "JVC",
    "KAC",
    "KBC",
    "KBC121020",
    "KCB",
    "KCE",
    "KDC",
    "KDH",
    "KDM",
    "KGM",
    "KHA",
    "KHD",
    "KHG",
    "KHL",
    "KHP",
    "KHS",
    "KHW",
    "KIP",
    "KKC",
    "KLB",
    "KLF",
    "KLM",
    "KMR",
    "KMT",
    "KOS",
    "KPF",
    "KSB",
    "KSD",
    "KSF",
    "KSH",
    "KSQ",
    "KST",
    "KSV",
    "KTC",
    "KTL",
    "KTS",
    "KTT",
    "KVC",
    "L10",
    "L12",
    "L14",
    "L18",
    "L40",
    "L43",
    "L44",
    "L45",
    "L61",
    "L62",
    "L63",
    "LAF",
    "LAI",
    "LAS",
    "LAW",
    "LBC",
    "LBE",
    "LBM",
    "LCC",
    "LCD",
    "LCG",
    "LCM",
    "LCS",
    "LCW",
    "LDG",
    "LDP",
    "LDW",
    "LEC",
    "LG9",
    "LGL",
    "LGM",
    "LHC",
    "LHG",
    "LIC",
    "LIG",
    "LIX",
    "LKW",
    "LLM",
    "LM3",
    "LM8",
    "LMC",
    "LMH",
    "LMI",
    "LNC",
    "LO5",
    "LPB",
    "LPB121035",
    "LPB121036",
    "LPB122010",
    "LPB122011",
    "LPT",
    "LQN",
    "LSG",
    "LSS",
    "LTC",
    "LTG",
    "LUT",
    "LWS",
    "M10",
    "MA1",
    "MAC",
    "MAS",
    "MBB",
    "MBG",
    "MBN",
    "MBS",
    "MCC",
    "MCD",
    "MCF",
    "MCG",
    "MCH",
    "MCI",
    "MCM",
    "MCO",
    "MCP",
    "MDA",
    "MDC",
    "MDF",
    "MEC",
    "MED",
    "MEF",
    "MEL",
    "MES",
    "MFS",
    "MGC",
    "MGG",
    "MGR",
    "MH3",
    "MHC",
    "MHL",
    "MIC",
    "MIE",
    "MIG",
    "MIM",
    "MKP",
    "MKV",
    "MLC",
    "MLS",
    "MML",
    "MML121021",
    "MNB",
    "MND",
    "MPC",
    "MPT",
    "MPY",
    "MQB",
    "MQN",
    "MRF",
    "MSB",
    "MSH",
    "MSN",
    "MSN120007",
    "MSN120008",
    "MSN120009",
    "MSN120010",
    "MSN120011",
    "MSN120012",
    "MSN121013",
    "MSN121014",
    "MSN121015",
    "MSN123008",
    "MSN123009",
    "MSR",
    "MSR11808",
    "MST",
    "MTA",
    "MTB",
    "MTC",
    "MTG",
    "MTH",
    "MTL",
    "MTP",
    "MTS",
    "MTV",
    "MVB",
    "MVC",
    "MVN",
    "MWG",
    "NAB",
    "NAC",
    "NAF",
    "NAG",
    "NAP",
    "NAS",
    "NAU",
    "NAV",
    "NAW",
    "NBB",
    "NBC",
    "NBE",
    "NBP",
    "NBT",
    "NBW",
    "NCS",
    "NCT",
    "ND2",
    "NDC",
    "NDF",
    "NDN",
    "NDP",
    "NDT",
    "NDW",
    "NDX",
    "NED",
    "NET",
    "NFC",
    "NGC",
    "NHA",
    "NHC",
    "NHH",
    "NHP",
    "NHT",
    "NHV",
    "NJC",
    "NKG",
    "NLG",
    "NLS",
    "NNC",
    "NNG",
    "NNT",
    "NO1",
    "NOS",
    "NPM11805",
    "NPM11911",
    "NQB",
    "NQN",
    "NQT",
    "NRC",
    "NS2",
    "NSC",
    "NSG",
    "NSH",
    "NSL",
    "NSS",
    "NST",
    "NT2",
    "NTB",
    "NTC",
    "NTF",
    "NTH",
    "NTL",
    "NTP",
    "NTT",
    "NTW",
    "NUE",
    "NVB",
    "NVL",
    "NVL122001",
    "NVP",
    "NVT",
    "NWT",
    "NXT",
    "OCB",
    "OCH",
    "ODE",
    "OGC",
    "OIL",
    "ONE",
    "ONW",
    "OPC",
    "ORS",
    "PAC",
    "PAI",
    "PAN",
    "PAP",
    "PAS",
    "PAT",
    "PBC",
    "PBP",
    "PBT",
    "PC1",
    "PCC",
    "PCE",
    "PCF",
    "PCG",
    "PCH",
    "PCM",
    "PCN",
    "PCT",
    "PDB",
    "PDC",
    "PDN",
    "PDR",
    "PDV",
    "PEC",
    "PEG",
    "PEN",
    "PEQ",
    "PET",
    "PFL",
    "PGB",
    "PGC",
    "PGD",
    "PGN",
    "PGS",
    "PGT",
    "PGV",
    "PHC",
    "PHH",
    "PHN",
    "PHP",
    "PHR",
    "PHS",
    "PIA",
    "PIC",
    "PID",
    "PIS",
    "PIT",
    "PIV",
    "PJC",
    "PJS",
    "PJT",
    "PLA",
    "PLC",
    "PLE",
    "PLO",
    "PLP",
    "PLX",
    "PMB",
    "PMC",
    "PMG",
    "PMJ",
    "PMP",
    "PMS",
    "PMT",
    "PMW",
    "PNC",
    "PND",
    "PNG",
    "PNJ",
    "PNP",
    "PNT",
    "POB",
    "POM",
    "POS",
    "POT",
    "POV",
    "POW",
    "PPC",
    "PPE",
    "PPH",
    "PPI",
    "PPP",
    "PPS",
    "PPT",
    "PPY",
    "PQN",
    "PRC",
    "PRE",
    "PRO",
    "PRT",
    "PSB",
    "PSC",
    "PSD",
    "PSE",
    "PSG",
    "PSH",
    "PSI",
    "PSL",
    "PSN",
    "PSP",
    "PSW",
    "PTB",
    "PTC",
    "PTD",
    "PTE",
    "PTG",
    "PTH",
    "PTI",
    "PTL",
    "PTN",
    "PTO",
    "PTP",
    "PTS",
    "PTT",
    "PTV",
    "PTX",
    "PV2",
    "PVA",
    "PVB",
    "PVC",
    "PVD",
    "PVE",
    "PVG",
    "PVH",
    "PVI",
    "PVL",
    "PVM",
    "PVO",
    "PVP",
    "PVR",
    "PVS",
    "PVT",
    "PVV",
    "PVX",
    "PVY",
    "PWA",
    "PWS",
    "PX1",
    "PXA",
    "PXC",
    "PXI",
    "PXL",
    "PXM",
    "PXS",
    "PXT",
    "QBS",
    "QCC",
    "QCG",
    "QHD",
    "QHW",
    "QNC",
    "QNS",
    "QNT",
    "QNU",
    "QNW",
    "QPH",
    "QSP",
    "QST",
    "QTC",
    "QTP",
    "RAL",
    "RAT",
    "RBC",
    "RCC",
    "RCD",
    "RCL",
    "RDP",
    "REE",
    "RGC",
    "RIC",
    "RTB",
    "S12",
    "S27",
    "S55",
    "S72",
    "S74",
    "S96",
    "S99",
    "SAB",
    "SAC",
    "SAF",
    "SAL",
    "SAM",
    "SAP",
    "SAS",
    "SAV",
    "SB1",
    "SBA",
    "SBD",
    "SBH",
    "SBL",
    "SBM",
    "SBR",
    "SBS",
    "SBT",
    "SBT121002",
    "SBV",
    "SCC",
    "SCD",
    "SCG",
    "SCI",
    "SCJ",
    "SCL",
    "SCO",
    "SCR",
    "SCS",
    "SCY",
    "SD1",
    "SD2",
    "SD3",
    "SD4",
    "SD5",
    "SD6",
    "SD7",
    "SD8",
    "SD9",
    "SDA",
    "SDB",
    "SDC",
    "SDD",
    "SDG",
    "SDJ",
    "SDK",
    "SDN",
    "SDP",
    "SDT",
    "SDU",
    "SDV",
    "SDX",
    "SDY",
    "SEA",
    "SEB",
    "SED",
    "SEP",
    "SFG",
    "SFI",
    "SFN",
    "SGB",
    "SGC",
    "SGD",
    "SGH",
    "SGI",
    "SGN",
    "SGO",
    "SGP",
    "SGR",
    "SGS",
    "SGT",
    "SHA",
    "SHB",
    "SHC",
    "SHE",
    "SHG",
    "SHI",
    "SHN",
    "SHP",
    "SHS",
    "SHX",
    "SIC",
    "SID",
    "SIG",
    "SII",
    "SIP",
    "SIV",
    "SJ1",
    "SJC",
    "SJD",
    "SJE",
    "SJF",
    "SJG",
    "SJM",
    "SJS",
    "SKG",
    "SKH",
    "SKN",
    "SKV",
    "SLS",
    "SMA",
    "SMB",
    "SMC",
    "SMN",
    "SMT",
    "SNC",
    "SNZ",
    "SP2",
    "SPB",
    "SPC",
    "SPD",
    "SPH",
    "SPI",
    "SPM",
    "SPV",
    "SQC",
    "SRA",
    "SRB",
    "SRC",
    "SRF",
    "SRT",
    "SSB",
    "SSC",
    "SSF",
    "SSG",
    "SSH",
    "SSI",
    "SSM",
    "SSN",
    "ST8",
    "STB",
    "STC",
    "STG",
    "STH",
    "STK",
    "STL",
    "STP",
    "STS",
    "STT",
    "STW",
    "SVC",
    "SVD",
    "SVG",
    "SVH",
    "SVI",
    "SVN",
    "SVT",
    "SWC",
    "SZB",
    "SZC",
    "SZE",
    "SZG",
    "SZL",
    "TA3",
    "TA6",
    "TA9",
    "TAN",
    "TAR",
    "TAW",
    "TB8",
    "TBC",
    "TBD",
    "TBH",
    "TBR",
    "TBT",
    "TBX",
    "TC6",
    "TCB",
    "TCD",
    "TCH",
    "TCI",
    "TCJ",
    "TCK",
    "TCL",
    "TCM",
    "TCO",
    "TCR",
    "TCT",
    "TCW",
    "TDB",
    "TDC",
    "TDF",
    "TDG",
    "TDH",
    "TDI",
    "TDM",
    "TDN",
    "TDP",
    "TDS",
    "TDT",
    "TED",
    "TEG",
    "TEL",
    "TET",
    "TFC",
    "TGG",
    "TGP",
    "TH1",
    "THB",
    "THD",
    "THG",
    "THI",
    "THN",
    "THP",
    "THS",
    "THT",
    "THU",
    "THW",
    "TID",
    "TIE",
    "TIG",
    "TIN",
    "TIP",
    "TIS",
    "TJC",
    "TKA",
    "TKC",
    "TKG",
    "TKU",
    "TL4",
    "TLD",
    "TLG",
    "TLH",
    "TLI",
    "TLP",
    "TLT",
    "TMB",
    "TMC",
    "TMG",
    "TMP",
    "TMS",
    "TMT",
    "TMW",
    "TMX",
    "TN1",
    "TN1122016",
    "TNA",
    "TNB",
    "TNC",
    "TNG",
    "TNG122017",
    "TNH",
    "TNI",
    "TNM",
    "TNP",
    "TNS",
    "TNT",
    "TNW",
    "TOP",
    "TOS",
    "TOT",
    "TOW",
    "TPB",
    "TPC",
    "TPH",
    "TPP",
    "TPS",
    "TQN",
    "TQW",
    "TR1",
    "TRC",
    "TRS",
    "TRT",
    "TS3",
    "TS4",
    "TSB",
    "TSC",
    "TSD",
    "TSG",
    "TSJ",
    "TST",
    "TTA",
    "TTB",
    "TTC",
    "TTD",
    "TTE",
    "TTF",
    "TTG",
    "TTH",
    "TTL",
    "TTN",
    "TTP",
    "TTS",
    "TTT",
    "TTZ",
    "TUG",
    "TV1",
    "TV2",
    "TV3",
    "TV4",
    "TV6",
    "TVA",
    "TVB",
    "TVC",
    "TVD",
    "TVG",
    "TVH",
    "TVM",
    "TVN",
    "TVP",
    "TVS",
    "TVT",
    "TVW",
    "TW3",
    "TXM",
    "TYA",
    "UCT",
    "UDC",
    "UDJ",
    "UDL",
    "UEM",
    "UIC",
    "UMC",
    "UNI",
    "UPC",
    "UPH",
    "USC",
    "USD",
    "V11",
    "V12",
    "V15",
    "V21",
    "VAB",
    "VAV",
    "VBA121033",
    "VBA122001",
    "VBB",
    "VBC",
    "VBG",
    "VBH",
    "VC1",
    "VC2",
    "VC3",
    "VC5",
    "VC6",
    "VC7",
    "VC9",
    "VCA",
    "VCB",
    "VCC",
    "VCE",
    "VCG",
    "VCI",
    "VCM",
    "VCP",
    "VCR",
    "VCS",
    "VCT",
    "VCW",
    "VCX",
    "VDB",
    "VDL",
    "VDN",
    "VDP",
    "VDS",
    "VDT",
    "VE1",
    "VE2",
    "VE3",
    "VE4",
    "VE8",
    "VE9",
    "VEA",
    "VEC",
    "VEF",
    "VES",
    "VET",
    "VFC",
    "VFG",
    "VFR",
    "VFS",
    "VGC",
    "VGG",
    "VGI",
    "VGL",
    "VGP",
    "VGR",
    "VGS",
    "VGT",
    "VGV",
    "VHC",
    "VHD",
    "VHE",
    "VHF",
    "VHG",
    "VHH",
    "VHL",
    "VHM",
    "VHM121024",
    "VHM121025",
    "VIB",
    "VIC",
    "VIC121003",
    "VIC121004",
    "VIC121005",
    "VID",
    "VIE",
    "VIF",
    "VIG",
    "VIH",
    "VIM",
    "VIN",
    "VIP",
    "VIR",
    "VIT",
    "VIW",
    "VIX",
    "VJC",
    "VKC",
    "VKP",
    "VLA",
    "VLB",
    "VLC",
    "VLF",
    "VLG",
    "VLP",
    "VLW",
    "VMA",
    "VMC",
    "VMD",
    "VMG",
    "VMS",
    "VMT",
    "VN100",
    "VN30",
    "VN30F2306",
    "VN30F2307",
    "VN30F2309",
    "VN30F2312",
    "VNA",
    "VNALL",
    "VNB",
    "VNC",
    "VNCOND",
    "VNCONS",
    "VND",
    "VND122013",
    "VND122014",
    "VNDIAMOND",
    "VNE",
    "VNENE",
    "VNF",
    "VNFIN",
    "VNFINLEAD",
    "VNFINSELECT",
    "VNG",
    "VNG122002",
    "VNH",
    "VNHEAL",
    "VNI",
    "VNIND",
    "VNINDEX",
    "VNIT",
    "VNL",
    "VNM",
    "VNMAT",
    "VNMID",
    "VNP",
    "VNR",
    "VNREAL",
    "VNS",
    "VNSI",
    "VNSML",
    "VNT",
    "VNUTI",
    "VNX",
    "VNX50",
    "VNXALL",
    "VNY",
    "VNZ",
    "VOC",
    "VOS",
    "VPA",
    "VPB",
    "VPC",
    "VPD",
    "VPG",
    "VPH",
    "VPI",
    "VPR",
    "VPS",
    "VPW",
    "VQC",
    "VRC",
    "VRE",
    "VRE12007",
    "VRG",
    "VSA",
    "VSC",
    "VSE",
    "VSF",
    "VSG",
    "VSH",
    "VSI",
    "VSM",
    "VSN",
    "VST",
    "VTA",
    "VTB",
    "VTC",
    "VTD",
    "VTE",
    "VTG",
    "VTH",
    "VTI",
    "VTJ",
    "VTK",
    "VTM",
    "VTO",
    "VTP",
    "VTQ",
    "VTR",
    "VTS",
    "VTV",
    "VTX",
    "VTZ",
    "VUA",
    "VVN",
    "VVS",
    "VW3",
    "VWS",
    "VXB",
    "VXP",
    "VXT",
    "WCS",
    "WSB",
    "WSS",
    "WTC",
    "X20",
    "X26",
    "X77",
    "XDC",
    "XDH",
    "XHC",
    "XLV",
    "XMC",
    "XMD",
    "XMP",
    "XPH",
    "YBC",
    "YBM",
    "YEG",
    "YTC",
  ]);
  const [listSymbolPicked, setListSymbolPicked] = useState([]);
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
  const handleCloseLoading = () => {
    setIsLoading(false);
  };
  const handleToggle = () => {
    setIsLoading(!isLoading);
  };

  const handleClickListItem = (event: any, item: any) => {
    setAnchorEl(event.currentTarget);
    setCurrentChangeTieuChi(item);
  };
  const handleClickListBoolean = (event: any, item: any) => {
    setAnchorElBoolean(event.currentTarget);
    setCurrentChangeBoolean(item);
  };
  const handleClickListItemPercent = (event: any, item: any) => {
    setAnchorEl(event.currentTarget);
    setCurrentChangePercent(item);
  };
  const handleClickListItemSession = (event: any, item: any) => {
    setAnchorElSession(event.currentTarget);
    setCurrentChangeSession(item);
  };
  const handleClickListItemLeft = (event: any, item: any) => {
    setAnchorElLeft(event.currentTarget);
    setCurrentChangeTieuChiLeft(item);
  };
  const handleClickListItemRight = (event: any, item: any) => {
    setAnchorElRight(event.currentTarget);
    setCurrentChangeTieuChiRight(item);
  };
  const handleClickListItemInterval = (event: any, item: any) => {
    setAnchorElInterval(event.currentTarget);
    setCurrentChangeTieuChiInterval(item);
  };
  const handleClickQuy = (e: any, item: any) => {
    setAnchorQuy(e.currentTarget);
    setCurrentChangeTieuChiQuy(item);
  };
  const handleChangeSelectIndex = (
    tieuChiPicked: any,
    value: any,
    indexType: any
  ) => {
    const newListTieuChiPicked = listTieuChiPicked.map(
      (item: any, index: any) => {
        if (index === tieuChiPicked) {
          return {
            ...item,
            [indexType]: value,
          };
        } else {
          return item;
        }
      }
    );
    setListTieuChiPicked(newListTieuChiPicked);
    setAnchorEl(null);
    setAnchorElLeft(null);
    setAnchorElRight(null);
    setAnchorElInterval(null);
  };

  const handleMenuItemClick = (event: any, index: any) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseBoolean = () => {
    setAnchorElBoolean(null);
  };
  const handleCloseSession = () => {
    setAnchorElSession(null);
  };
  const handleClosePercent = () => {
    setAnchorElPercent(null);
  };
  const handleCloseLeft = () => {
    setAnchorElLeft(null);
  };
  const handleCloseRight = () => {
    setAnchorElRight(null);
  };
  const handleCloseInterval = () => {
    setAnchorElInterval(null);
  };
  const handleCloseMonth = () => {
    setAnchorQuy(null);
  };

  const handleClearTieuChi = (state: any) => {
    console.log("state: ", state);
    const itemToRemove = listTieuChiPicked[state];
    console.log("itemToRemove: ", itemToRemove);
    const newListTieuChiPicked = listTieuChiPicked.filter(
      (item: any, index: any) => index !== state
    );
    setListTieuChiPicked(newListTieuChiPicked);
    switch (itemToRemove.category) {
      case "nhomThongDung":
        setPickerPopular((prev) => (prev ?? 0) - 1);
      case "nhomCoBan":
        setPickerBasic((prev) => (prev ?? 0) - 1);
      case "bienDongGia":
        setPickerFluctuation((prev) => (prev ?? 0) - 1);
        break;
      case "nhomChiBaoKyThuat":
        setPickerTechnique((prev) => (prev ?? 0) - 1);
        break;
      case "bolocCuaToi":
        setPickerMyFilter((prev) => (prev ?? 0) - 1);
        break;
      // ... nếu có thêm popular hay basic thì thêm case nữa
      default:
        break;
    }
  };
  const scrollToBottom = () => {
    const lastChildElement = bottomEl.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  useEffect(() => {
    // onFilter();
    //get localStorage filterData
    const filterData = JSON.parse(localStorage.getItem("filterData"));
    const filterColumn = JSON.parse(localStorage.getItem("filterColumns"));
    const totalResult = JSON.parse(localStorage.getItem("totalResult"));

    const newListMap = filterColumn?.map((item, index) => {
      let textColor;
      if (item?.title === "Sàn CK") {
        textColor = "rgba(66, 167, 50, 1)";
      }
      if (item?.title === "Nhóm ngành") {
        textColor = "rgba(53, 148, 239, 1)";
      }

      if (item?.title.includes("%")) {
        // Xử lý cho trường hợp title có ký tự '%'
        return {
          ...item,
          render: (value) => {
            // Xử lý value như một giá trị phần trăm
            let valueString = ConvertNumber(value * 100) + " %";
            return <div>{valueString}</div>;
          },
        };
      } else if (
        item?.title === "MÃ" ||
        item?.title === "Nhóm ngành" ||
        item?.title === "#" ||
        item?.title === "Sàn CK"
      ) {
        // Xử lý cho các trường hợp khác
        return {
          ...item,
          render: (value, record, index) => {
            return (
              <div>
                {item?.title === "MÃ" ? (
                  <a>{value}</a>
                ) : (
                  <div style={{ color: textColor, fontWeight: 400 }}>
                    {value}
                  </div>
                )}
              </div>
            );
          },
        };
      } else {
        // Xử lý mặc định
        return {
          ...item,
          render: (value) => {
            let valueString = ConvertNumber(value);
            return <div>{valueString}</div>;
          },
        };
      }
    });
    setColumns(newListMap);
    setRows(filterData);
    setTotalResult(totalResult);
  }, [tabMenuTarget]);

  const onFilter = async () => {
    setLoading(true);
    const faFilter = [];
    const fAFilterSub = [];
    const faKeys = [];
    const parameters = [
      {
        name: "Giá",
        code: "ClosePrice",
        type: "Range",
        selectedValue: [200, 1000000],
        valueRange: [200, 1000000],
        unit: "VND",
      },
    ];
    const booleanFilter = [
      {
        key: `AvailableForFASearching`,
        value: true,
      },
    ];

    for (let i = 0; i < listTieuChiPicked.length; i++) {
      const tieuChi = listTieuChiPicked[i];
      switch (tieuChi.label) {
        case "Biến động giá 1 ngày":
          parameters.push({
            name: "Biến động giá 1 ngày",
            code: "PercentPriceChange1Day",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biến động giá 1 tuần":
          parameters.push({
            name: "Biến động giá 1 tuần",
            code: "PercentPriceChange1Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biến động giá 1 tháng":
          parameters.push({
            name: "Biến động giá 1 tháng",
            code: "PercentPriceChange1Month",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biến động giá 3 tháng":
          parameters.push({
            name: "Biến động giá 3 tháng",
            code: "PercentPriceChange3Month",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biến động giá 6 tháng":
          parameters.push({
            name: "Biến động giá 6 tháng",
            code: "PercentPriceChange6Month",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biến động giá 52 tuần":
          parameters.push({
            name: "Biến động giá 52 tuần",
            code: "PercentPriceChange52Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biến động giá từ đầu năm":
          parameters.push({
            name: "Biến động giá từ đầu năm",
            code: "PercentPriceChangeYTD",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Khối lượng GD":
          parameters.push({
            name: "Khối lượng GD",
            code: "TotalMatchVolum",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
        case "Kl T.bình 5 phiên":
          parameters.push({
            name: "Kl T.bình 5 phiên",
            code: "AverageVolume1Week",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
        case "Kl T.bình 10 phiên":
          parameters.push({
            name: "Kl T.bình 10 phiên",
            code: "AverageVolume2Week",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
        case "Kl T.bình 20 phiên":
          parameters.push({
            name: "Kl T.bình 20 phiên",
            code: "AverageVolume1Month",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
        case "Kl T.bình 3 tháng":
          parameters.push({
            name: "Kl T.bình 3 tháng",
            code: "AverageVolume3Month",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
        case "% Free Float":
          parameters.push({
            name: "% Free Float",
            code: "FreeFloatRate",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] / 100),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] / 100),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
        case "Giá trị GD":
          parameters.push({
            name: "Giá trị GD",
            code: "TotalMatchValue",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
        case "Giá trị GD T.bình 5D":
          parameters.push({
            name: "Giá trị GD T.bình 5D",
            code: "AverageValue1Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
        case "Giá trị GD T.bình 10D":
          parameters.push({
            name: "Giá trị GD T.bình 10D",
            code: "AverageValue2Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
        case "Giá trị GD T.bình 20D":
          parameters.push({
            name: "Giá trị GD T.bình 20D",
            code: "AverageValue2Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
        case "Giá trị GD T.bình 3M":
          parameters.push({
            name: "Giá trị GD T.bình 3M",
            code: "AverageValue3Month",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
        case "Vốn hóa":
          parameters.push({
            name: "Vốn hóa",
            code: "Rtd11",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
        case "Giá":
          parameters.push({
            name: "Giá",
            code: "ClosePrice",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
        case "P/E - fin (TTM)":
          parameters.push({
            name: "P/E (TTM)",
            code: "Rtd21",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "P/S - fin (TTM)":
          parameters.push({
            name: "P/S (TTM)",
            code: "Rtd26",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "P/B (TTM)":
          parameters.push({
            name: "P/B (TTM)",
            code: "Rtd25",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Giá - Dòng Tiền (TTM)":
          parameters.push({
            name: "Giá - Dòng Tiền (TTM)",
            code: "Rtd28",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Giá - Dòng Tiền Tự Do (TTM)":
          parameters.push({
            name: "Giá - Dòng Tiền Tự Do (TTM)",
            code: "Rtd40",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Giá - T.sản hữu hình (TTM)":
          parameters.push({
            name: "Giá - T.sản hữu hình (TTM)",
            code: "Rtd27",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "EPS - fin (TTM)":
          parameters.push({
            name: "EPS (TTM)",
            code: "Rtd14",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Doanh thu (tỉ đồng) (TTM)":
          parameters.push({
            name: "Doanh thu (tỉ đồng) (TTM)",
            code: "RevTTM",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
        case "LN ròng (tỉ đồng) (TTM)":
          parameters.push({
            name: "LN ròng (tỉ đồng) (TTM)",
            code: "Isa20TTM",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
        case "Doanh thu (tỉ đồng) (năm trước)":
          parameters.push({
            name: "Doanh thu (tỉ đồng) (năm trước)",
            code: "RevY",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
        case "LN ròng (tỉ đồng) (năm trước)":
          parameters.push({
            name: "LN ròng (tỉ đồng) (năm trước)",
            code: "Isa20Y",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
        case "Doanh thu (quý gần nhất)":
          parameters.push({
            name: "Doanh thu (quý gần nhất)",
            code: "Rev",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
        case "Lợi nhuận thuần (quý gần nhất)":
          parameters.push({
            name: "Lợi nhuận thuần (quý gần nhất)",
            code: "Prf",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
        case "T.trưởng D.thu (YoY)":
          parameters.push({
            name: "T.trưởng D.thu (YoY)",
            code: "Rtq78",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "T.trưởng LN gộp (YoY)":
          parameters.push({
            name: "T.trưởng LN gộp (YoY)",
            code: "Rtq79",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "T.trưởng LN ròng (YoY)":
          parameters.push({
            name: "T.trưởng LN ròng (YoY)",
            code: "Rtq83",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "T.trưởng K.doanh 3 năm":
          parameters.push({
            name: "T.trưởng K.doanh 3 năm",
            code: "Ryq160",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "T.trưởng LN ròng 3 năm":
          parameters.push({
            name: "T.trưởng LN ròng 3 năm",
            code: "Ryq166",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "T.trưởng vốn CSH 3 năm":
          parameters.push({
            name: "T.trưởng vốn CSH 3 năm",
            code: "Ryq176",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "T.trưởng EPS (TTM)":
          parameters.push({
            name: "T.trưởng EPS (TTM)",
            code: "Rtd52",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Tăng trưởng doanh thu quý gần nhất (YoY)":
          parameters.push({
            name: "Tăng trưởng doanh thu quý gần nhất (YoY)",
            code: "RevGrowth",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Tăng trưởng lợi nhuận thuần quý gần nhất (YoY)":
          parameters.push({
            name: "Tăng trưởng lợi nhuận thuần quý gần nhất (YoY)",
            code: "PrfGrowth",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "ROE (TTM)":
          parameters.push({
            name: "ROE (TTM)",
            code: "Rtq12",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "ROA (TTM)":
          parameters.push({
            name: "ROA (TTM)",
            code: "Rtq14",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biên LN gộp (TTM)":
          parameters.push({
            name: "Biên LN gộp (TTM)",
            code: "Rtq25",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biên LN gộp (quý)":
          parameters.push({
            name: "Biên LN gộp (quý)",
            code: "Rqq25",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biên LN gộp (năm gần nhất)":
          parameters.push({
            name: "Biên LN gộp (năm gần nhất)",
            code: "Ryq25",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biên LN ròng (TTM)":
          parameters.push({
            name: "Biên LN ròng (TTM)",
            code: "Rtq29",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biên LN ròng (quý)":
          parameters.push({
            name: "Biên LN ròng (quý)",
            code: "Rqq29",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biên LN ròng (năm gần nhất)":
          parameters.push({
            name: "Biên LN ròng (năm gần nhất)",
            code: "Ryq29",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biên EBIT (TTM)":
          parameters.push({
            name: "Biên EBIT (TTM)",
            code: "Rtq27",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Biên EBIT (quý)":
          parameters.push({
            name: "Biên EBIT (quý)",
            code: "Rqq27",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "ROIC (quý)":
          parameters.push({
            name: "ROIC (quý)",
            code: "Rqq23",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Nợ phải trả/ Tổng tài sản (TTM)":
          parameters.push({
            name: "Nợ phải trả/ Tổng tài sản (TTM)",
            code: "Rtq7",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Nợ phải trả/ Vốn chủ sở hữu (TTM)":
          parameters.push({
            name: "Nợ phải trả/ Vốn chủ sở hữu (TTM)",
            code: "Rtq6",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Nợ dài hạn/ Vốn chủ sở hữu (TTM)":
          parameters.push({
            name: "Nợ dài hạn/ Vốn chủ sở hữu (TTM)",
            code: "Rtq4",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Nợ phải trả/ Vốn chủ sở hữu (quý)":
          parameters.push({
            name: "Nợ phải trả/ Vốn chủ sở hữu (quý)",
            code: "Rqq6",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Tỉ suất thanh toán hiện hành (TTM)":
          parameters.push({
            name: "Tỉ suất thanh toán hiện hành (TTM)",
            code: "Rtq3",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Tỉ suất thanh toán nhanh (TTM)":
          parameters.push({
            name: "Tỉ suất thanh toán nhanh (TTM)",
            code: "Rtq2",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Tỉ suất thanh toán tiền mặt (TTM)":
          parameters.push({
            name: "Tỉ suất thanh toán tiền mặt (TTM)",
            code: "Rtq1",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Khả năng chi trả lãi vay (TTM)":
          parameters.push({
            name: "Khả năng chi trả lãi vay (TTM)",
            code: "Rtq77",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Tỉ lệ tổ chức sở hữu":
          parameters.push({
            name: "Tỉ lệ tổ chức sở hữu",
            code: "CorpOwnership",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Sở hữu nước ngoài":
          parameters.push({
            name: "Sở hữu nước ngoài",
            code: "ForeignerPercentage",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Room nước ngoài":
          parameters.push({
            name: "Room nước ngoài",
            code: "ForeignerRoom",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Cổ Tức":
          parameters.push({
            name: "Cổ Tức",
            code: "Rtd43",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Tỉ Suất Cổ Tức":
          parameters.push({
            name: "Tỉ Suất Cổ Tức",
            code: "Rtd20",
            type: "Range",
            sselectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Tỉ Suất Cổ Tức T.Bình 3 Năm":
          parameters.push({
            name: "Tỉ Suất Cổ Tức T.Bình 3 Năm",
            code: "Rtd20Avg",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "Tỉ Lệ Chi Trả Cổ Tức":
          parameters.push({
            name: "Tỉ Lệ Chi Trả Cổ Tức",
            code: "Rtd51",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
        case "RSI":
          parameters.push({
            name: "RSI",
            code: "Rsi",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "ADX":
          parameters.push({
            name: "ADX",
            code: "Rsi",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "CCI":
          parameters.push({
            name: "CCI",
            code: "Cci",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "ROC":
          parameters.push({
            name: "ROC",
            code: "Roc",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "STOCH":
          parameters.push({
            name: "STOCH",
            code: "Stochastic",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Williams":
          parameters.push({
            name: "Williams",
            code: "Williams",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "MFI":
          parameters.push({
            name: "MFI",
            code: "Mfi",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
        case "Giá trị giao dịch ròng của NĐTNN":
          let curSession = 0;
          switch (tieuChi.session) {
            case 0:
              curSession = 5;
              break;
            case 1:
              curSession = 10;
              break;
            case 2:
              curSession = 20;
              break;
            case 3:
              curSession = 60;
              break;
            case 4:
              curSession = 120;
              break;

            default:
              break;
          }

          fAFilterSub.push({
            key: `ForeignBuySellValue_${curSession}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Biên độ giá đóng cửa theo số phiên (%)":
          let curSession1 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession1 = 5;
              break;
            case 1:
              curSession1 = 10;
              break;
            case 2:
              curSession1 = 20;
              break;
            case 3:
              curSession1 = 60;
              break;
            case 4:
              curSession1 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `BienDoGia_${curSession1}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Biên độ giá High - Low theo số phiên (%)":
          let curSession2 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession2 = 5;
              break;
            case 1:
              curSession2 = 10;
              break;
            case 2:
              curSession2 = 20;
              break;
            case 3:
              curSession2 = 60;
              break;
            case 4:
              curSession2 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `BienDoGiaHighLow_${curSession2}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "P/E (TTM)":
          faFilter.push({
            key: `PE`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "EPS (TTM)":
          faFilter.push({
            key: `Eps_TTM`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Vốn hoá":
          faFilter.push({
            key: `MarketCap`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;

        case "Fscore":
          faFilter.push({
            key: `Fscore`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Mscore":
          faFilter.push({
            key: `Mscore`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Zscore":
          faFilter.push({
            key: `Zscore`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;

        case "Tỷ suất cổ tức năm gần nhất":
          faFilter.push({
            key: `DividendYield_LastYear`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "KLTB 3 tháng":
          faFilter.push({
            key: `AvgVol3M`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "RS1m (1 tháng)":
          faFilter.push({
            key: `RS1M`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "RS3m (3 tháng)":
          faFilter.push({
            key: `RS3M`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "RS6m (6 tháng)":
          faFilter.push({
            key: `RS6M`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "RS52w (52 tuần)":
          faFilter.push({
            key: `RS52W`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Khối lượng":
          faFilter.push({
            key: `TotalDealVol`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Giá trị giao dịch":
          faFilter.push({
            key: `TotalDealValue`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;

        case "Khối lượng Trung bình theo số phiên":
          let curSession3 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession3 = 5;
              break;
            case 1:
              curSession3 = 10;
              break;
            case 2:
              curSession3 = 20;
              break;
            case 3:
              curSession3 = 60;
              break;
            case 4:
              curSession3 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `TotalVolumeAvg_${curSession3}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Giá trị giao dịch Trung bình theo phiên":
          let curSession4 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession4 = 5;
              break;
            case 1:
              curSession4 = 10;
              break;
            case 2:
              curSession4 = 20;
              break;
            case 3:
              curSession4 = 60;
              break;
            case 4:
              curSession4 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `TotalDealValueAvg_${curSession4}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)":
          let key = "";
          switch (tieuChi.month) {
            case 0:
              key = "Profit_MRQ_FH";
              break;
            case 1:
              key = "Profit_MRQ_2_FH";
              break;
            case 2:
              key = "Profit_TTM_FH";
              break;
            case 3:
              key = "Profit_MRY_FH";
              break;

            default:
              break;
          }
          faKeys.push(key);
          break;
        case "EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)":
          let key1 = "";
          switch (tieuChi.month) {
            case 0:
              key1 = "Eps_MRQ_FH";
              break;
            case 1:
              key1 = "Eps_MRQ_2_FH";
              break;
            case 2:
              key1 = "Eps_TTM_FH";
              break;
            case 3:
              key1 = "Eps_MRY_FH";
              break;

            default:
              break;
          }
          faKeys.push(key1);
          break;
        case "Tăng trưởng doanh thu Quý gần nhất (%)":
          faFilter.push({
            key: `NetSale_Growth_MRQ`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng doanh thu Quý gần nhì (%)":
          faFilter.push({
            key: `NetSale_Growth_MRQ_2`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng doanh thu 4 Quý gần nhất (%)":
          faFilter.push({
            key: `NetSale_Growth_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng doanh thu Năm gần nhất (%)":
          faFilter.push({
            key: `NetSale_Growth_MRY`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng doanh thu Bình quân 3 năm (%)":
          faFilter.push({
            key: `NetSale_Growth_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)":
          faFilter.push({
            key: `NetSale_Growth_TTM_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng lợi nhuận Quý gần nhất (%)":
          faFilter.push({
            key: `Profit_Growth_MRQ`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng lợi nhuận Quý gần nhì (%)":
          faFilter.push({
            key: `Profit_Growth_MRQ_2`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng LN 4 Quý gần nhất (%)":
          faFilter.push({
            key: `Profit_Growth_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng LN Năm gần nhất (%)":
          faFilter.push({
            key: `Profit_Growth_MRY`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng LN Bình quân 3 năm (%)":
          faFilter.push({
            key: `Profit_Growth_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng LN Bình quân 3 năm (% - TTM)":
          faFilter.push({
            key: `Profit_Growth_TTM_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng EPS Quý gần nhất (%)":
          faFilter.push({
            key: `Eps_Growth_MRQ`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng EPS Quý gần nhì (%)":
          faFilter.push({
            key: `Eps_Growth_MRQ_2`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng EPS 4 Quý gần nhất (%)":
          faFilter.push({
            key: `Eps_Growth_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng EPS Năm gần nhất (%)":
          faFilter.push({
            key: `Eps_Growth_MRY`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng EPS Bình quân 3 năm (%)":
          faFilter.push({
            key: `Eps_Growth_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng EPS Bình quân 3 năm (% - TTM)":
          faFilter.push({
            key: `Eps_Growth_TTM_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;

        case "P/S (TTM)":
          faFilter.push({
            key: `PS`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "P/B (MRQ)":
          faFilter.push({
            key: `PB`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Vòng quay tổng tài sản (TTM)":
          faFilter.push({
            key: `ME_AssetTurnover`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Vòng quay hàng tồn kho (TTM)":
          faFilter.push({
            key: `ME_InventoryTurnover`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Vòng quay các khoản phải thu (TTM)":
          faFilter.push({
            key: `ME_ReceivableTurnover`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "ROE (%)":
          faFilter.push({
            key: `ME_ROE`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "ROA (%)":
          faFilter.push({
            key: `ME_ROA`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Giá cuối":
          faFilter.push({
            key: `LastPrice`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Cao nhất 52 tuần":
          faFilter.push({
            key: `AdjHigh52W`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Thấp nhất 52 tuần":
          faFilter.push({
            key: `AdjLow52W`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Thay đổi trong 52 tuần":
          faFilter.push({
            key: `Change52W`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "% thay đổi 1 tháng":
          faFilter.push({
            key: `ChangePercent1M`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "% Thay đổi từ đầu năm":
          faFilter.push({
            key: `ChangePercentYTD`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "% Thay đổi từ đáy 52 tuần":
          faFilter.push({
            key: `AdjLow52W_PercentChange`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "% Thay đổi từ đỉnh 52 tuần":
          faFilter.push({
            key: `AdjHigh52W_PercentChange`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "% thay đổi giá đóng cửa theo số phiên":
          let curSession5 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession5 = 5;
              break;
            case 1:
              curSession5 = 10;
              break;
            case 2:
              curSession5 = 20;
              break;
            case 3:
              curSession5 = 60;
              break;
            case 4:
              curSession5 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `ChangePercent_${curSession5}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Biến động trong ngày (%)":
          faFilter.push({
            key: `PriceChangePercent`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;

        // case 'Giá trị giao dịch':
        //   faFilter.push({
        //     key: `TotalDealValue`,
        //     value: {
        //       min: tieuChi.rightIndexValue[0].toString(),
        //       max: tieuChi.rightIndexValue[1].toString(),
        //     },
        //   });
        //   break;
        case "Beta":
          faFilter.push({
            key: `Beta`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Vượt đỉnh 1 tuần":
          let price = "";
          let day = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price = "Giá (Close)";
              break;
            case 1:
              price = "Giá (Low)";
              break;
            case 2:
              price = "Giá (Average)";
              break;
            case 3:
              price = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day = "1 ngày";
              break;
            case 1:
              day = "1 tuần";
              break;

            default:
              break;
          }
          if (price === "Giá (Close)" && day === "1 ngày") {
            faKeys.push("Close_VUOT_Top1W_Daily");
          } else if (price === "Giá (Close)" && day === "1 tuần") {
            faKeys.push("Close_VUOT_Top1W_Weekly");
          } else if (price === "Giá (High)" && day === "1 ngày") {
            faKeys.push("High_VUOT_Top1W_Daily");
          } else if (price === "Giá (High)" && day === "1 tuần") {
            faKeys.push("High_VUOT_Top1W_Weekly");
          } else if (price === "Giá (Low)" && day === "1 ngày") {
            faKeys.push("Low_VUOT_Top1W_Daily");
          } else if (price === "Giá (Low)" && day === "1 tuần") {
            faKeys.push("Low_VUOT_Top1W_Weekly");
          } else if (price === "Giá (Average)" && day === "1 ngày") {
            faKeys.push("AvgHL_VUOT_Top1W_Daily");
          } else if (price === "Giá (Average)" && day === "1 tuần") {
            faKeys.push("AvgHL_VUOT_Top1W_Weekly");
          } else if (price === "Average (H,L,C)" && day === "1 ngày") {
            faKeys.push("AvgHLC_VUOT_Top1W_Daily");
          } else if (price === "Average (H,L,C)" && day === "1 tuần") {
            faKeys.push("AvgHLC_VUOT_Top1W_Weekly");
          }
          break;
        case "Vượt đỉnh 4 tuần":
          let price1 = "";
          let day1 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price1 = "Giá (Close)";
              break;
            case 1:
              price1 = "Giá (Low)";
              break;
            case 2:
              price1 = "Giá (Average)";
              break;
            case 3:
              price1 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day1 = "1 ngày";
              break;
            case 1:
              day1 = "1 tuần";
              break;

            default:
              break;
          }
          if (price1 === "Giá (Close)" && day1 === "1 ngày") {
            faKeys.push("Close_VUOT_Top4W_Daily");
          } else if (price1 === "Giá (Close)" && day1 === "1 tuần") {
            faKeys.push("Close_VUOT_Top4W_Weekly");
          } else if (price1 === "Giá (High)" && day1 === "1 ngày") {
            faKeys.push("High_VUOT_Top4W_Daily");
          } else if (price1 === "Giá (High)" && day1 === "1 tuần") {
            faKeys.push("High_VUOT_Top4W_Weekly");
          } else if (price1 === "Giá (Low)" && day1 === "1 ngày") {
            faKeys.push("Low_VUOT_Top4W_Daily");
          } else if (price1 === "Giá (Low)" && day1 === "1 tuần") {
            faKeys.push("Low_VUOT_Top4W_Weekly");
          } else if (price1 === "Giá (Average)" && day1 === "1 ngày") {
            faKeys.push("AvgHL_VUOT_Top4W_Daily");
          } else if (price1 === "Giá (Average)" && day1 === "1 tuần") {
            faKeys.push("AvgHL_VUOT_Top4W_Weekly");
          } else if (price1 === "Average (H,L,C)" && day1 === "1 ngày") {
            faKeys.push("AvgHLC_VUOT_Top4W_Daily");
          } else if (price1 === "Average (H,L,C)" && day1 === "1 tuần") {
            faKeys.push("AvgHLC_VUOT_Top4W_Weekly");
          }
          break;
        case "Vượt đỉnh 12 tuần":
          let price2 = "";
          let day2 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price2 = "Giá (Close)";
              break;
            case 1:
              price2 = "Giá (Low)";
              break;
            case 2:
              price2 = "Giá (Average)";
              break;
            case 3:
              price2 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day2 = "1 ngày";
              break;
            case 1:
              day2 = "1 tuần";
              break;

            default:
              break;
          }
          if (price2 === "Giá (Close)" && day2 === "1 ngày") {
            faKeys.push("Close_VUOT_Top12W_Daily");
          } else if (price2 === "Giá (Close)" && day2 === "1 tuần") {
            faKeys.push("Close_VUOT_Top12W_Weekly");
          } else if (price2 === "Giá (High)" && day2 === "1 ngày") {
            faKeys.push("High_VUOT_Top12W_Daily");
          } else if (price2 === "Giá (High)" && day2 === "1 tuần") {
            faKeys.push("High_VUOT_Top12W_Weekly");
          } else if (price2 === "Giá (Low)" && day2 === "1 ngày") {
            faKeys.push("Low_VUOT_Top12W_Daily");
          } else if (price2 === "Giá (Low)" && day2 === "1 tuần") {
            faKeys.push("Low_VUOT_Top12W_Weekly");
          } else if (price2 === "Giá (Average)" && day2 === "1 ngày") {
            faKeys.push("AvgHL_VUOT_Top12W_Daily");
          } else if (price2 === "Giá (Average)" && day2 === "1 tuần") {
            faKeys.push("AvgHL_VUOT_Top12W_Weekly");
          } else if (price2 === "Average (H,L,C)" && day2 === "1 ngày") {
            faKeys.push("AvgHLC_VUOT_Top12W_Daily");
          } else if (price2 === "Average (H,L,C)" && day2 === "1 tuần") {
            faKeys.push("AvgHLC_VUOT_Top12W_Weekly");
          }
          break;
        case "Vượt đỉnh 52 tuần":
          let price3 = "";
          let day3 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price3 = "Giá (Close)";
              break;
            case 1:
              price3 = "Giá (Low)";
              break;
            case 2:
              price3 = "Giá (Average)";
              break;
            case 3:
              price3 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day3 = "1 ngày";
              break;
            case 1:
              day3 = "1 tuần";
              break;

            default:
              break;
          }
          if (price3 === "Giá (Close)" && day3 === "1 ngày") {
            faKeys.push("Close_VUOT_Top52W_Daily");
          } else if (price3 === "Giá (Close)" && day3 === "1 tuần") {
            faKeys.push("Close_VUOT_Top52W_Weekly");
          } else if (price3 === "Giá (High)" && day3 === "1 ngày") {
            faKeys.push("High_VUOT_Top52W_Daily");
          } else if (price3 === "Giá (High)" && day3 === "1 tuần") {
            faKeys.push("High_VUOT_Top52W_Weekly");
          } else if (price3 === "Giá (Low)" && day3 === "1 ngày") {
            faKeys.push("Low_VUOT_Top52W_Daily");
          } else if (price3 === "Giá (Low)" && day3 === "1 tuần") {
            faKeys.push("Low_VUOT_Top52W_Weekly");
          } else if (price3 === "Giá (Average)" && day3 === "1 ngày") {
            faKeys.push("AvgHL_VUOT_Top52W_Daily");
          } else if (price3 === "Giá (Average)" && day3 === "1 tuần") {
            faKeys.push("AvgHL_VUOT_Top52W_Weekly");
          } else if (price3 === "Average (H,L,C)" && day3 === "1 ngày") {
            faKeys.push("AvgHLC_VUOT_Top52W_Daily");
          } else if (price3 === "Average (H,L,C)" && day3 === "1 tuần") {
            faKeys.push("AvgHLC_VUOT_Top52W_Weekly");
          }
          break;
        case "Thủng đáy 1 tuần":
          let price4 = "";
          let day4 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price4 = "Giá (Close)";
              break;
            case 1:
              price4 = "Giá (Low)";
              break;
            case 2:
              price4 = "Giá (Average)";
              break;
            case 3:
              price4 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day4 = "1 ngày";
              break;
            case 1:
              day4 = "1 tuần";
              break;

            default:
              break;
          }
          if (price4 === "Giá (Close)" && day4 === "1 ngày") {
            faKeys.push("Close_THUNG_Bottom1W_Daily");
          } else if (price4 === "Giá (Close)" && day4 === "1 tuần") {
            faKeys.push("Close_THUNG_Bottom1W_Weekly");
          } else if (price4 === "Giá (High)" && day4 === "1 ngày") {
            faKeys.push("High_THUNG_Bottom1W_Daily");
          } else if (price4 === "Giá (High)" && day4 === "1 tuần") {
            faKeys.push("High_THUNG_Bottom1W_Weekly");
          } else if (price4 === "Giá (Low)" && day4 === "1 ngày") {
            faKeys.push("Low_THUNG_Bottom1W_Daily");
          } else if (price4 === "Giá (Low)" && day4 === "1 tuần") {
            faKeys.push("Low_THUNG_Bottom1W_Weekly");
          } else if (price4 === "Giá (Average)" && day4 === "1 ngày") {
            faKeys.push("AvgHL_THUNG_Bottom1W_Daily");
          } else if (price4 === "Giá (Average)" && day4 === "1 tuần") {
            faKeys.push("AvgHL_THUNG_Bottom1W_Weekly");
          } else if (price4 === "Average (H,L,C)" && day4 === "1 ngày") {
            faKeys.push("AvgHLC_THUNG_Bottom1W_Daily");
          } else if (price4 === "Average (H,L,C)" && day4 === "1 tuần") {
            faKeys.push("AvgHLC_THUNG_Bottom1W_Weekly");
          }
          break;
        case "Thủng đáy 4 tuần":
          let price5 = "";
          let day5 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price5 = "Giá (Close)";
              break;
            case 1:
              price5 = "Giá (Low)";
              break;
            case 2:
              price5 = "Giá (Average)";
              break;
            case 3:
              price5 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day5 = "1 ngày";
              break;
            case 1:
              day5 = "1 tuần";
              break;

            default:
              break;
          }
          if (price5 === "Giá (Close)" && day5 === "1 ngày") {
            faKeys.push("Close_THUNG_Bottom4W_Daily");
          } else if (price5 === "Giá (Close)" && day5 === "1 tuần") {
            faKeys.push("Close_THUNG_Bottom4W_Weekly");
          } else if (price5 === "Giá (High)" && day5 === "1 ngày") {
            faKeys.push("High_THUNG_Bottom4W_Daily");
          } else if (price5 === "Giá (High)" && day5 === "1 tuần") {
            faKeys.push("High_THUNG_Bottom4W_Weekly");
          } else if (price5 === "Giá (Low)" && day5 === "1 ngày") {
            faKeys.push("Low_THUNG_Bottom4W_Daily");
          } else if (price5 === "Giá (Low)" && day5 === "1 tuần") {
            faKeys.push("Low_THUNG_Bottom4W_Weekly");
          } else if (price5 === "Giá (Average)" && day5 === "1 ngày") {
            faKeys.push("AvgHL_THUNG_Bottom4W_Daily");
          } else if (price5 === "Giá (Average)" && day5 === "1 tuần") {
            faKeys.push("AvgHL_THUNG_Bottom4W_Weekly");
          } else if (price5 === "Average (H,L,C)" && day5 === "1 ngày") {
            faKeys.push("AvgHLC_THUNG_Bottom4W_Daily");
          } else if (price5 === "Average (H,L,C)" && day5 === "1 tuần") {
            faKeys.push("AvgHLC_THUNG_Bottom4W_Weekly");
          }
          break;
        case "Thủng đáy 12 tuần":
          let price6 = "";
          let day6 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price6 = "Giá (Close)";
              break;
            case 1:
              price6 = "Giá (Low)";
              break;
            case 2:
              price6 = "Giá (Average)";
              break;
            case 3:
              price6 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day6 = "1 ngày";
              break;
            case 1:
              day6 = "1 tuần";
              break;

            default:
              break;
          }
          if (price6 === "Giá (Close)" && day6 === "1 ngày") {
            faKeys.push("Close_THUNG_Bottom12W_Daily");
          } else if (price6 === "Giá (Close)" && day6 === "1 tuần") {
            faKeys.push("Close_THUNG_Bottom12W_Weekly");
          } else if (price6 === "Giá (High)" && day6 === "1 ngày") {
            faKeys.push("High_THUNG_Bottom12W_Daily");
          } else if (price6 === "Giá (High)" && day6 === "1 tuần") {
            faKeys.push("High_THUNG_Bottom12W_Weekly");
          } else if (price6 === "Giá (Low)" && day6 === "1 ngày") {
            faKeys.push("Low_THUNG_Bottom12W_Daily");
          } else if (price6 === "Giá (Low)" && day6 === "1 tuần") {
            faKeys.push("Low_THUNG_Bottom12W_Weekly");
          } else if (price6 === "Giá (Average)" && day6 === "1 ngày") {
            faKeys.push("AvgHL_THUNG_Bottom12W_Daily");
          } else if (price6 === "Giá (Average)" && day6 === "1 tuần") {
            faKeys.push("AvgHL_THUNG_Bottom12W_Weekly");
          } else if (price6 === "Average (H,L,C)" && day6 === "1 ngày") {
            faKeys.push("AvgHLC_THUNG_Bottom12W_Daily");
          } else if (price6 === "Average (H,L,C)" && day6 === "1 tuần") {
            faKeys.push("AvgHLC_THUNG_Bottom12W_Weekly");
          }
          break;
        case "Thủng đáy 52 tuần":
          let price7 = "";
          let day7 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price7 = "Giá (Close)";
              break;
            case 1:
              price7 = "Giá (Low)";
              break;
            case 2:
              price7 = "Giá (Average)";
              break;
            case 3:
              price7 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day7 = "1 ngày";
              break;
            case 1:
              day7 = "1 tuần";
              break;

            default:
              break;
          }
          if (price7 === "Giá (Close)" && day7 === "1 ngày") {
            faKeys.push("Close_THUNG_Bottom52W_Daily");
          } else if (price7 === "Giá (Close)" && day7 === "1 tuần") {
            faKeys.push("Close_THUNG_Bottom52W_Weekly");
          } else if (price7 === "Giá (High)" && day7 === "1 ngày") {
            faKeys.push("High_THUNG_Bottom52W_Daily");
          } else if (price7 === "Giá (High)" && day7 === "1 tuần") {
            faKeys.push("High_THUNG_Bottom52W_Weekly");
          } else if (price7 === "Giá (Low)" && day7 === "1 ngày") {
            faKeys.push("Low_THUNG_Bottom52W_Daily");
          } else if (price7 === "Giá (Low)" && day7 === "1 tuần") {
            faKeys.push("Low_THUNG_Bottom52W_Weekly");
          } else if (price7 === "Giá (Average)" && day7 === "1 ngày") {
            faKeys.push("AvgHL_THUNG_Bottom52W_Daily");
          } else if (price7 === "Giá (Average)" && day7 === "1 tuần") {
            faKeys.push("AvgHL_THUNG_Bottom52W_Weekly");
          } else if (price7 === "Average (H,L,C)" && day7 === "1 ngày") {
            faKeys.push("AvgHLC_THUNG_Bottom52W_Daily");
          } else if (price7 === "Average (H,L,C)" && day7 === "1 tuần") {
            faKeys.push("AvgHLC_THUNG_Bottom52W_Weekly");
          }
          break;
        case "Số phiên tăng giá liên tục":
          let price8 = "";
          let day8 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price8 = "Giá (Close)";
              break;
            case 1:
              price8 = "Giá (Low)";
              break;
            case 2:
              price8 = "Giá ((H+L)/2)";
              break;
            case 3:
              price8 = "Giá ((O + H + L + C)/4)";
              break;

            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day8 = "1 ngày";
              break;
            case 1:
              day8 = "1 tuần";
              break;

            default:
              break;
          }

          const slider = tieuChi.rightIndexValue;
          if (price8 === "Giá (Close)" && day8 === "1 ngày") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (Close)" && day8 === "1 tuần") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (High)" && day8 === "1 ngày") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (High)" && day8 === "1 tuần") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (Low)" && day8 === "1 ngày") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (Low)" && day8 === "1 tuần") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá ((H+L)/2)" && day8 === "1 ngày") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá ((H+L)/2)" && day8 === "1 tuần") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (
            price8 === "Giá ((O + H + L + C)/4)" &&
            day8 === "1 ngày"
          ) {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (
            price8 === "Giá ((O + H + L + C)/4)" &&
            day8 === "1 tuần"
          ) {
            faKeys.push(`Close_UP_${slider}_Daily`);
          }
          break;
        case "Số phiên giảm giá liên tục":
          let price9 = "";
          let day9 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price9 = "Giá (Close)";
              break;
            case 1:
              price9 = "Giá (Low)";
              break;
            case 2:
              price9 = "Giá ((H+L)/2)";
              break;
            case 3:
              price9 = "Giá ((O + H + L + C)/4)";
              break;

            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day9 = "1 ngày";
              break;
            case 1:
              day9 = "1 tuần";
              break;

            default:
              break;
          }

          const slider1 = tieuChi.rightIndexValue;
          if (price9 === "Giá (Close)" && day9 === "1 ngày") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (Close)" && day9 === "1 tuần") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (High)" && day9 === "1 ngày") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (High)" && day9 === "1 tuần") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (Low)" && day9 === "1 ngày") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (Low)" && day9 === "1 tuần") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá ((H+L)/2)" && day9 === "1 ngày") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá ((H+L)/2)" && day9 === "1 tuần") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (
            price9 === "Giá ((O + H + L + C)/4)" &&
            day9 === "1 ngày"
          ) {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (
            price9 === "Giá ((O + H + L + C)/4)" &&
            day9 === "1 tuần"
          ) {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          }
          break;
        case "Số phiên KL giảm liên tiếp":
          const slider2 = tieuChi.rightIndexValue;
          let day10 = "";
          switch (tieuChi.interval) {
            case 0:
              day10 = "1 ngày";
              break;
            case 1:
              day10 = "1 tuần";
              break;

            default:
              break;
          }
          if ((day10 = "1 ngày")) {
            faKeys.push(`Vol_DOWN_${slider2}_Daily`);
          } else if ((day10 = "1 tuần")) {
            faKeys.push(`Vol_DOWN_${slider2}_Weekly`);
          }
          break;
        case "Số phiên KL tăng liên tiếp":
          const slider3 = tieuChi.rightIndexValue;
          let day11 = "";
          switch (tieuChi.interval) {
            case 0:
              day11 = "1 ngày";
              break;
            case 1:
              day11 = "1 tuần";
              break;

            default:
              break;
          }
          if ((day11 = "1 ngày")) {
            faKeys.push(`Vol_UP_${slider3}_Daily`);
          } else if ((day11 = "1 tuần")) {
            faKeys.push(`Vol_UP_${slider3}_Weekly`);
          }
          break;
        case "Khối lượng khớp lệnh đang cao nhất":
          const slider4 = tieuChi.rightIndexValue;
          let day12 = "";
          switch (tieuChi.interval) {
            case 0:
              day12 = "1 ngày";
              break;
            case 1:
              day12 = "1 tuần";
              break;

            default:
              break;
          }
          if ((day12 = "1 ngày")) {
            faKeys.push(`Vol_MAX_${slider4}_Daily`);
          } else if ((day12 = "1 tuần")) {
            faKeys.push(`Vol_MAX_${slider4}_Weekly`);
          }

          break;
        case "Khối lượng khớp lệnh đang thấp nhất":
          const slider5 = tieuChi.rightIndexValue;
          let day33 = "";
          switch (tieuChi.interval) {
            case 0:
              day33 = "1 ngày";
              break;
            case 1:
              day33 = "1 tuần";
              break;

            default:
              break;
          }
          if ((day33 = "1 ngày")) {
            faKeys.push(`Vol_MIN_${slider5}_Daily`);
          } else if ((day33 = "1 tuần")) {
            faKeys.push(`Vol_MIN_${slider5}_Weekly`);
          }

          break;
        case "Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 5 ngày liền trước":
          let percentClick = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick = "70";
              break;
            case 1:
              percentClick = "80";
              break;
            case 2:
              percentClick = "90";
              break;
            case 3:
              percentClick = "100";
              break;
            case 4:
              percentClick = "110";
              break;
            case 5:
              percentClick = "120";
              break;
            case 6:
              percentClick = "130";
              break;
            case 7:
              percentClick = "150";
              break;
            case 8:
              percentClick = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationAvgVol5D_>=_${percentClick}_Daily`);

          break;
        case "Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 10 ngày liền trước":
          let percentClick1 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick1 = "70";
              break;
            case 1:
              percentClick1 = "80";
              break;
            case 2:
              percentClick1 = "90";
              break;
            case 3:
              percentClick1 = "100";
              break;
            case 4:
              percentClick1 = "110";
              break;
            case 5:
              percentClick1 = "120";
              break;
            case 6:
              percentClick1 = "130";
              break;
            case 7:
              percentClick1 = "150";
              break;
            case 8:
              percentClick1 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationAvgVol10D_>=_${percentClick1}_Daily`);

          break;
        case "Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 20 ngày liền trước":
          let percentClick2 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick2 = "70";
              break;
            case 1:
              percentClick2 = "80";
              break;
            case 2:
              percentClick2 = "90";
              break;
            case 3:
              percentClick2 = "100";
              break;
            case 4:
              percentClick2 = "110";
              break;
            case 5:
              percentClick2 = "120";
              break;
            case 6:
              percentClick2 = "130";
              break;
            case 7:
              percentClick2 = "150";
              break;
            case 8:
              percentClick2 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationAvgVol20D_>=_${percentClick2}_Daily`);

          break;
        case "Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 60 ngày liền trước":
          let percentClick3 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick3 = "70";
              break;
            case 1:
              percentClick3 = "80";
              break;
            case 2:
              percentClick3 = "90";
              break;
            case 3:
              percentClick3 = "100";
              break;
            case 4:
              percentClick3 = "110";
              break;
            case 5:
              percentClick3 = "120";
              break;
            case 6:
              percentClick3 = "130";
              break;
            case 7:
              percentClick3 = "150";
              break;
            case 8:
              percentClick3 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationAvgVol60D_>=_${percentClick3}_Daily`);

          break;
        case "KL tăng so với cùng thời điểm của phiên liền trước":
          let percentClick4 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick4 = "70";
              break;
            case 1:
              percentClick4 = "80";
              break;
            case 2:
              percentClick4 = "90";
              break;
            case 3:
              percentClick4 = "100";
              break;
            case 4:
              percentClick4 = "110";
              break;
            case 5:
              percentClick4 = "120";
              break;
            case 6:
              percentClick4 = "130";
              break;
            case 7:
              percentClick4 = "150";
              break;
            case 8:
              percentClick4 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationVolT1_>=_${percentClick4}_Daily`);

          break;
        case "KL trong phiên đạt bằng Khối lượng phiên giao dịch trước":
          let percentClick5 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick5 = "70";
              break;
            case 1:
              percentClick5 = "80";
              break;
            case 2:
              percentClick5 = "90";
              break;
            case 3:
              percentClick5 = "100";
              break;
            case 4:
              percentClick5 = "110";
              break;
            case 5:
              percentClick5 = "120";
              break;
            case 6:
              percentClick5 = "130";
              break;
            case 7:
              percentClick5 = "150";
              break;
            case 8:
              percentClick5 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`Vol_${percentClick5}_VolT1_Daily`);

          break;
        case "Doanh thu (TTM)":
          faFilter.push({
            key: `NetSale_TTM`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Doanh thu (năm gần nhất)":
          faFilter.push({
            key: `NetSale_MRY`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Lợi nhuận sau thuế (TTM)":
          faFilter.push({
            key: `Profit_TTM`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Lợi nhuận sau thuế (năm gần nhất)":
          faFilter.push({
            key: `Profit_MRY`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Biên lợi nhuận gộp (TTM - %)":
          faFilter.push({
            key: `MG_GrossMargin_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;

        case "Biên lợi nhuận gộp (5 năm - %)":
          faFilter.push({
            key: `MG_GrossMargin_Avg_5Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Biên lợi nhuận hoạt động (TTM - %)":
          faFilter.push({
            key: `MG_OperatingMargin`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;

        case "Biên lợi nhuận hoạt động (5 năm - %)":
          faFilter.push({
            key: `MG_OperatingMargin_Avg_5Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Biên lợi nhuận trước thuế (TTM - %)":
          faFilter.push({
            key: `MG_PretaxMargin_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;

        case "Biên lợi nhuận trước thuế (5 năm - %)":
          faFilter.push({
            key: `MG_PretaxMargin_Avg_5Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tỷ lệ thanh toán nhanh (MRQ)":
          faFilter.push({
            key: `FS_QuickRatio`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Tổng nợ/Vốn CSH (Total Debt to Equity)":
          faFilter.push({
            key: `FS_DebtOnEquityRatio`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Dòng tiền từ hoạt động kinh doanh":
          let month = "";
          switch (tieuChi.month) {
            case 0:
              month = "MRQ";
              break;
            case 1:
              month = "MRQ_2";
              break;
            case 2:
              month = "TTM";
              break;
            case 3:
              month = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_Operating_${month}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;

        case "Dòng tiền từ hoạt động đầu tư ":
          let month1 = "";
          switch (tieuChi.month) {
            case 0:
              month1 = "MRQ";
              break;
            case 1:
              month1 = "MRQ_2";
              break;
            case 2:
              month1 = "TTM";
              break;
            case 3:
              month1 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_Investing_${month1}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Dòng tiền từ hoạt động tài chính":
          let month2 = "";
          switch (tieuChi.month) {
            case 0:
              month2 = "MRQ";
              break;
            case 1:
              month2 = "MRQ_2";
              break;
            case 2:
              month2 = "TTM";
              break;
            case 3:
              month2 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_Financing_${month2}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;

        case "Dòng tiền tổng hợp":
          let month3 = "";
          switch (tieuChi.month) {
            case 0:
              month3 = "MRQ";
              break;
            case 1:
              month3 = "MRQ_2";
              break;
            case 2:
              month3 = "TTM";
              break;
            case 3:
              month3 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_Total_${month3}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Dòng tiền tự do":
          let month4 = "";
          switch (tieuChi.month) {
            case 0:
              month4 = "MRQ";
              break;
            case 1:
              month4 = "MRQ_2";
              break;
            case 2:
              month4 = "TTM";
              break;
            case 3:
              month4 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_FreeCashFlow_${month4}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;

        case "Dòng tiền từ HĐKD/DT thuần":
          let month5 = "";
          switch (tieuChi.month) {
            case 0:
              month5 = "MRQ";
              break;
            case 1:
              month5 = "MRQ_2";
              break;
            case 2:
              month5 = "TTM";
              break;
            case 3:
              month5 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_OperatingNetSalePercent_${month5}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Cổ tức (bằng tiền) năm gần nhất":
          let boolean = "";
          switch (tieuChi.boolean) {
            case 0:
              boolean = "HasCashDividend_LastYear";
              break;
            case 1:
              boolean = "";
              break;
            default:
              break;
          }
          booleanFilter.push({
            key: boolean,
            value: true,
          });
          break;
        case "Cổ tức đều đặn trên 3 năm":
          let boolean1 = "";
          switch (tieuChi.boolean) {
            case 0:
              boolean1 = "HasCashDividend_Last3Years";
              break;
            case 1:
              boolean1 = "";
              break;
            default:
              break;
          }
          booleanFilter.push({
            key: boolean1,
            value: true,
          });
          break;
        case "Cổ tức bằng tiền (năm gần nhất)":
          faFilter.push({
            key: `CashDividend_LastYear`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Tỷ suất cổ tức":
          faFilter.push({
            key: `DividendYield_LastYear`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Thu nhập từ cổ tức năm gần nhất theo giá hiện tại (%)":
          faFilter.push({
            key: `CashDividendYield_LastYear_CurrentPrice`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Thu nhập từ cổ tức bình quân 3 năm (%)":
          faFilter.push({
            key: `DividendYield_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tăng trưởng cổ tức (%)":
          faFilter.push({
            key: `CashDividend_Growth`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Thu nhập từ cổ tực dự kiến (%)":
          faFilter.push({
            key: `CashDividendYield_ThisYearPlan_CurrentPrice`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Tỷ lệ chi trả cổ tức (%)":
          faFilter.push({
            key: `CashDividendRatio_LastYear`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
        case "Giá so với đường TB - EMA":
          let checkCompare = "";
          let day14 = "";
          let ema = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare = ">=";
              break;
            case 1:
              checkCompare = "=";
              break;

            case 2:
              checkCompare = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema = "EMA5";
              break;
            case 1:
              ema = "EMA10";
              break;
            case 2:
              ema = "EMA15";
              break;
            case 3:
              ema = "EMA20";
              break;
            case 4:
              ema = "EMA50";
              break;
            case 5:
              ema = "EMA100";
              break;
            case 6:
              ema = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day14 = "Daily";
              break;
            case 1:
              day14 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`Close_${checkCompare}_${ema}_${day14}`);
          break;
        case "Giá cắt đường TB - EMA ":
          let checkCompare1 = "";
          let day15 = "";
          let ema1 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare1 = ">=";
              break;
            case 1:
              checkCompare1 = "=";
              break;

            case 2:
              checkCompare1 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema1 = "EMA5";
              break;
            case 1:
              ema1 = "EMA10";
              break;
            case 2:
              ema1 = "EMA15";
              break;
            case 3:
              ema1 = "EMA20";
              break;
            case 4:
              ema1 = "EMA50";
              break;
            case 5:
              ema1 = "EMA100";
              break;
            case 6:
              ema1 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day15 = "Daily";
              break;
            case 1:
              day15 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`Close_VUOT_${checkCompare1}_${ema1}_${day15}`);
          break;

        case "So sánh 2 đường TB - EMA ":
          let checkCompare2 = "";
          let day16 = "";
          let ema2 = "";
          let ema02 = "";

          switch (tieuChi.compare) {
            case 0:
              checkCompare2 = ">=";
              break;
            case 1:
              checkCompare2 = "=";
              break;

            case 2:
              checkCompare2 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              ema02 = "EMA5";
              break;
            case 1:
              ema02 = "EMA10";
              break;
            case 2:
              ema02 = "EMA15";
              break;
            case 3:
              ema02 = "EMA20";
              break;
            case 4:
              ema02 = "EMA50";
              break;
            case 5:
              ema02 = "EMA100";
              break;
            case 6:
              ema02 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema2 = "EMA5";
              break;
            case 1:
              ema2 = "EMA10";
              break;
            case 2:
              ema2 = "EMA15";
              break;
            case 3:
              ema2 = "EMA20";
              break;
            case 4:
              ema2 = "EMA50";
              break;
            case 5:
              ema2 = "EMA100";
              break;
            case 6:
              ema2 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day16 = "Daily";
              break;
            case 1:
              day16 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${ema02}_${checkCompare2}_${ema2}_${day16}`);
          break;
        case "Giao cắt 2 đường TB - EMA ":
          let checkCompare3 = "";
          let day17 = "";
          let ema3 = "";
          let change = "";
          switch (tieuChi.compare) {
            case 0:
              change = "VUOT";
              break;
            case 1:
              change = "THUNG";
              break;
            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              checkCompare3 = "EMA5";
              break;
            case 1:
              checkCompare3 = "EMA10";
              break;
            case 2:
              checkCompare3 = "EMA15";
              break;
            case 3:
              checkCompare3 = "EMA20";
              break;
            case 4:
              checkCompare3 = "EMA50";
              break;
            case 5:
              checkCompare3 = "EMA100";
              break;
            case 6:
              checkCompare3 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema3 = "EMA5";
              break;
            case 1:
              ema3 = "EMA10";
              break;
            case 2:
              ema3 = "EMA15";
              break;
            case 3:
              ema3 = "EMA20";
              break;
            case 4:
              ema3 = "EMA50";
              break;
            case 5:
              ema3 = "EMA100";
              break;
            case 6:
              ema3 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day17 = "Daily";
              break;
            case 1:
              day17 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${checkCompare3}_${change}_${ema3}_${day17}`);
          break;

        case "Giá so với đường TB - MA":
          let checkCompare4 = "";
          let day18 = "";
          let ema4 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare4 = ">=";
              break;
            case 1:
              checkCompare4 = "=";
              break;

            case 2:
              checkCompare4 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema4 = "SMA5";
              break;
            case 1:
              ema4 = "SMA10";
              break;
            case 2:
              ema4 = "SMA15";
              break;
            case 3:
              ema4 = "SMA20";
              break;
            case 4:
              ema4 = "SMA50";
              break;
            case 5:
              ema4 = "SMA100";
              break;
            case 6:
              ema4 = "SMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day18 = "Daily";
              break;
            case 1:
              day18 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${checkCompare4}_${ema4}_${day18}`);
          break;
        case "So sánh 2 đường TB - MA":
          let checkCompare5 = "";
          let day19 = "";
          let ema5 = "";
          let ema05 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare5 = ">=";
              break;
            case 1:
              checkCompare5 = "=";
              break;

            case 2:
              checkCompare5 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              ema05 = "SMA5";
              break;
            case 1:
              ema05 = "SMA10";
              break;
            case 2:
              ema05 = "SMA15";
              break;
            case 3:
              ema05 = "SMA20";
              break;
            case 4:
              ema05 = "SMA50";
              break;
            case 5:
              ema05 = "SMA100";
              break;
            case 6:
              ema05 = "SMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema5 = "SMA5";
              break;
            case 1:
              ema5 = "SMA10";
              break;
            case 2:
              ema5 = "SMA15";
              break;
            case 3:
              ema5 = "SMA20";
              break;
            case 4:
              ema5 = "SMA50";
              break;
            case 5:
              ema5 = "SMA100";
              break;
            case 6:
              ema5 = "SMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day19 = "Daily";
              break;
            case 1:
              day19 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${ema05}_${checkCompare5}_${ema5}_${day19}`);
          break;

        case "Giao cắt 2 đường TB - MA":
          let checkCompare6 = "";
          let day20 = "";
          let ema6 = "";
          let change1 = "";
          switch (tieuChi.compare) {
            case 0:
              change1 = "VUOT";
              break;
            case 1:
              change1 = "THUNG";
              break;
            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              checkCompare6 = "EMA5";
              break;
            case 1:
              checkCompare6 = "EMA10";
              break;
            case 2:
              checkCompare6 = "EMA15";
              break;
            case 3:
              checkCompare6 = "EMA20";
              break;
            case 4:
              checkCompare6 = "EMA50";
              break;
            case 5:
              checkCompare6 = "EMA100";
              break;
            case 6:
              checkCompare6 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema6 = "EMA5";
              break;
            case 1:
              ema6 = "EMA10";
              break;
            case 2:
              ema6 = "EMA15";
              break;
            case 3:
              ema6 = "EMA20";
              break;
            case 4:
              ema6 = "EMA50";
              break;
            case 5:
              ema6 = "EMA100";
              break;
            case 6:
              ema6 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day20 = "Daily";
              break;
            case 1:
              day20 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${checkCompare6}_${change1}_${ema6}_${day20}`);
          break;

        case "Giá cắt đường TB - MA":
          let day21 = "";
          let ema7 = "";
          let change2 = "";
          switch (tieuChi.compare) {
            case 0:
              change2 = "VUOT";
              break;
            case 1:
              change2 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.rightIndexValue) {
            case 0:
              ema7 = "EMA5";
              break;
            case 1:
              ema7 = "EMA10";
              break;
            case 2:
              ema7 = "EMA15";
              break;
            case 3:
              ema7 = "EMA20";
              break;
            case 4:
              ema7 = "EMA50";
              break;
            case 5:
              ema7 = "EMA100";
              break;
            case 6:
              ema7 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day21 = "Daily";
              break;
            case 1:
              day21 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change2}_${ema7}_${day21}`);
          break;

        case "Giá so với Tenkan(9)":
          let checkCompare7 = "";
          let day22 = "";

          switch (tieuChi.compare) {
            case 0:
              checkCompare7 = ">=";
              break;
            case 1:
              checkCompare7 = "=";
              break;

            case 2:
              checkCompare7 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day22 = "Daily";
              break;
            case 1:
              day22 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${checkCompare7}_Tenkan_${day22}`);
          break;
        case "Giá so với Kijun(26)":
          let checkCompare8 = "";
          let day23 = "";

          switch (tieuChi.compare) {
            case 1:
              checkCompare8 = ">=";
              break;
            case 2:
              checkCompare8 = "=";
              break;

            case 4:
              checkCompare8 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day23 = "Daily";
              break;
            case 1:
              day23 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${checkCompare8}_Kijun_${day23}`);
          break;
        case "Giá so với Cloud(52)":
          let checkCompare9 = "";
          let day24 = "";

          switch (tieuChi.compare) {
            case 0:
              checkCompare9 = ">=";
              break;
            case 1:
              checkCompare9 = "=";
              break;

            case 2:
              checkCompare9 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day24 = "Daily";
              break;
            case 1:
              day24 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(
            `CLOSE_${checkCompare9}_SpanA_${day24}`,
            `CLOSE_${checkCompare9}_SpanB_${day24}`
          );
          break;
        case "Giá giao cắt với Tenkan(9)":
          let change3 = "";
          let day25 = "";

          switch (tieuChi.compare) {
            case 0:
              change3 = "VUOT";
              break;
            case 1:
              change3 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day25 = "Daily";
              break;
            case 1:
              day25 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change3}_Tenkan_${day25}`);
          break;

        case "Giá giao cắt với Kijun(26)":
          let change4 = "";
          let day26 = "";

          switch (tieuChi.compare) {
            case 0:
              change4 = "VUOT";
              break;
            case 1:
              change4 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day26 = "Daily";
              break;
            case 1:
              day26 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change4}_Kijun_${day26}`);
          break;

        case "Giá giao cắt với Cloud(52)":
          let change5 = "";
          let day27 = "";

          switch (tieuChi.compare) {
            case 0:
              change5 = "VUOT";
              break;
            case 1:
              change5 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day27 = "Daily";
              break;
            case 1:
              day27 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change5}_Cloud_${day27}`);
          break;

        case "Giao cắt thành phần Tenkan và Kijun":
          let change6 = "";
          let day28 = "";
          let left = "";
          let right = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left = "Tenkan";
              break;
            case 1:
              left = "Kijun";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right = "Tenkan";
              break;
            case 1:
              right = "Kijun";
              break;

            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change6 = "VUOT";
              break;
            case 1:
              change6 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day28 = "Daily";
              break;
            case 1:
              day28 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left}_${change6}_${right}_${day28}`);
          break;
        case "MACD so với Signal":
          let checkCompare10 = "";
          let day30 = "";

          switch (tieuChi.compare) {
            case 0:
              checkCompare10 = ">=";
              break;
            case 1:
              checkCompare10 = "=";
              break;

            case 2:
              checkCompare10 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day30 = "Daily";
              break;
            case 1:
              day30 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`MACD_${checkCompare10}_MACDSignal_${day30}`);
          break;
        case "MACD cắt với Signal":
          let change7 = "";
          let day31 = "";

          switch (tieuChi.compare) {
            case 0:
              change7 = "VUOT";
              break;
            case 1:
              change7 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day31 = "Daily";
              break;
            case 1:
              day31 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`MACD_${change7}_MACDSignal_${day31}`);
          break;
        case "Trạng thái giá trị của MACD":
          let checkCompare11 = "";
          let day32 = "";
          let left1 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare11 = ">=_0";
              break;
            case 1:
              checkCompare11 = "<_0";
              break;
            case 2:
              checkCompare11 = "VUOT_0";
              break;
            case 3:
              checkCompare11 = "THUNG_0";
              break;

            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              left1 = "MACD";
              break;
            case 1:
              left1 = "MACDSignal";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day32 = "Daily";
              break;
            case 1:
              day32 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left1}_${checkCompare11}_${day32}`);
          break;
        case "Histogram tăng liên tục":
          const slider6 = tieuChi.rightIndexValue;
          let day34 = "";
          switch (tieuChi.interval) {
            case 0:
              day34 = "Daily";
              break;
            case 1:
              day34 = "Weekly";
              break;

            default:
              break;
          }

          faKeys.push(`MACDHist_UP_${slider6}_${day34}`);

          break;
        case "Histogram giảm liên tục":
          const slider7 = tieuChi.rightIndexValue;
          let day35 = "";
          switch (tieuChi.interval) {
            case 0:
              day35 = "Daily";
              break;
            case 1:
              day35 = "Weekly";
              break;

            default:
              break;
          }

          faKeys.push(`MACDHist_DOWN_${slider7}_${day35}`);

          break;
        case "Giá trị RSI14":
          let day36 = "";
          switch (tieuChi.interval) {
            case 0:
              day36 = "Daily";
              break;
            case 1:
              day36 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `RSI14_${day36}`,
            value: {
              min: tieuChi.rightIndexValue[0].toString(),
              max: tieuChi.rightIndexValue[1].toString(),
            },
          });
          break;
        case "RSI14 so với các vùng giá trị":
          let checkCompare12 = "";
          let day37 = "";
          let right3 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare12 = ">=";
              break;
            case 1:
              checkCompare12 = "=";
              break;

            case 2:
              checkCompare12 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right3 = "70";
              break;
            case 1:
              right3 = "60";
              break;
            case 2:
              right3 = "40";
              break;
            case 3:
              right3 = "30";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day37 = "Daily";
              break;
            case 1:
              day37 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`RSI14_${checkCompare12}_${right3}_${day37}`);
          break;
        case "RSI14 và vùng Quá mua/Quá bán":
          let left2 = "";
          let day38 = "";
          let right2 = "";
          switch (tieuChi.compare) {
            case 0:
              left2 = "VUOT";
              break;
            case 1:
              left2 = "THUNG";
              break;

            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right2 = "70";
              break;
            case 1:
              right2 = "30";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day38 = "Daily";
              break;
            case 1:
              day38 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`RSI14_${left2}_${right2}_${day38}`);
          break;

        case "Giá tăng vượt Biên trên":
          let day39 = "";

          switch (tieuChi.interval) {
            case 0:
              day39 = "Daily";
              break;
            case 1:
              day39 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_VUOT_UpperBand_${day39}`);
          break;
        case "Giá giảm qua Biên trên":
          let day40 = "";

          switch (tieuChi.interval) {
            case 0:
              day40 = "Daily";
              break;
            case 1:
              day40 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_THUNG_UpperBand_${day40}`);
          break;
        case "Giá giảm thủng Biên dưới":
          let day41 = "";

          switch (tieuChi.interval) {
            case 0:
              day41 = "Daily";
              break;
            case 1:
              day41 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_THUNG_LowerBand_${day41}`);
          break;
        case "Giá tăng qua Biên dưới":
          let day42 = "";

          switch (tieuChi.interval) {
            case 0:
              day42 = "Daily";
              break;
            case 1:
              day42 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_VUOT_LowerBand_${day42}`);
          break;
        case "Giá duy trì vượt ngoài Biên trên Bollinger":
          const slider8 = tieuChi.rightIndexValue;
          let day43 = "";
          switch (tieuChi.interval) {
            case 0:
              day43 = "Daily";
              break;
            case 1:
              day43 = "Weekly";
              break;

            default:
              break;
          }

          faKeys.push(`Close_UP_${slider8}_${day43}_UpperBand`);

          break;

        case "Giá duy trì ngoài Biên dưới Bollinger":
          const slider9 = tieuChi.rightIndexValue;
          let day44 = "";
          switch (tieuChi.interval) {
            case 0:
              day44 = "Daily";
              break;
            case 1:
              day44 = "Weekly";
              break;

            default:
              break;
          }

          faKeys.push(`Close_DOWN_${slider9}_${day44}_LowerBand`);

          break;

        case "Giá trị MFI(20)":
          let day45 = "";
          switch (tieuChi.interval) {
            case 0:
              day45 = "Daily";
              break;
            case 1:
              day45 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `MFI_${day45}`,
            value: {
              min: tieuChi.rightIndexValue[0].toString(),
              max: tieuChi.rightIndexValue[1].toString(),
            },
          });
          break;

        case "MFI(20) và vùng Quá mua/Quá bán":
          let change8 = "";
          let day46 = "";
          let right4 = "";
          switch (tieuChi.rightIndexValue) {
            case 0:
              right4 = "70";
              break;
            case 1:
              right4 = "30";
              break;
            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change8 = "VUOT";
              break;
            case 1:
              change8 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day46 = "Daily";
              break;
            case 1:
              day46 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`MFI_${change8}_${right4}_${day46}`);
          break;
        case "Stochastic và vùng Quá mua/Quá bán":
          let change9 = "";
          let day47 = "";
          let right5 = "";
          let left5 = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left5 = "StochSlowK";
              break;
            case 1:
              left5 = "StochSlowD";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right5 = "80";
              break;
            case 1:
              right5 = "20";
              break;
            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change9 = "VUOT";
              break;
            case 1:
              change9 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day47 = "Daily";
              break;
            case 1:
              day47 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left5}_${change9}_${right5}_${day47}`);
          break;
        case "Stochastic giao cắt nhau":
          let change10 = "";
          let day48 = "";

          switch (tieuChi.compare) {
            case 0:
              change10 = "VUOT";
              break;
            case 1:
              change10 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day48 = "Daily";
              break;
            case 1:
              day48 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`faKeysStochSlowK_${change10}_StochSlowD_${day48}`);
          break;
        case "Giá trị MCDX (Banker)":
          let day49 = "";
          switch (tieuChi.interval) {
            case 0:
              day49 = "Daily";
              break;
            case 1:
              day49 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `MCDXBanker_${day49}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Giá trị MCDX (Hot money)":
          let day50 = "";
          switch (tieuChi.interval) {
            case 0:
              day50 = "Daily";
              break;
            case 1:
              day50 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `MCDXHotMoney_${day50}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;

        case "Biến động MCDX":
          let change11 = "";
          let day51 = "";
          let right6 = "";
          let left6 = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left6 = "MCDXBanker";
              break;
            case 1:
              left6 = "MCDXHotMoney";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right6 = "20";
              break;
            case 1:
              right6 = "25";
              break;
            case 2:
              right6 = "30";
              break;
            case 3:
              right6 = "40";
              break;
            case 4:
              right6 = "50";
              break;
            case 5:
              right6 = "60";
              break;
            case 6:
              right6 = "70";
              break;
            case 7:
              right6 = "75";
              break;
            case 8:
              right6 = "80";
              break;
            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change11 = "VUOT";
              break;
            case 1:
              change11 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day51 = "Daily";
              break;
            case 1:
              day51 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left6}_${change11}_${right6}_${day51}`);
          break;
        case "Giá trị ADX(14)":
          let day52 = "";
          switch (tieuChi.interval) {
            case 0:
              day52 = "Daily";
              break;
            case 1:
              day52 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `ADX_${day52}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;

        case "Giá trị -DI(14)":
          let day53 = "";
          switch (tieuChi.interval) {
            case 0:
              day53 = "Daily";
              break;
            case 1:
              day53 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `DIN14_${day53}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Giá trị +DI(14)":
          let day54 = "";
          switch (tieuChi.interval) {
            case 0:
              day54 = "Daily";
              break;
            case 1:
              day54 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `DIP14_${day54}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "Giao cắt nhóm ADX":
          let change12 = "";
          let day55 = "";
          let right7 = "";
          let left7 = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left7 = "DIP14";
              break;
            case 1:
              left7 = "DIN14";
              break;
            case 2:
              left7 = "ADX";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right7 = "DIP14";
              break;
            case 1:
              right7 = "DIN14";
              break;
            case 2:
              right7 = "ADX";
              break;

            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change12 = "VUOT";
              break;
            case 1:
              change12 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day55 = "Daily";
              break;
            case 1:
              day55 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left7}_${change12}_${right7}_${day55}`);
          break;
        case "ADX và ngưỡng giá trị":
          let change13 = "";
          let day56 = "";
          let right8 = "";
          let left8 = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left8 = "ADX";
              break;
            case 1:
              left8 = "DIP14";
              break;
            case 2:
              left8 = "DIN14";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right8 = "20";
              break;
            case 1:
              right8 = "25";
              break;
            case 2:
              right8 = "30";
              break;
            case 3:
              right8 = "35";
              break;
            case 4:
              right8 = "40";
              break;
            case 5:
              right8 = "45";
              break;
            case 6:
              right8 = "50";
              break;
            case 7:
              right8 = "55";
              break;
            case 8:
              right8 = "60";
              break;
            case 9:
              right8 = "65";
              break;
            case 10:
              right8 = "70";
              break;
            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change13 = ">=";
              break;
            case 1:
              change13 = "=";
              break;

            case 2:
              change13 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day56 = "Daily";
              break;
            case 1:
              day56 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left8}_${change13}_${right8}_${day56}`);
          break;
        case "Giá so với PSar":
          let change14 = "";
          let day57 = "";

          switch (tieuChi.compare) {
            case 0:
              change14 = ">=";
              break;
            case 1:
              change14 = "=";
              break;

            case 2:
              change14 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day57 = "Daily";
              break;
            case 1:
              day57 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change14}_PSar_${day57}`);
          break;

        case "Khoảng cách giá và PSar":
          let day58 = "";
          switch (tieuChi.interval) {
            case 0:
              day58 = "Daily";
              break;
            case 1:
              day58 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CloseVsPSARMUTATION_${day58}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
        case "PSar đảo chiều":
          let change16 = "";
          let day59 = "";

          switch (tieuChi.compare) {
            case 0:
              change16 = "VUOT";
              break;
            case 1:
              change16 = "THUNG";
              break;

            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day59 = "Daily";
              break;
            case 1:
              day59 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change16}_PSar_${day59}`);
          break;
        default:
          break;
      }
    }
    const fAFilterSubObj = fAFilterSub.reduce((obj: any, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    const booleanFilterObj = booleanFilter.reduce((obj: any, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    const fAFilterObj = faFilter.reduce((obj: any, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    const faKeysObj = faKeys;
    const parametersFin = parameters;
    const object = {
      faFilter: fAFilterObj,
      taFilter: null,
      booleanFilter: booleanFilterObj,
      pageNumber: 1,
      pageSize: 10000,
      exchanges: ["HSX", "HNX", "UPCOM"],
      icbCodes: null,
      sortColumn: "Symbol",
      isDesc: false,
      fAFilterSub: fAFilterSubObj,
      faKeys: faKeysObj,
      wlOrPId: null,
      tradingTime: null,
    };
    const objectFin = {
      comGroupCode: "All",
      icbCode: "All",
      parameters: parametersFin,
      page: pageTable,
      pageSize: pageSize,
      OrderBy: "StockScreenerItem.Ticker",
      Direction: "ASC",
    };
    const listMatched: any = await axios.post(
      `${config.app.VITE_APP_API_URL}/filter-data`,
      // `${config.app.VITE_APP_API_URL}/filter-data`,
      object
    );
    // const listFinRes: any = await axios.post(
    //   `${config.app.VITE_APP_API_URL}/filter-data-new`,
    //   // 'https://fiin-tools.ssi.com.vn/Screener/GetScreenerItems',
    //   objectFin
    // );

    const listMatchedMap = listMatched?.data?.data?.result?.items?.map(
      (item: any, index: any) => {
        return {
          ...item,
          id: index + 1,
          stt: index + 1,
        };
      }
    );
    if (listMatched.status === 200) {
      // setLoading(false);
    }
    setTotalFin(listMatched?.data.data.result.totalCount);
    // const listSymbolFinMap = listFinRes?.data?.items?.map(
    //   (item: any, index: any) => {
    //     return item?.financial?.organCode;
    //   }
    // );

    // const finalList = listMatchedMap.filter((item: any, index: any) => {
    //   return listSymbolFinMap?.includes(item?.Symbol);
    // });
    const listTieuChiPickedFin = listTieuChiPicked.filter((item: any) => {
      return item.finNew;
    });

    if (listTieuChiPickedFin.length > 0) {
      setTotalResult(listFinRes?.data.totalCount);
      const listNhomNganh = await axios.post(
        `${config.app.VITE_APP_API_URL}/nhom-nganh`,
        {
          symbols: listMatchedMap.map((item: any) => item.Symbol),
        }
      );

      const listNhomNganhMap = listNhomNganh?.data?.data?.map((item: any) => {
        return {
          // ...item,
          Symbol: item?.symbol,
          superSector: item?.superSector,
          exchange: item?.exchange,
        };
      });
      const map = new Map(
        listNhomNganhMap?.map((obj: any) => [obj?.Symbol, obj])
      );

      // Merge the arrays
      const mergedArray = finalList?.map((row: any) => {
        return { ...row, ...map.get(row?.Symbol) };
      });

      localStorage.setItem("filterData", JSON.stringify(mergedArray));

      setRows(mergedArray);
      setLoading(false);

      // setRows(finalList);
    } else if (listTieuChiPicked) {
      setTotalResult(listMatched?.data?.data?.result?.totalCount);
      const listNhomNganh = await axios.post(
        `${config.app.VITE_APP_API_URL}/nhom-nganh`,
        {
          symbols: listMatchedMap?.map((item: any) => item.Symbol),
        }
      );

      const listNhomNganhMap = listNhomNganh?.data?.data?.map((item: any) => {
        return {
          // ...item,
          Symbol: item?.symbol,
          superSector: item?.superSector,
          exchange: item?.exchange,
        };
      });
      const map = new Map(
        listNhomNganhMap?.map((obj: any) => [obj?.Symbol, obj])
      );

      // Merge the arrays
      const mergedArray = listMatchedMap?.map((row: any) => {
        return { ...row, ...map.get(row?.Symbol) };
      });

      if (listMatched?.data?.data?.result?.totalCount === 1150)
        localStorage.setItem("filterData", JSON.stringify(mergedArray));

      setRows(mergedArray);
      // setRows(listMatchedMap);
      setLoading(false);
    }
    setLoading(false);

    if (listMatchedMap?.length > 0) {
      const listKey = Object.keys(listMatchedMap[0]);
    }

    const listPayloadColumn = listTieuChiPicked
      .filter((item: any, index: any) => {
        return item?.compareList[0] === "range";
      })
      .slice(0, 4)
      .map((item: any, index: any) => {
        return item;
      });

    let listColumnMap = listPayloadColumn?.map((item: any, index: any) => {
      const dataIndex = item?.sessionListNumber
        ? `${item?.responseKey}_${item?.sessionListNumber[item?.session]}`
        : `${item?.responseKey}`;
      if (dataIndex) {
        return {
          ...item,
          title: item.label,
          dataIndex: dataIndex,
          width: "3%",
          backgroundColor: "black",
          editable: true,
        };
      } else {
        return null;
      }
    });
    listColumnMap = listColumnMap.filter((item: any) => {
      return !item?.finNew;
    });

    const newColumns = [
      ...[
        {
          title: "#",
          dataIndex: "key",
          width: "0.3%",
          backgroundColor: "red",
          editable: true,
        },
        {
          title: "MÃ",
          dataIndex: "Symbol",
          width: "0.3%",
          backgroundColor: "red",
          editable: true,
        },
        {
          title: "Sàn CK",
          dataIndex: "exchange",
          width: "1%",
          backgroundColor: "red",
          editable: true,
        },
      ],
      ...listColumnMap,
      {
        title: "Nhóm ngành",
        dataIndex: "superSector",
        width: "5%",
        backgroundColor: "red",
        editable: true,
      },
      // Sử dụng toán tử ba ngôi để kiểm tra điều kiện và thêm cột, hoặc trả về null nếu điều kiện không thoả mãn
      tabMenuTarget === "setting"
        ? {
            title: "Thông báo",
            dataIndex: "notification", // Đảm bảo sử dụng dataIndex phù hợp
            width: "5%",
            backgroundColor: "red",
            editable: true,
          }
        : null,
    ].filter(Boolean); // Lọc ra các giá trị falsy
    const set = new Map(newColumns.map((item) => [item.title, item]));

    const newList = Array.from(set.values());
    localStorage.setItem("filterColumns", JSON.stringify(newListMap));
    const newListMap = newList.map((item, index) => {
      let textColor;
      if (item?.title === "Sàn CK") {
        textColor = "rgba(92, 214, 128, 1)";
      }
      if (item?.title === "#") {
        textColor = "rgba(129, 132, 152, 1)";
      }
      if (item?.title === "Nhóm ngành") {
        textColor = "rgba(153, 186, 255, 1)";
      }

      if (item?.title.includes("%")) {
        // Xử lý cho trường hợp title có ký tự '%'
        return {
          ...item,
          render: (value) => {
            // Xử lý value như một giá trị phần trăm
            let valueString = ConvertNumber(value * 100) + " %";
            return <div>{valueString}</div>;
          },
        };
      } else if (
        item?.title === "MÃ" ||
        item?.title === "Nhóm ngành" ||
        item?.title === "#" ||
        item?.title === "Sàn CK"
      ) {
        // Xử lý cho các trường hợp khác
        return {
          ...item,
          render: (value, record, index) => {
            return (
              <div>
                {item?.title === "MÃ" ? (
                  <a>{value}</a>
                ) : item?.title === "#" ? (
                  <div style={{ color: "rgba(129, 132, 152, 1) !important" }}>
                    {value}
                  </div>
                ) : (
                  <div style={{ color: textColor }}>{value}</div>
                )}
              </div>
            );
          },
        };
      } else {
        // Xử lý mặc định
        return {
          ...item,
          render: (value) => {
            let valueString = ConvertNumber(value);
            return <div>{valueString}</div>;
          },
        };
      }
    });
    setColumns(newListMap);

    handleCloseLoading();
  };

  // const columnsMap = [
  //   ...columns,
  //   {
  //     title: '',
  //     dataIndex: 'empty',
  //     key: 'empty',
  //     align: 'left',
  //     render: (text: any, record: any) => {
  //       return {
  //         props: {
  //           style: { background: record.stt % 2 === 0 && '#1D1F2A' },
  //         },
  //         children: <div></div>,
  //       };
  //     },
  //   },
  // ];
  // useEffect(() => {
  //   axios
  //     .get(`${config.app.VITE_APP_API_URL}/user-config-share-requests`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setListIdConfig((prev) => [...prev, res.data.config.userID]);
  //     });
  // }, []);

  const code = useSelector((state) => state.search.code);
  const [isTablePriceTab, setIsTablePriceTab] = useState(false);

  const onChangeTablePriceTab = () => {
    setIsTablePriceTab(!isTablePriceTab);
  };
  const [listSignal, setListSignal] = useState([]);
  const [listChiTieu, setListChiTieu] = useState([]);

  const [listTabs, setListTabs] = useState([
    {
      symbol: "SSI",
      resolution: "1D",
      isPicked: true,
      isHover: false,
    },
    {
      symbol: "ABC",
      resolution: "2D",
      isPicked: false,
      isHover: false,
    },
    {
      symbol: "VNM",
      resolution: "1D",
      isPicked: false,
      isHover: false,
    },
  ]);

  const [curTab, setCurTab] = useState(listTabs[0]);

  const [trendingLine, setTrendingLine] = useState([]);
  const [commonIndicator, setCommonIndicator] = useState([]);
  const [priceUp, setPriceUp] = useState(0);
  const [priceDown, setPriceDown] = useState(0);

  const [sharingSignal, setSharingSignal] = useState<any>(null);
  const [checkBox, setCheckBox] = useState(false);
  const [listMatch, setListMatch] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("thongTin");
  const [tableTarget, setTableTarget] = useState<any>(false);
  let [symbolInfo, setSymbolInfo] = useState({});
  let [lastOrder, setLastOrder] = useState({});
  const { user } = useAppSelector((state: RootState) => state.app);

  let [symbolTongHopInfo, setSymbolTongHopInfo] = useState({});
  let [listMatchOrder, setListMatchOrder] = useState([]);
  let [totalBuyVol, setTotalBuyVol] = useState(0);
  const [accountInfo, setAccountInfo] = useState<any>([]);
  const [balance, setBalance] = useState<any>();
  const [category, setListCategory] = useState<any>([]);
  let [totalSellVol, setTotalSellVol] = useState(0);
  let [totalVol, setTotalVol] = useState(0);
  const [previousValues, setPreviousValues] = useState({
    BidVol1: null,
    AskVol1: null,
    BidVol2: null,
    AskVol2: null,
    BidVol3: null,
    AskVol3: null,
    LastPrice: null,
    Change: null,
    RatioChange: null,
    Symbol: null,
    TotalVol: null,
    TotalBuyVol: null,
    TotalSellVol: null,
    // ... add more as needed
  });
  const [date, setDate] = useState<any>(new Date());
  let [isFloor, setIsFloor] = useState(false);
  let [isCeiling, setIsCeiling] = useState(false);
  const [bgColors, setBgColors] = useState({
    BidVol1: "transparent",
    AskVol1: "transparent",
    BidVol2: "transparent",
    AskVol2: "transparent",
    BidVol3: "transparent",
    AskVol3: "transparent",
    BidVol4: "transparent",
    AskVol4: "transparent",
    BidVol5: "transparent",
    AskVol5: "transparent",
    BidVol6: "transparent",
    AskVol6: "transparent",
    LastPrice: "transparent",
    Change: "transparent",
    RatioChange: "transparent",
    TotalVol: "transparent",
    TotalBuyVol: "transparent",
    TotalSellVol: "transparent",
    // ... add more as needed
  });
  let [curSection, setCurSection] = useState("chiTiet");

  const location = useLocation();
  const activeTabProps = location?.state?.activeTab || {}; // Defaulting to an empty object if state is undefined

  useEffect(() => {
    if (activeTabProps === "congCu") {
      setTabMenuTarget("congcu");
    }
  }, [activeTabProps]);

  useEffect(() => {
    let newBgColors = { ...bgColors };
    let hasChanged = false;

    for (let key in previousValues) {
      if (!lastOrder) continue;
      if (!previousValues) continue;
      if (
        lastOrder[key] !== previousValues[key] &&
        lastOrder?.symbol === previousValues?.Symbol
      ) {
        newBgColors[key] = "#d3a43f";
        hasChanged = true;
      }
      if (key === "TotalBuyVol" && lastOrder?.type === "B") {
        newBgColors[key] = "#d3a43f";
      }
      if (key === "TotalSellVol" && lastOrder?.type === "S") {
        newBgColors[key] = "#d3a43f";
      }
    }

    if (hasChanged) {
      setPreviousValues((prevPreviousValues) => {
        return {
          ...prevPreviousValues,
          BidVol1: lastOrder?.BidVol1,
          AskVol1: lastOrder?.AskVol1,
          BidVol2: lastOrder?.BidVol2,
          AskVol2: lastOrder?.AskVol2,
          BidVol3: lastOrder?.BidVol3,
          AskVol3: lastOrder?.AskVol3,
          BidVol4: lastOrder?.BidVol4,
          AskVol4: lastOrder?.AskVol4,
          BidVol5: lastOrder?.BidVol5,
          AskVol5: lastOrder?.AskVol5,
          BidVol6: lastOrder?.BidVol6,
          AskVol6: lastOrder?.AskVol6,
          LastPrice: lastOrder?.LastPrice,
          Change: lastOrder?.Change,
          RatioChange: lastOrder?.RatioChange,
          Symbol: lastOrder?.symbol,
          TotalVol: lastOrder?.TotalVol,
          TotalBuyVol: lastOrder?.TotalBuyVol,
          TotalSellVol: lastOrder?.TotalSellVol,

          // ... add more as needed
        };
      });
      setBgColors(newBgColors);

      const timer = setTimeout(() => {
        setBgColors({
          BidVol1: "transparent",
          AskVol1: "transparent",
          BidVol2: "transparent",
          AskVol2: "transparent",
          BidVol3: "transparent",
          AskVol3: "transparent",
          LastPrice: "transparent",
          Change: "transparent",
          RatioChange: "transparent",
          // ... add more as needed
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setPreviousValues((prevPreviousValues) => {
        return {
          ...prevPreviousValues,
          Symbol: lastOrder?.symbol,
        };
      });
    }
  }, [lastOrder]);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   axios
  //     .get(`${config.app.VITE_APP_API_URL}/getAccountInfo`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setAccountInfo(res.data);
  //       setBalance(res.data.balance);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching account info:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   getPortfolio();
  // }, []);

  const getPortfolio = () => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/getPortfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListCategory(res.data.holdings);
      })
      .catch((error) => {
        console.error("Error fetching account info:", error);
      });
  };
  // useEffect(() => {
  //   if (tabMenuTarget === 'congcu') {
  //     if (curTab?.symbol !== 'VNINDEX') {
  //       axios
  //         .get(
  //           `${config.app.VITE_APP_API_URL}/symbol_info?query=${curTab.symbol}`
  //         )
  //         .then((res) => {
  //           setSymbolInfo(res?.data[0]);
  //         });
  //       // axios
  //       //   .get(
  //       //     `${config.app.VITE_APP_API_URL}/mua_ban_chu_dong?symbol=${curTab.symbol}`
  //       //   )
  //       //   .then((res) => {
  //       //     let removeZeroPrice = res?.data?.data?.filter((item) => {
  //       //       return item?.LastPrice !== 0;
  //       //     });
  //       //     // setListMatchOrder(removeZeroPrice);
  //       //     // setLastOrder(res?.data?.data[0]);
  //       //   });

  //       axios
  //         .get(
  //           `${config.app.VITE_APP_API_URL}/mua_ban_chu_dong_short?symbol=${curTab.symbol}`
  //         )
  //         .then((res) => {
  //           // let removeZeroPrice = res?.data?.data?.filter((item) => {
  //           //   return item?.LastPrice !== 0;
  //           // });
  //           // let totalVol = sumBy(res?.data?.data, 'LastVol');
  //           let totalVol = res?.data?.data[0]?.TotalVol;
  //           let totalBuyVol = res?.data?.data[0]?.TotalBuyVol;
  //           let totalSellVol = res?.data?.data[0]?.TotalSellVol;

  //           // let totalBuyVol = sumBy(
  //           //   res?.data?.data?.filter((item: any, index: number) => {
  //           //     return item?.type === 'B';
  //           //   }),
  //           //   'LastVol'
  //           // );
  //           // let totalSellVol =
  //           setListMatchOrder(res?.data?.data);
  //           setTotalBuyVol(totalBuyVol);
  //           setTotalSellVol(totalSellVol);
  //           setTotalVol(totalVol);
  //           setLastOrder(res?.data?.data[0]);
  //           setPreviousValues((prevPreviousValues) => {
  //             return {
  //               ...prevPreviousValues,
  //               TotalBuyVol: totalBuyVol,
  //               TotalSellVol: totalSellVol,
  //             };
  //           });
  //         });

  //       axios
  //         .get(
  //           `${config.app.VITE_APP_API_URL}/DailyStockPrice?symbol=${
  //             curTab.symbol
  //           }&fromDate=${convertDateMin(date)}&toDate=${convertDate(date)}`
  //         )
  //         .then((res) => {
  //           let info = res?.data?.data?.pop();

  //           let totalBuyVol = info?.stockBUVol;
  //           let totalSellVol = info?.stockSDVol;
  //           let lastOrderNew = {
  //             symbol: info?.Symbol,
  //             Ceiling: info?.CeilingPrice,
  //             Floor: info?.FloorPrice,
  //             RefPrice: info?.RefPrice,
  //             AvgPrice: info?.AveragePrice,
  //             PriorVal: '',
  //             LastPrice: info?.ClosePrice,
  //             LastVol: info?.TotalTradedVol,
  //             TotalVal: info?.TotalMatchVal,
  //             TotalVol: info?.TotalMatchVol,
  //             BidPrice1: '',
  //             BidPrice2: '',
  //             BidPrice3: '',
  //             BidVol1: '',
  //             BidVol2: '',
  //             BidVol3: '',
  //             AskPrice1: '',
  //             AskPrice2: '',
  //             AskPrice3: '',
  //             AskVol1: '',
  //             AskVol2: '',
  //             AskVol3: '',
  //             MarketId: '',
  //             Exchange: '',
  //             Change: info?.PriceChange,
  //             RatioChange: info?.PerPriceChange,
  //             type: 'B',
  //             highest: info?.HighestPrice,
  //             lowest: info?.LowestPrice,
  //             openPrice: info?.OpenPrice,
  //             ThiGiaVon: '',
  //             GiaTri: info?.TotalTradedValue,
  //             KhoiLuong: info?.TotalTradedVol,
  //             SoLuongCPLH: '',
  //             KhoiLuongMuaNuocNgoai: info?.ForeignBuyVolTotal,
  //             KhoiLuongBanNuocNgoai: info?.ForeignSellVolTotal,

  //             GiaTrungBinh: info?.AveragePrice,
  //           };
  //           // setLastOrder(lastOrderNew);
  //           setSymbolTongHopInfo(lastOrderNew);
  //           // setTotalBuyVol(totalBuyVol);
  //           // setTotalSellVol(totalSellVol);
  //           setPreviousValues((prevPreviousValues) => {
  //             return {
  //               ...prevPreviousValues,
  //               TotalBuyVol: totalBuyVol,
  //               TotalSellVol: totalSellVol,
  //             };
  //           });
  //         })
  //         .catch((err) => {});
  //     } else {
  //       setSymbolInfo({
  //         symbol: 'VNINDEX',
  //         full_name: 'VNINDEX',
  //         description: 'VNINDEX',
  //         exchange: '',
  //         type: 'index',
  //         exchange_logo:
  //           'https://s3-symbol-logo.tradingview.com/country/US.svg',
  //       });
  //       let lastOrderNew = {
  //         symbol: 'VNINDEX',
  //         Ceiling: '',
  //         Floor: '',
  //         RefPrice: '',
  //         AvgPrice: '',
  //         PriorVal: '',
  //         LastPrice: '',
  //         LastVol: '',
  //         TotalVal: '',
  //         TotalVol: '',
  //         BidPrice1: '',
  //         BidPrice2: '',
  //         BidPrice3: '',
  //         BidVol1: '',
  //         BidVol2: '',
  //         BidVol3: '',
  //         AskPrice1: '',
  //         AskPrice2: '',
  //         AskPrice3: '',
  //         AskVol1: '',
  //         AskVol2: '',
  //         AskVol3: '',
  //         MarketId: '',
  //         Exchange: '',
  //         Change: '',
  //         RatioChange: '',
  //         type: '',
  //         highest: '',
  //         lowest: '',
  //         openPrice: '',
  //         ThiGiaVon: '',
  //         GiaTri: '',
  //         KhoiLuong: '',
  //         SoLuongCPLH: '',
  //         KhoiLuongMuaNuocNgoai: '',
  //         KhoiLuongBanNuocNgoai: '',
  //         GiaTriMuaNuocNgoai: '',
  //         GiaTriBanNuocNgoai: '',
  //         GiaTrungBinh: '',
  //       };
  //       setListMatchOrder([]);
  //       setLastOrder(lastOrderNew);
  //       setSymbolTongHopInfo(lastOrderNew);
  //       setTotalBuyVol('');
  //       setTotalSellVol('');
  //     }
  //   }
  // }, [curTab?.symbol]);

  // if (lastOrder?.Floor === lastOrder?.LastPrice) {
  //   isFloor = true;
  // } else {
  //   isFloor = false;
  // }

  // if (lastOrder?.Ceiling === lastOrder?.LastPrice) {
  //   isCeiling = true;
  // } else {
  //   isCeiling = false;
  // }

  const openNotification = (chartInfo: any) => {
    api.info({
      message: `Thông báo chia sẻ biểu đồ`,
      description: `${chartInfo[1]?.name} đã chia sẻ 1 biểu đồ cho bạn !!!`,
      placement: "topRight",
      duration: 5,
    });
  };

  useEffect(() => {
    // const ws = new WebSocket('ws://localhost:8080'); // replace widiv your server address
    const ws = new WebSocket(config.socket.VITE_REACT_APP_SOCKET_IO);

    ws.onopen = () => {
      // Send a message to the server indicating interest in a symbol
      ws.send(
        JSON.stringify({ type: "SUBSCRIBE", symbol: symbolInfo?.symbol })
      );
    };
    ws.addEventListener("message", (event) => {
      const parsedData = JSON.parse(event.data);
      if (!parsedData?.isDuplicate) {
        setListMatchOrder((prevListMatchOrder) => {
          return [parsedData, ...prevListMatchOrder];
        });
        setTotalVol(parsedData?.TotalVol);
      }

      setLastOrder(parsedData);
      if (parsedData?.type === "B") {
        setTotalBuyVol((prevTotalBuyVol) => {
          return prevTotalBuyVol + parsedData?.LastVol;
        });
      } else if (parsedData?.type === "S") {
        setTotalSellVol((prevTotalSellVol) => {
          return prevTotalSellVol + parsedData?.LastVol;
        });
      }
    });

    return () => {
      ws.close();
    };
  }, [symbolInfo]);
  let groupByLastPrice = groupBy(listMatchOrder, "LastPrice");
  let groupByLastPriceMap = Object.values(groupByLastPrice).map((item) => {
    return sumBy(item, "LastVol");
  });
  const onSaveListChiTieu = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/listChiTieu/add`,
        {
          ownerId: user?.userID,
          symbol: listSymbolPicked,
          signalName: `Tín hiệu`,
          signalInfo: listTieuChi,
          // symbolNoti:listSymbolPicked
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getListTieuChi();
      })
      .catch((error) => {
        console.error("Error saving signal:", error);
      });
  };
  const onSaveSignal = () => {
    const savedChart = localStorage.getItem("myChartDataFilter");
    if (savedChart) {
      let obj = JSON.parse(savedChart);
      const listSource = obj?.charts[0]?.panes[0]?.sources;
      let curMainSeries = listSource?.find(
        (item) => item?.type === "MainSeries"
      );
      let curSymbol = curMainSeries?.state?.symbol;
      let trendingLine = listSource.filter((item) => {
        return (
          (item.type === "LineToolTrendLine" &&
            //symbol = latestCurTab?.symbol
            item.state.symbol === curSymbol) ||
          item.state.symbol === `HOSE:${curSymbol}`
        );
      });
      obj.charts[0].panes[0].sources = trendingLine;
      const saveChartFilter = JSON.stringify(obj);
      axios
        .post(
          `${config.app.VITE_APP_API_URL}/signals/add`,
          {
            ownerId: user?.userID,
            symbol: curTab?.symbol,
            signalName: `Tín hiệu ${curTab?.symbol}`,
            signalInfo: saveChartFilter,
            // signalInfo: savedChart,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          notification.success({
            message: "Lưu tín hiệu thành cồng",
            // description:
            //   'Kẻ đường trendline và cài đặt giá thông báo cho tín hiệu',
            duration: 2,
            placement: "bottomRight",
          });
          getListSignals();
        })
        .catch((error) => {
          let errorData = error?.response?.data?.message;
          if (errorData === "Token expired") {
            notification.error({
              message: "Phiên đăng nhập hết hạn",
              description: "Vui lòng đăng nhập lại để tiếp tục sử dụng",
              duration: 2,
              placement: "bottomRight",
            });
          }
          if (errorData === "Forbidden") {
            notification.error({
              message: "Chưa đăng nhập",
              description: "Vui lòng đăng nhập để tiếp tục sử dụng",
              duration: 2,
              placement: "bottomRight",
            });
          }
          console.error("Error saving signal:", error);
        });
    }
  };
  let groupByLastPriceDetailMap = Object.values(groupByLastPrice).map(
    (item, index) => {
      let price = Object.keys(groupByLastPrice)[index];
      return {
        total: sumBy(item, "LastVol"),
        totalBuy: sumBy(
          item.filter((item: any, index: number) => {
            return item?.type === "B";
          }),
          "LastVol"
        ),
        totalSell: sumBy(
          item.filter((item: any, index: number) => {
            return item?.type === "S";
          }),
          "LastVol"
        ),
        totalATC:
          price ==
          item.find((item: any, index: number) => {
            return item?.Time.includes("14:45");
          })?.LastPrice
            ? item.find((item: any, index: number) => {
                return item?.Time.includes("14:45");
              })?.LastVol
            : 0,
        totalATO:
          price == listMatchOrder[listMatchOrder.length - 1]?.LastPrice
            ? listMatchOrder[listMatchOrder.length - 1]?.LastVol
            : 0,
        price,
      };
    }
  );

  groupByLastPriceMap = groupByLastPriceMap;

  let yAxisData = groupByLastPrice
    ? Object.keys(groupByLastPrice).map((item) => formatNumber(item))
    : [];
  while (yAxisData.length < 30) {
    yAxisData.push("");
  }

  let yAxisDataMap = yAxisData.reverse();
  // let yAxisDataMap = groupByLastPrice
  //   ? [...yAxisData, "", "", "", "", "", ""].reverse()
  //   : [];
  let seriesDataBuy = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalBuy;
    // return {
    //   // value: item / 1000,

    //   value: groupByLastPriceDetailMap[index]?.totalBuy,
    //   itemStyle: {
    //     borderRadius: [4, 4, 4, 4],
    //     // color:
    //     //   +price === +lastOrder.RefPrice
    //     //     ? '#CCAA00'
    //     //     : price > lastOrder.RefPrice
    //     //       ? '#575a6a'
    //     //       : '#E43637',
    //   },
    // };
  });
  while (seriesDataBuy.length < 30) {
    seriesDataBuy.push({
      value: 0,
    });
  }

  let seriesDataSell = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalSell;
  });
  while (seriesDataSell.length < 30) {
    seriesDataSell.push({
      value: 0,
    });
  }
  let seriesDataATC = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalATC;
  });
  while (seriesDataATC.length < 30) {
    seriesDataATC.push({
      value: 0,
    });
  }
  let seriesDataATO = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalATO;
  });
  while (seriesDataATO.length < 30) {
    seriesDataATO.push({
      value: 0,
    });
  }

  // let seriesDataMap = seriesData.reverse();
  let seriesDataMapBuy = seriesDataBuy.reverse();
  let seriesDataMapSell = seriesDataSell.reverse();
  let seriesDataMapATC = seriesDataATC.reverse();
  let seriesDataMapATO = seriesDataATO.reverse();

  let series = [
    {
      data: seriesDataMapBuy,
      type: "bar",
      stack: "a",
      emphasis: { label: { color: "red" }, scale: true },
      itemStyle: {
        color: "#575a6a",
        type: "buy",
      },
      barMinWidth: "16px", // Tăng độ rộng tối thiểu của mỗi cột
      // barMaxWidth: '20px', // Tăng độ rộng tối đa của mỗi cột
      barCategoryGap: "20px", // Tăng khoảng cách giữa các nhóm cột
      // barGap: '5%',
    },
    {
      data: seriesDataMapSell,
      type: "bar",
      stack: "a",
      emphasis: { label: { color: "red" }, scale: true },
      itemStyle: {
        color: "#E43637",
        type: "sell",
      },
      barMinWidth: "16px", // Tăng độ rộng tối thiểu của mỗi cột
      // barMaxWidth: '20px', // Tăng độ rộng tối đa của mỗi cột
      barCategoryGap: "20px", // Tăng khoảng cách giữa các nhóm cột
      // barGap: '5%',
    },
    {
      data: seriesDataMapATO,
      type: "bar",
      stack: "a",
      emphasis: { label: { color: "red" }, scale: true },
      itemStyle: {
        color: "#CCAA00",
        type: "ATO",
      },
      barMinWidth: "16px", // Tăng độ rộng tối thiểu của mỗi cột
      // barMaxWidth: '20px', // Tăng độ rộng tối đa của mỗi cột
      barCategoryGap: "20px", // Tăng khoảng cách giữa các nhóm cột
      // barGap: '5%',
    },
    {
      data: seriesDataMapATC,
      type: "bar",
      stack: "a",
      emphasis: { label: { color: "#149397" }, scale: false },
      itemStyle: {
        color: "#CCAA01",
        type: "ATC",
      },
      barMinWidth: "16px", // Tăng độ rộng tối thiểu của mỗi cột
      // barMaxWidth: '20px', // Tăng độ rộng tối đa của mỗi cột
      barCategoryGap: "20px", // Tăng khoảng cách giữa các nhóm cột
      // barGap: '5%',
    },
  ];

  const stackInfo = {};
  for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const stackName = series[j].stack;
      if (!stackName) {
        continue;
      }
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: [],
        };
      }
      const info = stackInfo[stackName];
      const data = series[j].data[i];
      if (data && data !== "-") {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j;
        }
        info.stackEnd[i] = j;
      }
    }
  }
  for (let i = 0; i < series.length; ++i) {
    const data = series[i].data;
    const info = stackInfo[series[i]?.stack];
    for (let j = 0; j < series[i].data.length; ++j) {
      // const isStart = info.stackStart[j] === i;
      const isEnd = info.stackEnd[j] === i;
      const topBorder = isEnd ? 4 : 0;
      const bottomBorder = 0;
      data[j] = {
        value: data[j],
        itemStyle: {
          borderRadius: [bottomBorder, topBorder, topBorder, bottomBorder],
        },
      };
    }
  }

  const emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };
  const xAxisData = ["24/07", "26/07", "28/07", "01/08", "03/08"];
  const data4 = [-200, 100, 150, -50, 10];
  const dataWithColors = data4.map((value) => {
    return {
      value: value,
      itemStyle: {
        color: value > 0 ? "rgba(66, 167, 50, 1)" : "rgba(228, 54, 55, 1)",
      },
    };
  });

  const optionInformation = {
    legend: {
      data: [],
      left: "10%",
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      name: "",
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
    },
    yAxis: {},
    grid: {
      bottom: 100,
    },
    series: [
      {
        name: "bar4",
        type: "bar",
        stack: "two",
        // Here we use the dataWithColors array
        data: dataWithColors,
      },
    ],
  };

  const onChangeTrendingLine = (trendingLine: any) => {
    setListMatch((prevListMatch: any) => {
      const listMatchNew = [];
      for (let i = 0; i < trendingLine?.length; i++) {
        const element = trendingLine[i];

        // let itemOld = prevListMatch.find((item2) => {
        //   return item2.id === element.id;
        // });
        // if (itemOld) {
        //   listMatchNew.push({
        //     ...itemOld,
        //     ...element,
        //   });
        // }
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
  const onChangeIndicator = (indicator: any) => {
    setCommonIndicator(indicator);
  };
  const onChangePosition = (position: any) => {
    if (position?.length > 0) {
      setTrendingLine((prevTrendingLine: any) => {
        const listMatchNew: any = [];
        for (let i = 0; i < prevTrendingLine?.length; i++) {
          const element = prevTrendingLine[i];
          if (element?.position !== position[i]?.position) {
            listMatchNew.push({
              ...element,
              position: position[i]?.position,
              curPrice: position[i]?.curPrice,
              time: position[i]?.time,
              message: position[i]?.message,
            });
          }
        }
        setListMatch((prevListMatch: any) => {
          return [...prevListMatch, ...listMatchNew];
        });
        return prevTrendingLine.map((item: any, index: any) => {
          return {
            ...item,
            position: position[index]?.position,
            curPrice: position[index]?.curPrice,
            time: position[index]?.time,
            // message: 'Đường kháng cự/hỗ trợ',
          };
        });
      });
    }
  };
  const onChangeSymbol = (symbolInfo: any) => {
    const symbolName = symbolInfo?.name;
    // setTrendingLine([]);
    // setListMatch([]);
    setListTabs((prevListTabs) => {
      return prevListTabs.map((item) => {
        return {
          ...item,
          symbol: item?.isPicked ? symbolName : item.symbol,
        };
      });
    });
    setCurTab((prevCurTab) => {
      return {
        ...prevCurTab,
        symbol: symbolName,
        SignalInfo: null,
        SignalID: null,
        forceChange: null,
      };
    });
  };
  useEffect(() => {
    if (!!code) {
      const newListTabs = listTabs?.map((item: any, index: any) => {
        return index === 0
          ? {
              symbol: code ? code.toUpperCase() : "SSI",
              resolution: "1D",
              isPicked: true,
              isHover: false,
            }
          : {
              ...item,
              isPicked: false,
              isHover: false,
            };
      });

      setListTabs(newListTabs);

      // setCurTab((prevCurTab) => {
      //   return {
      //     ...prevCurTab,
      //     symbol: code ? code.toUpperCase() : 'SSI',
      //   };
      // });
      // setCurTab(newListTabs[0]);
    }
  }, [code]);

  const onChangeResolution = (resolution: any) => {
    setListTabs((prevListTabs) => {
      return prevListTabs.map((item) => {
        return {
          ...item,
          resolution: item?.isPicked ? resolution : item.resolution,
        };
      });
    });
    setCurTab((prevCurTab) => {
      return {
        ...prevCurTab,
        resolution: resolution,
      };
    });
  };

  const onChangeTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isPicked: index === id ? true : false,
      };
    });
    setListTabs(newListTabs);
    setCurTab(newListTabs[id]);
  };

  const onRemoveTab = (id: any) => {
    if (listTabs?.length === 1) {
      alert("Cần ít nhất 1 biểu đồ");
      return;
    }
    let newListTabs = listTabs.filter((item, index) => index !== id);
    //if removeTab is curTab => set new curTab
    if (listTabs[id].isPicked) {
      newListTabs = newListTabs.map((item, index) => {
        return {
          ...item,
          isPicked: index === newListTabs?.length - 1 ? true : false,
        };
      });
    }
    setListTabs(newListTabs);
    setCurTab(newListTabs[newListTabs?.length - 1]);
  };

  const addNewTab = () => {
    if (listTabs?.length >= 8) {
      alert("Nâng cấp vip để mở thêm tab");
      return;
    }
    let newListTabs = [
      ...listTabs,
      {
        symbol: "SSI",
        resolution: "1D",
        isPicked: false,
        isHover: false,
      },
    ];
    //set new tab is picked
    newListTabs = newListTabs.map((item, index) => {
      return {
        ...item,
        isPicked: index === newListTabs?.length - 1 ? true : false,
      };
    });
    setListTabs(newListTabs);
    setCurTab(newListTabs[newListTabs?.length - 1]);
  };

  const onHoverTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isHover: index === id ? true : false,
      };
    });
    setListTabs(newListTabs);
  };

  const onMouseLeaveTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isHover: false,
      };
    });
    setListTabs(newListTabs);
  };

  const onChange = (checked: boolean) => {};
  const signalAction = useSelector((state: any) => {
    return state?.chart?.someState;
  }); // Sử dụng state nếu action thay đổi state

  useEffect(() => {
    getListSignals();
    // Bạn có thể cần một điều kiện ở đây để chắc chắn rằng getListSignals được gọi đúng lúc
  }, [signalAction]);

  useEffect(() => {
    getListTieuChi();
    // Bạn có thể cần một điều kiện ở đây để chắc chắn rằng getListSignals được gọi đúng lúc
  }, []);

  const getListSignals = () => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/signals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListSignal(res?.data?.signals);
      })
      .catch((error) => {
        console.error("Error fetching account info:", error);
      });
  };
  const getListTieuChi = () => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/listChiTieu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListChiTieu(res?.data?.signals);
      })
      .catch((error) => {
        console.error("Error fetching account info:", error);
      });
  };
  const ChartTopBar: FC<any> = () => {
    return (
      <div className="frame-parent216">
        <div className="frame-parent217">
          <div className="frame-parent218">
            {listTabs?.map((item: any, index: any) => {
              return (
                <div
                  onMouseOver={() => {
                    onHoverTab(index);
                  }}
                  onMouseLeave={() => {
                    onMouseLeaveTab(index);
                  }}
                  key={index}
                  className={
                    item?.isPicked
                      ? "vuesaxlinearchart-container"
                      : "vuesaxlinearchart-parent"
                  }
                  onClick={() => {
                    onChangeTab(index);
                  }}
                >
                  <div className="rectangle-parent">
                    {item?.isPicked ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 22H21"
                          stroke={screenMode === "dark" ? "#fff" : "#333"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.59998 8.37988H4C3.45 8.37988 3 8.82988 3 9.37988V17.9999C3 18.5499 3.45 18.9999 4 18.9999H5.59998C6.14998 18.9999 6.59998 18.5499 6.59998 17.9999V9.37988C6.59998 8.82988 6.14998 8.37988 5.59998 8.37988Z"
                          stroke={screenMode === "dark" ? "#fff" : "#333"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8002 5.19043H11.2002C10.6502 5.19043 10.2002 5.64043 10.2002 6.19043V18.0004C10.2002 18.5504 10.6502 19.0004 11.2002 19.0004H12.8002C13.3502 19.0004 13.8002 18.5504 13.8002 18.0004V6.19043C13.8002 5.64043 13.3502 5.19043 12.8002 5.19043Z"
                          stroke={screenMode === "dark" ? "#fff" : "#333"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.0004 2H18.4004C17.8504 2 17.4004 2.45 17.4004 3V18C17.4004 18.55 17.8504 19 18.4004 19H20.0004C20.5504 19 21.0004 18.55 21.0004 18V3C21.0004 2.45 20.5504 2 20.0004 2Z"
                          stroke={screenMode === "dark" ? "#fff" : "#333"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
                          d="M3 22H21"
                          stroke={screenMode === "dark" ? "#abb3bf" : "#a3a09b"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.59998 8.37988H4C3.45 8.37988 3 8.82988 3 9.37988V17.9999C3 18.5499 3.45 18.9999 4 18.9999H5.59998C6.14998 18.9999 6.59998 18.5499 6.59998 17.9999V9.37988C6.59998 8.82988 6.14998 8.37988 5.59998 8.37988Z"
                          stroke={screenMode === "dark" ? "#abb3bf" : "#a3a09b"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8002 5.19043H11.2002C10.6502 5.19043 10.2002 5.64043 10.2002 6.19043V18.0004C10.2002 18.5504 10.6502 19.0004 11.2002 19.0004H12.8002C13.3502 19.0004 13.8002 18.5504 13.8002 18.0004V6.19043C13.8002 5.64043 13.3502 5.19043 12.8002 5.19043Z"
                          stroke={screenMode === "dark" ? "#abb3bf" : "#a3a09b"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.0004 2H18.4004C17.8504 2 17.4004 2.45 17.4004 3V18C17.4004 18.55 17.8504 19 18.4004 19H20.0004C20.5504 19 21.0004 18.55 21.0004 18V3C21.0004 2.45 20.5504 2 20.0004 2Z"
                          stroke={screenMode === "dark" ? "#abb3bf" : "#a3a09b"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="volume">
                    {item?.symbol} ({item?.resolution})
                  </div>
                  <div
                    style={{
                      visibility:
                        item?.isPicked || item?.isHover ? "visible" : "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveTab(index);
                    }}
                    className="edit-path"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.15411 7L13.9578 0.281288C14.0551 0.169632 13.9733 0 13.8229 0H12.0586C11.9547 0 11.8552 0.045092 11.7867 0.122393L7 5.66442L2.21332 0.122393C2.147 0.045092 2.0475 0 1.94138 0H0.177052C0.0267085 0 -0.0550963 0.169632 0.0421849 0.281288L5.84589 7L0.0421849 13.7187C0.020393 13.7436 0.00641268 13.774 0.00190318 13.8064C-0.00260632 13.8388 0.00254441 13.8717 0.0167444 13.9014C0.0309444 13.931 0.0535972 13.956 0.0820128 13.9735C0.110428 13.991 0.143414 14.0002 0.177052 14H1.94138C2.04529 14 2.14479 13.9549 2.21332 13.8776L7 8.33558L11.7867 13.8776C11.853 13.9549 11.9525 14 12.0586 14H13.8229C13.9733 14 14.0551 13.8304 13.9578 13.7187L8.15411 7Z"
                        fill={screenMode === "dark" ? "#fff" : "#333"}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="iconoutlinedsuggestedplus-parent">
            <div
              className="edit-path"
              onClick={() => {
                addNewTab();
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.29688 0.5625H9.70312C9.82812 0.5625 9.89062 0.625 9.89062 0.75V17.25C9.89062 17.375 9.82812 17.4375 9.70312 17.4375H8.29688C8.17188 17.4375 8.10938 17.375 8.10938 17.25V0.75C8.10938 0.625 8.17188 0.5625 8.29688 0.5625Z"
                  fill={screenMode === "dark" ? "#fff" : "#a3a09b"}
                />
                <path
                  d="M1.125 8.10938H16.875C17 8.10938 17.0625 8.17188 17.0625 8.29688V9.70312C17.0625 9.82812 17 9.89062 16.875 9.89062H1.125C1 9.89062 0.9375 9.82812 0.9375 9.70312V8.29688C0.9375 8.17188 1 8.10938 1.125 8.10938Z"
                  fill={screenMode === "dark" ? "#fff" : "#a3a09b"}
                />
              </svg>
            </div>

            <div className="edit-path">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.79682 2.53901L4.82573 1.5101C4.85051 1.4852 4.86781 1.45384 4.87565 1.41959C4.88349 1.38534 4.88157 1.34957 4.87009 1.31636C4.85861 1.28315 4.83805 1.25383 4.81073 1.23173C4.78341 1.20963 4.75045 1.19564 4.71557 1.19135L0.960884 0.748384C0.841353 0.734322 0.738228 0.835103 0.75229 0.956978L1.19526 4.71167C1.21401 4.86635 1.40385 4.93198 1.51401 4.82182L2.53823 3.7976L5.67182 6.92885C5.74448 7.00151 5.86401 7.00151 5.93667 6.92885L6.93042 5.93745C7.00307 5.86479 7.00307 5.74526 6.93042 5.6726L3.79682 2.53901ZM12.0632 6.92885C12.1359 7.00151 12.2554 7.00151 12.3281 6.92885L15.4617 3.7976L16.4859 4.82182C16.5108 4.84661 16.5422 4.8639 16.5764 4.87174C16.6107 4.87959 16.6464 4.87766 16.6796 4.86618C16.7128 4.85471 16.7422 4.83414 16.7643 4.80682C16.7864 4.77951 16.8003 4.74654 16.8046 4.71167L17.2476 0.959322C17.2617 0.83979 17.1609 0.736666 17.039 0.750728L13.2843 1.1937C13.1296 1.21245 13.064 1.40229 13.1742 1.51245L14.2031 2.54135L11.0695 5.67026C11.0346 5.7055 11.015 5.75309 11.015 5.80268C11.015 5.85227 11.0346 5.89986 11.0695 5.9351L12.0632 6.92885ZM16.8046 13.2851C16.7859 13.1304 16.596 13.0648 16.4859 13.1749L15.4617 14.1992L12.3281 11.0679C12.2928 11.033 12.2452 11.0134 12.1956 11.0134C12.1461 11.0134 12.0985 11.033 12.0632 11.0679L11.0695 12.0593C11.0346 12.0946 11.015 12.1422 11.015 12.1917C11.015 12.2413 11.0346 12.2889 11.0695 12.3242L14.2031 15.4578L13.1742 16.4867C13.1494 16.5116 13.1321 16.5429 13.1242 16.5772C13.1164 16.6114 13.1183 16.6472 13.1298 16.6804C13.1413 16.7136 13.1618 16.7429 13.1892 16.765C13.2165 16.7871 13.2494 16.8011 13.2843 16.8054L17.039 17.2484C17.1585 17.2624 17.2617 17.1617 17.2476 17.0398L16.8046 13.2851ZM5.93667 11.0679C5.90142 11.033 5.85384 11.0134 5.80424 11.0134C5.75465 11.0134 5.70706 11.033 5.67182 11.0679L2.53823 14.1992L1.51401 13.1749C1.4891 13.1502 1.45774 13.1329 1.42349 13.125C1.38924 13.1172 1.35348 13.1191 1.32027 13.1306C1.28706 13.1421 1.25774 13.1626 1.23564 13.1899C1.21354 13.2173 1.19955 13.2502 1.19526 13.2851L0.75229 17.0374C0.738228 17.157 0.839009 17.2601 0.960884 17.246L4.71557 16.8031C4.87026 16.7843 4.93588 16.5945 4.82573 16.4843L3.79682 15.4578L6.93042 12.3265C7.00307 12.2539 7.00307 12.1343 6.93042 12.0617L5.93667 11.0679Z"
                  fill={screenMode === "dark" ? "#fff" : "#a3a09b"}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const onChooseSignal = (item: any) => {
    setCurTab({
      symbol: item?.symbol,
      resolution: "1D",
      isPicked: true,
      isHover: false,
      forceChange: null,
      ...item,
    });
  };
  const onChooseTieuChi = (item: any) => {
    let signalInfo = JSON.parse(item?.SignalInfo);
    let symbolInfo = JSON.parse(item?.symbol);
    setListSymbolPicked(symbolInfo);
    setListTieuChi(signalInfo);
  };
  return (
    <StyledStockFilter screen_mode={screenMode}>
      <div className={"root"}>
        <div className={"frameParent844"}>
          <div className={"frameParent845"}>
            <Targets
              pickerPopular={pickerPopular}
              setPickerPopular={setPickerPopular}
              pickerBasic={pickerBasic}
              setPickerBasic={setPickerBasic}
              pickerTechnique={pickerTechnique}
              setPickerTechnique={setPickerTechnique}
              pickerFluctuation={pickerFluctuation}
              setPickerFluctuation={setPickerFluctuation}
              pickerMyFilter={pickerMyFilter}
              setPickerMyFilter={setPickerMyFilter}
              handleClickQuy={handleClickQuy}
              handleClearTieuChi={handleClearTieuChi}
              currentChangePercent={currentChangePercent}
              setIsHoverClear={setIsHoverClear}
              handleClickListItemRight={handleClickListItemRight}
              trendingLine={trendingLine}
              setTrendingLine={setTrendingLine}
              handleClickListItemLeft={handleClickListItemLeft}
              listSignal={listSignal}
              listChiTieuAll={listChiTieu}
              handleClickListItemInterval={handleClickListItemInterval}
              currentChangeTieuChi={currentChangeTieuChi}
              currentChangeTieuChiInterval={currentChangeTieuChiInterval}
              currentChangeTieuChiLeft={currentChangeTieuChiLeft}
              priceDown={priceDown}
              currentChangeTieuChiRight={currentChangeTieuChiRight}
              curTab={curTab}
              currentChangeTieuChiQuy={currentChangeTieuChiQuy}
              setPriceUp={setPriceUp}
              totalResult={totalResult}
              setPriceDown={setPriceDown}
              tabMenuTarget={tabMenuTarget}
              setTabMenuTarget={setTabMenuTarget}
              listMyFilter={listMyFilter}
              setListMyFilter={setListMyFilter}
              handleClickListItem={handleClickListItem}
              setSearchCriteria={setSearchCriteria}
              currentChangeSession={currentChangeSession}
              searchCriteria={searchCriteria}
              isHoverChiTieu={isHoverChiTieu}
              selectedValue={selectedValue}
              setSelectedChild={setSelectedChild}
              selectedChild={selectedChild}
              handleToggle={handleToggle}
              onFilter={onFilter}
              setIsHoverChiTieu={setIsHoverChiTieu}
              setSelectedValue={setSelectedValue}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
              scrollToBottom={scrollToBottom}
              setListIdConfig={setListIdConfig}
              listIdConfig={listIdConfig}
              handleChangeSelectIndex={handleChangeSelectIndex}
              onSaveSignal={onSaveSignal}
              onSaveListChiTieu={onSaveListChiTieu}
              handleClickListItemSession={handleClickListItemSession}
              priceUp={priceUp}
              listTieuChi={listTieuChi}
              listSymbol={listSymbol}
              setListSymbol={setListSymbol}
              listSymbolPicked={listSymbolPicked}
              setListSymbolPicked={setListSymbolPicked}
              setListTieuChi={setListTieuChi}
            />
            {tabMenuTarget === "target" ? (
              <></>
            ) : (
              <Value
                getListSignals={getListSignals}
                getListTieuChi={getListTieuChi}
                onChooseSignal={onChooseSignal}
                onChooseTieuChi={onChooseTieuChi}
                curTab={curTab}
                setCurTab={setCurTab}
                user={user}
                listSignal={listSignal}
                listChiTieuAll={listChiTieu}
                tabMenuTarget={tabMenuTarget}
                setTabMenuTarget={setTabMenuTarget}
                totalResult={totalResult}
                handleCloseSession={handleCloseSession}
                setAnchorQuy={setAnchorQuy}
                setDay={setDay}
                day={day}
                open={open}
                onFilter={onFilter}
                setRows={setRows}
                rows={rows}
                handleToggle={handleToggle}
                setListTieuChiPicked={setListTieuChiPicked}
                listTieuChiPicked={listTieuChiPicked}
                anchorElLeft={anchorElLeft}
                anchorQuy={anchorQuy}
                openLeft={openLeft}
                handleCloseLeft={handleCloseLeft}
                currentChangeTieuChiLeft={currentChangeTieuChiLeft}
                anchorEl={anchorEl}
                handleClose={handleClose}
                currentChangeTieuChi={currentChangeTieuChi}
                anchorElRight={anchorElRight}
                openRight={openRight}
                handleCloseRight={handleCloseRight}
                currentChangeTieuChiRight={currentChangeTieuChiRight}
                anchorElInterval={anchorElInterval}
                openInterval={openInterval}
                handleCloseInterval={handleCloseInterval}
                openMonth={openMonth}
                handleCloseMonth={handleCloseMonth}
                currentChangeTieuChiInterval={currentChangeTieuChiInterval}
                currentChangeTieuChiQuy={currentChangeTieuChiQuy}
                bottomEl={bottomEl}
                isHoverRight={isHoverRight}
                isHoverInterval={isHoverInterval}
                isHoverQuy={isHoverQuy}
                setIsHoverQuy={setIsHoverQuy}
                isHoverLeft={isHoverLeft}
                isHoverClear={isHoverClear}
                setIsHoverClear={setIsHoverClear}
                setIsHoverRight={setIsHoverRight}
                setIsHoverLeft={setIsHoverLeft}
                setIsHoverInterval={setIsHoverInterval}
                handleClickListItemLeft={handleClickListItemLeft}
                handleClickListItem={handleClickListItem}
                handleChangeSelectIndex={handleChangeSelectIndex}
                handleClickListItemInterval={handleClickListItemInterval}
                handleClickQuy={handleClickQuy}
                handleClickListItemRight={handleClickListItemRight}
                handleClearTieuChi={handleClearTieuChi}
                openSession={openSession}
                setCurrentChangeSession={setCurrentChangeSession}
                currentChangeSession={currentChangeSession}
                setIsHoverSession={setIsHoverSession}
                isHoverSession={isHoverSession}
                handleClickListItemSession={handleClickListItemSession}
                anchorElSession={anchorElSession}
                handleClickListItemPercent={handleClickListItemPercent}
                setAnchorEl={setAnchorEl}
                openPercent={openPercent}
                setCurrentChangePercent={setCurrentChangePercent}
                currentChangePercent={currentChangePercent}
                isHoverPercent={isHoverPercent}
                setIsHoverPercent={setIsHoverPercent}
                handleClosePercent={handleClosePercent}
                anchorElPerCent={anchorElPerCent}
                handleClickListBoolean={handleClickListBoolean}
                setIsHoverBoolean={setIsHoverBoolean}
                isHoverBoolean={isHoverBoolean}
                setCurrentChangeBoolean={setCurrentChangeBoolean}
                currentChangeBoolean={currentChangeBoolean}
                openBoolean={openBoolean}
                anchorElBoolean={anchorElBoolean}
                setAnchorElBoolean={setAnchorElBoolean}
                handleCloseBoolean={handleCloseBoolean}
                setListIdConfig={setListIdConfig}
                listIdConfig={listIdConfig}
              />
            )}
          </div>
          <div
            className="table"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tabMenuTarget === "congcu" ? (
              <>
                {/* <ChartTopBar /> */}
                <TVChartContainer
                  screenMode={screenMode}
                  theme={screenMode}
                  activeTab={activeTab}
                  onChangeSymbol={onChangeSymbol}
                  onChangeResolution={onChangeResolution}
                  listTabs={listTabs}
                  onChangeIndicator={onChangeIndicator}
                  curTab={curTab}
                  onChangeTrendingLine={onChangeTrendingLine}
                  trendingLineMessage={trendingLine}
                  onChangePosition={onChangePosition}
                  setCurTab={setCurTab}
                  // tvWidget={tvWidget}
                  // setTvWidget={setTvWidget}
                />
              </>
            ) : (
              <ResultTable
                tabMenuTarget={tabMenuTarget}
                setTabMenuTarget={setTabMenuTarget}
                totalResult={totalResult}
                loading={loading}
                setLoading={setLoading}
                pageTable={pageTable}
                setPageTable={setPageTable}
                setRows={setRows}
                rows={rows}
                setTab={setTab}
                tab={tab}
                columns={columns}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalFin={totalFin}
              />
            )}
          </div>
        </div>
        {/* <TimePicker /> */}
      </div>
    </StyledStockFilter>
  );
};

export default StockFilter;
