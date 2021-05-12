// const fs = require("fs");
const db = require("../models");

const users = [
  {
    first_name: "Mushtaq",
    last_name: "Safie",
    email_address: "mushtaq@gmail.com",
    user_password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
  },
];

users.forEach(currentItem => {
  db.User.create(currentItem).then(result => console.log(result));
});


