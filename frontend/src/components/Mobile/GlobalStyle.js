import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* transparent search field for deck view */
  .transparent > div {
    background-color: rgba(45, 45, 45, 0.6);
  }
  .transparent input {
    border: none;
    color: rgba(255, 255, 255, 0.7);
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  .transparent span svg {
    color: rgba(255, 255, 255, 0.7);
  }

  .transparent .ant-select-selection__clear {
    background-color: transparent;
  }

  /* center items in Select component horizontally */
  .ant-select-selection-selected-value {
    display: flex !important;
    align-items: center;
  }

  /* disable hover color for table to avoid confusion */
  .ant-table-tbody > tr:hover > td {
    background: none !important;
  }

  /* add small margin to bottom of tables. Original value is "0 8px" */
  .ant-table-small > .ant-table-content > .ant-table-body {
    margin: 0 8px 2px;
  }
`;
