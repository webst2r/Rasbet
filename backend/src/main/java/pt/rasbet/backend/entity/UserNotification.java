package pt.rasbet.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.rasbet.backend.entity.compositeKeys.UserNotificationKey;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "userNotification")
@NoArgsConstructor
@AllArgsConstructor
public class UserNotification {

    @EmbeddedId
    private UserNotificationKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @MapsId("notificationId")
    @JoinColumn(name = "notificationId")
    private Notificacao notification;

    @Column(name="isRead")
    private Boolean read;

    public UserNotification (UserNotificationKey userNotificationKey, User user, Notificacao notification){
        this.id = userNotificationKey;
        this.user = user;
        this.notification =  notification;
        this.read = false;
    }
}
