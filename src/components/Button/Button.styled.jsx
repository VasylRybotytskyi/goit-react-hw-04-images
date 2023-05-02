import styled from 'styled-components';

export const ButtonLoad = styled.button`
  display: inline-block;
  border-radius: 4px;
  border: transparent;
  padding: 6px 12px;
  margin: 10px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  background-color: #00bcd4;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #008ba3;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  }
`;
