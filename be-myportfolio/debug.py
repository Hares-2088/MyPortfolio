from database import database
import asyncio

async def check_data():
    collection = database["projects"]
    data = await collection.find().to_list(10)
    print("Retrieved Data:", data)

asyncio.run(check_data())
