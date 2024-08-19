package nonghoangvu.service.impl;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import nonghoangvu.service.JwtService;
import nonghoangvu.utils.TokenType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

import static nonghoangvu.utils.TokenType.*;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${jwt.expiryHour}")
    private long expiryHour;

    @Value("${jwt.expiryDay}")
    private long expiryDay;

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.refreshKey}")
    private String refreshKey;

    @Override // TODO Access Token
    public String generateAccessToken(UserDetails user) {
        return generateToken(new HashMap<>(), user);
    }

    private String generateToken(Map<String, Object> claims, UserDetails user) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * this.expiryHour))
                .signWith(getKey(ACCESS_TOKEN), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override // TODO Refresh Token
    public String generateRefreshToken(UserDetails user) {
        return generateRefreshToken(new HashMap<>(), user);
    }

    private String generateRefreshToken(Map<String, Object> claims, UserDetails user) {
        return Jwts.builder()
                .setClaims(claims)//Info of payload don't want public
                .setSubject(user.getUsername())// info will return when extract token: username
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * this.expiryDay))
                .signWith(getKey(REFRESH_TOKEN), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getKey(TokenType type) {
        byte[] keyBytes;
        if (ACCESS_TOKEN.equals(type)) {
            keyBytes = Decoders.BASE64.decode(this.secretKey);
        } else {
            keyBytes = Decoders.BASE64.decode(this.refreshKey);
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override // TODO Handle Extract Token
    public String extractToken(String token, TokenType type) {
        return this.extractClaim(token, type, Claims::getSubject);
    }

    private <T> T extractClaim(String token, TokenType type, Function<Claims, T> claimResolver) {
        final Claims claims = extraAllClaim(token, type);
        return claimResolver.apply(claims);
    }

    private Claims extraAllClaim(String token, TokenType type) {
        return Jwts.parserBuilder().setSigningKey(this.getKey(type)).build().parseClaimsJws(token).getBody();
    }

    @Override // TODO Validate Token
    public boolean isValid(String token, TokenType type, UserDetails userDetails) {// Handle validate token
        final String username = this.extractToken(token, type); // Extract token and get username from token
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, type));
    }

    private boolean isTokenExpired(String token, TokenType type) {
        return extracExpirationDate(token, type).before(new Date());
    }

    private Date extracExpirationDate(String token, TokenType type) {
        return extractClaim(token, type, Claims::getExpiration);
    }
}
