import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const NavItemButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #ddd;
  background: #1a83ff;
  padding: 5px 15px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  border: 2px solid #1a83ff;
  letter-spacing: 0.5px;
  text-align: center;
  transition: transform 80ms ease-in;
  transition: all 0.3s ease-in;

  box-shadow: 1px 2px 1px rgba(230, 230, 230, 0.15),
    1px 3px 1px rgba(230, 230, 200, 0.1);

  ${(props) =>
    props.secondary &&
    css`
      transform: translateY(1200px);
      animation: button 1.5s forwards ease-in;
 
      @keyframes button {
        to {
          transform: translateY(0);
        }
      }
    `}

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

export const AddNewButton = styled(Link)`
  display: block;
  color: #fff;
  background-color: #1a83ff;
  border: 1px solid #1a83ff;
  border-radius: 5px;
  padding: 4px 10px;
  font-size: 16px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 80ms ease-in;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), 0 5px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    opacity: 0.95;
    color: #fff;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

export const ModalButton = styled.button`
  background: transparent;
  border: none;

  &:hover {
    opacity: 0.95;
    border: none;
    color: #060b26;
  }

  &:active {
    border: none;
    transform: scale(0.95);
  }

  &:focus {
    border: none;
    outline: none;
  }
`;
