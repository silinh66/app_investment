/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { QUARTER_AND_YEAR } from '@/constants/common';
import icons from '@/constants/icons';
import { Select, Tooltip } from 'antd';
import { FC } from 'react';
import ReactECharts from 'echarts-for-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
  option: any;
  label: string;
  screenMode: string;
  handleSelectChange: (value: string) => void;
};

const CustomChart: FC<Props> = ({
  option,
  label,
  screenMode,
  handleSelectChange,
  value,
}) => {
  return (
    <div className="common-chart">
      <div className="header-common-chart">
        <div className="label">
          {' '}
          <Tooltip title={label}>
            {label.length > 25 ? `${label.slice(0, 25)}...` : label}
          </Tooltip>{' '}
        </div>
        <div className="quarter-and-year">
          <Select
            defaultValue="Quý"
            style={{
              color: screenMode === 'dark' ? '#fff' : '#000',
            }}
            suffixIcon={
              screenMode === 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M1.5575 0.22168L5 3.65668L8.4425 0.22168L9.5 1.27918L5 5.77918L0.5 1.27918L1.5575 0.22168Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M1.5575 0.22168L5 3.65668L8.4425 0.22168L9.5 1.27918L5 5.77918L0.5 1.27918L1.5575 0.22168Z"
                    fill="#080808"
                  />
                </svg>
              )
            }
            value={value}
            options={QUARTER_AND_YEAR}
            onChange={handleSelectChange}
          />
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </div>
  );
};

export default CustomChart;
