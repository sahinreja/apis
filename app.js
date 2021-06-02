const express =  require('express');
const fetch = require('node-fetch');
const app = express();
app.set('view engine','hbs');
app.get('/',(req,res)=>{
    res.render('home.hbs');
})
app.get('/cricket',(req,res)=>{
     fetch("https://cricapi.com/api/matches?apikey=aTsJ4IQz1faNsnCZ6HRPYCnOBzq1")
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(Object.values(data).unique_id);
        // console.log(data);
        // res.send(data.matches)
      res.render('index.hbs',{item:data.matches})  
    })  
})
app.get('/player',(req,res)=>{
    fetch("https://cricapi.com/api/fantasySummary?apikey=aTsJ4IQz1faNsnCZ6HRPYCnOBzq1&unique_id=1034809")
    .then(res=>res.json())
    .then((data)=>{
        // res.send(Object.values(data.data.team))
        res.render('player.hbs',{allData:Object.values(data.data.team)})
    })
})

app.get('/covid',(req,res)=>{
    fetch("https://api.covid19india.org/data.json")
    .then(res=>res.json())
    .then((data)=>{
        // Object.values(data)
        res.render("covid.hbs",{covidData:data.cases_time_series})
    })
})

app.get('/covid_states_wise',(req,res)=>{
    fetch("https://api.rootnet.in/covid19-in/stats/history")
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        res.render("state_wise_covid.hbs",{allData:data.data})
    })
    // res.send("Hi this the STate wise covid patient  ")
})



app.get('/covid_testing',(req,res)=>{
    fetch("https://api.rootnet.in/covid19-in/stats/testing/history")
    .then(res=>res.json())
    .then((data)=>{
        res.render("covid_testing.hbs",{allData:data.data});
    })
})



app.get('/products',(req,res)=>{
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then((data)=>{
        res.render('products.hbs',{item:data});
    })
})


app.get('/products/:id',(req,res)=>{
    // res.send(req.params.id)
    let id = req.params.id
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then((data)=>{
        data.map((element)=>{
            if(element.id === Number(id)){
                res.render('products.hbs',{singleData:element});
            }
        })
    })
})

app.get('/payment',(req,res)=>{
    res.render('payment.hbs');
})
app.listen(3200,()=>{
    console.log("Server is running on port 3200...");
})