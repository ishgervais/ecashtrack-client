import React from 'react'
import { DonutChart } from 'bizcharts'

// 数据源
const data = [
    {
        type: '分类一',
        value: 27
    },
    {
        type: '分类二',
        value: 25
    },
    {
        type: '分类三',
        value: 18
    },
    {
        type: '分类四',
        value: 15
    },
    {
        type: '分类五',
        value: 10
    },
    {
        type: '其它',
        value: 5
    }
]

export default function ExpensesPie() {
    return (
        <DonutChart
            data={data || []}
            title={{
                visible: true,
                text: 'Expenses'
            }}
            autoFit
            description={{
                visible: true,
                text: 'Showing expenses'
            }}
            height={350}
            radius={0.8}
            padding="auto"
            angleField="value"
            colorField="type"
            pieStyle={{ stroke: 'white', lineWidth: 5 }}
            legend={false}
        />
    )
}
