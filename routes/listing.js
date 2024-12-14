const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")

const listingController = require("../controllers/listings.js")
const multer  = require('multer')

const{storage} = require("../cloudConfig.js");
const upload = multer({ storage });//multer directly stores in the storage which is in cloudinary


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
      wrapAsync(listingController.createListing));

//new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//new route should be above the show route cause in listings/new , new wil be considered as id if it is placed below listings/:id, so then error occurs to avoid that we should place new route above the show route 

router  
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),
     wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

//index route
//router.get("/", wrapAsync(listingController.index)); as we are using router.route



//show route
//router.get("/:id",wrapAsync(listingController.showListing));

//create route - to save new entered data
// router.post("/", isLoggedIn,validateListing,
//     wrapAsync(listingController.createListing));

// commented as because used router.route


   // let {title,description, image, price, country, location} = req.body; // or we can just create new objects in the new.ejs like in the name "listing[name]"
    // let listing = req.body.listing;
    // console.log(listing);
    // if(!req.body.listing){
    //     throw new ExpressError(404," Send valid Data for Listing");
    // }
//returns something went wrong if the user enter the price not in number but for this we should remove the type number in the field in the form of new.ejs, something went wrong because in the middleware we updated the res.send to something went wrong 



//update - edit and update route
//get - /lisitngs/:id/edit - edit form 
//put - /listings/:id 


//edit route
router.get("/:id/edit" ,isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));



//update route
//router.put("/:id",isLoggedIn,isOwner, wrapAsync(listingController.updateListing));


// it is object to deconstruct, basically the req body contains the javascript object which contains parameters so deconstruct converts them into individual values 

//Delete route
//router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;