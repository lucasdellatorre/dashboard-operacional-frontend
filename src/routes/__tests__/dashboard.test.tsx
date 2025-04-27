import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../utils/theme';
import Dashboard from '../Dashboard/index';
import { describe, expect, it } from "vitest";

// Mock do tema para testes
const mockTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    customBackground: {
      ...theme.palette.customBackground,
      primary: '#FFFFFF',
    },
    customText: {
      ...theme.palette.customText,
      black: '#191919',
      lightGrey: '#8D8D8D',
    },
    chart: {
      darkBrown: '#4A4331',
      goldenYellow: '#C1A047',
      oliveBrown: '#624F1C',
      lightBeige: '#D6CFBF',
    },
  },
};

describe('Dashboard Component', () => {
  it('renderiza o texto do dashboard', () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <Dashboard />
      </ThemeProvider>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
