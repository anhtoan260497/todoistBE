const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    email: {
      type : String,
      require : true,
    },
    tasks: [    
      {
        title: {
          type  : String,
          required : true
        },
        description: String,
        date : {
          type : Number,
          required : true
        }, 
        subTask: [
          {
            label: String,
            isDone: Boolean,
          },
        ],
        comments: [
          {
            label: {
              type : String,
              required : true
            },
            timestamps: {
              type : Number,
              required : true
            },
            description: {
              type : String,
              required : true
            },
          },
        ],
        priority: Number,
        labels: [],
      },
    ],
  },
  {
    collection: "Tasks",
    timestamps: true,
  }
);

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
