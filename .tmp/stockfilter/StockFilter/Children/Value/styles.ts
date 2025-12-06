import styled from "styled-components";

type Props = {
  screen_mode: string | "dark" | "light";
};
export const StyledValue = styled.div<Props>`
height:calc(100% - 584px);
 @media (max-width: 1600px) {
    padding: 0px 16px 24px 16px !important;
  }
border-radius: 6px;
background-color:${(props) => (props.screen_mode === "dark" ? "rgba(32, 33, 39, 1)" : "#ECECEF")} ;
padding: 0px 24px 24px 24px;
.box-indicator{
  display: flex;
flex-direction: column;
align-items: flex-start;
.header-indicator-first{
  padding: 14px 0;
  color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};
  font-size: 15px;
  font-weight: 600;
  line-height: 28px;
border-bottom:${(props) => (props.screen_mode === "dark" ? " 1px solid rgba(48, 50, 59, 1)" : "1px solid #D5D7DC")};
width: 100%;
}
.body-indicator-first{
  display: flex;

flex-direction: column;
align-items: flex-start;

align-self: stretch;
.items-signal{
  display: flex;
padding:20px 0 ;
align-items: center;
gap: 24px;
align-self: stretch;


border-bottom:${(props) => (props.screen_mode === "dark" ? "1px solid rgba(48, 50, 59, 1)" : "1px solid #D5D7DC")} ;
&:hover{
  cursor: pointer;
  background-color: ${(props) => (props.screen_mode === "dark" ? "#292B32" : "#D5D7DC ")};
}
.title-signal{
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#2E3138")};

flex-grow: 1;
}
  .btn-share-signal {
    display: flex;
gap: 6px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color:${(props) => (props.screen_mode === "dark" ? "rgba(171, 173, 186, 1)" : "#565B67")} ;

    font-size: 14px;

    font-weight: 500;
    line-height: 20px;
   
    &:hover {
             color: ${(props) =>
               props.screen_mode === "dark" ? "#fff" : " #333"};
              }
  }


.btn-share-signal:hover svg path {
 fill: ${(props) => (props.screen_mode === "dark" ? "#fff" : " #333")};
}

  .icon-clear-signal{
    margin-top: 2px;
    cursor: pointer;
    &:hover svg path {
 fill: ${(props) => (props.screen_mode === "dark" ? "#fff" : " #333")};
}
  }
}
}

}
  *::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  :where(.css-dev-only-do-not-override-nllxry).ant-modal .ant-modal-content{
    background-color: red !important;
  }
  .frameParent852 {
    border-radius: 8px;
    background-color: ${(props) =>
      props.screen_mode === "dark" ? "#202127" : "#ECECEF"};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    font-size: 16px;
    height: 442px;
  }

  .gitrParent8 {
    align-self: stretch;
    border-radius: 8px 8px 0 0;
       border-bottom:${(props) => (props.screen_mode === "dark" ? "1px solid #3a3f42" : "1px solid #ccc")};

    display: flex;
    flex-direction: row;
    padding: 16px 16px 8px;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 20px;
  }

  .chTiu10 {
    color: ${(props) => (props.screen_mode === "dark" ? "#fff" : "#333")};
    position: relative;
    font-weight: 600;
  }

  .frameParent853 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    font-size: 14px;
  }

  .filter {
    display: flex;
    border-radius: 3px;
    background-color: #197FBF;
font-size: 12px;
    padding: 6px 8px;
    align-items: center;
    cursor: pointer;
    gap: 8px;
  }
  .filter:hover {
    background: #0082ff;
  }
  .icon30 {
    position: relative;
    width: 16px;
    height: 16px;
    object-fit: cover;
    cursor: pointer;
  }

  .label {
    color: ${(props) =>
      props.screen_mode === "dark"
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(8, 8, 8, 0.5)"};
    cursor: pointer;
    position: relative;
    font-weight: 500;
  }
  .item {
    color: 'rgba(255, 255, 255, 1)'
    cursor: pointer;
    position: relative;
    font-weight: 500;
  }
  .ant-select-single.ant-select-open .ant-select-selection-item{
    border: none !important;
    color: ${(props) =>
      props.screen_mode === "dark"
        ? "#fff !important"
        : "rgba(8, 8, 8, 0.5) !important"};;
    box-shadow: none !important;
    outline: none !important;
  }

  .iconoutlinededitordelete {
     display: flex;
    border-radius: 3px;
    background-color: #e43637;
font-size: 12px;
    padding: 6px 8px;
    align-items: center;
    cursor: pointer;
    gap: 8px;

    
  }
  .iconoutlinededitordelete:hover {
    background: red;
  }
  .iconoutlinedsuggestedcheck40 {
    position: relative;
    width: 16px;
    height: 16px;
    overflow: hidden;
    flex-shrink: 0;
    object-fit: cover;
  }

  .frameParent854 {
    justify-content: flex-start;
    gap: 8px;
    align-self: stretch;
    border-bottom: 1px solid #3a3f42;
    display: flex;
    flex-direction: column;
    padding: 0 4px 0px 14px;
    align-items: flex-start;
    height: 440px;
  }

  .lcParent8 {
    width: 122px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    background-color: #575a6a;
    padding: 8px 12px;
    justify-content: flex-start;
    gap: 8px;
    color: #fff;
  }

  .lc10 {
    position: relative;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .parent884 {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    height: 60px;
    padding: 8px 16px 16px;
    justify-content: space-between;
  }

  .parent842 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }

  .div3306 {
    position: relative;
    font-weight: 600;
    color: #575a6a;
  }

  .parent885 {
    margin-left: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    text-align: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  .parent8 {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    text-align: left;
  }

  .date {
    margin-right: 2px;
  }

  .ant-select-open {
    color: #fff !important;
  }
  .ant-picker .ant-picker-input >input:placeholder-shown{
    color:#fff ;
  }
   .ant-picker {
    background-color: transparent;
    border: 1.5px solid rgba(58, 63, 66, 1);
   }
   .ant-picker .ant-picker-input >input{
    color: #fff;
   }
   .ant-picker .ant-picker-suffix{
    color: rgba(255, 255, 255, 0.5) !important;
   }
    
   .ant-picker:hover{
    border:1.5px solid rgba(58, 63, 66, 1) ;
   }
   .ant-picker-input>input::placeholder {
   color: rgba(255, 255, 255, 0.5);
}
  .ant-slider-horizontal .ant-slider-rail{
    height: 14px;
  top:-1.2px;
  background-color: rgba(15, 16, 21, 0.3);
  border-radius: 8px;
  }
.ant-slider .ant-slider-track {
  background-color: rgba(66, 167, 50, 0.5);
  height: 13px;
  top:-1.2px
}
.ant-slider .ant-slider-handle::after{
  box-shadow: 0 0 0 2px rgba(66, 167, 50, 1) ;
  background-color: rgba(66, 167, 50, 1);
  border-radius: 4px;
  width: 10px;
height: 20px;
top: -5.2px;
}
.anticon{
      color: ${(props) => (props.screen_mode === "dark" ? "rgba(255, 255, 255, 0.5) !important" : "#333 !important")};

}
.firt-box{
  display: flex;
/* padding: 16px 16px 8px 16px; */
flex-direction: column;
align-items: flex-start;
gap: 8px;
align-self: stretch;
}
.title-firt{
  width: 150px;
  color: #FFF;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-bottom: 8px;
}
.chTiuParent8 {
  display: flex;
width: 100%;
padding: 16px 16px 12px 16px;
/* justify-content: space-between; */
align-items: flex-end;
border-radius: 8px 8px 0px 0px;
    border-bottom:${(props) => (props.screen_mode === "dark" ? "1px solid #3a3f42" : "1px solid #ccc")};

gap: 8px;
}
.btn1{
  cursor: pointer;
  display: flex;
padding: 8px 16px;
align-items: center;
gap: 10px;
border-radius: 8px;

background: rgba(66, 167, 50, 0.20);
}
.icon-btn1{
  display: flex;
padding: 4px;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 10000000px;
background: #575a6a;
height: 24px;
width: 24px;
}
.box-value{
  display: flex;
flex-direction: column;
align-items: flex-start;
gap: 8px;
flex: 1 0 0;
align-self: stretch;  
}
.box-list{
  display: flex;
padding: 16px;
flex-direction: column;
justify-content: center;
align-items: flex-end;
gap: 12px;
flex: 1 0 0;
align-self: stretch;
border-radius: 8px;

background:${(props) =>
  props.screen_mode === "dark" ? "#1F232C" : "#FDFDFD"} ;
backdrop-filter: blur(7px);
}
.title{
  display: flex;
align-items: flex-start;
color: ${(props) =>
  props.screen_mode === "dark" ? "#fff" : "rgba(8, 8, 8, 1)"};
align-self: stretch;
font-weight: 700;
font-size: 16px;
}
.friend{
  display: flex;
flex-direction: column;
/* justify-content: center;
align-items: flex-end; */
gap: 16px;
flex: 1 0 0;
align-self: stretch;
}
 .input-transactions{
    position: relative;
    /* width: 655px; */
    height: 36px;
    background-color:${(props) =>
      props.screen_mode === "dark" ? "rgba(42, 46, 57, 1)" : "#F0F3FA"}  ;
    border-radius: 8px;
    margin: 8px 0;
  }
   .input-transactions-share{
    position: relative;
    width: 366px;
    height: 28px;
    background-color:${(props) =>
      props.screen_mode === "dark" ? "rgba(42, 46, 57, 1)" : "#F0F3FA"}  ;
    border-radius: 8px;
    margin: 8px 0;
  }
 
  .icon-search-share{
    position: absolute;
    top:4px;
    left: 8px;
  }
  .search{
    background-color: transparent;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    padding-left:36px ;
    outline: none;
    color:${(props) =>
      props.screen_mode === "dark" ? "#fff" : "rgba(8, 8, 8, 0.5)"};
  }
    .save-target {
    display: flex;
    padding: 8px 12px;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    background: #575a6a;
    cursor: pointer;
    border: none;
    /* width: 136px; */
    
  }
  .list-friend{
    display: flex;
justify-content: center;
align-items: center;
/* flex: 1 0 0; */
align-self: stretch;
flex-direction: column;
overflow-y: scroll;
  }
  .item-friend{
    display: flex;
padding: 4px 8px;
align-items: center;
gap: 16px;
align-self: stretch;
width: 655px;
height: 42px;
border-radius: 8px;
  }
  .avt{
    width: 34px;
height: 34px;
border-radius: 10000px;
  }
  .info{
    display: flex;
flex-direction: column;
align-items: flex-start;
gap: 4px;
width: 565px;
  }
  .name{
    color: ${(props) =>
      props.screen_mode === "dark" ? "#fff" : "rgba(8, 8, 8, 1)"};
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;

  }
  .on{
    display: flex;
align-items: center;
gap: 4px;
  }
  .status{
    color: ${(props) =>
      props.screen_mode === "light" ? "rgba(8, 8, 8, 0.50)" : "#fff"} ;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 14px; /* 116.667% */
  }
  .check-info{
    display: flex;
padding: 4px;
align-items: flex-start;
gap: 10px;
border-radius: 4px;
background: #575a6a;
  }
 .remove-check{
  display: flex;
padding: 4px;
align-items: flex-start;
gap: 10px;
border-radius: 4px;
border:${(props) =>
  props.screen_mode === "dark"
    ? "1px solid #3A3F42"
    : "1px solid rgba(207, 208, 212, 0.50)"} ;
background:${(props) =>
  props.screen_mode === "dark" ? "#1F232C" : "#FDFDFD"} ;
 }

 .box-indicator{
    /* position: absolute; */
    top: 347px;
    left: 0;
    border-radius: 8px;
    /* background-color: ${(props) =>
      props.screen_mode === "dark" ? "#1f232c" : "rgba(253, 253, 253, 1)"}; */
height: 251px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    /* gap: 16px; */
    font-size: 16px;

   
 }

 .title-indicator-first{
display: flex;
    border-radius: 3px;
    background-color: #3594EF;
font-size: 12px;
    padding: 6px 8px;
    align-items: center;
    cursor: pointer;
    gap: 8px;

}
.icon-indicator-first{
  display: flex;
padding: 4px;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 10000000px;
background: #FFF;
}
.text-indicator-first{
  color: #FFF;
font-family: Roboto;
font-size: 12px;
font-style: normal;
line-height: normal;
}





.body-list-share{
  display: flex;
padding: 0px 0px 16px 16px;
flex-direction: column;
/* justify-content: center; */
align-items: flex-end;
gap: 8px;
flex: 1 0 0;
align-self: stretch;
border-radius: 8px;
background: #1F232C;
backdrop-filter: blur(7px);
}
.title-list-share{
  display: flex;
align-items: center;
gap: 24px;
align-self: stretch;
}
.title-share{

}
.ant-modal-root .ant-modal-centered .ant-modal{
  background-color: rgb(31, 35, 44) !important;
  border-radius: 8px !important;
}
.ant-modal-content{
  background: red !important;
}
.ant-modal .ant-modal-content{
  background: red !important;

}
`;
