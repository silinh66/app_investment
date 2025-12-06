import { styled } from 'styled-components';
type Props = {
  screen_mode: string | 'dark' | 'light';
};
export const StyledStockFilter = styled.div<Props>`
  background: ${(props) => (props.screen_mode === 'dark' ? '#0f1015' : '#fff')};
  @media (max-width: 1920px) {
    .root {
      > .frameParent844 {
        .frameParent845 {
          width: 766px;
        }
      }
      .table {
        width: calc(100% - 766px - 12px);
      }
    }
  }
  @media (max-width: 1600px) {
    .root {
      > .frameParent844 {
        .frameParent845 {
          width: 580px;
        }
      }
      .table {
        width: calc(100% - 580px - 12px);
      }
    }
  }
  @media (max-width: 1280px) {
    .root {
      > .frameParent844 {
        .frameParent845 {
          width: 622px;
        }
      }
      .table {
        width: calc(100% - 622px - 12px);
      }
    }
  }
  .frame-parent216 {
    /* position: absolute;
  top: 100px;
  left: 24px; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${(props) => (props.screen_mode === 'dark' ? '#5f6b7c' : '#a3a09b')};
  }
  .frame-parent217 {
    align-self: stretch;
    border-radius: 8px 8px 0 0;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#28292f' : '#d2d2d2'};
    display: flex;
    flex-direction: row;
    padding: 0 12px;
    align-items: center;
    justify-content: space-between;
  }
  .frame-parent218,
  .iconoutlinedsuggestedplus-parent {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 16px;
  }
  .vuesaxlinearchart-container,
  .vuesaxlinearchart-parent {
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }
  .vuesaxlinearchart-container {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : '#333')};
  }

  .root {
    width: 100%;
    padding: 0px 16px 16px 16px;
    > .frameParent844 {
      display: flex;
      gap: 8px;
      width: 100%;
      .frameParent845 {
        gap: 8px;
        display: flex;
        flex-direction: column;
      }
    }
  }

  .header-indicator-first {
    .input-transactions-share {
      display: flex;
      width: 320px;
      padding: 4px 12px;
      align-items: center;
      align-self: stretch;
      border-radius: 8px;
      background-color: ${(props) =>
        props.screen_mode === 'dark' ? '#2a2e39' : '#eee'};
      gap: 8px;
      .search {
        background-color: ${(props) =>
          props.screen_mode === 'dark' ? '#2a2e39' : '#eee'};
        outline: none;
        width: 100%;
        border: none;
        height: 37px;
        color: ${(props) =>
          props.screen_mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#333'};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }

  .icon-indicator-first {
    display: flex;
    padding: 4px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10000000px;
    background: #fff;
  }

  .box-indicator-second {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    border-radius: 8px;
    background: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
    .wrapper-list-share {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 16px;
      flex: 1 0 0;
      align-self: stretch;
    }
  }
  .body-list-share {
    display: flex;
    padding: 0px 0px 16px 16px;
    flex-direction: column;
    /* justify-content: center; */
    align-items: flex-end;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 8px;
    background-color: ${(props) =>
      props.screen_mode === 'dark' ? '#202127' : '#ECECEF'};
    backdrop-filter: blur(7px);
  }
  .title-list-share {
    display: flex;
    align-items: center;
    gap: 24px;
    align-self: stretch;
  }
  .title-share {
    color: ${(props) => (props.screen_mode === 'dark' ? '#fff' : 'black')};
  }
`;
