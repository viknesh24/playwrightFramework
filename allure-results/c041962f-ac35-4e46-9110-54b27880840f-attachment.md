# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: putApi.spec.ts >> Partial Update Booking(Patch)
- Location: tests\putApi.spec.ts:21:5

# Error details

```
Error: ENOENT: no such file or directory, open 'D:\playwrightFramework8.30amBatch\testdata\post_request_body'
```

# Test source

```ts
  1  | /*
  2  | 
  3  | Pre-requisites:
  4  |     data: json file
  5  |     create token
  6  | 
  7  | 1) Create a booking (Post) ---> bookingId
  8  | 2) Partial Update booking (Patch)   // required token
  9  | 
  10 | */
  11 | 
  12 | import {test,expect} from '@playwright/test'
  13 | 
  14 | import fs from 'fs';
  15 | 
  16 | //utility function returns json file data
  17 | function readJson(filePath: string) {
> 18 |     return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
     |                          ^ Error: ENOENT: no such file or directory, open 'D:\playwrightFramework8.30amBatch\testdata\post_request_body'
  19 | }
  20 | 
  21 | test('Partial Update Booking(Patch)', async ({ request }) => {
  22 | 
  23 |       const requestBody = readJson('testdata/post_request_body.json');
  24 |       const createResponse = await request.post('/booking', { data:requestBody });
  25 | 
  26 |     //expect(createResponse.ok()).toBeTruthy();
  27 | 
  28 |     const responsebody = await createResponse.json();
  29 | 
  30 |     console.log(responsebody);
  31 |     const bookingid = responsebody.bookingid;   // extracting bookingid from the response body
  32 |     console.log("Booking id======>", bookingid);
  33 | 
  34 |      //2)  Update booking (Patch)   // required token
  35 | 
  36 |       const tokenrequestBody = readJson('testdata/token_request_body.json');
  37 | 
  38 |       const tokenresponse = await request.post('/auth', { data: tokenrequestBody });
  39 |        expect(tokenresponse.ok()).toBeTruthy();
  40 | 
  41 |     const tokenresponsebody = await tokenresponse.json();
  42 |     const token = tokenresponsebody.token;
  43 |     console.log("Token ======>", token);
  44 | 
  45 |     //sending update
  46 |       const patchRequestbody = readJson('testdata/post_request_body');
  47 |       const partialupdateresponse=await request.put(`/booking/${bookingid}`,
  48 |                        {
  49 |                         headers:{"Cookie":`token=${token}`},
  50 |                         data:patchRequestbody
  51 |                         }
  52 |                      );
  53 |       expect(partialupdateresponse.ok()).toBeTruthy();
  54 |       expect(partialupdateresponse.status()).toBe(200);
  55 |       
  56 |       const partualresponse = await partialupdateresponse.json()
  57 |       console.log('update response body',partualresponse)
  58 | 
  59 |    //check data created in get api   
  60 | const response = await request.get(`/booking/${bookingid}`)
  61 | 
  62 | const responseBody =await response.json()  //extracted response
  63 | 
  64 | console.log('get response body',responseBody)
  65 | 
  66 | //validate status
  67 | expect(response.ok()).toBeTruthy()
  68 | expect(response.status()).toBe(200)
  69 |       
  70 | 
  71 | 
  72 | })
```