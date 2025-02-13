from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from jose.constants import ALGORITHMS
from auth0.authentication.token_verifier import TokenVerifier, AsymmetricSignatureVerifier

# Auth0 configuration
AUTH0_DOMAIN = "your-auth0-domain.auth0.com"  # Replace with your Auth0 domain
AUTH0_AUDIENCE = "your-api-identifier"  # Replace with your API identifier
ALGORITHMS = ["RS256"]

# Create a token verifier
signature_verifier = AsymmetricSignatureVerifier(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json")
token_verifier = TokenVerifier(signature_verifier=signature_verifier, issuer=f"https://{AUTH0_DOMAIN}/", audience=AUTH0_AUDIENCE)

security = HTTPBearer()

async def validate_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Validate the JWT token."""
    try:
        token = credentials.credentials
        token_verifier.verify(token)
        return token
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )