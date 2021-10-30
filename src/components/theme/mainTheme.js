import { Container, Row } from "react-bootstrap";
import styled from 'styled-components';

export const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(0, 128, 0);
`;

export const ContentContainer = styled(Row)`
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(47,121,9,1) 50%, rgba(0,212,255,1) 100%);
  
  min-height: 95vh;
  text-align: center;
`;

