var inquirer = require('inquirer');
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "P#AGOs18",
    database: "Eatout_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);
});


var startMain = function () {
    inquirer.prompt([{
        name: "main_menu",
        type: "list",
        message: "Eat-Out Program. Select an option",
        choices: ["Find place to eat", "Give me random Food", "Add new Restaurant"]
    }]).then(function (answer) {
        if (answer.main_menu === "Find place to eat") {
            return placeToEat();
        } else if (answer.main_menu === "Give me random Food") {
            randomFood();
        } else if (answer.main_menu === "Add new Restaurant") {
            addRestaurant();
        } 
    })
}

placeToEat = function () {
    inquirer.prompt([{
        name: "search_menu",
        type: "list",
        message: " Select how you want too search: ",
        choices: ["Search by name","Search by Nationality", "Search by cost", "Search by Rating", "Search by Location", "Search by category", "Try something new", "View All", "Go back to main menu"],
    }]).then(function (answer) {
        console.log(answer.search_menu);

        if (answer.search_menu === "Search by Nationality") {
            nationalitySearch();
        } else if (answer.search_menu === "Search by cost") {
            costSearch();
        } else if (answer.search_menu === "Search by Rating") {
            ratingSearch();
        } else if (answer.search_menu === "Search by Location") {
            locationSearch();
        } else if (answer.search_menu === "Search by category") {
            categorySearch();
        } else if (answer.search_menu === "Try something new") {
            somethingNew();
        } else if (answer.search_menu === "View All"){
            viewAll();
         }else if (answer.search_menu === "Search by name") {
            nameSearch();
        }  else if (answer.search_menu === "Go back to main menu") {
            startMain();
        }
    })
}
startMain();

var nationalitySearch = function () {
    inquirer.prompt([{
        name: "Nat_search",
        type: "list",
        message: "Select what you are craving",
        choices: ["American", "European", "asian", "Middle-Eastern", "South American", "African"],
    }]).then(function (answer) {
        console.log("_____________")
        console.log("  "+ answer.Nat_search);
        console.log("_____________")
        connection.query("SELECT * FROM places WHERE?", {
            nationality: answer.Nat_search
        }, function (err, res){
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].rest_name + " | " + res[i].nationality + " | " + res[i].category + " | " + res[i].location + " | " + "price: " + res[i].cost + " | " + res[i].rating + " stars" + " | " + "ate there before: " + res[i].visited);
            }
            backToStart();
        });
    });
};

var backToStart= function(){
    console.log("------------------");
    inquirer.prompt([{
        name:"backStart",
        type:"list",
        message:"would you like to return to start menu?",
        choices:["yes","no"],


    }]).then(function(answer){
        console.log("------------------");
        if(answer.backStart === "yes"){
            startMain();
        }
        else if(answer.backStart === "no"){
            backToStart();
        }
    })
}

var costSearch = function () {
    inquirer.prompt([{
        name: "cost_search",
        type: "list",
        message: "select a cost range:",
        choices: ["low", "medium", "high"],
    }]).then(function (answer) {
        console.log("------------------");
        connection.query("SELECT * FROM places WHERE?", {
            cost: answer.cost_search
        }, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].rest_name + " | " + res[i].nationality + " | " + res[i].category + " | " + res[i].location + " | " + "price: " + res[i].cost + " | " + res[i].rating + " stars" + " | " + "been there before: " + res[i].visited);
            }
            backToStart();
        })
    })
}

var ratingSearch = function () {
    inquirer.prompt([{
        name: "rating_search",
        type: "list",
        message: "Select a rating",
        choices: ["1", "2", "3", "4", "5"],
    }]).then(function (answer) {
        console.log("------------------");
        connection.query("SELECT * FROM places WHERE?", {
            rating: answer.rating_search
        }, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].rest_name + " | " + res[i].nationality + " | " + res[i].category + " | " + res[i].location + " | " + "price: " + res[i].cost + " | " + res[i].rating + " stars" + " | " + "ate there before: " + res[i].visited);
            }
            backToStart();
        })
    })
}

var locationSearch = function () {
    inquirer.prompt([{
        name: "location_search",
        type: "input",
        message: "Enter city would would like to search",
    }]).then(function (answer) {
        console.log("------------------");
        connection.query("SELECT * FROM places WHERE?", {
            location: answer.location_search
        }, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].rest_name + " | " + res[i].nationality + " | " + res[i].category + " | " + res[i].location + " | " + "price: " + res[i].cost + " | " + res[i].rating + " stars" + " | " + "ate there before: " + res[i].visited);
            }
            backToStart();
        })
    })
}

var nameSearch = function(){
    inquirer.prompt([{
        name:"name_search",
        type:"input",
        message:"Type in the name of the restaurant you are looking for"
         }]).then(function(answer){
            console.log("------------------");
             connection.query("SELECT * FROM places WHERE?", {rest_name: answer.name_search}, function(err,res){
                 for(var i =0;i<res.length;i++){
                      console.log(res[i].id + " | " + res[i].rest_name + " | " + res[i].nationality + " | " + res[i].category + " | " + res[i].location + " | " + "price: " + res[i].cost + " | " + res[i].rating + " stars" + " | " + "ate there before: " + res[i].visited);
                 }
                 backToStart();
             })
         })
}
var categorySearch = function () {
    inquirer.prompt([{
        name: "category_search",
        type: "list",
        message: "Select a category to search by",
        choices: ["casual dining", "fast-food", "cafe", "fine dining", "food truck"],
    }]).then(function (answer) {
        console.log("------------------");
        connection.query("SELECT * FROM places WHERE?", {
            category: answer.category_search
        }, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].rest_name + " | " + res[i].nationality + " | " + res[i].category + " | " + res[i].location + " | " + "price: " + res[i].cost + " | " + res[i].rating + " stars" + " | " + "ate there before: " + res[i].visited);
            }
            backToStart();
        })
    })
}

var somethingNew = function () {
    connection.query("SELECT * FROM places WHERE?", {
        visited: "no"
    }, function (err, res) {
        console.log("------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].rest_name + " | " + res[i].nationality + " | " + res[i].category + " | " + res[i].location + " | " + "price: " + res[i].cost + " | " + res[i].rating + " stars" + " | " + "ate there before: " + res[i].visited);
        }
        backToStart();
    })
}
var viewAll = function () {
    connection.query("SELECT * FROM places", {
       
    }, function (err, res) {
        console.log("------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].rest_name + " | " + res[i].nationality + " | " + res[i].category + " | " + res[i].location + " | " + "price: " + res[i].cost + " | " + res[i].rating + " stars" + " | " + "ate there before: " + res[i].visited);
        }
        backToStart();
    })
}

var addRestaurant = function(){
    inquirer.prompt([{
       name:"eaten_before",
        type:"list",
        message:"Did you eat at the restaurant yet?",
        choices:["yes","no"]        
    }]).then(function(answer){
        if(answer.eaten_before === "no"){
            neverAte();
        }
        else if(answer.eaten_before === "yes"){
            ateBefore();
        }
    }
    )}

    var randomFood= function(){
        var rand =[];
        connection.query("SELECT * FROM places WHERE?",{
            location: "charlotte"
        }, function(err,res){
            for(i=0;i<res.length;i++){
                rand.push(res[i]);
            }
            var randomLocation = rand[Math.floor(Math.random()*rand.length)];
            console.log(randomLocation);
            anotherRandom();
        })
        }
    var anotherRandom=function(){
        console.log("_____________");
        inquirer.prompt([{
            name:"another",
            type:"list",
            message:"would you like another random option?",
            choices:["yes", "no"]
        }]).then(function(answer){
            if(answer.another === "yes"){
                randomFood();
            }
            else if(answer.another === "no"){
                backToStart();
            }
        })
    }
    

var neverAte =function(){
    inquirer.prompt([{
        name:"add_name",
        type:"input",
        message:"Enter the name of the restaurant"
     },{
        name:"add_category",
        type: "list",
        message: "Select the Category of the restaurant",
        choices:["casual dining", "fast-food", "cafe","fine dining","food truck"]
    },{
        name:"add_nationality",
        type:"list",
        message:"Select the Nationality of the restaurant",
        choices:["American","European","Asian","Middle-Eastern","South American", "African"]
    },{
        name:"add_location",
        type:"input",
        message:"Enter the city the restaurant is located"
     }]).then(function(answer){
         
        connection.query("SELECT * FROM places",function(err,res){
            visited= "no";
            connection.query("INSERT INTO places SET?",{category: answer.add_category, rest_name:answer.add_name,location:answer.add_location,visited:visited,nationality:answer.add_nationality})
           console.log("added new restaurant..");
           
        }) }
     )}

    var ateBefore = function(){
        inquirer.prompt([{
         name:"add_name",
        type:"input",
        message:"Enter the name of the restaurant"
        
    },{
        name:"add_category",
        type: "list",
        message: "Select the Category of the restaurant",
        choices:["casual dining", "fast-food", "cafe","fine dining","food truck"]
    },{
        name:"add_nationality",
        type:"list",
        message:"Select the Nationality of the restaurant",
        choices:["American","European","Asian","Middle-Eastern","South American", "African"]
    },{
        name:"add_location",
        type:"input",
        message:"Enter the city the restaurant is located"
     },{
         name:"add_cost",
         type:"list",
         message:"Select how expensive the restaurant is",
         choices:["low","medium","high"]
     },{
         name:"add_rating",
         type:"list",
         message:"Select how you would rate the restaurant. 1 being the worse, 5 being the best",
         choices:["1","2","3","4","5"]
     },{
         name:"add_comment",
         type:"input",
         message:"add notes"
     }]).then(function(answer){
         visit="yes";
        connection.query("SELECT * FROM places",function(err,res){
            connection.query("INSERT INTO places SET?",{category: answer.add_category, rest_name:answer.add_name,location:answer.add_location,cost:answer.add_cost,rating:answer.add_rating,visited:visit,nationality:answer.add_nationality,comments:answer.add_comment})
     
         
        
    startMain();   
    }  )}
       
     )}

    
//after searching to restaurant by name and in general there needs to be an option for going back to the main menu, selecting place to then see comments
