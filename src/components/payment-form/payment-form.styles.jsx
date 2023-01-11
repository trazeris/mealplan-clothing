import styled from "styled-components";
import { InvertedButton } from "../button/button.styles";


export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PayForm = styled.form`
  height: 100px;
  width: 100%;
`;

export const PaymentButton = styled(InvertedButton)`
  margin-left: auto;
  margin-top: 30px;
`;