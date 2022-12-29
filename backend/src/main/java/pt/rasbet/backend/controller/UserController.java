package pt.rasbet.backend.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pt.rasbet.backend.dto.*;
import pt.rasbet.backend.entity.Notificacao;
import pt.rasbet.backend.service.UserService;

import javax.persistence.spi.LoadState;
import javax.validation.Valid;
import java.util.List;

@RepositoryRestController()
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @PostMapping("user/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDTO userDTO) {
        var msg = userService.register(userDTO);
        return ResponseEntity.ok(msg);
    }

    @PostMapping("user/login")
    public ResponseEntity<UserWithTokenDTO> login(@RequestBody @Valid UserCredentialsDTO userCredentialsDTO) {
        var userWithTokenDTO = userService.login(userCredentialsDTO);
        return ResponseEntity.ok(userWithTokenDTO);
    }

    @PostMapping("user/profile")
    public ResponseEntity<String> updateProfile(@RequestBody @Valid UserUpdateDTO userUpdateDTO) {
        var msg = userService.updateProfile(userUpdateDTO);
        return ResponseEntity.ok(msg);
    }

    @PostMapping("user/{id}/notification/{gameID}/add")
    public ResponseEntity<?> addGameToUserNotification(@PathVariable("id") Long id, @PathVariable("gameID") Long gameID) {
        userService.addGameToUserNotification(id, gameID);
        return ResponseEntity.ok("Added");
    }

    @PostMapping("user/{id}/notification/{gameID}/remove")
    public ResponseEntity<?> removeGameToUserNotification(@PathVariable("id") Long id, @PathVariable("gameID") Long gameID) {
        userService.removeGameToUserNotification(id, gameID);
        return ResponseEntity.ok("Removed");
    }

    @GetMapping("user/{id}/notification/games")
    public ResponseEntity<List<Long>> getAllUserGameToNotify(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getAllUserGameToNotify(id));
    }

    @GetMapping("user/{id}/notification/unread/count")
    public ResponseEntity<Long> countUnreadUserNotifications(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.countUnreadUserNotifications(id));
    }

    @PostMapping("user/{id}/notification/unread")
    public ResponseEntity<String> setUnreadUserNotificationsAsRead(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.setUnreadUserNotificationsAsRead(id));
    }
}
