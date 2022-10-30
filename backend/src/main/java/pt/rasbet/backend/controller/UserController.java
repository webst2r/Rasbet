package pt.rasbet.backend.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pt.rasbet.backend.dto.GameApiDTO;
import pt.rasbet.backend.dto.UserCredentialsDTO;
import pt.rasbet.backend.dto.UserDTO;
import pt.rasbet.backend.dto.UserWithTokenDTO;
import pt.rasbet.backend.service.GameApiService;
import pt.rasbet.backend.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RepositoryRestController()
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;
    private final GameApiService gameApiService;

    @PostMapping("user/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDTO userDTO) {
        var msg = userService.register(userDTO);
        return ResponseEntity.ok(msg);
    }

    @PostMapping("user/login")
    public ResponseEntity<UserWithTokenDTO> login(@RequestBody @Valid UserCredentialsDTO userCredentialsDTO) {
        var userWithTokenDTO  = userService.login(userCredentialsDTO);
        return ResponseEntity.ok(userWithTokenDTO);
    }

    @GetMapping("user/games")
    public ResponseEntity<List<GameApiDTO>> games(){
        return ResponseEntity.ok(gameApiService.getGames());
    }
}
