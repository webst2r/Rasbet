package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.dto.JogoDTO;
import pt.rasbet.backend.dto.JogoResultDTO;
import pt.rasbet.backend.dto.JogosPageDTO;
import pt.rasbet.backend.dto.PageDTO;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.enumeration.EJogoEstado;
import pt.rasbet.backend.event.common.CancelJogoEvent;
import pt.rasbet.backend.event.common.UpdateApostasEvent;
import pt.rasbet.backend.exception.BadRequestException;
import pt.rasbet.backend.exception.ResourceNotFoundException;
import pt.rasbet.backend.repository.JogoRepository;
import pt.rasbet.backend.repository.TipoRepository;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class JogoService {

    private final JogoRepository jogoRepository;
    private final TipoRepository tipoRepository;

    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public Jogo createGame(JogoDTO jogoDTO) {
        var tipo = this.tipoRepository.findById(jogoDTO.getIdTipo()).orElseThrow(() -> new ResourceNotFoundException("Tipo", "id", jogoDTO.getIdTipo()));

        var game = jogoDTO.toEntity();
        game.setTipo(tipo);
        game.setComplete(false);
        game.setState(EJogoEstado.NO_ODDS.name());
        return save(game);
    }

    @Transactional
    public String addResult(JogoResultDTO jogoResultDTO, Long id) {
        var game = this.findById(id);

        game.setVencedor(jogoResultDTO.getVencedor());
        game.setResultado(jogoResultDTO.getResultado());
        game.setComplete(true);
        game.setState(EJogoEstado.FINISH.name());
        game = save(game);
        //TODO - test
        eventPublisher.publishEvent(UpdateApostasEvent.of(game));
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
        save(game);
        return "saved;";
    }

    public JogosPageDTO getGamesToBet(Pageable pageable) {
        var gamesView = this.jogoRepository.getAll(pageable);

        PageDTO pageDTO = new PageDTO(gamesView.getSize(),
                gamesView.getTotalElements(),
                gamesView.getTotalPages(),
                gamesView.getNumber());
        return new JogosPageDTO(pageDTO, gamesView.getContent());
    }

    @Transactional
    public String cancel(Long id) {
        Jogo jogo = findById(id);
//        TODO: test
        if (jogo.getComplete()) {
            throw new BadRequestException("Game already ended");
        }
        jogo.setState(EJogoEstado.CANCEL.name());
        jogo = save(jogo);
        eventPublisher.publishEvent(CancelJogoEvent.of(jogo));
        return "cancel successfull";
    }

    public Jogo save(Jogo jogo){
        return this.jogoRepository.save(jogo);
    }

    public JogosPageDTO getGamesForOdds(Pageable pageable) {
        var gamesView = this.jogoRepository.getAllGamesToOdd(EJogoEstado.CANCEL.name(), EJogoEstado.FINISH.name(),pageable);

        PageDTO pageDTO = new PageDTO(gamesView.getSize(),
                gamesView.getTotalElements(),
                gamesView.getTotalPages(),
                gamesView.getNumber());
        return new JogosPageDTO(pageDTO, gamesView.getContent());
    }
}
