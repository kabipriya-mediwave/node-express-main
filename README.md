## 1. GET /books

Response:

```
[
    {
        id: 213,
        title: '',
        isbn: '',
    },
    {
        id: 215,
        title: '',
        isbn: '',
    },
    {
        id: 216,
        title: '',
        isbn: '',
    },
]

```

## 2. POST /books

isbn validation: https://www.geeksforgeeks.org/program-check-isbn/

Request:

```
{
    title: '',
    isbn: '', // validation
}
```

## 3. POST /books/:bookid/rating

```
{
    rating: 0 and 5,
}
```

## 4. GET /books/:bookid

```
{
    id: 216,
    title: '',
    isbn: '', // validation
    rating: 4,
}
```

return 0 if no rating is set for a book

## 5. PUT /books/:bookid

```
{
    title: ''
}
```

no isbn should be passed

## 6. DEL /books/:bookid

```

```

## 7. PUT /books/:bookid/rating

```
{
    rating: 0 and 5,
}
```

if rating is not found for a book, return error saying so

## 8. GET /rating/:ratingid

```
{
    id: 100,
    rating: 3,
    book: {
        id: 216,
        title: '',
        isbn: '',
    }
}
```

## 9. DEL /rating/:ratingid

```

```
