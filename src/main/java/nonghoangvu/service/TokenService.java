package nonghoangvu.service;

import nonghoangvu.model.Token;
import nonghoangvu.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public record TokenService(TokenRepository tokenRepository) {

    public int save(Token token) {
        Optional<Token> optionalToken = this.tokenRepository.findByUsername(token.getUsername());
        if (optionalToken.isEmpty()) { // Save Token
            this.tokenRepository.save(token);
            return token.getId();
        } else {// Update Token
            Token currentToken = optionalToken.get();
            currentToken.setAccessToken(token.getAccessToken());
            currentToken.setRefreshToken(token.getRefreshToken());
            this.tokenRepository.save(currentToken);
            return currentToken.getId();
        }
    }

    public String delete(Token token) {
        this.tokenRepository.delete(token);
        return "Deleted token: " + token.getAccessToken();
    }

    public Token findByUsername(String username) {
        return this.tokenRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Token not exists!"));
    }
}
