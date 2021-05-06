import styled from "styled-components";
import { Link } from "react-router-dom";
import { devices } from "./MediaQueries";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  min-height: 100vh;
  width: 100%;
  z-index: 10;
  position: absolute;
`;

export const FormWrap = styled.div`
  color: #fff;
  width: 450px;

  @media ${devices.mobile} {
    width: 340px;
  }

  padding: 30px;
  border-radius: 7px;
  border-left: 4px solid #060b26;
  border-right: 4px solid #060b26;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  h1,
  p {
    text-align: center;
  }
`;

export const Button = styled.button`
  display: block;
  color: #fff;
  background-color: #060b26;
  border-radius: 20px;
  padding: 12px 45px;
  border: 1px solid #060b26;
  margin: 15px auto;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
   box-shadow: 1px 2px 10px rgba(255, 255, 255, 0.15),
    1px 3px 11px rgba(255, 255, 255, 0.1);

  &:hover {
    opacity: 0.95;
    color: #fff;
    text-decoration: none;

    box-shadow: 1px 2px 100px rgba(255, 255, 255, 0.75),
      1px 3px 11px rgba(255, 255, 255, 0.6);
  }

  &:active {
    box-shadow: 1px 2px 100px rgba(255, 255, 255, 0.75),
      1px 3px 11px rgba(255, 255, 255, 0.6);
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export const StyledDate = styled.div`
  flex: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 3px;
  .wrapp {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    input {
      margin: 0px 0px 5px 5px;
      padding: 5px;
    }
  }
  @media screen and (max-width: 680px) {
    flex: 100%;
  }
`;

export const StyledDOB = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 3px;
  label {
    margin-bottom: 0px;
  }
  input {
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
      border-radius: 3px;
      background: #fff;
    }
  }
`;
export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: #060b26;
  font-family: "Staatliches", cursive;
  &:hover {
    color: #060b26;
    text-decoration: none;
    opacity: 0.85;
  }
`;
