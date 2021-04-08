const mongoose = require('mongoose')
 const { default: validator } = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
     trim: true
 },
    email:{ 
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    }, password: {
    
         type: String,
         required: true,
         minlength: 7,
         trim : true,
         validate(value){
             if(value.toLowerCase().includes('password')){
                 throw new Error('Password an not contain "password')
             }
         }
     
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
           if(value < 0 ) {
               throw new Error('Age must be a positive number')
           }
        }
    },
    token : [{
        token: {
            type: String,
            required: true
        }
    }],
 
     avatar: {
         type: Buffer
     }
 },{
     timestamps: true
 })

 userSchema.virtual('tasks', {
     ref: 'Task',
     localField: '_id',
     foreignField: 'Owner'
 })
 userSchema.methods.toJSON = function (){
     const user = this
     const userObject = user.toObject()
     
     delete userObject.password
     delete userObject.token
     delete userObject.avatar
     return userObject
 }
 userSchema.methods.generateAuthToken = async function (){
     const user = this
     const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

     user.token = user.token.concat({token})
     await user.save()
     return token
 }
 userSchema.statics.findByCredentials = async(email, password) =>{
   const user = await User.findOne({email})

   if(!user){
       throw new Error('Unable to login')
   }

   const isMatch = await bcrypt.compare(password, user.password)

   if(!isMatch){
       throw new Error('Unable to login')
   }

   return user
 }
   //HAsh the plain text password before saving 
 userSchema.pre('save', async function (next) {
     const user = this

   if (user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8)
   }

     next()
     
 })

//  Delete user tasks when user is removed
userSchema.pre('remove', async function(next){
    const user = this
    Task.deleteMany({Owner: user._id}) 
    next()
})
const User = mongoose.model('User', userSchema)
// const me = new User({
//     name: '   Sapna',

//      email: 'sapna@gmail.com',
// })
//      password: '          re324554hg'

// me.save().then(() =>{
// console.log(me);
// }).catch((error) =>{
//     console.log('Error', error);
// })
module.exports = User