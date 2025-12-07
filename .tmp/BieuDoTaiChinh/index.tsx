/* eslint-disable react-hooks/exhaustive-deps */

import { Empty } from "antd";
import CustomChart from "../CustomChart";
import { StyleBieudotaichinh } from "./styled";
import { useEffect } from "react";
import useBieudotaichinh from "./hook";
import { GlobalNoScroll } from "../ChartFullScreen/ChartFullScreen";

const BieuDoTaiChinhLayout: FC<Props> = ({
  companyAsset,
  checkDataResponse,
  DATA_PROFIT_AFTER_TAX_ENTERPRISE_CHART,
  DATA_INCOME_CHART,
  DATA_SSI_CHART,
  DATA_NET_REVENUE_CHART,
  profitAfterTaxChangeEnterprise,
  incomeChange,
  changeKetQuaKinhDoanh1,
  netReveNueChange,
  handleSelectProfitAfterTaxEnterprise,
  handleSelectIncome,
  handleSelectKetQuaKinhDoanh1,
  handleSelectNetRevenue,
  DATA_INSURANCE_CHART,
  handleSelectInsurance,
  valuationChange,
  VALUATIONEV,
  DATA_RISK_PROVISION_COSTS_BANK_CHART,

  profitInsurance,
  valuationPBChange,
  changeValuationEV,
  capitalChange,
  capitalFinancialChange,
  capitalBankChange,
  capitalInsuranceChange,
  profitAfterTaxBankChange,
  changeKetQuaKinhDoanh2,
  profitAfterTaxChange,
  assetChange,
  financialAssetChange,
  bankAssetChange,
  insuranceAssetChange,
  DATA_PROFIT_AFTER_TAX_BANK_CHART,
  KET_QUA_KINH_DOANH_SSI_CHART,
  DATA_PROFIT_AFTER_TAX_CHART,
  handleSelectKetQuaKinhDoanh2,
  handleSelectProfitAfterTax,
  handleSelectProfitAfterBankTax,
  PROFIT_MARGIN,
  CHI_PHI_HOAT_DONG_SSI_CHART,
  DATA_SHORT_FINANCIAL_ASSET_CHART,
  changeProfitMargin,
  changeKetQuaKinhDoanh3,
  chiPhiDuPhong,
  shortFinancialAssetChange,
  handleSelectKetQuaKinhDoanh3,
  handleChangeSelectMarginChange,
  handleSelectChiPhiDuPhong,
  handleSelectShortFinancialAssets,
  handleSelectCashFlowChange,
  cashFlowChange,
  DATA_CASH_FLOW_CHART,
  DATA_INSURANCE_ASSET_CHART,
  DATA_BANK_ASSET_CHART,
  DATA_FINANCIAL_ASSET_CHART,
  DATA_ASSET_CHART,
  handleSelectAssetChange,
  handleFinancialAssetChange,
  handleBankAssetChange,
  handleInsuranceAssetChange,
  DATA_CAPITAL_CHART,
  DATA_CAPITAL_FINANCIAL_CHART,
  DATA_CAPITAL_BANK_CHART,
  DATA_CAPITAL_INSURANCE_CHART,
  handleSelectCapitalChange,
  handleCapitalFinancialChange,
  handleCapitalBankChange,
  handleCapitalInsuranceChange,
  handleSelectRatioChange,
  debtRatioChange,
  EQUITY_DEBT,
  screenMode,
  VALUATION,
  handleChangeSelectValuationEVChange,
  handleSelectvaluationPBChange,
  VALUATIONPB,
  handleSelectValuationChange,
  setCompany,
}) => {
  const urlPath = window.location.pathname;
  const urlPathSplit = urlPath.split("/");
  const curHeaderTabUrl = urlPathSplit[urlPathSplit.length - 1];
  useEffect(() => {
    setCompany(curHeaderTabUrl);
  }, [curHeaderTabUrl]);
  return (
    <StyleBieudotaichinh screen_mode={screenMode}>
      <GlobalNoScroll />
      <div className="wrapper-financial-chart">
        {companyAsset?.length === 0 ? (
          <div className="financial-chart-empty">
            <Empty />
          </div>
        ) : (
          <div className="financial-chart">
            <div className="first-layout">
              <CustomChart
                option={
                  checkDataResponse === "Bảo hiểm"
                    ? DATA_PROFIT_AFTER_TAX_ENTERPRISE_CHART
                    : checkDataResponse === "Ngân hàng"
                      ? DATA_INCOME_CHART
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? DATA_SSI_CHART
                        : DATA_NET_REVENUE_CHART
                }
                screenMode={screenMode}
                label={
                  checkDataResponse === "Bảo hiểm"
                    ? "Lợi nhuận sau thuế của doanh nghiệp"
                    : checkDataResponse === "Dịch vụ tài chính"
                      ? "Cơ cấu doanh thu"
                      : checkDataResponse === "Ngân hàng"
                        ? "Thu nhập lãi và các khoản phải thu tương tự"
                        : "Doanh thu thuần"
                }
                value={
                  checkDataResponse === "Bảo hiểm"
                    ? profitAfterTaxChangeEnterprise
                    : checkDataResponse === "Ngân hàng"
                      ? incomeChange
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? changeKetQuaKinhDoanh1
                        : netReveNueChange
                }
                // screenMode={screenMode}
                handleSelectChange={
                  checkDataResponse === "Bảo hiểm"
                    ? handleSelectProfitAfterTaxEnterprise
                    : checkDataResponse === "Ngân hàng"
                      ? handleSelectIncome
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? handleSelectKetQuaKinhDoanh1
                        : handleSelectNetRevenue
                }
              />
              <CustomChart
                option={
                  checkDataResponse === "Bảo hiểm"
                    ? DATA_INSURANCE_CHART
                    : checkDataResponse === "Ngân hàng"
                      ? DATA_PROFIT_AFTER_TAX_BANK_CHART
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? KET_QUA_KINH_DOANH_SSI_CHART
                        : DATA_PROFIT_AFTER_TAX_CHART
                }
                screenMode={screenMode}
                label={
                  checkDataResponse === "Bảo hiểm"
                    ? "Doanh thu phí bảo hiểm"
                    : checkDataResponse === "Dịch vụ tài chính"
                      ? "Cơ cấu doanh thu"
                      : "Lợi nhuận sau thuế"
                }
                value={
                  checkDataResponse === "Bảo hiểm"
                    ? profitInsurance
                    : checkDataResponse === "Ngân hàng"
                      ? profitAfterTaxBankChange
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? changeKetQuaKinhDoanh2
                        : profitAfterTaxChange
                }
                handleSelectChange={
                  checkDataResponse === "Bảo hiểm"
                    ? handleSelectInsurance
                    : checkDataResponse === "Ngân hàng"
                      ? handleSelectProfitAfterBankTax
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? handleSelectKetQuaKinhDoanh2
                        : handleSelectProfitAfterTax
                }
              />

              <CustomChart
                option={
                  checkDataResponse === "Bảo hiểm"
                    ? DATA_SHORT_FINANCIAL_ASSET_CHART
                    : checkDataResponse === "Ngân hàng"
                      ? DATA_RISK_PROVISION_COSTS_BANK_CHART
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? CHI_PHI_HOAT_DONG_SSI_CHART
                        : PROFIT_MARGIN
                }
                value={
                  checkDataResponse === "Bảo hiểm"
                    ? shortFinancialAssetChange
                    : checkDataResponse === "Ngân hàng"
                      ? chiPhiDuPhong
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? changeKetQuaKinhDoanh3
                        : changeProfitMargin
                }
                label={
                  checkDataResponse === "Bảo hiểm"
                    ? "Đầu tư tài chính"
                    : checkDataResponse === "Dịch vụ tài chính"
                      ? "Chi phí hoạt động"
                      : checkDataResponse === "Ngân hàng"
                        ? "Chi phí dự phòng rủi ro tín dụng"
                        : "Biên lãi"
                }
                screenMode={screenMode}
                handleSelectChange={
                  checkDataResponse === "Bảo hiểm"
                    ? handleSelectShortFinancialAssets
                    : checkDataResponse === "Ngân hàng"
                      ? handleSelectChiPhiDuPhong
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? handleSelectKetQuaKinhDoanh3
                        : handleChangeSelectMarginChange
                }
              />
              {/* <HighchartsReact
                          highcharts={Highcharts}
                          options={DATA_ASSET_CHART}
                        /> */}
            </div>

            <div className="first-layout">
              <CustomChart
                option={DATA_CASH_FLOW_CHART}
                label="Lưu chuyển tiền tệ"
                value={cashFlowChange}
                screenMode={screenMode}
                handleSelectChange={handleSelectCashFlowChange}
              />
            </div>

            <div className="first-layout">
              <CustomChart
                option={
                  checkDataResponse === "Bảo hiểm"
                    ? DATA_INSURANCE_ASSET_CHART
                    : checkDataResponse === "Ngân hàng"
                      ? DATA_BANK_ASSET_CHART
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? DATA_FINANCIAL_ASSET_CHART
                        : DATA_ASSET_CHART
                }
                value={
                  checkDataResponse === "Bảo hiểm"
                    ? insuranceAssetChange
                    : checkDataResponse === "Ngân hàng"
                      ? bankAssetChange
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? financialAssetChange
                        : assetChange
                }
                label={
                  checkDataResponse === "Bảo hiểm"
                    ? "Cơ cấu tài sản"
                    : "Tài sản"
                }
                screenMode={screenMode}
                handleSelectChange={
                  checkDataResponse === "Bảo hiểm"
                    ? handleInsuranceAssetChange
                    : checkDataResponse === "Ngân hàng"
                      ? handleBankAssetChange
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? handleFinancialAssetChange
                        : handleSelectAssetChange
                }
              />

              <CustomChart
                option={
                  checkDataResponse === "Bảo hiểm"
                    ? DATA_CAPITAL_INSURANCE_CHART
                    : checkDataResponse === "Ngân hàng"
                      ? DATA_CAPITAL_BANK_CHART
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? DATA_CAPITAL_FINANCIAL_CHART
                        : DATA_CAPITAL_CHART
                }
                value={
                  checkDataResponse === "Bảo hiểm"
                    ? capitalInsuranceChange
                    : checkDataResponse === "Ngân hàng"
                      ? capitalBankChange
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? capitalFinancialChange
                        : capitalChange
                }
                label="Nguồn vốn"
                screenMode={screenMode}
                handleSelectChange={
                  checkDataResponse === "Bảo hiểm"
                    ? handleCapitalInsuranceChange
                    : checkDataResponse === "Ngân hàng"
                      ? handleCapitalBankChange
                      : checkDataResponse === "Dịch vụ tài chính"
                        ? handleCapitalFinancialChange
                        : handleSelectCapitalChange
                }
              />
              {checkDataResponse === "Ngân hàng" ? null : (
                <CustomChart
                  option={EQUITY_DEBT}
                  value={debtRatioChange}
                  label="Hệ số nợ"
                  screenMode={screenMode}
                  handleSelectChange={handleSelectRatioChange}
                />
              )}
            </div>

            <div className="first-layout">
              <CustomChart
                option={VALUATION}
                value={valuationChange}
                label="Định giá P/E"
                screenMode={screenMode}
                handleSelectChange={handleSelectValuationChange}
              />
              <CustomChart
                option={VALUATIONPB}
                value={valuationPBChange}
                label="Định giá P/B"
                screenMode={screenMode}
                handleSelectChange={handleSelectvaluationPBChange}
              />
              {checkDataResponse === "Ngân hàng" ? null : (
                <CustomChart
                  option={VALUATIONEV}
                  value={changeValuationEV}
                  label="Định giá EV/EBITDA"
                  screenMode={screenMode}
                  handleSelectChange={handleChangeSelectValuationEVChange}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </StyleBieudotaichinh>
  );
};
const BieuDoTaiChinh: FC<ReceivedProps> = (props) => {
  return <BieuDoTaiChinhLayout {...useBieudotaichinh(props)} />;
};
export default BieuDoTaiChinh;
