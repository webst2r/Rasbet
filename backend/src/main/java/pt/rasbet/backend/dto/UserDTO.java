package pt.rasbet.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import pt.rasbet.backend.utils.ExceptionConstants;
import pt.rasbet.backend.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import java.time.LocalDate;

import static pt.rasbet.backend.utils.Constants.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    @NotBlank(message = "email " + ExceptionConstants.REQUIRED)
    private String email;
    @NotBlank(message = "firstName " + ExceptionConstants.REQUIRED)
    private String firstName;
    @NotBlank(message = "lastName " + ExceptionConstants.REQUIRED)
    private String lastName;
    @NotBlank(message = "password " + ExceptionConstants.REQUIRED)
    private String password;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotBlank(message = "role " + ExceptionConstants.REQUIRED)
    @Pattern(regexp = "^(" + ROLE_USER + "|" + ROLE_SPECIALIST + "|" + ROLE_ADMIN + ")$", message = ExceptionConstants.ROLE_NOT_EXISTS)
    private String role;

    public User toEntity() {
        return new User(this.firstName, this.lastName, this.email, this.password, this.birthDate);
    }
}
