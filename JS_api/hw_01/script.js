document.addEventListener("DOMContentLoaded", function () {
    let sheduleData = JSON.parse(localStorage.getItem("sheduleData")) || [
        {
            "id": 1,
            "name": "Йога",
            "time": "10:00 - 11:00",
            "maxParticipants": 15,
            "currentParticipants": 8
        },
        {
            "id": 2,
            "name": "Пилатес",
            "time": "11:30 - 12:30",
            "maxParticipants": 10,
            "currentParticipants": 5
        },
        {
            "id": 3,
            "name": "Кроссфит",
            "time": "13:00 - 14:00",
            "maxParticipants": 20,
            "currentParticipants": 15
        },
        {
            "id": 4,
            "name": "Танцы",
            "time": "14:30 - 15:30",
            "maxParticipants": 12,
            "currentParticipants": 10
        },
        {
            "id": 5,
            "name": "Бокс",
            "time": "16:00 - 17:00",
            "maxParticipants": 8,
            "currentParticipants": 6
        },
    ];

    const sheduleTable = document.getElementById("shedule");

    function renderSchedule() {
        sheduleTable.innerHTML = "";
        sheduleTable.innerHTML = `
            <td>Занятие</td>
            <td>Время</td>
            <td>Кол-во мест</td>
            <td>Кол-во записавшихся</td>`;
        sheduleData.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.time}</td>
            <td>${item.maxParticipants}</td>
            <td>${item.currentParticipants}</td>
            <td>
                <button data-id="${item.id}" class="join-btn">Записаться</button>
                <button data-id="${item.id}" class="cancel-btn">Отменить запись</button>
            </td>`;
            
        const joinBtn = row.querySelector(".join-btn");
        const cancelBtn = row.querySelector(".cancel-btn");

        if (item.currentParticipants >= item.maxParticipants ||
            isUserJoined(item.id)
        ) {
            joinBtn.disabled = true;
        } else {
            cancelBtn.disabled = true;
        }

        sheduleTable.appendChild(row);
        });
    }

    function isUserJoined(id) {
        const userShedule = JSON.parse(localStorage.getItem("userShedule")) || [];
        return userShedule.includes(id);
    }

    sheduleTable.addEventListener("click", function (event) {
        if (event.target.classList.contains("join-btn")) {
            const id = parseInt(event.target.getAttribute("data-id"));
            const selectedItem = sheduleData.find((item) => item.id === id);
            if (selectedItem.currentParticipants < selectedItem.maxParticipants) {
                selectedItem.currentParticipants++;
                const userShedule = JSON.parse(localStorage.getItem("userShedule")) || [];
                userShedule.push(id);
                localStorage.setItem("userShedule", JSON.stringify(userShedule));
                localStorage.setItem("sheduleData", JSON.stringify(sheduleData));
                renderSchedule();
            }
        }
    });

    sheduleTable.addEventListener("click", function (event) {
        if (event.target.classList.contains("cancel-btn")) {
            const id = parseInt(event.target.getAttribute("data-id"));
            const selectedItem = sheduleData.find((item) => item.id === id);
            if (isUserJoined(id)) {
                selectedItem.currentParticipants--;
                const userShedule = JSON.parse(localStorage.getItem("userShedule")) || [];
                const index = userShedule.indexOf(id);
                if (index !== -1) {
                    userShedule.splice(index, 1);
                }
                localStorage.setItem("userShedule", JSON.stringify(userShedule));
                localStorage.setItem("sheduleData", JSON.stringify(sheduleData));
                renderSchedule();

            }
        }
    });

    renderSchedule();
})