package nonghoangvu.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import nonghoangvu.dto.requests.SignInRequest;
import nonghoangvu.dto.response.TokenResponse;
import nonghoangvu.dto.response.UserInfo;
import nonghoangvu.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5173"})
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/access")
    public ResponseEntity<TokenResponse> login(@RequestBody SignInRequest request) {
        var token = this.authenticationService.authenticate(request);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(HttpServletRequest request) {
        return ResponseEntity.ok(this.authenticationService.refresh(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        return ResponseEntity.ok(this.authenticationService.logout(request));
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfo> info(HttpServletRequest request) {
        return ResponseEntity.ok(this.authenticationService.getInfo(request));
    }
}
