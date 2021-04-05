'use strict';
const dedicatedbrand = require('./sources/dedicatedbrand');
const loombrand = require('./sources/loom');
const adresse = require('./sources/adresse');
const Readline = require('readline'); // for reading inputs
const fs = require('fs');

// const node = require('./node');

const db = require('./db');


let allProducts = [];
let NumberOfProducts = 0;

let urls =['https://www.dedicatedbrand.com'];


async function dedicated() {
  try {


    const pages = await dedicatedbrand.scrape('https://www.dedicatedbrand.com')
    console.log(pages);
    console.log(pages.length);
    for(var i=0;i<pages.length;i++){
      console.log(pages[i]);
      const products = await dedicatedbrand.scrape(pages[i]);
      //console.log(products);
      NumberOfProducts += products.length;
      ProductsList.push(products);
    }

    
    console.log(`This website stores ${NumberOfProducts} products`);
    let data = JSON.stringify(ProductsList);
    fs.writeFileSync('dedicated.json', data);
    console.log('done');
    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function loom() {
  try {


    const pages = await loombrand.scrape('https://www.loom.fr')
    console.log(pages);
    console.log(pages.length);
    for(var i=0;i<pages.length;i++){
      console.log(pages[i]);
      const products = await loombrand.scrape(pages[i]);
      console.log(products);
      NumberOfProducts += products.length;
      ProductsList.push(products);
    }

    
    console.log(`This website stores ${NumberOfProducts} products`);
    let data = JSON.stringify(ProductsList);
    fs.writeFileSync('loom.json', data);
    console.log('done');
    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function adress() {
  try {

    const products = await adresse.scrape('https://adresse.paris/630-toute-la-collection')

    console.log(products);

    console.log(`This website stores ${products.length} products`);

    let data = JSON.stringify(products);
    fs.writeFileSync('address.json', JSON.stringify(products));

    

  

    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



async function TestFunction(){
  try{
    // dedicated();
    // loom();
    adress();
  }
  catch(e){
    console.error(e);
    process.exit(1);
  }
}


const [,, eshop] = process.argv;




TestFunction()

