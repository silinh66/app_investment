import styled from "styled-components";

type Props = {
  screen_mode: string | "dark" | "light";
};
export const StyledCommunity = styled.div<Props>`
  display: flex;
  background: ${(props) =>
    props.screen_mode === "dark" ? "#202127" : "#ECECEF"};
  padding: 4px 24px 24px;
  border-radius: 6px;
  width: 100%;
  height: 100%;

  flex-direction: column;
  @media (max-width: 1600px) {
    padding: 4px 16px 24px 16px !important;
    .target-box-filter {
      > .frameParent847 {
        .frameParent848 {
          gap: 8px !important;
          .item-change {
            font-size: 12px !important;
            padding: 10px !important;
          }
        }
      }
      .input-value-pick {
        max-width: 80px;
      }
    }
  }
  .input-value-pick {
    max-width: 100px;
    border: ${(props) =>
      props.screen_mode === "dark"
        ? "1px solid rgba(74, 76, 90, 1)"
        : "1px solid rgba(213, 215, 220, 1)"};
    &:hover {
      border: ${(props) =>
        props.screen_mode === "dark"
          ? "1px solid #818498"
          : "1px solid #878D9B"};
    }
  }

  .ant-switch .ant-switch-inner {
    background-color: #2a2e39;
  }
  .ant-slider .ant-slider-track {
    background: rgba(0, 74, 234, 1);
  }
  .ant-slider-handle {
    width: 24px;
    height: 24px;
    margin-top: -7px; /* Half of the new height to maintain vertical alignment */
    transform: translateX(
      -50%
    ); /* This will keep the handle horizontally centered */
  }
  .ant-slider .ant-slider-handle::after {
    width: 24px;
    height: 24px;
    background-color: ${(props) =>
      props.screen_mode === "dark"
        ? "rgba(55, 57, 67, 1)"
        : "rgba(249, 250, 250, 1)"};
    box-shadow: ${(props) =>
      props.screen_mode === "dark"
        ? "0 0 0 2px rgba(87, 90, 106, 1)"
        : "0 0 0 2px rgba(177, 181, 190, 1)"};
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
    color: ${(props) =>
      props.screen_mode === "dark" ? "#fff" : "rgba(46, 49, 56, 1)"};
  }
  .ant-switch .ant-switch-inner {
    background-color: ${(props) =>
      props.screen_mode === "dark" ? "#2a2e39" : "#fff"};
  }
  .ant-switch.ant-switch-checked .ant-switch-inner {
    background-color: rgba(66, 167, 50, 1);
  }

  .iconoutlineddirectionalcare120 {
    width: 10px;
    height: 8px;
    flex-shrink: 0;
    margin-right: 5px !important;
    color: ${(props) =>
      props.screen_mode === "dark"
        ? "rgba(255, 255, 255, 0.5) !important"
        : "#fff !important"};
  }
  .anticon {
    color: ${(props) =>
      props.screen_mode === "dark"
        ? "rgba(255, 255, 255, 0.5) !important"
        : "#333 !important"};
    &:hover {
      color: ${(props) =>
        props.screen_mode === "dark" ? "#fff !important" : "#000 !important"};
    }
  }
  .iconoutlinedapplicationbell15 {
    position: relative;
    width: 15px;
    height: 15px;
    object-fit: cover;
    overflow: hidden;
    flex-shrink: 0;
  }

  > .target-box-filter,
  > .frameParent-change {
    height: 100%;
    display: flex;
    flex-direction: column;
    > .chTiuParent8 {
      display: flex;
      width: 100%;
      border-bottom: ${(props) =>
        props.screen_mode === "dark"
          ? "1px solid rgba(48, 50, 59, 1)"
          : "1px solid rgba(213, 215, 220, 1)"};
      justify-content: space-between;
      align-items: flex-end;
      border-radius: 8px 8px 0px 0px;
      border-bottom: ${(props) =>
        props.screen_mode === "dark" ? "1px solid #3a3f42" : "1px solid #ccc"};
      margin-bottom: 24px;
      .btn1 {
        cursor: pointer;
        width: calc(100% / 3);
        display: flex;
        justify-content: center;
        padding: 8px 16px;
        align-items: center;

        gap: 10px;
        &:hover {
          border-bottom: ${(props) =>
            props.screen_mode === "dark"
              ? " 3px solid #575A6A"
              : " 3px solid #D0D2D8"};
        }
        /* .icon-btn1 {
          margin-top: 5px;
        } */
        .chTiu10 {
          font-size: 15px;
          font-weight: 400;
          color: ${(props) =>
            props.screen_mode === "dark"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(46, 49, 56, 1)"};
          line-height: 20px;
        }
      }

      .btn2 {
        cursor: pointer;
        width: calc(100% / 3);
        display: flex;
        justify-content: center;
        padding: 8px 16px;
        align-items: center;
        border-bottom: 3px solid rgba(0, 74, 234, 1);
        gap: 10px;
        .icon-btn2 {
          margin-top: 5px;
        }
        .chTiu10 {
          font-size: 15px;
          font-weight: 600;
          color: ${(props) =>
            props.screen_mode === "dark"
              ? "rgba(153, 186, 255, 1)"
              : "rgba(0, 74, 234, 1)"};
        }
      }
    }
    .frameParent847 {
      display: grid;
      align-items: center;
      gap: 16px;
      .frameParent848 {
        display: flex;
        align-items: center;
        justify-content: flex-start; /* Use this to align items on the left if you don’t want space between them */
        flex-wrap: wrap; /* This ensures the items wrap to the next line when necessary */
        width: 100%;
        gap: 10px;

        .item-change {
          cursor: pointer;
          border-radius: 6px;
          border: ${(props) =>
            props.screen_mode === "dark"
              ? "1px solid rgba(48, 50, 59, 1)"
              : "1px solid rgba(191, 194, 202, 1)"};
          font-size: 14px;
          font-weight: 500;
          color: ${(props) =>
            props.screen_mode === "dark"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(46, 49, 56, 1)"};
          line-height: 20px;
          /* height: 40px; */
          padding: 10px 16px;
          max-width: 164px;
          &:hover {
            border: ${(props) =>
              props.screen_mode === "dark"
                ? "1px solid #878D9B"
                : "1px solid #818498"};
          }
        }
        .is-number-pick {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border-radius: 6px;
          border: 2px solid rgba(0, 74, 234, 1);
          font-size: 14px;
          font-weight: 500;
          color: ${(props) =>
            props.screen_mode === "dark"
              ? "rgba(255, 255, 255, 1)"
              : "rgba(46, 49, 56, 1)"};
          line-height: 20px;
          /* height: 40px; */
          padding: 10px 16px;
          .el {
            width: 16px;
            height: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: rgba(0, 74, 234, 1);
            color: #fff;
            font-size: 10px;
            line-height: 11.72px;
            font-weight: 600;
          }
        }
      }
      .frameParent854 {
        .box-value {
          overflow-y: scroll;
          height: 765px;
          justify-content: center;
          width: 100%;
          align-items: center;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;

          .item-value {
            display: flex;

            flex-direction: column;

            gap: 8px;

            padding-top: 16px;
            padding-bottom: 20px;
            border-bottom: ${(props) =>
              props.screen_mode === "dark"
                ? "1px solid rgba(48, 50, 59, 1)"
                : "1px solid rgba(213, 215, 220, 1)"};
            .header-value {
              display: flex;
              justify-content: space-between;
            }
          }
        }
        .ant-select:not(.ant-select-customize-input) .ant-select-selector {
          border: none !important;
        }
        .box-value::-webkit-scrollbar {
          display: none;
        }
        .footer-target {
          display: flex;
          justify-content: space-between;
          padding-top: 16px;
          border-top: ${(props) =>
            props.screen_mode === "dark"
              ? "1px solid rgba(48, 50, 59, 1)"
              : "1px solid #D5D7DC"};
          .parent885 {
            display: flex;
            gap: 24px;
            color: ${(props) =>
              props.screen_mode === "dark"
                ? "rgba(171, 173, 186, 1)"
                : "#747B8B"};
            font-size: 13px;
            font-weight: 500;
            line-height: 20px;
          }
          .gitrParent8 {
            display: flex;
            gap: 16px;
            .filter {
              cursor: pointer;
              border-radius: 6px;
              padding: 8px 12px;
              min-width: 104px;
              background-color: rgba(0, 74, 234, 1);
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
              color: #fff;
              &:hover {
                background-color: #0042cc;
              }
            }
            .filter-disable {
              border-radius: 6px;
              padding: 8px 12px;
              min-width: 104px;
              color: #fff;
              cursor: no-drop !important;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
              background-color: ${(props) =>
                props.screen_mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#CCDDFF"};
            }
            .iconoutlinededitordelete {
              cursor: pointer;
              border-radius: 6px;
              padding: 8px 20px;
              min-width: 104px;
              background-color: transparent;
              border: ${(props) =>
                props.screen_mode === "dark"
                  ? "1px solid rgba(74, 76, 90, 1)"
                  : "1px solid rgba(213, 215, 220, 1)"};
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
              color: ${(props) =>
                props.screen_mode === "dark" ? "#fff" : "#2E3138"};
              &:hover {
                border: ${(props) =>
                  props.screen_mode === "dark"
                    ? "1px solid #4A4C5A"
                    : "1px solid  #D5D7DC"};
                background-color: ${(props) =>
                  props.screen_mode === "dark" ? "#292B32" : " #D5D7DC"};
              }
            }
          }
        }
      }
    }
    .container-setting {
      height: 450px;
      width: 100%;
      .first-box {
        display: flex;
        /* padding: 16px 16px 8px 16px; */
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
        .list-index {
          height: 340px;
          /* overflow-y: scroll; */
          width: 100%;
          div {
            .title-technique {
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
              color: ${(props) =>
                props.screen_mode === "dark" ? "#fff" : "#2E3138"};
              margin-bottom: 8px;
              margin-top: 16px;
            }
            .drop-kythuat {
              cursor: pointer;
              border: ${(props) =>
                props.screen_mode === "dark"
                  ? "1px solid rgba(74, 76, 90, 1)"
                  : "1px solid #D5D7DC"};
              &:hover {
                border: ${(props) =>
                  props.screen_mode === "dark"
                    ? "1px solid #878D9B"
                    : "1px solid #818498"};
              }
              .container-box-drop {
                .item-child-option {
                  &:hover svg path {
                    fill: ${(props) =>
                      props.screen_mode === "dark" ? "#fff" : "#000"};
                  }
                }
              }
            }
            .wrapper-drop {
              position: absolute; /* Đặt dropdown ở vị trí tuyệt đối */
              top: 100%; /* Căn dưới của phần tử cha */
              left: 0;
              width: 100%;
              padding: 8px 0;
              z-index: 10;
              background-color: ${(props) =>
                props.screen_mode === "dark" ? "#202127" : "#fff"};
              border: ${(props) =>
                props.screen_mode === "dark" ? "#30323B" : "#D5D7DC"};
              border-radius: 6px;
              box-shadow: ${(props) =>
                props.screen_mode === "dark"
                  ? "0px 4px 20px 0px #000000b2"
                  : "0px 4px 20px 0px #00000033"};

              .setting-target {
                display: flex;
                padding: 12px 16px;
                justify-content: space-between;
                cursor: pointer;
                width: 100%;
                border-bottom: ${(props) =>
                  props.screen_mode === "dark"
                    ? "1px solid rgba(48, 50, 59, 1)"
                    : "1px solid #D5D7DC"};

                .setting1 {
                  display: flex;
                  align-items: center;
                  align-self: stretch;
                  width: 100%;
                  .form-group1 {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1 0 0;
                    width: 100%;
                    justify-content: space-between;
                    label {
                      color: ${(props) =>
                        props.screen_mode === "dark" ? "#fff" : "#2E3138"};
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 20px;
                    }
                    .ant-checkbox .ant-checkbox-inner {
                      background-color: rgba(66, 167, 50, 0.2);
                      border: 1px solid rgba(66, 167, 50, 0.2);
                    }
                    .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #575a6a;
                      border: 1px solid #575a6a;
                    }
                    .ant-checkbox-wrapper:not(
                        .ant-checkbox-wrapper-disabled
                      ):hover
                      .ant-checkbox-checked:not(.ant-checkbox-disabled)
                      .ant-checkbox-inner {
                      background-color: #575a6a;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .container-setting .first-box .list-index::-webkit-scrollbar {
      display: none;
    }
  }
  .ant-select-single {
    height: 40px !important;
    padding: 10px 16px;
    border-radius: 6px;

    border: ${(props) =>
      props.screen_mode === "dark"
        ? "1px solid rgba(74, 76, 90, 1)"
        : "1px solid rgba(213, 215, 220, 1)"};
    background: ${(props) =>
      props.screen_mode === "dark" ? "transparent" : "#fff"};
    &:hover {
      border: ${(props) =>
        props.screen_mode === "dark"
          ? "1px solid #818498"
          : "1px solid #878D9B"};
    }
  }

  .title-firt {
    width: 150px;
    color: ${(props) => (props.screen_mode === "light" ? "#080808" : "#fff")};
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 8px;
  }
  .icon-clear {
    cursor: pointer;
    position: absolute;
    right: 8px;
  }
  .warning {
    color: ${(props) =>
      props.screen_mode === "light" ? "#747B8B" : "rgba(171, 173, 186, 1)"};
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
  .btn-technique {
    display: flex;
    align-items: center;
    gap: 16px;
    .save-target {
      display: flex;
      border-radius: 6px;
      line-height: 20px;
      background-color: rgba(0, 74, 234, 1);
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      padding: 8px 12px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      gap: 8px;
      border: none;
      min-width: 104px;
      &:hover {
        background-color: #0042cc;
      }
    }
    .iconoutlinededitordelete {
      cursor: pointer;
      border-radius: 6px;
      padding: 8px 20px;
      min-width: 104px;
      background-color: transparent;
      border: ${(props) =>
        props.screen_mode === "dark"
          ? "1px solid rgba(74, 76, 90, 1)"
          : "1px solid rgba(213, 215, 220, 1)"};
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};
      &:hover {
        border: ${(props) =>
          props.screen_mode === "dark"
            ? "1px solid #4A4C5A"
            : "1px solid  #D5D7DC"};
        background-color: ${(props) =>
          props.screen_mode === "dark" ? "#292B32" : " #D5D7DC"};
      }
    }
  }
  /* .form-group {
    display: flex;
    padding-right: 12px;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    border-right: ${(props) =>
    props.screen_mode === "light"
      ? "1px solid rgba(207, 208, 212, 0.50)"
      : "1px solid #3a3f42"};
  } */
  .input-target:focus-visible {
    outline: 1.9px solid #575a6a !important; /* Thay 'blue' bằng màu bạn muốn */
  }

  .up-down {
    position: relative;
  }
  .list-plus {
    position: absolute;
    top: 5px;
    right: 12px;
  }
  .second-box {
    /* display: flex; */
    padding: 8px 0 0 0;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    align-self: stretch;
    .title-firt {
      width: 150px;
      color: ${(props) => (props.screen_mode === "light" ? "#080808" : "#fff")};
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 8px;
    }
    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      background-color: ${(props) =>
        props.screen_mode === "dark" ? "transparent" : "#fff"};
      border: ${(props) =>
        props.screen_mode === "dark"
          ? "1px solid #4A4C5A !important"
          : "1px solid #D5D7DC !important"};
      box-shadow: none !important;
      /* height: 40px; */
      padding: 4px 0px !important;
      &:hover {
        border: ${(props) =>
          props.screen_mode === "dark"
            ? "1px solid #878D9B !important"
            : "1px solid #818498 !important"};
      }
    }
  }
  .box-second {
    position: relative;
    display: flex;
    padding: 10px;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    background: ${(props) =>
      props.screen_mode === "dark" ? "#2a2e39" : "#fff"};
    height: 46px;
  }
  .children {
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
  }
  .text-second {
    color: #fff;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .text-second1 {
    color: ${(props) => (props.screen_mode === "light" ? "#575a6a" : "#fff")};
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .item-children {
    display: flex;
    padding: 6px 8px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    height: 26px;
    background: #575a6a;
    cursor: pointer;
    border: 1px solid #575a6a;
  }
  .item-children1 {
    display: flex;
    cursor: pointer;
    /* color: ${(props) =>
      props.screen_mode === "dark" ? "black" : "#575a6a"}; */
    padding: 6px 8px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    height: 26px;
    border: 1px solid #575a6a;
    background: rgba(66, 167, 50, 0.2);
  }

  .iconoutlinededitordelete {
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 20px;
    min-width: 104px;
    background-color: transparent;
    border: ${(props) =>
      props.screen_mode === "dark"
        ? "1px solid rgba(74, 76, 90, 1)"
        : "1px solid rgba(213, 215, 220, 1)"};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};
    &:hover {
      border: ${(props) =>
        props.screen_mode === "dark"
          ? "1px solid #4A4C5A"
          : "1px solid  #D5D7DC"};
      background-color: ${(props) =>
        props.screen_mode === "dark" ? "#292B32" : " #D5D7DC"};
    }
  }
  .button-indicator-chart {
    display: flex;

    width: auto;
    padding: 8px 12px;
    gap: 8px;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    background: rgba(0, 74, 234, 1);
    color: var(--text-text-primary-text-primary_D, #fff);
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    &:hover {
      background-color: #0042cc;
    }
  }

  .label {
    position: relative;
    font-weight: 500;
  }

  .iconoutlinedsuggestedcheck40 {
    position: relative;
    width: 13px;
    height: 13px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  }
  .star {
    position: relative;
    width: 13px;
    height: 13px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  }
  .iconoutlinedsuggestedcheck41 {
    position: relative;
    width: 13px;
    height: 13px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  }

  .frameChild384 {
    position: relative;
    border-radius: 50%;
    background-color: #fff;
    width: 10px;
    height: 10px;
  }

  .frameChild385 {
    position: relative;
    border-radius: 50%;
    background-color: #2a2e39;
    width: 10px;
    height: 10px;
  }

  .vuesaxlinearsearch {
    position: relative;
    width: 16px;
    height: 16px;
    object-fit: cover;
  }

  .frameParent851 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* align-self: stretch; */
    text-align: left;
    color: ${(props) =>
      props.screen_mode === "dark" ? " #fff" : "rgba(46, 49, 56, 1)"};
  }

  .child1 {
    cursor: pointer;
    border-radius: 8px;
    /* width: 232px; */
    flex-direction: row;
    /* padding: 12px; */
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    display: flex;
    padding: 10px 24px;
    height: 36px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #575a6a;
    background: rgba(66, 167, 50, 0.2);
  }
  :hover.child2 .item-child1 {
    color: #575a6a;
  }
  :hover.child2 .elChild1 {
    background-color: #575a6a;
  }
  .child2 {
    cursor: pointer;
    border-radius: 8px;
    /* width: 232px; */
    flex-direction: row;
    /* padding: 12px; */
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    display: flex;
    padding: 10px 24px;
    height: 36px;
  }

  .childrens {
    margin-top: 8px;
  }
  .item-child1 {
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "black")};

    padding: 8px;
  }
  .item-child2 {
    color: #575a6a;
    padding: 8px;
  }
  .placeholder-tinhieu::placeholder {
    color: ${(props) =>
      props.screen_mode === "dark" ? "rgba(53, 148, 239, 1)" : "#333"};
    font-size: 12px;
  }
  .item:hover {
    cursor: pointer;
    color: #575a6a;
  }

  .ant-select-focused .ant-select-selector,
  .ant-select-selector:focus,
  .ant-select-selector:active,
  .ant-select-open .ant-select-selector {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
    padding: 10px 16px !important;
  }
  .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
    background-color: ${(props) =>
      props.screen_mode === "dark" ? "transparent" : "#fff"};
  }
  .ant-select-open .ant-select-selector {
    box-shadow: none !important;
    outline: none !important;
  }
  .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(
      .ant-pagination-size-changer
    ):hover
    .ant-select-selector {
    border-color: transparent;
    box-shadow: none;
  }
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder {
    background-color: ${(props) =>
      props.screen_mode === "light" ? "#fff !important" : "black !important"};
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "black")};
  }
  .ant-select-multiple .ant-select-selection-item-content {
    /* color: #fff; */
    color: ${(props) =>
      props.screen_mode === "dark" ? "#fff" : "rgba(46, 49, 56, 1)"};

    text-align: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    align-items: center;
  }
  .ant-select-multiple .ant-select-selection-item-remove svg {
    color: ${(props) =>
      props.screen_mode === "dark" ? "#fff" : "rgba(46, 49, 56, 1)"};
  }
  .ant-select-multiple .ant-select-selection-item {
    background: #575a6a !important;
    border-radius: 8px;
  }
  .ant-select-clear {
    display: none;
  }
  .ant-select .ant-select-arrow .anticon-search {
    display: none;
  }
  .ant-select .ant-select-clear {
    background-color: transparent;
    margin-right: 10px;
    margin-top: -13px;
  }
  .ant-select .ant-select-clear .anticon-close-circle svg {
    display: block;
    /* background-color: #575a6a; */
    color: rgba(66, 167, 50, 0.2);
    border: 1px solid #575a6a;
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }
  .ant-checkbox .ant-checkbox-inner {
    width: 24px;
    height: 24px;
  }
  .ant-checkbox .ant-checkbox-inner:after {
    top: 42%;

    width: 5.714286px;
    height: 14.142857px;
  }
`;
