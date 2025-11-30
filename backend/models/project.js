const mongoose = require ('mongoose');

const project = mongoose.model('project', {

     name:{
        type: String
       },
      description: {
         type: String,
         unique: true
       },
       startDate:{
        type: Date
       },
       endDate:{
        type: Date
       },
       files:{
        type:Array,
        default: []
       },
      
       date:{
        type: Date
       },
       budget:{
        type: Number
       },
       client: {
        type:mongoose.Types.ObjectId,
        ref: 'client'
       },
       status: {
          type: String
       },
       team:{
           type:[ { type: mongoose.Types.ObjectId, ref:'user'}]
       }

       

})

module.exports= project;
