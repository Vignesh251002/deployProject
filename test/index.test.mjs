// import { describe, it, expect } from 'vitest'
// import { handler } from '../src/index.mjs'
// describe('Lambda Input Validation', () => {
    // it('should return 400 when body is missing', async () => {
    //     const response = await handler({});

    //     expect(response.statusCode).toBe(400);
    //     expect(JSON.parse(response.body)).toEqual({
    //         error: "Missing required fields: user_id, name, age"
    //     });
    // });

    // it('should return 400 when user_id is missing', async () => {
    //     const event = {
    //         body: JSON.stringify({ name: "Alice", age: 22 })
    //     };

    //     const response = await handler(event);

    //     expect(response.statusCode).toBe(400);
    //     expect(JSON.parse(response.body)).toEqual({
    //         error: "Missing required fields: user_id, name, age"
    //     });
    // });

    // it('should return 400 when name is missing', async () => {
    //     const event = {
    //         body: JSON.stringify({ user_id: "1", age: 22 })
    //     };

    //     const response = await handler(event);

    //     expect(response.statusCode).toBe(400);
    //     expect(JSON.parse(response.body)).toEqual({
    //         error: "Missing required fields: user_id, name, age"
    //     });
    // });

    // it('should return 400 when age is missing', async () => {
    //     const event = {
    //         body: JSON.stringify({ user_id: "1", name: "Bob" })
    //     };

    //     const response = await handler(event);

    //     expect(response.statusCode).toBe(400);
    //     expect(JSON.parse(response.body)).toEqual({
    //         error: "Missing required fields: user_id, name, age"
    //     });
    // });
    
//     it('should return 500 for other unexpected errors', async () => {
//         const event = {
//             body: JSON.stringify({ user_id: "1", name: "Test", age: 30 })
//         };
//         const response = await handler(event);
//         expect(response.statusCode).toBe(500);
//         expect(JSON.parse(response.body)).toEqual({
//             error: "The security token included in the request is invalid."
//         });
//     });
// });


import { describe, it, expect } from 'vitest'
import { handler } from '../src/index.mjs';

describe('Lambda Input Validation', () => {
    it('should return 400 when user_id is missing', async () => {
        const event = {
            body: JSON.stringify({ name: "Alice", age: 22 })
        };

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
            error: "Missing required fields: user_id, name, age"
        });
    });

    it('should return 400 when name is missing', async () => {
        const event = {
            body: JSON.stringify({ user_id: "1", age: 22 })
        };

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
            error: "Missing required fields: user_id, name, age"
        });
    });

    it('should return 400 when age is missing', async () => {
        const event = {
            body: JSON.stringify({ user_id: "1", name: "Bob" })
        };

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
            error: "Missing required fields: user_id, name, age"
        });
    });
});

