package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.dto.CountApostasUserDTO;
import pt.rasbet.backend.dto.ListApostaDTO;
import pt.rasbet.backend.entity.*;
import pt.rasbet.backend.enumeration.EApostaEstado;
import pt.rasbet.backend.enumeration.ETRansationType;
import pt.rasbet.backend.exception.ResourceNotFoundException;
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
    public CountApostasUserDTO getApostasCountByUser(Long userId){
        return new CountApostasUserDTO(
                this.apostaRepository.countApostaByUser_IdAndAndEstado(userId,  EApostaEstado.WON.name()),
                this.apostaRepository.countApostaByUser_IdAndAndEstado(userId,  EApostaEstado.LOST.name())
        );
    }

    public Aposta save(Aposta aposta){
        return apostaRepository.save(aposta);
    }
    public List<Aposta> saveAll(List<Aposta> apostas){
        return apostaRepository.saveAll(apostas);
    }

    public Aposta findById(Long id) {
        return apostaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Aposta", "id", id));
    }

    @Transactional
    public void cancelAposta(Long id) {
        var aposta = findById(id);
        aposta.setEstado(EApostaEstado.CANCEL.name());
        aposta.setActiveNotification(false);
        save(aposta);
        var carteira = aposta.getUser().getCarteira();
        carteira.setSaldo(carteira.getSaldo() - aposta.getValor());
        carteiraRepository.save(carteira);
        var transaction =  new Transacoes(carteira, aposta.getValor(), "DEPOSIT", ETRansationType.BET.name());
        transacoesRepository.save(transaction);
    }
}
