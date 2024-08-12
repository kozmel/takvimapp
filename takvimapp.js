document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDate = null;

    const monthAndYear = document.getElementById('monthAndYear');
    const calendarBody = document.getElementById('calendarBody');
    const dateInput = document.getElementById('dateInput');
    const todayBtn = document.getElementById('todayBtn');
    const goToDateBtn = document.getElementById('goToDate');

    const eventModal = document.getElementById('eventModal');
    const eventForm = document.getElementById('eventForm');
    const eventTitle = document.getElementById('eventTitle');
    const eventTime = document.getElementById('eventTime');
    const closeModalBtn = document.querySelector('.close');

    const events = {}; // To store events by date (e.g., "2024-08-10": [{ title: "Meeting", time: "10:00" }])

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function renderCalendar(month, year) {
        calendarBody.innerHTML = '';  // Clear the previous content

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        monthAndYear.textContent = `${months[month]} ${year}`;

        let date = 1;
        for (let i = 0; i < 6; i++) {  // Create 6 rows
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {  // Create 7 columns
                if (i === 0 && j < firstDay) {
                    const cell = document.createElement('td');
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cell = document.createElement('td');
                    const cellDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    cell.classList.add('date-cell');
                    cell.setAttribute('data-date', cellDate);

                    const dateNumber = document.createElement('div');
                    dateNumber.textContent = date;
                    cell.appendChild(dateNumber);

                    const eventList = document.createElement('div');
                    eventList.classList.add('event-list');
                    cell.appendChild(eventList);

                    // Display existing events
                    if (events[cellDate]) {
                        events[cellDate].forEach(event => {
                            const eventDiv = document.createElement('div');
                            eventDiv.classList.add('event');
                            eventDiv.textContent = `${event.time} - ${event.title}`;
                            eventList.appendChild(eventDiv);
                        });
                    }

                    // Highlight today's date
                    if (date === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                        cell.classList.add('today');
                    }

                    cell.addEventListener('click', () => {
                        selectedDate = cellDate;
                        openModal();
                    });

                    row.appendChild(cell);
                    date++;
                }
            }

            calendarBody.appendChild(row);
        }
    }

    function openModal() {
        eventModal.style.display = 'block';
    }

    function closeModal() {
        eventModal.style.display = 'none';
    }

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    todayBtn.addEventListener('click', () => {
        currentMonth = currentDate.getMonth();
        currentYear = currentDate.getFullYear();
        renderCalendar(currentMonth, currentYear);
    });

    goToDateBtn.addEventListener('click', () => {
        const selectedDate = dateInput.value;
        if (selectedDate) {
            const [year, month] = selectedDate.split('-').map(Number);
            currentMonth = month - 1;
            currentYear = year;
            renderCalendar(currentMonth, currentYear);
        }
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = eventTitle.value.trim();
        const time = eventTime.value;

        if (selectedDate && title && time) {
            if (!events[selectedDate]) {
                events[selectedDate] = [];
            }
            events[selectedDate].push({ title, time });
            renderCalendar(currentMonth, currentYear);
            closeModal();
            eventForm.reset();
        }
    });

    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeModal();
        }
    });

    renderCalendar(currentMonth, currentYear);
});

