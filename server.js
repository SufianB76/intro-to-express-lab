const express = require('express'); // intializing express
const app = express(); // running express when 'app' is called

//######################## Number 1 #################################################



app.get('/greetings/:username', (req, res) => { // listens to requests of greetings and responds, username is a blank which will be filled in with a name
    const { username } = req.params; // seprates the name entered to store it in username
    res.send(`Hello there, ${username}!`); // res.send sends a output back to the user, then used a string literal to include the username
});

//###################### Number 2 ####################################################

app.get('/roll/:number', (req, res) => {
    const { number } = req.params;
    const parsedNumber = parseInt(number, 10); // converting number from string to an integer

    if (isNaN(parsedNumber)) { // checking to see whether 'parsedNumber' is a num or not
        res.send("You must specify a number.");
    } else {
        const randomRoll = Math.floor(Math.random() * (parsedNumber + 1)); // rolls a random number between 0 and the number inputted to 'number' (Math.Floor rounds the number to the nearest integer)
        res.send(`You rolled a ${randomRoll}.`);
    }
});

//########################## Number 3 ##################################################

const collectibles = [ // array of objects 
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {// checks whether the index is valid
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        const item = collectibles[index]; // looking for the exact item 
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});

//########################## Number 4 ##################################################

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => { 
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query; // gets filters requested

    let filteredShoes = shoes;

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice)); // only keeps shoes that are equal or higher than the min-price
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice)); // only keeps shoes that are the same price or lower than the max-price
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type); // oonly keeps shoes of the same type
    }

    res.json(filteredShoes); // outputs the list of shows according to the filters 
});

//######################## Connecting to Port 3000 ###################################
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

