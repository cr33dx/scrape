const puppeteer = require('puppeteer');
const down = require('image-downloader')

let download = async (x,i,search)=>{
    x.map(async (val)=>{
        if(val!==null){
        let test = await down.image({
            url : val,
            dest : `./phones/${search}`+i +`-${parseInt(Math.random()*100)}`+'.png' //-----------------> chnage the folder we can make it dynamic in next update :D
        })
        //console.log(test)
        }
    })
}

(async()=>{
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewPort:{
            width : '1500',
            height: '900'
        }
    });
    let i = 1
    const page = await browser.newPage();
    let visitpage = async(search)=>{
        let x = await page.evaluate(()=>{
            let arr = []
            let x = document.getElementsByClassName('s-image')
            for (key in x){
                arr.push(x[key].src)
            }
            return arr
        })
        download(x,i,search)
        i++
    }
    let searchDomain = ['oneplus','samsung','iphone','razerphone','google pixel','nokia','wifi router']
    await page.goto('http://amazon.com');
    await page.waitFor(4000)
    for(loop = 0;loop < searchDomain.length;loop++){
        await page.evaluate(()=>{
            document.querySelector('#twotabsearchtextbox').value = ''
        })
        await page.type('#twotabsearchtextbox',searchDomain[loop])
        await page.click('.nav-input')
        await page.waitFor(5000)
        await visitpage(searchDomain[loop])
        for(y = 0;y < 4; y++){ //---------------------------------------------------------->times the page you wanna visit
            await page.waitFor(5000)
            await page.evaluate(()=>{
                document.querySelector('.a-last > a').click()
            })
            await page.waitFor(4000)
            await visitpage(searchDomain[loop])
            }
    }
    

})()