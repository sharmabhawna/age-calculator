class AgeCalculator {
	constructor() {
		this.monthsAndDays = {
			Jan: { days: 31, sequence: 1 },
			Feb: { days: 28, sequence: 2 },
			Mar: { days: 31, sequence: 3 },
			Apr: { days: 30, sequence: 4 },
			May: { days: 31, sequence: 5 },
			Jun: { days: 30, sequence: 6 },
			Jul: { days: 31, sequence: 7 },
			Aug: { days: 31, sequence: 8 },
			Sep: { days: 30, sequence: 9 },
			Oct: { days: 31, sequence: 10 },
			Nov: { days: 30, sequence: 11 },
			Dec: { days: 31, sequence: 12 }
		};
	}

	calculateDaysInFeb(year) {
		let days = 28;
		let isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
		if (isLeapYear) {
			days++;
		}
		return days;
	}

	getToday() {
		const year = Date().split(" ")[3];
		const date = Date().split(" ")[2];
		const month = Date().split(" ")[1];
		const today = {
			date: +date,
			month: +this.monthsAndDays[month].sequence,
			year: +year
		};
		return today;
	}

	findTotalDaysOfMonth(month) {
		return Object.values(this.monthsAndDays)[month - 1].days;
	}

	computeAge(birthDay) {
		const today = this.getToday();
		let year = today.year - birthDay.year - 1;
		let month = 11 + today.month - birthDay.month;
		let day;
		if (today.date >= birthDay.date) {
			month++;
			day = today.date - birthDay.date;
		}
		if (today.date < birthDay.date) {
			day =
				this.findTotalDaysOfMonth(today.month - 1) - birthDay.date + today.date;
		}
		year = year + Number.parseInt(month / 12);
		month = month % 12;
		return { year: year, month: month, day: day };
	}
}

module.exports = { AgeCalculator };
