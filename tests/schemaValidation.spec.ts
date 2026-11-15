import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv();

// 1) Schema Validation - Mock Target API

test('Validate JSON response with schema1', async ({ request }) => {

    const response = await request.get('https://mocktarget.apigee.net/json');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    // JSON Schema
    const schema = {
        type: 'object',
        properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
        },
        required: ['firstName', 'lastName', 'city', 'state'],
    };

    // Compile schema
    const validate = ajv.compile(schema);

    // Validate response
    const isValid = validate(responseBody);

    console.log(validate.errors);

    expect(isValid).toBeTruthy();

});


// 2) Schema Validation - JSONPlaceholder API

test('Validate JSON response with schema2', async ({ request }) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    // JSON Schema
    const schema = {
        type: 'object',
        properties: {
            userId: { type: 'integer' },
            id: { type: 'integer' },
            title: { type: 'string' },
            body: { type: 'string' },
        },
        required: ['userId', 'id', 'title', 'body'],
    };

    // Compile schema
    const validate = ajv.compile(schema);

    // Validate response
    const isValid = validate(responseBody);

    console.log(validate.errors);

    expect(isValid).toBeTruthy();

});