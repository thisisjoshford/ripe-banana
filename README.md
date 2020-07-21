# LAB: Data Modelling - Ripe Banana


Start with the entities/resources that don't depend on other resources: 

`Studio`, `Actor`, and `Reviewer`

1. As you tackle e2e API tests, you will need to drop all used collections in `beforeEach`. If you need a related model, that is already tested in another file, you
don't need to retest things you have already tested (like basic POST and GET).

## Models (Entities/Resources)

* Studio
* Film
* Reviewer

* Actor
* Review

### Directions Key
* `<...>` is a placeholder for actual data.
* `S` = string, `D` = date, `N` = number, `I` = ObjectId
* Properties marked with `R` are required.

`_id` (and `__v`) properties omitted for clarity.

### Studio

```
{
  name: <name-of-studio RS>,
  address: {
    city: <city S>
    state: <state S>
    country: <country S>
  }
}
```

### Film

```
{
  title: <title of film RS>,
  studio: <studio _id RI>,
  released: <4-digit year RN>,
  cast: [{
    role: <name of character S>,
    actor: <actor _id RI>
  }]
}
```

### Actor

```
{
  name: <name RS>,
  dob: <date-of-birth D>,
  pob: <place-of-birth S>
}
```

### Reviewer

```
{
  name: <string RS>,
  company: <company or website name RS>
}
```


### Review

```
{
  rating: <rating number 1-5 RN>,
  reviewer: <review _id RI>
  review: <review-text, max-length 140 chars RS>,
  film: <film-id RI>
}
```

### Routes

Pick the set of routes that fit with your vertical slice.

#### GET

While the schemas should look like the data definitions above, these are descriptions of the data that should be returned from the various `GET` methods. You will need to use `lean`, `populate`, `select` and combining data to shape the appropriate response.

##### `GET /studios`

```
[{ _id, name }]
```

##### `GET /studios/:id`

```
{ _id, name, address, films: [{ _id, title }] }
```

##### `GET /films`

```
[{
    _id, title, released,
    studio: { _id, name }
}]
```

##### `GET /films/:id`

```
{
    title,
    released,
    studio: { _id, name },
    cast: [{
        _id,
        role,
        actor: { _id, name }
    }],
    reviews: [{
        id,
        rating,
        review,
        reviewer: { _id, name }
    ]
}
```

##### `GET /actors`

```
[{ _id, name }]
```

##### `GET /actors/:id`

```
{
    name,
    dob,
    pob,
    films: [{
      id,
      title,
      released
    }]
}
```

##### `GET /reviewer`

```
[{
  _id,
  name,
  company
}]
```

##### `GET /reviewer/:id`

```
{
    _id,
    name,
    company,
    reviews: [{
        _id,
        rating,
        review,
        film: { _id, title }
    }]
}
```

##### `GET /reviews`

**limit to 100 highest rated**

```
[{
    _id,
    rating,
    review,
    film: { _id, title }
}]
```

#### POST/PUT

Studio, Films, and Actors, Reviewers and Reviews can be added.

Only Reviewers can be updated.

#### DELETE

Reviews and Reviewers **However**:
1. Reviewers cannot be deleted if there are reviews

## Testing

* E2E API tests for supported routes

## Deploy

Deploy to heroku

## Rubric:

* Models: 5pts
* Relationships: 5pts
* Routes: 5pts
* Project Organization and Testing: 5pts