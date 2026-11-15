import { test, expect } from '@playwright/test';

test('create post request using static body',async({request})=>{

const requestBody = {
    "firstname": "Afsal",
    "lastname": "Brown",
    "totalprice": 1000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-07-01",
        "checkout": "2025-07-05"
    },
    "additionalneeds": "super bowls"
}

const response = await request.post('/booking',{data:requestBody})

const responseBody =await response.json()  //extracted response

console.log(responseBody)

//validate status
expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)

//validate response body
const booking = responseBody.booking

 expect(booking).toMatchObject({
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 1000,
        depositpaid: true,
        additionalneeds: "super bowls",
    });

     //validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
            checkin: "2025-07-01",
            checkout: "2025-07-05",
        });



})