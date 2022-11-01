package pt.rasbet.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pt.rasbet.backend.entity.OpcaoAposta;
import pt.rasbet.backend.exception.ResourceNotFoundException;
import pt.rasbet.backend.repository.OpcaoApostaRepository;

@Service
@RequiredArgsConstructor
public class OpcaoApostaService {
    private final OpcaoApostaRepository opcaoApostaRepository;

    public OpcaoAposta findById(Long id) {
        return opcaoApostaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("OpcaoAposta", "id", id));
    }
}
