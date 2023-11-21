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


//get all users
exports.getallusers = async(req,res)=>{
    //get query paramter from req
    const seacrh = req.query.seacrh
    const query = {
        fname:{$regex:seacrh,$options:"i"}
    }
    try{
        const userdata = await users.find(query)
        res.status(200).json(userdata)
    }
    catch(error){
        res.status(401).json(error)
    }
}

//get a user
exports.getuserdetails = async(req,res)=>{
    const {id} = req.params
    try{
        const userdata =  await users.findOne({_id:id})
        if(userdata){
            res.status(200).json(userdata)
        }
        else{
            res.status(404).json("User does not exisist!!!!")
        }
    } catch(error){
        res.status(401).json(error)
    }
}

//edit user
exports.editUser = async(req,res)=>{
const {id} = req.params
const{fname,lname,mobile,email,gender,location,status,user_profile}  = req.body
//to get image url
const file = req.file? req.file.filename: user_profile
try{
    const updateUSer = await users.findByIdAndUpdate({_id:id},{
        fname,lname,email,mobile,gender,status,profile:file,location
    },{
        new:true
    })
    await updateUSer.save()
    res.status(200).json(updateUSer)
}
catch(error){
    res.status(401).josn(error)
}
}
//delete user
exports.deleteUser = async(req,res)=>{
    const{id} = req.params



try{
    const removeUSer = await users.findByIdAndDelete({_id:id}
    )
    // await removeUSer.save()
    console.log(removeUSer);
    res.status(200).json(removeUSer)
}
catch(error){
    res.status(401).josn(error)
}
}  