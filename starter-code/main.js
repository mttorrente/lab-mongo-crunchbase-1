const MongoDB = require('mongodb');
const mongoClient = MongoDB.MongoClient;
const clear = require('clear');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const url = `mongodb://localhost:27017/crunchbase`

mongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('Error trying to connect to the Database');
    console.log(error);
  } else {
    console.log('Connection established correctly!! 😬');

      function mainMenu() {
        clear();
        printMenu();
      rl.question('Type an option: ', (option) => {
        switch(option){
          case "1":
           //Listar todas las compañías por nombre
            db.collection('companies').find({}, {name: 1, _id: 0}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;
          case "2":
          //Contar todas las compañías
             db.collection('companies').find({}, {name: 1, _id: 0}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
              break;
          case "3":
            //Contar todas las compañías por nombre fundadas en el 2004
              db.collection('companies').find({"funding_rounds.funded_year": 2004}, {name: 1, _id: 0}).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "4":
            //List by name all companies founded in february of 2004.
              db.collection('companies').find({ $and: [{ founded_year: 2004 }, { founded_month: 2 }]}, {name: 1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "5":
            //List by name all companies founded in the summer of 2004 (april to june) sorted by date.
            db.collection('companies').find({ $and: [{ founded_year: 2004 }, { founded_month: { $gte: 4 } }, { founded_month: { $lte: 6 } }] }, {}, {founded_month:1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "6":
            //What companies have offices in "Barcelona".
            db.collection('companies').find({"offices.city": { $in: ["Barcelona"] } }  ).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
           case "7":
            //List the 10 companies with more employees sorted ascending (show name and employees).
            db.collection('companies').find({}, {name:1,number_of_employees:1},{number_of_employees:-1} ).limit(10).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;

          case "8":
            //Find the company with the name "Facebook"
            db.collection('companies').find({name:"Facebook"} ).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
            case "9":
            //How many employees has Facebook?
            db.collection('companies').find({name:"Facebook"},{number_of_employees:1} ).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;

          case "10":
            //List the name of all the products of Facebook
            db.collection('companies').find({name:"Facebook"},{"products.name":1} ).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;

          case "11":
            // List the people that are working at Facebook right now (check relationships field)
            db.collection('companies').find({ $and: [{ name: 'Facebook' }, {"relationships.is_past": false }] }, {"relationships.is_past":1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "12":
            // How many people are not working anymore at Facebook
            db.collection('companies').find({ $and: [{ name: 'Facebook' }, {"relationships.is_past": true }] }, {"relationships.is_past":1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "13":
            // List all the companies where "david-ebersman" has worked.
            db.collection('companies').find({"relationships.person.permalink":"david-ebersman"}, {name:1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "14":
            // List by name the competitors of Facebook
            db.collection('companies').find({name:"Facebook"}, {"competitions.competitor.name":1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
           case "15":
            // Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
            db.collection('companies').find({tag_list: { $regex: /social-networking/ } },{name:1}).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "16":
            //  How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
            db.collection('companies').find({ $and: [{tag_list: { $regex: /social-networking/ } },{ founded_year: { $gte: 2002 } }, {founded_year: { $lte: 2016 } }] } ).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "17":
            //  Names and locations of companies that have offices in London
            db.collection('companies').find({"offices.city": { $in: ["London"] } },{name:1 , "offices.city":1}  ).toArray((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
          
          case "18":
            //  How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
            db.collection('companies').find({ $and: [{tag_list: { $regex: /social-networking/ } },{ founded_year: { $gte: 2002 } }, {founded_year: { $lte: 2016 } },{"offices.city": { $in: ["New York"] } }] } ).count((error, result) => {
                if (error) {
                  console.log(error);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                } else {
                  console.log(result);
                  rl.question(`\nType enter to continue: `, (answer) => { mainMenu() });
                }
              })
            break;
        }
      });
      }

      mainMenu()
  }
});



function printMenu(){
	console.log(`
0.- Exit
1.- List by name all companies.
2.- How many companies are there?
3.- How many companies were founded in 2004?
4.- List by name all companies founded in february of 2004.
5.- List by name all companies founded in the summer of 2004 (april to june) sorted by date.
6.- What companies have offices in "Barcelona".
7.- List the 10 companies with more employees sorted ascending (show name and employees).
8.- Find the company with the name "Facebook"
9.- How many employees has Facebook?
10.- List the name of all the products of Facebook
11.- List the people that are working at Facebook right now (check relationships field)
12.- How many people are not working anymore at Facebook
13.- List all the companies where "david-ebersman" has worked.
14.- List by name the competitors of Facebook
15.- Names of the companies that has "social-networking" in tag-list (be aware that the value of field is a string check regex operators)
16.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive
17.- Names and locations of companies that have offices in London
18.- How many companies that has "social-network" in tag-list and founded between 2002 and 2016 inclusive and has offices in New York
`);
}