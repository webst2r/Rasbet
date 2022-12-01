package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.dto.OpcaoApostaDTO;
import pt.rasbet.backend.entity.OpcaoAposta;
import pt.rasbet.backend.exception.BadRequestException;
import pt.rasbet.backend.exception.ResourceNotFoundException;
import pt.rasbet.backend.repository.OpcaoApostaRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OpcaoApostaService {
    private final OpcaoApostaRepository opcaoApostaRepository;
    private final JogoService jogoService;

    public OpcaoAposta findById(Long id) {
        return opcaoApostaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("OpcaoAposta", "id", id));
    }

    @Transactional
    public String createOdds(Long idJogo, List<OpcaoApostaDTO> opcaoApostaDTOS) {
        var jogo = jogoService.findById(idJogo);
        if(jogo.getTipo().getEmpate() && opcaoApostaDTOS.size()!=3){
            throw new BadRequestException("Must have three odds");
        }
        if(!jogo.getTipo().getEmpate() && opcaoApostaDTOS.size() !=2){
            throw new BadRequestException("Must have two odds");
        }

        if (jogo.getOpcaoApostas().size() > 0) {
            updateOdds(jogo.getOpcaoApostas(), opcaoApostaDTOS);
        } else {
            List<OpcaoAposta> opcaoApostas = new ArrayList<>();
            opcaoApostaDTOS.forEach(opcaoApostaDTO -> {
                var op = opcaoApostaDTO.toEntity();
                op.setJogo(jogo);
                opcaoApostas.add(op);
            });
            opcaoApostaRepository.saveAll(opcaoApostas);
        }

        return "Odds created";
    }

    private void updateOdds(Set<OpcaoAposta> opcaoApostas, List<OpcaoApostaDTO> opcaoApostaDTOS) {
        opcaoApostaDTOS.forEach(opcaoApostaDTO -> {
            opcaoApostas.stream().filter(opcaoAposta -> opcaoAposta.getType().equals(opcaoApostaDTO.getType()))
                    .forEach(opcaoAposta -> {
                        opcaoAposta.setOdd(opcaoApostaDTO.getOdd());
                    });
        });
        opcaoApostaRepository.saveAll(opcaoApostas);
    }
}
