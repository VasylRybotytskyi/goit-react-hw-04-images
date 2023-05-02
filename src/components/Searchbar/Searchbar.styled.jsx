import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 30px;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  background-color: #00bcd4;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #008ba3;
  }
`;

export const Input = styled.input`
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  flex-grow: 1;
`;
