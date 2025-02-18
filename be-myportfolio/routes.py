from fastapi import APIRouter, Depends, HTTPException
from models import Project, Comment
from typing import List
from beanie import PydanticObjectId
from auth import validate_token, has_permission

project_router = APIRouter()

@project_router.get("/", response_model=List[Project])
async def get_projects():
    projects = await Project.all().to_list()
    return projects

@project_router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Retrieve a specific project by its ID."""
    project = await Project.get(project_id)
    if project:
        return project
    raise HTTPException(status_code=404, detail="Project not found")

@project_router.post("/", response_model=Project)
async def add_project(project: Project, user: dict = Depends(has_permission("manage:projects"))):
    """Add a new project."""
    new_project = await project.insert()
    return new_project

@project_router.put("/{project_id}", response_model=Project)
async def update_project(project_id: str, updated_data: Project, user: dict = Depends(has_permission("manage:projects"))):
    """Update a project."""
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_dict = updated_data.dict(exclude_unset=True)
    await project.set(update_dict)
    return project

@project_router.delete("/{project_id}")
async def delete_project(project_id: str, user: dict = Depends(has_permission("manage:projects"))):
    """Delete a project."""
    project = await Project.get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    await project.delete()
    return {"message": "Project deleted successfully"}

## COMMENTS ROUTER
comment_router = APIRouter()

@comment_router.get("/", response_model=List[Comment])
async def get_all_comments():
    """Retrieve all comments."""
    comments = await Comment.all().to_list()
    return comments

@comment_router.post("/", response_model=Comment)
async def add_comment(comment: Comment, user: dict = Depends(validate_token)):
    """Add a new comment."""
    new_comment = await comment.insert()
    return new_comment

@comment_router.get("/project/{project_id}", response_model=List[Comment])
async def get_comments(project_id: PydanticObjectId):
    """Retrieve all approved comments for a specific project."""
    comments = await Comment.find({"project_id": project_id, "approved": True}).to_list()
    return comments

@comment_router.put("/{comment_id}/approve", response_model=Comment)
async def approve_comment(comment_id: PydanticObjectId, user: dict = Depends(has_permission("manage:comments"))):
    """Approve a comment."""
    comment = await Comment.get(comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    comment.approved = True
    await comment.save()
    return comment

@comment_router.delete("/{comment_id}")
async def delete_comment(comment_id: PydanticObjectId, user: dict = Depends(has_permission("manage:comments"))):
    """Delete a comment."""
    comment = await Comment.get(comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    await comment.delete()
    return {"message": "Comment deleted successfully"}

## DASHBOARD ROUTER
dashboard_router = APIRouter()

@dashboard_router.get("/")
async def get_dashboard(user: dict = Depends(has_permission("read:dashboard"))):
    """Dashboard endpoint for admins."""
    return {"message": "Welcome to the admin dashboard!"}
