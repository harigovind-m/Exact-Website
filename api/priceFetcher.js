// api/priceFetcher.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'API is working' });
});

// Price endpoint
app.get('/api/price', async (req, res) => {
  const { productUrl } = req.query;

  console.log(`Fetching price from: ${productUrl}`);

  try {
    const { data } = await axios.get(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    const $ = cheerio.load(data);

    const priceText =
      $('.price-sale > span.money').first().text().trim() ||
      $('.product-price > span.money').text().trim() ||
      $('[itemprop="price"]').attr('content');

    if (!priceText) throw new Error('Price element not found in page');

    const priceValue = parseFloat(priceText.replace(/[^\d.]/g, ''));

    return res.json({
      price: priceValue,
      currency: 'QAR',
      success: true,
      rawPrice: priceText
    });

  } catch (error) {
    console.error('Axios failed with status:', error?.response?.status);

    // If axios fails due to 403, fallback to puppeteer
    if (error?.response?.status === 403) {
      console.log('Falling back to Puppeteer...');

      try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(productUrl, { waitUntil: 'networkidle2' });

        const priceText = await page.evaluate(() => {
          const el =
            document.querySelector('.price-sale > span.money') ||
            document.querySelector('.product-price > span.money') ||
            document.querySelector('[itemprop="price"]');
          return el?.textContent.trim() || null;
        });

        await browser.close();

        if (!priceText) throw new Error('Price not found with Puppeteer');

        const priceValue = parseFloat(priceText.replace(/[^\d.]/g, ''));

        return res.json({
          price: priceValue,
          currency: 'QAR',
          success: true,
          rawPrice: priceText,
          source: 'puppeteer'
        });

      } catch (puppeteerError) {
        console.error('Puppeteer fallback failed:', puppeteerError.message);
        return res.status(200).json({
          price: null,
          currency: 'QAR',
          success: false,
          error: 'Both Axios and Puppeteer failed',
          fallbackUrl: productUrl
        });
      }
    }

    // All other errors
    return res.status(200).json({
      price: null,
      currency: 'QAR',
      success: false,
      error: error.message,
      fallbackUrl: productUrl
    });
  }
});

// Server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
