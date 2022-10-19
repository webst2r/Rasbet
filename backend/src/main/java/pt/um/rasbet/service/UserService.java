package pt.um.rasbet.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pt.um.rasbet.dto.UserCredentialsDTO;
import pt.um.rasbet.dto.UserDTO;
import pt.um.rasbet.entity.User;
import pt.um.rasbet.enumeration.ExceptionType;
import pt.um.rasbet.exception.BadRequestException;
import pt.um.rasbet.repository.UserRepository;
import pt.um.rasbet.security.JWTUtil;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;

    public void register(UserDTO userDTO) {
        this.validateNewEmail(userDTO.getEmail());
        User user = userDTO.toEntity();
        String encodedPassword = this.encodePassword(user.getPassword());
        user.setPassword(encodedPassword);
        this.save(user);

    }

    public Map<String, Object> login(UserCredentialsDTO userCredentialsDTO)  {

        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(userCredentialsDTO.getEmail(), userCredentialsDTO.getPassword());

        authManager.authenticate(authInputToken);

        String token = jwtUtil.generateToken(userCredentialsDTO.getEmail());

        return Collections.singletonMap("jwt-token", token);
    }

    private void validateNewEmail(String email) throws BadRequestException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            throw new BadRequestException("Email already exists", ExceptionType.EMAIL_ALREADY_EXISTS);
        }
    }

    private String encodePassword(String password) {
        return this.passwordEncoder.encode(password);
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }


}
