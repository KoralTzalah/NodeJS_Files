//מגישות קורל צלח וקארין ואנונו

const fs = require("fs"); // import fs module
const path = require("path");


// read json file and parse the data from string to objects
let data = fs.readFileSync(path.join(__dirname, "users.json"), "utf-8");
console.log(data);
parsedData = JSON.parse(data);
console.log(parsedData);

//count users in the data and copy them to user_count.txt
let usersCount = parsedData.length;
console.log(usersCount);
fs.writeFileSync(
  path.join(__dirname, "user_count.txt"),
  `User Count: ${usersCount}`,
);

//go over every object and cope the name to names in a loop, then sends them to user_names.txt
let names = "";
for (let i = 0; i < parsedData.length; i++) {
  let userName = parsedData[i].name;
  names += userName + "\n";
  console.log(userName);
}
fs.writeFileSync(path.join(__dirname, "user_names.txt"), names);
