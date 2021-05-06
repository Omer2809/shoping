import styled from "styled-components";

export const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0px;
    color: #444;
  }
  .alert {
    color: red;
    font-size: 15px;
    margin-top: 5px;
  }

  select {
    padding: 5px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  background-color: #eee;
  border: 1px solid #cfd8dc;
  border-radius: 3px;
  padding: 8.85px 13px;
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 14px;

  &:focus {
    outline: 2px solid #060b26;
    background: #fff;
  }
`;
