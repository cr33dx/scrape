const puppeteer = require('puppeteer');
const down = require('image-downloader')

let download = async (x,search)=>{
    x.map(async (val)=>{
        if(val!==null){
        let test = await down.image({
            url : val,
            dest : `./pics/${search}` +`-${parseInt(Math.random()*100)}`+'.png' //-----------------> chnage the folder we can make it dynamic in next update :D
        })
        console.log(test)
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
    const page = await browser.newPage();


    let visitpage = async(search)=>{
        console.log('hhhhellooo')
        let x = await page.evaluate(()=>{
            let arr = []
            let x = document.getElementsByClassName('z_e_h')
            for (key in x){
                    arr.push(x[key].src)
            }
            return arr
        })
        x = x.slice(0,14)
        console.log(x)
        download(x,search)
    }
    let searchDomain = [
        'samsung galaxy watch?category=Beauty%2FFashion',
        'samsung galaxy s10',
        'samsung galaxy s9 plus',
        'samsung galaxy a50',
        'samsung ear pod',
        'samsung tablet',
        'samsung portable ssd'


    ] //----->define search domain
 
     for (i =0;i<searchDomain.length;i++){
        await page.goto('https://www.shutterstock.com/search/'+searchDomain[i]);
        await page.waitFor(4000)
        await visitpage(searchDomain[i])
     }
    
})()