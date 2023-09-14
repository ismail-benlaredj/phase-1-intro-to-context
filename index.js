// Your code here
const createEmployeeRecord = (array) => ({
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
})

const createEmployeeRecords = (array) => array.map((employee) => createEmployeeRecord(employee));


const createTimeInEvent = (employeeRecord, dateStamp) => {
    const [date, hour] = dateStamp.split(" ");
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
    const [date, hour] = dateStamp.split(" ");
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, dateStamp) => {
    const timeOutHour = employeeRecord.timeOutEvents.filter(
        (event) => event.date === dateStamp
    )[0].hour;
    const timeinHour = employeeRecord.timeInEvents.filter(
        (event) => event.date === dateStamp
    )[0].hour;
    return (timeOutHour - timeinHour) / 100;
}

const wagesEarnedOnDate = (employeeRecord, dateStamp) => hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour

const allWagesFor = (employeeRecord) => {
    const dates = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = dates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
}

const calculatePayroll = (employees) => {
    const payroll = employees.reduce(
        (total, employee) => total + allWagesFor(employee),
        0
    );
    return payroll;
}