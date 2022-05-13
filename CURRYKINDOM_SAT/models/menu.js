const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
        
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        lowercase:true,
        enum:['mains','entree','desertdrinks']
        
    },
    img:{
        type:String,
        required:true
    },
    description:{
        type:String,


    }
    
})

const Menu = mongoose.model('Menu', productSchema);


module.exports = Menu;





