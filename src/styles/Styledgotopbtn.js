import { Link } from "react-router-dom";
import styled from "styled-components";

const GoHome = styled(Link)`
  position: fixed;
  bottom: 40px;
  right: 50px;
  cursor: pointer;
  border-radius:50%;

  text-decoration: none;
  text-align: center;
  color: #fff;
  font-size: 22px;
  transition: transform 80ms ease-in;
  font-weight: bold;
  z-index: 9000;
  box-shadow: 1px 2px 10px rgba(210, 210, 210, 0.15),
    1px 3px 11px rgba(210, 210, 210, 0.1);

  &:hover {
    opacity: 0.95;
    color: #ccc;
    text-decoration: none;

    box-shadow: 1px 2px 100px rgba(255, 255, 255, 0.75),
      1px 3px 11px rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export default GoHome;
