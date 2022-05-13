const mongoose = require('mongoose');
const Menu = require('./models/menu')

mongoose.connect('mongodb://localhost:27017/menuDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO mongo ERROR!!!!")
        console.log(err)
    })






const seedMenu = [
    {
        name: 'Samosa Chaat',
        price: 7.50,
        category: 'entree',
        img:'https://www.cookwithmanali.com/wp-content/uploads/2019/09/Samosa-Chaat-Recipe.jpg',
        description:'Samosa chaat is popular Indian street food or chaat recipe where crispy warm samosa is topped with a spicy chole or ragda, chilled yogurt, and tangy chutneys. It is a very popular snack from North India which is tangy, spicy, and savory and the flavors burst in your mouth as soon as you take the first bite.'
    },
    {
        name: 'Aloo Tikki',
        price: 6.50,
        category: 'entree',
        img:'https://www.cubesnjuliennes.com/wp-content/uploads/2020/08/Crispy-Aloo-Tikki-Recipe.jpg',
        description:'Crispy & crunchy, aloo tikki is a popular North Indian street food made using potatoes. Potatoes are mixed with herbs and spices, made into patties, and fried until crispy. It is one of the most popular chaat items and can be made easily at home.'

    },
    {
            name: 'Lamb Seekh Kebab',
            price: 8.00,
            category: 'entree',
            img:'https://greatcurryrecipes.net/wp-content/uploads/2013/05/kebabs2.jpg',
            description:'Seekh kebab are delicious, spicy lamb skewers loaded with big Indian flavours and grilled over open flame. Serve them up with a bit of mint coriander yogurt dipping sauce and you have an appetizer that can eat like a meal.'
    },
    {
            name: 'Onion Bhaji',
            price: 5.50,
            category: 'entree',
            img:'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/163888_0-1266-5478-5478.jpg',
            description:'They weren’t your average, soggy, doughy, supermarket bhajis though. Instead they were HUGE, crispy and freshly fried with just a hint of spice. The cherry on top? They were served with an enormous dollop of mango chutney and no fork – this was ambitious finger food!'
    },
    {
        name: 'Pav Bhaji',
        price: 7.00,
        category: 'entree',
        img:"https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Instant-Pot-Mumbai-Pav-Bhaji-Recipe.jpg",
        description:  "Pav Bhaji is popular Indian street food where dinner rolls/buns are served with spicy mashed veggies topped with dollop of butter. Street food doesn’t get better than this! This Pav Bhaji Recipe is spicy, so flavorful and can be easily made vegan by replacing butter with vegan butter! If you have never had this in your life, you are seriously missing out!"
    },
    {
        name:"Palak Paneer",
        price:13.50,
        category:'mains',
        img:"https://www.vegrecipesofindia.com/wp-content/uploads/2013/05/palak-paneer-easy.jpg",
        description:"Palak Paneer is a popular Indian dish of Indian cottage cheese cubes in a mild, spiced smooth spinach sauce. This delicious creamy dish is made with fresh spinach leaves, paneer (firm cottage cheese), onions, tomatoes, herbs and spices."
    },
    {
        name: "Butter Chicken",
        price: 14.50,
        category:'mains',
        img:"https://healthyfitnessmeals.com/wp-content/uploads/2020/01/Butter-chicken.jpg",
        description: "Similar to Chicken Tikka Masala, Butter Chicken is one of the most popular curries at any Indian restaurant around the world. Aromatic golden chicken pieces in an incredible creamy curry sauce, this Butter Chicken recipe is one of the best you will try! You will love how easy it is to make in the comfort of your own home, especially with garlic butter rice and fresh homemade Naan bread."

    },
    {
        name:"Dal Makhani",
        price:13.50,
        category:'mains',
        img:"https://myfoodstory.com/wp-content/uploads/2018/08/Dal-Makhani-New-3.jpg",
        description:"Dal Makhani is one of the most popular lentil recipes from the North Indian Punjabi cuisine made with Whole Black Lentils (known as Urad dal or Kaali Dal in Hindi) and Kidney Beans (known as Rajma in Hindi)."
    },
    {
        name:"Goan Fish Curry",
        price:13.50,
        category:'mains',
        img:"https://www.recipetineats.com/wp-content/uploads/2020/10/Goan-Fish-Curry_6-SQ.jpg",
        description:"This fish curry comes to you by way of Goa, a little pocket of Indian paradise that’s all about the sun, surf, sand and excellent seafood! With a deeply aromatic tomato and coconut based sauce"
    },
    {
        name:"Dosa",
        price:15.50,
        category:'mains',
        img:"https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa.jpg",
        description: "A properly made crisp and savory Indian dosa is wonderfully delicious, and fairly simple to make at home, with this caveat: the batter must be fermented overnight for the correct texture and requisite sour flavor. However, once the batter is ready, it can be refrigerated and kept for several days, even a week. With a traditional spicy potato filling, dosas makes a perfect vegetarian breakfast or lunch. Serve them with your favorite chutney."
    },
    {
        name:"Veg Korma",
        price:15,
        category:'mains',
        img: "https://thewanderlustkitchen.com/wp-content/uploads/2016/10/indian-vegetable-korma-recipe-5.jpg",
        description: "Creamy and fragrant, a Vegetable Korma is the stuff memorable meals are made of. This mixed vegetable curry is deceptively decadent and secretly healthy, packed as it is with veggies like carrots, peas, potatoes, tomatoes and bell peppers, all in a silky sauce of coconut, ginger, garlic, cumin and turmeric. A vegan, soy-free, gluten-free and nut-free recipe."
    },
    {
        name:"Shahi Paneer",
        price:15.50,
        category:'mains',
        img:  "https://www.sanjanafeasts.co.uk/wp-content/uploads/2020/01/Homemade-Shahi-Paneer-recipe.jpg",
        description: "The best Punjabi shahi paneer recipe! Deliciously flavorful, aromatic, rich, creamy, and restaurant-style paneer gravy. It will surely become your new favorite paneer dish at home!"
    },
    {
        name: "Gulab Jamun",
        price:5,
        category:'desertdrinks',
        img: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/08/gulab-jamun-recipe-2-1-500x500.jpg",
        description:"Gulab Jamun is one of India’s most popular sweet. These deep-fried dumplings/donuts made of dried milk are dipped in a rose-cardamom flavored sugar syrup and make quite a treat."
    },
    {
        name: "Jalebi",
        price:4,
        category:'desertdrinks',
        img: "https://www.boldsky.com/img/2021/01/jalebi-recipe-1610019725.jpg",
        description: "Thin & Crispy Homemade Jalebi made the traditional way. These will stay crispy for hours and are best enjoyed with rabri or milk!"
    },
    {
        name: "Mango Lassi",
        price:2,
        category:'desertdrinks',
        img: "https://www.liveeatlearn.com/wp-content/uploads/2019/05/mango-lassi-recipe-photo-vert.jpg",
        description:"Lassis come in all kinds of flavors, some are salty, some are sweet, some have mint, some have fruit. A mango lassi is basically a yogurt based mango milkshake or smoothie."

    },
    {
        name: "Kulfi",
        price:3,
        category:'desertdrinks',
        img:  "https://www.archanaskitchen.com/images/archanaskitchen/Indian_Sweets_Mithai/Kesar_Pista_Kulfi_Recipe_Indian_Ice_Cream-1-2_400.jpg",
        description: "Kulfi is a traditional Indian ice cream, but more denser. It is usually made be boiling milk over low heat for a long period, until it has reduced considerably in volume and  then sweetened, flavored and frozen in small earthen pot molds known an “Matki“. But, aluminum / stainless steel / plastic molds are widely used in modern times. It is almost uncommon to find kulfi served in scoops like ice cream."    
        
    }
    

    
    
    
]
    
    Menu.insertMany(seedMenu)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })

