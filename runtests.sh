#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

# This is where I'm testing the businesses POST endpoint

status 'POST businesses should return success'
curl -H 'Content-Type: application/json' -d \
'{"name": "test1","address": "test2","city": "test3","state": "test4","ZIP": "test5","phone": "test6","category": "test7","subcategories": "test8"}'\
 http://localhost:8086/businesses

 status 'POST businesses should return failure'
curl -H 'Content-Type: application/json' -d \
'{"somedata": "this request body is wrong"}'\
 http://localhost:8086/businesses

# This is where I'm testing the businesses GET endpoint

status 'GET businesses should return success'
curl http://localhost:8086/businesses?page=1

# This is where I'm testing the businesses GET by ID endpoint

status 'GET business-by-id should return success'
curl http://localhost:8086/businesses/0

status 'GET business-by-id should return failure'
curl http://localhost:8086/businesses/9999

# This is where I'm testing the businesses PUT endpoint

status 'PUT business-by-id should return success'
curl -X PUT -H 'Content-Type: application/json' -d \
'{"name": "test1","address": "test2","city": "test3","state": "test4","ZIP": 11111,"phone": "test6","category": "test7","subcategories": "test8"}'\
 http://localhost:8086/businesses/0

 status 'PUT business-by-id should return failure due to malformed request body'
curl -X PUT -H 'Content-Type: application/json' -d \
'{"somedata": "this request body is wrong"}'\
 http://localhost:8086/businesses/0

 status 'PUT business-by-id should return failure due to invalid business ID'
curl -X PUT -H 'Content-Type: application/json' -d \
'{"name": "newdata1","address": "newdata2","city": "newdata3","state": "newdata4","ZIP": 22222,"phone": "newdata6","category": "newdata7","subcategories": "newdata8"}'\
 http://localhost:8086/businesses/999999

# This is where I'm testing the businesses DELETE endpoint

status 'DELETE business-by-id should return success'
curl -X DELETE http://localhost:8086/businesses/0

status 'DELETE business-by-id should return failure'
curl -X DELETE http://localhost:8086/businesses/9999

# Adding another business for the next tests

status 'POST businesses should return success'
curl -H 'Content-Type: application/json' -d \
'{"name": "test1","address": "test2","city": "test3","state": "test4","ZIP": "test5","phone": "test6","category": "test7","subcategories": "test8"}'\
 http://localhost:8086/businesses

# This is where I'm testing the reviews POST endpoint

status 'POST reviews should return success'
curl -H 'Content-Type: application/json' -d \
'{"rating": 4, "cost": 2, "message": "test3", "businessID": 1}'\
 http://localhost:8086/reviews

status 'POST reviews should return failure due to malformed request body'
curl -H 'Content-Type: application/json' -d \
'{"rating":  10, "cost": -5, "message": "test3", "businessID": 1}'\
 http://localhost:8086/reviews

status 'POST reviews should return failure due to invalid business ID'
curl -H 'Content-Type: application/json' -d \
'{"rating": 4, "cost": 2, "message": "test3", "businessID": 999}'\
 http://localhost:8086/reviews

status 'POST reviews should return failure due to business already having a review'
curl -H 'Content-Type: application/json' -d \
'{"rating": 4, "cost": 2, "message": "test3", "businessID": 1}'\
 http://localhost:8086/reviews

# This is where I'm testing the reviews GET endpoint

status 'GET reviews should return success'
curl http://localhost:8086/reviews

# This is where I'm testing the reviews PUT endpoint

status 'PUT reviews should return success'
curl -X PUT -H 'Content-Type: application/json' -d \
'{"rating": 3, "cost": 3, "message": "anothertest"}'\
 http://localhost:8086/reviews/0

status 'PUT reviews should return failure due to malformed request body'
curl -X PUT -H 'Content-Type: application/json' -d \
'{"rating":  10, "cost": -5, "message": "test3"}'\
 http://localhost:8086/reviews/0

 status 'PUT reviews should return failure due to invalid review ID'
curl -X PUT -H 'Content-Type: application/json' -d \
'{"rating": 3, "cost": 3, "message": "anothertest"}'\
 http://localhost:8086/reviews/999

# This is where I'm testing the reviews DELETE endpoint

status 'DELETE review-by-id should return success'
curl -X DELETE http://localhost:8086/reviews/0

status 'DELETE review-by-id should return failure'
curl -X DELETE http://localhost:8086/reviews/999

# This is where I'm testing the photos POST endpoint (there is no test for malformed request body because a caption is optional and not having a business ID would be caught by  the second test)

status 'POST photos should return success'
curl -H 'Content-Type: application/json' -d \
'{"caption": "test3", "businessID": 1}'\
 http://localhost:8086/photos

 status 'POST photos should return failure due to invalid business ID'
curl -H 'Content-Type: application/json' -d \
'{"caption": "test3", "businessID": 999}'\
 http://localhost:8086/photos

 # This is where I'm testing the photos GET endpoint

status 'GET photos should return success'
curl http://localhost:8086/photos

# This is where I'm testing the reviews PUT endpoint

status 'PUT photos should return success'
curl -X PUT -H 'Content-Type: application/json' -d \
'{"caption": "test3"}'\
 http://localhost:8086/photos/0

 status 'PUT photos should return failure due to invalid photo ID'
curl -X PUT -H 'Content-Type: application/json' -d \
'{"caption": "test3"}'\
 http://localhost:8086/photos/999

 # This is where I'm testing the photos DELETE endpoint

status 'DELETE photo-by-id should return success'
curl -X DELETE http://localhost:8086/photos/0

status 'DELETE photo-by-id should return failure'
curl -X DELETE http://localhost:8086/photos/999