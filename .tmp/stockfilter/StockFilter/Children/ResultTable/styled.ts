import styled from "styled-components";

type Props = {
  screen_mode: string | "dark" | "light";
};

export const StyledTable = styled.div<Props>`
  height: 100%;
  *::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  .ant-table-tbody > tr > td {
    height: 32px;
    padding: 0px;
  }
  .root {
    flex: 1;
    border-radius: 8px;
    background-color: ${(props) =>
      props.screen_mode === "dark" ? "#202127" : "#ECECEF"};
    overflow: hidden;
    padding: 12px 16px;
    font-size: 14px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    height: 100%;
    /* width: 1142px; */
  }

  .frameParent888 {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    align-self: stretch;
    border-bottom: ${(props) =>
      props.screen_mode === "dark" ? "1px solid #3a3f42" : "1px solid #ccc"};

    /* padding: 0 16px 4px; */
    justify-content: space-between;
    height: 37px;
  }

  .box-time {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 20px;
    justify-content: flex-start;
    gap: 8px;
  }
  .ant-table-content .ant-table-thead tr .ant-table-cell {
    color: ${(props) =>
      props.screen_mode === "light"
        ? "#747B8B !important"
        : "rgba(129, 132, 152, 1) !important"};
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    background-color: ${(props) =>
      props.screen_mode === "dark"
        ? "rgba(32, 33, 39, 1) !important"
        : "#ECECEF !important"};
  }
  .page {
    position: relative;
    font-weight: 500;
    font-size: 14px;
    /* background-color:${(props) =>
      props.screen_mode === "dark" ? "#fff" : "#2E3138"}; */
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};
  }
  .time {
    position: relative;
    font-weight: 500;
    font-size: 14px;
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};
  }
  .date {
    position: relative;
    font-weight: 500;
    color: rgba(53, 148, 239, 1);
    font-size: 14px;
  }

  .frameParent889 {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }

  .button {
    border-radius: 8px;
    padding: 8px 16px;
    justify-content: flex-start;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .wrapper8 {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-radius: 8px;
    padding: 8px 16px;
    justify-content: flex-start;
    cursor: pointer;
    background-color: ${(props) =>
      props.screen_mode === "dark" ? "#2a2e39" : "rgba(240, 243, 250, 1)"};
    color: #fff;
  }

  .parent890 {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
  }

  .parent891 {
    align-self: stretch;
    display: flex;
    flex-direction: row;
    padding: 2px 4px;
    align-items: center;
    justify-content: space-between;
  }

  .wrapper646 {
    display: flex;
    align-items: center;
    width: 32px;
    flex-direction: row;
    justify-content: space-between;
  }

  .stt {
    position: relative;
    font-weight: 500;
    display: flex;
    align-items: center;
    width: 32px;
    height: 20px;
    flex-shrink: 0;
  }

  .wrapper18 {
    display: flex;
    align-items: center;
    width: 120px;
    flex-direction: row;
    justify-content: space-between;
  }

  .m20 {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
    font-weight: 500;
    height: 20px;
  }

  .label {
    flex: 1;
    position: relative;
    font-weight: 500;
  }

  .parent892 {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .parent893 {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 16px;
    flex-direction: row;
    gap: 4px;
    text-align: right;
  }

  .parent1 {
    justify-content: flex-start;
    gap: 10px;
    flex-direction: row;
    display: flex;
    align-items: center;
  }

  .parent894 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    justify-content: center;
    color: rgba(255, 255, 255, 0.5);
  }

  .parent619 {
    display: flex;
    align-items: center;
    align-self: stretch;
    background-color: #2a2e39;
    flex-direction: row;
    padding: 2px 4px;
    justify-content: space-between;
  }

  .rowSTT {
    position: relative;
    display: flex;
    align-items: center;
    width: 32px;
    flex-shrink: 0;
  }

  .symbol {
    position: relative;
    display: flex;
    align-items: center;
    width: 32px;
    flex-shrink: 0;
  }

  .parent620 {
    position: relative;
    display: flex;
    align-items: center;
    width: 32px;
    flex-shrink: 0;
  }

  .div3311 {
    position: relative;
    display: flex;
    align-items: center;
    width: 94px;
    flex-shrink: 0;
  }

  .div3314 {
    position: relative;
    display: flex;
    align-items: center;
    width: 94px;
    flex-shrink: 0;
    color: #575a6a;
  }

  .table-result {
    width: 100%;
    border: none !important;
    overflow: auto;
    /* height: 976px; */
  }

  .ant-table-tbody > tr > td,
  .ant-table-thead > tr > th {
    border-bottom: ${(props) =>
      props.screen_mode === "dark"
        ? "1px solid rgba(48, 50, 59, 1) !important"
        : "1px solid #D5D7DC !important"};
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};
  }
  .ant-table-tbody > tr > td {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }

  thead[class*="ant-table-thead"] th {
    background-color: rgba(31, 35, 44, 1) !important;
    color: white !important;
    font-weight: bold;

    text-align: left;
  }
  .ant-table-content {
    border: none !important;
    box-shadow: none;
  }
  .table_btn {
    border: none !important;

    margin: 0 !important;
  }
  .ant-btn {
    border: none !important;
    margin: 0;
  }
  .ant-table-tbody > tr:hover > td {
    color: ${(props) =>
      props.screen_mode === "light"
        ? "rgba(8, 8, 8, 1) !important"
        : "#fff !important"};
    background-color: transparent !important;
  }

  .ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    > *:first-child {
    border-start-start-radius: unset;
    padding-left: 0;
  }
  .ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    position: static;
  }
  .ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    > *:last-child {
    border-start-end-radius: unset;
  }
  .ant-pagination .ant-pagination-item a {
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};
  }
  .anticon {
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};
  }
  .ant-table-content .ant-table-thead tr .ant-table-cell {
    padding: 6px;
  }
  .ant-pagination
    .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis {
    color: ${(props) => (props.screen_mode === "light" ? "black" : "#fff")};
  }
  .ant-pagination .ant-pagination-prev,
  .ant-pagination .ant-pagination-next {
    background-color: ${(props) =>
      props.screen_mode === "light" ? "#ECECEF" : "transparent"};
    :hover {
      background-color: ${(props) =>
        props.screen_mode === "dark" ? "#30323B" : "#F9FAFA"};
    }
  }

  .ant-pagination .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination .ant-pagination-next button {
    color: ${(props) => (props.screen_mode === "light" ? "black" : "#fff")};
  }
  .ant-pagination .ant-pagination-item a {
    color: ${(props) => (props.screen_mode === "light" ? "black" : "#fff")};
  }
  .ant-pagination .ant-pagination-item-active {
    border-color: none;
    border: none !important;
    background-color: ${(props) =>
      props.screen_mode === "light" ? "#004AEA" : "#004AEA"};
    color: #f0f3fa;
    a {
      color: #fff;
    }
  }
  .ant-pagination .ant-pagination-disabled .ant-pagination-item-link {
    color: ${(props) => (props.screen_mode === "light" ? "black" : "#fff")};
  }
  .ant-pagination-item,
  .ant-pagination .ant-pagination-item:not(.ant-pagination-item-active):hover {
    background-color: ${(props) =>
      props.screen_mode === "dark" ? "#30323B" : "#F9FAFA"};
  }

  /* [class^="ant-table"] [class^="ant-table"]{

  background-color: rgba(31, 35, 44, 1);
} */
  .ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    > *:last-child {
    background-color: rgba(31, 35, 44, 1);
  }
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover > th,
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover > td,
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder {
    background-color: ${(props) =>
      props.screen_mode === "dark"
        ? "rgba(31, 35, 44, 1) !important"
        : "#fff !important"};
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: #f1f5ff !important;
  }
  .ant-empty-normal .ant-empty-description {
    color: #fff;
  }
  /* styles.css */
`;
