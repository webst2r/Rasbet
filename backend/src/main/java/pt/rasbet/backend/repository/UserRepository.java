package pt.rasbet.backend.repository;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pt.rasbet.backend.entity.ApostasMultiplas;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.entity.QUser;
import pt.rasbet.backend.entity.User;

import java.util.List;
import java.util.Optional;
@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserRepository extends JpaRepository<User, Long>, QuerydslPredicateExecutor<User>, QuerydslBinderCustomizer<QUser> {
    @Override
    default void customize(QuerydslBindings bindings, QUser qUser) {
        // Make case-insensitive 'like' filter for all string properties
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("select u from User u " +
            "join u.apostasMultiplas as a " +
            "join a.apostas as aposta " +
            "join aposta.opcaoAposta as op " +
            "join op.jogo as j where j = :jogo and a.activeNotification = true")
    List<User> findApostasMultiplasByJogos(Jogo jogo);

    @Query("select u from User u " +
            "join u.apostas as aposta " +
            "join aposta.opcaoAposta as op " +
            "join op.jogo as j where j = :jogo and aposta.activeNotification = true and aposta.estado <> 'MULTIPLE'")
    List<User> findApostasByJogos(Jogo jogo);
}
