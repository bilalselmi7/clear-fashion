const axios = require('axios');
const cheerio = require('cheerio');

const ADRESSE_PARIS = 'https://adresse.paris/630-toute-la-collection'
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product_list.grid.row .product-container .right-block')
    .map((i, element) => {
      
      const brand = 'adresse';
      const name = $(element)
        .find('.product-name-container.versionmob .product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.price.product-price')
          .text()
      );

      return {brand,name, price};
    })
    .get();
};

module.exports.scrape = async url => {
    const response = await axios(url);
    const {data, status} = response;
  
    if (status >= 200 && status < 300) {
      return parse(data);
    }
  
    console.error(status);
  
    return null;
  };
  