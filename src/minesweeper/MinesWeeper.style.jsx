import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BoardWrapper = styled.div`
  width: 506px;
  height: 500px;
  background-color: azure;
  border: 4px solid gray;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  position: relative;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexBetweenStart = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Section = styled.div`
  width: 61px;
  height: 60px;

  border: 1.5px solid white;

  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isExploded, isEmpty, indicatorNumber }) => {
    if (isExploded) {
      return css`
        background-color: #da0d0d;
      `;
    } else if (isEmpty) {
      return css`
        background-color: #939090;
      `;
    } else if (indicatorNumber) {
      return css`
        background-color: #6e6c6c;
      `;
    } else {
      return css`
        background-color: #bcb7b7;
      `;
    }
  }}

  &:hover {
    opacity: 0.5;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px gray;

  &:hover {
    opacity: 0.5;
  }

  ${({ flag, hasChanges }) => {
    if (flag || hasChanges) {
      return css`
        background-color: #a7e8db;
      `;
    } else {
      return css`
        background-color: #f0f3f3;
      `;
    }
  }}

  ${({ type }) => {
    switch (type) {
      case "input":
        return css`
          height: 34px;
        `;

      default:
        return css`
          min-height: 45px;
          width: 100px;
          margin-top: 20px;
        `;
    }
  }}
`;

export const IMG = styled.img`
  width: 30px;
  z-index: 2;
`;

export const Indicators = styled.span`
  font-size: 25px;
  font-weight: 600;
  ${({ indicatorNumber }) => {
    switch (indicatorNumber) {
      case 1:
        return css`
          color: #0c47db;
        `;

      case 2:
        return css`
          color: #38d729;
        `;
      case 3:
        return css`
          color: #f21010;
        `;
      case 4:
        return css`
          color: #d709a0;
        `;
      case 5:
        return css`
          color: #8e0885;
        `;

      default:
        break;
    }
  }}
`;

export const MinesInput = styled.input`
  border: solid 2px #b5b5b5;
  height: 30px;
  width: 65px;

  :focus {
    border: solid 2px #b5b5b5;
    outline: none;
  }
`;

export const Text = styled.span`
  font-weight: 500;

  ${({ type }) => {
    switch (type) {
      case "gameOver":
        return css`
          color: red;
        `;
      case "won":
        return css`
          color: green;
        `;

      case "mines":
        return css`
          color: red;
          font-size: 20px;
        `;

      default:
        return css`
          color: black;
          font-size: 15px;
        `;
    }
  }}
`;

export const HeaderWrapper = styled.div`
  width: 170px;
  display: flex;
  justify-content: flex-end;

  ${({ type }) => {
    switch (type) {
      case "input":
        return css`
          justify-content: flex-start;
        `;

      case "mines":
        return css`
          justify-content: flex-end;
          align-items: center;
        `;

      default:
        return css`
          justify-content: center;
        `;
    }
  }}
`;
