// console.log(document);

const dashboard = document.querySelector('.dashboard');
const dailyButton = document.querySelector('.dashboard header nav button.daily');
const weeklyButton = document.querySelector('.dashboard header nav button.weekly');
const monthlyButton = document.querySelector('.dashboard header nav button.monthly');
const sections = Array.from(dashboard.querySelectorAll('& > section'));
const dataLocation = "./data.json";
// console.log(dailyButton);
// console.log(weeklyButton);
// console.log(monthlyButton);
// console.log(dashboard.attributes.timeframe);
// console.log(sections);

dailyButton.addEventListener('click', (e) => changeDashboard("daily", e.target));
weeklyButton.addEventListener('click', (e) => changeDashboard("weekly", e.target));
monthlyButton.addEventListener('click', (e) => changeDashboard("monthly", e.target));

// resetDashboard();
populateDashboard();

function changeDashboard(s, e) { 
    // console.log("Clicked " + s);
    console.log(e);
    dashboard.setAttribute("data-timeframe", s);
    resetButtons();
    e.setAttribute("aria-pressed", "true");
}

function resetButtons() {
    [dailyButton, weeklyButton, monthlyButton].forEach((b) => {
        b.setAttribute("aria-pressed", "false");
    });
}

async function getData() { 
    let data = {};
    await fetch(dataLocation).then((response) => { 
        if (!response.ok) throw new Error('Could not fetch JSON data');

        return response.json();
    }).then((d) => { 
        data = d;
    })
    return data;
}

function resetDashboard() { 
    const data = dashboard.querySelectorAll('.current-time, .previous-time');
    // console.log(data);
    data.forEach((d) => {
        d.textContent = "...";
    })
}

async function populateDashboard() {
    try {
        const data = await getData();
        
        // console.log(data);
        data.forEach((d) => { 
            let title = d.title;
            let timeframes = d.timeframes;
            title = title.toLowerCase().replace(' ', "-");
            // console.log(title);
            // console.log(timeframes);

            const section = sections.find((s) => {
                return s.classList.contains(title);
            });
            // console.log(section);

            // console.log(data);
            for (const [key, value] of Object.entries(timeframes)) {
                // console.log(key, value);
                const current = value.current;
                const previous = value.previous;
                const currentTime = section.querySelector(`& .data.${key} .current-time`)
                const previousTime = section.querySelector(`& .data.${key} .previous-time`)
                // console.log(data);
                currentTime.textContent = current + "hr" + ((current > 1 || current == 0) ? "s" : "");
                previousTime.textContent = previous + "hr" + ((previous > 1 || previous == 0) ? "s" : "");
                // console.log(currentTime);
                // console.log(previousTime);
            }
        });
    } catch (error) {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = error;
        dashboard.appendChild(errorMessage);
    }
}