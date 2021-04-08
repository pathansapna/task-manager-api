const mongoose = require('mongoose')
// const { default: validator } = require('validator')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
})



// const Tasks = mongoose.model('Tasks', {
//     description : {
//         type: String, 
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         required: true,
//         default : false
//     },
   
// })

// const data = new Tasks({
//     description: '       Cleaning the house',
//     // completed: true,
    
// })
// data.save().then(() => {
//     console.log(data);
// }).catch((error) =>{
//     console.log('Error', error);
// })

