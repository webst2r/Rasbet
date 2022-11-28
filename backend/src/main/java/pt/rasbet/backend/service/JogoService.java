package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.dto.JogoDTO;
import pt.rasbet.backend.dto.JogoResultDTO;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.entity.User;
import pt.rasbet.backend.exception.ResourceNotFoundException;
import pt.rasbet.backend.repository.JogoRepository;
import pt.rasbet.backend.repository.TipoRepository;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class JogoService {

    private final JogoRepository jogoRepository;
    private final TipoRepository tipoRepository;

    @Transactional
    public Jogo createGame(JogoDTO jogoDTO) {
        var tipo = this.tipoRepository.findById(jogoDTO.getIdTipo()).orElseThrow(() -> new ResourceNotFoundException("Tipo", "id", jogoDTO.getIdTipo()));

        var game = jogoDTO.toEntity();
        game.setTipo(tipo);
        game.setComplete(false);

        return jogoRepository.save(game);
    }

    @Transactional
    public String addResult(JogoResultDTO jogoResultDTO, Long id) {
        var game = this.findById(id);

        game.setVencedor(jogoResultDTO.getVencedor());
        game.setResultado(jogoResultDTO.getResultado());
        game.setComplete(true);
        jogoRepository.save(game);
        return "saved";
    }

    public Jogo findById(Long id) {
        return jogoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Jogo", "id", id));
    }

    @Transactional
    public String editGame(Long id, JogoDTO jogoDTO) {
        var game = this.findById(id);
        var tipo = this.tipoRepository.findById(jogoDTO.getIdTipo()).orElseThrow(() -> new ResourceNotFoundException("Tipo", "id", jogoDTO.getIdTipo()));

        game.setHomeTeam(jogoDTO.getHomeTeam());
        game.setAwayTeam(jogoDTO.getAwayTeam());
        game.setDate(jogoDTO.getDate());
        game.setTipo(tipo);
        return "saved;";
    }
}
