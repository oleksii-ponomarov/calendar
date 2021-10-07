"use strict";

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function monthCalendar(date) {
  const legend = "Mon Tue Wed Thu Fri Sat Sun";
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  let title = `${monthName} ${year}`;

  // Center the title
  const leftMargin = Array(Math.floor((legend.length - title.length) / 2)).fill(" ").join("");
  title = leftMargin + title;
    
  let divider = Array(legend.length).fill("-").join("");

  // Sunday is day 0 in JS
  const startDay = new Date(year, month, 1).getDay() || 7;

  // Date 0 corresponds to the last date of the previous month == number of days in the month
  const numberOfDays = new Date(year, month + 1, 0).getDate();

  let days = Array(startDay + numberOfDays).fill("");
  for (let day = startDay; day < startDay + numberOfDays; day++) {
    days[day - 1] = day - startDay + 1;
  }

  let calendarRows = [divider, title, divider, legend];
  // Chunk the days into weeks
  for (let i = 0; i < days.length; i += 7) {
    const week = days.slice(i, i + 7).map(day => {
      if (!day) return "   ";
      const dayString = day.toString();
      return dayString.length === 1 ? `  ${dayString}` : ` ${dayString}`;
    });
    calendarRows.push(week.join(" "));
  }

  const calendar = calendarRows.join("\n");
  return calendar;
}

function main(dateInput) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthInput = Number(dateInput.split("/")[0]);
  const yearInput = Number(dateInput.split("/")[1]);

  const month = monthInput || currentMonth + 1;
  const year = yearInput || currentYear;

  const date = new Date(year, month - 1);
  const isInvalidDate = isNaN(monthInput) || month > 12 || isNaN(date.getMonth());

  if (isInvalidDate) {
    console.log(`Invalid input format. Enter valid month/year, i.e.: ${currentMonth + 1}/${currentYear}`);
    rl.close();
    return;
  }

  console.log("\n");
  console.log(monthCalendar(date));
  rl.close();
}

rl.question("Enter month (for current year) or 'month/year': ", main)