const express=require('express')
const path = require('path')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectorypath= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//setup handlebars engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res) =>{
res.render('index',{
    title: 'Weather App',
    name : 'Karan Alagh'
})
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'about me',
        name: 'Karan Alagh'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'this is some helpful text..',
        title: 'Help',
        name :'Karan Alagh'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){ 
   return res.send
      ({ 
           error: 'You must provide an address.'
       })
    }
  
    geocode(req.query.address,(error,{longitude,latitude,location} ={}) =>{
        if(error)
        {
            return res.send({error})
        }
    

    forecast(longitude,latitude, (error,forecastData) => {
        if(error)
        {
            return res.send({error})
        }

        res.send({
            forecast : forecastData,
            location,
            address : req.query.address
        })
    })
})
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name:'Karan Alagh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title :'404',
        name : 'Karan Alagh',
        errorMessage : 'Page not found.'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is on port 3000. ')
})
