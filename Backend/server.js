require('dotenv').config()
const app =require('./src/app')

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(3000,()=>{
    console.log('server is running on 3000');
})