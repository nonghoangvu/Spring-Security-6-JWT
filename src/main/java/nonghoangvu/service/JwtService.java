package nonghoangvu.service;

import nonghoangvu.utils.TokenType;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String generateAccessToken(UserDetails user);

    String generateRefreshToken(UserDetails user);

    String extractToken(String token, TokenType type);

    boolean isValid(String token, TokenType type, UserDetails username);
}