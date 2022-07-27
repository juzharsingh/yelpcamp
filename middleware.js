const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/Campground');
const Review = require('./models/review');

// module.exports.isLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     req.session.returnTo = req.originalUrl
//     req.flash('error', 'You must be signed in first!');
//     return res.redirect('/login');
//   }
//   next();
// }

module.exports.isLoggedIn = (req, res, next) => {
  const { id } = req.params;
  if (!req.isAuthenticated()) {
    req.session.returnTo = (req.query._method === 'DELETE' ? `/campgrounds/${id}` : req.originalUrl);
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
}; // above is the colt's code, this is the daniel code, found from the course
// // help section, section 52, video 525, here is a problem of redirecting when we do not add ejs in show Page
// // for more details we can see video from 9 mins

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
}

// module.exports.isReviewAuthor = async (req, res, next) => {
//   const { id, reviewId } = req.params;
//   const review = await Review.findById(reviewId);
//   if (!review.author.equals(req.user._id)) {
//     req.flash('error', 'You do not have permission to do that');
//     return res.redirect(`/campgrounds/${id}`);
//   }
//   next();
// }

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}


module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
  } else {
      next();
  }
}
