package pt.rasbet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pt.rasbet.backend.dto.CountApostasUserDTO;
import pt.rasbet.backend.dto.CountMultiplasApostasUser;
import pt.rasbet.backend.dto.ListApostaDTO;
import pt.rasbet.backend.service.ApostaService;

import javax.validation.Valid;

@RepositoryRestController()
@RequiredArgsConstructor
@Validated
public class ApostaController {

    private final ApostaService apostaService;

    @PostMapping("/aposta/all")
    public ResponseEntity<?> saveAlL(@RequestBody @Valid ListApostaDTO listApostaDTO){
        this.apostaService.saveBets(listApostaDTO);
        return ResponseEntity.ok("register");
    }

    @GetMapping("aposta/{id}/count")
    public ResponseEntity<CountApostasUserDTO> getApostasCountByUser(@PathVariable("id") Long id){
        return ResponseEntity.ok(apostaService.getApostasCountByUser(id));
    }

    @PostMapping("aposta/{id}/cancel")
    public ResponseEntity<String> cancelAposta(@PathVariable("id") Long id){
        apostaService.cancelAposta(id);
        return ResponseEntity.ok("cancel");
    }
}
