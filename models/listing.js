const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
    title :{
        type: String,
        required: true,
    },
    description : String,
    image : {
        // type: String,
        // default: "https://media.istockphoto.com/id/1297349747/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey.jpg?s=612x612&w=is&k=20&c=_hVRlyQwt0Q_Mb9L6-3w4k0PDBZnyrjJtsCMqkvNBkE=" ,
        // set: (v) =>
        //      v === "" 
        // ? "https://media.istockphoto.com/id/1297349747/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey.jpg?s=612x612&w=is&k=20&c=_hVRlyQwt0Q_Mb9L6-3w4k0PDBZnyrjJtsCMqkvNBkE=" 
        // : v,
        url: String,
        filename: String,
    },
    price : Number,
    location : String,
    country : String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
        coordinates:{
            type: [Number],
            required: true,
        },
    },
    // category:{
    //     type:String,
    //     enum:["mountain","arctic","farms","deserts"]
    // } //for filtering options use enums
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});
//this deletes all the reviews for a particular review from both listingschema and reviewschema when that listing is deleted otherwise the listing will be deleted by leaving the reviews still in the reviewschema
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;