// Your code here
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}
  
  const employeeDataArray = [
    ["David", "Mwangi", "Software Engineer", 25],
    ["Dan", "MUnene", "DevOps Engineer", 20],
    ["Grom", "Smith", "Data analyst", 18]
  ];    
  
  const employeeRecords = createEmployeeRecords(employeeDataArray);
  console.log(employeeRecords);
  

  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
  
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    };
  
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }
  
  const davidRecord = createEmployeeRecord(["David", "Mwangi", "Software Engineer", 25]);
  let updatedEmployeeRecord = createTimeInEvent(davidRecord, "2022-01-15 0900");
  console.log(updatedEmployeeRecord);
  

  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
  
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    };
  
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }
  
  updatedEmployeeRecord = createTimeOutEvent(davidRecord, "2022-01-15 1700");
  console.log(updatedEmployeeRecord);



  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
  
    return 0; 
  }
  
  createTimeInEvent(davidRecord, "2022-01-15 0900");
  createTimeOutEvent(davidRecord, "2022-01-15 1100");
  
  const workedHours = hoursWorkedOnDate(davidRecord, "2022-01-15");
  console.log(workedHours); 
  



  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const ratePerHour = employeeRecord.payPerHour;
  
    return hoursWorked * ratePerHour;
  }
  
  createTimeInEvent(davidRecord, "2022-01-15 0900");
  createTimeOutEvent(davidRecord, "2022-01-15 1100");
  
  const earnedWages = wagesEarnedOnDate(davidRecord, "2022-01-15");
  console.log(earnedWages);
  


  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
  }
  
  createTimeInEvent(davidRecord, "2022-01-15 0900");
  createTimeOutEvent(davidRecord, "2022-01-15 1100");
  createTimeInEvent(davidRecord, "2022-01-16 0800");
  createTimeOutEvent(davidRecord, "2022-01-16 1700");
  createTimeInEvent(davidRecord, "2022-01-17 1000");
  createTimeOutEvent(davidRecord, "2022-01-17 1500");
  
  const totalWages = allWagesFor(davidRecord);
  console.log(totalWages); 
  


  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
    return totalPayroll;
  }

  employeeRecords.forEach(employeeRecord => {
    createTimeInEvent(employeeRecord, "2022-01-15 0900");
    createTimeOutEvent(employeeRecord, "2022-01-15 1100");
    createTimeInEvent(employeeRecord, "2022-01-16 0800");
    createTimeOutEvent(employeeRecord, "2022-01-16 1700");
    createTimeInEvent(employeeRecord, "2022-01-17 1000");
    createTimeOutEvent(employeeRecord, "2022-01-17 1500");
  });
  
  const totalPayroll = calculatePayroll(employeeRecords);
  console.log(totalPayroll); 
  