import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import * as cheerio from 'cheerio';
import axios from 'axios';
import { cors } from 'hono/cors';
import 'dotenv/config';

const app = new Hono()
app.use(cors());

  async function scrapeMLAList(StateName: string) {
    try {
      const { data } = await axios.get(`https://prsindia.org/mlatrack?state=${StateName}`);
      const $ = cheerio.load(data);
      const mlaList: { name: string; 
        place: string;
         age: string; 
         state: string; 
         party: string; }[] = [];
         
      $('.row.view-content .views-row').each(function () {
        const name = $(this).find('h3').text().trim(); 
        const place = $(this).find('.views-field-field-net-revenue-railway').text().trim().toLowerCase();
        const state  = $(this).find('.views-field-php').text().trim(); 
        const age = $(this).find('.views-field-field-mla-age').text().trim();
        const party =$(this).find('.views-field-field-political-party').text().trim();
        mlaList.push({ name, place, age,state,party });
      });
  
      if(mlaList.length!=0){
        return mlaList;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


 async function getMlaDetails(MlaName: string){
  try{
    const { data } = await axios.get(`https://prsindia.org/mlatrack/${MlaName}`);
    const $ = cheerio.load(data);
    const mlaDetails: { 
      name: string; 
      state: string | null; 
      Constituency: string;
       Party: string | null; 
       StartOfTerm: string; 
       age: string; 
       gender: string; 
       education: string; 
       image: string; }[] = [];

    $('.row.mp_profile_header_info').each(function () {
      const name = $(this).find('.mla-name .field-item').text().trim();
      const state =new URLSearchParams($(this).find('.mp_state a').eq(1).attr('href')?.split('?')[1]).get('state');
      const Constituency  = $(this).find('.mp_constituency .field-item').text().trim();
      const Party = new URLSearchParams($(this).find('.mp_state a').eq(1).attr('href')?.split('?')[1]).get('party');
      const StartOfTerm = $(this).find('.term_end .field  .field-item').eq(0).text().trim();
      const age = $(this).find('.age .field-item').text().trim();
      const gender = $(this).find('.gender a').text().trim();
      const education = $(this).find('.education a').text().trim();
      const imageurl = $(this).find('img').attr('src');
      const image = imageurl ? 'https://prsindia.org'+ encodeURI(imageurl) : null;
      mlaDetails.push({ name,state,Constituency,Party,StartOfTerm,age,gender,education,image});
    }
    )
    if(mlaDetails.length!=0)
       return mlaDetails;

    return [];
  }
  catch(e){
    console.log(e);  
  }
 }
 

app.get('/mlalist/:statename', async(c) => {
  const {statename} = c.req.param();
  const data  = await scrapeMLAList(statename);
  return c.json(data);
})

app.get('/mladetails/:mlaname',async(c)=>{
  const mlaname = c.req.param('mlaname');
  const data = await getMlaDetails(mlaname);
  return c.json(data);
})




const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
