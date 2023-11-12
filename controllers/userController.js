const users = require("../models/user_Schema");

//resgister logic'
exports.userRegister =async(req,res)=>{
//   const file = req.file
// console.log(req.file);
// res.send("accept")
// console.log(req.file);
const file = req.file.filename
const{fname,lname,mobile,email,gender,location,status}  = req.body
if(!fname || !lname || !mobile || !email || !gender || !location || !status ||!file)
{
res.status(403).json("inputs required")
}
try{
    const preuser = await  users.findOne({email})
    if(preuser){
        res.status(403).json("alrdy exits")
    }
    else{
        const newuser = new users({
            fname,lname,email,mobile,gender,status,profile:file,location
        })
        await newuser.save()
        res.status(200).json(newuser)
    }
}
catch(error){
    res.status(401).json(error)
}
}
