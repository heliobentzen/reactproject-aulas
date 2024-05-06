import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Router } from './routes';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}