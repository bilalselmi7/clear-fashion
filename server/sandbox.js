// 'use strict';
// const dedicatedbrand = require('./sources/dedicatedbrand');
// const loombrand = require('./sources/loom');
// const adresse = require('./sources/adresse');
// const Readline = require('readline'); // for reading inputs
// const fs = require('fs');

// // const node = require('./node');

// const db = require('./db');


// let allProducts = [];
// let NumberOfProducts = 0;

// let urls =['https://www.dedicatedbrand.com'];


// async function dedicated() {
//   try {


//     const pages = await dedicatedbrand.scrape('https://www.dedicatedbrand.com')
//     console.log(pages);
//     console.log(pages.length);
//     for(var i=0;i<pages.length;i++){
//       console.log(pages[i]);
//       const products = await dedicatedbrand.scrape(pages[i]);
//       //console.log(products);
//       NumberOfProducts += products.length;
//       ProductsList.push(products);
//     }

    
//     console.log(`This website stores ${NumberOfProducts} products`);
//     let data = JSON.stringify(ProductsList);
//     fs.writeFileSync('dedicated.json', data);
//     console.log('done');
//     process.exit(0);

//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// }


// async function loom() {
//   try {


//     const pages = await loombrand.scrape('https://www.loom.fr')
//     console.log(pages);
//     console.log(pages.length);
//     for(var i=0;i<pages.length;i++){
//       console.log(pages[i]);
//       const products = await loombrand.scrape(pages[i]);
//       console.log(products);
//       NumberOfProducts += products.length;
//       ProductsList.push(products);
//     }

    
//     console.log(`This website stores ${NumberOfProducts} products`);
//     let data = JSON.stringify(ProductsList);
//     fs.writeFileSync('loom.json', data);
//     console.log('done');
//     process.exit(0);

//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// }

// async function adress() {
//   try {

//     const products = await adresse.scrape('https://adresse.paris/630-toute-la-collection')

//     console.log(products);

//     console.log(`This website stores ${products.length} products`);

//     let data = JSON.stringify(products);
//     fs.writeFileSync('address.json', JSON.stringify(products));

    

  

//     console.log('done');
//     process.exit(0);
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// }



// async function TestFunction(){
//   try{
//     // dedicated();
//     // loom();
//     adress();
//   }
//   catch(e){
//     console.error(e);
//     process.exit(1);
//   }
// }


// const [,, eshop] = process.argv;




// TestFunction()

const fsLibrary  = require('fs') 
const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
const toJsonFile = require('./sources/toJsonFile');
const mudjeans = require('./sources/mudjeans');
// const adresseparis = require('./sources/adresseparis');
const eshops = ['https://www.dedicatedbrand.com/','https://www.loom.fr/','https://mudjeans.eu/','https://adresse.paris/'];
const {MongoClient} = require('mongodb');
//A MODIFIER
const MONGODB_URI = `mongodb+srv://bilal:webapp@cluster0.kfwer.mongodb.net/clearfashion?retryWrites=true&w=majority`;
const MONGODB_DB_NAME = 'clearfashion';


async function sandbox () {
  try {
    dedicated_products = await dedicated_scrapping(eshops[0]);
    loom_products = await loom_scrapping(eshops[1]);
    mudjeans_products = await mudjeans_scrapping(eshops[2]);
    //adresseparis_products = await adresseparis_scrapping(eshops[2])
    all_products = dedicated_products.concat(loom_products,mudjeans_products);

    

    //console.log(allproducts);

    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db = client.db(MONGODB_DB_NAME)
    const collection = db.collection('products');
    const result = await collection.insertMany(all_products);
    console.log(result);

    //await adresseparis_scrapping(eshops[2]);



    console.log('All scrapping done');
    process.exit(0);
  }
  catch(error){
    console.error(error)
  }
}

async function dedicated_scrapping(eshop) {
  try {

    let brand = 'DEDICATED';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    
    //Scrapping home page
    let dedicated_products = await dedicatedbrand.scrape(eshop);
    //toJsonFile.productToJsonFile(products, brand, false);
    console.log(dedicated_products);

    //Scrapping all menu links on home page
    //const links = await dedicatedbrand.scrape_links(eshop);

    //Scrapping on all the links
    // for(let i = 0; i < links.length; i++){
    //   actual_link = eshop + links[i];
    //   console.log(actual_link);
    //   products = await dedicatedbrand.scrape_products(actual_link);
    //     //toJsonFile.productToJsonFile(products, brand)   
    //   dedicated_products = dedicated_products.concat(products) 
    // }
    console.log('Dedicated srapping done');
    return dedicated_products
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function loom_scrapping(eshop) {
  try {

    let brand = 'LOOM';
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    
    //Scrapping home page
    let loom_products = await loom.scrape(eshop);
    //toJsonFile.productToJsonFile(products, brand, false);
    console.log(loom_products);

    //Scrapping all menu links on home page
    //const links = await dedicatedbrand.scrape_links(eshop);

    //Scrapping on all the links
    // for(let i = 0; i < links.length; i++){
    //   actual_link = eshop + links[i];
    //   console.log(actual_link);
    //   products = await dedicatedbrand.scrape_products(actual_link);
    //     //toJsonFile.productToJsonFile(products, brand)   
    //   dedicated_products = dedicated_products.concat(products) 
    // }
    console.log('Loom srapping done');
    return loom_products
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function mudjeans_scrapping(eshop){
  try  {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    //Scrapping home page
    let mudjeans_product = await mudjeans.scrape_products(eshop);
    //toJsonFile.productToJsonFile(products, brand,false);
    console.log(mudjeans_product);

    //Scrapping all menu links on home page
    let links_duplicated = await mudjeans.scrape_links(eshop);
    let links = [];

    //Removing duplicates links
    links_duplicated.forEach((link) => {
      if(!links.includes(link)){
        links.push(link);
      }
    })

    //Scrapping on all the links
    for(let i = 0; i < links.length; i++){
      actual_link = eshop + links[i];
      console.log(actual_link);
      products = await mudjeans.scrape_products(actual_link);
      // toJsonFile.productToJsonFile(products, brand);
      mudjeans_product = mudjeans_product.concat(products);
    }
    console.log('Mudjeans scrapping done');
    return mudjeans_product
        
  } catch (e) {
    console.error(e);
    process.exit(1);
  }  
}

async function adresseparis_scrapping(eshop){
  try  {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

      //Scrapping home page

      let products = await adresseparis.scrape_products(eshop);
      //toJsonFile.productToJsonFile(products, brand,false);
      console.log(products);
      
         //Scrapping all menu links on home page
      let links_duplicated = await adresseparis.scrape_links(eshop);
      let links = [];

      //Removing duplicates links
      links_duplicated.forEach((link) => {
        if(!links.includes(link)){
          links.push(link);
        }
      })

    //Scrapping on all the links
    for(let i = 0; i < links.length; i++){
      actual_link = links[i];
      console.log(actual_link);
      products = await adresseparis.scrape_products(actual_link);
     // toJsonFile.productToJsonFile(products, brand);
    }
      console.log('Adresse Paris scrapping done');    
    } catch (e) {
      console.error(e);
      process.exit(1);
    } 
}





const [,, eshop] = process.argv;


sandbox(eshop);