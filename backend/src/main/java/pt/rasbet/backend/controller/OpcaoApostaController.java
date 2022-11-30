package pt.rasbet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pt.rasbet.backend.dto.OpcaoApostaDTO;
import pt.rasbet.backend.entity.OpcaoAposta;
import pt.rasbet.backend.service.OpcaoApostaService;

import java.util.List;

@RepositoryRestController()
@RequiredArgsConstructor
@Validated
public class OpcaoApostaController {

    private final OpcaoApostaService opcaoApostaService;

    @PostMapping("opcaoAposta/add/{id}")
    public ResponseEntity<?> addOdds(@PathVariable("id") Long idJogo, @RequestBody List<OpcaoApostaDTO> opcaoApostaDTOS){
        return ResponseEntity.ok(opcaoApostaService.createOdds(idJogo, opcaoApostaDTOS));
    }
}
