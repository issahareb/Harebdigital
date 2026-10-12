import { chromium } from 'playwright'
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE})
try {
 const page=await browser.newPage({viewport:{width:1440,height:1120},reducedMotion:'reduce'})
 await page.goto(process.env.SEO_BASE_URL || 'http://localhost:3000',{waitUntil:'networkidle'})
 await page.locator('#social').evaluate(el=>window.scrollTo({top:el.offsetTop+35,behavior:'instant'}))
 await page.screenshot({path:'docs/preview-social-20261012.png'})
 console.log('Saved social section preview with its native poster and controls.')
}finally{await browser.close()}
