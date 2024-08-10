package nonghoangvu.dto.requests;

import jakarta.validation.constraints.*;
import lombok.Getter;
import nonghoangvu.utils.Platform;

@Getter
public class SignInRequest {
    @NotBlank(message = "Username must be not null")
    private String username;
    @NotBlank(message = "Password must be not blank")
    private String password;

    //No require
    @NotNull(message = "Platform must be not null")
    private Platform platform;
    private String deviceToken;
    private String version;
}
