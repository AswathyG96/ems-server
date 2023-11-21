const express = require('express')
const router = new express.Router()
const userController = require('../controllers/userController')
const upload = require('../multConfig/storageCongif')





//register
router.post('/employee/register',upload.single('user_profile'),userController.userRegister)
//getallusers
router.get('/get-all-employees',userController.getallusers)
//get userdetails
router.get('/employee/view/:id',userController.getuserdetails)


//edit user
router.put('/employee/edit/:id',upload.single('user_profile'),userController.editUser)

//delete user
router.delete('/employee/delete/:id',userController.deleteUser)


module.exports = router