import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import * as cheerio from 'cheerio';
import axios from 'axios';
import { cors } from 'hono/cors';
import 'dotenv/config';

const app = new Hono();
app.use(cors());

async function scrapeMLAList(StateName: string) {
  try {
    const { data } = await axios.get(`https://prsindia.org/mlatrack?state=${StateName}`);
    const $ = cheerio.load(data);
    const mlaList: any = [];

    $('.row.view-content .views-row').each(function () {
      const name = $(this).find('h3').text().trim() || 'Unknown Name';
      const place = $(this).find('.views-field-field-net-revenue-railway').text().trim().toLowerCase() || 'Unknown Place';
      const state = $(this).find('.views-field-php').text().trim() || 'Unknown State';
      const age = $(this).find('.views-field-field-mla-age').text().trim() || 'Unknown Age';
      const party = $(this).find('.views-field-field-political-party').text().trim() || 'Unknown Party';
      mlaList.push({ name, place, age, state, party });
    });

    if (mlaList.length !== 0) {
      return mlaList;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getMlaDetails(MlaName: string) {
  try {
    const { data } = await axios.get(`https://prsindia.org/mlatrack/${MlaName}`);
    const $ = cheerio.load(data);
    const mlaDetails: any = [];

    $('.row.mp_profile_header_info').each(function () {
      const name = $(this).find('.mla-name .field-item').text().trim();
      const state = new URLSearchParams($(this).find('.mp_state a').eq(1).attr('href')?.split('?')[1]).get('state');
      const constituency = $(this).find('.mp_constituency .field-item').text().trim();
      const party = new URLSearchParams($(this).find('.mp_state a').eq(1).attr('href')?.split('?')[1]).get('party');
      const startOfTerm = $(this).find('.term_end .field  .field-item').eq(0).text().trim();
      const age = $(this).find('.age .field-item').text().trim();
      const gender = $(this).find('.gender a').text().trim();
      const education = $(this).find('.education a').text().trim();
      const imageurl = $(this).find('img').attr('src');
      const image = imageurl ? 'https://prsindia.org' + encodeURI(imageurl) : null;
      mlaDetails.push({ name, state, constituency, party, startOfTerm, age, gender, education, image });
    });

    return mlaDetails.length !== 0 ? mlaDetails : [];
  } catch (error) {
    console.log('Error fetching MLA details:', error);
    return [];
  }
}

app.get('/', (c) => {
  return c.text('Server Started!');
});

app.get('/mlalist/:statename', async (c) => {
  const { statename } = c.req.param();
  const data = await scrapeMLAList(statename);
  return c.json(data);
});

app.get('/mladetails/:mlaname', async (c) => {
  const { mlaname } = c.req.param();
  const data = await getMlaDetails(mlaname);
  return c.json(data);
});

const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
