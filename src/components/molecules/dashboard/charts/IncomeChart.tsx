import React, { useEffect, useState } from 'react';
import { Chart, LineAdvance } from 'bizcharts';
import toast from 'react-hot-toast';
import { Api } from 'src/pages/api/services/Api';
import { EbackendEndpoints, EhttpMethod } from 'src/types/enums';


export default function IncomeChart(props: { year: number, cat_id: any}): JSX.Element {
	let year = props.year
	const [income, setIncome] = useState<any[]>()
	useEffect(() => {
		const loadIncomes = async () => {
			let endpoint=''
			if(parseInt(props.cat_id) === 0){
				endpoint = EbackendEndpoints.GET_INCOME_STATISTICS+year
			}
			else {
				endpoint = EbackendEndpoints.GET_INCOME_STATISTICS_BY_SOURCE+year+'?source='+props.cat_id
		
			}
			await new Api().connect(endpoint, EhttpMethod.GET)
				.then((response) => {
					if (response.success) {
						setIncome(response.data)
					}
				})
				.catch((e:any) => {
					toast.error(e.message)
				})
		}
		loadIncomes()
	}, [props.cat_id, year])

	function getMonth(date: any) {
		let newDate = date.toString()
		console.log(newDate)
		return newDate.split(' ')[1]
	}

	function getMonthInt(mon: string) {
		const months = [
			{
				name: 'Jan',
				index: 1,
			},
			{
				name: 'Feb',
				index: 2,
			},
			{
				name: 'Mar',
				index: 3,
			},
			{
				name: 'Apr',
				index: 4,
			},
			{
				name: 'May',
				index: 5,
			},
			{
				name: 'Jun',
				index: 6,
			},
			{
				name: 'Jul',
				index: 7,
			},
			{
				name: 'Aug',
				index: 8,
			},
			{
				name: 'Sep',
				index: 9,
			},
			{
				name: 'Oct',
				index: 10,
			},
			{
				name: 'Nov',
				index: 11,
			},
			{
				name: 'Dec',
				index: 12,
			}
		]
		for (let i = 0; i < months.length; i++) {
			if (mon === months[i].name) {
				return months[i].name
			}
		}


	}
	// format using comma
let internationalNumberFormat = new Intl.NumberFormat('en-US')

	function getIncomeInMoneth(mon: string) {
		let data: any = income
        let totalIncomes = 0
		for (let k = 0; k < data?.length; k++) {
			let dbMonth: any = data[k].month
			
	
			if (dbMonth === mon) {
                totalIncomes += data[k].amount
			
			}


		}
        // return internationalNumberFormat.format(totalIncomes)
		return totalIncomes
	}

	const data = [
		{
			month: "Jan",
			title: "Total amount on income",
			total: getIncomeInMoneth('Jan')
		},
		{
			month: "Feb",
			title: "Total amount on income",
			total: getIncomeInMoneth('Feb')
		},
		{
			month: "Mar",
			title: "Total amount on income",
			total: getIncomeInMoneth('Mar')
		},
		{
			month: "Apr",
			title: "Total amount on income",
			total: getIncomeInMoneth('Apr')
		},
		{
			month: "May",
			title: "Total amount on income",
			total: getIncomeInMoneth('May')
		},
		
		{
			month: "Jun",
			title: "Total amount on income",
			total: getIncomeInMoneth('Jun')	},
		//
		{
			month: "Jul",
			title: "Total amount on income",
			total: getIncomeInMoneth('Jul')	},
		{
			month: "Aug",
			title: "Total amount on income",
			total: getIncomeInMoneth('Aug')	},
		//
		{
			month: "Sep",
			title: "Total amount on income",
			total: getIncomeInMoneth('Sep')
		},
		
		{
			month: "Oct",
			title: "Total amount on income",
			total: getIncomeInMoneth('Oct')
		},
		
		{
			month: "Nov",
			title: "Total amount on income",
			total: getIncomeInMoneth('Nov')	},
		//
		{
			month: "Dec",
			title: "Total amount on income",
			total: getIncomeInMoneth('Dec')	}
	];

	return <Chart padding={[10, 30, 80, 70]} autoFit height={300} data={data} >
		<LineAdvance
			shape="smooth"
			point
			area
			position="month*total"
			color="tomato"
		/>

	</Chart>
}




