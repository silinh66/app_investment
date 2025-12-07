import styled from 'styled-components';
type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyleBieudotaichinh = styled.div<Props>`
  background-color: #000;
  > .wrapper-financial-chart {
    > .financial-chart-empty {
      min-height: 300px;
      background: ${(props) =>
        props.screen_mode === 'dark' ? ' #202127' : '#fff'};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > .ant-empty {
        > .ant-empty-description {
          color: ${(props) =>
            props.screen_mode === 'dark' ? ' #fff' : '#202127'};
        }
      }
    }
    > .financial-chart {
      display: flex;
      flex-direction: column;
      gap: 16px;
      > .title {
        color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};

        font-size: 20px;
        font-weight: 500;
      }
      > .first-layout {
        display: flex;
        gap: 16px;

        flex-direction: column;

        > .common-chart {
          border-radius: 8px;
          padding: 0px 24px 8px 24px;
          background: ${(props) =>
            props.screen_mode === 'dark'
              ? ' #202127'
              : 'rgba(236, 236, 239, 1)'};
          /* flex: 33.33%; */
          flex: 1;

          > .echarts-for-react {
            height: 350px !important;
          }
          > .header-common-chart {
            display: flex;
            justify-content: space-between;
            padding: 14px 0;
            border-bottom: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)'};
            > .quarter-and-year {
              > .ant-select {
                > .ant-select-selector {
                  cursor: pointer;
                  min-width: 70px;
                  width: 40px;
                  height: 32px;
                  padding: 0px 12px;
                  border-radius: 6px;
                  border: #202127;
                  background: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'transparent'
                      : 'rgba(255, 255, 255, 1)'};
                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? ' #ABADBA !important'
                      : '#202127 !important'};

                  &:hover {
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid #818498'
                        : '1px solid  #878D9B'};
                  }
                }
              }
            }
            > .label {
              font-size: 16px;
              font-weight: 600;
              line-height: 28px;
              color: ${(props) =>
                props.screen_mode === 'dark' ? ' #fff' : '#202127'};
            }
          }
        }
        > .common-chart:nth-of-type(3) {
          > .label {
            left: 43%;
          }
        }
      }
      > .first-layout-private {
        display: flex;
        gap: 8px;
        height: 420px;
        > .common-chart {
          border-radius: 8px;
          padding: 0px 24px 24px 24px;
          background: ${(props) =>
            props.screen_mode === 'dark'
              ? ' #202127'
              : 'rgba(236, 236, 239, 1)'};
          flex: 33.33%;

          > .echarts-for-react {
            height: 350px !important;
          }
          > .header-common-chart {
            display: flex;
            justify-content: space-between;
            padding: 14px 0;
            border-bottom: ${(props) =>
              props.screen_mode === 'dark'
                ? '1px solid rgba(48, 50, 59, 1)'
                : '1px solid rgba(213, 215, 220, 1)'};
            > .quarter-and-year {
              > .ant-select {
                > .ant-select-selector {
                  cursor: pointer;
                  min-width: 98px;
                  width: 98px;
                  height: 32px;
                  padding: 0px 12px;
                  border-radius: 6px;
                  border: ${(props) =>
                    props.screen_mode === 'dark'
                      ? '1px solid rgba(74, 76, 90, 1)'
                      : '1px solid rgba(213, 215, 220, 1)'};
                  background: ${(props) =>
                    props.screen_mode === 'dark'
                      ? 'transparent'
                      : 'rgba(255, 255, 255, 1)'};

                  color: ${(props) =>
                    props.screen_mode === 'dark'
                      ? ' #fff !important'
                      : '#202127 !important'};

                  &:hover {
                    border: ${(props) =>
                      props.screen_mode === 'dark'
                        ? '1px solid #818498'
                        : '1px solid #878D9B'};
                  }
                }
              }
            }
            > .label {
              font-size: 16px;
              font-weight: 600;
              line-height: 28px;
              color: ${(props) =>
                props.screen_mode === 'dark' ? ' #fff' : '#202127'};
            }
          }
        }
        > .common-chart:nth-of-type(3) {
          > .label {
            left: 43%;
          }
        }
      }
      > .first-layout:nth-of-type(2) {
        > .common-chart:first-of-type {
          > .label {
            left: 38%;
          }
        }
        > .common-chart:nth-of-type(2) {
          > .label {
            left: 35%;
          }
        }
        > .common-chart:nth-of-type(3) {
          > .label {
            left: 41%;
          }
        }
      }
    }
  }
`;
