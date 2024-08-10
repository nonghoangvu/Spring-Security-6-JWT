package nonghoangvu.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserInfo {
    private String email;
    private String fullname;
    private String gender;
    private String address;
}
