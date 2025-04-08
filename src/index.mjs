// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
// export const handler = async (event) => {
//     try {
//         const { user_id, name, age } = JSON.parse(event.body);

//         const params = {
//             TableName: "MyTable",
//             Item: {
//                 user_id: { S: String(user_id) }, 
//                 name: { S: name },
//                 age: { N: String(age) }
//             }
//         };
//         await dynamoDB.send(new PutItemCommand(params));
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "Item inserted successfully" }),
//         };
//     }
//     catch (error) {
//         return { statusCode: 500, body: JSON.stringify({ error: error.message }),
//         };
//     }
// };



import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const dynamoDB = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
    try {

        const { user_id, name, age } = JSON.parse(event.body);

        if (!user_id || !name || age === undefined) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required fields: user_id, name, age" }),
            };
        }

        const params = {
            TableName: "MyTable",
            Item: {
                user_id: { S: String(user_id) },
                name: { S: name },
                age: { N: String(age) },
            },
        };

        await dynamoDB.send(new PutItemCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Item inserted successfully" }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
};