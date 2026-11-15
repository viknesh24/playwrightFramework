import { test, expect } from '@playwright/test';

// test('get booking details using path param',async({request})=>{

// const bookingID =727
// const response = await request.get(`/booking/${bookingID}`)

// const responseBody =await response.json()  //extracted response

// console.log(responseBody)

// //validate status
// expect(response.ok()).toBeTruthy()
// expect(response.status()).toBe(200)

// })

test('get booking details using query param',async({request})=>{

const firstname='Jim'
const lastname='Brown'
const response = await request.get("/booking",{
params:
{
   firstname,lastname 
}

});

const responseBody =await response.json()  //extracted response

console.log(responseBody)

//validate status
expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)

//check response should not be empty
expect(responseBody.length).toBeGreaterThan(0)

for(const items of responseBody){
    expect(items).toHaveProperty('bookingid')
    expect(typeof items.bookingid).toBe("number")
    expect(items.bookingid).toBeGreaterThan(0)
}


})