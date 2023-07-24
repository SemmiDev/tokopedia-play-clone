# Tokopedia Play Clone API Contract

---

## Auth API

### Register
- method `POST`
- path `localhost:3000/api/auth/register`
- body 
```json
{
  "username": "sammidev123",
  "password": "Sammidev123"
}
```
- response
```json
{
  "message": "User created.",
  "status_code": 201,
  "data": {
    "username": "sammidev123"
  }
}
```

### Login
- method `POST`
- path `localhost:3000/api/auth/login`
- body
```json
{
  "username": "sammidev123",
  "password": "Sammidev123"
}
```
- response
```json
{
  "message": "Login successful.",
  "status_code": 200,
  "data": {
    "token": "7f44c647-0f5b-40b6-af05-87ee28cb5a94",
    "username": "sammidev123",
    "user_id": "64bdd5e89f16f218fc74c4f2"
  }
}
```

### Logout
- method `POST`
- path `localhost:3000/api/auth/login`
- header:
  - Authorization: token
- response
```json
{
  "message": "Logout successful.",
  "status_code": 200,
  "data": {}
}
```

---
## User API

### Update User
- method `PUT`
- path `localhost:3000/api/users`
- header:
    - Authorization: token
- body
```json
{
  "username": "sammidev123update",
  "password": "Password12312345Update"
}
```
- response
```json
{
  "message": "Profile updated.",
  "status_code": 200,
  "data": {
    "username": "sammidev123update"
  }
}
```
---

## Video API

### Create Video
- method `POST`
- path `localhost:3000/api/videos`
- header:
    - Authorization: token
- body
```json
{
  "title": "video 1 dhuar dhuar hudar hudahdushd sahudhas",
  "youtube_link": "https://www.youtube.com/watch?v=OBeHTS-dP_s&pp=ygUQc2FtbWkgYWxkaGkgeWFudA%3D%3D"
}
```
- response
```json
{
  "message": "Video created.",
  "status_code": 201,
  "data": {
    "user_id": "64bdd5e89f16f218fc74c4f2",
    "title": "video 1 dhuar dhuar hudar hudahdushd sahudhas",
    "youtube_link": "https://www.youtube.com/watch?v=OBeHTS-dP_s&pp=ygUQc2FtbWkgYWxkaGkgeWFudA%3D%3D",
    "youtube_id": "OBeHTS-dP_s",
    "thumbnail": "https://img.youtube.com/vi/OBeHTS-dP_s/maxresdefault.jpg",
    "views": 0,
    "_id": "64bdd8449f16f218fc74c501",
    "timestamp": "2023-07-24T01:47:48.136Z",
    "__v": 0
  }
}
```

### Update Video
- method `PUT`
- path `localhost:3000/api/videos/:videoId`
- header:
    - Authorization: token

### Delete Video
- method `DELETE`
- path `localhost:3000/api/videos/:videoId`
- header:
    - Authorization: token

### Get All Videos
- method `GET`
- path `localhost:3000/api/videos`

### Get Video By Id
- method `GET`
- path `localhost:3000/api/videos/:videoId`

---

## Product API


### Create Product
### Update Product
### Delete Product
### Get All Products
### Get Product By Id
### Get Products By Video Id

---

## Comment API

### Create Comments 
### Get Comments By Video Id
### Live Comment (Server Sent Event)
