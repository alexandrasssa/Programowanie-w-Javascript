function displayReminders() {
    // Usuwamy istniejące przypomnienia
    while (reminderList.firstChild) {
      reminderList.removeChild(reminderList.firstChild);
    }
  
    if (reminders.length === 0) {
      const noReminders = document.createElement('p');
      noReminders.textContent = 'Brak przypomnień';
      reminderList.appendChild(noReminders);
    } else {
      reminders.forEach((reminder) => {
        const reminderItem = document.createElement('div');
        reminderItem.classList.add('reminder');
        if (reminder.done) {
          reminderItem.classList.add('done');
        }
  
        const reminderName = document.createElement('h2');
        reminderName.textContent = reminder.name;
        reminderItem.appendChild(reminderName);
  
        const reminderDate = document.createElement('p');
        reminderDate.classList.add('date');
        reminderDate.textContent = `${getDayOfWeek(new Date(reminder.date))}, ${reminder.date}`;
        reminderItem.appendChild(reminderDate);
  
        const reminderDone = document.createElement('button');
        reminderDone.classList.add('done-button');
        reminderDone.textContent = reminder.done ? '✔' : '✖';
        reminderDone.addEventListener('click', () => {
          reminder.done = !reminder.done;
          saveReminders();
          displayReminders();
        });
        reminderItem.appendChild(reminderDone);
  
        reminderList.appendChild(reminderItem);
      });
    }
  }