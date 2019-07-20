// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
var articleModel = new Schema({
  // `string` must be of type String. We "trim" it to remove any trailing white space
  // `string` is a required field, and a custom error message is thrown if it is not supplied
  title: {
    type: String,
    trim: true,
    required: "String is Required"
  },
 
  summery: {
    type: Number,
    trim: true,
    required: true
  },

  link: {
    type: Number,
    trim: true,
    required: true
  },
  // `array` must be an Array
  comments: Array,
  
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", articleModel);

// Export the Example model
module.exports = Article;
