package pt.rasbet.backend.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import pt.rasbet.backend.entity.*;
import pt.rasbet.backend.entity.compositeKeys.UserNotificationKey;
import pt.rasbet.backend.enumeration.EApostaEstado;
import pt.rasbet.backend.enumeration.ENotificationTypeEnum;
import pt.rasbet.backend.enumeration.ETRansationType;
import pt.rasbet.backend.repository.*;
import pt.rasbet.backend.service.ApostaMultiplaService;
import pt.rasbet.backend.service.ApostaService;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Component
@RequiredArgsConstructor
@Log4j2
public class NotificationExecutor {

    private final NotificacaoRepository notificacaoRepository;
    private final UserNotificationRepository userNotificationRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createNotifications(List<Notificacao> notificacoes) {
        var userNotifications = new HashSet<UserNotification>();
        notificacoes.forEach(notificacao -> {
            var usersToSend = new HashSet<User>();
            switch (notificacao.getType()) {
                case ODDS_CHANGED -> {
                    usersToSend.addAll(notificacao.getJogo().getUsers());
                    usersToSend.addAll(userRepository.findApostasByJogos(notificacao.getJogo()));
                    usersToSend.addAll(userRepository.findApostasMultiplasByJogos(notificacao.getJogo()));
                }
                case FINISHED_GAME, CANCEL_GAME -> usersToSend.addAll(notificacao.getJogo().getUsers());
                case CANCEL_MULTIPLE_BET, UPDATE_MULTIPLE_BET, LOST_MULTIPLE_BET, WON_MULTIPLE_BET -> {
                    if (Boolean.TRUE.equals(notificacao.getApostasMultiplas().getActiveNotification())) {
                        usersToSend.add(notificacao.getApostasMultiplas().getUser());
                    }
                }
                case WON_BET, LOST_BET, CANCEL_BET -> {
                    if (Boolean.TRUE.equals(notificacao.getAposta().getActiveNotification())) {
                        usersToSend.add(notificacao.getAposta().getUser());
                    }
                }
            }

            notificacao = notificacaoRepository.save(notificacao);
            userNotifications.addAll(createUserNotifications(notificacao, usersToSend));
        });

        userNotificationRepository.saveAll(userNotifications);

    }

    private Set<UserNotification> createUserNotifications(Notificacao notificacao, Set<User> users){
        var userNotifications = new HashSet<UserNotification>();
        users.forEach(user -> userNotifications.add(new UserNotification(new UserNotificationKey(user.getId(), notificacao.getId()), user, notificacao)));
        return userNotifications;
    }

}
