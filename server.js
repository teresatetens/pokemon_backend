const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const pokedex = require('./static/file.json')
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

// app.get('/', (req, res)=>{
//     res.send('Henry Kene Teresa Ben are running')
// })
app.get('/pokemon', (req, res, next)=>{

    const promiseOfBen = pokedex.slice(0, 25).map( async (poke)=>{
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.name.english.toLowerCase()}/`)
    })
    Promise.all(promiseOfBen).then((resolvedData)=>{
        const FullPokeData = [];
        resolvedData.map((resolvedPoke, index)=>{
            FullPokeData.push({
                pokeDexData: pokedex[index],
                pokeApiData: resolvedPoke.data
            })
        })
        console.log(FullPokeData);
        res.send(FullPokeData);
    })
})

app.get('/pokemon/:id', async (req, res, next)=>{
    const {id} = req.params;
    const result = pokedex.find(obj=> Number(id) === obj.id)
    try {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${result.name.english.toLowerCase()}/`)
        .then(({data:pokedata}) => {
           // console.log(pokedta)
            result.pokedata = pokedata;
            res.send(result);
        })
    } catch(error){
        res.status(404).send('Oppps! There is no matching Pokemon!')
    } 
})

// app.get('/pokemon/:id/:info', (req, res, next)=>{
//     console.log(req.params);
//     const {id, info} = req.params;

//     const result = jsonData.find(obj=> Number(id) === obj.id)
    
//     if(info==="name"){
//         res.send(result[0].name)
//     } else if(info==="type"){
//     res.send(result[0].type)
//     } else if(info==="base"){
//     res.send(result[0].base)
//     }
    
// })
const port = process.env.PORT || 3003;
app.listen(port, ()=>{
    console.log(`Server linstening on port: ${port}`);
})