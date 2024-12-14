const express = require("express");
const router = express.Router({mergeParams:true});
//mergeparams is used to pass the params otherwise id will be undefined

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");


const reviewController = require("../controllers/review.js");
const review = require("../controllers/review.js");
//Reviews
//Post review Route
router.post("/", isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview)
);

module.exports = router;