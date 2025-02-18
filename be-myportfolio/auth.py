from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from auth0.authentication.token_verifier import TokenVerifier, AsymmetricSignatureVerifier
import os
from dotenv import load_dotenv

load_dotenv()

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
AUTH0_AUDIENCE = os.getenv("AUTH0_API_IDENTIFIER")  # Fixed
AUTH0_CUSTOM_NAMESPACE = os.getenv("AUTH0_CUSTOM_NAMESPACE")  # Namespace for roles/permissions
ALGORITHMS = ["RS256"]

security = HTTPBearer()

# Create the Auth0 token verifier
signature_verifier = AsymmetricSignatureVerifier(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json")
token_verifier = TokenVerifier(signature_verifier=signature_verifier, issuer=f"https://{AUTH0_DOMAIN}/", audience=AUTH0_AUDIENCE)


async def validate_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Validate the JWT token and extract roles & permissions."""
    try:
        token = credentials.credentials
        payload = token_verifier.verify(token)

        # Extract roles & permissions using the correct namespace
        roles = payload.get(f"{AUTH0_CUSTOM_NAMESPACE}/roles", [])
        permissions = payload.get(f"{AUTH0_CUSTOM_NAMESPACE}/permissions", [])

        return {"roles": roles, "permissions": permissions, "payload": payload}

    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def has_permission(required_permission: str):
    """Dependency function to check if the user has a specific permission."""
    def permission_checker(user: dict = Depends(validate_token)):
        if required_permission not in user["permissions"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"You lack the '{required_permission}' permission.",
            )
        return user

    return permission_checker