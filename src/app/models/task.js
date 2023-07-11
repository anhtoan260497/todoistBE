const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    projects: [
      {
        title: {
          type: String,
          required: true,
        },
        tasks: [
          {
            title: {
              type: String,
              required: true,
            },
            description: String,
            date: {
              type: Number,
              required: true,
            },
            subTask: [
              {
                title: {
                  type : String,
                  required : true,
                },
                description : String,
                isDone: {
                  type : Boolean,
                  required : true
                },
              },
            ],
            comments: [
              {
                title: {
                  type: String,
                  required: true,
                },
                timestamp: {
                  type: Number,
                  required: true,
                },
                description: {
                  type: String,
                  required: true,
                },
              },
            ],
            priority: {
              type : Number,
              required : true
            },
            labels: [],
            project: {
              type : String,
              required : true
            },
          },
        ],
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
