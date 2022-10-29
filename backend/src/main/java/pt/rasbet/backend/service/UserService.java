package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.dto.UserCredentialsDTO;
import pt.rasbet.backend.dto.UserDTO;
import pt.rasbet.backend.dto.UserWithTokenDTO;
import pt.rasbet.backend.enumeration.ERole;
import pt.rasbet.backend.enumeration.ExceptionType;
import pt.rasbet.backend.exception.BadRequestException;
import pt.rasbet.backend.repository.UserRepository;
import pt.rasbet.backend.security.jwt.JwtUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final RoleService roleService;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    private List<String> roles = List.of(ERole.ROLE_USER.name(), ERole.ROLE_ADMIN.name(), ERole.ROLE_SPECIALIST.name());

    public UserWithTokenDTO login(UserCredentialsDTO userCredentialsDTO){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userCredentialsDTO.getEmail(), userCredentialsDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        //TODO: Add user saldo when sending
        var user = userRepository.findByEmail(userCredentialsDTO.getEmail()).get();

        return new UserWithTokenDTO(user, jwt);
    }


    public String register(UserDTO userDTO){
        validateNewEmail(userDTO.getEmail());
        var user = userDTO.toEntity();
        user.setPassword(encoder.encode(user.getPassword()));

        if(!roles.contains(userDTO.getRole())){
            throw new BadRequestException("Role does not exists", ExceptionType.ROLE_NOT_EXISTS);
        }
        user.setRole(roleService.findByName(userDTO.getRole()).get());
        userRepository.save(user);
        //TODO - create wallet for user
        return "User registered successfully!";
    }

    private void validateNewEmail(String email) throws BadRequestException {
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email already exists", ExceptionType.EMAIL_ALREADY_EXISTS);
        }
    }
}
