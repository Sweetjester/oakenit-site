const puppeteer = require('puppeteer-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const targets = [
  ['https://www.cvlive.io/', 'cvlive'],
  ['https://phantomaxis-production.up.railway.app/', 'phantomaxis'],
];
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    defaultViewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
    args: ['--disable-gpu','--hide-scrollbars'] });
  for (const [url, name] of targets) {
    const p = await b.newPage();
    await p.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });
    await new Promise(r => setTimeout(r, 6000));
    await p.screenshot({ path: `${process.argv[2]}/${name}.png`, clip: {x:0,y:0,width:1280,height:800} });
    console.log('captured', name);
    await p.close();
  }
  await b.close();
})();
