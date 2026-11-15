# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: getApirequest.spec.ts >> get booking details using path param
- Location: tests\getApirequest.spec.ts:3:5

# Error details

```
SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('get booking details using path param',async({request})=>{
  4  | 
  5  | const bookingID =727
  6  | const response = await request.get(`/booking/${bookingID}`)
  7  | 
> 8  | const responseBody =await response.json()  //extracted response
     |                     ^ SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON
  9  | 
  10 | console.log(responseBody)
  11 | 
  12 | //validate status
  13 | expect(response.ok()).toBeTruthy()
  14 | expect(response.status()).toBe(200)
  15 | 
  16 | })
  17 | 
  18 | test('get booking details using query param',async({request})=>{
  19 | 
  20 | const firstname='Jim'
  21 | const lastname='Brown'
  22 | const response = await request.get("/booking",{
  23 | params:
  24 | {
  25 |    firstname,lastname 
  26 | }
  27 | 
  28 | });
  29 | 
  30 | const responseBody =await response.json()  //extracted response
  31 | 
  32 | console.log(responseBody)
  33 | 
  34 | //validate status
  35 | expect(response.ok()).toBeTruthy()
  36 | expect(response.status()).toBe(200)
  37 | 
  38 | //check response should not be empty
  39 | expect(responseBody.length).toBeGreaterThan(0)
  40 | 
  41 | for(const items of responseBody){
  42 |     expect(items).toHaveProperty('bookingid')
  43 |     expect(typeof items.bookingid).toBe("number")
  44 |     expect(items.bookingid).toBeGreaterThan(0)
  45 | }
  46 | 
  47 | 
  48 | })
```