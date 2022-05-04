import React, { useEffect, useState } from 'react';
import { Chart, LineAdvance } from 'bizcharts';
import { EbackendEndpoints, EhttpMethod } from 'src/types/enums';
import { Api } from 'src/pages/api/services/Api';
import toast from 'react-hot-toast';
import { formatDate } from 'src/util/customFunction';


export default function PolyLine(props: { year: number }): JSX.Element {
	let year = props.year
	const [bookings, setBookings] = useState<any[]>()
	useEffect(() => {
		const loadBookings = async () => {
			await new Api().connect(EbackendEndpoints.GET_BOOKING_STATISTICS + year, EhttpMethod.GET)
				.then((response) => {
					if (response.success) {
						setBookings(response.data)
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

	function getBookingsInMonth(mon: string) {
		let totalCount = 0;
		let data: any = bookings
		for (let k = 0; k < data?.length; k++) {
			let dbMonth: any = data[k].month
			if (dbMonth === getMonthInt(mon)) {
				totalCount++
			}


		}
		return totalCount
	}
	console.log('first', getBookingsInMonth('Apr'))

	const data = [
		// {
		// 	month: "Jan",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')	// },
		{
			month: "Jan",
			title: "Booking",
			total: getBookingsInMonth('Jan')
		},
		// {
		// 	month: "Feb",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')		// },
		{
			month: "Feb",
			title: "Booking",
			total: getBookingsInMonth('Feb')
		},
		// {
		// 	month: "Mar",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')5
		// },
		{
			month: "Mar",
			title: "Booking",
			total: getBookingsInMonth('Mar')
		},
		// {
		// 	month: "Apr",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')5
		// },
		{
			month: "Apr",
			title: "Booking",
			total: getBookingsInMonth('Apr')
		},
		// {
		// 	month: "May",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')		// },
		{
			month: "May",
			title: "Booking",
			total: getBookingsInMonth('May')
		},
		// {
		// 	month: "Jun",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')
		// },
		{
			month: "Jun",
			title: "Booking",
			total: getBookingsInMonth('Jun')	},
		// {
		// 	month: "Jul",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')
		// },
		{
			month: "Jul",
			title: "Booking",
			total: getBookingsInMonth('Jul')		},
		// {
		// 	month: "Aug",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')5
		// },
		{
			month: "Aug",
			title: "Booking",
			total: getBookingsInMonth('Aug')	},
		// {
		// 	month: "Sep",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')
		// },
		{
			month: "Sep",
			title: "Booking",
			total: getBookingsInMonth('Sep')
		},
		// {
		// 	month: "Oct",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')
		// },
		{
			month: "Oct",
			title: "Booking",
			total: getBookingsInMonth('Oct')
		},
		// {
		// 	month: "Nov",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')
		// },
		{
			month: "Nov",
			title: "Booking",
			total: getBookingsInMonth('Nov')	},
		// {
		// 	month: "Dec",
		// 	title: "Checkins",
		// 	total: getBookingsInMonth('Jan')
		// },
		{
			month: "Dec",
			title: "Booking",
			total: getBookingsInMonth('Dec')	}
	];

	return <Chart padding={[10, 30, 60, 50]} autoFit height={300} data={data} >
		<LineAdvance
			shape="smooth"
			point
			area
			position="month*total"
			color="title"
		/>

	</Chart>
}




