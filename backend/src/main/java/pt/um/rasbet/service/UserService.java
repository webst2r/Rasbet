package pt.um.rasbet.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pt.um.rasbet.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
}
