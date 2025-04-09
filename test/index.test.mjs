import { describe, it, expect } from 'vitest'
import { handler } from '../src/index.mjs';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const ddbMock = mockClient(DynamoDBClient);

describe('Lambda Validation', () => {

    //case 1
    it('should insert item successfully', async () => {
        ddbMock.on(PutItemCommand).resolves({}); // mock successful insertion
    
        const event = {
          body: JSON.stringify({
            user_id: "123",
            name: "John",
            age: 30
          })
        };
    
        const res = await handler(event);
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body)).toEqual({ message: "Item inserted successfully" });
      });
     
    //case 2  
    it('user_id is missing', async () => {
        const event = {
            body: JSON.stringify({ name: "Alice", age: 22 })
        };

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
            error: "Missing required fields: user_id, name, age"
        });
    });

    //case 3
    it('name is missing', async () => {
        const event = {
            body: JSON.stringify({ user_id: "1", age: 22 })
        };

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
            error: "Missing required fields: user_id, name, age"
        });
    });

    //case 4
    it('age is missing', async () => {
        const event = {
            body: JSON.stringify({ user_id: "1", name: "Bob" })
        };

        const response = await handler(event);

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
            error: "Missing required fields: user_id, name, age"
        });
    });

    //case 5
    it('should return 400 if DynamoDB throws an error', async () => {
        ddbMock.on(PutItemCommand).rejects(new Error("DynamoDB Error"));
    
        const event = {
          body: JSON.stringify({
            user_id: "456",
            name: "Jane",
            age: 25
          })
        };
    
        const res = await handler(event);
        expect(res.statusCode).toBe(400);
        expect(JSON.parse(res.body)).toEqual({ error: "DynamoDB Error"});
    });
});
