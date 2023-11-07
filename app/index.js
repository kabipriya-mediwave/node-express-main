const express = require("express");
const morgan = require("morgan");
const {
  getAllBooks,
  addBook,
  addRating,
  getBookById,
  editBookById,
  deleteBookById,
  updateRating,
  getRatingById,
  deleteRatingById,
} = require("./db");
const Joi = require("joi");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/books", (req, res) => {
  const books = getAllBooks();
  res.send(books);
});
app.post("/books", (req, res, next) => {
  const AddbookSchema = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().required(),
  });
  const { value, error } = AddbookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }
  const book = addBook(value);
  if (!book) {
    return next({
      status: 400,
      message: "invalid isbn",
    });
  }
  return res.send(book);
});

app.post("/books/:bookid/rating", (req, res) => {
  const ratingSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
  });

  const { value, error } = ratingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }

  const rating = addRating({
    rating: req.body.rating,
    bookId: req.params.bookid,
  });
  return res.json(rating);
});

app.get("/books/:bookid", (req, res) => {
  const book = getBookById(req.params.bookid);
  if (!book) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  return res.send(book);
});
app.put("/books/:bookid", (req, res) => {
  const etitSchema = Joi.object({
    title: Joi.string().required(),
  });
  const { value, error } = etitSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((m) => m.message),
    });
  }
  const book = editBookById({ id: req.params.bookid, title: req.body.title });
  if (!book) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  return res.send(book);
});

app.delete("/books/:bookid", (req, res) => {
  const b = deleteBookById(req.params.bookid);
  if (!b) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  res.send(b);
});
app.put("/books/:bookid/rating", (req, res) => {
  const rating = updateRating({
    rating: req.body.rating,
    bookId: req.params.bookid,
  });
  if (!rating) {
    return res.status(400).json({
      message: "rating not found",
    });
  }
  const ratingSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
  });

  const { value, error } = ratingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }

  return res.json(rating);
});
app.get("/rating/:ratingid", (req, res) => {
  const book = getRatingById(req.params.ratingid);
  if (!book) {
    return res.status(400).json({
      message: "rating not found",
    });
  }
  return res.send(book);
});

app.delete("/rating/:ratingid", (req, res) => {
  const rating = deleteRatingById(req.params.ratingid);
  if (!rating) {
    return res.status(400).json({
      message: "rating not found ",
    });
  }
  return res.json(rating);
});

app.use(
  (errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || ["An unknown error"],
    });
  })
);

app.listen(1111, () => {
  console.log("Server running on 1111");
});
