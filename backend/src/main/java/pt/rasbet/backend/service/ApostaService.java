package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.dto.CountApostasUserDTO;
import pt.rasbet.backend.dto.CountMultiplasApostasUser;
import pt.rasbet.backend.dto.ListApostaDTO;
import pt.rasbet.backend.entity.*;
import pt.rasbet.backend.enumeration.EApostaEstado;
import pt.rasbet.backend.enumeration.ETRansationType;
import pt.rasbet.backend.repository.ApostaRepository;
import pt.rasbet.backend.repository.CarteiraRepository;
import pt.rasbet.backend.repository.TransacoesRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class ApostaService {

    private final ApostaRepository apostaRepository;
    private final TransacoesRepository transacoesRepository;
    private final CarteiraRepository carteiraRepository;
    private final UserService userService;
    private final OpcaoApostaService opcaoApostaService;

    @Transactional
    public void saveBets(ListApostaDTO listApostaDTO){
        User user = this.userService.findById(listApostaDTO.getId());
        List<Aposta> apostas = new ArrayList<>();
        List<Transacoes> transacoesList = new ArrayList<>();
        AtomicReference<Float> total = new AtomicReference<>(0f);
        listApostaDTO.getApostas().forEach(apostaDTO -> {
            OpcaoAposta opcaoAposta =this.opcaoApostaService.findById(apostaDTO.getOddId());
            Aposta aposta = new Aposta();
            aposta.setOpcaoAposta(opcaoAposta);
            aposta.setValorOdd(opcaoAposta.getOdd());
            aposta.setValor(apostaDTO.getValor());
            aposta.setUser(user);
            aposta.setEstado(EApostaEstado.PLACED.name());
            apostas.add(aposta);
            total.updateAndGet(v -> (float) (v + aposta.getValor()));
            transacoesList.add(createTransaction(user, aposta.getValor()));
        });
        apostaRepository.saveAll(apostas);
        transacoesRepository.saveAll(transacoesList);
        user.getCarteira().setSaldo(user.getCarteira().getSaldo() - total.get());
        carteiraRepository.save(user.getCarteira());
    }


    public Transacoes createTransaction(User user, Float value){
        return new Transacoes(user.getCarteira(), value, "RAISE", ETRansationType.BET.name());
    }

    public List<Aposta> getApostasTerminated(Jogo jogo){
        return this.apostaRepository.findApostaByOpcaoAposta_JogoAndEstado(jogo, EApostaEstado.PLACED.name());
    }

    public List<Aposta> getApostasMultipleTerminated(Jogo jogo){
        return this.apostaRepository.findApostaByOpcaoAposta_JogoAndEstado(jogo, EApostaEstado.MULTIPLE.name());
    }

    @Transactional
    public void updateApostas(Jogo jogo) {
        List<Aposta> apostas = this.getApostasTerminated(jogo);
        apostas.forEach(aposta -> {
            if(aposta.getOpcaoAposta().getType().equals(jogo.getVencedor())){
                float valor = aposta.getValor() * aposta.getValorOdd();
                aposta.setValorGanho(valor);
                aposta.setEstado(EApostaEstado.WON.name());
                apostaRepository.save(aposta);
                Carteira carteira = aposta.getUser().getCarteira();
                carteira.setSaldo(carteira.getSaldo() + valor);
                carteiraRepository.save(carteira);
                transacoesRepository.save(new Transacoes(carteira, valor, "DEPOSIT", ETRansationType.BET.name()));
            }else {
                aposta.setEstado(EApostaEstado.LOST.name());
                apostaRepository.save(aposta);
            }
        });
    }

    @Transactional
    public void updateApostasMultiplas(Jogo jogo){
        List<Aposta> apostas = this.getApostasMultipleTerminated(jogo);
        apostas.forEach(aposta -> {
            if(aposta.getOpcaoAposta().getType().equals(jogo.getVencedor())){
                aposta.setEstado(EApostaEstado.WON.name());
            }else {
                aposta.setEstado(EApostaEstado.LOST.name());
            }
            apostaRepository.save(aposta);
        });

    }

    @Transactional
    public CountApostasUserDTO getApostasCountByUser(Long userId){
        return new CountApostasUserDTO(
                this.apostaRepository.countApostaByUser_IdAndAndEstado(userId,  EApostaEstado.WON.name()),
                this.apostaRepository.countApostaByUser_IdAndAndEstado(userId,  EApostaEstado.LOST.name())
        );
    }
}
