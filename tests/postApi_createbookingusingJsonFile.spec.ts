import { test, expect } from '@playwright/test';
import fs from 'fs'

test('create post request using json file body',async({request})=>{

    //read data from json
    const jsonFile ="testdata/post_request_body.json"
    const requestBody = JSON.parse(fs.readFileSync(jsonFile,'utf-8'))

const response = await request.post('/booking',{data:requestBody})

const responseBody =await response.json()  //extracted response

console.log(responseBody)

//validate status
expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)

//validate response body
const booking = responseBody.booking

 expect(booking).toMatchObject({
        firstname: requestBody.firstname,
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