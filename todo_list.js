addTask("Walk Kenai", 1639944500000)
addTask("Bake Cookies")
addTask("Go to Hogwarts", 336650400000)

const add_task_btn = document.querySelector('#add_task');
add_task_btn.addEventListener('click', readTaskData);

const add_task_enter = document.querySelector('#task_description_input');
add_task_enter.addEventListener('keydown', (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
        readTaskData();
    }
});

function done_buttons() {
    const list_items = document.querySelectorAll('li');
    for (let i = 0; i < list_items.length; i++) {
        list_items[i].querySelector('.done').addEventListener('click', (e) => {
            list_items[i].remove();
        });
    }
}

function addTask(description, dueTime) {
    let date;
    let date_text;
    let task_text;

    if (dueTime) {
        date = new Date(dueTime);
        date_text = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        task_text = `${description}<span class="due">due ${date_text}</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;
    }

    else {
        task_text = `${description}</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;
    }
    
    const task_list = document.querySelector('#task_list');
    const li = document.createElement("li");
    li.innerHTML = task_text;
    task_list.appendChild(li);
    resetData();
    done_buttons();
}

function readTaskData() {
    const description = document.querySelector('#task_description_input').value;
    console.log(description);
    const date = document.querySelector('#duedate_input');
    console.log(date);
    const time = document.querySelector('#duetime_input');
    console.log(time);
    date_time = dateAndTimeToTimestamp(date, time);
    console.log(date_time);
    addTask(description, date_time);
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function resetData() {
    document.querySelector('#task_description_input').value = '';
    document.querySelector('#duedate_input').value = '';
    document.querySelector('#duetime_input').value = '';
}

