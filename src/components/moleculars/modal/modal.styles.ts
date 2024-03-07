import styled from '@emotion/styled'
import { grey } from '@mui/material/colors';

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  background-color: ${grey[100]};
`