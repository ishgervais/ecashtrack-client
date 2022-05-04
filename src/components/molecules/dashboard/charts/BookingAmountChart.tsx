import React, { useEffect, useState } from 'react';
import { Chart, LineAdvance } from 'bizcharts';
import { EbackendEndpoints, EhttpMethod } from 'src/types/enums';
import { Api } from 'src/pages/api/services/Api';
import toast from 'react-hot-toast';
import { formatDate, getMonthFromDate } from 'src/util/customFunction';


export default function BookingAmountChart(props: { year: number }): JSX.Element {
	let year = props.year
	const [bookings, setBookings] = useState<any[]>()
	useEffect(() => {
		const loadBookings = async () => {
			await new Api().connect(EbackendEndpoints.GET_BOOKING_STATISTICS + year, EhttpMethod.GET)
				.then((response) => {
					if (response.success) {
						setBookings(response.data.docs)
					}
				})
				.catch((error) => {
					toast.error(error.message)
				})
		}
		loadBookings()
	}, [bookings, year])


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


	function getTotalAmountForBookingsInMonth(mon: string) {
		let internationalNumberFormat = new Intl.NumberFormat('en-US')

		let totalAmount = 0;
		let totalEstimatedPayment = 0
		let data: any = bookings
		for (let k = 0; k < data?.length; k++) {

			let date = getMonthFromDate(data[k].booking_date?.date) 
			if (date === mon) {
				totalAmount += data[k].payment
			}


		}
		return (totalAmount)

	}


	// summing up estimated payments


	function getTotalEstimatedAmountForBookingsInMonth(mon: string) {
		let internationalNumberFormat = new Intl.NumberFormat('en-US')
		let totalAmount = 0;
		let data: any = bookings
		for (let k = 0; k < data?.length; k++) {
			let date = getMonthFromDate(data[k].booking_date?.date) 
			if (date === mon) {
				totalAmount += data[k].estimated_payment
			}


		}
		return (totalAmount)

	}



	function getBookingsInMonth(mon: string) {
		let internationalNumberFormat = new Intl.NumberFormat('en-US')
		let totalCount = 0;
		let data: any = bookings
		for (let k = 0; k < data?.length; k++) {
			let date = getMonthFromDate(data[k].booking_date?.date) 
			if (date === mon) {
				totalCount++
			}


		}
		return (totalCount)
	}
	const data = [
		{
			month: "Jan",
			title: "Total bookings",
			total: getBookingsInMonth('Jan')
		},
		{
			month: "Jan",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Jan')
		},
		{
			month: "Jan",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Jan')
		},
		{
			month: "Feb",
			title: "Total bookings",
			total: getBookingsInMonth('Feb')
		},
		{
			month: "Feb",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Feb')
		},
		{
			month: "Feb",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Feb')
		},
		{
			month: "Mar",
			title: "Total bookings",
			total: getBookingsInMonth('Mar')
		},
		{
			month: "Mar",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Mar')
		},
		{
			month: "Mar",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Mar')
		},
		{
			month: "Apr",
			title: "Total bookings",
			total: getBookingsInMonth('Apr')
		},
		{
			month: "Apr",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Apr')
		},
		{
			month: "Apr",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Apr')
		},
		{
			month: "May",
			title: "Total bookings",
			total: getBookingsInMonth('May')
		},
		{
			month: "May",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('May')
		},
		{
			month: "May",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('May')
		},
		{
			month: "Jun",
			title: "Total bookings",
			total: getBookingsInMonth('Jun')
		},
		{
			month: "Jun",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Jun')
		},
		{
			month: "Jun",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Jun')
		},
		{
			month: "Jul",
			title: "Total bookings",
			total: getBookingsInMonth('Jul')
		},
		{
			month: "Jul",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Jul')
		},
		{
			month: "Jul",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Jul')
		},
		{
			month: "Aug",
			title: "Total bookings",
			total: getBookingsInMonth('Aug')
		},
		{
			month: "Aug",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Aug')
		},
		{
			month: "Aug",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Aug')
		},
		{
			month: "Sep",
			title: "Total bookings",
			total: getBookingsInMonth('Sep')
		},
		{
			month: "Sep",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Sep')
		},
		{
			month: "Sep",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Sep')
		},
		{
			month: "Oct",
			title: "Total bookings",
			total: getBookingsInMonth('Oct')
		},
		{
			month: "Oct",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Oct')
		},
		{
			month: "Oct",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Oct')
		},
		{
			month: "Nov",
			title: "Total bookings",
			total: getBookingsInMonth('Nov')
		},
		{
			month: "Nov",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Nov')
		},
		{
			month: "Nov",
			title: "Total estimated  amount",
			total: getTotalEstimatedAmountForBookingsInMonth('Nov')
		},
		{
			month: "Dec",
			title: "Total bookings",
			total: getBookingsInMonth('Dec')
		},
		{
			month: "Dec",
			title: "Total paid amount",
			total: getTotalAmountForBookingsInMonth('Dec')

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




