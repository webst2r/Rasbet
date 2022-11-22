package pt.rasbet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pt.rasbet.backend.dto.ApostaMultiplaDTO;
import pt.rasbet.backend.dto.CountMultiplasApostasUser;
import pt.rasbet.backend.service.ApostaMultiplaService;

import javax.validation.Valid;

@RepositoryRestController()
@RequiredArgsConstructor
@Validated
public class ApostaMultiplaController {

    private final ApostaMultiplaService apostaMultiplaService;

    @PostMapping("/apostaMultipla")
    public ResponseEntity<?> saveAlL(@RequestBody @Valid ApostaMultiplaDTO apostaMultiplaDTO){
        this.apostaMultiplaService.save(apostaMultiplaDTO);
        return ResponseEntity.ok("register");
    }
    @GetMapping("apostaMultipla/{id}/count")
    public ResponseEntity<CountMultiplasApostasUser> getApostasMultiplasCountByUser(@PathVariable("id") Long id){
        return ResponseEntity.ok(apostaMultiplaService.getApostasMultiplasCountByUser(id));
    }
}
