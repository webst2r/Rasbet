package pt.rasbet.backend.repository;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pt.rasbet.backend.entity.Carteira;
import pt.rasbet.backend.entity.Notificacao;
import pt.rasbet.backend.entity.QNotificacao;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "notificacao", path = "notificacao")
public interface NotificacaoRepository extends JpaRepository<Notificacao, Long>, QuerydslPredicateExecutor<Notificacao>, QuerydslBinderCustomizer<QNotificacao> {

    @Override
    default void customize(QuerydslBindings bindings, QNotificacao qCarteira) {
        // Make case-insensitive 'like' filter for all string properties
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }


    List<Notificacao> findAllByIdIn(List<Long> id);
}
