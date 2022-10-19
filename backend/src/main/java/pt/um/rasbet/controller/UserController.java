package pt.um.rasbet.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pt.um.rasbet.dto.UserCredentialsDTO;
import pt.um.rasbet.dto.UserDTO;
import pt.um.rasbet.service.UserService;

import javax.validation.Valid;
import java.util.Map;

@RepositoryRestController()
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @PostMapping("user/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDTO userDTO) {
        userService.register(userDTO);
        return ResponseEntity.ok("registed");
    }

    @PostMapping("user/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody @Valid UserCredentialsDTO userCredentialsDTO) {
        var map  = userService.login(userCredentialsDTO);
        return ResponseEntity.ok(map);
    }
}
