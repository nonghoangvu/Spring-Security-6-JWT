package nonghoangvu.service;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nonghoangvu.dto.requests.SignInRequest;
import nonghoangvu.dto.response.*;
import nonghoangvu.model.*;
import nonghoangvu.repository.UserRepository;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static nonghoangvu.utils.TokenType.*;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenService tokenService;

    public TokenResponse authenticate(SignInRequest request) {
        // If authentication is successful, continue running
        this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        var user = this.userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username or password is incorrect"));
        // Generate access and refresh token
        String access_token = this.jwtService.generateAccessToken(user);
        String refresh_token = this.jwtService.generateRefreshToken(user);
        // Save token into database
        this.tokenService.save(Token.builder()
                .username(user.getUsername())
                .accessToken(access_token)
                .refreshToken(refresh_token)
                .build());
        return TokenResponse.builder()
                .access_token(access_token)
                .refresh_token(refresh_token)
                .user_id(user.getId())
                .build();
    }

    public TokenResponse refresh(HttpServletRequest request) {
        // Validate token
        String refresh_token = request.getHeader(AUTHORIZATION);
        if (StringUtils.isBlank(refresh_token)) {
            throw new InvalidDataAccessApiUsageException("Token must be not blank!");
        }
        //Extract user from token
        final String username = this.jwtService.extractToken(refresh_token, REFRESH_TOKEN);
        //Check it into database
        Optional<User> user = this.userRepository.findByUsername(username);
        if (!this.jwtService.isValid(refresh_token, REFRESH_TOKEN, user.get())) {
            throw new InvalidDataAccessApiUsageException("Token is invalid!");
        }
        String access_token = this.jwtService.generateAccessToken(user.get());
        return TokenResponse.builder()
                .access_token(access_token)
                .refresh_token(refresh_token)
                .user_id(user.get().getId())
                .build();
    }

    public String logout(HttpServletRequest request) {
        // Validate token
        String refresh_token = request.getHeader(AUTHORIZATION);
        if (StringUtils.isBlank(refresh_token)) {
            throw new InvalidDataAccessApiUsageException("Token must be not blank!");
        }
        //Extract user from token
        final String username = this.jwtService.extractToken(refresh_token, ACCESS_TOKEN);
        //Check token in database
        Token currentToken = this.tokenService.findByUsername(username);
        // Delete token permanent
        this.tokenService.delete(currentToken);
        return "Logout successful";
    }

    public UserInfo getInfo(HttpServletRequest request) {
        // Validate token
        String refresh_token = request.getHeader(AUTHORIZATION);
        if (StringUtils.isBlank(refresh_token)) {
            throw new InvalidDataAccessApiUsageException("Token must be not blank!");
        }
        final String username = this.jwtService.extractToken(refresh_token, ACCESS_TOKEN);
        var user = this.userRepository.findByUsername(username).get();
        return UserInfo.builder()
                .email(user.getEmail())
                .fullname(user.getFullname())
                .address(user.getAddress())
                .gender(user.getGender() ? "male" : "female")
                .role(user.getRole())
                .build();
    }
}
