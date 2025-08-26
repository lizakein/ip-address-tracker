import { apiKey } from "./api-key.js";
import { updateMap } from "./map.js";

const input = document.querySelector('.main__input');
const form = document.querySelector('.main__search');
const results = document.querySelector('.results');


function isValidIp(ip) {
  const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
  return ipRegex.test(ip);
}


function generateHTML(data) {
  results.innerHTML = '';

  const ipBlock = document.createElement('div');
  ipBlock.className = 'results__container';
  ipBlock.innerHTML = `
    <h2 class="results__heading" id="ip-address">IP Address</h2>
    <p class="results__info" aria-labelledby="ip-address">${data.ip}</p>
  `;
  results.append(ipBlock);

  const locationBlock = document.createElement('div');
  locationBlock.className = 'results__container';
  locationBlock.innerHTML = `
    <h2 class="results__heading" id="location">Location</h2>
    <p class="results__info" aria-labelledby="location">${data.location.region}, ${data.location.country} ${data.as.asn}</p>
  `;
  results.append(locationBlock);

  const timezoneBlock = document.createElement('div');
  timezoneBlock.className = 'results__container';
  timezoneBlock.innerHTML = `
    <h2 class="results__heading" id="timezone">Timezone</h2>
    <p class="results__info" aria-labelledby="timezone">UTC ${data.location.timezone}</p>
  `;
  results.append(timezoneBlock);

  const ispBlock = document.createElement('div');
  ispBlock.className = 'results__container';
  ispBlock.innerHTML = `
    <h2 class="results__heading" id="isp">ISP</h2>
    <p class="results__info" aria-labelledby="isp">${data.isp ? data.isp : '—'}</p>
  `;
  results.append(ispBlock);
}


async function getIpData(ip) {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
}


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const ip = input.value;

  if(!isValidIp(ip)) return;
  
  try {
    const data = await getIpData(ip);
    generateHTML(data);
    updateMap(data);
  } catch (error) {
    console.log('Unexpected error. Please, try later');
  }
});
