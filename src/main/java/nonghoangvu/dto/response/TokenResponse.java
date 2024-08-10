package nonghoangvu.dto.response;

import lombok.*;

@Getter
@Builder
public class TokenResponse {
    private String access_token;
    private String refresh_token;
    private Integer user_id;
}
