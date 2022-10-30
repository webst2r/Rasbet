package pt.rasbet.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.rasbet.backend.entity.User;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserWithTokenDTO {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private Float saldo;
    private String token;


    public UserWithTokenDTO(User user, String token){
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole().getName();
        this.token = token;
        this.saldo = user.getCarteira().getSaldo();
    }
}
