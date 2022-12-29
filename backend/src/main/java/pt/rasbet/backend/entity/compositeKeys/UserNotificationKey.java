package pt.rasbet.backend.entity.compositeKeys;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class UserNotificationKey implements Serializable {
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "notification_id")
    private Long notificationId;

    public UserNotificationKey (Long userId, Long notificationId){
        this.userId = userId;
        this.notificationId = notificationId;
    }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (!(o instanceof UserNotificationKey)) return false;
        UserNotificationKey that = (UserNotificationKey) o;
        return Objects.equals(userId, that.userId) && Objects.equals(notificationId, that.notificationId);

    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, notificationId);
    }
}
