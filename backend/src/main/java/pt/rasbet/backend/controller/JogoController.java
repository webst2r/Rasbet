package pt.rasbet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.validation.annotation.Validated;

@RepositoryRestController()
@RequiredArgsConstructor
@Validated
public class JogoController {
}
