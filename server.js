const express = require('express')
const app = express();

app.get('/', (req, res)=>{
    res.send('Server is running')
})

const port = process.env.PORT || 3003;
app.listen(port, ()=>{
    console.log(`Server linstening on port: ${port}`);
})