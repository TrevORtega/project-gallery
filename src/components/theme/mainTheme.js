import { Container, Row } from "react-bootstrap";
import styled from 'styled-components';

// Should be the top component in any page
export const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
`;

// Secondary component in any page, contains the background colors
export const ContentContainer = styled(Row)`
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(47,121,9,1) 50%, rgba(0,212,255,1) 100%);
  background: linear-gradient(230deg, #a24bcf, #4b79cf, #4bc5cf);

  min-height: 95vh;
  text-align: center;
`;

