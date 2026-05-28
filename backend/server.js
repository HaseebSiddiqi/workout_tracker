require("dotenv").config();

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, QueryCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");


const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const db = DynamoDBDocumentClient.from(client);



const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());
//Allow requests from the frontend
app.use(cors());


app.listen(5000, () => {
    console.log("Server running on port 5000");
});

//Create new workout type
app.post("/workouts", async (req, res) => {
    try {
        const { username, workoutName, exercises } = req.body;

        const item = {
            username,
            workoutName,
            exercises
        };

        await db.send(
            new PutCommand({
                TableName: "WorkoutTypes",
                Item: item
            })
        );

        res.json({ success: true, item });
        console.log({ item }, "Workout Created");

    } catch (error) {
        console.error("Error creating workout:", error);
        res.status(500).json({ error: "Failed to create workout" });
    }

});

//Get workout types for user
app.get("/workouts/:username", async (req, res) => {
    try {
        const { username } = req.params;

        const result = await db.send(
            new QueryCommand({
                TableName: "WorkoutTypes",
                KeyConditionExpression: "username = :username",
                ExpressionAttributeValues: {
                    ":username": username
                }
            })
        );
        res.json(result);
        console.log({ result }, "Fetching user workouts");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch workouts" });
    }
});

//Delete workout type
app.delete("/workouts/:username/:workoutName", async (req, res) => {
    try {
        const { username, workoutName } = req.params;

        await db.send(
            new DeleteCommand({
                TableName: "WorkoutTypes",
                Key: {
                    username,
                    workoutName
                }
            })
        );

        res.json({ success: true });
        console.log({ workoutName }, "Deleted Successfully");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete workout" });
    }
});




// CRUD CALLS FOR WORKOUT LOGS 
app.post("/workoutLogs", async (req, res) => {
    try {
        const { username, workoutId, workoutName,date, notes, exercises } = req.body;

        const item = {
            username,
            workoutId,
            workoutName,
            date,
            notes,
            exercises
        };

        await db.send(
            new PutCommand({
                TableName: "WorkoutLogs",
                Item: item
            })
        );

        res.json({ success: true, item });
        console.log({ item }, "Workout Created");

    } catch (error) {
        console.error("Error creating workout:", error);
        res.status(500).json({ error: "Failed to create workout" });
    }

});

app.get("/workoutLogs/:username", async (req,res) => {
    try {   
        const {username} = req.params;

        const result = await db.send(
            new QueryCommand({
                TableName: "WorkoutLogs",
                KeyConditionExpression: "username = :username",
                ExpressionAttributeValues: {
                    ":username": username
                }
            })
        );
        res.json(result);
        console.log({ result }, "Fetching user workout log");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch workouts" });
    }
});

app.delete("/workoutLogs/:username/:workoutId", async (req, res) => {
    try {
        const { username, workoutId} = req.params;

        await db.send(
            new DeleteCommand({
                TableName: "WorkoutLogs",
                Key: {
                    username, 
                    workoutId
                }
            })
        );
        res.json({success:true});
        console.log({workoutName}, "Deleted Successfully");

    }
    catch (err){
        console.error(err);
        res.status(500).json({error: "Failed to delete workout entry"});
    }
}); 