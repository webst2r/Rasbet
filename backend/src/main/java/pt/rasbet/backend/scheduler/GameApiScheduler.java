package pt.rasbet.backend.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.repository.JogoRepository;
import pt.rasbet.backend.repository.OpcaoApostaRepository;
import pt.rasbet.backend.service.GameApiService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class GameApiScheduler {

    private final GameApiService gameApiService;
    private final JogoRepository jogoRepository;

    private final OpcaoApostaRepository opcaoApostaRepository;

    @Scheduled(cron = "0 */15 * * * *", zone = "Europe/Lisbon")
    @Transactional
    public void updateJogos() {
        List<Jogo> jogos = gameApiService.getGames();

        jogos.forEach(jogo -> {
            Optional<Jogo> optionalJogo = jogoRepository.findByIdApi(jogo.getIdApi());
            if (optionalJogo.isPresent()) {
                updateJogo(optionalJogo.get(), jogo);
            } else {
                jogoRepository.save(jogo);
            }
        });

    }

    private void updateJogo(Jogo jogo, Jogo jogo1) {
        jogo1.setId(jogo.getId());
        jogo1.getOpcaoApostas().forEach(opcaoAposta -> {
            var opt = opcaoApostaRepository.findOpcaoApostaByJogo_IdAndType(jogo.getId(), opcaoAposta.getType());
            opt.ifPresent(aposta -> opcaoAposta.setId(aposta.getId()));
        });

        jogoRepository.save(jogo1);
    }

}