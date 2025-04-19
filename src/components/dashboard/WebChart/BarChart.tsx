import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { Paper, Typography, Box } from "@mui/material";

export interface BarChartGenericProps {
  contacts: string[];
  data: number[];
  title: string;
  subtitle: string;
  tooltipLabel?: string;
  expanded?: boolean;
}

const barColors = [
  "#5A4A2F",
  "#C39B03",
  "#6E5A3E",
  "#BCB09A",
];

function getTickValues(min: number, max: number, count: number) {
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.round(min + i * step));
}

const CustomTooltip = ({ active, payload, label, tooltipLabel }: any) => {
  if (active && payload && payload.length) {
    const color = payload[0].payload.fill;
    return (
      <Box
        sx={{
          bgcolor: color,
          color: "#fff",
          borderRadius: "0.5rem",
          px: "1rem",
          py: "0.5rem",
          fontWeight: 600,
          fontSize: "1rem",
          boxShadow: 2,
          minWidth: "5rem",
          textAlign: "center",
        }}
      >
        <div>{`Contato ${label}`}</div>
        <div>{tooltipLabel || "Total"}: {payload[0].value}</div>
      </Box>
    );
  }
  return null;
};

const BarChartGeneric: React.FC<BarChartGenericProps> = ({
  contacts,
  data,
  title,
  subtitle,
  tooltipLabel,
  expanded = false,
}) => {
  const chartData = contacts.map((contact, idx) => ({
    name: contact,
    value: data[idx],
    fill: barColors[idx % barColors.length],
  }));

  // Calcular ticks do eixo Y
  const minY = 0;
  const maxY = Math.max(...data) * 1.1; // 10% acima do maior valor
  const tickCount = expanded ? 5 : 3;
  const yTicks = getTickValues(minY, maxY, tickCount);

  return (
    <Paper
      sx={{
        width: "100%",
        height: { xs: "300px", sm: expanded ? "450px" : "400px", md: expanded ? "500px" : "450px" },
        p: { xs: 2, sm: 3 },
        borderRadius: "1.5rem",
        boxShadow: "0 0.25rem 1rem rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          color: "#8D8D8D",
          fontWeight: 500,
          fontSize: "1.1rem",
          lineHeight: 1.1,
          mb: 0,
          mt: 1,
          ml: 1,
        }}
      >
        {subtitle}
      </Typography>
      <Typography
        sx={{
          color: "#191919",
          fontWeight: 700,
          fontSize: "1.7rem",
          mt: -0.5,
          ml: 1,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, bottom: 5, left: 5, right: 5 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#8D8D8D", fontWeight: 500, fontSize: "0.9rem" }}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fill: "#8D8D8D", fontWeight: 500, fontSize: "0.9rem" }}
              ticks={yTicks}
              domain={[minY, maxY]}
            />
            {yTicks.map((y, idx) => (
              y !== 0 && (
                <ReferenceLine
                  key={"refline-" + y}
                  y={y}
                  stroke="#E0E0E0"
                  strokeDasharray="6 4"
                  strokeWidth={1}
                  ifOverflow="extendDomain"
                />
              )
            ))}
            <Tooltip content={({ active, payload, label }) => <CustomTooltip active={active} payload={payload} label={label} tooltipLabel={tooltipLabel} />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default BarChartGeneric;
