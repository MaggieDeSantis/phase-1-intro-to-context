// Your code here
function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
function createEmployeeRecords(employeeInfoData) {
    return employeeInfoData.map(function(info) {
        return createEmployeeRecord(info);
    });
}
const createTimeInEvent = function (employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    employee.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour,10),
        date,
    });

    return employee;
};
const createTimeOutEvent = function (employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");

    employee.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour,10),
        date,
    });

    return employee;
};
const hoursWorkedOnDate = function (employee, soughtDate) { 
    const inEvent = employee.timeInEvents.find(function (e) {
        return e.date === soughtDate;
    });

    const outEvent = employee.timeOutEvents.find(function (e) {
        return e.date === soughtDate;
    });

    return (outEvent.hour - inEvent.hour) /100;
};

const wagesEarnedOnDate = function (employee, dateSought) {
    const rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
    return parseFloat(rawWage.toString());
};
const allWagesFor = function (employee) {
    const eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date;
    });
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d); 
    }, 0);

    return payable;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName;
    });
};

const calculatePayroll = function (arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce (function (memo, rec) {
        return memo + allWagesFor(rec);
    }, 0);
};