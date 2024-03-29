package pt.rasbet.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pt.rasbet.backend.dto.JogoDTO;
import pt.rasbet.backend.dto.JogoResultDTO;
import pt.rasbet.backend.dto.JogosPageDTO;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.service.JogoService;

import javax.validation.Valid;

@RepositoryRestController()
@RequiredArgsConstructor
@Validated
public class JogoController {

    private final JogoService jogoService;

    @PostMapping("jogo/create")
    public ResponseEntity<Jogo> createGame(@RequestBody @Valid JogoDTO jogoDTO){
        return ResponseEntity.ok(jogoService.createGame(jogoDTO));
    }

    @PostMapping("jogo/{id}/edit")
    public ResponseEntity<String> editGame(@RequestBody @Valid JogoDTO jogoDTO, @PathVariable("id") Long id){
        return ResponseEntity.ok(jogoService.editGame(id, jogoDTO));
    }

    @PostMapping("jogo/{id}/result")
    public ResponseEntity<String> addResult(@RequestBody @Valid JogoResultDTO jogoResultDTO, @PathVariable("id") Long id){
        return ResponseEntity.ok(jogoService.addResult(jogoResultDTO,id));
    }

    @PostMapping("jogo/{id}/cancel")
    public ResponseEntity<String> cancel(@PathVariable("id") Long id){
        return ResponseEntity.ok(jogoService.cancel(id));
    }

    @GetMapping("jogo/betGames")
    public ResponseEntity<JogosPageDTO> getGamesToBet(Pageable pageable){
        return ResponseEntity.ok(this.jogoService.getGamesToBet(pageable));
    }

    @GetMapping("jogo/oddGames")
    public ResponseEntity<JogosPageDTO> getGamesForOdds(Pageable pageable){
        return ResponseEntity.ok(this.jogoService.getGamesForOdds(pageable));
    }
}
