package pt.um.rasbet.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "first_name", nullable = false
    )
    private String firstName;
    @Column(
            name = "last_name", nullable = false
    )
    private String lastName;
    @Column(
            name = "email", nullable = false, unique = true
    )
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(
            name = "password", nullable = false
    )
    private String password;

    public User(String firstName, String lastName, String email, String password){
        this.firstName = firstName;
        this.lastName =  lastName;
        this.email = email;
        this.password =  password;
    }
}
