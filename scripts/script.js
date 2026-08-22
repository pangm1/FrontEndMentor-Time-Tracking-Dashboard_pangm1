// console.log(document);

const dashboard = document.querySelector('.dashboard');
const dailyButton = document.querySelector('.dashboard header nav button.daily');
const weeklyButton = document.querySelector('.dashboard header nav button.weekly');
const monthlyButton = document.querySelector('.dashboard header nav button.monthly');
// console.log(dailyButton);
// console.log(weeklyButton);
// console.log(monthlyButton);
// console.log(dashboard.attributes.timeframe);

dailyButton.addEventListener('click', () => changeDashboard("daily"));
weeklyButton.addEventListener('click', () => changeDashboard("weekly"));
monthlyButton.addEventListener('click', () => changeDashboard("monthly"));

function changeDashboard(s) { 
    // console.log("Clicked " + s);
    dashboard.setAttribute("timeframe", s);
}