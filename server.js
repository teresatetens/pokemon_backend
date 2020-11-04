const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const jsonData = require('./static/file.json')
const cors = require('cors');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

app.get('/', (req, res)=>{
    res.send('Server is running')
})
app.get('/pokemon', (req, res, next)=>{
    res.send(jsonData)    
})

app.get('/pokemon/:id', (req, res, next)=>{
    const {id} = req.params;
    const result = jsonData.filter(obj=> Number(id) === obj.id)
    res.send(result);
})

app.get('/pokemon/:id/:info', (req, res, next)=>{
    console.log(req.params);
    const {id, info} = req.params;

    const result = jsonData.filter(obj=> Number(id) === obj.id)
    
    if(info==="name"){
        res.send(result[0].name)
    } else if(info==="type"){
    res.send(result[0].type)
    } else if(info==="base"){
    res.send(result[0].base)
    }
    
})
const port = process.env.PORT || 3003;
app.listen(port, ()=>{
    console.log(`Server linstening on port: ${port}`);
})