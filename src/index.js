const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// const multer= require('multer')
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb){

//     if(!file.originalname.match(/\.(doc|docx)$/)){
//         return cb(new Error('Please upload a Word document'))

//     }
//     cb(undefined, true)
//     // cb(new Error('File must be PDF'))
//     // cb(undefined, true)
//     // cb(undefined,false)

//   }
// })

// // const errorMiddleware = (req, res, next) =>{
// //   throw new Error('From my middlerware')
// // }
// app.post('/upload' ,upload.single('upload'), (req, res) =>{
//   res.send()
// }, (error, req, res, next) =>{
//   res. status(400).send({error: error.message})
// })
// // app.use((req, res, next) =>{
// // res.status(503).send('Site is currently down. Check back soon!')

// // })
// // app.use((req, res, next)=>{
// //   if(req.method === 'GET'){
// //     res.send('GET request are disabled')

// //   }else{
// //     next()
// //   }


//   // middleware function
// //  console.log(req.method, req.path)
// //  next()
// // })

// use postman body data. shows in terminal
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('Server is up on port', + port);
})

// // const Task = require('./models/task')
// // const User = require('./models/user')
// // const main = async() =>{
// // //  const task = await Task.findById('606d611f7c50df4980d821ab')
// // //  await task.populate('Owner').execPopulate()
// // //  console.log(task.Owner);
// // try{ 
// // const user = await User.findById('606dac8e7754f42920608697')
// // await user.populate('tasks').execPopulate()
// // console.log(user.tasks)

// // }catch(e){
// //   console.log(e);
// // }
// // }
// //  main()







// // const jwt = require('jsonwebtoken')
// // const bcrypt = require('bcryptjs')

// const myFunction = async() =>{

//   const token = jwt.sign({ _id:'abc123'}, 'thisismyfirstcourse', { expiresIn: '7 days'})
//   console.log(token)
//   const data = jwt.verify(token,'thisismyfirstcourse')
// console.log(data);
//   // const password = 'Red12345!'
//   // const hashPassword = await bcrypt.hash(password, 8)

//   // console.log(password);
//   // console.log(hashPassword);

//   // const isMatch = await bcrypt.compare('Red12345!', hashPassword)
//   // console.log(isMatch);
// }

// // myFunction()