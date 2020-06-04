const path =require('path') //built in library so, no need to install
const express= require('express')
const hbs=require('hbs')

const app = express()
const port=process.env.PORT || 3000

const publicDirectoryPath=path.join(__dirname,'../public')
const templateViewPath=path.join(__dirname,'../templates/views')
const templatePartialPath=path.join(__dirname,'../templates/partial')


// console.log(publicDirectoryPath)
app.set('view engine','hbs')
app.set('views',templateViewPath)
hbs.registerPartials(templatePartialPath)

app.use(express.static(publicDirectoryPath)) 

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'krishna jethava'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        message:'help message',
        name:'krishnaa'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About ',
        name:'krishna jethava'
    })
})

app.get('/about',(req,res) => {
    
})
//app.com/weather
app.get('/weather',(req,res)=> {
    // res.send('Weather Page')
    if(!req.query.address){
        return  res.send({
            error : 'you must provide an address term. '
        })
    }
    const geocode=require('./utils/geocode')
    const forecast=require('./utils/forecast')
// 7-default-function parameter
    geocode(req.query.address,(error,{longtitude,latitude,location} = {}) => {
        if(error){
            return res.send({ error })
        }
        // console.log('Data : ',data)
        // forecast(data.longtitude, data.latitude, (error, forecastData) => {
        forecast(longtitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
        
            }
            res.send({
                address:req.query.address,
                forecast:forecastData, 
                location:location
            })
        })
    })

   
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found',
        name:'krishna jethava'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        errorMessage:'Page not found!',
        name:'krishna jethava'
    })
})
app.listen(port,()=>{
    console.log('server is running on ' + port)
})