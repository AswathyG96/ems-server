const monsoogse = require('mongoose')
const DB = process.env.DATABASE
monsoogse.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('Mongodb Atlas Connected');
}).catch((err)=>{
    console.log(err);
})
