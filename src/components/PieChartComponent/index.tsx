import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Payload } from 'recharts/types/component/DefaultLegendContent'
import * as S from './styles'

interface PieChartComponentProps {
  title: string
  colors?: string[]
  data: {
    name: string
    value: number
  }[]
}

export function PieChartComponent({
  title,
  colors = [],
  data,
}: PieChartComponentProps) {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const RADIAN = Math.PI / 180
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {percent * 100 > 0 && `${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <S.PieContainer>
      <h3>{title}</h3>
      <ResponsiveContainer
        height="100%"
        maxHeight={300}
        style={{ marginTop: -30 }}
      >
        <PieChart width={250} height={250}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Legend
            payload={
              data.map((item, index) => ({
                id: item.name,
                type: 'square',
                value: `${item.name} (${((item.value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%)`,
                color: colors[index % colors.length],
              })) as Payload[]
            }
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </S.PieContainer>
  )
}
