const mongoose =require ('mongoose');

const client = mongoose.model('client', {

      fullname:{
        type: String
       },
      email: {
         type: String,
         unique: true
       },
       address:{
        type: String
       },
       tel:{
        type: String
       },
       image:{
        type: String
       },
       tags: {
         type: Array
       },
       date:{
        type: Date
       }
       

})

module.exports= client;
