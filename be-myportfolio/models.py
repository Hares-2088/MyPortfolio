from beanie import Document
from pydantic import BaseModel, HttpUrl
from typing import Optional
from beanie import PydanticObjectId
from typing import List

class Project(Document):
    id: Optional[PydanticObjectId] = None
    title: str
    description: str
    github_url: HttpUrl
    live_url: Optional[HttpUrl] = None
    image: Optional[str] = None
    featured: bool = True
    tools: List[str] = []  # List of tools/technologies used

    class Settings:
        name = "projects"

    class Config:
        json_schema_extra = {
            "example": {
                "title": "TravelTrove",
                "description": "A Java-based travel management system.",
                "github_url": "https://github.com/Hares-2088/TravelTrove",
                "live_url": "https://traveltrove.com",
                "image": "https://via.placeholder.com/400x200",
                "featured": True,
                "tools": ["Next.js", "React", "Tailwind CSS", "TypeScript"]
            }
        }

class Comment(Document):
    id: Optional[PydanticObjectId] = None
    project_id: PydanticObjectId
    content: str
    author: str
    approved: bool = False

    class Settings:
        name = "comments"

    class Config:
        json_schema_extra = {
            "example": {
                "project_id": "60d5ec49f8d2c2b1c8e4d8b5",
                "content": "This is a great project!",
                "author": "John Doe",
                "approved": False
            }
        }