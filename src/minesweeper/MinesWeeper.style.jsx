import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const BoardWrapper = styled.div`
  @media (max-width: 1000px) {
    width: 258px;
    height: 258px;
  }
  @media (min-width: 1000px) {
    width: 450px;
    height: 450px;
  }

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

export const HeadAbsolute = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  position: absolute;
  column-gap: 10px;
  right: 50%;
  transform: translateX(50%);
  top: 0px;

  @media (max-width: 1000px) {
    right: 70px;
    top: 30px;
  }
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexBetweenStart = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
`;

export const Section = styled.div`
  cursor: pointer;
  @media (max-width: 1000px) {
    width: 30px;
    height: 30px;
  }

  width: 54px;
  height: 54px;

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
        background-color: #9ea1a3;
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
  cursor: pointer;
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
      case 'input':
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
  height: ${({ iconH }) => (iconH ? `${iconH}px` : '')};
  width: ${({ iconW }) => (iconW ? `${iconW}px` : '25px')};
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
        return css`
          color: #3d0439;
        `;
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
      case 'gameOver':
        return css`
          color: red;
        `;
      case 'won':
        return css`
          color: green;
        `;

      case 'mines':
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
  display: flex;
  justify-content: flex-end;

  ${({ type }) => {
    switch (type) {
      case 'input':
        return css`
          justify-content: flex-start;
          width: 100px;
          @media (max-width: 1000px) {
            width: 50px;
          }
        `;

      case 'mines-web':
        return css`
          justify-content: flex-end;
          align-items: center;
          @media (max-width: 1000px) {
            display: none;
          }
        `;
      case 'mines-mobile':
        return css`
          justify-content: flex-end;
          align-items: center;
          display: none;
          @media (max-width: 1000px) {
            display: block;
          }
        `;

      default:
        return css`
          justify-content: center;
        `;
    }
  }}
`;
