from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import json  # ✅ Use Python's built-in json module
import requests
from jwt.algorithms import RSAAlgorithm
import os
from dotenv import load_dotenv

load_dotenv()

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
AUTH0_AUDIENCE = os.getenv("AUTH0_API_IDENTIFIER")
AUTH0_CUSTOM_NAMESPACE = os.getenv("AUTH0_CUSTOM_NAMESPACE")

security = HTTPBearer()

# Fetch Auth0 JWKS (JSON Web Key Set)
jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
jwks = requests.get(jwks_url).json()

def get_rsa_key(token):
    """Retrieve and convert the RSA key for JWT verification."""
    header = jwt.get_unverified_header(token)
    for key in jwks["keys"]:
        if key["kid"] == header["kid"]:
            # ✅ Fix: Use json.dumps() instead of jwt.json.dumps()
            return RSAAlgorithm.from_jwk(json.dumps(key))
    return None


async def validate_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Manually validate JWT token and extract roles & permissions."""
    print("DEBUG: validate_token() called")  # <--- This should always log

    try:
        token = credentials.credentials
        print("DEBUG: Raw Token Received ->", token)  # <--- Log received token

        rsa_key = get_rsa_key(token)
        if not rsa_key:
            print("DEBUG: No matching RSA key found!")
            raise HTTPException(status_code=401, detail="Invalid token: No matching RSA key")

        # Decode the JWT token
        payload = jwt.decode(
            token,
            key=rsa_key,
            algorithms=["RS256"],
            audience=AUTH0_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/",
        )

        print("DEBUG: Full Token Payload ->", payload)
        print("DEBUG: Extracted Roles ->", payload.get(f"{AUTH0_CUSTOM_NAMESPACE}roles", []))
        print("DEBUG: Extracted Permissions ->", payload.get("permissions", []))

        return {
            "roles": payload.get(f"{AUTH0_CUSTOM_NAMESPACE}roles", []),
            "permissions": payload.get("permissions", []),
            "payload": payload,
        }

    except jwt.ExpiredSignatureError:
        print("DEBUG: Token expired!")
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.exceptions.InvalidClaimError as e:
        print(f"DEBUG: Invalid claims - {str(e)}")
        raise HTTPException(status_code=401, detail=f"Invalid claims: {str(e)}")
    except jwt.DecodeError:
        print("DEBUG: Token signature invalid!")
        raise HTTPException(status_code=401, detail="Invalid token signature")
    except Exception as e:
        print(f"DEBUG: General token validation error - {str(e)}")
        raise HTTPException(status_code=401, detail=f"Token validation failed: {str(e)}")

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