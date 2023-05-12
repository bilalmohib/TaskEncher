class Task {
  constructor(minTime, maxTime, frequency, unit, multiple) {
    this.minTime = minTime;
    this.maxTime = maxTime;
    this.frequency = frequency;
    this.unit = unit;
    this.multiple = multiple;
  }

  averageTime() {
    return (this.minTime + this.maxTime) / 2;
  }

  timePerWeek() {
    let weekFactor = this.unit === "week" ? 1 : 7;
    return this.averageTime() * this.frequency * weekFactor;
  }
}

class Child {
  constructor(age, breastfeeding) {
    this.age = age;
    this.breastfeeding = breastfeeding;
  }
}

class Family {
  constructor(type, children, helpers, pets, house) {
    this.type = type;
    this.children = children;
    this.helpers = helpers;
    this.pets = pets;
    this.house = house;
  }
}

class House {
  constructor(bedrooms, bathrooms, livingRooms, kitchen, cars, plants) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.livingRooms = livingRooms;
    this.kitchen = kitchen;
    this.cars = cars;
    this.plants = plants;
  }
}

function calculateTaskTime(tasks) {
  let totalTime = 0;
  for (const task of tasks) {
    totalTime += task.timePerWeek();
  }
  return totalTime;
}

function generateRandomSchedule(tasks, helpers, workStart, workEnd, workDays) {
  let schedule = [];
  let availableTime = (workEnd - workStart) * workDays * helpers;

  let taskTimes = tasks.map((task) => task.timePerWeek());
  let totalTaskTime = taskTimes.reduce((a, b) => a + b, 0);

  if (availableTime < totalTaskTime) {
    alert("Not enough helper time to complete all tasks.");
  }

  let remainingTasks = [...tasks];

  while (remainingTasks.length > 0) {
    let randomIndex = Math.floor(Math.random() * remainingTasks.length);
    let task = remainingTasks[randomIndex];
    let taskTime = task.timePerWeek();

    if (availableTime >= taskTime) {
      schedule.push(task);
      availableTime -= taskTime;
    }

    remainingTasks.splice(randomIndex, 1);
  }

  return schedule;
}

// Static Usage @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// let family = new Family(
//   "Couple with Children",
//   [new Child(4, false), new Child(8, false)],
//   2,
//   { dogs: 1, cats: 0, others: 0 },
//   new House(3, 2, 1, 1, 2, 5)
// );

// let tasks = [
//   new Task(10, 15, 3, "week", 1),
//   new Task(10, 15, 1, "day", 7),

// ];

// let totalTime = calculateTaskTime(tasks);
// console.log("Total task time per week:", totalTime);

// let schedule = generateRandomSchedule(tasks, family.helpers, 7, 21, 6);
// console.log("Random schedule:", schedule);
// Static Usage @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Now we'll ask the user for input
let type = prompt(
  "What type of family are you in? Options are: 'Single Family', 'Couple with no children', 'Single Parent Family', 'Couple with Children'"
); // Correct
let numChildren = Number(prompt("How many children are in your household?"));
let children = [];
for (let i = 0; i < numChildren; i++) {
  let age = Number(prompt(`What is the age of child ${i + 1}?`));
  let breastfeeding =
    prompt(`Is child ${i + 1} breastfeeding? (yes/no)`) === "yes";
  children.push(new Child(age, breastfeeding));
}
let helpers = Number(prompt("How many helpers are in your family?"));
let pets = {
  dogs: Number(prompt("How many dogs do you have?")),
  cats: Number(prompt("How many cats do you have?")),
  others: Number(prompt("How many other pets do you have?")),
};
let house = new House(
  Number(prompt("How many bedrooms are in your house?")),
  Number(prompt("How many bathrooms are in your house?")),
  Number(prompt("How many living rooms are in your house?")),
  Number(prompt("How many kitchens are in your house?")),
  Number(prompt("How many cars do you have?")),
  Number(prompt("How many plants do you have?"))
);

let family = new Family(type, children, helpers, pets, house);

let numTasks = Number(prompt("How many tasks do you have?"));
let tasks = [];
for (let i = 0; i < numTasks; i++) {
  let minTime = Number(prompt(`What is the minimum time for task ${i + 1}?`));
  let maxTime = Number(prompt(`What is the maximum time for task ${i + 1}?`));
  let frequency = Number(prompt(`What is the frequency for task ${i + 1}?`));
  let unit = prompt(
    `What is the unit for task ${i + 1}? Options are: 'day', 'week'`
  );
  let multiple = Number(prompt(`What is the multiple for task ${i + 1}?`));
  tasks.push(new Task(minTime, maxTime, frequency, unit, multiple));
}

let workStart = Number(prompt("What hour does the helper start work?"));
let workEnd = Number(prompt("What hour does the helper end work?"));
let workDays = Number(prompt("How many days per week does the helper work?"));

let totalTime = calculateTaskTime(tasks);
console.log("Total task time per week:", totalTime);

let schedule = generateRandomSchedule(
  tasks,
  family.helpers,
  workStart,
  workEnd,
  workDays
);
console.log("Random schedule:", schedule);
