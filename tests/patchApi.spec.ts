/*

Pre-requisites:
    data: json file
    create token

1) Create a booking (Post) ---> bookingId
2) Partial Update booking (Patch)   // required token

*/

import {test,expect} from '@playwright/test'

import fs from 'fs';

//utility function returns json file data
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Partial Update Booking(Patch)', async ({ request }) => {

      const requestBody = readJson('testdata/post_request_body.json');
      const createResponse = await request.post('/booking', { data:requestBody });

    //expect(createResponse.ok()).toBeTruthy();

    const responsebody = await createResponse.json();

    console.log(responsebody);
    const bookingid = responsebody.bookingid;   // extracting bookingid from the response body
    console.log("Booking id======>", bookingid);

     //2) Partial Update booking (Patch)   // required token

      const tokenrequestBody = readJson('testdata/token_request_body.json');

      const tokenresponse = await request.post('/auth', { data: tokenrequestBody });
       expect(tokenresponse.ok()).toBeTruthy();

    const tokenresponsebody = await tokenresponse.json();
    const token = tokenresponsebody.token;
    console.log("Token ======>", token);

    //sending update
      const patchRequestbody = readJson('testdata/patch_request_body.json');
      const partialupdateresponse=await request.patch(`/booking/${bookingid}`,
                       {
                        headers:{"Cookie":`token=${token}`},
                        data:patchRequestbody
                        }
                     );
      expect(partialupdateresponse.ok()).toBeTruthy();
      expect(partialupdateresponse.status()).toBe(200);
      
      const partualresponse = await partialupdateresponse.json()
      console.log('partial response body',partualresponse)

   //check data created in get api   
const response = await request.get(`/booking/${bookingid}`)

const responseBody =await response.json()  //extracted response

console.log('get response body',responseBody)

//validate status
expect(response.ok()).toBeTruthy()
expect(response.status()).toBe(200)
      


})