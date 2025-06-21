import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'
import styled, { useTheme } from 'styled-components'

interface ProgressBarChartComponentProps {
  title: string
  data: {
    name: string
    value: number
  }[]
}

export function ProgressBarChartComponent({
  title,
  data,
}: ProgressBarChartComponentProps) {
  const theme = useTheme()
  const circleSize = 250
  return (
    <ProgressBarContainer>
      <h3>{title}</h3>
      <RadialBarChart
        width={circleSize}
        height={circleSize}
        cx={circleSize / 2}
        cy={circleSize / 2}
        innerRadius={circleSize / 3}
        outerRadius={circleSize / 2}
        barSize={circleSize * 0.1}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          dataKey="value"
          cornerRadius={circleSize / 2}
          fill={theme.colors.contrast}
        />
        <text
          x={circleSize / 2}
          y={circleSize / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="progress-label"
          fill={theme.colors['base-text']}
        >
          {data[0].value.toFixed(0)}%
        </text>
      </RadialBarChart>
    </ProgressBarContainer>
  )
}

const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -2rem;

  @media (max-width: 1000px) {
    margin-left: 0;
  }

  h3 {
    font-weight: normal;
    color: ${({ theme }) => theme.colors['base-text']};
  }
`
