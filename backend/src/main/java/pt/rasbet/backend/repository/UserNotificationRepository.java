package pt.rasbet.backend.repository;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pt.rasbet.backend.entity.QUserNotification;
import pt.rasbet.backend.entity.UserNotification;
import pt.rasbet.backend.entity.compositeKeys.UserNotificationKey;
import pt.rasbet.backend.projection.UserNotificationView;

import javax.transaction.Transactional;

@RepositoryRestResource(collectionResourceRel = "userNotification", path = "userNotification", excerptProjection = UserNotificationView.class)
public interface UserNotificationRepository extends JpaRepository<UserNotification, UserNotificationKey>, QuerydslPredicateExecutor<UserNotification>, QuerydslBinderCustomizer<QUserNotification> {
    @Override
    default void customize(QuerydslBindings bindings, QUserNotification qUserNotification) {
        // Make case-insensitive 'like' filter for all string properties
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }
    Long countAllByUserIdAndReadIsFalse(Long userId);

    @Transactional
    @Modifying
    @Query("update UserNotification u set u.read = true where u.id.userId = :userId and u.read = false ")
    void updatetoReadByUserId(Long userId);
}
