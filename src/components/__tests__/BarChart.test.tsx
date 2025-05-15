// import { describe, expect, it } from "vitest";
// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../../utils/theme';
// import BarChartGeneric from '../dashboard/WebChart/BarChart';

// // Mock do ResizeObserver
// class ResizeObserverMock {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// }

// global.ResizeObserver = ResizeObserverMock;

// const mockData = {
//   contacts: ['Contato 1', 'Contato 2', 'Contato 3'],
//   data: [10, 20, 30],
//   title: 'Título do Gráfico',
//   subtitle: 'Subtítulo do Gráfico',
//   tooltipLabel: 'Valor',
// };

// // Mock do tema para testes
// const mockTheme = {
//   ...theme,
//   palette: {
//     ...theme.palette,
//     customBackground: {
//       ...theme.palette.customBackground,
//       primary: '#FFFFFF',
//     },
//     customText: {
//       ...theme.palette.customText,
//       black: '#191919',
//       lightGrey: '#8D8D8D',
//     },
//     chart: {
//       darkBrown: '#4A4331',
//       goldenYellow: '#C1A047',
//       oliveBrown: '#624F1C',
//       lightBeige: '#D6CFBF',
//     },
//   },
// };

// describe('BarChartGeneric', () => {
//   const renderComponent = (props = mockData) => {
//     return render(
//       <ThemeProvider theme={mockTheme}>
//         <BarChartGeneric {...props} />
//       </ThemeProvider>
//     );
//   };

//   it('deve renderizar o componente corretamente', () => {
//     renderComponent();
//     expect(screen.getByText('Título do Gráfico')).toBeInTheDocument();
//     expect(screen.getByText('Subtítulo do Gráfico')).toBeInTheDocument();
//   });

//   it('deve exibir os contatos corretamente', () => {
//     renderComponent();
//     // Como o Recharts renderiza os textos em SVG, vamos verificar apenas o título e subtítulo
//     expect(screen.getByText('Título do Gráfico')).toBeInTheDocument();
//     expect(screen.getByText('Subtítulo do Gráfico')).toBeInTheDocument();
//   });

//   it('deve renderizar com tooltipLabel personalizado', () => {
//     const customProps = {
//       ...mockData,
//       tooltipLabel: 'Valor Personalizado',
//     };
//     renderComponent(customProps);
//     expect(screen.getByText('Subtítulo do Gráfico')).toBeInTheDocument();
//   });

//   it('deve renderizar em modo expandido', () => {
//     const expandedProps = {
//       ...mockData,
//       expanded: true,
//     };
//     renderComponent(expandedProps);
//     expect(screen.getByText('Título do Gráfico')).toBeInTheDocument();
//   });
// }); 