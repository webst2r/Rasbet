package pt.rasbet.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.rasbet.backend.entity.User;
import pt.rasbet.backend.utils.ExceptionConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

import static pt.rasbet.backend.utils.Constants.*;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {
    // tavamos a tentar meter notblank num long
    //@NotBlank(message = "userId" + ExceptionConstants.REQUIRED)
    private Long userId;
    @NotBlank(message = "firstName " + ExceptionConstants.REQUIRED)
    private String firstName;
    @NotBlank(message = "lastName " + ExceptionConstants.REQUIRED)
    private String lastName;
    @NotBlank(message = "password " + ExceptionConstants.REQUIRED)
    private String password;

}
