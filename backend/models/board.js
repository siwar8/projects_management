const mongoose =require ('mongoose');

const board = mongoose.model('board', {

      project:{
        type: mongoose.Types.ObjectId
       },
      backlog: {
         type: Array,
         default: []
       },
       inprogress:{
        type: Array,
         default: []
       },
       completed:{
        type: Array,
         default: []
       },
       inhold:{
        type: Array,
         default: []
       },
       
       
       date:{
        type: Date
       }
       

})

module.exports= board;
