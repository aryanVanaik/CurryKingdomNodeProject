// ALl THE 
const express = require("express")
const app = express()
const path = require("path")
const methodOverride =require('method-override')
const mongoose = require('mongoose');
const { render } = require("ejs");
const bcrypt = require("bcrypt")
const session = require("express-session")


//Express MiddleWare
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session({secret:'notagoodsecret'}))

//Part of the complex function
const requireLogin = (req,res,next) =>{
    if(!req.session.user_id){
        return res.redirect('/login')
        
    }
    next();
}

//requiring our mongoose models
const User = require('./models/users');
const Menu = require('./models/menu');


const categories =['mains','entree','desertdrinks']
//establishing a connection to mongoose and our mongo DB
mongoose.connect('mongodb://localhost:27017/menuDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo MENU CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO mongo ERROR!!!!")
        console.log(err)
    })

mongoose.createConnection('mongodb://localhost:27017/authDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo AUTH CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO mongo ERROR!!!!")
        console.log(err)
    })





//Listening on LocalHost:3000 
app.listen(3000,() =>{
    console.log("Listening on 3000")
})

//Establishing our routes
// This is the hope page route 
app.get('/menu', async(req,res) =>{
    const {category} = req.query
    //^^ stores the value of a category in string
    if(category){
        const menu = await Menu.find({category})
        res.render('products/HP', { menu, category })
        //if catgeory exists then it will display items in that category

    }else{
        const menu = await Menu.find({})
        res.render('products/HP', { menu, category:'All' })
        //else it will display all items

    }
    
    
    
    
  

})
app.get('/menu/add',requireLogin,(req,res)=>{
    res.render('products/add' ,{categories})
    //getting the add html page
})
app.post('/menu',async(req,res)=>{
    const newDish = new Menu(req.body)
    await newDish.save()
    console.log(newDish)
    res.redirect(`/menu/${newDish._id}`)
    //this takes the data inputted in the page and adds that data to database 
})


app.get('/menu/:id', async(req,res) =>{
    const {id}= req.params;
    //grabs id from request 
    const dish = await Menu.findById(id)
    res.render('products/show',{dish})
    //this page renders the specifc item page with the item is clicked 


  

})

//Logic to edit an item
app.get('/menu/:id/edit',requireLogin,async(req,res)=>{
    const {id}= req.params;
    const dish = await Menu.findById(id)
    res.render('products/edit', {dish,categories})

})

app.put('/menu/:id',async(req,res)=>{
    const {id}= req.params;
    const foundDish =  await Menu.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    res.redirect(`/menu/${foundDish._id}`)
    //data that is inputted is first found after that it is updated by new info that is added to the 
})



app.delete('/menu/:id',requireLogin,async(req,res)=>{
   
    const {id}= req.params;
    await Menu.findByIdAndDelete(id)
    res.redirect('/menu')
    //this deletes the item from the database by finding the id and then deleting
    

    
    
    
})


// Password protection section

app.get('/login',(req,res)=>{
    res.render("login")
     
})

//other part of the complex function
app.post('/login',async(req,res)=>{
    const {username, password} = req.body
    //this extracts the username and password from the request and stores them in variables
    const user = await User.findOne({username})
    //this takes the username found from the request
    const validPassword =await bcrypt.compare(password,user.password)
    // takes password entered hashes it and checks if the saved password and entered password are the same
   
    
    if(validPassword){
        req.session.user_id = user._id
        res.redirect('/menu')
        //if the password is valid then it starts a session and redirects to the homepage

    }
    else{
        
        res.redirect('/login')
        //if password is not the same then it stays on the 
    }
     
})



app.post('/logout',(req,res) =>{
    req.session.user_id = null
    //when the button is presses it ends the user session
    res.redirect('/menu')

    

})

// In case you forget the password you can create a new set of credentials

app.post('/register',async(req,res)=>{
    const {password, username} = req.body
    const hash= await bcrypt.hash(password,12);
    const user = new User({
        username,
        password:hash
    })
    await user.save()
    req.session.user_id = user._id
    res.redirect("/menu")
    
 })


app.get('/register',(req,res)=>{
   res.render('register')
    
})











