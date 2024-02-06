const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fetch = require('node-fetch')
const path = require('path')
const util = require('util')

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"))
app.set("views", path.join(__dirname, ""))
app.get('/', async (req, res) => {
    res.render('index')
})

app.get('/flag', async (req, res) => {
    let object = new Object()
    const Headers = fetch.Headers
        let headers = new Headers();
        headers.set('Authorization', process.env.token)
        let fetched = await fetch(`https://${req.get('host')}/countries.json`, {
            method:'GET',
            headers: headers
        })
         fetched = await fetched.json()
         
    object.country = fetched.Data.name.common
    let order = Math.floor(Math.random() * 4)
    if (order == 0) order = 1
    if (order == 1) {
        object.flag1 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        fetched = await fetch(`https://${req.get('host')}/countries.json`, {
            method:'GET',
            headers: headers
        })
        fetched = await fetched.json()
        object.flag2 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        fetched = await fetch(`https://${req.get('host')}/countries.json`, {
            method:'GET',
            headers: headers
        })
        fetched = await fetched.json()
        object.flag3 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        object.op1 = `./correct/?ans=${object.country}&flag=${object.flag1}`
        object.op2 = `./incorrect/?ans=${object.country}&flag=${object.flag1}`
        object.op3 = `./incorrect/?ans=${object.country}&flag=${object.flag1}`
    }
    if (order == 2) {
        object.flag2 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        fetched = await fetch(`https://${req.get('host')}/countries.json`, {
            method:'GET',
            headers: headers
        })
        fetched = await fetched.json()
        object.flag1 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        fetched = await fetch(`https://${req.get('host')}/countries.json`, {
            method:'GET',
            headers: headers
        })
        fetched = await fetched.json()
        object.flag3 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        object.op1 = `./incorrect/?ans=${object.country}&flag=${object.flag2}`
        object.op2 = `./correct/?ans=${object.country}&flag=${object.flag2}`
        object.op3 = `./incorrect/?ans=${object.country}&flag=${object.flag2}`
    }
    if (order == 3) {
        object.flag3 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        fetched = await fetch(`https://${req.get('host')}/countries.json`, {
            method:'GET',
            headers: headers
        })
        fetched = await fetched.json()
        object.flag1 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        fetched = await fetch(`https://${req.get('host')}/countries.json`, {
            method:'GET',
            headers: headers
        })
        fetched = await fetched.json()
        object.flag2 = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${fetched.Data.altSpellings[0]}.svg`
        object.op1 = `./incorrect/?ans=${object.country}&flag=${object.flag3}`
        object.op2 = `./incorrect/?ans=${object.country}&flag=${object.flag3}`
        object.op3 = `./correct/?ans=${object.country}&flag=${object.flag3}`
    }
    console.log(order, object)
   res.render('flag', object)
})

app.get('/correct', async (req, res) => {
    let object = {
        country: req.query.ans,
        flag: req.query.flag
    }
    res.render('flag_correct', object)
})

app.get('/incorrect', async (req, res) => {
    let object = {
        country: req.query.ans,
        flag: req.query.flag
    }
    res.render('flag_incorrect', object)
})

app.get('/logo', async (req, res) => {
    let object = new Object()
    let fetched
     fetched = await fetch(`https://${req.headers.host}/brands`)
     fetched = await fetched.json()
    object.brand = fetched.brand
    object.clue = fetched.clue.split("|").join('\n')
    console.log(object)
    object.hint = fetched.hint
    object.wiki = fetched.wiki_url
    let order = Math.floor(Math.random() * 4)
    if (order == 0) order = 1
    if (order == 1) {
        object.img1 = fetched.answer
        fetched = await fetch(`https://${req.headers.host}/brands`, {
           method:'GET'
       })
       fetched = await fetched.json()
       object.img2 = fetched.answer
       fetched = await fetch(`https://${req.headers.host}/brands`, {
          method:'GET'
      })
      fetched = await fetched.json()
      object.img3 = fetched.answer
      object.op1 = `./LogoCorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img1}`
      object.op2 = `./LogoIncorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img1}`
      object.op3 = `./LogoIncorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img1}`
      res.render('logo', object)
    }
    if (order == 2) {
        object.img2 = fetched.answer
        fetched = await fetch(`https://${req.headers.host}/brands`, {
           method:'GET'
       })
       fetched = await fetched.json()
       object.img1 = fetched.answer
       fetched = await fetch(`https://${req.headers.host}/brands`, {
          method:'GET'
      })
      fetched = await fetched.json()
      object.img3 = fetched.answer
      object.op1 = `./LogoIncorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img2}`
      object.op2 = `./LogoCorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img2}`
      object.op3 = `./LogoIncorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img2}`
      res.render('logo', object)
    }
    if (order == 3) {
        object.img3 = fetched.answer
        fetched = await fetch(`https://${req.headers.host}/brands`, {
           method:'GET'
       })
       fetched = await fetched.json()
       object.img2 = fetched.answer
       fetched = await fetch(`https://${req.headers.host}/brands`, {
          method:'GET'
      })
      fetched = await fetched.json()
      object.img1 = fetched.answer
      object.op1 = `./LogoIncorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img3}`
      object.op2 = `./LogoInorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img3}`
      object.op3 = `./LogoCorrect/?ans=${object.brand}&wiki=${object.wiki}&img=${object.img3}`
      res.render('logo', object)
    }
})

app.get('/logoCorrect', async (req, res) => {
    let object = {
        logo: req.query.ans,
        wiki: req.query.wiki,
        img: req.query.img
    }
    res.render('logo_correct', object)
})

app.get('/logoIncorrect', async (req, res) => {
    let object = {
        logo: req.query.ans,
        wiki: req.query.wiki,
        img: req.query.img
    }
    res.render('logo_incorrect', object)
})

app.get('/color', async (req, res) => {
  console.time("Ok")
  const fs = require('fs');
  const path = require('path');
  
  // Load the ntc.js file
  const ntcPath = path.join(__dirname, 'ntc.js');
  const ntcCode = fs.readFileSync(ntcPath, 'utf-8');
  eval(ntcCode);
    let object = new Object()
    let fetched = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    object.ans = ntc.name(fetched)[1]
   
    console.timeEnd("Ok")
    let order = Math.floor(Math.random() * 4)
    if (order == 0) order = 1
    
    if (order == 1) {
        object.cl1 = fetched
        fetched = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

    object.cl2 = fetched
    fetched = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
   
    object.cl3 = fetched
    object.op1 = `./colorcorrect/?ans=${object.ans}&cl=${object.cl1}`
    object.op2 = `./colorincorrect/?ans=${object.ans}&cl=${object.cl1}`
    object.op3 = `./colorincorrect/?ans=${object.ans}&cl=${object.cl1}`
    }
    if (order == 2) {
        object.cl2 = fetched
        fetched = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
    
    object.cl1 = fetched
    fetched = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
 
    object.cl3 = fetched
    object.op1 = `./colorincorrect/?ans=${object.ans}&cl=${object.cl2}`
    object.op2 = `./colorcorrect/?ans=${object.ans}&cl=${object.cl2}`
    object.op3 = `./colorincorrect/?ans=${object.ans}&cl=${object.cl2}`
    }
    if (order == 3) {
        object.cl3 = fetched
        fetched = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
   
    object.cl1 = fetched
    fetched = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
 
    object.cl2 = fetched.colors[0]
    object.op1 = `./colorincorrect/?ans=${object.ans}&cl=${object.cl3}`
    object.op2 = `./colorincorrect/?ans=${object.ans}&cl=${object.cl3}`
    object.op3 = `./colorcorrect/?ans=${object.ans}&cl=${object.cl3}`
    }
   
    res.render('color', object)
})

app.get('/colorcorrect', async (req, res) => {
    res.render('color_correct', req.query)
})

app.get('/colorincorrect', async (req, res) => {
    res.render('color_incorrect', req.query)
})

app.get('/brands', async (req, res) => {
  let brands = [{
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_ask_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_ask_a.png',
    brand: 'Ask',
    wiki_url: 'https://en.wikipedia.org/wiki/Ask',
    hint: 'As_',
    clue: 'A question answering-focused web search engine.|Founded in 1995 by Garrett Gruener and David Warthen in Berkeley, California.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_badoo_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_badoo_a.png',
    brand: 'Badoo',
    wiki_url: 'https://en.wikipedia.org/wiki/Badoo',
    hint: 'BA__O',
    clue: 'A dating-focused social network, founded in 2006.|Headquarters in Soho, London.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_buzzfeed_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_buzzfeed_a.png',
    brand: 'Buzzfeed',
    wiki_url: 'https://en.wikipedia.org/wiki/Buzzfeed',
    hint: 'B__zF__d',
    clue: 'An American internet news media company.|Provides the most shareable breaking news, original reporting, entertainment and video.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_cnet_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_cnet_a.png',
    brand: 'Cnet',
    wiki_url: 'https://en.wikipedia.org/wiki/Cnet',
    hint: 'C__T',
    clue: 'An American media website that publishes reviews, news, articles, blogs, podcasts and videos on technology.|Founded in 1994 by Halsey Minor and Shelby Bonnie.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_gmail_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_gmail.png',
    brand: 'Gmail',
    wiki_url: 'https://en.wikipedia.org/wiki/Gmail',
    hint: '_m__l',
    clue: 'A free, advertising-supported email service provided by Google.|Started as an invitation-only beta and it became available to the general public in 2007.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_google_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_google_b.png',
    brand: 'Google',
    wiki_url: 'https://en.wikipedia.org/wiki/Google',
    hint: '_o_gle',
    clue: 'An American multinational technology company specializing in Internet-related services and products.|Founded by Larry Page and Sergey Brin.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_periscope_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_periscope.png',
    brand: 'Periscope',
    wiki_url: 'https://en.wikipedia.org/wiki/Periscope',
    hint: 'P_ri_co_e',
    clue: 'A live video streaming app for iOS and Android.|Developed by Kayvon Beykpour and Joe Bernstein and acquired by Twitter before launch in 2015.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_shazam_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_shazam_a.png',
    brand: 'Shazam',
    wiki_url: 'https://en.wikipedia.org/wiki/Shazam',
    hint: 'S__zam',
    clue: 'An American app for smartphones, PCs and Macs, which is best known for its music identification capabilities.|Was founded in 1999.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_soundcloud_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_soundcloud_a.png',
    brand: 'Soundcloud',
    wiki_url: 'https://en.wikipedia.org/wiki/Soundcloud',
    hint: 'S_u__Clo_d',
    clue: 'A Swedish online audio distribution platform.|Enables its users to upload, record, promote, and share their originally-created sounds.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_tinder_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_tinder_a.png',
    brand: 'Tinder',
    wiki_url: 'https://en.wikipedia.org/wiki/Tinder',
    hint: 'T_nd_r',
    clue: 'The dating app allows users to chat with their matches.|Facilitates communication between mutually interested users.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_uber_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_uber_a.png',
    brand: 'Uber',
    wiki_url: 'https://en.wikipedia.org/wiki/Uber',
    hint: 'U_e_',
    clue: 'An American international transportation network company.|A mobile app that allows consumers with smartphones to submit a trip request.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_a_uber_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_a_uber.png',
    brand: 'Uber',
    wiki_url: 'https://en.wikipedia.org/wiki/Uber',
    hint: 'U_e_',
    clue: 'An American international transportation network company.|A mobile app that allows consumers with smartphones to submit a trip request.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_b_bitmoji_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_b_bitmoji.png',
    brand: 'Bitmoji',
    wiki_url: 'https://en.wikipedia.org/wiki/Bitmoji',
    hint: '_itmo__',
    clue: 'In July 2016, Snapchat confirmed that it had acquired the company and integrated it into Snapchat.|Was designed to allow users to create comic strips using personalized avatars.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_b_dailymotion_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_b_dailymotion_a.png',
    brand: 'Dailymotion',
    wiki_url: 'https://en.wikipedia.org/wiki/Dailymotion',
    hint: 'Da_l_m__i_n',
    clue: 'A video-sharing website.|It is one of the biggest video platforms in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_b_google_drive_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_b_google_drive.png',
    brand: 'Google Drive',
    wiki_url: 'https://en.wikipedia.org/wiki/Google Drive',
    hint: 'go_gle d____',
    clue: 'A file storage and synchronization service created by Google.|Was launched on April 24, 2012.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_b_kik_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_b_kik_a.png',
    brand: 'Kik',
    wiki_url: 'https://en.wikipedia.org/wiki/Kik',
    hint: '_ik',
    clue: 'An instant messaging application for mobile devices.|The app is available on iOS, Android, and Windows Phone.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_b_viber_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_b_viber.png',
    brand: 'Viber',
    wiki_url: 'https://en.wikipedia.org/wiki/Viber',
    hint: 'V_b__',
    clue: 'An instant messaging and Voice over IP (VoIP) app for smartphones.|It was founded by four partners: Talmon Marco, Igor Magazinnik, Sani Maroli and Ofer Smocha.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_b_waze_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_b_waze_b.png',
    brand: 'Waze',
    wiki_url: 'https://en.wikipedia.org/wiki/Waze',
    hint: '_az_',
    clue: 'A GPS-based geographical navigation application program forsmartphones with GPS support.|Was founded by Ehud Shabtai.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/int_b_zedge_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/int_b_zedge_b.png',
    brand: 'Zedge',
    wiki_url: 'https://en.wikipedia.org/wiki/Zedge',
    hint: 'ze___',
    clue: 'App includes wallpapers, ringtones, alert tones, and games on the Android, iOS and Windows Phone.|Was founded by Tom Arnøy, Kenneth Sundnes, and Paul Shaw in Norway in 2003.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_adidas_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_adidas.png',
    brand: 'Adidas',
    wiki_url: 'https://en.wikipedia.org/wiki/Adidas',
    hint: 'Adi_a_',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_allianz_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_allianz.png',
    brand: 'Allianz',
    wiki_url: 'https://en.wikipedia.org/wiki/Allianz',
    hint: 'Al_i_n_',
    clue: 'German multinational financial services company headquartered in Munich.|Its core businesses are insurance and asset management.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_amazon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_amazon.png',
    brand: 'Amazon',
    wiki_url: 'https://en.wikipedia.org/wiki/Amazon',
    hint: '_m_zon',
    clue: 'An American electronic commerce company with headquarters in Seattle, Washington.|The largest Internet-based retailer in the United States.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_audi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_audi.png',
    brand: 'Audi',
    wiki_url: 'https://en.wikipedia.org/wiki/Audi',
    hint: '_ud_',
    clue: 'It is a German automobile manufacturer.|Designs, engineers, produces, markets and distributes luxury automobiles.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_barbie_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_barbie.png',
    brand: 'Barbie',
    wiki_url: 'https://en.wikipedia.org/wiki/Barbie',
    hint: '_arb_e',
    clue: 'It is a fashion doll manufactured by the American toy-company Mattel, Inc.|Has been an important part of the toy fashion doll market for over fifty years.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_burger_king_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_burger_king.png',
    brand: 'Burger King',
    wiki_url: 'https://en.wikipedia.org/wiki/Burger King',
    hint: 'B_r_er Ki__',
    clue: 'A global chain of hamburger fast food restaurants headquartered in Florida, US.|The company began in 1953 as Insta-Burger King.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_dell_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_dell.png',
    brand: 'Dell',
    wiki_url: 'https://en.wikipedia.org/wiki/Dell',
    hint: '__ll',
    clue: 'An American privately owned multinational computer technology company.|Develops, sells, repairs and supports computers and related products and services.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_dropbox_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_dropbox.png',
    brand: 'Dropbox',
    wiki_url: 'https://en.wikipedia.org/wiki/Dropbox',
    hint: 'drop___',
    clue: 'A file hosting service.|Offers cloud storage, file synchronization, personal cloud, and client software.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_ebay_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_ebay.png',
    brand: 'Ebay',
    wiki_url: 'https://en.wikipedia.org/wiki/Ebay',
    hint: '_B_y',
    clue: 'An American multinational corporation and e-commerce company.|Founded by Pierre Omidyar in 1995, and became a notable success story of the dot-com bubble.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_fila_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_fila.png',
    brand: 'Fila',
    wiki_url: 'https://en.wikipedia.org/wiki/Fila',
    hint: '_i_a',
    clue: "Founded in 1911 in Italy.|One of the world's largest sportswear manufacturing companies.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_honda_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_honda.png',
    brand: 'Honda',
    wiki_url: 'https://en.wikipedia.org/wiki/Honda',
    hint: '_on__',
    clue: 'A Japanese public multinational corporation.|Primarily known as a manufacturer of automobiles, motorcycles and power equipment.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_intel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_intel.png',
    brand: 'Intel',
    wiki_url: 'https://en.wikipedia.org/wiki/Intel',
    hint: '__t_l',
    clue: "An American multinational technology company headquartered in California.|It is one of the world's largest and highest valued semiconductor chip makers.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_lacoste_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_lacoste.png',
    brand: 'Lacoste',
    wiki_url: 'https://en.wikipedia.org/wiki/Lacoste',
    hint: 'L__ost_',
    clue: 'A French clothing company founded in 1933.|Sells high-end clothing, footwear, perfume, leather goods, watches, eyewear, and most famously polo shirts.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_louis_vuitton_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_louis_vuitton.png',
    brand: 'Louis Vuitton',
    wiki_url: 'https://en.wikipedia.org/wiki/Louis Vuitton',
    hint: 'Lo_i_ __itt__',
    clue: "A French fashion house founded in 1854.|It is one of the world's leading international fashion houses. The label's LV monogram appears on most of its products.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_lufthansa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_lufthansa.png',
    brand: 'Lufthansa',
    wiki_url: 'https://en.wikipedia.org/wiki/Lufthansa',
    hint: 'Lu_tha_s_',
    clue: 'A German airline.|The largest airline in Europe.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_mercedes_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_mercedes.png',
    brand: 'Mercedes',
    wiki_url: 'https://en.wikipedia.org/wiki/Mercedes',
    hint: 'M___ede_',
    clue: 'A German automobile manufacturer, a multinational division of Daimler AG.|Brand is used for luxury automobiles, buses, coaches, and trucks.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_ray_ban_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_ray_ban.png',
    brand: 'Ray Ban',
    wiki_url: 'https://en.wikipedia.org/wiki/Ray Ban',
    hint: 'Ra_ _an',
    clue: 'A brand of sunglasses and eyeglasses founded in 1937 by American company Bausch & Lomb.|Italian brand best known for their Wayfarer and Aviator styles of sunglasses.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_redbull_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_redbull.png',
    brand: 'Redbull',
    wiki_url: 'https://en.wikipedia.org/wiki/Redbull',
    hint: 'Redb___',
    clue: 'It is the highest selling energy drink in the world.|An energy drink sold by Austrian company Red Bull GmbH, created in 1987.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_rolex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_rolex.png',
    brand: 'Rolex',
    wiki_url: 'https://en.wikipedia.org/wiki/Rolex',
    hint: 'R___x',
    clue: 'Founded by Alfred Davis and Hans Wilsdorf in London, England in 1905.|The largest single luxury watch brand, producing about 2,000 watches per day.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_timberland_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_timberland.png',
    brand: 'Timberland',
    wiki_url: 'https://en.wikipedia.org/wiki/Timberland',
    hint: '_imb_rla__',
    clue: 'An American manufacturer and retailer of outdoors wear with a focus on footwear.|Apparel such as clothes, watches, glasses, sunglasses and leather goods.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_vans_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_vans.png',
    brand: 'Vans',
    wiki_url: 'https://en.wikipedia.org/wiki/Vans',
    hint: 'V__s',
    clue: 'An American manufacturer of shoes, based in Cypress, California.|Founded in 1966.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_visa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_visa.png',
    brand: 'Visa',
    wiki_url: 'https://en.wikipedia.org/wiki/Visa',
    hint: 'V__a',
    clue: 'An American multinational financial services corporation.|It facilitates electronic funds transfers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_wikipedia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_wikipedia.png',
    brand: 'Wikipedia',
    wiki_url: 'https://en.wikipedia.org/wiki/Wikipedia',
    hint: 'W_kipe_i_',
    clue: 'A free-access, free-content Internet encyclopedia, supported and hosted by the non-profit Wikimedia Foundation.|Those who can access the site can edit most of its articles.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_a_yamaha_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_a_yamaha.png',
    brand: 'Yamaha',
    wiki_url: 'https://en.wikipedia.org/wiki/Yamaha',
    hint: 'Y_mah_',
    clue: 'A Japanese multinational corporation and conglomerate based in Japan.|Products and services, predominantly musical instruments, motorcycles, electronics.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_adobe_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_adobe.png',
    brand: 'Adobe',
    wiki_url: 'https://en.wikipedia.org/wiki/Adobe',
    hint: '_do__',
    clue: 'An American multinational computer software company.|Best known for Photoshop, the Portable Document Format, and Adobe Creative Suite.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_best_buy_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_best_buy.png',
    brand: 'Best Buy',
    wiki_url: 'https://en.wikipedia.org/wiki/Best Buy',
    hint: '__st Bu_',
    clue: 'An American multinational consumer electronics corporation headquartered in Richfield, Minnesota.|Operates in the United States, Mexico, Canada and China.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_bmw_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_bmw.png',
    brand: 'Bmw',
    wiki_url: 'https://en.wikipedia.org/wiki/Bmw',
    hint: '_MW',
    clue: 'A German automobile, motorcycle and engine manufacturing company founded in 1916.|Headquartered in Munich, Bavaria, Germany.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_converse_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_converse.png',
    brand: 'Converse',
    wiki_url: 'https://en.wikipedia.org/wiki/Converse',
    hint: 'C____rse',
    clue: 'An American shoe company.|A production output that primarily consists of sports wear, and lifestyle brand footwear.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_corona_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_corona.png',
    brand: 'Corona',
    wiki_url: 'https://en.wikipedia.org/wiki/Corona',
    hint: '_or_na',
    clue: 'It is a pale lager produced by Cervecería Modelo in Mexico.|In the United States, it is the top selling imported beer.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_dunlop_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_dunlop.png',
    brand: 'Dunlop',
    wiki_url: 'https://en.wikipedia.org/wiki/Dunlop',
    hint: '_unlo_',
    clue: 'Founded in 1889 in conjunction with Harvey du Cros by John Boyd Dunlop.|Was a British multinational involved in the manufacture of various rubber goods.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_heineken_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_heineken.png',
    brand: 'Heineken',
    wiki_url: 'https://en.wikipedia.org/wiki/Heineken',
    hint: 'He_n___n',
    clue: 'It is a pale lager beer with 5% alcohol by volume produced by a Dutch brewing company.|It is well known for its signature green bottle and red star.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_ibm_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_ibm.png',
    brand: 'Ibm',
    wiki_url: 'https://en.wikipedia.org/wiki/Ibm',
    hint: 'IB_',
    clue: 'An American multinational technology and consulting corporation.|Manufactures computer hardware and software, and offers infrastructure, hosting and more.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_icq_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_icq.png',
    brand: 'Icq',
    wiki_url: 'https://en.wikipedia.org/wiki/Icq',
    hint: 'I_Q',
    clue: 'An instant messaging computer program.|It was first developed and popularized by the Israeli company Mirabilis in 1996.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_kfc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_kfc.png',
    brand: 'Kfc',
    wiki_url: 'https://en.wikipedia.org/wiki/Kfc',
    hint: '_FC',
    clue: "It is a fast food restaurant chain that specializes in fried chicken.|Headquartered in Louisville, Kentucky. It is the world's second largest restaurant chain.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_kodak_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_kodak.png',
    brand: 'Kodak',
    wiki_url: 'https://en.wikipedia.org/wiki/Kodak',
    hint: '_o__k',
    clue: 'An American technology company.|Concentrates on imaging products, with its historic basis on photography.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_michelin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_michelin.png',
    brand: 'Michelin',
    wiki_url: 'https://en.wikipedia.org/wiki/Michelin',
    hint: '_iche___',
    clue: 'A tire manufacturer based in Clermont-Ferrand in the Auvergne région of France.|It is one of the three largest tire manufacturers in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_mtv_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_mtv.png',
    brand: 'Mtv',
    wiki_url: 'https://en.wikipedia.org/wiki/Mtv',
    hint: 'MT_',
    clue: 'American basic cable and satellite tv channel.|Original purpose of the channel was to play music videos guided by tv personalities known as "video jockeys".',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_national_geographic_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_national_geographic.png',
    brand: 'National Geographic',
    wiki_url: 'https://en.wikipedia.org/wiki/National Geographic',
    hint: '____o__l Ge______ic',
    clue: 'American digital cable and satellite television channel.|Channel features documentaries with factual content involvingnature, science, culture, and history.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_omega_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_omega.png',
    brand: 'Omega',
    wiki_url: 'https://en.wikipedia.org/wiki/Omega',
    hint: 'O___a',
    clue: 'A Swiss luxury watchmaker.|James Bond has worn it in films since 1995. Other famous wearers: John F. Kennedy, Prince William, and Buzz Aldrin.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_pepsi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_pepsi.png',
    brand: 'Pepsi',
    wiki_url: 'https://en.wikipedia.org/wiki/Pepsi',
    hint: '__ps_',
    clue: "A carbonated soft drink.|Created and developed in 1893 and introduced as Brad's Drink.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_peugeot_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_peugeot.png',
    brand: 'Peugeot',
    wiki_url: 'https://en.wikipedia.org/wiki/Peugeot',
    hint: '__uge_t',
    clue: 'A French cars brand, part of PSA Peugeot Citroën.|Company was founded in 1810. It manufactured coffee mills and bicycles.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_philips_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_philips.png',
    brand: 'Philips',
    wiki_url: 'https://en.wikipedia.org/wiki/Philips',
    hint: '__i_ips',
    clue: 'A Dutch diversified technology company.|One of the largest electronics companies in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_reebok_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_reebok.png',
    brand: 'Reebok',
    wiki_url: 'https://en.wikipedia.org/wiki/Reebok',
    hint: '_ee_ok',
    clue: 'An athletic footwear and apparel company.|Produces and distributes fitness and sports items including shoes, workout clothing, and training equipment.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_skoda_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_skoda.png',
    brand: 'Skoda',
    wiki_url: 'https://en.wikipedia.org/wiki/Skoda',
    hint: '__o_a',
    clue: 'A Czech automobile manufacturer founded in 1895.|The company became a wholly owned subsidiary of the Volkswagen Group in 2000.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_speedo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_speedo.png',
    brand: 'Speedo',
    wiki_url: 'https://en.wikipedia.org/wiki/Speedo',
    hint: 'S_e_do',
    clue: 'A manufacturer and distributor of swimwear and swim-related accessories.|In accordance with its Australian roots, it uses a boomerang as their symbol.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_swatch_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_swatch.png',
    brand: 'Swatch',
    wiki_url: 'https://en.wikipedia.org/wiki/Swatch',
    hint: '_wat_h',
    clue: 'Designerو manufacturer, distributer and services wristwatches.|Founded by Nicolas Hayek whose group launched the brand in 1983.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_tui_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_tui.png',
    brand: 'Tui',
    wiki_url: 'https://en.wikipedia.org/wiki/Tui',
    hint: 'T_I',
    clue: 'A multinational travel and tourism company.|The largest leisure, travel and tourism company in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_versace_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_versace.png',
    brand: 'Versace',
    wiki_url: 'https://en.wikipedia.org/wiki/Versace',
    hint: 'V__sac_',
    clue: "An Italian fashion company.|The first boutique was opened in Milan's Via della Spiga in 1978.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_whirlpool_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_whirlpool.png',
    brand: 'Whirlpool',
    wiki_url: 'https://en.wikipedia.org/wiki/Whirlpool',
    hint: 'W_i_lpoo_',
    clue: 'Is an American multinational manufacturer and marketer of home appliances.|Headquartered in Benton Charter Township, Michigan, United States.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_b_yahoo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_b_yahoo.png',
    brand: 'Yahoo',
    wiki_url: 'https://en.wikipedia.org/wiki/Yahoo',
    hint: '_ah__',
    clue: 'An American multinational technology company.|It is globally known for its Web portal, and search engine.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_alitalia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_alitalia.png',
    brand: 'Alitalia',
    wiki_url: 'https://en.wikipedia.org/wiki/Alitalia',
    hint: 'Al_t_lia',
    clue: 'It is the flag carrier and national airline of Italy.|Founded in 1999.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_axa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_axa.png',
    brand: 'Axa',
    wiki_url: 'https://en.wikipedia.org/wiki/Axa',
    hint: 'AX_',
    clue: 'French, multinational, investment banking firm.|Operates primarily in Western Europe, North America, the Asia Pacific region, and the Middle East.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_bridgestone_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_bridgestone.png',
    brand: 'Bridgestone',
    wiki_url: 'https://en.wikipedia.org/wiki/Bridgestone',
    hint: 'Br____st_ne',
    clue: 'A multinational auto and truck parts manufacturer.|Founded in 1931 by Shojiro Ishibashi.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_cartoon_network_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_cartoon_network.png',
    brand: 'Cartoon Network',
    wiki_url: 'https://en.wikipedia.org/wiki/Cartoon Network',
    hint: 'C____o_ N_t__rk',
    clue: 'American basic cable and satellite tv channel that is owned by the Turner Broadcasting System.|Air animated programming, ranging from action to animated comedy.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_chanel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_chanel.png',
    brand: 'Chanel',
    wiki_url: 'https://en.wikipedia.org/wiki/Chanel',
    hint: 'C_a_el',
    clue: 'A high fashion house that specializes in haute couture and ready-to-wear clothes, and luxury goods.|French company owned by Alain and Gerard Wertheimer.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_chiquita_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_chiquita.png',
    brand: 'Chiquita',
    wiki_url: 'https://en.wikipedia.org/wiki/Chiquita',
    hint: 'Ch___i_a',
    clue: 'An American producer and distributor of bananas and other produce.|It was Founded in 1863 and it is the leading distributor of bananas in the United States.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_flickr_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_flickr.png',
    brand: 'Flickr',
    wiki_url: 'https://en.wikipedia.org/wiki/Flickr',
    hint: '__ickr',
    clue: 'Image hosting and video hosting website, and web services suite that was created by Ludicorp.|Users share and embed personal photographs.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_generali_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_generali.png',
    brand: 'Generali',
    wiki_url: 'https://en.wikipedia.org/wiki/Generali',
    hint: '_en___li',
    clue: 'The largest insurance company in Italy and one of the largest in Europe.|The company was founded on December 26, 1831.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_gucci_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_gucci.png',
    brand: 'Gucci',
    wiki_url: 'https://en.wikipedia.org/wiki/Gucci',
    hint: 'Gu___',
    clue: 'An Italian fashion and leather goods brand.|Founded by Guccio Gucci in Florence in 1921.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_ikea_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_ikea.png',
    brand: 'Ikea',
    wiki_url: 'https://en.wikipedia.org/wiki/Ikea',
    hint: 'I_E_',
    clue: "A multinational group of companies that designs and sells furniture, appliances, small motor vehicles and home accessories.|The world's largest furniture retailer.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_jaguar_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_jaguar.png',
    brand: 'Jaguar',
    wiki_url: 'https://en.wikipedia.org/wiki/Jaguar',
    hint: '_agua_',
    clue: 'A British multinational car manufacturer.|Founded as the Swallow Sidecar Company in 1922, originally making motorcycle sidecars before developing passenger cars.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_johnnie_walker_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_johnnie_walker.png',
    brand: 'Johnnie Walker',
    wiki_url: 'https://en.wikipedia.org/wiki/Johnnie Walker',
    hint: 'J__nn__ Wal___',
    clue: 'Brand of Scotch whisky owned by Diageo.|Most widely distributed brand of blended Scotch whisky in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_linkedin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_linkedin.png',
    brand: 'Linkedin',
    wiki_url: 'https://en.wikipedia.org/wiki/Linkedin',
    hint: 'L_n_e_I_',
    clue: 'It is a business-oriented social networking service.|It is mainly used for professional networking.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_microsoft_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_microsoft.png',
    brand: 'Microsoft',
    wiki_url: 'https://en.wikipedia.org/wiki/Microsoft',
    hint: 'Mic_o_o_t',
    clue: 'An American multinational technology company headquartered Washington.|Develops, manufactures, licenses, supports and sells computer software, and personal computers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_mitsubishi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_mitsubishi.png',
    brand: 'Mitsubishi',
    wiki_url: 'https://en.wikipedia.org/wiki/Mitsubishi',
    hint: '__ts_bi_hi',
    clue: 'A group of autonomous Japanese multinational companies.|The company was established as a shipping firm by Yatarō Iwasaki  in 1870.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_msn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_msn.png',
    brand: 'Msn',
    wiki_url: 'https://en.wikipedia.org/wiki/Msn',
    hint: 'MS_',
    clue: 'Web portal and related collection of Internet services and apps for Windows and mobile devices.|Provided by Microsoft and launched on August 24, 1995.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_napster_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_napster.png',
    brand: 'Napster',
    wiki_url: 'https://en.wikipedia.org/wiki/Napster',
    hint: '_a_st_r',
    clue: 'The  name given to two music-focused online services.|Founded as a P2P file sharing Internet service that emphasized sharing audio files encoded in MP3 format.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_nvidia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_nvidia.png',
    brand: 'Nvidia',
    wiki_url: 'https://en.wikipedia.org/wiki/Nvidia',
    hint: 'Nv_d_a',
    clue: 'An American worldwide technology company based in Santa Clara, California.|Manufactures graphics processing units, as well as system on a chip units for the mobile computing market.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_oreo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_oreo.png',
    brand: 'Oreo',
    wiki_url: 'https://en.wikipedia.org/wiki/Oreo',
    hint: '__eo',
    clue: 'A sandwich cookie consisting of two chocolate wafers with a sweet creme filling in between.|Best selling cookie in the United States since its introduction in 1912.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_pringles_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_pringles.png',
    brand: 'Pringles',
    wiki_url: 'https://en.wikipedia.org/wiki/Pringles',
    hint: '_r_n_le_',
    clue: 'Brand of potato and wheat-based stackable snack chips owned by the Kellogg Company.|Originally developed by Procter & Gamble (P&G).',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_quiksilver_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_quiksilver.png',
    brand: 'Quiksilver',
    wiki_url: 'https://en.wikipedia.org/wiki/Quiksilver',
    hint: '_u_ksi__er',
    clue: "An American company based in Huntington Beach, California.|It is one of the world's largest manufacturers of surfwear and other boardsport-related equipment.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_samsung_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_samsung.png',
    brand: 'Samsung',
    wiki_url: 'https://en.wikipedia.org/wiki/Samsung',
    hint: '_a_s_ng',
    clue: 'A South-Korean multinational conglomerate company.|Activities, electronics, and semiconductors, have become its most important source of income.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_schwarzkopf_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_schwarzkopf.png',
    brand: 'Schwarzkopf',
    wiki_url: 'https://en.wikipedia.org/wiki/Schwarzkopf',
    hint: 'Schw___k_pf',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_skype_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_skype.png',
    brand: 'Skype',
    wiki_url: 'https://en.wikipedia.org/wiki/Skype',
    hint: 'S_y__',
    clue: 'Telecommunications application software product that provides video chat and voice calls.|Users can send instant messages, exchange files, and create conference calls.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_suzuki_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_suzuki.png',
    brand: 'Suzuki',
    wiki_url: 'https://en.wikipedia.org/wiki/Suzuki',
    hint: '_uzuk_',
    clue: 'A Japanese multinational corporation headquartered in Minami-ku, Hamamatsu.|Manufactures automobiles, four-wheel drive vehicles, motorcycles, ATVs, wheelchairs.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_tommy_hilfiger_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_tommy_hilfiger.png',
    brand: 'Tommy Hilfiger',
    wiki_url: 'https://en.wikipedia.org/wiki/Tommy Hilfiger',
    hint: '_o_m_ _i_fi__r',
    clue: 'An American fashion, apparel, design, fragrance retail company.|Offers consumers products including men’s, women’s and children’s apparel, sportswear, and home furnishings.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_ups_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_ups.png',
    brand: 'Ups',
    wiki_url: 'https://en.wikipedia.org/wiki/Ups',
    hint: 'U_S',
    clue: 'The world’s largest package delivery company and a provider of supply chain management solutions.|It is known for its brown delivery trucks and uniforms.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_c_volvo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_c_volvo.png',
    brand: 'Volvo',
    wiki_url: 'https://en.wikipedia.org/wiki/Volvo',
    hint: '___vo',
    clue: 'Swedish multinational manufacturing company headquartered in Gothenburg.|Production, distribution and sale of trucks, buses and construction equipment.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_air_france_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_air_france.png',
    brand: 'Air France',
    wiki_url: 'https://en.wikipedia.org/wiki/Air France',
    hint: 'Air _r_nc_',
    clue: 'The French flag carrier headquartered in Tremblay-en-France.|Formed on 7 October 1933 from a merger.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_always_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_always.png',
    brand: 'Always',
    wiki_url: 'https://en.wikipedia.org/wiki/Always',
    hint: 'Alw_y_',
    clue: 'A brand of feminine hygiene products.|Maxi pads, pantiliners, and feminine wipes, produced by Procter & Gamble.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_aol_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_aol.png',
    brand: 'Aol',
    wiki_url: 'https://en.wikipedia.org/wiki/Aol',
    hint: 'A_L',
    clue: 'Is an American multinational mass media corporation based in New York City.|It develops, grows, and invests in brands and web sites.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_aston_martin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_aston_martin.png',
    brand: 'Aston Martin',
    wiki_url: 'https://en.wikipedia.org/wiki/Aston Martin',
    hint: '_sto_ Ma___n',
    clue: 'A British manufacturer of luxury sports cars and grand tourers.|It was founded in 1913 by Lionel Martin and Robert Bamford.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_barclays_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_barclays.png',
    brand: 'Barclays',
    wiki_url: 'https://en.wikipedia.org/wiki/Barclays',
    hint: '_ar__a_s',
    clue: 'British multinational banking and financial services company.|Operations in retail, wholesale and investment banking, wealth management, mortgage lending.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_carrefour_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_carrefour.png',
    brand: 'Carrefour',
    wiki_url: 'https://en.wikipedia.org/wiki/Carrefour',
    hint: '_a_refo_r',
    clue: 'A French multinational retailer headquartered in Boulogne Billancourt, France.|The first store opened on 1 January 1958.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_cbs_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_cbs.png',
    brand: 'Cbs',
    wiki_url: 'https://en.wikipedia.org/wiki/Cbs',
    hint: 'C_S',
    clue: `American commercial broadcast television and radio network.|Referred to as the "Eye Network", in reference to the company's iconic logo, in use since 1951.`,
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_columbia_pictures_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_columbia_pictures.png',
    brand: 'Columbia Pictures',
    wiki_url: 'https://en.wikipedia.org/wiki/Columbia Pictures',
    hint: '_ol_____ P__tu_e_',
    clue: 'An American film production and distribution studio.|One of the leading film studios in the world, a member of the so-called Big Six.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_compaq_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_compaq.png',
    brand: 'Compaq',
    wiki_url: 'https://en.wikipedia.org/wiki/Compaq',
    hint: 'Co__aq',
    clue: 'A company founded in 1982, that developed, sold, and supported computers and related products and services.|Founded in February 1982 by Rod Canion, Jim Harris and Bill Murto.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_duracell_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_duracell.png',
    brand: 'Duracell',
    wiki_url: 'https://en.wikipedia.org/wiki/Duracell',
    hint: 'Dura____',
    clue: 'An American brand product line of batteries and smart power systems.|Manufactures alkaline batteries in many common sizes, such as AAA, AA, C, D, and 9V.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_elf_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_elf.png',
    brand: 'Elf',
    wiki_url: 'https://en.wikipedia.org/wiki/Elf',
    hint: 'El_',
    clue: 'Was a French oil company which merged with TotalFina to form TotalFinaElf.|The new company changed its name to Total in 2003.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_endomondo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_endomondo.png',
    brand: 'Endomondo',
    wiki_url: 'https://en.wikipedia.org/wiki/Endomondo',
    hint: 'E__o_ondo',
    clue: 'A social fitness network.|It was purchased and acquired by athletic apparel maker, Under Armour, for $85 million in 2015.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_hsbc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_hsbc.png',
    brand: 'Hsbc',
    wiki_url: 'https://en.wikipedia.org/wiki/Hsbc',
    hint: 'HS__',
    clue: "A British multinational banking and financial services company.|The world's third largest bank by assets.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_hyundai_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_hyundai.png',
    brand: 'Hyundai',
    wiki_url: 'https://en.wikipedia.org/wiki/Hyundai',
    hint: '_yund__',
    clue: 'A multinational chaebol (conglomerate) headquartered in Seoul, South Korea.|It was founded by Chung Ju-yung in 1947 as a construction firm.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_kappa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_kappa.png',
    brand: 'Kappa',
    wiki_url: 'https://en.wikipedia.org/wiki/Kappa',
    hint: '_a_p_',
    clue: "Italian sportswear brand founded in 1967 in Turin, Italy.|As one of the world's largest sport brands, it sponsors a list ofsports stars and teams.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_lexus_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_lexus.png',
    brand: 'Lexus',
    wiki_url: 'https://en.wikipedia.org/wiki/Lexus',
    hint: '___us',
    clue: "The luxury vehicle division of Japanese automaker Toyota.|Sold globally and has become Japan's largest-selling make of premium cars.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_man_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_man.png',
    brand: 'Man',
    wiki_url: 'https://en.wikipedia.org/wiki/Man',
    hint: 'm_n',
    clue: 'One of the leading international providers of commercial vehicles.|Headquartered in Munich, Germany.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_marriott_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_marriott.png',
    brand: 'Marriott',
    wiki_url: 'https://en.wikipedia.org/wiki/Marriott',
    hint: 'Ma_r__tt',
    clue: 'An American diversified hospitality company that manages and franchises a broad portfolio of hotels.|Founded in 1927.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_motorola_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_motorola.png',
    brand: 'Motorola',
    wiki_url: 'https://en.wikipedia.org/wiki/Motorola',
    hint: '__to_ol_',
    clue: 'Telecommunications company based in Schaumburg, Illinois.|After having lost $4.3 billion from 2007 to 2009, the company was divided into two independent public companies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_nba_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_nba.png',
    brand: 'Nba',
    wiki_url: 'https://en.wikipedia.org/wiki/Nba',
    hint: 'NB_',
    clue: "The preeminent men's professional basketball league in North America.|It is widely considered to be the premier men's professional basketball league in the world.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_nesquik_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_nesquik.png',
    brand: 'Nesquik',
    wiki_url: 'https://en.wikipedia.org/wiki/Nesquik',
    hint: '__sq_ik',
    clue: 'A brand of products made by Nestlé in 1948.|A mix for chocolate-flavored milk , it was released in Europe during the 1950s.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_pirelli_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_pirelli.png',
    brand: 'Pirelli',
    wiki_url: 'https://en.wikipedia.org/wiki/Pirelli',
    hint: 'P__el_i',
    clue: 'A multinational company based in Milan, Italy.|The world’s fifth-largest tyre manufacturer.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_reuters_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_reuters.png',
    brand: 'Reuters',
    wiki_url: 'https://en.wikipedia.org/wiki/Reuters',
    hint: '_eu_e_s',
    clue: 'It is an international news agency.|It was established in 1851 by Paul Julius Reuter in Britain.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_revlon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_revlon.png',
    brand: 'Revlon',
    wiki_url: 'https://en.wikipedia.org/wiki/Revlon',
    hint: 'R_vl_n',
    clue: 'American cosmetics, skin care, fragrance, and personal care company founded in 1932.|Founded in the midst of the Great Depression, 1931, by Charles Revson.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_schweppes_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_schweppes.png',
    brand: 'Schweppes',
    wiki_url: 'https://en.wikipedia.org/wiki/Schweppes',
    hint: 'Schwe__e_',
    clue: 'Beverage brand that is sold around the world.|It includes a variety of carbonated waters and ginger ales.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_sheraton_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_sheraton.png',
    brand: 'Sheraton',
    wiki_url: 'https://en.wikipedia.org/wiki/Sheraton',
    hint: 'Sh_r_t__',
    clue: "Starwood Hotels and Resorts Worldwide's largest and second oldest brand.|The origins of the brand date back to 1937.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_swarovski_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_swarovski.png',
    brand: 'Swarovski',
    wiki_url: 'https://en.wikipedia.org/wiki/Swarovski',
    hint: 's_arov__i',
    clue: 'An Austrian producer of luxury cut lead glass, headquartered in Wattens, Austria.|Fashion accessories and crystal-based ornaments.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_total_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_total.png',
    brand: 'Total',
    wiki_url: 'https://en.wikipedia.org/wiki/Total',
    hint: '_ot__',
    clue: 'French multinational integrated oil and gas company.|One of the six "Supermajor" oil companies in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_umbro_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_umbro.png',
    brand: 'Umbro',
    wiki_url: 'https://en.wikipedia.org/wiki/Umbro',
    hint: '_m_r_',
    clue: 'An English sportswear and football equipment supplier based in Manchester.|The company was founded by Harold Humphreys in 1924.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_unicef_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_unicef.png',
    brand: 'Unicef',
    wiki_url: 'https://en.wikipedia.org/wiki/Unicef',
    hint: 'UNI__F',
    clue: 'UN Program headquartered in New York City.|Provides long-term humanitarian and developmental assistance to children and mothers in developing countries.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_verbatim_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_verbatim.png',
    brand: 'Verbatim',
    wiki_url: 'https://en.wikipedia.org/wiki/Verbatim',
    hint: 'V_r_atim',
    clue: 'A Japanese company that markets storage media and flash memory products.|It is a subsidiary of Mitsubishi Chemical Holdings Corporation of Japan and is based in Charlotte.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_walkman_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_walkman.png',
    brand: 'Walkman',
    wiki_url: 'https://en.wikipedia.org/wiki/Walkman',
    hint: '__l_man',
    clue: "A Sony brand trade name originally used for portable audio cassette player.|It used to market Sony's portable audio, video players and a line of former Sony Ericsson mobile phones.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_d_western_digital_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_d_western_digital.png',
    brand: 'Western Digital',
    wiki_url: 'https://en.wikipedia.org/wiki/Western Digital',
    hint: 'We_t_r_ D_g____',
    clue: 'Is one of the largest computer hard disk drive manufacturers.|Was founded on April 23, 1970 by Alvin B. Phillips.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_asus_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_asus.png',
    brand: 'Asus',
    wiki_url: 'https://en.wikipedia.org/wiki/Asus',
    hint: '_s_s',
    clue: 'A Taiwanese multinational computer hardware and electronics company.|Products include desktops, laptops, netbooks, LED/LCD panels,hd players, mobile phones,.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_bbc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_bbc.png',
    brand: 'Bbc',
    wiki_url: 'https://en.wikipedia.org/wiki/Bbc',
    hint: '_BC',
    clue: "The public-service broadcaster of the United Kingdom, headquartered at Broadcasting House in London.|World's oldest national broadcasting organisation.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_bentley_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_bentley.png',
    brand: 'Bentley',
    wiki_url: 'https://en.wikipedia.org/wiki/Bentley',
    hint: 'B_n__ey',
    clue: 'A British luxury automaker, and a wholly owned subsidiary of the German company Volkswagen AG.|It was founded by W. O. Bentley in 1919 in Cricklewood near London.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_british_airways_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_british_airways.png',
    brand: 'British Airways',
    wiki_url: 'https://en.wikipedia.org/wiki/British Airways',
    hint: '__itis_ A___a__',
    clue: 'Is the flag carrier airline of the United Kingdom.|Was established by the United Kingdom government in 1972.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_champion_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_champion.png',
    brand: 'Champion',
    wiki_url: 'https://en.wikipedia.org/wiki/Champion',
    hint: '_ham_i__',
    clue: 'American manufacturer of clothing, specializing in sportswear.|The brand is a subsidiary of Hanes Brands Inc.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_cisco_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_cisco.png',
    brand: 'Cisco',
    wiki_url: 'https://en.wikipedia.org/wiki/Cisco',
    hint: 'C___o',
    clue: 'An American multinational technology company headquartered in San Jose, California.|Designs, manufactures, and sells networking equipment.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_dole_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_dole.png',
    brand: 'Dole',
    wiki_url: 'https://en.wikipedia.org/wiki/Dole',
    hint: '_ol_',
    clue: 'American agricultural multinational corporation.|Largest producer of fruits and vegetables in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_dreamworks_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_dreamworks.png',
    brand: 'Dreamworks',
    wiki_url: 'https://en.wikipedia.org/wiki/Dreamworks',
    hint: '_r_amW_rk_',
    clue: 'American film production company which produces and develops films, tv programming,video games.|Films are distributed by Walt Disney Studios Motion Pictures.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_fujitsu_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_fujitsu.png',
    brand: 'Fujitsu',
    wiki_url: 'https://en.wikipedia.org/wiki/Fujitsu',
    hint: 'Fuj___u',
    clue: "Japanese multinational information technology equipment and services company.|The world's third-largest IT services.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_goodyear_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_goodyear.png',
    brand: 'Goodyear',
    wiki_url: 'https://en.wikipedia.org/wiki/Goodyear',
    hint: '__odye__',
    clue: 'A global manufacturing company of tires.|Manufactures tires for automobiles, commercial trucks, light trucks, SUVs, race cars, airplanes.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_holiday_inn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_holiday_inn.png',
    brand: 'Holiday Inn',
    wiki_url: 'https://en.wikipedia.org/wiki/Holiday Inn',
    hint: '_ol_day __n',
    clue: "Multinational brand of hotels.|Originally a U.S. motel chain, today it is one of the world's largest hotel chains, with 435,299 bedrooms in 3,463 hotels globally.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_jack_wolfskin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_jack_wolfskin.png',
    brand: 'Jack Wolfskin',
    wiki_url: 'https://en.wikipedia.org/wiki/Jack Wolfskin',
    hint: '_a_k _o__s_in',
    clue: 'A German-based producer of outdoor wear and equipment.|It was founded in 1981 and is now owned by the American company The Blackstone Group.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_lidl_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_lidl.png',
    brand: 'Lidl',
    wiki_url: 'https://en.wikipedia.org/wiki/Lidl',
    hint: '_id_',
    clue: 'A German global discount supermarket chain.|The chief competitor of the similar German discount chain Aldi.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_life_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_life.png',
    brand: 'Life',
    wiki_url: 'https://en.wikipedia.org/wiki/Life',
    hint: '_i_e',
    clue: 'An American magazine that ran weekly from 1883 to 1972.|Published initially as a humor and general interest magazine.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_mars_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_mars.png',
    brand: 'Mars',
    wiki_url: 'https://en.wikipedia.org/wiki/Mars',
    hint: 'M_r_',
    clue: 'A chocolate bar.|It was first manufactured in Slough, Berkshire in the United Kingdom in 1932.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_mastercard_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_mastercard.png',
    brand: 'Mastercard',
    wiki_url: 'https://en.wikipedia.org/wiki/Mastercard',
    hint: '___ter_ard',
    clue: "An American multinational financial services corporation.|The Global Operations Headquarters is located in O'Fallon, Missouri, United States.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_monopoly_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_monopoly.png',
    brand: 'Monopoly',
    wiki_url: 'https://en.wikipedia.org/wiki/Monopoly',
    hint: '_ono__l_',
    clue: 'A board game that originated in the United States in 1903.|The current version was first published by Parker Brothers in 1935.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_nfl_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_nfl.png',
    brand: 'Nfl',
    wiki_url: 'https://en.wikipedia.org/wiki/Nfl',
    hint: 'N_L',
    clue: 'A professional American football league consisting of 32 teams.|One of the four major professional sports leagues in North America.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_prada_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_prada.png',
    brand: 'Prada',
    wiki_url: 'https://en.wikipedia.org/wiki/Prada',
    hint: '__ad_',
    clue: 'An Italian luxury fashion house.|Specializing in ready-to-wear leather and fashion accessories, shoes, luggage, perfumes, watches, etc.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_rbs_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_rbs.png',
    brand: 'Rbs',
    wiki_url: 'https://en.wikipedia.org/wiki/Rbs',
    hint: 'R_S',
    clue: 'One of the retail banking subsidiaries of The Royal Bank of Scotland Group plc.|Provides banking facilities throughout the UK and Ireland.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_renault_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_renault.png',
    brand: 'Renault',
    wiki_url: 'https://en.wikipedia.org/wiki/Renault',
    hint: 'R__a_lt',
    clue: 'A French multinational automobile manufacturer.|Was founded in 1899 as Société Renault Frères by Louis Renault.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_spotify_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_spotify.png',
    brand: 'Spotify',
    wiki_url: 'https://en.wikipedia.org/wiki/Spotify',
    hint: '_p_ti_y',
    clue: 'A commercial music streaming, podcast and video service.|Provides digital rights management-restricted content from record labels and media companies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_taco_bell_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_taco_bell.png',
    brand: 'Taco Bell',
    wiki_url: 'https://en.wikipedia.org/wiki/Taco Bell',
    hint: 'T_co _e__',
    clue: 'An American chain of fast-food restaurants.|Serve a variety of Tex-Mex foods including tacos, burritos, quesadillas, nachos, other specialty items.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_tissot_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_tissot.png',
    brand: 'Tissot',
    wiki_url: 'https://en.wikipedia.org/wiki/Tissot',
    hint: 'Ti_s_t',
    clue: 'A luxury Swiss watchmaking company.|Founded in Le Locle, Switzerland by Charles-Félicien and his son Charles-Émile in 1853.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_wella_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_wella.png',
    brand: 'Wella',
    wiki_url: 'https://en.wikipedia.org/wiki/Wella',
    hint: 'W___a',
    clue: 'One of the world’s largest hair care and cosmetics companies.|Founded in 1880 by Franz Ströher.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_whiskas_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_whiskas.png',
    brand: 'Whiskas',
    wiki_url: 'https://en.wikipedia.org/wiki/Whiskas',
    hint: 'W__s_as',
    clue: 'It is a brand of cat food sold throughout the world.|It was originally known as Kal Kan when it started in 1936.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_e_zippo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_e_zippo.png',
    brand: 'Zippo',
    wiki_url: 'https://en.wikipedia.org/wiki/Zippo',
    hint: '_ip__',
    clue: 'A reusable metal lighter manufacturer.|Was founded by George G. Blaisdell in 1932.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_american_airlines_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_american_airlines.png',
    brand: 'American Airlines',
    wiki_url: 'https://en.wikipedia.org/wiki/American Airlines',
    hint: '____i__n A_rli___',
    clue: 'It operates an extensive international and U.S. domestic network.|It is a major United States airline.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_atp_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_atp.png',
    brand: 'Atp',
    wiki_url: 'https://en.wikipedia.org/wiki/Atp',
    hint: 'A_P',
    clue: 'Formed in September 1972 by Donald Dell, Jack Kramer, and Cliff Drysdale.|Established to protect the interests of male professional tennis players.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_axn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_axn.png',
    brand: 'Axn',
    wiki_url: 'https://en.wikipedia.org/wiki/Axn',
    hint: '_XN',
    clue: 'A pay-TV, cable and satellite TV channel.|Owned by Sony Pictures Entertainment.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_cia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_cia.png',
    brand: 'Cia',
    wiki_url: 'https://en.wikipedia.org/wiki/Cia',
    hint: 'CI_',
    clue: 'An external intelligence service of the U.S. Government.|Tasked with gathering, processing and analyzing national security information from around the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_everlast_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_everlast.png',
    brand: 'Everlast',
    wiki_url: 'https://en.wikipedia.org/wiki/Everlast',
    hint: '_v_rla__',
    clue: 'An American brand active in the design, manufacturing, licensing and marketing of boxing.|Products are sold in more than 75 countries.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_gerber_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_gerber.png',
    brand: 'Gerber',
    wiki_url: 'https://en.wikipedia.org/wiki/Gerber',
    hint: 'Ger__r',
    clue: 'Is a purveyor of baby food and baby products.|A formerly American-owned company headquartered in Fremont, Michigan.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_guinness_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_guinness.png',
    brand: 'Guinness',
    wiki_url: 'https://en.wikipedia.org/wiki/Guinness',
    hint: 'Gu_n_e_s',
    clue: "An Irish dry stout that originated at St. James's Gate, Dublin.|It is one of the most successful beer brands worldwide.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_jack_daniels_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_jack_daniels.png',
    brand: 'Jack Daniels',
    wiki_url: 'https://en.wikipedia.org/wiki/Jack Daniels',
    hint: 'J___ Dan__ls',
    clue: 'A brand of Tennessee whiskey.|The highest selling American whiskey in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_kinder_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_kinder.png',
    brand: 'Kinder',
    wiki_url: 'https://en.wikipedia.org/wiki/Kinder',
    hint: 'Ki_d_r',
    clue: 'A candy manufactured by Italian company Ferrero.|It developed and produced at Ferrero Germany (Frankfurt) in 1967 for the German market.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_mac_os_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_mac_os.png',
    brand: 'Mac Os',
    wiki_url: 'https://en.wikipedia.org/wiki/Mac Os',
    hint: 'M__ _S',
    clue: 'A series of graphical user interface–based operating systems.|Developed by Apple.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_marlboro_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_marlboro.png',
    brand: 'Marlboro',
    wiki_url: 'https://en.wikipedia.org/wiki/Marlboro',
    hint: 'M__l__ro',
    clue: 'The largest selling brand of cigarettes in the world.|It is well known for its billboard advertisements and magazine ads.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_mclaren_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_mclaren.png',
    brand: 'Mclaren',
    wiki_url: 'https://en.wikipedia.org/wiki/Mclaren',
    hint: '_c_are_',
    clue: 'Best known as a Formula One constructor.|Founded in 1963.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_nordea_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_nordea.png',
    brand: 'Nordea',
    wiki_url: 'https://en.wikipedia.org/wiki/Nordea',
    hint: 'N_r_ea',
    clue: 'A Nordic financial services group operating in Northern Europe.|Headquartered from Stockholm and has more than 1,400 branches.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_nutella_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_nutella.png',
    brand: 'Nutella',
    wiki_url: 'https://en.wikipedia.org/wiki/Nutella',
    hint: 'Nut_l__',
    clue: 'Brand name of an Italian sweetened hazelnut chocolate spread.|Manufactured by the Italian company Ferrero, it was introduced to the market in 1964.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_olay_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_olay.png',
    brand: 'Olay',
    wiki_url: 'https://en.wikipedia.org/wiki/Olay',
    hint: '_la_',
    clue: "It is an American skin care line.|It is one of Procter & Gamble's multi-billion dollar brands.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_petronas_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_petronas.png',
    brand: 'Petronas',
    wiki_url: 'https://en.wikipedia.org/wiki/Petronas',
    hint: '____ONAS',
    clue: "A Malaysian oil and gas company that was founded on 17 August 1974.|Ranked among Fortune Global 500's largest corporations in the world.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_powerade_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_powerade.png',
    brand: 'Powerade',
    wiki_url: 'https://en.wikipedia.org/wiki/Powerade',
    hint: '___e_ade',
    clue: "A sports drink manufactured and marketed by The Coca-Cola Company.|Its primary competitor is PepsiCo's Gatorade brands.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_seat_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_seat.png',
    brand: 'Seat',
    wiki_url: 'https://en.wikipedia.org/wiki/Seat',
    hint: '_EA_',
    clue: 'A Spanish automobile manufacturer.|Founded on May 9, 1950, by the Instituto Nacional de Industria.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_teka_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_teka.png',
    brand: 'Teka',
    wiki_url: 'https://en.wikipedia.org/wiki/Teka',
    hint: 'T__a',
    clue: 'Multinational company founded in Germany in 1924.|Kitchen and bath products, ceramic glazes, industrial containers and professional kitchens.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_timex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_timex.png',
    brand: 'Timex',
    wiki_url: 'https://en.wikipedia.org/wiki/Timex',
    hint: '__me_',
    clue: 'Founded in 1854 in nearby Waterbury, Connecticut.|The company is the current successor to the Waterbury Clock Company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_tnt_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_tnt.png',
    brand: 'Tnt',
    wiki_url: 'https://en.wikipedia.org/wiki/Tnt',
    hint: 'TN_',
    clue: 'Was an international express, mail delivery and logistics services company.|Postal services in 8 European countries, including the UK, Germany, Italy and Belgium.',
    easy: true
  },
  {
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_tripadvisor.png',
    brand: 'Tripadvisor',
    wiki_url: 'https://en.wikipedia.org/wiki/Tripadvisor',
    hint: '__ip_d_is_r',
    clue: 'An American travel website company providing reviews of travel-related content.|Founded in February 2000 by Stephen Kaufer, Langley Steinert, and several others.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_ubs_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_ubs.png',
    brand: 'Ubs',
    wiki_url: 'https://en.wikipedia.org/wiki/Ubs',
    hint: 'UB_',
    clue: 'Swiss global financial services company.|Provides investment banking, asset management, and wealth management services.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_vodafone_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_vodafone.png',
    brand: 'Vodafone',
    wiki_url: 'https://en.wikipedia.org/wiki/Vodafone',
    hint: 'Vo___o_e',
    clue: "A British multinational telecommunications company headquartered in London.|It is the world's 2nd-largest mobile telecommunications company.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_xerox_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_xerox.png',
    brand: 'Xerox',
    wiki_url: 'https://en.wikipedia.org/wiki/Xerox',
    hint: 'X___x',
    clue: 'An American multinational document management corporation that produces and sells printers.|It was founded in 1906 in Rochester as The Haloid Photographic Company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_yves_saint_laurent_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_yves_saint_laurent.png',
    brand: 'Yves Saint Laurent',
    wiki_url: 'https://en.wikipedia.org/wiki/Yves Saint Laurent',
    hint: '___s _ai__ La__e__',
    clue: "A luxury fashion house.|One of the world's most prominent fashion houses and known for its modern and iconic pieces, such as its tuxedo jackets for women.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_f_zara_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_f_zara.png',
    brand: 'Zara',
    wiki_url: 'https://en.wikipedia.org/wiki/Zara',
    hint: 'Za__',
    clue: 'Spanish clothing and accessories retailer based in Arteixo, Galicia.|Founded in 1975 by Amancio Ortega and Rosalía Mera.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_airbus_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_airbus.png',
    brand: 'Airbus',
    wiki_url: 'https://en.wikipedia.org/wiki/Airbus',
    hint: 'Air__s',
    clue: 'An aircraft manufacturer.|It was founded in 18 December 1969.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_animal_planet_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_animal_planet.png',
    brand: 'Animal Planet',
    wiki_url: 'https://en.wikipedia.org/wiki/Animal Planet',
    hint: 'A_i___ Pla_e_',
    clue: 'It is an American basic cable and satellite television channel.|It was launched on October 1, 1996; it was created by Discovery Communications.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_ariel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_ariel.png',
    brand: 'Ariel',
    wiki_url: 'https://en.wikipedia.org/wiki/Ariel',
    hint: '_ri__',
    clue: 'A marketing line of laundry detergents made by Procter & Gamble.|First appeared on the UK market in 1967 and was the first detergent with stain-removing enzymes.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_asics_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_asics.png',
    brand: 'Asics',
    wiki_url: 'https://en.wikipedia.org/wiki/Asics',
    hint: 'A___s',
    clue: 'A Japanese athletic equipment company.|Produces footwear and sports equipment designed for a wide range of sports, generally in the upper price range.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_atomic_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_atomic.png',
    brand: 'Atomic',
    wiki_url: 'https://en.wikipedia.org/wiki/Atomic',
    hint: 'at_m_c',
    clue: 'An Austrian company that manufactures and sells skiing equipment.|Founded in 1955 by Alois Rohrmoser.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_best_western_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_best_western.png',
    brand: 'Best Western',
    wiki_url: 'https://en.wikipedia.org/wiki/Best Western',
    hint: 'B___ West_r_',
    clue: 'Operates about 4,000 hotels.|The chain, with its corporate headquarters in Phoenix, Arizona, operates 2,163 hotels in North America alone.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_bic_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_bic.png',
    brand: 'Bic',
    wiki_url: 'https://en.wikipedia.org/wiki/Bic',
    hint: 'BI_',
    clue: 'A company based in Clichy,France that was founded in 1945.|It is best known for making ballpoint pens.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_blackberry_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_blackberry.png',
    brand: 'Blackberry',
    wiki_url: 'https://en.wikipedia.org/wiki/Blackberry',
    hint: 'B___kBe_ry',
    clue: 'Wireless handheld devices and services.|The President of the US, Barack Obama, became known for his dependence on this device for communication in 2008.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_corvette_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_corvette.png',
    brand: 'Corvette',
    wiki_url: 'https://en.wikipedia.org/wiki/Corvette',
    hint: '__rv_t_e',
    clue: 'A sports car manufactured by the Chevrolet division of American automotive conglomerate GM.|The car has been produced through seven generations.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_danone_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_danone.png',
    brand: 'Danone',
    wiki_url: 'https://en.wikipedia.org/wiki/Danone',
    hint: 'Da__ne',
    clue: 'A multinational food-products corporation based in the 9th arrondissement of Paris.|The original company bearing the corporate name was founded in 1919 by Isaac Carasso.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_delta_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_delta.png',
    brand: 'Delta',
    wiki_url: 'https://en.wikipedia.org/wiki/Delta',
    hint: '_e_t_',
    clue: 'A major American airline.|The airline and its subsidiaries operate over 5,400 flights daily.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_dior_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_dior.png',
    brand: 'Dior',
    wiki_url: 'https://en.wikipedia.org/wiki/Dior',
    hint: '_io_',
    clue: 'A French luxury goods company.|Designs and retails ready-to-wear, leather goods, fashion accessories, footwear, fragrance, make-up, and skincare products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_eni_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_eni.png',
    brand: 'Eni',
    wiki_url: 'https://en.wikipedia.org/wiki/Eni',
    hint: '_ni',
    clue: "Italian multinational oil and gas company.|Italy's largest industrial company with a market capitalization.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_franke_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_franke.png',
    brand: 'Franke',
    wiki_url: 'https://en.wikipedia.org/wiki/Franke',
    hint: '_ran_e',
    clue: 'An industrial manufacturer with companies located around the world.|Based in Aarburg, Switzerland.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_glaxosmithkline_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_glaxosmithkline.png',
    brand: 'Glaxosmithkline',
    wiki_url: 'https://en.wikipedia.org/wiki/Glaxosmithkline',
    hint: '_l_x__mi___l_n_',
    clue: 'A British multinational pharmaceutical company.|It was established in 2000 by a merger.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_lexmark_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_lexmark.png',
    brand: 'Lexmark',
    wiki_url: 'https://en.wikipedia.org/wiki/Lexmark',
    hint: 'Lexm___',
    clue: 'American corporation that manufactures laser printers and provides enterprise services.|Company is headquartered in Lexington, Kentucky, in the United States.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_milka_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_milka.png',
    brand: 'Milka',
    wiki_url: 'https://en.wikipedia.org/wiki/Milka',
    hint: 'M_l__',
    clue: 'A traditional brand of chocolate confection, manufactured by US confectionary company Mondelēz International.|Introduced in 1825.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_netscape_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_netscape.png',
    brand: 'Netscape',
    wiki_url: 'https://en.wikipedia.org/wiki/Netscape',
    hint: '__tsc_p_',
    clue: 'An American computer services company.|It is credited with developing the SSL for securing online communication as well as JavaScript.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_opel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_opel.png',
    brand: 'Opel',
    wiki_url: 'https://en.wikipedia.org/wiki/Opel',
    hint: '_p_l',
    clue: 'German automobile manufacturer.|The company designs, engineers, manufactures and distributes passenger vehicles.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_ryanair_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_ryanair.png',
    brand: 'Ryanair',
    wiki_url: 'https://en.wikipedia.org/wiki/Ryanair',
    hint: 'Rya_a__',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_starburst_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_starburst.png',
    brand: 'Starburst',
    wiki_url: 'https://en.wikipedia.org/wiki/Starburst',
    hint: 'S_ar__rst',
    clue: 'The brand name of a box-shaped, fruit-flavored soft taffy candy.|Different varieties such as tropical, sour, fave reds, very berry, superfruit flavor and original.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_subway_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_subway.png',
    brand: 'Subway',
    wiki_url: 'https://en.wikipedia.org/wiki/Subway',
    hint: 'S_bw_y',
    clue: 'An American fast food restaurant franchise.|Primarily sells submarine sandwiches (subs) and salads.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_tesla_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_tesla.png',
    brand: 'Tesla',
    wiki_url: 'https://en.wikipedia.org/wiki/Tesla',
    hint: 'T_sla',
    clue: 'An American automotive and energy storage company.|Designs, manufactures, and sells electric cars, electric vehicle powertrain components, and battery products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_vaio_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_vaio.png',
    brand: 'Vaio',
    wiki_url: 'https://en.wikipedia.org/wiki/Vaio',
    hint: '__io',
    clue: 'A manufacturer of personal computers.|It was originally a brand of Sony Corporation, introduced in 1996.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_wells_fargo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_wells_fargo.png',
    brand: 'Wells Fargo',
    wiki_url: 'https://en.wikipedia.org/wiki/Wells Fargo',
    hint: 'W__ls Fa_go',
    clue: 'An American multinational banking and financial services holding company.|It was the only bank in the United States to be rated AAA by S&P.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_who_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_who.png',
    brand: 'Who',
    wiki_url: 'https://en.wikipedia.org/wiki/Who',
    hint: 'W_O',
    clue: 'A specialized agency of the United Nations (UN) that is concerned with international public health.|It was established on 7 April 1948, headquartered in Geneva, Switzerland.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_wrangler_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_wrangler.png',
    brand: 'Wrangler',
    wiki_url: 'https://en.wikipedia.org/wiki/Wrangler',
    hint: 'Wra__l__',
    clue: 'An American manufacturer of jeans and other clothing items.|The brand is owned by the VF Corporation.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_g_zynga_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_g_zynga.png',
    brand: 'Zynga',
    wiki_url: 'https://en.wikipedia.org/wiki/Zynga',
    hint: 'Z_n__',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_alfa_romeo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_alfa_romeo.png',
    brand: 'Alfa Romeo',
    wiki_url: 'https://en.wikipedia.org/wiki/Alfa Romeo',
    hint: 'Alfa ___eo',
    clue: 'An Italian car manufacturer.|Founded in 1910 in Milan, the company has been involved in car racing since 1911.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_american_express_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_american_express.png',
    brand: 'American Express',
    wiki_url: 'https://en.wikipedia.org/wiki/American Express',
    hint: '_m__ica_ __p_e__',
    clue: 'Is an American multinational financial services corporation headquartered in Manhattan in New York.|Founded in Buffalo, New York in the 1850.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_angry_birds_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_angry_birds.png',
    brand: 'Angry Birds',
    wiki_url: 'https://en.wikipedia.org/wiki/Angry Birds',
    hint: 'An_r_ __rds',
    clue: 'Video game franchise created by Finnish computer game developer Rovio Entertainment.|Successful combination of addictive gameplay, comical style, and low price.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_auchan_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_auchan.png',
    brand: 'Auchan',
    wiki_url: 'https://en.wikipedia.org/wiki/Auchan',
    hint: 'A_ch_n',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_aviva_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_aviva.png',
    brand: 'Aviva',
    wiki_url: 'https://en.wikipedia.org/wiki/Aviva',
    hint: '__iv_',
    clue: 'A British multinational insurance company.|The name of the company upon its formation in May 2000 was CGNU plc.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_castrol_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_castrol.png',
    brand: 'Castrol',
    wiki_url: 'https://en.wikipedia.org/wiki/Castrol',
    hint: '_as_r_l',
    clue: 'British global brand of industrial and automotive lubricants.|Was purchased by BP in 2000 and the brand became part of the BP Group of Companies,.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_colgate_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_colgate.png',
    brand: 'Colgate',
    wiki_url: 'https://en.wikipedia.org/wiki/Colgate',
    hint: 'C_lg__e',
    clue: 'An oral hygiene product line of toothpastes, toothbrushes, mouthwashes and dental floss.|The brand was first sold by in 1873.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_continental_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_continental.png',
    brand: 'Continental',
    wiki_url: 'https://en.wikipedia.org/wiki/Continental',
    hint: '_on____nt__',
    clue: 'Was a major U.S. airline, founded in 1934.|In May 2010, the airline announced that it would merge with UAL Corporation.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_dove_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_dove.png',
    brand: 'Dove',
    wiki_url: 'https://en.wikipedia.org/wiki/Dove',
    hint: '__ve',
    clue: 'A personal care brand owned by Unilever.|Products are sold in more than 80 countries and are offered for both women and men.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_fedex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_fedex.png',
    brand: 'Fedex',
    wiki_url: 'https://en.wikipedia.org/wiki/Fedex',
    hint: 'Fe___',
    clue: "An American global courier delivery services company.|The name is a syllabic abbreviation of the name of the company's original air division, Federal Express.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_gant_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_gant.png',
    brand: 'Gant',
    wiki_url: 'https://en.wikipedia.org/wiki/Gant',
    hint: '_a_t',
    clue: 'A clothing brand of American heritage launched in New Haven in 1949.|Offer clothing for men, women, boys, girls and babies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_giant_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_giant.png',
    brand: 'Giant',
    wiki_url: 'https://en.wikipedia.org/wiki/Giant',
    hint: '___nt',
    clue: "A Taiwanese bicycle manufacturer that is recognized as the world's largest bicycle manufacturer.|Was established in 1972 in Dajia, Taichung County.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_knorr_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_knorr.png',
    brand: 'Knorr',
    wiki_url: 'https://en.wikipedia.org/wiki/Knorr',
    hint: '__or_',
    clue: 'A German food and beverage brand owned by the English-Dutch company Unilever.|It produces dehydrated soup mixes and condiments.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_lego_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_lego.png',
    brand: 'Lego',
    wiki_url: 'https://en.wikipedia.org/wiki/Lego',
    hint: 'L__o',
    clue: 'A line of plastic construction toys.|Colourful bricks can be assembled and connected in many ways, to construct such objects as vehicles, buildings, and robots.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_maserati_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_maserati.png',
    brand: 'Maserati',
    wiki_url: 'https://en.wikipedia.org/wiki/Maserati',
    hint: 'Ma___a_i',
    clue: 'An Italian luxury car manufacturer.|Its tagline is "Luxury, sports and style cast in exclusive cars".',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_maybach_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_maybach.png',
    brand: 'Maybach',
    wiki_url: 'https://en.wikipedia.org/wiki/Maybach',
    hint: '__y_ach',
    clue: 'A German car manufacturer.|Company was founded in 1909 by Wilhelm Maybach and his son.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_mlb_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_mlb.png',
    brand: 'Mlb',
    wiki_url: 'https://en.wikipedia.org/wiki/Mlb',
    hint: '_LB',
    clue: 'A professional baseball organization that is the oldest of the four major professional sports leagues.|Specialized in baseball sport, founded in 1903 in United States and Canada.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_new_balance_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_new_balance.png',
    brand: 'New Balance',
    wiki_url: 'https://en.wikipedia.org/wiki/New Balance',
    hint: 'New B_l__c_',
    clue: "An American footwear manufacturer.|One of the world's major sports footwear manufacturers.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_onkyo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_onkyo.png',
    brand: 'Onkyo',
    wiki_url: 'https://en.wikipedia.org/wiki/Onkyo',
    hint: 'O_k__',
    clue: 'A Japanese consumer electronics manufacturer, specializing in home cinema and audio equipment including receivers and surround sound speakers.|Started in 1946.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_reddit_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_reddit.png',
    brand: 'Reddit',
    wiki_url: 'https://en.wikipedia.org/wiki/Reddit',
    hint: 'R__dit',
    clue: 'Entertainment, social networking, and news website.|Members submit content, such as text posts or direct links, making it an online bulletin board system.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_snickers_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_snickers.png',
    brand: 'Snickers',
    wiki_url: 'https://en.wikipedia.org/wiki/Snickers',
    hint: '_nic__r_',
    clue: 'Brand name chocolate bar made by Mars, Incorporated.|Consisting of nougat topped with caramel and peanuts, enrobed in milk chocolate.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_steam_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_steam.png',
    brand: 'Steam',
    wiki_url: 'https://en.wikipedia.org/wiki/Steam',
    hint: '__e_m',
    clue: 'Internet-based digital distribution, digital rights management, multiplayer, social networking platform.|Over 4,500 games played by over 125 million active users.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_ubuntu_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_ubuntu.png',
    brand: 'Ubuntu',
    wiki_url: 'https://en.wikipedia.org/wiki/Ubuntu',
    hint: 'U_unt_',
    clue: 'Is a Debian-based Linux operating system, with Unity as its default desktop environment.|The Initial release was on 20th of October 2004.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_unicredit_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_unicredit.png',
    brand: 'Unicredit',
    wiki_url: 'https://en.wikipedia.org/wiki/Unicredit',
    hint: '_n_C_edit',
    clue: 'An Italian global banking and financial services company.|Was the outcome of the 1998 merger of several Italian banks.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_h_wizz_air_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_h_wizz_air.png',
    brand: 'Wizz Air',
    wiki_url: 'https://en.wikipedia.org/wiki/Wizz Air',
    hint: 'Wiz_ __r',
    clue: 'A Hungarian low-cost airline.|The airline was established in September 2003.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_avon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_avon.png',
    brand: 'Avon',
    wiki_url: 'https://en.wikipedia.org/wiki/Avon',
    hint: 'Av_n',
    clue: 'An American international manufacturer and direct selling company.|It was founded in 1886 by David H. McConnell.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_bundesliga_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_bundesliga.png',
    brand: 'Bundesliga',
    wiki_url: 'https://en.wikipedia.org/wiki/Bundesliga',
    hint: 'B__de_lig_',
    clue: 'A professional association football league in Germany.|It was founded in 1962 in Dortmund and the first season started in 1963.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_cat_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_cat.png',
    brand: 'Cat',
    wiki_url: 'https://en.wikipedia.org/wiki/Cat',
    hint: '_AT',
    clue: 'An American corporation which designs, manufactures, markets and sells machinery, and engines.|Founded in 1925 in California.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_clinique_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_clinique.png',
    brand: 'Clinique',
    wiki_url: 'https://en.wikipedia.org/wiki/Clinique',
    hint: '__in_qu_',
    clue: 'An American manufacturer of skincare, cosmetics, toiletries and fragrances.|Owned and operated by the Estée Lauder Corporation.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_commerzbank_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_commerzbank.png',
    brand: 'Commerzbank',
    wiki_url: 'https://en.wikipedia.org/wiki/Commerzbank',
    hint: '_o_me_z__nk',
    clue: 'A global banking and financial services company.|Founded in 1870 with its headquarters in Frankfurt, Germany.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_dhl_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_dhl.png',
    brand: 'Dhl',
    wiki_url: 'https://en.wikipedia.org/wiki/Dhl',
    hint: 'DH_',
    clue: 'Is a division of the German logistics company Deutsche Post DHL.|Provides international express mail services.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_ellesse_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_ellesse.png',
    brand: 'Ellesse',
    wiki_url: 'https://en.wikipedia.org/wiki/Ellesse',
    hint: 'E_le__e',
    clue: 'A sports apparel company.|Founded in Italy in 1959.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_gazprom_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_gazprom.png',
    brand: 'Gazprom',
    wiki_url: 'https://en.wikipedia.org/wiki/Gazprom',
    hint: 'G_zp_om',
    clue: "The largest extractor of natural gas in the world and one of the world's largest companies.|Was created in 1989 in Moscow, Russia.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_hbo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_hbo.png',
    brand: 'Hbo',
    wiki_url: 'https://en.wikipedia.org/wiki/Hbo',
    hint: 'HB_',
    clue: 'An American premium cable and satellite television network.|Oldest and longest continuously operating pay tv service in the US.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_hilton_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_hilton.png',
    brand: 'Hilton',
    wiki_url: 'https://en.wikipedia.org/wiki/Hilton',
    hint: '__lt_n',
    clue: 'Is an international chain of full service.|The original company was founded by Conrad Hilton.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_isuzu_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_isuzu.png',
    brand: 'Isuzu',
    wiki_url: 'https://en.wikipedia.org/wiki/Isuzu',
    hint: 'I___u',
    clue: 'A Japanese commercial vehicles and diesel enginemanufacturing company.|Founded in 1916 in Tokyo Japan.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_kingston_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_kingston.png',
    brand: 'Kingston',
    wiki_url: 'https://en.wikipedia.org/wiki/Kingston',
    hint: '_ings___',
    clue: 'An American, privately held, multinational computer technology corporation.|Was founded on October 17, 1987.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_kpmg_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_kpmg.png',
    brand: 'Kpmg',
    wiki_url: 'https://en.wikipedia.org/wiki/Kpmg',
    hint: '__MG',
    clue: "One of the largest professional services companies in the world.|The firm's history dates back to 1870.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_lamborghini_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_lamborghini.png',
    brand: 'Lamborghini',
    wiki_url: 'https://en.wikipedia.org/wiki/Lamborghini',
    hint: 'L___orghi__',
    clue: "An Italian brand and manufacturer of luxury sports cars and, formerly, SUVs.|Its production facility and headquarters are located in Sant'Agata Bolognese, Italy.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_lot_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_lot.png',
    brand: 'Lot',
    wiki_url: 'https://en.wikipedia.org/wiki/Lot',
    hint: 'L_T',
    clue: 'The flag carrier of Poland.|Was established in 1929.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_mattel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_mattel.png',
    brand: 'Mattel',
    wiki_url: 'https://en.wikipedia.org/wiki/Mattel',
    hint: 'M_t_el',
    clue: 'American toy manufacturing company founded in 1945 with headquarters in El Segundo, California.|It was founded by Harold Matson, Ruth and Elliot Handler.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_playboy_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_playboy.png',
    brand: 'Playboy',
    wiki_url: 'https://en.wikipedia.org/wiki/Playboy',
    hint: '_layb__',
    clue: "American men's lifestyle and entertainment magazine.|It was founded in Chicago in 1953 by Hugh Hefner.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_saab_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_saab.png',
    brand: 'Saab',
    wiki_url: 'https://en.wikipedia.org/wiki/Saab',
    hint: '_a_b',
    clue: 'A Swedish automobile manufacture.|Created in 1937 in Linköping.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_sears_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_sears.png',
    brand: 'Sears',
    wiki_url: 'https://en.wikipedia.org/wiki/Sears',
    hint: 'S__r_',
    clue: 'It is a chain of American department stores.|The company was founded by Richard Warren Sears and Alvah Curtis Roebuck in 1886.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_sesame_street_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_sesame_street.png',
    brand: 'Sesame Street',
    wiki_url: 'https://en.wikipedia.org/wiki/Sesame Street',
    hint: '___ame S_r__t',
    clue: "A children's tv series.|Known for its educational content, and images communicated through the use of Jim Henson's Muppets.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_sprite_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_sprite.png',
    brand: 'Sprite',
    wiki_url: 'https://en.wikipedia.org/wiki/Sprite',
    hint: 'S_ri_e',
    clue: 'A colorless, lemon and lime flavored, caffeine-free soft drink, created by the Coca-Cola Company.|Developed in West Germany in 1959 as Fanta Klare Zitrone.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_tic_tac_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_tic_tac.png',
    brand: 'Tic Tac',
    wiki_url: 'https://en.wikipedia.org/wiki/Tic Tac',
    hint: 'Tic _a_',
    clue: 'A brand of small, hard mints, manufactured by the Italian confectioner Ferrero.|Were first produced in 1969. They are usually sold in small transparent plastic boxes.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_xbox_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_xbox.png',
    brand: 'Xbox',
    wiki_url: 'https://en.wikipedia.org/wiki/Xbox',
    hint: '_b_x',
    clue: 'Video gaming brand created and owned by Microsoft.|A series of video game consoles with 3 consoles released in the sixth, seventh, and eighth generations.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_i_yelp_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_i_yelp.png',
    brand: 'Yelp',
    wiki_url: 'https://en.wikipedia.org/wiki/Yelp',
    hint: 'Ye__',
    clue: 'A multi-national corporation headquartered in San Francisco, California.|Founded in 2004 by former Paypal employees at the startup incubator MRL Ventures.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_aegon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_aegon.png',
    brand: 'Aegon',
    wiki_url: 'https://en.wikipedia.org/wiki/Aegon',
    hint: '_e_o_',
    clue: 'A multinational life insurance, pensions and asset management company.|Founded in 1983 from the merger of AGO Holding N.V.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_aldo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_aldo.png',
    brand: 'Aldo',
    wiki_url: 'https://en.wikipedia.org/wiki/Aldo',
    hint: '_l_o',
    clue: 'A private Canadian corporation that owns and operates a worldwide chain of shoe and accessory stores.|Founded by Aldo Bensadoun in Montreal.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_boeing_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_boeing.png',
    brand: 'Boeing',
    wiki_url: 'https://en.wikipedia.org/wiki/Boeing',
    hint: 'B_ei_g',
    clue: 'Is an American multinational corporation that designs, manufactures, and sells airplanes, rotorcraft, rockets and satellites.|Founded in 1916.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_burton_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_burton.png',
    brand: 'Burton',
    wiki_url: 'https://en.wikipedia.org/wiki/Burton',
    hint: '_urt_n',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_crocs_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_crocs.png',
    brand: 'Crocs',
    wiki_url: 'https://en.wikipedia.org/wiki/Crocs',
    hint: '___cs',
    clue: 'A shoe manufacturer founded by Scott Seamans, Lyndon Hanson, and George Boedecker.|The shoe was originally developed as a spa shoe.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_dakar_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_dakar.png',
    brand: 'Dakar',
    wiki_url: 'https://en.wikipedia.org/wiki/Dakar',
    hint: '__ka_',
    clue: 'An annual rally raid organised by the Amaury Sport Organisation.|Most events since the inception in 1978 were from Paris, France.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_dkny_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_dkny.png',
    brand: 'Dkny',
    wiki_url: 'https://en.wikipedia.org/wiki/Dkny',
    hint: '_K_Y',
    clue: 'New York-based fashion house.|Specializing in fashion goods for men and women.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_enel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_enel.png',
    brand: 'Enel',
    wiki_url: 'https://en.wikipedia.org/wiki/Enel',
    hint: 'E__l',
    clue: 'A multinational manufacturer and distributor of electricity and gas.|Established as a public body in 1962, and then transformed into a limited company in 1992.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_fanta_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_fanta.png',
    brand: 'Fanta',
    wiki_url: 'https://en.wikipedia.org/wiki/Fanta',
    hint: '_a_t_',
    clue: 'A global brand of fruit-flavored carbonated soft drinks.|Created by The Coca-Cola Company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_ford_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_ford.png',
    brand: 'Ford',
    wiki_url: 'https://en.wikipedia.org/wiki/Ford',
    hint: '_o_d',
    clue: 'An American multinational automaker headquartered in Dearborn, Michigan.|It was founded by Henry Ford and incorporated on June 16, 1903.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_fujifilm_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_fujifilm.png',
    brand: 'Fujifilm',
    wiki_url: 'https://en.wikipedia.org/wiki/Fujifilm',
    hint: '_u_ifi__',
    clue: 'A Japanese multinational photography and imaging company.|Was established in 1934 with the aim of being the first Japanese producer of photographic films.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_garnier_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_garnier.png',
    brand: 'Garnier',
    wiki_url: 'https://en.wikipedia.org/wiki/Garnier',
    hint: '__rnie_',
    clue: "A mass market cosmetics brand of L'Oréal that produces hair care and skin care products.|Founded in 1904 and was acquired by L'Oréal in the 1970s.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_heinz_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_heinz.png',
    brand: 'Heinz',
    wiki_url: 'https://en.wikipedia.org/wiki/Heinz',
    hint: 'H__n_',
    clue: 'An American food processing company with world headquarters in Pittsburgh, Pennsylvania.|It was founded in 1869 and ranked first in ketchup in the US with a market share.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_huawei_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_huawei.png',
    brand: 'Huawei',
    wiki_url: 'https://en.wikipedia.org/wiki/Huawei',
    hint: 'Hu_we_',
    clue: "A Chinese multinational networking and telecommunications equipment and services company.|It was founded in 1987 by Ren Zhengfei in the People's Liberation Army.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_jeep_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_jeep.png',
    brand: 'Jeep',
    wiki_url: 'https://en.wikipedia.org/wiki/Jeep',
    hint: 'J_e_',
    clue: 'Brand of American automobiles that is a division of FCA US LLC.|The first civilian models were produced in 1945.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_pioneer_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_pioneer.png',
    brand: 'Pioneer',
    wiki_url: 'https://en.wikipedia.org/wiki/Pioneer',
    hint: '_io_ee_',
    clue: 'A Japanese multinational corporation that specializes in digital entertainment products.|Founded by Nozomu Matsumoto in 1938 as a radio and speaker repair shop.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_porsche_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_porsche.png',
    brand: 'Porsche',
    wiki_url: 'https://en.wikipedia.org/wiki/Porsche',
    hint: '_orsc__',
    clue: 'A German automobile manufacturer specializing in high-performance sports cars, SUVs and sedans.|Headquartered in Stuttgart, and is owned by Volkswagen AG.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_ricoh_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_ricoh.png',
    brand: 'Ricoh',
    wiki_url: 'https://en.wikipedia.org/wiki/Ricoh',
    hint: 'R___h',
    clue: 'A Japanese multinational imaging and electronics company.|It was founded by the RIKEN zaibatsu on 6 February 1936.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_sandisk_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_sandisk.png',
    brand: 'Sandisk',
    wiki_url: 'https://en.wikipedia.org/wiki/Sandisk',
    hint: 'S_nD_s_',
    clue: 'Is a global company that designs, develops and manufactures flash memory storage solutions and software.|It was founded in 1988 by Dr. Eli Harari, Sanjay Mehrotra and Jack Yuan.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_siemens_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_siemens.png',
    brand: 'Siemens',
    wiki_url: 'https://en.wikipedia.org/wiki/Siemens',
    hint: 'Si__en_',
    clue: 'German multinational conglomerate company headquartered in Berlin and Munich.|It is the largest engineering company in Europe.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_singapore_airlines_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_singapore_airlines.png',
    brand: 'Singapore Airlines',
    wiki_url: 'https://en.wikipedia.org/wiki/Singapore Airlines',
    hint: '_i_____re ___l_n_s',
    clue: 'Is the flag carrier of Singapore.|Was founded in 1947.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_standard_chartered_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_standard_chartered.png',
    brand: 'Standard Chartered',
    wiki_url: 'https://en.wikipedia.org/wiki/Standard Chartered',
    hint: '__an_a__ ___r_er__',
    clue: 'A British multinational banking and financial services company.|It operates a network of more than 1,700 branches across more than 70 countries and employs around 87,000 people.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_tomtom_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_tomtom.png',
    brand: 'Tomtom',
    wiki_url: 'https://en.wikipedia.org/wiki/Tomtom',
    hint: '_omTo_',
    clue: 'A Dutch company that produces navigation and mapping products.|Makes GPS sport watches, fleet management systems, and location-based products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_triumph_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_triumph.png',
    brand: 'Triumph',
    wiki_url: 'https://en.wikipedia.org/wiki/Triumph',
    hint: '_r_u_ph',
    clue: 'The largest British motorcycle manufacturer; it was established in 1984 by John Bloor.|One of the oldest names in motorcycle manufacturing.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_ubisoft_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_ubisoft.png',
    brand: 'Ubisoft',
    wiki_url: 'https://en.wikipedia.org/wiki/Ubisoft',
    hint: '_biso__',
    clue: 'A French multinational video game developer and publisher.|Developing games for several acclaimed video game franchises like Just Dance.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_western_union_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_western_union.png',
    brand: 'Western Union',
    wiki_url: 'https://en.wikipedia.org/wiki/Western Union',
    hint: 'West___ __i_n',
    clue: "An American financial services and communications company.|It's North American headquarters is in Meridian, Colorado.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_j_wordpress_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_j_wordpress.png',
    brand: 'Wordpress',
    wiki_url: 'https://en.wikipedia.org/wiki/Wordpress',
    hint: '_or_Pres_',
    clue: 'A free and open-source tool and a content management system (CMS).|Features include a plugin architecture and a template system.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_bacardi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_bacardi.png',
    brand: 'Bacardi',
    wiki_url: 'https://en.wikipedia.org/wiki/Bacardi',
    hint: '__card_',
    clue: 'The largest privately held, family-owned spirits company in the world.|Has a portfolio of more than 200 brands and labels.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_becel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_becel.png',
    brand: 'Becel',
    wiki_url: 'https://en.wikipedia.org/wiki/Becel',
    hint: 'Be___',
    clue: 'A brand of margarine produced by Unilever.|Sold in a number of countries, including Belgium, Brazil, Bulgaria, Canada, Denmark, Estonia and more.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_benq_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_benq.png',
    brand: 'Benq',
    wiki_url: 'https://en.wikipedia.org/wiki/Benq',
    hint: 'B_n_',
    clue: 'A Taiwanese multi-national company.|Was originally spun off from Acer in 2001 to provide a separate branded channel.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_braun_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_braun.png',
    brand: 'Braun',
    wiki_url: 'https://en.wikipedia.org/wiki/Braun',
    hint: '___un',
    clue: 'A German consumer products company based in Kronberg.|A wholly owned subsidiary of Procter & Gamble,.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_camel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_camel.png',
    brand: 'Camel',
    wiki_url: 'https://en.wikipedia.org/wiki/Camel',
    hint: 'C_m__',
    clue: 'A brand of cigarettes.|Introduced by American company R.J. Reynolds Tobacco in the summer of 1913.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_chivas_regal_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_chivas_regal.png',
    brand: 'Chivas Regal',
    wiki_url: 'https://en.wikipedia.org/wiki/Chivas Regal',
    hint: '__iv_s R_g_l',
    clue: 'A Blended Scotch Whisky.|It traces its roots back to 1801.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_chrysler_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_chrysler.png',
    brand: 'Chrysler',
    wiki_url: 'https://en.wikipedia.org/wiki/Chrysler',
    hint: '_hry_l__',
    clue: 'American automobile manufacturer headquartered in Auburn Hills, Michigan.|Is one of the "Big Three" American automobile manufacturers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_daimler_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_daimler.png',
    brand: 'Daimler',
    wiki_url: 'https://en.wikipedia.org/wiki/Daimler',
    hint: 'D_im_e_',
    clue: 'Was an independent British motor vehicle manufacturer.|Founded in London by H. J. Lawson in 1896.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_dawn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_dawn.png',
    brand: 'Dawn',
    wiki_url: 'https://en.wikipedia.org/wiki/Dawn',
    hint: 'Da__',
    clue: 'A brand of dishwashing liquid owned by Procter & Gamble.|Introduced in 1973, it is the best-selling brand of dishwashing liquid in the United States.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_dc_shoes_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_dc_shoes.png',
    brand: 'Dc Shoes',
    wiki_url: 'https://en.wikipedia.org/wiki/Dc Shoes',
    hint: 'DC _h__s',
    clue: 'American company that specializes in footwear for action sports.|Manufactures apparel, bags, accessories, hats, shirts, and posters.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_dolby_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_dolby.png',
    brand: 'Dolby',
    wiki_url: 'https://en.wikipedia.org/wiki/Dolby',
    hint: '___by',
    clue: 'An American company specializing in audio noise reduction and audio encoding/compression.|Licenses its technologies to consumer electronics manufacturers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_dunhill_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_dunhill.png',
    brand: 'Dunhill',
    wiki_url: 'https://en.wikipedia.org/wiki/Dunhill',
    hint: 'Dun___l',
    clue: 'A British luxury goods brand.|Specialising  in ready-to-wear, custom and bespoke menswear, leather goods, and accessories.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_gmc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_gmc.png',
    brand: 'Gmc',
    wiki_url: 'https://en.wikipedia.org/wiki/Gmc',
    hint: 'G_C',
    clue: 'An American automobile division of the American manufacturer General Motors (GM).|The company was founded in 1901.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_hasbro_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_hasbro.png',
    brand: 'Hasbro',
    wiki_url: 'https://en.wikipedia.org/wiki/Hasbro',
    hint: 'Ha_b_o',
    clue: 'An American multinational toy and board game company.|It is one of the largest toy makers in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_jansport_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_jansport.png',
    brand: 'Jansport',
    wiki_url: 'https://en.wikipedia.org/wiki/Jansport',
    hint: '_A__PO_T',
    clue: "American brand of backpacks and collegiate apparel,one of the world's largest apparel companies.|Founded in 1967 in Seattle, Washington, USA.",
    easy: true
  },
  {
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_japan_airlines.png',
    brand: 'Japan Airlines',
    wiki_url: 'https://en.wikipedia.org/wiki/Japan Airlines',
    hint: 'Ja_an A__l____',
    clue: 'The second largest airline in Japan.|It is headquartered in Shinagawa, Tokyo, Japan.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_nab_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_nab.png',
    brand: 'Nab',
    wiki_url: 'https://en.wikipedia.org/wiki/Nab',
    hint: 'NA_',
    clue: 'One of the four largest financial institutions in Australia in terms of market capitalisation and customers.|Founded in 1893.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_nickelodeon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_nickelodeon.png',
    brand: 'Nickelodeon',
    wiki_url: 'https://en.wikipedia.org/wiki/Nickelodeon',
    hint: '___kelo_e_n',
    clue: 'An American basic cable and satellite television network.|Most of its programming is aimed at children and adolescents.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_nokia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_nokia.png',
    brand: 'Nokia',
    wiki_url: 'https://en.wikipedia.org/wiki/Nokia',
    hint: '___ia',
    clue: 'Finnish multinational communications and information technology company.|Focuses on large-scale telecommunications infrastructures and online mapping service.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_picasa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_picasa.png',
    brand: 'Picasa',
    wiki_url: 'https://en.wikipedia.org/wiki/Picasa',
    hint: 'Pic_s_',
    clue: 'Is an image organizer and image viewer for organizing and editing digital photos.|Launched in 2002. Originally created by a company named Lifescape. Acquired by Google.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_sap_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_sap.png',
    brand: 'Sap',
    wiki_url: 'https://en.wikipedia.org/wiki/Sap',
    hint: 'SA_',
    clue: 'A German multinational software corporation.|Makes enterprise software to manage business operations and customer relations.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_sony_pictures_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_sony_pictures.png',
    brand: 'Sony Pictures',
    wiki_url: 'https://en.wikipedia.org/wiki/Sony Pictures',
    hint: 'S_n_ Pic___e_',
    clue: 'American entertainment subsidiary of Sony.|Produced, distributed, or co-distributed franchises such as Spider-Man, Men in Black, Underworld, and Resident Evil.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_walmart_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_walmart.png',
    brand: 'Walmart',
    wiki_url: 'https://en.wikipedia.org/wiki/Walmart',
    hint: 'Wa_m_r_',
    clue: 'An American multinational retail corporation that operates a chain of discount department and warehouse stores.|The company was founded by Sam Walton in 1962.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_windows_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_windows.png',
    brand: 'Windows',
    wiki_url: 'https://en.wikipedia.org/wiki/Windows',
    hint: 'Win_o__',
    clue: 'A metafamily of graphical operating systems developed, marketed, and sold by Microsoft.|Microsoft introduced it in 1985 as a graphical operating system shell.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_k_yale_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_k_yale.png',
    brand: 'Yale',
    wiki_url: 'https://en.wikipedia.org/wiki/Yale',
    hint: '_al_',
    clue: 'A private Ivy League research university in New Haven, Connecticut.|Founded in 1701 in Saybrook Colony as the "Collegiate School,".',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_abarth_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_abarth.png',
    brand: 'Abarth',
    wiki_url: 'https://en.wikipedia.org/wiki/Abarth',
    hint: 'A_a_th',
    clue: 'A racing car and road car maker founded by Carlo Abarth in 1949.|A fully owned subsidiary of FCA Italy S.p.A.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_bose_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_bose.png',
    brand: 'Bose',
    wiki_url: 'https://en.wikipedia.org/wiki/Bose',
    hint: 'B__e',
    clue: 'An American privately held corporation, based in Framingham, Massachusetts.|It specializes in audio equipment, founded in 1964.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_chevrolet_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_chevrolet.png',
    brand: 'Chevrolet',
    wiki_url: 'https://en.wikipedia.org/wiki/Chevrolet',
    hint: 'Che__ole_',
    clue: 'An American automobile division of the American manufacturer General Motors (GM).|Referred to as Chevy.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_ericsson_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_ericsson.png',
    brand: 'Ericsson',
    wiki_url: 'https://en.wikipedia.org/wiki/Ericsson',
    hint: 'E_i___on',
    clue: 'Multinational provider of communication technology and services.|Comprise services, software and infrastructure in information and communications technology.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_esso_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_esso.png',
    brand: 'Esso',
    wiki_url: 'https://en.wikipedia.org/wiki/Esso',
    hint: 'Es__',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_estee_lauder_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_estee_lauder.png',
    brand: 'Estee Lauder',
    wiki_url: 'https://en.wikipedia.org/wiki/Estee Lauder',
    hint: 'e___e lau_e_',
    clue: 'An American manufacturer.|Marketer of high-end skincare, makeup, fragrance and hair care products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_gamecube_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_gamecube.png',
    brand: 'Gamecube',
    wiki_url: 'https://en.wikipedia.org/wiki/Gamecube',
    hint: '_a__C_be',
    clue: 'A home video game console released by Nintendo on September 14, 2001.|Is the first Nintendo console to use optical discs for its primary storage medium.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_gamespot_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_gamespot.png',
    brand: 'Gamespot',
    wiki_url: 'https://en.wikipedia.org/wiki/Gamespot',
    hint: 'Ga_e___t',
    clue: 'A video gaming website that provides news, reviews, previews, downloads, and other information on video games.|The site was launched on May 1, 1996.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_gorenje_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_gorenje.png',
    brand: 'Gorenje',
    wiki_url: 'https://en.wikipedia.org/wiki/Gorenje',
    hint: 'Go__nj_',
    clue: 'The largest Slovenian manufacturer of white goods.|The company’s beginnings in 1950.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_hugo_boss_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_hugo_boss.png',
    brand: 'Hugo Boss',
    wiki_url: 'https://en.wikipedia.org/wiki/Hugo Boss',
    hint: 'H_go B__s',
    clue: 'A German luxury fashion and style brand.|It was Founded in 1924 in Metzingen, Germany.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_ibis_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_ibis.png',
    brand: 'Ibis',
    wiki_url: 'https://en.wikipedia.org/wiki/Ibis',
    hint: 'Ib__',
    clue: 'An international hotel company.|Opened its founding hotel in 1974.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_konica_minolta_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_konica_minolta.png',
    brand: 'Konica Minolta',
    wiki_url: 'https://en.wikipedia.org/wiki/Konica Minolta',
    hint: 'K__ic_ m__o__a',
    clue: 'Manufactures business and industrial imaging products.|A Japanese technology company headquartered in Marunouchi, Chiyoda, Tokyo.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_lipton_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_lipton.png',
    brand: 'Lipton',
    wiki_url: 'https://en.wikipedia.org/wiki/Lipton',
    hint: 'Lip_o_',
    clue: 'A brand of tea belonging to Unilever.|The company is named after its founder Thomas Lipton.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_lucky_strike_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_lucky_strike.png',
    brand: 'Lucky Strike',
    wiki_url: 'https://en.wikipedia.org/wiki/Lucky Strike',
    hint: 'L___y _trik_',
    clue: 'An American brand of cigarette owned by the British American Tobacco groups.|It was the top selling cigarette in the United States during the 1930s.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_malibu_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_malibu.png',
    brand: 'Malibu',
    wiki_url: 'https://en.wikipedia.org/wiki/Malibu',
    hint: '_a_ibu',
    clue: 'A flavored rum-based liqueur made with natural coconut extract.|The brand is owned by Pernod Ricard.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_mazda_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_mazda.png',
    brand: 'Mazda',
    wiki_url: 'https://en.wikipedia.org/wiki/Mazda',
    hint: '_az__',
    clue: 'It is a Japanese automaker based in Fuchū, Aki District, Hiroshima Prefecture, Japan.|In 2011, it was the fifteenth biggest automaker by production worldwide.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_oakley_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_oakley.png',
    brand: 'Oakley',
    wiki_url: 'https://en.wikipedia.org/wiki/Oakley',
    hint: 'O_kle_',
    clue: 'Manufactures sports performance equipment and lifestyle pieces.|It was started by James Jannard in 1975 out of his garage with an initial investment of $300.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_papa_johns_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_papa_johns.png',
    brand: 'Papa Johns',
    wiki_url: 'https://en.wikipedia.org/wiki/Papa Johns',
    hint: '_apa Joh__',
    clue: 'An American restaurant company.|It runs the third largest take-out and pizza delivery restaurant chain in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_pfizer_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_pfizer.png',
    brand: 'Pfizer',
    wiki_url: 'https://en.wikipedia.org/wiki/Pfizer',
    hint: 'Pf_ze_',
    clue: "American multinational pharmaceutical corporation.|One of the world's largest pharmaceutical companies by revenues.",
    easy: true
  },
  {
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_photoshop.png',
    brand: 'Photoshop',
    wiki_url: 'https://en.wikipedia.org/wiki/Photoshop',
    hint: 'Ph___shop',
    clue: 'Raster graphics editor developed and published by Adobe Systems for Windows and OS X.|Created in 1988 by Thomas and John Knoll.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_prudential_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_prudential.png',
    brand: 'Prudential',
    wiki_url: 'https://en.wikipedia.org/wiki/Prudential',
    hint: 'Pru_e_t__l',
    clue: 'Is a Fortune Global 500 and Fortune 500 company.|Started in Newark, New Jersey in 1875.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_rabobank_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_rabobank.png',
    brand: 'Rabobank',
    wiki_url: 'https://en.wikipedia.org/wiki/Rabobank',
    hint: 'R_b___nk',
    clue: 'It is a Dutch multinational banking and financial services company.|Founded in 1972.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_smirnoff_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_smirnoff.png',
    brand: 'Smirnoff',
    wiki_url: 'https://en.wikipedia.org/wiki/Smirnoff',
    hint: '_m_rn__f',
    clue: 'A brand of vodka owned and produced by the British company Diageo.|The brand began with a vodka distillery founded in Moscow by Pyotr Arsenievich Smirnov (1831–1898).',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_tbs_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_tbs.png',
    brand: 'Tbs',
    wiki_url: 'https://en.wikipedia.org/wiki/Tbs',
    hint: 'T_S',
    clue: 'An American basic cable and satellite television channel.|Carries a variety of programming, with a focus on comedy, along with some sports events.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_travelers_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_travelers.png',
    brand: 'Travelers',
    wiki_url: 'https://en.wikipedia.org/wiki/Travelers',
    hint: '__a_elers',
    clue: 'An American insurance company.|Founded in 1864 in Hartford.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_l_unesco_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_l_unesco.png',
    brand: 'Unesco',
    wiki_url: 'https://en.wikipedia.org/wiki/Unesco',
    hint: 'Une_c_',
    clue: 'A specialized agency of the United Nations.|Contribute to peace and security by promoting international collaboration through education, science, and culture.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_activision_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_activision.png',
    brand: 'Activision',
    wiki_url: 'https://en.wikipedia.org/wiki/Activision',
    hint: 'Ac__vi__on',
    clue: "An American video game publisher.|It was founded on October 1, 1979 and was the world's first independent developer and distributor of video games for gaming consoles.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_allstate_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_allstate.png',
    brand: 'Allstate',
    wiki_url: 'https://en.wikipedia.org/wiki/Allstate',
    hint: 'Al_s_a__',
    clue: 'The third largest personal lines insurer in the United States.|Founded in 1931.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_bnp_paribas_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_bnp_paribas.png',
    brand: 'Bnp Paribas',
    wiki_url: 'https://en.wikipedia.org/wiki/Bnp Paribas',
    hint: 'B_P _ar_b_s',
    clue: 'A French bank and financial services company.|It was formed through the merger of Banque Nationale de Paris and Paribas in 2000.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_credit_agricole_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_credit_agricole.png',
    brand: 'Credit Agricole',
    wiki_url: 'https://en.wikipedia.org/wiki/Credit Agricole',
    hint: 'Cr__i_ _g__c__e',
    clue: 'A French network of cooperative and mutual banks comprising the 39 Crédit Agricole Regional Banks. In 1990.|It became an international full-service banking group.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_dodge_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_dodge.png',
    brand: 'Dodge',
    wiki_url: 'https://en.wikipedia.org/wiki/Dodge',
    hint: 'D__g_',
    clue: 'An American brand of automobiles, minivans, and sport utility vehicles.|Manufactured by FCA US LLC (formerly known as Chrysler Group LLC).',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_dom_perignon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_dom_perignon.png',
    brand: 'Dom Perignon',
    wiki_url: 'https://en.wikipedia.org/wiki/Dom Perignon',
    hint: 'Do_ P_ri_n__',
    clue: 'Is a brand of vintage Champagne produced by the Champagne house Moët & Chandon.|It is named after a monk.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_doritos_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_doritos.png',
    brand: 'Doritos',
    wiki_url: 'https://en.wikipedia.org/wiki/Doritos',
    hint: 'Do_i__s',
    clue: 'A brand of seasoned tortilla chips.|Produced since 1964 by American food company Frito-Lay.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_friskies_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_friskies.png',
    brand: 'Friskies',
    wiki_url: 'https://en.wikipedia.org/wiki/Friskies',
    hint: 'Fr___i_s',
    clue: 'A brand of cat food.|Owned by Nestlé Purina PetCare Company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_furby_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_furby.png',
    brand: 'Furby',
    wiki_url: 'https://en.wikipedia.org/wiki/Furby',
    hint: 'F_r__',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_gain_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_gain.png',
    brand: 'Gain',
    wiki_url: 'https://en.wikipedia.org/wiki/Gain',
    hint: 'G__n',
    clue: 'A brand of detergent made by Procter & Gamble.|First introduced in 1969 as a powerful, stain-removing detergent.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_geox_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_geox.png',
    brand: 'Geox',
    wiki_url: 'https://en.wikipedia.org/wiki/Geox',
    hint: 'g_o_',
    clue: 'An Italian brand of shoe and clothing manufactured with waterproof/breathable fabrics.|The company was founded in 1995 by Mario Polegato.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_hollister_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_hollister.png',
    brand: 'Hollister',
    wiki_url: 'https://en.wikipedia.org/wiki/Hollister',
    hint: 'Ho_l_s_er',
    clue: 'An American lifestyle brand owned by Abercrombie & Fitch Co.|The concept was originally designed to attract consumers aged 14–18.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_kraft_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_kraft.png',
    brand: 'Kraft',
    wiki_url: 'https://en.wikipedia.org/wiki/Kraft',
    hint: 'Kr_f_',
    clue: "An American grocery manufacturing and processing conglomerate.|Founded in 2012 and it's headquartered in the Chicago suburb of Northfield, Illinois.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_lancia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_lancia.png',
    brand: 'Lancia',
    wiki_url: 'https://en.wikipedia.org/wiki/Lancia',
    hint: 'L_n_ia',
    clue: 'An Italian automobile manufacture.|Founded in 1906 by Vincenzo Lancia.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_mac_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_mac.png',
    brand: 'Mac',
    wiki_url: 'https://en.wikipedia.org/wiki/Mac',
    hint: 'M_C',
    clue: 'A manufacturer of cosmetics headquartered in New York City.|Founded in Toronto, Ontario, Canada by Frank Toskan and Frank Angelo in 1984.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_pampers_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_pampers.png',
    brand: 'Pampers',
    wiki_url: 'https://en.wikipedia.org/wiki/Pampers',
    hint: 'Pam___s',
    clue: 'An American brand of baby products marketed by Procter & Gamble.|Throughout the world, it is mostly known for its diapers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_petrochina_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_petrochina.png',
    brand: 'Petrochina',
    wiki_url: 'https://en.wikipedia.org/wiki/Petrochina',
    hint: '_etr_C__na',
    clue: "A Chinese oiland gas company.|It is China's biggest oil producer.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_pinterest_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_pinterest.png',
    brand: 'Pinterest',
    wiki_url: 'https://en.wikipedia.org/wiki/Pinterest',
    hint: 'P_n_ere_t',
    clue: 'A web and mobile application company, which operates an eponymous photo sharing website.|The site was founded by Ben Silbermann, Paul Sciarra and Evan Sharp.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_target_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_target.png',
    brand: 'Target',
    wiki_url: 'https://en.wikipedia.org/wiki/Target',
    hint: '_a_get',
    clue: 'An American retailing company, founded in 1902.|It is the second-largest discount retailer in the United States, Walmart being the largest.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_toblerone_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_toblerone.png',
    brand: 'Toblerone',
    wiki_url: 'https://en.wikipedia.org/wiki/Toblerone',
    hint: 'T_ble_o_e',
    clue: 'A Swiss chocolate bar brand owned by US confectionary company Mondelēz International, Inc.|Was created by Theodor Tobler in Bern, Switzerland in 1908.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_m_usa_today_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_m_usa_today.png',
    brand: 'Usa Today',
    wiki_url: 'https://en.wikipedia.org/wiki/Usa Today',
    hint: 'US_ T___y',
    clue: 'A national American daily middle-market newspaper.|It was founded by Al Neuharth on September 15, 1982.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_canon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_canon.png',
    brand: 'Canon',
    wiki_url: 'https://en.wikipedia.org/wiki/Canon',
    hint: 'C__o_',
    clue: 'A Japanese multinational corporation specialized in the manufacture of imaging and optical products.|Cameras, camcorders, photocopiers, printers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_capcom_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_capcom.png',
    brand: 'Capcom',
    wiki_url: 'https://en.wikipedia.org/wiki/Capcom',
    hint: '__pcom',
    clue: 'A Japanese developer and publisher of video games.|Known for creating Mega Man, Street Fighter, Resident Evil, Devil May Cry, Ace Attorney, and Monster Hunter.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_costa_coffee_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_costa_coffee.png',
    brand: 'Costa Coffee',
    wiki_url: 'https://en.wikipedia.org/wiki/Costa Coffee',
    hint: '_o_ta Cof___',
    clue: 'A British multinational coffeehouse company.|It is the second largest coffeehouse chain in the world behind Starbucks.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_deloitte_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_deloitte.png',
    brand: 'Deloitte',
    wiki_url: 'https://en.wikipedia.org/wiki/Deloitte',
    hint: 'De__i_t_',
    clue: 'Is the largest professional services network in the world.|Founded in 1845 by William Welch.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_denon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_denon.png',
    brand: 'Denon',
    wiki_url: 'https://en.wikipedia.org/wiki/Denon',
    hint: '__no_',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_descente_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_descente.png',
    brand: 'Descente',
    wiki_url: 'https://en.wikipedia.org/wiki/Descente',
    hint: '_e_ce_t_',
    clue: 'Sports apparel for athletes and individuals who value function, design, and outstanding performance.|Introduced the ski pant, the "demopant".',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_deutsche_bank_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_deutsche_bank.png',
    brand: 'Deutsche Bank',
    wiki_url: 'https://en.wikipedia.org/wiki/Deutsche Bank',
    hint: '_e_t_c__ Ban_',
    clue: 'A German global banking and financial services company based in Frankfurt.|Considered one of the most prestigious and most influential banks in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_diesel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_diesel.png',
    brand: 'Diesel',
    wiki_url: 'https://en.wikipedia.org/wiki/Diesel',
    hint: 'Dies__',
    clue: 'An Italian clothing company.|Sells high-priced denim jeans and other clothing and accessories aimed at a young adult market.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_esprit_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_esprit.png',
    brand: 'Esprit',
    wiki_url: 'https://en.wikipedia.org/wiki/Esprit',
    hint: 'Esp_i_',
    clue: 'Publicly owned manufacturer of clothing, footwear, accessories, jewellery and housewares.|The company is headquartered in Kowloon, Hong Kong, and Ratingen.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_flipboard_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_flipboard.png',
    brand: 'Flipboard',
    wiki_url: 'https://en.wikipedia.org/wiki/Flipboard',
    hint: 'F_i__oard',
    clue: 'A social-network aggregation, magazine-format mobile app localized in more than 20 languages.|Launched in 2010 by former Apple iPhone engineer, Evan Doll and Mike McCue.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_garmin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_garmin.png',
    brand: 'Garmin',
    wiki_url: 'https://en.wikipedia.org/wiki/Garmin',
    hint: 'Ga__in',
    clue: 'Develops consumer, aviation, outdoor, fitness, and marine technologies  for the Global Positioning System.|Founded in 1989 by Gary Burrell and Min Kao.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_gatorade_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_gatorade.png',
    brand: 'Gatorade',
    wiki_url: 'https://en.wikipedia.org/wiki/Gatorade',
    hint: '_a_o_a_e',
    clue: 'A manufacturer of sports-themed beverage and food products.|Currently manufactured by PepsiCo and distributed in over 80 countries.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_hot_wheels_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_hot_wheels.png',
    brand: 'Hot Wheels',
    wiki_url: 'https://en.wikipedia.org/wiki/Hot Wheels',
    hint: 'Ho_ _hee_s',
    clue: 'A brand of 1:64, 1:43, 1:18 and 1:50 scale die-cast toy cars.|Introduced by American toy maker Mattel in 196.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_imdb_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_imdb.png',
    brand: 'Imdb',
    wiki_url: 'https://en.wikipedia.org/wiki/Imdb',
    hint: '_M_B',
    clue: 'An online database of information related to films, television programs, and video games.|Actors and crew can post their own résumé and upload their photos.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_longines_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_longines.png',
    brand: 'Longines',
    wiki_url: 'https://en.wikipedia.org/wiki/Longines',
    hint: 'L__gi__s',
    clue: 'Is a watch company based in Saint-Imier, Switzerland.|Founded by Auguste Agassiz in 1832.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_lukoil_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_lukoil.png',
    brand: 'Lukoil',
    wiki_url: 'https://en.wikipedia.org/wiki/Lukoil',
    hint: 'L_koi_',
    clue: "Is Russia's second largest oil company and its second largest producer of oil as of 2005.|Headquartered in Moscow. Founded in 1991.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_mango_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_mango.png',
    brand: 'Mango',
    wiki_url: 'https://en.wikipedia.org/wiki/Mango',
    hint: 'M___o',
    clue: 'A clothing design and manufacturing company.|Founded in Barcelona, Catalonia (Spain) by brothers Isak Andic and Nahman Andic.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_nissan_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_nissan.png',
    brand: 'Nissan',
    wiki_url: 'https://en.wikipedia.org/wiki/Nissan',
    hint: '_issa_',
    clue: 'A Japanese multinational automobile manufacturer headquartered in Japan.|It is the leading Japanese automobile brand in China, Russia and Mexico.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_pedigree_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_pedigree.png',
    brand: 'Pedigree',
    wiki_url: 'https://en.wikipedia.org/wiki/Pedigree',
    hint: 'Pe__g_e_',
    clue: 'A subsidiary of the American group Mars, Incorporated specializing in pet food.|Factories in England at Melton Mowbray and Birstall, Leeds.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_pontiac_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_pontiac.png',
    brand: 'Pontiac',
    wiki_url: 'https://en.wikipedia.org/wiki/Pontiac',
    hint: 'P__t_ac',
    clue: 'Was a brand of automobile manufactured and sold by General Motors.|Introduced by General Motors in 1926.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_skittles_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_skittles.png',
    brand: 'Skittles',
    wiki_url: 'https://en.wikipedia.org/wiki/Skittles',
    hint: '___ttl_s',
    clue: 'Brand of fruit-flavoured sweets.|Currently produced and marketed by the Wrigley Company, a division of Mars, Inc.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_speed_stick_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_speed_stick.png',
    brand: 'Speed Stick',
    wiki_url: 'https://en.wikipedia.org/wiki/Speed Stick',
    hint: '_p_ed _tic_',
    clue: 'A brand of deodorant/antiperspirant that, comes in stick form.|Different types of it products include 24/7, Pro, Stain Guard, Irish Spring, and Original.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_tetley_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_tetley.png',
    brand: 'Tetley',
    wiki_url: 'https://en.wikipedia.org/wiki/Tetley',
    hint: 'Tetl__',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_tour_de_france_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_tour_de_france.png',
    brand: 'Tour De France',
    wiki_url: 'https://en.wikipedia.org/wiki/Tour De France',
    hint: 'To__ _e __an_e',
    clue: "An annual multiple stage bicycle race primarily held in France.|The race was first organized in1903 to increase paper sales for the magazine L'Auto.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_n_vauxhall_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_n_vauxhall.png',
    brand: 'Vauxhall',
    wiki_url: 'https://en.wikipedia.org/wiki/Vauxhall',
    hint: 'V_ux_a__',
    clue: 'A British automotive manufacturing and distribution company.|Company sells passenger cars and light commercial vehicles.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_baidu_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_baidu.png',
    brand: 'Baidu',
    wiki_url: 'https://en.wikipedia.org/wiki/Baidu',
    hint: '__id_',
    clue: 'A Chinese web services company.|Offers many services, including a Chinese language-search engine for websites, audio files and images.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_deutsche_post_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_deutsche_post.png',
    brand: 'Deutsche Post',
    wiki_url: 'https://en.wikipedia.org/wiki/Deutsche Post',
    hint: '_eu_sc__ p__t',
    clue: "The world's largest courier company.|Its headquarters in Bonn.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_dr_pepper_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_dr_pepper.png',
    brand: 'Dr Pepper',
    wiki_url: 'https://en.wikipedia.org/wiki/Dr Pepper',
    hint: '_r _ep__r',
    clue: 'A carbonated soft drink marketed as having a unique flavor.|The drink was created in the 1880s by Charles Alderton in Waco, Texas and first served around 1885.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_duplo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_duplo.png',
    brand: 'Duplo',
    wiki_url: 'https://en.wikipedia.org/wiki/Duplo',
    hint: '_u__o',
    clue: 'A product range of the construction toy Lego.|It was introduced in 1969, in four colors: red, yellow, blue, and white.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_epson_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_epson.png',
    brand: 'Epson',
    wiki_url: 'https://en.wikipedia.org/wiki/Epson',
    hint: '_ps__',
    clue: 'A Japanese electronics company.|Was founded in 1942 by Hisao Yamazaki.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_espn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_espn.png',
    brand: 'Espn',
    wiki_url: 'https://en.wikipedia.org/wiki/Espn',
    hint: '_SP_',
    clue: 'A U.S.-based global cable and satellite television channel.|Channel focuses on sports-related programming, sports news and talk shows, and other original programming.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_gap_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_gap.png',
    brand: 'Gap',
    wiki_url: 'https://en.wikipedia.org/wiki/Gap',
    hint: 'GA_',
    clue: 'An American multinational clothing and accessories retailer.|It was founded in 1969 by Donald Fisher and Doris F. Fisher.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_gigabyte_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_gigabyte.png',
    brand: 'Gigabyte',
    wiki_url: 'https://en.wikipedia.org/wiki/Gigabyte',
    hint: '_i___yte',
    clue: 'An international manufacturer and distributor of computer hardware products.|Was established in 1986 by Pei-Cheng Yeh.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_herbal_essences_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_herbal_essences.png',
    brand: 'Herbal Essences',
    wiki_url: 'https://en.wikipedia.org/wiki/Herbal Essences',
    hint: 'H_rb_l _s_e____',
    clue: 'Is a brand of shampoo, hair conditioner, hair stylers, and hair coloring by Clairol.|The brand was founded in 1972 and they have twelve hair product collections.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_hummel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_hummel.png',
    brand: 'Hummel',
    wiki_url: 'https://en.wikipedia.org/wiki/Hummel',
    hint: 'Hu_me_',
    clue: 'A sportswear company based in Denmark.|Manufactures apparel for football, futsal, handball, basketball, rugby league, Australian football, shinty and volleyball.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_kenzo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_kenzo.png',
    brand: 'Kenzo',
    wiki_url: 'https://en.wikipedia.org/wiki/Kenzo',
    hint: '_en__',
    clue: 'A French luxury house.|Founded in 1970 by Japanese designer Kenzo Takada.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_konami_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_konami.png',
    brand: 'Konami',
    wiki_url: 'https://en.wikipedia.org/wiki/Konami',
    hint: '___ami',
    clue: 'A Japanese developer and publisher of numerous toys, trading cards, anime, tokusatsu, slot machines, and video games.|Operates physical fitness clubs in Japan.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_leica_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_leica.png',
    brand: 'Leica',
    wiki_url: 'https://en.wikipedia.org/wiki/Leica',
    hint: '__i_a',
    clue: 'A German optics company. It manufactures cameras.|The predecessor of the company, formerly known as Ernst Leitz GmbH, is now three companies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_lloyds_bank_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_lloyds_bank.png',
    brand: 'Lloyds Bank',
    wiki_url: 'https://en.wikipedia.org/wiki/Lloyds Bank',
    hint: '_lo__s _ank',
    clue: 'A British retail and commercial bank with branches across England and Wales.|It has traditionally been considered one of the "Big Four" clearing banks.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_lotus_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_lotus.png',
    brand: 'Lotus',
    wiki_url: 'https://en.wikipedia.org/wiki/Lotus',
    hint: 'L___s',
    clue: 'A British manufacturer of sports and racing cars.|It was founded in 1952.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_martini_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_martini.png',
    brand: 'Martini',
    wiki_url: 'https://en.wikipedia.org/wiki/Martini',
    hint: 'Ma_ti__',
    clue: 'An Italian multinational alcoholic beverage company.|The company started in the mid-19th century.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_miele_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_miele.png',
    brand: 'Miele',
    wiki_url: 'https://en.wikipedia.org/wiki/Miele',
    hint: '__e_e',
    clue: 'German-based manufacturer of high-end domestic appliances, commercial equipment and fitted kitchens.|Founded in 1899 by Carl Miele and Reinhard Zinkann.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_philip_morris_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_philip_morris.png',
    brand: 'Philip Morris',
    wiki_url: 'https://en.wikipedia.org/wiki/Philip Morris',
    hint: '__ilip M__r__',
    clue: 'An American global cigarette and tobacco company.|The most recognized and best selling product of the company is Marlboro.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_qatar_airways_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_qatar_airways.png',
    brand: 'Qatar Airways',
    wiki_url: 'https://en.wikipedia.org/wiki/Qatar Airways',
    hint: 'Qat__ A_rw___',
    clue: 'The state-owned flag carrier[2][3] of Qatar.|The airline operates ahub-and-spoke network.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_seagate_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_seagate.png',
    brand: 'Seagate',
    wiki_url: 'https://en.wikipedia.org/wiki/Seagate',
    hint: 'Se_ga__',
    clue: 'An American-founded data storage company.|It was incorporated in 1978 as Shugart Technology.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_showtime_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_showtime.png',
    brand: 'Showtime',
    wiki_url: 'https://en.wikipedia.org/wiki/Showtime',
    hint: 'Sh_w___e',
    clue: 'An American premium cable and satellite television network.|Launched on July 1, 1976 on Times-Mirror Cable systems.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_statoil_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_statoil.png',
    brand: 'Statoil',
    wiki_url: 'https://en.wikipedia.org/wiki/Statoil',
    hint: 'S___oil',
    clue: 'A Norwegian multinational oil and gas company headquartered in Stavanger, Norway.|The largest operator on the Norwegian continental shelf, with 60% of the total production.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_subaru_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_subaru.png',
    brand: 'Subaru',
    wiki_url: 'https://en.wikipedia.org/wiki/Subaru',
    hint: '_ub_ru',
    clue: 'The automobile manufacturing division of Japanese transportation conglomerate Fuji Heavy Industries.|The twenty-second biggest automaker by production worldwide in 2012.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_tesco_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_tesco.png',
    brand: 'Tesco',
    wiki_url: 'https://en.wikipedia.org/wiki/Tesco',
    hint: 'T___o',
    clue: 'A British multinational grocery and general merchandise retailer.|It is the third largest retailer in the world measured by profits.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_uefa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_uefa.png',
    brand: 'Uefa',
    wiki_url: 'https://en.wikipedia.org/wiki/Uefa',
    hint: 'U__A',
    clue: 'The administrative body for association football in Europe.|It was founded on 15 June 1954 in Basel.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_vattenfall_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_vattenfall.png',
    brand: 'Vattenfall',
    wiki_url: 'https://en.wikipedia.org/wiki/Vattenfall',
    hint: 'V_tt_nfa__',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_veet_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_veet.png',
    brand: 'Veet',
    wiki_url: 'https://en.wikipedia.org/wiki/Veet',
    hint: '_e_t',
    clue: 'A current trademark of chemical depilatory internationally sold products.|Hair removal creams, mousses and gels, and waxes are produced under this brand.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_verizon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_verizon.png',
    brand: 'Verizon',
    wiki_url: 'https://en.wikipedia.org/wiki/Verizon',
    hint: '__ri_on',
    clue: 'An American broadband and telecommunications company.|It is the largest U.S. wireless communications service provider as of September 2014.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_vimeo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_vimeo.png',
    brand: 'Vimeo',
    wiki_url: 'https://en.wikipedia.org/wiki/Vimeo',
    hint: '_i_eo',
    clue: 'A video-sharing website in which users can upload, share and view videos.|It was founded in November 2004 by Jake Lodwick and Zach Klein.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_wilson_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_wilson.png',
    brand: 'Wilson',
    wiki_url: 'https://en.wikipedia.org/wiki/Wilson',
    hint: 'W_lso_',
    clue: 'An American sports equipment manufacturer based in Chicago, Illinois.|Since 1989, it has been a foreign subsidiary of the Finnish group Amer Sports.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_o_zenith_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_o_zenith.png',
    brand: 'Zenith',
    wiki_url: 'https://en.wikipedia.org/wiki/Zenith',
    hint: 'Zeni__',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_ajax_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_ajax.png',
    brand: 'Ajax',
    wiki_url: 'https://en.wikipedia.org/wiki/Ajax',
    hint: '_j_x',
    clue: 'Dutch professional football club based in Amsterdam.|The most successful club in the Netherlands.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_british_american_tobacco_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_british_american_tobacco.png',
    brand: 'British American Tobacco',
    wiki_url: 'https://en.wikipedia.org/wiki/British American Tobacco',
    hint: '_r____h ____ic__ ____cc_',
    clue: 'A British multinational tobacco company headquartered in London, United Kingdom.|It is one of the world’s five largest tobacco companies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_cadillac_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_cadillac.png',
    brand: 'Cadillac',
    wiki_url: 'https://en.wikipedia.org/wiki/Cadillac',
    hint: 'C__i__ac',
    clue: 'A division of U.S.-based General Motors (GM) that markets luxury vehicles worldwide.|Among the oldest automobile brands in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_carlsberg_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_carlsberg.png',
    brand: 'Carlsberg',
    wiki_url: 'https://en.wikipedia.org/wiki/Carlsberg',
    hint: '_a_lsber_',
    clue: 'A Danish brewing company founded in 1847.|It is the leading beer seller in Russia.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_comedy_central_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_comedy_central.png',
    brand: 'Comedy Central',
    wiki_url: 'https://en.wikipedia.org/wiki/Comedy Central',
    hint: '_o__dy __ntr__',
    clue: 'An American basic cable and satellite television channel.|Owned by Viacom Music and Entertainment Group.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_coty_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_coty.png',
    brand: 'Coty',
    wiki_url: 'https://en.wikipedia.org/wiki/Coty',
    hint: '_ot_',
    clue: 'A global beauty products manufacturer.|Founded in Paris, France by François Coty.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_credit_suisse_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_credit_suisse.png',
    brand: 'Credit Suisse',
    wiki_url: 'https://en.wikipedia.org/wiki/Credit Suisse',
    hint: '_re_i_ _u_ss_',
    clue: 'A Switzerland-based multinational financial services holding company.|Founded by Alfred Escher in 1856 under the name Schweizerische Kreditanstalt.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_gopro_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_gopro.png',
    brand: 'Gopro',
    wiki_url: 'https://en.wikipedia.org/wiki/Gopro',
    hint: '___ro',
    clue: 'An American corporation.|Develops, manufactures and markets high-definition camcorders, often used in extreme-action video photography.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_grundig_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_grundig.png',
    brand: 'Grundig',
    wiki_url: 'https://en.wikipedia.org/wiki/Grundig',
    hint: 'G_und__',
    clue: 'A German full range manufacturer of White Goods, Personal Care Products and Home Electronics.|Established in 1930 in Nuremberg by Max Grundig.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_ing_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_ing.png',
    brand: 'Ing',
    wiki_url: 'https://en.wikipedia.org/wiki/Ing',
    hint: '_NG',
    clue: 'A Dutch multinational banking and financial services corporation headquartered in Amsterdam.|Was founded in 1991  through a merger.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_lavazza_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_lavazza.png',
    brand: 'Lavazza',
    wiki_url: 'https://en.wikipedia.org/wiki/Lavazza',
    hint: 'L_va_z_',
    clue: 'Is an Italian manufacturer of coffee products.|Founded in Turin in 1895.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_lenovo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_lenovo.png',
    brand: 'Lenovo',
    wiki_url: 'https://en.wikipedia.org/wiki/Lenovo',
    hint: '_eno_o',
    clue: 'A Chinese multinational computer technology company with.|It designs, develops, manufactures and sells personal computers, tablet computers, smartphones.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_mikasa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_mikasa.png',
    brand: 'Mikasa',
    wiki_url: 'https://en.wikipedia.org/wiki/Mikasa',
    hint: 'M_k_sa',
    clue: 'A  sports equipment company with headquarters in Japan.|Their football, basketball, volleyball and handball are often used for official matches and games.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_motogp_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_motogp.png',
    brand: 'Motogp',
    wiki_url: 'https://en.wikipedia.org/wiki/Motogp',
    hint: 'Mo__GP',
    clue: 'The premier championship of motorcycle road racing.|Currently divided into three classes: MotoGP, Moto2 and Moto.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_novartis_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_novartis.png',
    brand: 'Novartis',
    wiki_url: 'https://en.wikipedia.org/wiki/Novartis',
    hint: 'No_a_t__',
    clue: 'Swiss multinational pharmaceutical company.|Manufactures such drugs as clozapine, diclofena, carbamazepine, valsartan and imatinib mesylate.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_pall_mall_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_pall_mall.png',
    brand: 'Pall Mall',
    wiki_url: 'https://en.wikipedia.org/wiki/Pall Mall',
    hint: '_al_ Ma__',
    clue: 'A brand of cigarettes produced by R. J. Reynolds Tobacco Company.|It was introduced in 1899 by the Butler & Butler Company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_pantene_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_pantene.png',
    brand: 'Pantene',
    wiki_url: 'https://en.wikipedia.org/wiki/Pantene',
    hint: '_a_t_ne',
    clue: 'A brand of hair care products owned by Procter & Gamble.|Introduced in 1945 by Hoffmann, which branded the name based on panthenol as a shampoo ingredient.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_reef_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_reef.png',
    brand: 'Reef',
    wiki_url: 'https://en.wikipedia.org/wiki/Reef',
    hint: 'Re__',
    clue: 'A brand of casual sandals, known as Thongs.|Two Argentine brothers, Fernando and Santiago Aguerre, created their brand in the 1980s.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_six_flags_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_six_flags.png',
    brand: 'Six Flags',
    wiki_url: 'https://en.wikipedia.org/wiki/Six Flags',
    hint: 'S_x F___s',
    clue: "The world's largest amusement park corporation based on number of properties in Mexico, the US, and Canada.|It was founded in Texas and took its name from its first property.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_sodexo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_sodexo.png',
    brand: 'Sodexo',
    wiki_url: 'https://en.wikipedia.org/wiki/Sodexo',
    hint: 'Sod__o',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_sprint_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_sprint.png',
    brand: 'Sprint',
    wiki_url: 'https://en.wikipedia.org/wiki/Sprint',
    hint: 'Spri__',
    clue: 'An American telecommunications holding company.|Provides wireless services and is a major global Internet carrier.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_tefal_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_tefal.png',
    brand: 'Tefal',
    wiki_url: 'https://en.wikipedia.org/wiki/Tefal',
    hint: 'Te___',
    clue: 'A French cookware and small appliance manufacturer.|The company is known for creating the non-stick cookware category and for frying products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_turkish_airlines_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_turkish_airlines.png',
    brand: 'Turkish Airlines',
    wiki_url: 'https://en.wikipedia.org/wiki/Turkish Airlines',
    hint: '__r_ish __r___e_',
    clue: 'The national flag carrier airline of Turkey.|Headquartered in the Atatürk Airport in Yeşilköy, Bakırköy, Istanbul.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_p_united_colors_of_benetton_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_p_united_colors_of_benetton.png',
    brand: 'United Colors Of Benetton',
    wiki_url: 'https://en.wikipedia.org/wiki/United Colors Of Benetton',
    hint: 'U_____ _o___s _f _____t_n',
    clue: 'A global fashion brand, based in Ponzano Veneto, Italy.|The name comes from the Benetton family who founded the company in 1965.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_blizzard_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_blizzard.png',
    brand: 'Blizzard',
    wiki_url: 'https://en.wikipedia.org/wiki/Blizzard',
    hint: '_l_z__rd',
    clue: 'An American video game developer and publisher.|Founded February 8, 1991 under the name Silicon & Synapse.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_buick_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_buick.png',
    brand: 'Buick',
    wiki_url: 'https://en.wikipedia.org/wiki/Buick',
    hint: 'B_i__',
    clue: 'An American automobile division of the American manufacturer General Motors.|The oldest active North American automotive maker.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_bvlgari_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_bvlgari.png',
    brand: 'Bvlgari',
    wiki_url: 'https://en.wikipedia.org/wiki/Bvlgari',
    hint: '_vlg_r_',
    clue: 'An Italian jewelry and luxury goods brand.|Produces and markets several product lines including jewelry, watches, fragrances, accessories, and hotels.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_chase_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_chase.png',
    brand: 'Chase',
    wiki_url: 'https://en.wikipedia.org/wiki/Chase',
    hint: '__a_e',
    clue: 'A national bank that constitutes the consumer and commercial banking subsidiary.|Founded in September 1, 1799, as Bank of the Manhattan Company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_durex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_durex.png',
    brand: 'Durex',
    wiki_url: 'https://en.wikipedia.org/wiki/Durex',
    hint: 'D__e_',
    clue: 'It is the trademarked name for a range of condoms that were made by United Kingdom-based SSL International.|This company was sold to Reckitt Benckiser in July 2010.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_grolsch_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_grolsch.png',
    brand: 'Grolsch',
    wiki_url: 'https://en.wikipedia.org/wiki/Grolsch',
    hint: 'Gro__c_',
    clue: 'A Dutch brewery.|Founded in 1615 by Willem Neerfeldt in Groenlo.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_guess_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_guess.png',
    brand: 'Guess',
    wiki_url: 'https://en.wikipedia.org/wiki/Guess',
    hint: '_u_s_',
    clue: 'An American upscale clothing brand and retailer.|Markets other fashion accessories besides clothes, such as watches, jewelry and perfumes.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_ign_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_ign.png',
    brand: 'Ign',
    wiki_url: 'https://en.wikipedia.org/wiki/Ign',
    hint: '_GN',
    clue: 'It is an entertainment website founded by media entrepreneur Chris Anderson in September 1996.|Focuses on video games, films, music and other media.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_logitech_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_logitech.png',
    brand: 'Logitech',
    wiki_url: 'https://en.wikipedia.org/wiki/Logitech',
    hint: '____tech',
    clue: 'Is a Swiss global provider of personal computer and tablets accessories.|It was co-founded in Apples, Vaud, Switzerland, in 1981.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_mobil_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_mobil.png',
    brand: 'Mobil',
    wiki_url: 'https://en.wikipedia.org/wiki/Mobil',
    hint: '_o_i_',
    clue: 'A major Anglo-American oil company.|Merged with Exxon in 1999 to form a parent company called ExxonMobil.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_movistar_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_movistar.png',
    brand: 'Movistar',
    wiki_url: 'https://en.wikipedia.org/wiki/Movistar',
    hint: 'Mov____r',
    clue: 'It is the major Spanish mobile phone operator owned by Telefónica S.A.|The brand has been in use in Spain since the launch of GSM services in 1995.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_nespresso_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_nespresso.png',
    brand: 'Nespresso',
    wiki_url: 'https://en.wikipedia.org/wiki/Nespresso',
    hint: 'N_spre_s_',
    clue: 'The brand name of Nestlé Nespresso S.A., an operating unit of the Nestlé Group.|It was invented and patented by Eric Favre in 1976, an employee of Nestlé.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_neutrogena_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_neutrogena.png',
    brand: 'Neutrogena',
    wiki_url: 'https://en.wikipedia.org/wiki/Neutrogena',
    hint: '_eu_rog__a',
    clue: 'An American brand of skin care, hair care and cosmetics,.|That is headquartered in Los Angeles, California.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_nikon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_nikon.png',
    brand: 'Nikon',
    wiki_url: 'https://en.wikipedia.org/wiki/Nikon',
    hint: '_ik__',
    clue: 'It is a Japanese multinational corporation headquartered in Tokyo, Japan.|Specializes in optics and imaging products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_oracle_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_oracle.png',
    brand: 'Oracle',
    wiki_url: 'https://en.wikipedia.org/wiki/Oracle',
    hint: 'Ora__e',
    clue: 'It is an object-relational database management system.|This database system comprises at least one instance of the application, along with data storage.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_oxford_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_oxford.png',
    brand: 'Oxford',
    wiki_url: 'https://en.wikipedia.org/wiki/Oxford',
    hint: 'Ox_or_',
    clue: "A collegiate research university located in Oxford, England.|Oldest university in the English-speaking world, and the world's second-oldest surviving university.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_pagani_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_pagani.png',
    brand: 'Pagani',
    wiki_url: 'https://en.wikipedia.org/wiki/Pagani',
    hint: 'p___ni',
    clue: 'An Italian manufacturer of sports cars and carbon fibre.|The company was founded in 1992.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_panasonic_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_panasonic.png',
    brand: 'Panasonic',
    wiki_url: 'https://en.wikipedia.org/wiki/Panasonic',
    hint: '__naso_ic',
    clue: 'A Japanese multinational electronics corporation headquartered in Kadoma, Osaka, Japan.|The company has grown to become one of the largest Japanese electronics.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_premier_league_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_premier_league.png',
    brand: 'Premier League',
    wiki_url: 'https://en.wikipedia.org/wiki/Premier League',
    hint: '_r_mi_r L__g__',
    clue: "An English professional league for men's association football clubs.|Founded on February 20th, 1992.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_smart_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_smart.png',
    brand: 'Smart',
    wiki_url: 'https://en.wikipedia.org/wiki/Smart',
    hint: 'S___t',
    clue: 'A division of Daimler AG.|Marketed a range of microcar and subcompact vehicles and has its primary assembly plant in Hambach, France.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_q_star_alliance_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_q_star_alliance.png',
    brand: 'Star Alliance',
    wiki_url: 'https://en.wikipedia.org/wiki/Star Alliance',
    hint: '__a_ A___ance',
    clue: "The world's largest global airline alliance.|Founded on May 14, 1997.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_acura_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_acura.png',
    brand: 'Acura',
    wiki_url: 'https://en.wikipedia.org/wiki/Acura',
    hint: 'A___a',
    clue: 'The luxury vehicle division of Japanese automaker Honda.|The brand was launched in the United States and Canada in March 1986.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_aldi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_aldi.png',
    brand: 'Aldi',
    wiki_url: 'https://en.wikipedia.org/wiki/Aldi',
    hint: '__di',
    clue: 'It is a leading global discount supermarket chain with over 9,000 stores in 18 countries.|The earliest roots of the company trace back to 1913.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_bank_of_america_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_bank_of_america.png',
    brand: 'Bank Of America',
    wiki_url: 'https://en.wikipedia.org/wiki/Bank Of America',
    hint: 'B___ o_ _me_ic_',
    clue: 'An American multinational banking and financial services corporation.|Headquartered in Charlotte, North Carolina.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_blockbuster_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_blockbuster.png',
    brand: 'Blockbuster',
    wiki_url: 'https://en.wikipedia.org/wiki/Blockbuster',
    hint: 'Bloc_b__t__',
    clue: 'American-based provider of home movie and video game rental services.|Due to competition from Netflix and Redbox, it lost significant revenue.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_china_telecom_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_china_telecom.png',
    brand: 'China Telecom',
    wiki_url: 'https://en.wikipedia.org/wiki/China Telecom',
    hint: '__in_ Te_ec__',
    clue: 'A Chinese state-owned telecommunication company.|It has been listed on the Hong Kong and New York stock exchanges since 2002.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_davidoff_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_davidoff.png',
    brand: 'Davidoff',
    wiki_url: 'https://en.wikipedia.org/wiki/Davidoff',
    hint: '___id_ff',
    clue: 'Is a Swiss luxury tobacco goods brand name.|Its cigarette brand is currently owned by Imperial Tobacco.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_dreamcast_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_dreamcast.png',
    brand: 'Dreamcast',
    wiki_url: 'https://en.wikipedia.org/wiki/Dreamcast',
    hint: '_ream_as_',
    clue: 'A home video game console that was released by Sega.|It was the first entry in the sixth generation of video game consoles, preceding the PlayStation 2.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_europcar_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_europcar.png',
    brand: 'Europcar',
    wiki_url: 'https://en.wikipedia.org/wiki/Europcar',
    hint: 'E__opc__',
    clue: 'A French car rental company founded in 1949 in Paris.|Since May 2006, Europcar has been owned by Eurazeo, one of the top listed investment companies in Europe.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_fox_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_fox.png',
    brand: 'Fox',
    wiki_url: 'https://en.wikipedia.org/wiki/Fox',
    hint: 'Fo_',
    clue: 'The network is headquartered on Pico Boulevard in Los Angeles.|It is an American commercial broadcast television network.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_givenchy_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_givenchy.png',
    brand: 'Givenchy',
    wiki_url: 'https://en.wikipedia.org/wiki/Givenchy',
    hint: '__v__chy',
    clue: 'Luxury French brand of haute couture clothing, accessories and, perfumes and cosmetics.|Founded in 1952 by designer Hubert de Givenchy.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_goldman_sachs_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_goldman_sachs.png',
    brand: 'Goldman Sachs',
    wiki_url: 'https://en.wikipedia.org/wiki/Goldman Sachs',
    hint: '_ol_m__ _ac_s',
    clue: 'An American multinational investment banking firm.|Founded in 1869 and is headquartered at 200 West Street in the Lower Manhattan area of New York City.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_henkel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_henkel.png',
    brand: 'Henkel',
    wiki_url: 'https://en.wikipedia.org/wiki/Henkel',
    hint: 'H_n_el',
    clue: 'A manufacturing company.|Makes various chemical products including detergents and adhesives.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_hennessy_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_hennessy.png',
    brand: 'Hennessy',
    wiki_url: 'https://en.wikipedia.org/wiki/Hennessy',
    hint: '_e___ssy',
    clue: "A cognac house with headquarters in Cognac, France.|The world's largest Cognac producer.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_java_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_java.png',
    brand: 'Java',
    wiki_url: 'https://en.wikipedia.org/wiki/Java',
    hint: 'J_v_',
    clue: 'A general-purpose computer programming language.|Intended to let application developers "write once, run anywhere" (WORA).',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_klm_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_klm.png',
    brand: 'Klm',
    wiki_url: 'https://en.wikipedia.org/wiki/Klm',
    hint: 'KL_',
    clue: 'Is the flag carrier airline of the Netherlands.|Founded in 1919.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_koenigsegg_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_koenigsegg.png',
    brand: 'Koenigsegg',
    wiki_url: 'https://en.wikipedia.org/wiki/Koenigsegg',
    hint: 'Ko_ni___gg',
    clue: 'A Swedish manufacturer of high-performance sports cars.|Also known as hypercars.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_lotto_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_lotto.png',
    brand: 'Lotto',
    wiki_url: 'https://en.wikipedia.org/wiki/Lotto',
    hint: '_o_t_',
    clue: 'An Italian sportswear manufacturer. Its products are now distributed in more than 60 countries.|Was established in 1973 by the Caberlotto family in Montebelluna.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_malaysia_airlines_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_malaysia_airlines.png',
    brand: 'Malaysia Airlines',
    wiki_url: 'https://en.wikipedia.org/wiki/Malaysia Airlines',
    hint: 'M_l_y___ Ai___n__',
    clue: 'Headquarters are located on the grounds of Sultan Abdul Aziz Shah Airport.|Flag carrier of Malaysia and a member of the Oneworld airline alliance.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_matchbox_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_matchbox.png',
    brand: 'Matchbox',
    wiki_url: 'https://en.wikipedia.org/wiki/Matchbox',
    hint: 'M_tc_b__',
    clue: 'Popular toy brand.|Introduced by Lesney Products in 1953 and is now owned by Mattel, Inc.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_mccain_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_mccain.png',
    brand: 'Mccain',
    wiki_url: 'https://en.wikipedia.org/wiki/Mccain',
    hint: 'M_Ca_n',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_mgm_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_mgm.png',
    brand: 'Mgm',
    wiki_url: 'https://en.wikipedia.org/wiki/Mgm',
    hint: 'M_M',
    clue: 'It is an American media company.|Involved primarily in the production and distribution of films and television programs.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_novotel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_novotel.png',
    brand: 'Novotel',
    wiki_url: 'https://en.wikipedia.org/wiki/Novotel',
    hint: 'Nov__e_',
    clue: 'A mid-scale hotel brand within the Accor group.|Has close to 400 hotels and resorts in 60 countries.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_pacha_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_pacha.png',
    brand: 'Pacha',
    wiki_url: 'https://en.wikipedia.org/wiki/Pacha',
    hint: 'P__h_',
    clue: 'Is a nightclub franchise with headquarters in Ibiza, Spain.|It was first opened in Sitges outside Barcelona in 1967.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_patek_philippe_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_patek_philippe.png',
    brand: 'Patek Philippe',
    wiki_url: 'https://en.wikipedia.org/wiki/Patek Philippe',
    hint: '_a__k P____ppe',
    clue: 'A Swiss ultra-luxury watch manufacturer.|Designs and manufactures timepieces and movements including some of the most complicated mechanical watches.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_proton_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_proton.png',
    brand: 'Proton',
    wiki_url: 'https://en.wikipedia.org/wiki/Proton',
    hint: '_roto_',
    clue: 'Malaysian automobile manufacturer.|The company was established in 1983.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_quiznos_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_quiznos.png',
    brand: 'Quiznos',
    wiki_url: 'https://en.wikipedia.org/wiki/Quiznos',
    hint: 'Quiz___',
    clue: 'A franchised fast-food restaurant brand based in Denver, Colorado.|Founded in 1981 by Jimmy Lambatos and it specializes in offering toasted submarine sandwiches.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_repsol_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_repsol.png',
    brand: 'Repsol',
    wiki_url: 'https://en.wikipedia.org/wiki/Repsol',
    hint: 'Rep_o_',
    clue: 'Is an integrated global energy company based in Madrid, Spain.|INH created the brand in October 1987 as a wholly owned subsidiary.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_symantec_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_symantec.png',
    brand: 'Symantec',
    wiki_url: 'https://en.wikipedia.org/wiki/Symantec',
    hint: '__ma_t_c',
    clue: 'The company makes security, storage, backup and availability software and offers professional services to support its software.|Founded in 1982 by Gary Hendrix.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_the_body_shop_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_the_body_shop.png',
    brand: 'The Body Shop',
    wiki_url: 'https://en.wikipedia.org/wiki/The Body Shop',
    hint: '__e Body _h__',
    clue: "Consisting of 1,200 products, including cosmetics and make-up in its 2,500 franchised stores.|Founded in 1976 by Anita Roddick and is now part owned by L'Oréal.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_tumblr_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_tumblr.png',
    brand: 'Tumblr',
    wiki_url: 'https://en.wikipedia.org/wiki/Tumblr',
    hint: '_umb_r',
    clue: 'A microblogging platform and social networking website founded by David Karp.|The service allows users to post multimedia and other content to a short-form blog.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_vanish_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_vanish.png',
    brand: 'Vanish',
    wiki_url: 'https://en.wikipedia.org/wiki/Vanish',
    hint: 'Va__sh',
    clue: 'A brand of toilet bowl cleaner produced by S. C. Johnson in North America.|It was obtained through the purchase of The Drackett Company in 1992.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_r_wnba_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_r_wnba.png',
    brand: 'Wnba',
    wiki_url: 'https://en.wikipedia.org/wiki/Wnba',
    hint: '_NB_',
    clue: 'A basketball association in the United States.|The league was founded on April 24, 1996.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_20th_century_fox_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_20th_century_fox.png',
    brand: '20Th Century Fox',
    wiki_url: 'https://en.wikipedia.org/wiki/20Th Century Fox',
    hint: '2___ _en_u_y F__',
    clue: 'An American film studio, distributor and one of the six major American film studios.|It was founded on May 31, 1935.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_autozone_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_autozone.png',
    brand: 'Autozone',
    wiki_url: 'https://en.wikipedia.org/wiki/Autozone',
    hint: 'A_t_Z__e',
    clue: 'An American store.|Second-largest retailer of aftermarket automotive parts and accessories in the United States.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_bugatti_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_bugatti.png',
    brand: 'Bugatti',
    wiki_url: 'https://en.wikipedia.org/wiki/Bugatti',
    hint: 'B_g__ti',
    clue: 'A French car manufacturer of high-performance automobiles.|Known for their design beauty.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_cathay_pacific_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_cathay_pacific.png',
    brand: 'Cathay Pacific',
    wiki_url: 'https://en.wikipedia.org/wiki/Cathay Pacific',
    hint: 'C_t_a_ Pa____c',
    clue: 'The flag carrier airline of Hong Kong.|Main hub located at Hong Kong International Airport.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_chicco_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_chicco.png',
    brand: 'Chicco',
    wiki_url: 'https://en.wikipedia.org/wiki/Chicco',
    hint: 'Ch_cc_',
    clue: 'An Italian baby care brand established in 1958.|Clothing and equipment for babies and toddlers, including strollers, high chairs, car seats and toys.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_cigna_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_cigna.png',
    brand: 'Cigna',
    wiki_url: 'https://en.wikipedia.org/wiki/Cigna',
    hint: '_i_n_',
    clue: 'A global health services organization.|Its insurance subsidiaries are major providers of medical, dental, disability, life and accident insurance.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_daihatsu_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_daihatsu.png',
    brand: 'Daihatsu',
    wiki_url: 'https://en.wikipedia.org/wiki/Daihatsu',
    hint: 'Da__a__u',
    clue: 'The oldest Japanese car manufacturer.|The headquarters are located in Ikeda, Osaka Prefecture.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_gulf_air_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_gulf_air.png',
    brand: 'Gulf Air',
    wiki_url: 'https://en.wikipedia.org/wiki/Gulf Air',
    hint: 'Gu__ A_r',
    clue: 'The principal flag carrier of Bahrain.|Founded in 1950.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_hitachi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_hitachi.png',
    brand: 'Hitachi',
    wiki_url: 'https://en.wikipedia.org/wiki/Hitachi',
    hint: '_i_a_hi',
    clue: 'Japanese multinational conglomerate company headquartered in Chiyoda, Tokyo, Japan.|A highly diversified company that operates eleven business segments.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_instagram_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_instagram.png',
    brand: 'Instagram',
    wiki_url: 'https://en.wikipedia.org/wiki/Instagram',
    hint: 'In_tag_a_',
    clue: 'An online mobile photo-sharing, video-sharing and social networking service.|Enables its users to take pictures and videos, and share.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_karcher_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_karcher.png',
    brand: 'Karcher',
    wiki_url: 'https://en.wikipedia.org/wiki/Karcher',
    hint: '_ar_h_r',
    clue: 'Headquartered in Winnenden, Germany.|It produces both cleaning equipment and full cleaning systems.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_maestro_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_maestro.png',
    brand: 'Maestro',
    wiki_url: 'https://en.wikipedia.org/wiki/Maestro',
    hint: '_ae__ro',
    clue: 'A multi-national debit card service.|Owned by MasterCard that was founded in 1992.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_merrill_lynch_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_merrill_lynch.png',
    brand: 'Merrill Lynch',
    wiki_url: 'https://en.wikipedia.org/wiki/Merrill Lynch',
    hint: 'Mer_il_ _y___',
    clue: 'The wealth management division of Bank of America.|Employs over 15,000 financial advisors and manages $2.2 trillion in client assets.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_michael_kors_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_michael_kors.png',
    brand: 'Michael Kors',
    wiki_url: 'https://en.wikipedia.org/wiki/Michael Kors',
    hint: 'M__hae_ _or_',
    clue: 'A fashion company established in 1981 by American designer Michael Kors.|Company is known for handbags and accessories.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_nhl_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_nhl.png',
    brand: 'Nhl',
    wiki_url: 'https://en.wikipedia.org/wiki/Nhl',
    hint: 'N_L',
    clue: 'A professional ice hockey league composed of 30 member clubs.|It was organized on November 26, 1917, in Montreal, Quebec.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_pepe_jeans_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_pepe_jeans.png',
    brand: 'Pepe Jeans',
    wiki_url: 'https://en.wikipedia.org/wiki/Pepe Jeans',
    hint: 'Pepe __an_',
    clue: 'Denim and casual wear jeans brand.|The brand today has presence in more than 80 countries across the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_pepsico_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_pepsico.png',
    brand: 'Pepsico',
    wiki_url: 'https://en.wikipedia.org/wiki/Pepsico',
    hint: '__p_iCo',
    clue: 'An American multinational food and beverage corporation.|Manufacturing, marketing and distribution of grain-based snack foods, beverages, and other products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_popsicle_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_popsicle.png',
    brand: 'Popsicle',
    wiki_url: 'https://en.wikipedia.org/wiki/Popsicle',
    hint: '___sic_e',
    clue: 'A North American brand of ice pop by Unilever.|It was introduced in 1922.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_rover_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_rover.png',
    brand: 'Rover',
    wiki_url: 'https://en.wikipedia.org/wiki/Rover',
    hint: 'R_v__',
    clue: 'Absorbed into Leyland Motor Corporation in 1967.|A British car manufacturing company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_safeway_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_safeway.png',
    brand: 'Safeway',
    wiki_url: 'https://en.wikipedia.org/wiki/Safeway',
    hint: '_af_w_y',
    clue: 'An American supermarket chain.|Acquired by private equity investors led by Cerberus Capital Management in January 2015.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_stanford_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_stanford.png',
    brand: 'Stanford',
    wiki_url: 'https://en.wikipedia.org/wiki/Stanford',
    hint: '_t__fo_d',
    clue: "A private research university in Stanford, California.|One of the world's most prestigious institutions, with the top position in numerous rankings and measures in the US.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_s_zott_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_s_zott.png',
    brand: 'Zott',
    wiki_url: 'https://en.wikipedia.org/wiki/Zott',
    hint: 'Z__t',
    clue: 'A European dairy company.|Founded in Mertingen, Germany in 1926.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_air_canada_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_air_canada.png',
    brand: 'Air Canada',
    wiki_url: 'https://en.wikipedia.org/wiki/Air Canada',
    hint: 'Air _a__da',
    clue: 'It is the flag carrier and largest airline of Canada.|It was founded in 1936.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_bad_robot_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_bad_robot.png',
    brand: 'Bad Robot',
    wiki_url: 'https://en.wikipedia.org/wiki/Bad Robot',
    hint: '_ad __b_t',
    clue: 'An American film and television production company.|Owned by J. J. Abrams.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_chupa_chups_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_chupa_chups.png',
    brand: 'Chupa Chups',
    wiki_url: 'https://en.wikipedia.org/wiki/Chupa Chups',
    hint: 'Chu__ C_up_',
    clue: 'A popular Spanish brand of lollipop.|The brand was founded in 1958, and is currently owned by the Italian multinational corporation Perfetti Van Melle.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_element_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_element.png',
    brand: 'Element',
    wiki_url: 'https://en.wikipedia.org/wiki/Element',
    hint: 'Ele__n_',
    clue: 'A skateboard company.|Founded in 1992 by Johnny Schillereff.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_fisher_price_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_fisher_price.png',
    brand: 'Fisher Price',
    wiki_url: 'https://en.wikipedia.org/wiki/Fisher Price',
    hint: '_i_he_ _ric_',
    clue: 'Is an American company that produces toys for infants and children.|Founded in 1930.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_fis_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_fis.png',
    brand: 'Fis',
    wiki_url: 'https://en.wikipedia.org/wiki/Fis',
    hint: 'FI_',
    clue: 'An international provider of financial services technology and outsourcing services.|Headquartered in Jacksonville, Florida and employs more than 55,000 people worldwide.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_green_giant_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_green_giant.png',
    brand: 'Green Giant',
    wiki_url: 'https://en.wikipedia.org/wiki/Green Giant',
    hint: 'G_een _ia__',
    clue: "Brands of frozen and canned vegetables owned by General Mills.|The company's mascot is the Jolly Green Giant.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_hertz_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_hertz.png',
    brand: 'Hertz',
    wiki_url: 'https://en.wikipedia.org/wiki/Hertz',
    hint: 'H___z',
    clue: 'An American car rental company with international locations in 145 countries worldwide.|The largest U.S. car rental company by sale.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_holden_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_holden.png',
    brand: 'Holden',
    wiki_url: 'https://en.wikipedia.org/wiki/Holden',
    hint: '_olde_',
    clue: 'An Australian automaker that operates in Australasia and is headquartered in Port Melbourne, Victoria.|The company was founded in 1856 as a saddlery manufacturer.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_imgur_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_imgur.png',
    brand: 'Imgur',
    wiki_url: 'https://en.wikipedia.org/wiki/Imgur',
    hint: 'Img__',
    clue: `Is an online image hosting service founded by Alan Schaaf in 2009 in Athens, Ohio, United States.|It describes itself as "the home to the web's most popular image content".`,
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_nintendo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_nintendo.png',
    brand: 'Nintendo',
    wiki_url: 'https://en.wikipedia.org/wiki/Nintendo',
    hint: 'Nin____o',
    clue: "A Japanese multinational consumer electronics company headquartered in Kyoto, Japan.|It is the world's largest video game company by revenue.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_pandora_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_pandora.png',
    brand: 'Pandora',
    wiki_url: 'https://en.wikipedia.org/wiki/Pandora',
    hint: 'Pa__or_',
    clue: 'An international Danish jewelry manufacturer and retailer.|It was founded in 1982 by Danish gold smith Per Enevoldsen and his wife Winnie Enevoldsen.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_pwc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_pwc.png',
    brand: 'Pwc',
    wiki_url: 'https://en.wikipedia.org/wiki/Pwc',
    hint: 'PW_',
    clue: "A multinational professional services network.|It is the world's second largest professional services network.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_roncato_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_roncato.png',
    brand: 'Roncato',
    wiki_url: 'https://en.wikipedia.org/wiki/Roncato',
    hint: '_o_cat_',
    clue: 'Established and co-founded by Giovanni Roncato.|Designs, manufactures and markets a wide range of products for travel and everyday use.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_sberbank_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_sberbank.png',
    brand: 'Sberbank',
    wiki_url: 'https://en.wikipedia.org/wiki/Sberbank',
    hint: 'S__rb_n_',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_sharp_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_sharp.png',
    brand: 'Sharp',
    wiki_url: 'https://en.wikipedia.org/wiki/Sharp',
    hint: '__ar_',
    clue: 'Japanese multinational corporation.|Designs and manufactures electronic products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_staples_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_staples.png',
    brand: 'Staples',
    wiki_url: 'https://en.wikipedia.org/wiki/Staples',
    hint: 'S__p_es',
    clue: 'A large United States-based office supply chain store.|Sells supplies, office machines, promotional products, furniture, technology, and business services.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_sunsilk_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_sunsilk.png',
    brand: 'Sunsilk',
    wiki_url: 'https://en.wikipedia.org/wiki/Sunsilk',
    hint: '__ns_lk',
    clue: 'A hair care brand, primarily aimed at women, produced by the Unilever group.|Launched in the UK in 1954, and by 1959 it was available in 18 different countries worldwide.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_tdk_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_tdk.png',
    brand: 'Tdk',
    wiki_url: 'https://en.wikipedia.org/wiki/Tdk',
    hint: 'TD_',
    clue: 'A Japanese multinational electronics company.|Manufactures electronic materials,electronic components, and recording and data-storage media.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_t_the_sun_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_t_the_sun.png',
    brand: 'The Sun',
    wiki_url: 'https://en.wikipedia.org/wiki/The Sun',
    hint: 'the s__',
    clue: 'A daily tabloid newspaper published in the United Kingdom and Ireland, founded in 1964.|Published by the News Group Newspapers division of News UK.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_arla_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_arla.png',
    brand: 'Arla',
    wiki_url: 'https://en.wikipedia.org/wiki/Arla',
    hint: '_rl_',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_bayer_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_bayer.png',
    brand: 'Bayer',
    wiki_url: 'https://en.wikipedia.org/wiki/Bayer',
    hint: '_ay__',
    clue: 'A German multinational chemical and pharmaceutical company.|Headquartered in Leverkusen, North Rhine-Westphalia, Germany.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_castelli_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_castelli.png',
    brand: 'Castelli',
    wiki_url: 'https://en.wikipedia.org/wiki/Castelli',
    hint: 'C___el_i',
    clue: 'An Italian maker of cycling specific sportswear.|Notable for making lycra available to professional cyclists and the general public.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_china_unicom_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_china_unicom.png',
    brand: 'China Unicom',
    wiki_url: 'https://en.wikipedia.org/wiki/China Unicom',
    hint: 'Ch__a U___om',
    clue: "A Chinese state-owned telecommunications operator in the People's Republic of China.|Founded as a state-owned corporation, established on July 19, 1994.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_coach_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_coach.png',
    brand: 'Coach',
    wiki_url: 'https://en.wikipedia.org/wiki/Coach',
    hint: '_oa__',
    clue: "A luxury fashion company based in New York City.|Known for accessories and gifts for women and men, including handbags, men's bags,footwear, outerwear.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_fifa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_fifa.png',
    brand: 'Fifa',
    wiki_url: 'https://en.wikipedia.org/wiki/Fifa',
    hint: 'F_F_',
    clue: 'It is the international governing body of association football (soccer), futsal andbeach soccer.|It was founded in 1904 to oversee international competition.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_haribo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_haribo.png',
    brand: 'Haribo',
    wiki_url: 'https://en.wikipedia.org/wiki/Haribo',
    hint: 'H_r_bo',
    clue: 'It is a German confectionery company.|It was founded in 1920 by Johannes ("Hans") Riegel.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_husqvarna_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_husqvarna.png',
    brand: 'Husqvarna',
    wiki_url: 'https://en.wikipedia.org/wiki/Husqvarna',
    hint: 'Husq_a__a',
    clue: 'A manufacturer of outdoor power products.|Produces consumer watering products, cutting equipment and diamond tools for the construction and stone industries.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_jetblue_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_jetblue.png',
    brand: 'Jetblue',
    wiki_url: 'https://en.wikipedia.org/wiki/Jetblue',
    hint: '_e_B__e',
    clue: 'An American low-cost airline.|Serves 84 destinations in 24 states and 12 countries in the Caribbean, South America and Latin America.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_kleenex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_kleenex.png',
    brand: 'Kleenex',
    wiki_url: 'https://en.wikipedia.org/wiki/Kleenex',
    hint: 'Kle__e_',
    clue: 'Is a brand name for a variety of paper-based products such as facial tissue, bathroom tissue, paper towels, tampons, and diapers.|First Introduced in 1924.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_liebherr_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_liebherr.png',
    brand: 'Liebherr',
    wiki_url: 'https://en.wikipedia.org/wiki/Liebherr',
    hint: 'L___her_',
    clue: 'A large equipment manufacturer based in Switzerland.|Established in 1949.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_lindemans_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_lindemans.png',
    brand: 'Lindemans',
    wiki_url: 'https://en.wikipedia.org/wiki/Lindemans',
    hint: '_ind__ans',
    clue: 'An Australian winery, owned by Treasury Wine Estates.|It was founded in 1843.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_mercury_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_mercury.png',
    brand: 'Mercury',
    wiki_url: 'https://en.wikipedia.org/wiki/Mercury',
    hint: 'M__cur_',
    clue: 'A car brand of the Ford Motor Company launched in 1938 by Edsel Ford.|Entry-level luxury cars slotted between Ford-branded regular models and Lincoln-branded luxury vehicles.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_mit_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_mit.png',
    brand: 'Mit',
    wiki_url: 'https://en.wikipedia.org/wiki/Mit',
    hint: '_IT',
    clue: 'A  private research university in Cambridge, Massachusetts.|Traditionally known for its research and education in the physical sciences and engineering.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_nascar_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_nascar.png',
    brand: 'Nascar',
    wiki_url: 'https://en.wikipedia.org/wiki/Nascar',
    hint: '__scar',
    clue: 'A family owned and operated business venture that sanctions and governs auto racing sports events.|It was founded by Bill France, Sr. in 1948.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_otis_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_otis.png',
    brand: 'Otis',
    wiki_url: 'https://en.wikipedia.org/wiki/Otis',
    hint: 'O__s',
    clue: "World's largest manufacturer of vertical transportation systems.|Principally focusing on elevators and escalators.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_polaroid_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_polaroid.png',
    brand: 'Polaroid',
    wiki_url: 'https://en.wikipedia.org/wiki/Polaroid',
    hint: 'Pola____',
    clue: 'Is a brand licensor to companies that distribute consumer electronics and eyewear.|The original company was founded in 1937 by Edwin H. Land.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_schindler_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_schindler.png',
    brand: 'Schindler',
    wiki_url: 'https://en.wikipedia.org/wiki/Schindler',
    hint: 'S__indl_r',
    clue: 'Is a manufacturer of escalators and elevators world wide.|Founded in Switzerland in 1874.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_sony_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_sony.png',
    brand: 'Sony',
    wiki_url: 'https://en.wikipedia.org/wiki/Sony',
    hint: 'S_n_',
    clue: 'A japanese multinational conglomerate corporation headquartered in Kōnan Minato, Tokyo, Japan.|One of the leading manufacturers of electronic products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_td_bank_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_td_bank.png',
    brand: 'Td Bank',
    wiki_url: 'https://en.wikipedia.org/wiki/Td Bank',
    hint: 'TD B__k',
    clue: 'The personal, small business and commercial banking operation in Canada.|Offers a range of financial services and products to more than 10 million Canadian.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_toshiba_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_toshiba.png',
    brand: 'Toshiba',
    wiki_url: 'https://en.wikipedia.org/wiki/Toshiba',
    hint: 'To_hi__',
    clue: 'Japanese multinational conglomerate corporation headquartered in Tokyo.|Founded in 1939 by the merger of Shibaura Seisakusho and Tokyo Denki.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_true_religion_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_true_religion.png',
    brand: 'True Religion',
    wiki_url: 'https://en.wikipedia.org/wiki/True Religion',
    hint: '__ue R___gio_',
    clue: 'An American clothing company.|Based in Vernon, California, the company was established in December 2002 by Jeff Lubell.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_unilever_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_unilever.png',
    brand: 'Unilever',
    wiki_url: 'https://en.wikipedia.org/wiki/Unilever',
    hint: 'Un_l_ve_',
    clue: 'A British–Dutch multinational consumer goods company co-headquartered in Netherlands and the UK.|Food, beverages, cleaning agents and personal care products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_u_wurth_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_u_wurth.png',
    brand: 'Wurth',
    wiki_url: 'https://en.wikipedia.org/wiki/Wurth',
    hint: 'W_r_h',
    clue: 'A worldwide wholesaler of fasteners, screws and screw accessories, dowels, chemicals.|Was founded in 1945 by Adolf Würth in Künzelsau, Germany.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_absolut_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_absolut.png',
    brand: 'Absolut',
    wiki_url: 'https://en.wikipedia.org/wiki/Absolut',
    hint: '_b_olu_',
    clue: 'A brand of vodka, produced near Åhus, in southern Sweden.|The third largest brand of alcoholic spirits in the world after Bacardi and Smirnoff.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_atari_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_atari.png',
    brand: 'Atari',
    wiki_url: 'https://en.wikipedia.org/wiki/Atari',
    hint: '_t_r_',
    clue: 'It was a pioneer  in arcade games, home video game consoles, and home computers.|It was founded in 1972 by Nolan Bushnell and Ted Dabney.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_billabong_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_billabong.png',
    brand: 'Billabong',
    wiki_url: 'https://en.wikipedia.org/wiki/Billabong',
    hint: '_il_ab_ng',
    clue: 'Is a surf company, primarily a clothing retailer that also produces accessories, backpacks, skateboard and snowboard.|Founded in 1973 by Gordon and Rena Merchant.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_breitling_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_breitling.png',
    brand: 'Breitling',
    wiki_url: 'https://en.wikipedia.org/wiki/Breitling',
    hint: 'B_eit_i_g',
    clue: 'A Swiss watchmaker based in Grenchen, Switzerland.|Was founded in Saint-Imier, Bernese Jura by Léon Breitling in 1884.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_cartier_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_cartier.png',
    brand: 'Cartier',
    wiki_url: 'https://en.wikipedia.org/wiki/Cartier',
    hint: '__rtie_',
    clue: 'Designs, manufactures, distributes and sells jewellery and watches.|Founded in Paris, France in 1847 by Louis-François Cartie.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_champions_league_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_champions_league.png',
    brand: 'Champions League',
    wiki_url: 'https://en.wikipedia.org/wiki/Champions League',
    hint: '___mp___s L_agu_',
    clue: 'An annual continental club football competition organised by the UEFA.|One of the most prestigious tournaments in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_comcast_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_comcast.png',
    brand: 'Comcast',
    wiki_url: 'https://en.wikipedia.org/wiki/Comcast',
    hint: 'C_m_as_',
    clue: 'A U.S.-based international mass media company.|It is the largest cable company and home Internet service provider in the US.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_debian_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_debian.png',
    brand: 'Debian',
    wiki_url: 'https://en.wikipedia.org/wiki/Debian',
    hint: '_ebi_n',
    clue: 'Is a Unix-like computer operating system and a Linux distribution.|The company was first announced in 1993 by Ian Murdock.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_ducati_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_ducati.png',
    brand: 'Ducati',
    wiki_url: 'https://en.wikipedia.org/wiki/Ducati',
    hint: 'D_ca_i',
    clue: 'An Italian company that designs and manufactures motorcycles.|Owned by German automotive manufacturer Audi through its Italian subsidiary Lamborghini.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_dvd_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_dvd.png',
    brand: 'Dvd',
    wiki_url: 'https://en.wikipedia.org/wiki/Dvd',
    hint: 'D_D',
    clue: 'A digital optical disc storage format, invented and developed by Philips, Sony, Toshiba, and Panasonic in 1995.|Can be played in multiple types of players.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_energizer_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_energizer.png',
    brand: 'Energizer',
    wiki_url: 'https://en.wikipedia.org/wiki/Energizer',
    hint: '_n_rg_zer',
    clue: 'American manufacturer of batteries and personal care products.|Well known brands are Eveready batteries, Schick, and Hawaiian Tropic.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_fruit_of_the_loom_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_fruit_of_the_loom.png',
    brand: 'Fruit Of The Loom',
    wiki_url: 'https://en.wikipedia.org/wiki/Fruit Of The Loom',
    hint: 'F_u__ o_ ___ Loo_',
    clue: "An American company that manufactures clothing, particularly underwear.|The company's world headquarters is in Bowling Green, Kentucky.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_jean_paul_gaultier_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_jean_paul_gaultier.png',
    brand: 'Jean Paul Gaultier',
    wiki_url: 'https://en.wikipedia.org/wiki/Jean Paul Gaultier',
    hint: '___n P_ul ____t_e_',
    clue: "A line of perfumes in collaboration with Puig company.|The first fragrance, Classique, a women's floral-oriental, was introduced in 1993,.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_kenwood_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_kenwood.png',
    brand: 'Kenwood',
    wiki_url: 'https://en.wikipedia.org/wiki/Kenwood',
    hint: 'Ke__oo_',
    clue: 'A Japanese manufacturer of amateur radio as well as hi-fi and portable audio equipment.|Design, develop and market a range of Car Audio.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_kia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_kia.png',
    brand: 'Kia',
    wiki_url: 'https://en.wikipedia.org/wiki/Kia',
    hint: 'K_a',
    clue: "South Korea's second-largest automobile manufacturer.|Headquartered in Seoul, is South Korea.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_lancome_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_lancome.png',
    brand: 'Lancome',
    wiki_url: 'https://en.wikipedia.org/wiki/Lancome',
    hint: 'L__come',
    clue: "A French luxury perfumes and cosmetics house that distributes products internationally.|Part of the L'oreal Luxury Products division.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_my_little_pony_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_my_little_pony.png',
    brand: 'My Little Pony',
    wiki_url: 'https://en.wikipedia.org/wiki/My Little Pony',
    hint: '_y _i__l_ _ony',
    clue: 'It is an entertainment franchise developed by Hasbro.|Production started in 1983.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_nivea_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_nivea.png',
    brand: 'Nivea',
    wiki_url: 'https://en.wikipedia.org/wiki/Nivea',
    hint: 'N_v__',
    clue: 'A global skin- and body-care brand that is owned by the German company Beiersdorf.|Founded on March 28, 1882, by pharmacist Carl Paul Beiersdorf.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_olympus_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_olympus.png',
    brand: 'Olympus',
    wiki_url: 'https://en.wikipedia.org/wiki/Olympus',
    hint: '_l_mpu_',
    clue: 'Japan-based manufacturer of optics and reprography products.|Established on 12 October 1919, initially specializing in microscope and thermometer businesses.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_rai_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_rai.png',
    brand: 'Rai',
    wiki_url: 'https://en.wikipedia.org/wiki/Rai',
    hint: 'RA_',
    clue: 'Operates many DVB and Sat television channels and radio stations, broadcasting via digital terrestrial transmission.|Was formed in 1924.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_sbi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_sbi.png',
    brand: 'Sbi',
    wiki_url: 'https://en.wikipedia.org/wiki/Sbi',
    hint: 'S_I',
    clue: 'Indian multinational, Public Sector banking and financial services company.|A government-owned corporation with its headquarters in Mumbai, Maharashtra.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_scania_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_scania.png',
    brand: 'Scania',
    wiki_url: 'https://en.wikipedia.org/wiki/Scania',
    hint: 'S_a_ia',
    clue: 'A major Swedish automotive industrymanufacturer of commercial vehicles.|Manufactures diesel engines.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_walgreens_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_walgreens.png',
    brand: 'Walgreens',
    wiki_url: 'https://en.wikipedia.org/wiki/Walgreens',
    hint: '_a_g_eens',
    clue: 'Is the largest drug retailing chain in the United States.|It began in 1901, with a drug store on the corner of Bowen Ave and Cottage Grove in Chicago.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_wto_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_wto.png',
    brand: 'Wto',
    wiki_url: 'https://en.wikipedia.org/wiki/Wto',
    hint: 'WT_',
    clue: 'An intergovernmental organization which regulates international trade.|It officially commenced on 1 January 1995 under the Marrakech Agreement.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_v_yoplait_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_v_yoplait.png',
    brand: 'Yoplait',
    wiki_url: 'https://en.wikipedia.org/wiki/Yoplait',
    hint: 'Yopla__',
    clue: 'An internationally franchised brand of yogurt jointly owned byUnited States.|Their logo is a six-petaled flower designed by Philippe Morlighem.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_aljazeera_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_aljazeera.png',
    brand: 'Aljazeera',
    wiki_url: 'https://en.wikipedia.org/wiki/Aljazeera',
    hint: 'Al_a_ee_a',
    clue: 'A Doha-based state-funded broadcaster.|Initially launched as an Arabic news and current affairs satellite TV channel.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_big_brothers_big_sisters_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_big_brothers_big_sisters.png',
    brand: 'Big Brothers Big Sisters',
    wiki_url: 'https://en.wikipedia.org/wiki/Big Brothers Big Sisters',
    hint: 'B__ _r__h___ Bi_ S______',
    clue: 'A non-profit organization whose goal is to help all children reach their potential.|Founded in 1904 in New York.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_burberry_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_burberry.png',
    brand: 'Burberry',
    wiki_url: 'https://en.wikipedia.org/wiki/Burberry',
    hint: 'B_r__r_y',
    clue: 'British luxury fashion house.|Distributes outerwear, fashion accessories, fragrances, sunglasses, and cosmetics.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_cnn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_cnn.png',
    brand: 'Cnn',
    wiki_url: 'https://en.wikipedia.org/wiki/Cnn',
    hint: 'CN_',
    clue: 'An American basic cable and satellite television channel.|The 24-hour cable news channel was founded in 1980 by American media proprietor Ted Turner.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_eset_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_eset.png',
    brand: 'Eset',
    wiki_url: 'https://en.wikipedia.org/wiki/Eset',
    hint: '__et',
    clue: 'An IT security company headquartered in Bratislava, Slovakia.|It was founded in 1992 by the merger of two private companies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_festina_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_festina.png',
    brand: 'Festina',
    wiki_url: 'https://en.wikipedia.org/wiki/Festina',
    hint: '_es__na',
    clue: 'A watch manufacturer.|The company was founded in 1902 in La Chaux-de-Fonds, Switzerland.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_gateway_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_gateway.png',
    brand: 'Gateway',
    wiki_url: 'https://en.wikipedia.org/wiki/Gateway',
    hint: 'G__ew_y',
    clue: 'An American computer hardware company based in Irvine, California.|It was founded on September 5, 1985.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_gillette_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_gillette.png',
    brand: 'Gillette',
    wiki_url: 'https://en.wikipedia.org/wiki/Gillette',
    hint: 'Gi_l__t_',
    clue: "Brand of men's safety razors. Based in Boston, Massachusetts, United States.|It was founded by King C. Gillette in 1901 as a safety razor manufacturer.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_icbc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_icbc.png',
    brand: 'Icbc',
    wiki_url: 'https://en.wikipedia.org/wiki/Icbc',
    hint: '__BC',
    clue: 'Is the largest bank in the world by total assets and market capitalization.|It was founded as a limited company on January 1, 1984.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_infiniti_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_infiniti.png',
    brand: 'Infiniti',
    wiki_url: 'https://en.wikipedia.org/wiki/Infiniti',
    hint: '_nf_ni__',
    clue: 'Is the luxury vehicle division of Japanese automaker Nissan.|The brand was introduced in the USA in 1989.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_jim_beam_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_jim_beam.png',
    brand: 'Jim Beam',
    wiki_url: 'https://en.wikipedia.org/wiki/Jim Beam',
    hint: '_im _ea_',
    clue: 'Brand of bourbon whiskey produced in Clermont, Kentucky by Beam Suntory.|It was one of the best selling brands of bourbon in the world in 2008.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_kawasaki_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_kawasaki.png',
    brand: 'Kawasaki',
    wiki_url: 'https://en.wikipedia.org/wiki/Kawasaki',
    hint: '__w_s_ki',
    clue: 'An international corporation based in Japan.|It has headquarters in both Chūō-ku, Kobe and Minato, Tokyo.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_kroger_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_kroger.png',
    brand: 'Kroger',
    wiki_url: 'https://en.wikipedia.org/wiki/Kroger',
    hint: 'Kr__er',
    clue: "An American retailer founded by Bernard Kroger in 1883 in Cincinnati, Ohio.|It is USA's largest supermarket chain by revenue.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_lafarge_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_lafarge.png',
    brand: 'Lafarge',
    wiki_url: 'https://en.wikipedia.org/wiki/Lafarge',
    hint: 'Lafa___',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_mack_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_mack.png',
    brand: 'Mack',
    wiki_url: 'https://en.wikipedia.org/wiki/Mack',
    hint: '__ck',
    clue: 'An American truck–manufacturing company.|Former manufacturer of buses and trolley buses.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_padi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_padi.png',
    brand: 'Padi',
    wiki_url: 'https://en.wikipedia.org/wiki/Padi',
    hint: 'P__i',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_princeton_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_princeton.png',
    brand: 'Princeton',
    wiki_url: 'https://en.wikipedia.org/wiki/Princeton',
    hint: '_ri__et__',
    clue: 'A private Ivy League research university in Princeton, New Jersey.|Founded in 1746 in Elizabeth as the College of New Jersey.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_realtek_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_realtek.png',
    brand: 'Realtek',
    wiki_url: 'https://en.wikipedia.org/wiki/Realtek',
    hint: 'R__l_ek',
    clue: 'A fabless semiconductor company.|It was founded in October 1987.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_rossignol_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_rossignol.png',
    brand: 'Rossignol',
    wiki_url: 'https://en.wikipedia.org/wiki/Rossignol',
    hint: '_o_signo_',
    clue: 'A French manufacturer of alpine, snowboard, and Nordic equipment.|One of the first companies to produce plastic skis.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_sephora_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_sephora.png',
    brand: 'Sephora',
    wiki_url: 'https://en.wikipedia.org/wiki/Sephora',
    hint: 'S__ho_a',
    clue: 'A French brand and chain of cosmetics stores founded in Paris in 1970.|Opened its first United States store in New York City in 1998.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_smeg_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_smeg.png',
    brand: 'Smeg',
    wiki_url: 'https://en.wikipedia.org/wiki/Smeg',
    hint: 'S_e_',
    clue: 'An Italian manufacturer of upmarket domestic appliances.|Vittorio Bertazzoni founded the company in 1948 in the village of Guastalla, Reggio Emilia, Italy.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_suse_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_suse.png',
    brand: 'Suse',
    wiki_url: 'https://en.wikipedia.org/wiki/Suse',
    hint: '__SE',
    clue: 'A German-based company that develops and sells Linux products to business customers.|Founded in 1992, it was the first company to market Linux for the enterprise.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_tata_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_tata.png',
    brand: 'Tata',
    wiki_url: 'https://en.wikipedia.org/wiki/Tata',
    hint: 'Ta__',
    clue: 'A global enterprise headquartered in India.|Founded in 1868.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_thai_airways_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_thai_airways.png',
    brand: 'Thai Airways',
    wiki_url: 'https://en.wikipedia.org/wiki/Thai Airways',
    hint: 'T_a_ _i_wa_s',
    clue: 'It is the flag carrier airline of Thailand.|Formed in 1988, the airline has its corporateheadquarters in Bangkok.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_tupperware_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_tupperware.png',
    brand: 'Tupperware',
    wiki_url: 'https://en.wikipedia.org/wiki/Tupperware',
    hint: '_up___ware',
    clue: 'The name of a home products line.|Includes preparation, storage, containment, and serving products for the kitchen and home.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_valero_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_valero.png',
    brand: 'Valero',
    wiki_url: 'https://en.wikipedia.org/wiki/Valero',
    hint: 'Val__o',
    clue: 'A Fortune 500 international manufacturer and a marketer of transportation fuels.|It was created on January 1, 1980, as a spinoff of Coastal States Gas Corporation.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_w_vichy_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_w_vichy.png',
    brand: 'Vichy',
    wiki_url: 'https://en.wikipedia.org/wiki/Vichy',
    hint: '_i__y',
    clue: "A premium brand of skincare, bodycare, make-up and anti-aging products owned by L'Oréal under its Active Cosmetics division.|The company was founded in 1931.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_aetna_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_aetna.png',
    brand: 'Aetna',
    wiki_url: 'https://en.wikipedia.org/wiki/Aetna',
    hint: '__t_a',
    clue: "Is an American managed health care company.|The name was meant to invoke Mount Etna, at the time Europe's most active volcano.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_air_china_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_air_china.png',
    brand: 'Air China',
    wiki_url: 'https://en.wikipedia.org/wiki/Air China',
    hint: '_ir __in_',
    clue: "Is the flag carrier and one of the major airlines of the People's Republic of China.|It was established and commenced operations on 1 July 1988.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_alpinestars_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_alpinestars.png',
    brand: 'Alpinestars',
    wiki_url: 'https://en.wikipedia.org/wiki/Alpinestars',
    hint: 'A_pi____ars',
    clue: 'A manufacturer of technical, high performance protective gear for motorcycle and auto racing.|Founded in 1963 by Sante Mazzarolo in Asolo, Italy.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_american_eagle_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_american_eagle.png',
    brand: 'American Eagle',
    wiki_url: 'https://en.wikipedia.org/wiki/American Eagle',
    hint: 'A____ca_ Eag__',
    clue: 'American clothing and accessories retailer, headquartered in Pittsburgh, Pennsylvania.|Founded in 1977 by brothers Jerry and Mark Silverman.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_amnesty_international_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_amnesty_international.png',
    brand: 'Amnesty International',
    wiki_url: 'https://en.wikipedia.org/wiki/Amnesty International',
    hint: '___e___ Int___a___n__',
    clue: 'Non-governmental organisation focused on human rights.|Over 7 million members and supporters around the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_biotherm_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_biotherm.png',
    brand: 'Biotherm',
    wiki_url: 'https://en.wikipedia.org/wiki/Biotherm',
    hint: 'B_o_he_m',
    clue: "A French luxury skin care company.|Owned by L'Oréal under the Luxury Products division.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_bradesco_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_bradesco.png',
    brand: 'Bradesco',
    wiki_url: 'https://en.wikipedia.org/wiki/Bradesco',
    hint: '_r_d_sc_',
    clue: 'The largest insurance company of Brazil and Latin America.|Was created in 1946 by Bradesco bank.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_brita_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_brita.png',
    brand: 'Brita',
    wiki_url: 'https://en.wikipedia.org/wiki/Brita',
    hint: 'Br___',
    clue: 'A German company founded in 1966 by Heinz Hankammer with headquarters in Taunusstein, Hesse, Germany,.|Specializes in water filtration products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_capital_one_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_capital_one.png',
    brand: 'Capital One',
    wiki_url: 'https://en.wikipedia.org/wiki/Capital One',
    hint: '_a_it_l _ne',
    clue: 'An American bank holding company specializing in credit cards, loans, and banking.|A member of the Fortune 500, and conducts business in Canada and the United Kingdom.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_certina_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_certina.png',
    brand: 'Certina',
    wiki_url: 'https://en.wikipedia.org/wiki/Certina',
    hint: 'Ce_t__a',
    clue: 'A Swiss watchmaker.|Founded in Grenchen, 1888, by Adolf and Alfred Kurth.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_china_mobile_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_china_mobile.png',
    brand: 'China Mobile',
    wiki_url: 'https://en.wikipedia.org/wiki/China Mobile',
    hint: 'c_ina m__i__',
    clue: 'A Chinese state-owned telecommunication company that provides mobile voice and multimedia services through its nationwide telecommunications network.|Founded on 3 September 1997.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_etihad_airways_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_etihad_airways.png',
    brand: 'Etihad Airways',
    wiki_url: 'https://en.wikipedia.org/wiki/Etihad Airways',
    hint: '__iha_ ___w_ys',
    clue: 'A flag carrier and the second-largest airline of theUnited Arab Emirates.|Its head office is in Khalifa City, Abu Dhabi.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_fiat_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_fiat.png',
    brand: 'Fiat',
    wiki_url: 'https://en.wikipedia.org/wiki/Fiat',
    hint: '_i_t',
    clue: 'An Italian automaker.|Formed in January 2007.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_fiba_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_fiba.png',
    brand: 'Fiba',
    wiki_url: 'https://en.wikipedia.org/wiki/Fiba',
    hint: '__BA',
    clue: 'An association of national organizations.|Governs international competition in basketball.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_hankook_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_hankook.png',
    brand: 'Hankook',
    wiki_url: 'https://en.wikipedia.org/wiki/Hankook',
    hint: 'H_nk__k',
    clue: 'A South Korean tire company.|Was established in 1941 as the Chosun Tire Company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_ktm_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_ktm.png',
    brand: 'Ktm',
    wiki_url: 'https://en.wikipedia.org/wiki/Ktm',
    hint: 'KT_',
    clue: 'An Austrian motorcycle manufacturer.|Formed in 1992 but traces its foundation as early as in 1934.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_morrisons_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_morrisons.png',
    brand: 'Morrisons',
    wiki_url: 'https://en.wikipedia.org/wiki/Morrisons',
    hint: 'Mo_ri_o_s',
    clue: 'The fourth largest chain of supermarkets in the United Kingdom.|Founded in 1899 by William Morrison.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_mothercare_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_mothercare.png',
    brand: 'Mothercare',
    wiki_url: 'https://en.wikipedia.org/wiki/Mothercare',
    hint: '__the_car_',
    clue: 'A British retailer which specialises in products for expectant mothers.|Company was founded by Selim Zilkha and Sir James Goldsmith in 1961.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_saturn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_saturn.png',
    brand: 'Saturn',
    wiki_url: 'https://en.wikipedia.org/wiki/Saturn',
    hint: 'Sa_u_n',
    clue: 'Trademark established on January 7, 1985 as a subsidiary of General Motors.|The company marketed itself as a "different kind of car company".',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_sega_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_sega.png',
    brand: 'Sega',
    wiki_url: 'https://en.wikipedia.org/wiki/Sega',
    hint: '_e_a',
    clue: 'Originally short for Service Games.|A Japanese multinational video game developer, publisher, and entertainment holding company headquartered in Tokyo.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_sidi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_sidi.png',
    brand: 'Sidi',
    wiki_url: 'https://en.wikipedia.org/wiki/Sidi',
    hint: 'SI__',
    clue: 'Italian company founded in 1960  by Dino Signori.|Specializes in protective wear for sports such as motorcycling and cycling.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_skol_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_skol.png',
    brand: 'Skol',
    wiki_url: 'https://en.wikipedia.org/wiki/Skol',
    hint: 'S_o_',
    clue: 'Initially created to be a global beer brand.|Introduced in 1959.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_x_vespa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_x_vespa.png',
    brand: 'Vespa',
    wiki_url: 'https://en.wikipedia.org/wiki/Vespa',
    hint: 'Ve___',
    clue: 'An Italian brand of scooter manufactured by Piaggio.|The name means wasp in Italian.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_avg_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_avg.png',
    brand: 'Avg',
    wiki_url: 'https://en.wikipedia.org/wiki/Avg',
    hint: '_VG',
    clue: 'A family of anti-virus and Internet security software for the Windows, Linux, Mac OS X, and FreeBSD.|It is founded by a publicly traded Dutch company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_bbva_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_bbva.png',
    brand: 'Bbva',
    wiki_url: 'https://en.wikipedia.org/wiki/Bbva',
    hint: 'B_V_',
    clue: 'A multinational Spanish banking group.|Formed from a merger of Banco Bilbao Vizcaya and Argentaria in 1999, and is the second biggest bank in Spain.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_beringer_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_beringer.png',
    brand: 'Beringer',
    wiki_url: 'https://en.wikipedia.org/wiki/Beringer',
    hint: '_e_i__er',
    clue: "A large winery in St. Helena, California. Founded in 1875.|It was the first California winery to offer public tours after Prohibition's repeal.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_captain_morgan_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_captain_morgan.png',
    brand: 'Captain Morgan',
    wiki_url: 'https://en.wikipedia.org/wiki/Captain Morgan',
    hint: 'C___a__ M__gan',
    clue: 'Brand of rum produced by alcohol conglomerate Diageo.|Slogan "To Life, Love and Loot.".',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_carolina_herrera_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_carolina_herrera.png',
    brand: 'Carolina Herrera',
    wiki_url: 'https://en.wikipedia.org/wiki/Carolina Herrera',
    hint: '__RO__N_ HERRE_A',
    clue: 'A Venezuelan-American fashion designer.|Dressing various First Ladies, including Jacqueline Onassis, Laura Bush, and Michelle Obama.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_casio_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_casio.png',
    brand: 'Casio',
    wiki_url: 'https://en.wikipedia.org/wiki/Casio',
    hint: '___io',
    clue: 'A multinational electronics manufacturing company.|Its products include calculators, mobile phones, cameras, musical instruments and watches.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_corsair_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_corsair.png',
    brand: 'Corsair',
    wiki_url: 'https://en.wikipedia.org/wiki/Corsair',
    hint: 'C_rs__r',
    clue: 'An American computer peripherals and hardware company.|The company was incorporated in California in January 1994.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_crayola_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_crayola.png',
    brand: 'Crayola',
    wiki_url: 'https://en.wikipedia.org/wiki/Crayola',
    hint: '__ayol_',
    clue: "A brand of artists' supplies.|Chalk, crayons, colored pencils, markers, paints, modeling clay, and other related goods.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_dainese_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_dainese.png',
    brand: 'Dainese',
    wiki_url: 'https://en.wikipedia.org/wiki/Dainese',
    hint: '_a_ne_e',
    clue: 'An Italian company founded in 1972.|Specializes in protective wear for sports such as motorcycling, mountain biking and downhill skiing.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_drupal_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_drupal.png',
    brand: 'Drupal',
    wiki_url: 'https://en.wikipedia.org/wiki/Drupal',
    hint: 'Dru__l',
    clue: 'A free and open-source content-management framework.|It was released in January 2001 by Dries Buytaert.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_fendi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_fendi.png',
    brand: 'Fendi',
    wiki_url: 'https://en.wikipedia.org/wiki/Fendi',
    hint: 'Fe_d_',
    clue: 'Is an Italian luxury fashion house whose specialties include fur, ready-to-wear, leather goods, shoes, fragrances, eye wear, timepieces and accessories.|Founded in 1925 in Rome.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_harvard_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_harvard.png',
    brand: 'Harvard',
    wiki_url: 'https://en.wikipedia.org/wiki/Harvard',
    hint: 'H__v_rd',
    clue: 'A private Ivy League research university in Cambridge, Massachusetts.|One of the most prestigious universities in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_landwind_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_landwind.png',
    brand: 'Landwind',
    wiki_url: 'https://en.wikipedia.org/wiki/Landwind',
    hint: '___dwin_',
    clue: 'An automobile marque owned by the Chinese automaker Jiangling Motor Holding.|First Chinese automobile marque to be sold in Europe.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_lindt_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_lindt.png',
    brand: 'Lindt',
    wiki_url: 'https://en.wikipedia.org/wiki/Lindt',
    hint: '_in__',
    clue: 'A Swiss chocolatier and confectionery company.|The origins of the company date back to 1845.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_medtronic_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_medtronic.png',
    brand: 'Medtronic',
    wiki_url: 'https://en.wikipedia.org/wiki/Medtronic',
    hint: 'Medt__n_c',
    clue: "An Irish company with operational headquarters in suburban Minneapolis, Minnesota.|The world's third largest medical device company.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_milton_bradley_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_milton_bradley.png',
    brand: 'Milton Bradley',
    wiki_url: 'https://en.wikipedia.org/wiki/Milton Bradley',
    hint: 'm___o_ br_d__y',
    clue: 'An American board game company.|Established inSpringfield, Massachusetts, in 1860.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_mufg_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_mufg.png',
    brand: 'Mufg',
    wiki_url: 'https://en.wikipedia.org/wiki/Mufg',
    hint: 'M__G',
    clue: 'A Japanese bank holding / financial services company.|The company was formed on October 1, 2005 with the merger of Tokyo-based Mitsubishi Tokyo Financial Group (MTFG).',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_nirvana_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_nirvana.png',
    brand: 'Nirvana',
    wiki_url: 'https://en.wikipedia.org/wiki/Nirvana',
    hint: 'Nir___a',
    clue: 'An American rock band formed in Washington in 1987.|A rock band was formed by Kurt Cobain and Krist Novoselic.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_piaggio_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_piaggio.png',
    brand: 'Piaggio',
    wiki_url: 'https://en.wikipedia.org/wiki/Piaggio',
    hint: 'P___gio',
    clue: 'Manufactures and distributes two wheeled motor vehicles.|Corporate headquarters are located in Pontedera, Italy.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_publix_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_publix.png',
    brand: 'Publix',
    wiki_url: 'https://en.wikipedia.org/wiki/Publix',
    hint: '_ubl_x',
    clue: 'An employee-owned, American supermarket chain.|Founded in 1930 by George W. Jenkins.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_red_hat_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_red_hat.png',
    brand: 'Red Hat',
    wiki_url: 'https://en.wikipedia.org/wiki/Red Hat',
    hint: '_ed Ha_',
    clue: 'An American multinational software company.|Provides open-source software products to the enterprise community.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_sinopec_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_sinopec.png',
    brand: 'Sinopec',
    wiki_url: 'https://en.wikipedia.org/wiki/Sinopec',
    hint: 'Sin____',
    clue: 'Chinese oil and gas company based in Beijing, China.|It is listed in Hong Kong and also trades in Shanghai and New York.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_southwest_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_southwest.png',
    brand: 'Southwest',
    wiki_url: 'https://en.wikipedia.org/wiki/Southwest',
    hint: 'S__t__es_',
    clue: "A major U.S. airline and the world's largest low-cost carrier.|The airline was established in 1967 and adopted its current name in 1971.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_texas_instruments_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_texas_instruments.png',
    brand: 'Texas Instruments',
    wiki_url: 'https://en.wikipedia.org/wiki/Texas Instruments',
    hint: '_e___ I___r___nts',
    clue: 'An American electronics company that designs and makes semiconductors.|It is the third largest manufacturer of semiconductors worldwide.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_vivo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_vivo.png',
    brand: 'Vivo',
    wiki_url: 'https://en.wikipedia.org/wiki/Vivo',
    hint: '_iv_',
    clue: 'A Chinese smartphone manufacturer.|Founded in 2009, the company has registered the brand name in many parts of the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_wacom_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_wacom.png',
    brand: 'Wacom',
    wiki_url: 'https://en.wikipedia.org/wiki/Wacom',
    hint: '___om',
    clue: 'A Japanese company that specializes in graphics tablets and related products.|Headquartered in Kazo, Saitama, Japan. Founded 1983.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_y_yokohama_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_y_yokohama.png',
    brand: 'Yokohama',
    wiki_url: 'https://en.wikipedia.org/wiki/Yokohama',
    hint: '_ok_ha__',
    clue: 'A tire company based in Tokyo, Japan.|The company founded and started in 1917.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_airwalk_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_airwalk.png',
    brand: 'Airwalk',
    wiki_url: 'https://en.wikipedia.org/wiki/Airwalk',
    hint: '_i__alk',
    clue: 'A company that is owned by Collective Brands, Inc.|It is part of the Payless ShoeSource company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_bank_of_china_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_bank_of_china.png',
    brand: 'Bank Of China',
    wiki_url: 'https://en.wikipedia.org/wiki/Bank Of China',
    hint: '_an_ of ___na',
    clue: 'One of the 5 biggest state-owned commercial banks in China.|Founded in 1912 by the Republican government to replace the Imperial Bank of China.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_bing_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_bing.png',
    brand: 'Bing',
    wiki_url: 'https://en.wikipedia.org/wiki/Bing',
    hint: 'Bi__',
    clue: 'Is a web search engine from Microsoft.|It was unveiled by Microsoft CEO Steve Ballmer on May 28, 2009.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_cosmopolitan_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_cosmopolitan.png',
    brand: 'Cosmopolitan',
    wiki_url: 'https://en.wikipedia.org/wiki/Cosmopolitan',
    hint: 'Co_m_po____n',
    clue: 'An international fashion magazine for women.|Also known as Cosmo.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_eurosport_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_eurosport.png',
    brand: 'Eurosport',
    wiki_url: 'https://en.wikipedia.org/wiki/Eurosport',
    hint: 'Euro_po__',
    clue: 'A pan-European television sports network co-operated by French broadcaster TF1 Group.|It was launched in 5 February 1989.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_evernote_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_evernote.png',
    brand: 'Evernote',
    wiki_url: 'https://en.wikipedia.org/wiki/Evernote',
    hint: '_ve_no__',
    clue: 'An American independent, private company offering a closed source freemium suite of software and services.|Founded by Stepan Pachikov in 2008.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_evian_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_evian.png',
    brand: 'Evian',
    wiki_url: 'https://en.wikipedia.org/wiki/Evian',
    hint: '__i_n',
    clue: 'Mineral water coming from several sources near Évian-les-Bains, on the south shore of Lake Geneva.|Owned by Danone, a French multinational corporation.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_glenfiddich_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_glenfiddich.png',
    brand: 'Glenfiddich',
    wiki_url: 'https://en.wikipedia.org/wiki/Glenfiddich',
    hint: '_l_nfi_d_c_',
    clue: "A Speyside single malt Scotch whisky owned and produced byWilliam Grant & Sons in Dufftown, Scotland.|The world's best-selling single-malt whisky.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_huggies_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_huggies.png',
    brand: 'Huggies',
    wiki_url: 'https://en.wikipedia.org/wiki/Huggies',
    hint: 'Hugg___',
    clue: 'The brand name of a disposable diaper marketed by Kimberly-Clark.|They were first test marketed in 1968.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_mentos_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_mentos.png',
    brand: 'Mentos',
    wiki_url: 'https://en.wikipedia.org/wiki/Mentos',
    hint: 'Ment__',
    clue: 'A brand of prepackaged scotch mints.|Small oblate spheroids, with a slightly hard exterior and a soft, chewy interior.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_minute_maid_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_minute_maid.png',
    brand: 'Minute Maid',
    wiki_url: 'https://en.wikipedia.org/wiki/Minute Maid',
    hint: '_inu_e _ai_',
    clue: 'A product line of beverages, usually associated with lemonade or orange juice.|Was the first company to market orange juice concentrate.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_ntt_docomo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_ntt_docomo.png',
    brand: 'Ntt Docomo',
    wiki_url: 'https://en.wikipedia.org/wiki/Ntt Docomo',
    hint: '___ DOCOMO',
    clue: 'Is the predominant mobile phone operator in Japan.|Was spun off from Nippon Telegraph and Telephone (NTT) in August 1991.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_parmalat_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_parmalat.png',
    brand: 'Parmalat',
    wiki_url: 'https://en.wikipedia.org/wiki/Parmalat',
    hint: '___ma_at',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_psp_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_psp.png',
    brand: 'Psp',
    wiki_url: 'https://en.wikipedia.org/wiki/Psp',
    hint: '_SP',
    clue: 'A handheld game console developed by Sony.|It was unveiled on May 11, 2004.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_royal_canin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_royal_canin.png',
    brand: 'Royal Canin',
    wiki_url: 'https://en.wikipedia.org/wiki/Royal Canin',
    hint: '_oy_l _an_n',
    clue: 'Manufactures and supplies dog and cat feed.|Research into the formulation and testing of breed and symptom specific nutritional requirements of dogs and cats.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_stabilo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_stabilo.png',
    brand: 'Stabilo',
    wiki_url: 'https://en.wikipedia.org/wiki/Stabilo',
    hint: 'S__bil_',
    clue: 'A German maker of pens for writing, colouring and cosmetics as well as markers and highlighters for office use.|The company was founded in Nuremberg in 1855.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/l_z_zepter_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/l_z_zepter.png',
    brand: 'Zepter',
    wiki_url: 'https://en.wikipedia.org/wiki/Zepter',
    hint: 'Z__ter',
    clue: 'A global enterprise, which produces, sells and distributes consumer goods around the world.|It was established in Linz, Austria in 1986.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/new_a_electrolux_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/new_a_electrolux_b.png',
    brand: 'Electrolux',
    wiki_url: 'https://en.wikipedia.org/wiki/Electrolux',
    hint: '__ec__olux',
    clue: "Is a multinational appliance manufacturer, headquartered in Stockholm, Sweden.|It is consistently ranked the world's second-largest appliance maker by units sold.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/new_a_emirates_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/new_a_emirates_b.png',
    brand: 'Emirates',
    wiki_url: 'https://en.wikipedia.org/wiki/Emirates',
    hint: 'E__rat__',
    clue: 'An airline based in Dubai, United Arab Emirates.|It is the largest airline in the Middle East.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/new_a_salomon_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/new_a_salomon_b.png',
    brand: 'Salomon',
    wiki_url: 'https://en.wikipedia.org/wiki/Salomon',
    hint: 's_l_m_n',
    clue: 'A sports equipment manufacturing company that originated in Annecy, France.|The company was started in 1947.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/new_a_samsonite_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/new_a_samsonite_b.png',
    brand: 'Samsonite',
    wiki_url: 'https://en.wikipedia.org/wiki/Samsonite',
    hint: 'Sams_n__e',
    clue: 'A global luggage manufacturer and retailer.|Products ranging from suitcases to backpacks and travel accessories.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ar_clarin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ar_clarin.png',
    brand: 'Clarin',
    wiki_url: 'https://en.wikipedia.org/wiki/Clarin',
    hint: 'Cl_r_n',
    clue: 'The largest newspaper in Argentina.|It was founded by Roberto Noble on 28 August 1945.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_at_erste_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_at_erste.png',
    brand: 'Erste',
    wiki_url: 'https://en.wikipedia.org/wiki/Erste',
    hint: '_rs__',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_at_fischer_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_at_fischer.png',
    brand: 'Fischer',
    wiki_url: 'https://en.wikipedia.org/wiki/Fischer',
    hint: 'Fi_c__r',
    clue: 'An Austrian company that produces Nordic Skiing, Alpine Skiing and Hockey equipment.|The company was founded in 1924.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_at_omv_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_at_omv.png',
    brand: 'Omv',
    wiki_url: 'https://en.wikipedia.org/wiki/Omv',
    hint: 'OM_',
    clue: 'An integrated international oil and gas company.|In 1990 the company opened its first filling station in Vienna-Auhof on 26 June 1990.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_at_runtastic_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_at_runtastic.png',
    brand: 'Runtastic',
    wiki_url: 'https://en.wikipedia.org/wiki/Runtastic',
    hint: 'R_nt_sti_',
    clue: 'An Austrian mobile fitness company.|Combines traditional fitness with mobile applications, social networking and elements of gamification.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_be_brussels_airlines_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_be_brussels_airlines.png',
    brand: 'Brussels Airlines',
    wiki_url: 'https://en.wikipedia.org/wiki/Brussels Airlines',
    hint: 'B_____ls A___i__s',
    clue: 'The flag carrier and largest airline of Belgium.|Created following the merger of SN Brussels Airlines (SNBA) and Virgin Express.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_be_delhaize_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_be_delhaize.png',
    brand: 'Delhaize',
    wiki_url: 'https://en.wikipedia.org/wiki/Delhaize',
    hint: 'D__h_iz_',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_be_godiva_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_be_godiva.png',
    brand: 'Godiva',
    wiki_url: 'https://en.wikipedia.org/wiki/Godiva',
    hint: 'G_di_a',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_banco_do_brasil_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_banco_do_brasil.png',
    brand: 'Banco Do Brasil',
    wiki_url: 'https://en.wikipedia.org/wiki/Banco Do Brasil',
    hint: '__NC_ _O _R__IL',
    clue: 'The second largest Brazilian and Latin American bank by assets.|The bank, headquartered in Brasília, was founded in 1808 and is the oldest active bank in Brazil.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_brahma_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_brahma.png',
    brand: 'Brahma',
    wiki_url: 'https://en.wikipedia.org/wiki/Brahma',
    hint: 'B_ahm_',
    clue: 'A Brazilian beer.|Originally made by the Companhia Cervejaria Brahma, which was founded in 1888.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_b_seara_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_b_seara.png',
    brand: 'Seara',
    wiki_url: 'https://en.wikipedia.org/wiki/Seara',
    hint: '_e_r_',
    clue: 'A Brazilian food processing company.|It specializes in the development and distribution of meat products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_b_vale_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_b_vale.png',
    brand: 'Vale',
    wiki_url: 'https://en.wikipedia.org/wiki/Vale',
    hint: 'Val_',
    clue: 'A Brazilian multinational diversified metals and mining corporation in Brazil.|Was founded in Itabira, Minas Gerais, as a public company by the Brazilian Federal Government.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_caixa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_caixa.png',
    brand: 'Caixa',
    wiki_url: 'https://en.wikipedia.org/wiki/Caixa',
    hint: 'C_i__',
    clue: 'A Brazilian bank.|It is the second largest government-owned financial institution in Latin America, after Banco do Brasil.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_extra_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_extra.png',
    brand: 'Extra',
    wiki_url: 'https://en.wikipedia.org/wiki/Extra',
    hint: '_x_r_',
    clue: 'A brand of sugarfree chewing gum.|Produced by the Wrigley Company in North America, Europe, some parts of Africa and Australasia.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_jbs_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_jbs.png',
    brand: 'Jbs',
    wiki_url: 'https://en.wikipedia.org/wiki/Jbs',
    hint: 'JB_',
    clue: 'A Brazilian company that is the largest meat processing company.|It was founded in 1953 in Anapolis, Goias.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_petrobras_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_petrobras.png',
    brand: 'Petrobras',
    wiki_url: 'https://en.wikipedia.org/wiki/Petrobras',
    hint: 'Pet_obr__',
    clue: 'A semi-public Brazilian multinational energy corporation headquartered in Rio de Janeiro, Brazil.|Was founded in 1953 and It is the largest company in the Southern Hemisphere.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_br_tim_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_br_tim.png',
    brand: 'Tim',
    wiki_url: 'https://en.wikipedia.org/wiki/Tim',
    hint: 'T_M',
    clue: 'Runs a GSM, EDGE, HSPA and LTE networks in Italy.|Established in 1996, and owned by Telecom Italia.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_ardene_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_ardene.png',
    brand: 'Ardene',
    wiki_url: 'https://en.wikipedia.org/wiki/Ardene',
    hint: '_rd_ne',
    clue: "A Canadian clothing and accessories retailer based in Montreal, Quebec.|Is located in all of Canada's ten provinces and three territories.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_bombardier_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_bombardier.png',
    brand: 'Bombardier',
    wiki_url: 'https://en.wikipedia.org/wiki/Bombardier',
    hint: 'bo____dier',
    clue: 'A Canadian multinational aerospace and transportation company.|Founded on January 29, 1942.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_cibc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_cibc.png',
    brand: 'Cibc',
    wiki_url: 'https://en.wikipedia.org/wiki/Cibc',
    hint: '_IB_',
    clue: "One of Canada's chartered banks, fifth largest by deposits.|The bank is headquartered at Commerce Court in Toronto, Ontario.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_cineplex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_cineplex.png',
    brand: 'Cineplex',
    wiki_url: 'https://en.wikipedia.org/wiki/Cineplex',
    hint: 'c_ne___x',
    clue: 'One of Canada’s largest entertainment companies and operates numerous businesses including movie theatres.|Founded in 1912.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_cirque_du_soleil_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_cirque_du_soleil.png',
    brand: 'Cirque Du Soleil',
    wiki_url: 'https://en.wikipedia.org/wiki/Cirque Du Soleil',
    hint: '____ue _u S__e_l',
    clue: 'A Canadian entertainment company.|It is the largest theatrical producer in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_dollarama_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_dollarama.png',
    brand: 'Dollarama',
    wiki_url: 'https://en.wikipedia.org/wiki/Dollarama',
    hint: 'D_l_a_ama',
    clue: 'A chain of over 900 dollar stores across Canada.|The company is headquartered in Montreal.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_four_seasons_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_four_seasons.png',
    brand: 'Four Seasons',
    wiki_url: 'https://en.wikipedia.org/wiki/Four Seasons',
    hint: 'f___ seas__s',
    clue: 'A Canadian international luxury, five-star hotel management company.|It operates them on behalf of real estate owners and developers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_koodo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_koodo.png',
    brand: 'Koodo',
    wiki_url: 'https://en.wikipedia.org/wiki/Koodo',
    hint: '__odo',
    clue: 'A Canadian mobile brand started by Telus in 2008 and mostly oriented toward younger customers.|Telus launched this company on March 17, 2008 in Canada.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_la_senza_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_la_senza.png',
    brand: 'La Senza',
    wiki_url: 'https://en.wikipedia.org/wiki/La Senza',
    hint: 'L_ Se_z_',
    clue: 'Canadian fashion retailer based in Dorval, Quebec.|Sells lingerie and intimate apparel.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_mary_browns_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_mary_browns.png',
    brand: 'Mary Browns',
    wiki_url: 'https://en.wikipedia.org/wiki/Mary Browns',
    hint: 'Ma_y Br__n_',
    clue: "A Canadian fast-food restaurant chain.|Known for its Big Mary sandwich, chicken and 'taters' or potato wedges.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_rona_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_rona.png',
    brand: 'Rona',
    wiki_url: 'https://en.wikipedia.org/wiki/Rona',
    hint: 'Ro__',
    clue: 'A Canadian retailer of home improvement and construction products and services.|Founded in 1939 in Quebec.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_shaw_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_shaw.png',
    brand: 'Shaw',
    wiki_url: 'https://en.wikipedia.org/wiki/Shaw',
    hint: '_h_w',
    clue: 'Owns the Global Television Network, which broadcasts nationally via 13 television stations.|Including Slice, HGTV Canada, Showcase, Food Network Canada, and History.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_telus_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ca_b_telus.png',
    brand: 'Telus',
    wiki_url: 'https://en.wikipedia.org/wiki/Telus',
    hint: '___us',
    clue: 'A Canadian national telecommunications company.|The company was formed in 1990 by the government of Alberta.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_abb_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_abb.png',
    brand: 'Abb',
    wiki_url: 'https://en.wikipedia.org/wiki/Abb',
    hint: 'A_B',
    clue: 'Is a multinational corporation headquartered in Zurich, Switzerland.|It resulted from the 1988 merger of a Swedish corporation and a swiss company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_adecco_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_adecco.png',
    brand: 'Adecco',
    wiki_url: 'https://en.wikipedia.org/wiki/Adecco',
    hint: '_dec_o',
    clue: "A Swiss multinational human resource consulting company based in Glattbrugg, Switzerland.|The world's largest provider of HR solutions.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_chopard_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_chopard.png',
    brand: 'Chopard',
    wiki_url: 'https://en.wikipedia.org/wiki/Chopard',
    hint: 'Ch_pa__',
    clue: 'Swiss-based luxury watch, jewellery and accessories company.|Founded in 1860 by Louis-Ulysse Chopard.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_holcim_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_holcim.png',
    brand: 'Holcim',
    wiki_url: 'https://en.wikipedia.org/wiki/Holcim',
    hint: '_olc_m',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_jura_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_jura.png',
    brand: 'Jura',
    wiki_url: 'https://en.wikipedia.org/wiki/Jura',
    hint: 'Ju__',
    clue: 'A Swiss developer and distributor of home appliances, headquartered in Niederbuchsiten, Canton of Solothurn.|The company was founded in 1931 by Leo Henzirohs.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_maggi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_maggi.png',
    brand: 'Maggi',
    wiki_url: 'https://en.wikipedia.org/wiki/Maggi',
    hint: 'M__g_',
    clue: 'An international brand of seasonings, instant soups and noodles.|Owned by Nestle since 1947.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_mammut_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_mammut.png',
    brand: 'Mammut',
    wiki_url: 'https://en.wikipedia.org/wiki/Mammut',
    hint: 'Ma_mu_',
    clue: 'A Swiss producer of mountaineering and trekking equipment with headquarters in Seon, Switzerland.|The company was founded in 1862 by Kaspar Tanner in Dintikon.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_swiss_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_swiss.png',
    brand: 'Swiss',
    wiki_url: 'https://en.wikipedia.org/wiki/Swiss',
    hint: '___ss',
    clue: 'The flag carrier airline of Switzerland.|Operating scheduled services in Europe and to North America, South America, Africa and Asia.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_zurich_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ch_zurich.png',
    brand: 'Zurich',
    wiki_url: 'https://en.wikipedia.org/wiki/Zurich',
    hint: 'Zur_c_',
    clue: 'A Swiss insurance company.|Headquartered in Zürich, Switzerland.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_cl_concha_y_toro_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_cl_concha_y_toro.png',
    brand: 'Concha Y Toro',
    wiki_url: 'https://en.wikipedia.org/wiki/Concha Y Toro',
    hint: '_o_c_a _ _oro',
    clue: 'The largest producer of wines from Latin America and is one of the global leaders in its field.|It is headquartered in Santiago, Chile.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_co_alpina_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_co_alpina.png',
    brand: 'Alpina',
    wiki_url: 'https://en.wikipedia.org/wiki/Alpina',
    hint: 'Al_in_',
    clue: 'Specializing in car audio and navigation systems.|Offers a wide range of items, including in-car multimedia, amplifiers, speakers, subwoofers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_co_ecopetrol_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_co_ecopetrol.png',
    brand: 'Ecopetrol',
    wiki_url: 'https://en.wikipedia.org/wiki/Ecopetrol',
    hint: 'Eco___rol',
    clue: 'Is the largest and primary petroleum company in Colombia.|It was founded in 1921.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_bogner_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_bogner.png',
    brand: 'Bogner',
    wiki_url: 'https://en.wikipedia.org/wiki/Bogner',
    hint: '_og_er',
    clue: 'The fashion company was founded in 1932.|It is in the upper price segment in the field of ready-made clothing, sportswear, sports equipment, accessories, perfumes and leather goods.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_air_berlin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_air_berlin.png',
    brand: 'Air Berlin',
    wiki_url: 'https://en.wikipedia.org/wiki/Air Berlin',
    hint: '_ir _erl_n',
    clue: "Is Germany's second largest airline.|And Europe's eighth largest airline in terms of passengers carried.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_escada_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_escada.png',
    brand: 'Escada',
    wiki_url: 'https://en.wikipedia.org/wiki/Escada',
    hint: 'esc__a',
    clue: "Founded in 1978 by Margaretha and Wolfgang Ley in Munich, Germany.|An international luxury fashion group in women's designer clothing.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_hama_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_hama.png',
    brand: 'Hama',
    wiki_url: 'https://en.wikipedia.org/wiki/Hama',
    hint: '__ma',
    clue: 'One of the world’s leading accessory manufacturers specialising in a number of areas.|It was rebuilt in Monheim in 1945.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_kettler_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_kettler.png',
    brand: 'Kettler',
    wiki_url: 'https://en.wikipedia.org/wiki/Kettler',
    hint: '__ttle_',
    clue: 'A German company based in Ense-Parsit, with locations all around the world.|The company produces bicycles, riding toys, leisure gear, patio furniture and exercise equipment.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_merci_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_merci.png',
    brand: 'Merci',
    wiki_url: 'https://en.wikipedia.org/wiki/Merci',
    hint: 'M_r__',
    clue: 'Brand of German chocolate candy manufactured by the German company August Storck KG.|Bars of differently flavored chocolate from Europe.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_osram_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_osram.png',
    brand: 'Osram',
    wiki_url: 'https://en.wikipedia.org/wiki/Osram',
    hint: '__ra_',
    clue: 'A multinational lighting manufacturer headquartered in Munich, Germany.|Founded in 1919 by a merger of the lighting businesses.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_playmobil_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_playmobil.png',
    brand: 'Playmobil',
    wiki_url: 'https://en.wikipedia.org/wiki/Playmobil',
    hint: 'Play_o_i_',
    clue: 'A line of toys produced by the Brandstätter Group.|Headquartered in Zirndorf, Germany.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_ritter_sport_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_ritter_sport.png',
    brand: 'Ritter Sport',
    wiki_url: 'https://en.wikipedia.org/wiki/Ritter Sport',
    hint: 'R___er S_o_t',
    clue: 'A brand of chocolate from the Alfred Ritter GmbH & Co. KG. Company.|Alfred Ritter and newly wedded wife, Clara, founded a chocolate factory in Stuttgart-Bad Cannstatt.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_sennheiser_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_sennheiser.png',
    brand: 'Sennheiser',
    wiki_url: 'https://en.wikipedia.org/wiki/Sennheiser',
    hint: 'Se_n_ei__r',
    clue: 'A private German audio company specializing in the design and production of a wide range of both consumer and high fidelity products.|Founded in 1958 as (Lab W).',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_sixt_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_sixt.png',
    brand: 'Sixt',
    wiki_url: 'https://en.wikipedia.org/wiki/Sixt',
    hint: '_ix_',
    clue: 'An international car rental company.|It was founded in 1912 with three vehicles in downtown Munich.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_trolli_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_b_trolli.png',
    brand: 'Trolli',
    wiki_url: 'https://en.wikipedia.org/wiki/Trolli',
    hint: 'T_oll_',
    clue: 'A brand which was registered in 1975.|The main production today consists of gummy candies,marshmallows, and soft licorice gums.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_basf_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_basf.png',
    brand: 'Basf',
    wiki_url: 'https://en.wikipedia.org/wiki/Basf',
    hint: '_a_f',
    clue: 'The largest chemical producer in the world.|Originally stood for Badische Anilin- und Soda-Fabrik.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_bauhaus_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_bauhaus.png',
    brand: 'Bauhaus',
    wiki_url: 'https://en.wikipedia.org/wiki/Bauhaus',
    hint: '__u_aus',
    clue: 'Were an English post-punk band, formed in Northampton, England in 1978.|Consisted of Peter Murphy, Daniel Ash, Kevin Haskins, and David J.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_evonik_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_evonik.png',
    brand: 'Evonik',
    wiki_url: 'https://en.wikipedia.org/wiki/Evonik',
    hint: '_v_nik',
    clue: "An industrial corporation headquartered in Essen, North Rhine-Westphalia, Germany.|One of the world's leading specialty chemicals companies, owned by RAG Foundation.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_gardena_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_gardena.png',
    brand: 'Gardena',
    wiki_url: 'https://en.wikipedia.org/wiki/Gardena',
    hint: '_ar__na',
    clue: 'A manufacturer of gardening tools.|Located in Ulm (Germany).',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_hansgrohe_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_c_hansgrohe.png',
    brand: 'Hansgrohe',
    wiki_url: 'https://en.wikipedia.org/wiki/Hansgrohe',
    hint: 'H_n_groh_',
    clue: "A German sanitary fittings manufacturer. It was founded by Hans Grohe in 1901, in Schiltach, Germany.|The world's largest shower head and hand-held shower attachment supplier.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_d_bertelsmann_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_d_bertelsmann.png',
    brand: 'Bertelsmann',
    wiki_url: 'https://en.wikipedia.org/wiki/Bertelsmann',
    hint: '_e__e_sm_nn',
    clue: 'A German multinational mass media corporation founded in 1835.|Based in Gütersloh, Germany.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_d_holsten_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_d_holsten.png',
    brand: 'Holsten',
    wiki_url: 'https://en.wikipedia.org/wiki/Holsten',
    hint: '__l_ten',
    clue: 'A brewing company founded in 1879.|The company was acquired by the Carlsberg Group in 2004.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_edeka_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_edeka.png',
    brand: 'Edeka',
    wiki_url: 'https://en.wikipedia.org/wiki/Edeka',
    hint: 'Ed__a',
    clue: 'The largest German supermarket corporation.|Founded in 1898, it consists today of several cooperatives.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_granini_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_granini.png',
    brand: 'Granini',
    wiki_url: 'https://en.wikipedia.org/wiki/Granini',
    hint: 'Gran___',
    clue: 'A German company known for its brand of fruit juices.|The brand founded by F. Schürmann in 1964, was acquired by Eckes AG in 1994.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_metro_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_metro.png',
    brand: 'Metro',
    wiki_url: 'https://en.wikipedia.org/wiki/Metro',
    hint: '___ro',
    clue: 'A food retailer operating in the Canadian provinces of Quebec and Ontario.|The third largest grocer in Canada.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_munich_re_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_munich_re.png',
    brand: 'Munich Re',
    wiki_url: 'https://en.wikipedia.org/wiki/Munich Re',
    hint: 'Mu__c_ _e',
    clue: 'A reinsurance company based in Munich, Germany.|It was founded by Carl von Thieme in 1889.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_rewe_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_rewe.png',
    brand: 'Rewe',
    wiki_url: 'https://en.wikipedia.org/wiki/Rewe',
    hint: 'r__e',
    clue: 'A German diversified retail and tourism group based in Germany.|Its current turnover is 50.6 billion euros.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_de_thyssenkrupp_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_de_thyssenkrupp.png',
    brand: 'Thyssenkrupp',
    wiki_url: 'https://en.wikipedia.org/wiki/Thyssenkrupp',
    hint: 'T___s_nK_up_',
    clue: "A German multinational conglomerate corporation.|One of the world's largest steel producers.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_dk_somersby_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_dk_somersby.png',
    brand: 'Somersby',
    wiki_url: 'https://en.wikipedia.org/wiki/Somersby',
    hint: 'So____by',
    clue: 'A brand of 4.5% abv cider by Danish brewing company Carlsberg Group.|Originally developed for the Danish market, but today has been launched in more than 46 markets.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_dk_tuborg_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_dk_tuborg.png',
    brand: 'Tuborg',
    wiki_url: 'https://en.wikipedia.org/wiki/Tuborg',
    hint: '_ubo_g',
    clue: 'Danish brewing company founded in 1873.|Since 1970 it has been part of the Carlsberg Group.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_bershka_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_bershka.png',
    brand: 'Bershka',
    wiki_url: 'https://en.wikipedia.org/wiki/Bershka',
    hint: 'Be_s_k_',
    clue: 'The company was created in April 1998.|A retailer and part of a Spanish Inditex group.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_b_iberdrola_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_b_iberdrola.png',
    brand: 'Iberdrola',
    wiki_url: 'https://en.wikipedia.org/wiki/Iberdrola',
    hint: '_ber_r_la',
    clue: 'A Spanish public multinational electric utility company.|It was created on November 1, 1992.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_b_vueling_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_b_vueling.png',
    brand: 'Vueling',
    wiki_url: 'https://en.wikipedia.org/wiki/Vueling',
    hint: '_u_l_ng',
    clue: 'A Spanish low-cost airline.|Was established in February 2004.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_endesa_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_endesa.png',
    brand: 'Endesa',
    wiki_url: 'https://en.wikipedia.org/wiki/Endesa',
    hint: 'E_d_sa',
    clue: 'The largest electric utility company in Chile.|Created as a subsidiary of the state-owned CORFO in 1 December 1943.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_joma_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_joma.png',
    brand: 'Joma',
    wiki_url: 'https://en.wikipedia.org/wiki/Joma',
    hint: 'J_m_',
    clue: 'A Spanish sports clothing manufacturer.|Produces footwear and clothing for football, futsal, basketball, volleyball, running, tennis, padel, fitness.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_mapfre_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_mapfre.png',
    brand: 'Mapfre',
    wiki_url: 'https://en.wikipedia.org/wiki/Mapfre',
    hint: 'M_pfr_',
    clue: 'A Spanish insurance company, based in Majadahonda, Madrid.|The company purchased Webster, Massachusetts-based Commerce Insurance Group.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_massimo_dutti_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_massimo_dutti.png',
    brand: 'Massimo Dutti',
    wiki_url: 'https://en.wikipedia.org/wiki/Massimo Dutti',
    hint: 'Mas____ _u_ti',
    clue: "Spanish company belonging to the Inditex group dedicated to the manufacturing of clothing.|Created in 1985 and its product range was limited to men's clothing.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_mercadona_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_mercadona.png',
    brand: 'Mercadona',
    wiki_url: 'https://en.wikipedia.org/wiki/Mercadona',
    hint: 'Me___dona',
    clue: 'A Spanish family-owned supermarket chain.|Francisco Roig Ballester and his wife, Trinidad Alfonso Mocholi, founded the company in 1977.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_telefonica_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_telefonica.png',
    brand: 'Telefonica',
    wiki_url: 'https://en.wikipedia.org/wiki/Telefonica',
    hint: '___e_onica',
    clue: 'A Spanish broadband and telecommunications provider.|One of the largest telephone operators and mobile network providers in the world.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_telepizza_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_telepizza.png',
    brand: 'Telepizza',
    wiki_url: 'https://en.wikipedia.org/wiki/Telepizza',
    hint: '_ele_izz_',
    clue: 'A pizza restaurant chain that operates in Spain.|It was founded in 1987 with capital from Galicia and Madrid.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_tous_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_tous.png',
    brand: 'Tous',
    wiki_url: 'https://en.wikipedia.org/wiki/Tous',
    hint: '__us',
    clue: 'A jewelry, accessories and fashion firm based in Catalonia, Spain.|Founded in 1920 by Salvador Tous Blavi and his wife Teresa Ponsa Mas.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_es_yoigo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_es_yoigo.png',
    brand: 'Yoigo',
    wiki_url: 'https://en.wikipedia.org/wiki/Yoigo',
    hint: '_oi__',
    clue: 'The fourth mobile phone operator with a network of its own in Spain.|Originally the carrier was to be called Xfera.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_bouygues_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_bouygues.png',
    brand: 'Bouygues',
    wiki_url: 'https://en.wikipedia.org/wiki/Bouygues',
    hint: 'Bo___u_s',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_fischer_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_fischer.png',
    brand: 'Fischer',
    wiki_url: 'https://en.wikipedia.org/wiki/Fischer',
    hint: 'Fi_c__r',
    clue: 'An Austrian company that produces Nordic Skiing, Alpine Skiing and Hockey equipment.|The company was founded in 1924.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_guerlain_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_guerlain.png',
    brand: 'Guerlain',
    wiki_url: 'https://en.wikipedia.org/wiki/Guerlain',
    hint: 'Gue_l___',
    clue: 'A French perfume house, among the oldest in the world.|It has a large customer following, and has traditionally been held in high esteem in the perfume industry.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_la_poste_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_la_poste.png',
    brand: 'La Poste',
    wiki_url: 'https://en.wikipedia.org/wiki/La Poste',
    hint: 'L_ Po_t_',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_le_coq_sportif_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_le_coq_sportif.png',
    brand: 'Le Coq Sportif',
    wiki_url: 'https://en.wikipedia.org/wiki/Le Coq Sportif',
    hint: 'L_ C_q Sp_r___',
    clue: 'A French company producing sports equipment such as shoes, shorts, and T-shirts.|It was founded in 1882 by Émile Camuset.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_pierre_cardin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_b_pierre_cardin.png',
    brand: 'Pierre Cardin',
    wiki_url: 'https://en.wikipedia.org/wiki/Pierre Cardin',
    hint: '___r__ Card_n',
    clue: 'An Italian-born French fashion designer who was born on 2 July 1922.|Known for his avant-garde style and his Space Age designs.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_courvoisier_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_courvoisier.png',
    brand: 'Courvoisier',
    wiki_url: 'https://en.wikipedia.org/wiki/Courvoisier',
    hint: '_ou__oi_i_r',
    clue: 'A brand of cognac owned by Beam Suntory.|Originally established in Paris, in the French suburb of Bercy in 1809.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_atos_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_atos.png',
    brand: 'Atos',
    wiki_url: 'https://en.wikipedia.org/wiki/Atos',
    hint: 'A__s',
    clue: 'A French multinational IT services corporation.|The company was formed in 1997 through a merger of two French IT companies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_babolat_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_babolat.png',
    brand: 'Babolat',
    wiki_url: 'https://en.wikipedia.org/wiki/Babolat',
    hint: 'B___lat',
    clue: 'A French tennis, badminton, and squash equipment company.|Best known for its strings and tennis racquets which are used by several top players.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_edf_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_edf.png',
    brand: 'Edf',
    wiki_url: 'https://en.wikipedia.org/wiki/Edf',
    hint: '_DF',
    clue: 'A French electric utility company, largely owned by the French state.|A Nuclear electric power generation company headquartered in Paris, France founded in 1946.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_vinci_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_vinci.png',
    brand: 'Vinci',
    wiki_url: 'https://en.wikipedia.org/wiki/Vinci',
    hint: 'V__c_',
    clue: "It is a French concessions and construction company.|It was founded in 1899 as Société Générale d'Enterprises.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_vivendi_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_c_vivendi.png',
    brand: 'Vivendi',
    wiki_url: 'https://en.wikipedia.org/wiki/Vivendi',
    hint: '_iven__',
    clue: 'A French multinational mass media company headquartered in Paris, France.|The company has activities in music, television and film.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_d_elle_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_d_elle.png',
    brand: 'Elle',
    wiki_url: 'https://en.wikipedia.org/wiki/Elle',
    hint: '__LE',
    clue: 'A worldwide lifestyle magazine of French origin that focuses on fashion, beauty, health, and entertainment.|Was founded in France in 1945.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_d_oasis_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_d_oasis.png',
    brand: 'Oasis',
    wiki_url: 'https://en.wikipedia.org/wiki/Oasis',
    hint: '__s_s',
    clue: 'Stores started in 1991, and in 1995 the brand was floated on the London Stock Exchange.|In April 1998, it purchased the Coast stores.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_d_orangina_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_d_orangina.png',
    brand: 'Orangina',
    wiki_url: 'https://en.wikipedia.org/wiki/Orangina',
    hint: 'O__ng__a',
    clue: 'A carbonated citrus beverage.|Started as Naranjina, presented at the 1935 Marseille Trade Fair.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_le_monde_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_le_monde.png',
    brand: 'Le Monde',
    wiki_url: 'https://en.wikipedia.org/wiki/Le Monde',
    hint: '__ mon_e',
    clue: 'A French daily evening newspaper founded by Hubert Beuve-Méry and continuously published in Paris.|Its first edition on 19 December 1944.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_martell_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_martell.png',
    brand: 'Martell',
    wiki_url: 'https://en.wikipedia.org/wiki/Martell',
    hint: '_ar_e_l',
    clue: 'One of the oldest cognac houses.|Founded in 1715 by Jean Martell (1694-1753).',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_moulinex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_moulinex.png',
    brand: 'Moulinex',
    wiki_url: 'https://en.wikipedia.org/wiki/Moulinex',
    hint: '_ou_in__',
    clue: 'Manufacturer of small household appliance.|Food processors, mixers, blenders, breadmakers, fryers, irons, vacuum cleaners.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_netto_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_netto.png',
    brand: 'Netto',
    wiki_url: 'https://en.wikipedia.org/wiki/Netto',
    hint: 'ne___',
    clue: 'A Danish discount supermarket operating in several European countries.|The first store opened in Copenhagen, Denmark, in 1981.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_perrier_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_perrier.png',
    brand: 'Perrier',
    wiki_url: 'https://en.wikipedia.org/wiki/Perrier',
    hint: '_e_ri_r',
    clue: 'A French brand of bottled mineral water.|The founder started the company in 1898.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_rowenta_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_fr_rowenta.png',
    brand: 'Rowenta',
    wiki_url: 'https://en.wikipedia.org/wiki/Rowenta',
    hint: 'Ro__nt_',
    clue: 'German manufacturer of small household appliances.|New slogan "Enjoy Technology".',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_it_aprilia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_it_aprilia.png',
    brand: 'Aprilia',
    wiki_url: 'https://en.wikipedia.org/wiki/Aprilia',
    hint: 'Ap__l_a',
    clue: 'Italian motorcycle company.|Started as a manufacturer of scooters and small-capacity motorcycles,.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_it_barilla_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_it_barilla.png',
    brand: 'Barilla',
    wiki_url: 'https://en.wikipedia.org/wiki/Barilla',
    hint: 'B____la',
    clue: 'Is an Italian and European food company.|The company was founded in 1877 in Ponte Taro, near Parma, Italy by Pietro Barilla.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_it_diadora_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_it_diadora.png',
    brand: 'Diadora',
    wiki_url: 'https://en.wikipedia.org/wiki/Diadora',
    hint: '_i__ora',
    clue: 'An Italian football, tennis, running, cycling, rugby, athletic shoe, clothing, and fashion accessory manufacturer.|Locations in Italy, US, and Hong Kong.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_it_intesa_sanpaolo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_it_intesa_sanpaolo.png',
    brand: 'Intesa Sanpaolo',
    wiki_url: 'https://en.wikipedia.org/wiki/Intesa Sanpaolo',
    hint: 'I_tes_ S__p____',
    clue: 'Is a banking group resulting from the merger between Banca Intesa and Sanpaolo IMI.|Now it is the second largest banking group in Italy, after Unicredit Group.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_it_miu_miu_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_it_miu_miu.png',
    brand: 'Miu Miu',
    wiki_url: 'https://en.wikipedia.org/wiki/Miu Miu',
    hint: 'M_U M_U',
    clue: "An Italian high fashion women's clothing and accessory brand.|A fully owned subsidiary of Prada.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_it_valentino_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_it_valentino.png',
    brand: 'Valentino',
    wiki_url: 'https://en.wikipedia.org/wiki/Valentino',
    hint: '_a_ent_no',
    clue: 'A clothing company founded in 1959.|Headquartered in Milan.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_it_wind_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_it_wind.png',
    brand: 'Wind',
    wiki_url: 'https://en.wikipedia.org/wiki/Wind',
    hint: 'W_N_',
    clue: 'It is a privately held telecommunications investment company.|Now owned by the Russian telecommunication company VimpelCom Ltd.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_mx_aeromexico_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_mx_aeromexico.png',
    brand: 'Aeromexico',
    wiki_url: 'https://en.wikipedia.org/wiki/Aeromexico',
    hint: 'A__o_exi_o',
    clue: 'Is the flag carrier airline of Mexico based in Mexico City.|The airline was established as Aeronaves de México on 15 September 1934.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_mx_pemex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_mx_pemex.png',
    brand: 'Pemex',
    wiki_url: 'https://en.wikipedia.org/wiki/Pemex',
    hint: '_e__x',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_akzonobel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_akzonobel.png',
    brand: 'Akzonobel',
    wiki_url: 'https://en.wikipedia.org/wiki/Akzonobel',
    hint: 'Akzo_o_e_',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_amstel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_amstel.png',
    brand: 'Amstel',
    wiki_url: 'https://en.wikipedia.org/wiki/Amstel',
    hint: 'Am_t_l',
    clue: 'A Dutch brewery.|Founded on 11 June 1870 in Amsterdam.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_campina_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_campina.png',
    brand: 'Campina',
    wiki_url: 'https://en.wikipedia.org/wiki/Campina',
    hint: '_a_pi_a',
    clue: 'A Dutch dairy cooperative.|Founded in 1979.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_chocomel_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_chocomel.png',
    brand: 'Chocomel',
    wiki_url: 'https://en.wikipedia.org/wiki/Chocomel',
    hint: 'Ch__om__',
    clue: 'A chocolate flavoured milk, produced by Campina.|It was formerly produced by Nutricia and Riedel Drinks.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_delta_lloyd_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_delta_lloyd.png',
    brand: 'Delta Lloyd',
    wiki_url: 'https://en.wikipedia.org/wiki/Delta Lloyd',
    hint: 'D___a Ll_yd',
    clue: 'A Dutch insurer with operations in the Netherlands, Belgium and Germany.|The company is the sixth-largest insurer in the Netherlands, with a market share of approximately 8%.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_jumbo_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_jumbo.png',
    brand: 'Jumbo',
    wiki_url: 'https://en.wikipedia.org/wiki/Jumbo',
    hint: '_u__o',
    clue: 'A Dutch founded jigsaw puzzle and games company.|Was established in 1853 and is owned by M&R de Monchy N.V.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_kpn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_kpn.png',
    brand: 'Kpn',
    wiki_url: 'https://en.wikipedia.org/wiki/Kpn',
    hint: '_PN',
    clue: 'A Dutch landline and mobile telecommunications company.|The company is based in The Hague.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_mexx_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_mexx.png',
    brand: 'Mexx',
    wiki_url: 'https://en.wikipedia.org/wiki/Mexx',
    hint: 'M__x',
    clue: 'Was an international fashion company that designed clothes and accessories for men, women and children.|December 5, 2014, it was declared bankrupt.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_randstad_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nl_randstad.png',
    brand: 'Randstad',
    wiki_url: 'https://en.wikipedia.org/wiki/Randstad',
    hint: '_and__a_',
    clue: "A Dutch multinational human resource consulting firm.|World's second-largest HR service provider after Adecco.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_no_helly_hansen_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_no_helly_hansen.png',
    brand: 'Helly Hansen',
    wiki_url: 'https://en.wikipedia.org/wiki/Helly Hansen',
    hint: 'He___ Han_e_',
    clue: 'A producer of textiles and gear for sports and work on the ocean and in the mountains, headquartered in Oslo, Norway.|It was founded in 1877.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_nz_air_new_zealand_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_nz_air_new_zealand.png',
    brand: 'Air New Zealand',
    wiki_url: 'https://en.wikipedia.org/wiki/Air New Zealand',
    hint: '__r _e_ Zeal___',
    clue: 'The national airline and flag carrier of New Zealand.|The airline operates scheduled passenger flights to 25 domestic and 26 international destinations.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_pl_b_plus_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_pl_b_plus.png',
    brand: 'Plus',
    wiki_url: 'https://en.wikipedia.org/wiki/Plus',
    hint: 'p_u_',
    clue: 'An interbank network that covers all Visa credit, debit, and prepaid cards, as well as ATM cards issued by various banks worldwide.|Founded\tApril 1, 1982 and owned by Visa.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_pl_b_solaris_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_pl_b_solaris.png',
    brand: 'Solaris',
    wiki_url: 'https://en.wikipedia.org/wiki/Solaris',
    hint: 'so_ar__',
    clue: "A Unix operating system originally developed by Sun Microsystems.|Has been owned by Oracle Corporation since Oracle's acquisition of Sun in January 2010.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_pl_tvn_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_pl_tvn.png',
    brand: 'Tvn',
    wiki_url: 'https://en.wikipedia.org/wiki/Tvn',
    hint: '_VN',
    clue: 'Was an Australian thoroughbred horse-racing TV channel.|It was carried on Foxtel, Austar and Optus TV.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_pl_zywiec_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_pl_zywiec.png',
    brand: 'Zywiec',
    wiki_url: 'https://en.wikipedia.org/wiki/Zywiec',
    hint: '_YWI_C',
    clue: 'A brewery founded in 1856 in Poland.|It was owned by the Habsburgs until it was confiscated by the post-WWII Communist government of Poland.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_pt_galp_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_pt_galp.png',
    brand: 'Galp',
    wiki_url: 'https://en.wikipedia.org/wiki/Galp',
    hint: 'G_l_',
    clue: 'A Portuguese corporation which consists of more than 100 companies engaged in activities such as natural gas supply.|It was founded in 1999.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_pt_nos_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_pt_nos.png',
    brand: 'Nos',
    wiki_url: 'https://en.wikipedia.org/wiki/Nos',
    hint: '_OS',
    clue: 'An automotive performance company based in Bowling Green, Kentucky.|A brand that is owned by Holley Performance Products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ru_beeline_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ru_beeline.png',
    brand: 'Beeline',
    wiki_url: 'https://en.wikipedia.org/wiki/Beeline',
    hint: '_e_li_e',
    clue: 'Russian telecommunications brand by OJSC VimpelCom.|Associate the brand with the principles of brightness, friendliness, simplicity, and positive emotions.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ru_mts_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ru_mts.png',
    brand: 'Mts',
    wiki_url: 'https://en.wikipedia.org/wiki/Mts',
    hint: '_TS',
    clue: 'The largest mobile operator in Russia and CIS.|Started in the Moscow license zone in 1994.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ru_rosneft_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ru_rosneft.png',
    brand: 'Rosneft',
    wiki_url: 'https://en.wikipedia.org/wiki/Rosneft',
    hint: '_os_e_t',
    clue: "An integrated oil company majority owned by the Government of Russia.|Headquartered in Moscow's Balchug district near the Kremlin, across the Moskva River.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ru_yandex_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ru_yandex.png',
    brand: 'Yandex',
    wiki_url: 'https://en.wikipedia.org/wiki/Yandex',
    hint: 'Yand__',
    clue: 'A Russian Internet company which operates the largest search engine in Russia.|It also develops a number of Internet-based services and products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_se_abba_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_se_abba.png',
    brand: 'Abba',
    wiki_url: 'https://en.wikipedia.org/wiki/Abba',
    hint: '_B_A',
    clue: 'Was a Swedish pop group formed in Stockholm.|Agnetha Fältskog, Björn Ulvaeus, Benny Andersson, and Anni-Frid Lyngstad.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_se_telia_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_se_telia.png',
    brand: 'Telia',
    wiki_url: 'https://en.wikipedia.org/wiki/Telia',
    hint: '___ia',
    clue: 'The dominant telephone company and mobile network operator in Sweden and Finland.|The result of a 2002 merger between a Swedish and Finnish telecommunications companies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_tr_turkcell_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_tr_turkcell.png',
    brand: 'Turkcell',
    wiki_url: 'https://en.wikipedia.org/wiki/Turkcell',
    hint: '_u_k_el_',
    clue: 'The leading mobile phone operator of Turkey, based in Istanbul.|Founded in 1994.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_ua_antonov_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_ua_antonov.png',
    brand: 'Antonov',
    wiki_url: 'https://en.wikipedia.org/wiki/Antonov',
    hint: 'An__no_',
    clue: 'A Ukrainian aircraft manufacturing and services company.|It was founded in 1946.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_aquafresh_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_aquafresh.png',
    brand: 'Aquafresh',
    wiki_url: 'https://en.wikipedia.org/wiki/Aquafresh',
    hint: '_qua_r_sh',
    clue: 'A brand of oral healthcare products.|Manufactured by consumer healthcare product maker GlaxoSmithKline.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_asda_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_asda.png',
    brand: 'Asda',
    wiki_url: 'https://en.wikipedia.org/wiki/Asda',
    hint: 'A__A',
    clue: 'An American owned Britishsupermarket chain which retails food, clothing, general merchandise, toys and financial services.|It also has a mobile phone network.',
    easy: true
  },
  {
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_bbc.png',
    brand: 'Bbc',
    wiki_url: 'https://en.wikipedia.org/wiki/Bbc',
    hint: '_BC',
    clue: "The public-service broadcaster of the United Kingdom, headquartered at Broadcasting House in London.|World's oldest national broadcasting organisation.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_b_engie_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_b_engie.png',
    brand: 'Engie',
    wiki_url: 'https://en.wikipedia.org/wiki/Engie',
    hint: 'E___e',
    clue: 'A French multinational electric utility company.|Operates in the fields of electricity generation and distribution, natural gas and renewable energy.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_b_iceland_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_b_iceland.png',
    brand: 'Iceland',
    wiki_url: 'https://en.wikipedia.org/wiki/Iceland',
    hint: '_c_la_d',
    clue: 'A Nordic island country between the North Atlantic and the Arctic Ocean.|The capital and largest city is Reykjavík.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_b_virgin_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_b_virgin.png',
    brand: 'Virgin',
    wiki_url: 'https://en.wikipedia.org/wiki/Virgin',
    hint: 'Virg__',
    clue: 'Provides fixed and mobile telephone, television and broadband internet services.|Its headquarters are in Hook, United Kingdom.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_b_wonka_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_b_wonka.png',
    brand: 'Wonka',
    wiki_url: 'https://en.wikipedia.org/wiki/Wonka',
    hint: '__n_a',
    clue: "A British brand of candy owned and licensed by Swiss corporation Nestlé.|Brand's inception comes from materials licensed from British author Roald Dahl.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_cadbury_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_cadbury.png',
    brand: 'Cadbury',
    wiki_url: 'https://en.wikipedia.org/wiki/Cadbury',
    hint: 'C_db_r_',
    clue: 'A British multinational confectionery company owned by Mondelēz International.|The second largest confectionery brand in the world. Founded in 1824 in The United Kingdom.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_argos_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_argos.png',
    brand: 'Argos',
    wiki_url: 'https://en.wikipedia.org/wiki/Argos',
    hint: 'Ar___',
    clue: 'The fourth largest cement producer in Latin America.|Was founded in Medellín, Colombia on February 27, 1934,.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_asos_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_asos.png',
    brand: 'Asos',
    wiki_url: 'https://en.wikipedia.org/wiki/Asos',
    hint: 'AS__',
    clue: 'A British online fashion and beauty store.|Was established in June 2000 by Nick Robertson.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_daily_mail_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_daily_mail.png',
    brand: 'Daily Mail',
    wiki_url: 'https://en.wikipedia.org/wiki/Daily Mail',
    hint: 'D_i_y _ail',
    clue: 'Is a British daily middle-market tabloid newspaper.|First published in 1896 by Lord Northcliffe.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_nationwide_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_nationwide.png',
    brand: 'Nationwide',
    wiki_url: 'https://en.wikipedia.org/wiki/Nationwide',
    hint: '_a_i__wide',
    clue: 'A group of large U.S. insurance and financial services companies based in Columbus, OH.|Founded in 1926.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_primark_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_primark.png',
    brand: 'Primark',
    wiki_url: 'https://en.wikipedia.org/wiki/Primark',
    hint: 'Pri_a__',
    clue: 'An Irish clothing retailer.|It was founded and headquartered in Dublin, Ireland.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_thomas_cook_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_thomas_cook.png',
    brand: 'Thomas Cook',
    wiki_url: 'https://en.wikipedia.org/wiki/Thomas Cook',
    hint: 'Tho_a_ C_o_',
    clue: 'Https://www.google.ca/?gfe_rd=cr&ei=kx8pVvr8IMmC8Qem9YtI.|Https://www.google.ca/?gfe_rd=cr&ei=kx8pVvr8IMmC8Qem9YtI.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_topshop_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_c_topshop.png',
    brand: 'Topshop',
    wiki_url: 'https://en.wikipedia.org/wiki/Topshop',
    hint: 't_p_h_p',
    clue: 'British multinational fashion retailer of clothing, shoes, make-up and accessories.|It has around 500 shops worldwide.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_easyjet_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_easyjet.png',
    brand: 'Easyjet',
    wiki_url: 'https://en.wikipedia.org/wiki/Easyjet',
    hint: '_asy_e_',
    clue: 'A British low-cost airline carrier.|The largest airline of the United Kingdom.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_hoover_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_uk_hoover.png',
    brand: 'Hoover',
    wiki_url: 'https://en.wikipedia.org/wiki/Hoover',
    hint: 'Hoo__r',
    clue: 'Started out as an American floor care manufacturer based in North Canton, Ohio.|Dominated the electric vacuum cleaner industry.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_abc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_abc.png',
    brand: 'Abc',
    wiki_url: 'https://en.wikipedia.org/wiki/Abc',
    hint: 'AB_',
    clue: 'American commercial broadcast television network.|The television network has eight owned-and-operated and over 232 affiliated television stations.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_aflac_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_aflac.png',
    brand: 'Aflac',
    wiki_url: 'https://en.wikipedia.org/wiki/Aflac',
    hint: 'Af__c',
    clue: 'Is an American insurance company.|Founded in 1955 and based in Columbus, Georgia.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_alaska_airlines_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_alaska_airlines.png',
    brand: 'Alaska Airlines',
    wiki_url: 'https://en.wikipedia.org/wiki/Alaska Airlines',
    hint: 'A_____ A_r__nes',
    clue: 'The seventh largest airline in the United States.|Has flights to more than one hundred destinations in the contiguous United States, Alaska, Hawaii,Canada and Mexico.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_amway_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_amway.png',
    brand: 'Amway',
    wiki_url: 'https://en.wikipedia.org/wiki/Amway',
    hint: 'A__a_',
    clue: 'An American company using a multi-level marketing model to sell a variety of products.|Founded in 1959 byJay Van Andel and Richard DeVos.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_budweiser_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_budweiser.png',
    brand: 'Budweiser',
    wiki_url: 'https://en.wikipedia.org/wiki/Budweiser',
    hint: '_udwe__er',
    clue: 'A pale lager produced by Anheuser–Busch InBev.|One of the highest selling beers in the United States and is available in over 80 markets worldwide.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_avis_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_avis.png',
    brand: 'Avis',
    wiki_url: 'https://en.wikipedia.org/wiki/Avis',
    hint: 'AV__',
    clue: 'American car rental company headquartered in New Jersey.|A leading rental car provider to the commercial segment.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_banana_republic_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_banana_republic.png',
    brand: 'Banana Republic',
    wiki_url: 'https://en.wikipedia.org/wiki/Banana Republic',
    hint: '___ana _epu____',
    clue: 'Clothing and accessories retailer owned by American multinational corporation, Gap Inc.|It was founded in 1978 by Mel and Patricia Ziegler with a safari theme.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_baskin_robbins_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_baskin_robbins.png',
    brand: 'Baskin Robbins',
    wiki_url: 'https://en.wikipedia.org/wiki/Baskin Robbins',
    hint: 'B_s_i_ ____ins',
    clue: "The world's largest chain of ice cream specialty shops.|It was founded in 1945 by Burt Baskin and Irv Robbins in Glendale, California.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_forbes_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_forbes.png',
    brand: 'Forbes',
    wiki_url: 'https://en.wikipedia.org/wiki/Forbes',
    hint: 'For__s',
    clue: 'An American business magazine, it features original articles on finance, industry, investing, and marketing topics.|Started in 1917, Its headquarters is located in New Jersey.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_john_deere_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_john_deere.png',
    brand: 'John Deere',
    wiki_url: 'https://en.wikipedia.org/wiki/John Deere',
    hint: 'Joh_ Dee__',
    clue: 'An American corporation that manufactures agricultural, construction, and forestry machinery.|Founded in Grand Detour, Illinois in 1837.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_netflix_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_netflix.png',
    brand: 'Netflix',
    wiki_url: 'https://en.wikipedia.org/wiki/Netflix',
    hint: '_et_li_',
    clue: 'An American provider of on-demand Internet streaming media available to viewers.|The company was established in 1997 and is headquartered in Los Gatos, California.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_radioshack_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_radioshack.png',
    brand: 'Radioshack',
    wiki_url: 'https://en.wikipedia.org/wiki/Radioshack',
    hint: 'Ra_io__a_k',
    clue: 'An American electronics retail chain.|Founded in 1921.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_rite_aid_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_rite_aid.png',
    brand: 'Rite Aid',
    wiki_url: 'https://en.wikipedia.org/wiki/Rite Aid',
    hint: '_it_ _id',
    clue: 'A drugstore chain in the United States.|A Fortune 500 company headquartered in Pennsylvania.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_the_cw_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_the_cw.png',
    brand: 'The Cw',
    wiki_url: 'https://en.wikipedia.org/wiki/The Cw',
    hint: '___ CW',
    clue: 'American broadcast television network.|The network made its debut on September 18, 2006.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_tory_burch_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_tory_burch.png',
    brand: 'Tory Burch',
    wiki_url: 'https://en.wikipedia.org/wiki/Tory Burch',
    hint: 'To_y _ur_h',
    clue: 'American fashion designer, businesswoman, and philanthropist.|CEO, and Designer of Tory.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_union_pacific_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_union_pacific.png',
    brand: 'Union Pacific',
    wiki_url: 'https://en.wikipedia.org/wiki/Union Pacific',
    hint: 'Uni_n __c__i_',
    clue: 'Is a Class I line haul freight railroad.|It is the largest in the United States and is serviced by more than 50,000 employees.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_usa_network_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_usa_network.png',
    brand: 'Usa Network',
    wiki_url: 'https://en.wikipedia.org/wiki/Usa Network',
    hint: '___ Netw_rk',
    clue: 'An American basic cable and satellite television channel.|Owned by the NBCUniversal Cable division of NBCUniversal.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_us_airways_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_us_airways.png',
    brand: 'Us Airways',
    wiki_url: 'https://en.wikipedia.org/wiki/Us Airways',
    hint: '__ Airwa_s',
    clue: 'Was a major American airline that ceased operations on October 17, 2015.|Had 193 destinations in 24 countries in North America, South America, Europe and the Middle East.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_youtube_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_b_youtube.png',
    brand: 'Youtube',
    wiki_url: 'https://en.wikipedia.org/wiki/Youtube',
    hint: 'Y__Tu_e',
    clue: 'A video-sharing website headquartered in San Bruno, California, United States.|The website allows users to upload, view, and share videos.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_centurylink_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_centurylink.png',
    brand: 'Centurylink',
    wiki_url: 'https://en.wikipedia.org/wiki/Centurylink',
    hint: 'Cen__ryL___',
    clue: 'An American multinational communications company.|Provides communications and data services to residential, business, governmental and wholesale customers.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_albertsons_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_albertsons.png',
    brand: 'Albertsons',
    wiki_url: 'https://en.wikipedia.org/wiki/Albertsons',
    hint: '_lb_r_so_s',
    clue: 'An American grocery company founded and based in Boise, Idaho.|In January 2015, it acquired Safeway Inc. for $9.2 billion.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_buffalo_wild_wings_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_buffalo_wild_wings.png',
    brand: 'Buffalo Wild Wings',
    wiki_url: 'https://en.wikipedia.org/wiki/Buffalo Wild Wings',
    hint: '_uf__l_ _i_d ____s',
    clue: 'An American casual dining restaurant and sports bar franchise.|Specializes in chicken wings and sauces.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_cheerios_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_cheerios.png',
    brand: 'Cheerios',
    wiki_url: 'https://en.wikipedia.org/wiki/Cheerios',
    hint: '_h__r_os',
    clue: 'American brand of breakfast cereals manufactured by General Mills.|In the United Kingdom, it is marketed by Cereal Partners under the Nestlé brand.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_conocophillips_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_conocophillips.png',
    brand: 'Conocophillips',
    wiki_url: 'https://en.wikipedia.org/wiki/Conocophillips',
    hint: 'C_____P__ll_ps',
    clue: 'An American multinational energy corporation with its headquarters located in Houston, Texas.|Created through the merger of Conoco Inc. and Phillips Petroleum Co.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_dupont_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_dupont.png',
    brand: 'Dupont',
    wiki_url: 'https://en.wikipedia.org/wiki/Dupont',
    hint: 'D__ont',
    clue: 'An American chemical company.|Founded in July 1802 as a gunpowder mill by Éleuthère Irénée du Pont.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_gamestop_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_gamestop.png',
    brand: 'Gamestop',
    wiki_url: 'https://en.wikipedia.org/wiki/Gamestop',
    hint: '___e_top',
    clue: 'An American video game, consumer electronics, and wireless services retailer.|The company is headquartered in Grapevine, Texas.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_geico_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_geico.png',
    brand: 'Geico',
    wiki_url: 'https://en.wikipedia.org/wiki/Geico',
    hint: '_e__o',
    clue: 'An auto insurance company.|It is the second largest auto insurer in the United States, after State Farm.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_greyhound_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_greyhound.png',
    brand: 'Greyhound',
    wiki_url: 'https://en.wikipedia.org/wiki/Greyhound',
    hint: 'gr___ound',
    clue: '',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_groupon_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_groupon.png',
    brand: 'Groupon',
    wiki_url: 'https://en.wikipedia.org/wiki/Groupon',
    hint: '_r_upo_',
    clue: 'A global e-commerce marketplace.|Connecting subscribers with local merchants by offering activities, travel, goods and services in more than 45 countries.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_honeywell_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_honeywell.png',
    brand: 'Honeywell',
    wiki_url: 'https://en.wikipedia.org/wiki/Honeywell',
    hint: '_oneyw__l',
    clue: 'An American multinational conglomerate company.|In 1906, Mark C. founded the company in Wabash, Indiana.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_iams_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_iams.png',
    brand: 'Iams',
    wiki_url: 'https://en.wikipedia.org/wiki/Iams',
    hint: '_a_s',
    clue: 'A brand name for dog food and cat food manufactured by Mars, Inc and Procter & Gamble.|The company sells pet food for cats and dogs formulated for puppy/kitten, adult and mature.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_juicy_fruit_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_juicy_fruit.png',
    brand: 'Juicy Fruit',
    wiki_url: 'https://en.wikipedia.org/wiki/Juicy Fruit',
    hint: '__icy _rui_',
    clue: 'A flavor of chewing gum made by the Wrigley Company.|It was introduced in 1893.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_maltesers_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_maltesers.png',
    brand: 'Maltesers',
    wiki_url: 'https://en.wikipedia.org/wiki/Maltesers',
    hint: 'M_ltese__',
    clue: 'A confectionery product manufactured by Mars, Incorporated.|Consist of a roughly spherical malt honeycomb-like structured centre, surrounded by milk chocolate.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_merck_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_merck.png',
    brand: 'Merck',
    wiki_url: 'https://en.wikipedia.org/wiki/Merck',
    hint: 'Me___',
    clue: 'Is an American pharmaceutical company and one of the largest pharmaceutical companies in the world.|Traces its origins to Jacob Friedrich Merck.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_myspace_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_myspace.png',
    brand: 'Myspace',
    wiki_url: 'https://en.wikipedia.org/wiki/Myspace',
    hint: '_y_p_ce',
    clue: 'A social networking service with a strong music emphasis founded by Chris Dewolfe and Tom Anderson.|Owned by Specific Media LLC and Justin Timberlake.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_nordstrom_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_nordstrom.png',
    brand: 'Nordstrom',
    wiki_url: 'https://en.wikipedia.org/wiki/Nordstrom',
    hint: 'n_rdst_o_',
    clue: 'An American upscale fashion retailer.|Began as a shoe retailer and expanded its inventory to include clothing, handbags, jewelry, cosmetics, and fragrances.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_quaker_oats_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_quaker_oats.png',
    brand: 'Quaker Oats',
    wiki_url: 'https://en.wikipedia.org/wiki/Quaker Oats',
    hint: '_uake_ _a_s',
    clue: 'An American food conglomerate based in Chicago. It has been owned by PepsiCo since 2001.|It was founded in 1901 by the merger of four oat mills.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_state_farm_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_state_farm.png',
    brand: 'State Farm',
    wiki_url: 'https://en.wikipedia.org/wiki/State Farm',
    hint: 'St_te F_r_',
    clue: 'A group of insurance and financial services companies in the United States.|Was founded in 1922 by George J. Mecherle as a mutual automobile insurance company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_time_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_time.png',
    brand: 'Time',
    wiki_url: 'https://en.wikipedia.org/wiki/Time',
    hint: 'Ti__',
    clue: 'An American weekly news magazine published in New York City.|It was founded in 1923.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_vogue_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_c_vogue.png',
    brand: 'Vogue',
    wiki_url: 'https://en.wikipedia.org/wiki/Vogue',
    hint: 'V__u_',
    clue: 'A fashion and lifestyle magazine that is published monthly in 23 different national and regional editions by Condé Nast.|A weekly newspaper in the United States introduced in 1892.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_ace_hardware_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_ace_hardware.png',
    brand: 'Ace Hardware',
    wiki_url: 'https://en.wikipedia.org/wiki/Ace Hardware',
    hint: 'Ace h____ar_',
    clue: `A retailers' cooperative based in Oak Brook, Illinois, United States.|Slogan "The Helpful Place".`,
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_allegiant_air_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_allegiant_air.png',
    brand: 'Allegiant Air',
    wiki_url: 'https://en.wikipedia.org/wiki/Allegiant Air',
    hint: '_l__g_a__ Air',
    clue: 'An American low-cost airline that operates scheduled and charter flights.|The corporate headquarters are in Enterprise, Nevada.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_cheetos_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_cheetos.png',
    brand: 'Cheetos',
    wiki_url: 'https://en.wikipedia.org/wiki/Cheetos',
    hint: '_hee_o_',
    clue: 'A brand of cheese-flavored, puffed cornmeal snacks made by Frito-Lay.|Invented in 1948 by Fritos creator Charles Elmer Doolin.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_jelly_belly_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_jelly_belly.png',
    brand: 'Jelly Belly',
    wiki_url: 'https://en.wikipedia.org/wiki/Jelly Belly',
    hint: 'J_l_y B__ly',
    clue: 'Manufacture Jelly Belly jelly beans and other candy.|The company is based in Fairfield, California.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_nerf_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_nerf.png',
    brand: 'Nerf',
    wiki_url: 'https://en.wikipedia.org/wiki/Nerf',
    hint: '_e_f',
    clue: 'Is a toy brand created by Parker Brothers and currently owned by Hasbro.|First established in 1969.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_pbs_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_pbs.png',
    brand: 'Pbs',
    wiki_url: 'https://en.wikipedia.org/wiki/Pbs',
    hint: '_BS',
    clue: 'An American public broadcaster and television program distributor.|Headquartered in Arlington, Virginia, and founded in 1970.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_qualcomm_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_qualcomm.png',
    brand: 'Qualcomm',
    wiki_url: 'https://en.wikipedia.org/wiki/Qualcomm',
    hint: 'Q__l_om_',
    clue: 'American global semiconductor company.|Designs and markets wireless telecommunications products and services.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_red_lobster_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_red_lobster.png',
    brand: 'Red Lobster',
    wiki_url: 'https://en.wikipedia.org/wiki/Red Lobster',
    hint: '___ Lobs_er',
    clue: 'An American casual dining restaurant chain.|Headquartered in Orlando, Florida.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_sherwin_williams_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_sherwin_williams.png',
    brand: 'Sherwin Williams',
    wiki_url: 'https://en.wikipedia.org/wiki/Sherwin Williams',
    hint: 'sh_____ w_l_i__s',
    clue: 'An American Fortune 500 company in the general building materials industry.|Primarily engages in the manufacture, distribution, and sale of paints, coatings and related products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_skechers_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_skechers.png',
    brand: 'Skechers',
    wiki_url: 'https://en.wikipedia.org/wiki/Skechers',
    hint: 'Sk___e_s',
    clue: 'American shoe company.|The company offers two distinct footwear categories: a lifestyle division and a performance division.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_spirit_airlines_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_d_spirit_airlines.png',
    brand: 'Spirit Airlines',
    wiki_url: 'https://en.wikipedia.org/wiki/Spirit Airlines',
    hint: '___r_t Air____s',
    clue: 'An American low-cost carrier headquartered in Miramar, Florida.|Operates scheduled flights throughout the U.S. as well as the Caribbean, Mexico, and Latin America.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_airbnb_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_airbnb.png',
    brand: 'Airbnb',
    wiki_url: 'https://en.wikipedia.org/wiki/Airbnb',
    hint: '_i_bnb',
    clue: 'A website for people to list, find, and rent lodging.|Founded in August 2008 and headquartered in San Francisco, California.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_amc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_amc.png',
    brand: 'Amc',
    wiki_url: 'https://en.wikipedia.org/wiki/Amc',
    hint: 'AM_',
    clue: 'American basic cable and satellite television channel.|Channel primarily airs theatrically released movies, along with a limited amount of original programming.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_betty_crocker_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_betty_crocker.png',
    brand: 'Betty Crocker',
    wiki_url: 'https://en.wikipedia.org/wiki/Betty Crocker',
    hint: 'Bet__ c___ke_',
    clue: 'A brand name and trademark of General Mills, an American Fortune 500 corporation.|The name was first developed by the Washburn Crosby Company in 1921.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_caterpillar_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_caterpillar.png',
    brand: 'Caterpillar',
    wiki_url: 'https://en.wikipedia.org/wiki/Caterpillar',
    hint: '___erpill__',
    clue: 'An American corporation which designs, develops, manufactures, and markets machinery, engines, and insurance to customers.|Ranked #59 on the Fortune 500 list.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_centrum_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_centrum.png',
    brand: 'Centrum',
    wiki_url: 'https://en.wikipedia.org/wiki/Centrum',
    hint: 'C_n_ru_',
    clue: 'A brand of multivitamins.|Produced by Pfizer.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_crest_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_crest.png',
    brand: 'Crest',
    wiki_url: 'https://en.wikipedia.org/wiki/Crest',
    hint: 'C___t',
    clue: 'A brand of toothpaste made by Procter & Gamble.|It was introduced in the United States in 1955.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_dollar_tree_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_dollar_tree.png',
    brand: 'Dollar Tree',
    wiki_url: 'https://en.wikipedia.org/wiki/Dollar Tree',
    hint: 'Do__ar T_e_',
    clue: 'An American chain of discount variety stores that sells items for $1 or less.|Headquartered in the Norfolk suburb of Chesapeake, Virginia.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_dow_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_dow.png',
    brand: 'Dow',
    wiki_url: 'https://en.wikipedia.org/wiki/Dow',
    hint: 'Do_',
    clue: 'A stock market index.|In 1884, Charles Dow composed his first stock average, which contained nine railroads and two industrial companies.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_folgers_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_folgers.png',
    brand: 'Folgers',
    wiki_url: 'https://en.wikipedia.org/wiki/Folgers',
    hint: 'Fol__r_',
    clue: 'A popular brand of coffee in the United States.|It was founded in 1850.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_krispy_kreme_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_krispy_kreme.png',
    brand: 'Krispy Kreme',
    wiki_url: 'https://en.wikipedia.org/wiki/Krispy Kreme',
    hint: '_ri___ _reme',
    clue: 'An American global doughnut company and coffeehouse chain.|Founder Vernon Rudolph bought a yeast-raised recipe from a New Orleans chef.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_maxwell_house_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_maxwell_house.png',
    brand: 'Maxwell House',
    wiki_url: 'https://en.wikipedia.org/wiki/Maxwell House',
    hint: '_a__el_ H_u_e',
    clue: 'A brand of coffee manufactured by a like-named division of Kraft Foods.|Introduced in 1892.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_petsmart_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_petsmart.png',
    brand: 'Petsmart',
    wiki_url: 'https://en.wikipedia.org/wiki/Petsmart',
    hint: 'Pe_S___t',
    clue: 'Is a American retail chain operating in the United States, Canada, and Puerto Rico.|Was founded in 1986.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_qvc_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_qvc.png',
    brand: 'Qvc',
    wiki_url: 'https://en.wikipedia.org/wiki/Qvc',
    hint: 'Q_C',
    clue: 'American cable, satellite and broadcast television network.|Founded in 1986 by Joseph Segel in West Chester, Pennsylvania.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_sonic_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_sonic.png',
    brand: 'Sonic',
    wiki_url: 'https://en.wikipedia.org/wiki/Sonic',
    hint: '__ni_',
    clue: 'A video game franchise created and owned by Sega.|The protagonist of the series is an anthropomorphic blue hedgehog.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_tyson_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_e_tyson.png',
    brand: 'Tyson',
    wiki_url: 'https://en.wikipedia.org/wiki/Tyson',
    hint: '_y_o_',
    clue: "An American multinational corporation.|The company is the world's second largest processor and marketer of chicken, beef, and pork.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_fossil_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_fossil.png',
    brand: 'Fossil',
    wiki_url: 'https://en.wikipedia.org/wiki/Fossil',
    hint: '_ossi_',
    clue: 'An American designer and manufacturer ofclothing and accessories.|Founded in 1984 as Overseas Products International by Tom Kartsotis.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_fandango_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_fandango_b.png',
    brand: 'Fandango',
    wiki_url: 'https://en.wikipedia.org/wiki/Fandango',
    hint: 'fa_d_n__',
    clue: 'A corporation in the United States that sells movie tickets via telephone and Internet.|Charges a premium to use its services.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_hulu_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_hulu_b.png',
    brand: 'Hulu',
    wiki_url: 'https://en.wikipedia.org/wiki/Hulu',
    hint: '_u_u',
    clue: 'An American online company and ad-supported streaming service.|Offers a selection of TV shows, clips, movies, and more.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_jimmy_johns_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_jimmy_johns_b.png',
    brand: 'Jimmy Johns',
    wiki_url: 'https://en.wikipedia.org/wiki/Jimmy Johns',
    hint: 'Ji__y __hns',
    clue: 'A franchised sandwich restaurant chain.|Founded by Jimmy John Liautaud in 1983 and headquartered in Champaign, Illinois.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_nasdaq_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_nasdaq_b.png',
    brand: 'Nasdaq',
    wiki_url: 'https://en.wikipedia.org/wiki/Nasdaq',
    hint: 'N_sd_q',
    clue: 'An American stock exchange.|The second-largest exchange in the world by market capitalization.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_panda_express_a.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_panda_express_b.png',
    brand: 'Panda Express',
    wiki_url: 'https://en.wikipedia.org/wiki/Panda Express',
    hint: 'P___a _xpr__s',
    clue: 'A fast casual restaurant chain which serves American Chinese cuisine.|Traditionally located in shopping mall food courts.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_payless_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_payless_a.png',
    brand: 'Payless',
    wiki_url: 'https://en.wikipedia.org/wiki/Payless',
    hint: '_ay_e_s',
    clue: 'An American discount footwear retailer.|Headquartered in Topeka, Kansas in 1956.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_priceline_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_priceline_a.png',
    brand: 'Priceline',
    wiki_url: 'https://en.wikipedia.org/wiki/Priceline',
    hint: 'pr_cel_n_',
    clue: 'A commercial website that claims to help users obtain discount rates for travel-related purchases.|The company is not a direct supplier of these services.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_quaker_state_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_quaker_state_a.png',
    brand: 'Quaker State',
    wiki_url: 'https://en.wikipedia.org/wiki/Quaker State',
    hint: 'Q_a_er St___',
    clue: 'An American brand of a motor oil made by SOPUS Products.|Founded by William Penn.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_ufc_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_ufc_a.png',
    brand: 'Ufc',
    wiki_url: 'https://en.wikipedia.org/wiki/Ufc',
    hint: 'U_C',
    clue: 'The largest mixed martial arts promotion companyin the world.|Has held over 300 events to date.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_usps_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_usps_a.png',
    brand: 'Usps',
    wiki_url: 'https://en.wikipedia.org/wiki/Usps',
    hint: '_S_S',
    clue: 'An independent agency of the United States federal government responsible for providingpostal service in the United States.|The U.S. Mail traces its roots to 1775.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_vicks_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_vicks_a.png',
    brand: 'Vicks',
    wiki_url: 'https://en.wikipedia.org/wiki/Vicks',
    hint: 'V_c__',
    clue: 'A brand of over-the-counter medications owned by the American company Procter & Gamble.|It manufactures NyQuil and its morning sister medication, DayQuil.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_xfinity_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_f_xfinity_a.png',
    brand: 'Xfinity',
    wiki_url: 'https://en.wikipedia.org/wiki/Xfinity',
    hint: '_fin__y',
    clue: 'A U.S.-based international mass media company.|It is the largest cable company and home Internet service provider in the US.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_aeropostale_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_aeropostale_a.png',
    brand: 'Aeropostale',
    wiki_url: 'https://en.wikipedia.org/wiki/Aeropostale',
    hint: 'Ae___o__ale',
    clue: "American shopping mall-based specialty retailer of casual apparel and accessories.|First store was opened in 1987 by Macy's in the Westside Pavilion Mall in LA.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_bechtel_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_bechtel_a.png',
    brand: 'Bechtel',
    wiki_url: 'https://en.wikipedia.org/wiki/Bechtel',
    hint: 'B___tel',
    clue: "The largest construction and civil engineering company.|The company's business activities began in 1898.",
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_cabelas_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_cabelas_a.png',
    brand: 'Cabelas',
    wiki_url: 'https://en.wikipedia.org/wiki/Cabelas',
    hint: '_a__las',
    clue: 'Direct marketer and specialty retailer of hunting, fishing, camping, shooting, and related outdoor recreation merchandise.|Founded by Richard N. Cabela.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_jbl_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_jbl_a.png',
    brand: 'Jbl',
    wiki_url: 'https://en.wikipedia.org/wiki/Jbl',
    hint: 'JB_',
    clue: 'An American audio electronics company currently owned by Harman International.|It was founded in 1946 by James Bullough Lansing.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_little_caesars_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_little_caesars_a.png',
    brand: 'Little Caesars',
    wiki_url: 'https://en.wikipedia.org/wiki/Little Caesars',
    hint: '__ttle ____a_s',
    clue: 'The third largest pizza chain in the United States.|Founded by husband and wife Mike and Marian Ilitch on May 8, 1959.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_lyft_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_lyft_a.png',
    brand: 'Lyft',
    wiki_url: 'https://en.wikipedia.org/wiki/Lyft',
    hint: '__FT',
    clue: 'A transportation network company based in San Francisco, California.|Launched in June 2012 and operates in approximately 300 U.S. cities.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_orange_julius_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_orange_julius_a.png',
    brand: 'Orange Julius',
    wiki_url: 'https://en.wikipedia.org/wiki/Orange Julius',
    hint: '_r_n__ J_li_s',
    clue: 'An American chain of fruit drink beverage stores.|It has been in business since the late 1920s.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_sinclair_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_sinclair_a.png',
    brand: 'Sinclair',
    wiki_url: 'https://en.wikipedia.org/wiki/Sinclair',
    hint: 'S__c__ir',
    clue: 'An American petroleum corporation.|Founded by Harry F. Sinclair on May 1, 1916.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_valve_b.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_g_valve_a.png',
    brand: 'Valve',
    wiki_url: 'https://en.wikipedia.org/wiki/Valve',
    hint: '__LVE',
    clue: 'An American video game developer and digital distribution company.|Known for the Half-Life, Counter-Strike, Portal, Day of Defeat, Team Fortress, Left 4 Dead, and Dota 2 games.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_old_navy_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_old_navy.png',
    brand: 'Old Navy',
    wiki_url: 'https://en.wikipedia.org/wiki/Old Navy',
    hint: 'Ol_ __vy',
    clue: 'A popular clothing and accessories retailer.|Owned by American multinational corporation Gap Inc.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_oscar_mayer_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_oscar_mayer.png',
    brand: 'Oscar Mayer',
    wiki_url: 'https://en.wikipedia.org/wiki/Oscar Mayer',
    hint: '_s_a_ Maye_',
    clue: 'An American meat and cold cut production company owned by Kraft Foods.|It is known for its hot dogs, bologna, bacon, ham and Lunchables products.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_purina_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_purina.png',
    brand: 'Purina',
    wiki_url: 'https://en.wikipedia.org/wiki/Purina',
    hint: 'Pu__na',
    clue: 'It produces and markets pet food, treats and litter.|It was founded in 1894 as Robinson-Danforth Commission Company.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_sunoco_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_sunoco.png',
    brand: 'Sunoco',
    wiki_url: 'https://en.wikipedia.org/wiki/Sunoco',
    hint: '_unoc_',
    clue: 'An American petroleum and petrochemical manufacturer headquartered in Philadelphia, Pennsylvania.|Formerly known as Sun Company Inc.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_suntrust_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_suntrust.png',
    brand: 'Suntrust',
    wiki_url: 'https://en.wikipedia.org/wiki/Suntrust',
    hint: 'Sun_r___',
    clue: 'An American bank holding company.|Founded in 1985.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_the_hartford_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_the_hartford.png',
    brand: 'The Hartford',
    wiki_url: 'https://en.wikipedia.org/wiki/The Hartford',
    hint: '__e Ha_t__rd',
    clue: 'A United States-based investment and insurance company.|Founded in 1810 in Hartford, Connecticut.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_tide_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_tide.png',
    brand: 'Tide',
    wiki_url: 'https://en.wikipedia.org/wiki/Tide',
    hint: '_id_',
    clue: 'The brand-name of a laundry detergent.|Manufactured by Procter & Gamble, first introduced in 1946.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_toys_r_us_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_toys_r_us.png',
    brand: 'Toys R Us',
    wiki_url: 'https://en.wikipedia.org/wiki/Toys R Us',
    hint: '_oys _ _s',
    clue: 'An American toy and juvenile-products retailer.|Founded in 1948 and headquartered in Wayne, New Jersey.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_tropicana_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_tropicana.png',
    brand: 'Tropicana',
    wiki_url: 'https://en.wikipedia.org/wiki/Tropicana',
    hint: '_rop_c_na',
    clue: 'American multinational company which primarily makes fruit-based beverages.|The company specializes in the production of orange juice.',
    easy: true
  },
  {
    answer: 'https://cdn.dagpi.xyz/logogame/logos/s_us_whole_foods_o.png',
    question: 'https://cdn.dagpi.xyz/logogame/logos/s_us_whole_foods.png',
    brand: 'Whole Foods',
    wiki_url: 'https://en.wikipedia.org/wiki/Whole Foods',
    hint: 'Wh_l_ Fo_d_',
    clue: 'It is an American foods supermarket chain specializing in organic food.|It first opened on September 20, 1980.',
    easy: true
  },]
  res.json(brands[Math.floor(Math.random() * brands.length)])
})

app.get('/countries.json', async (req, res) => {
  const countries = require('./countries.json')
  const json = {
    Data: countries.data[Math.floor(Math.random() * countries.data.length)]
  }
  res.json(json)
})

app.get('/:id', async (req, res) => {
    res.sendFile(__dirname+'/'+req.params.id)
})

app.listen(port, () => {
    console.log(`Listening to ${port}`)
})

module.exports = app;

