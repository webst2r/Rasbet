package pt.um.rasbet.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import pt.um.rasbet.service.UserService;

@RepositoryRestController()
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
}
