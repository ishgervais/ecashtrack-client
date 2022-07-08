import React, { useEffect, useState } from 'react';
import { Chart, LineAdvance } from 'bizcharts';
import { EbackendEndpoints, EhttpMethod } from 'src/types/enums';
import { Api } from 'src/pages/api/services/Api';
import toast from 'react-hot-toast';
import { formatDate, getMonthFromDate } from 'src/util/customFunction';


export default function DebtsChart(props: { year: number, cat_id: any}): JSX.Element {
	let year = props.year
	const [debts, setDebts] = useState<any[]>()
	useEffect(() => {
		const loadDebts = async () => {
			let endpoint=''
			if(parseInt(props.cat_id) === 0){
				endpoint = EbackendEndpoints.GET_DEBT_STATISTICS+year
			}
			else {
				endpoint = EbackendEndpoints.GET_DEBT_STATISTICS_BY_CATEGORY+year+'?category='+props.cat_id
		
			}
			await new Api().connect(endpoint, EhttpMethod.GET)
				.then((response) => {
					if (response.success) {
						setDebts(response.data)
					}
				})
				.catch((e:any) => {
					toast.error(e.message)
				})
		}
		loadDebts()
	}, [debts, props.cat_id, year])

	function getMonth(date: any) {
		let newDate = date.toString()
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


	function getTotalAmountForDebtsInMonth(mon: string) {
		let internationalNumberFormat = new Intl.NumberFormat('en-US')

		let totalAmount = 0;
		let totalEstimatedPayment = 0
		let data: any = debts
		for (let k = 0; k < data?.length; k++) {

			let date = data[k].month
			if (date === mon) {
				totalAmount += data[k].payment
			}


		}
		return (totalAmount)

	}


	// summing up estimated payments


	function getTotalEstimatedAmountFordebtsInMonth(mon: string) {
		let internationalNumberFormat = new Intl.NumberFormat('en-US')
		let totalAmount = 0;
		let data: any = debts
		for (let k = 0; k < data?.length; k++) {
			let date = data[k].month
			if (date === mon) {
				totalAmount += data[k].estimated_payment
			}


		}
		return (totalAmount)

	}



	function getdebtsInMonth(mon: string) {
		let internationalNumberFormat = new Intl.NumberFormat('en-US')
		let totalCount = 0;
		let data: any = debts
		for (let k = 0; k < data?.length; k++) {
			let date = data[k].month
			if (date === mon) {
				totalCount++
			}


		}
		return (totalCount)
	}
	const data = [
		{
			month: "Jan",
			title: "Total debts",
			total: getdebtsInMonth('Jan')
		},
		{
			month: "Jan",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Jan')
		},
		{
			month: "Jan",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Jan')
		},
		{
			month: "Feb",
			title: "Total debts",
			total: getdebtsInMonth('Feb')
		},
		{
			month: "Feb",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Feb')
		},
		{
			month: "Feb",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Feb')
		},
		{
			month: "Mar",
			title: "Total debts",
			total: getdebtsInMonth('Mar')
		},
		{
			month: "Mar",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Mar')
		},
		{
			month: "Mar",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Mar')
		},
		{
			month: "Apr",
			title: "Total debts",
			total: getdebtsInMonth('Apr')
		},
		{
			month: "Apr",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Apr')
		},
		{
			month: "Apr",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Apr')
		},
		{
			month: "May",
			title: "Total debts",
			total: getdebtsInMonth('May')
		},
		{
			month: "May",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('May')
		},
		{
			month: "May",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('May')
		},
		{
			month: "Jun",
			title: "Total debts",
			total: getdebtsInMonth('Jun')
		},
		{
			month: "Jun",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Jun')
		},
		{
			month: "Jun",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Jun')
		},
		{
			month: "Jul",
			title: "Total debts",
			total: getdebtsInMonth('Jul')
		},
		{
			month: "Jul",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Jul')
		},
		{
			month: "Jul",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Jul')
		},
		{
			month: "Aug",
			title: "Total debts",
			total: getdebtsInMonth('Aug')
		},
		{
			month: "Aug",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Aug')
		},
		{
			month: "Aug",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Aug')
		},
		{
			month: "Sep",
			title: "Total debts",
			total: getdebtsInMonth('Sep')
		},
		{
			month: "Sep",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Sep')
		},
		{
			month: "Sep",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Sep')
		},
		{
			month: "Oct",
			title: "Total debts",
			total: getdebtsInMonth('Oct')
		},
		{
			month: "Oct",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Oct')
		},
		{
			month: "Oct",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Oct')
		},
		{
			month: "Nov",
			title: "Total debts",
			total: getdebtsInMonth('Nov')
		},
		{
			month: "Nov",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Nov')
		},
		{
			month: "Nov",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountFordebtsInMonth('Nov')
		},
		{
			month: "Dec",
			title: "Total debts",
			total: getdebtsInMonth('Dec')
		},
		{
			month: "Dec",
			title: "Total paid amount",
			total: getTotalAmountForDebtsInMonth('Dec')

		}
	];

	return <Chart padding={[10, 30, 80, 100]} autoFit height={300} data={data} >
		<LineAdvance
			shape="smooth"
			point
			area
			position="month*total"
			color="title"
		/>

	</Chart>
}




