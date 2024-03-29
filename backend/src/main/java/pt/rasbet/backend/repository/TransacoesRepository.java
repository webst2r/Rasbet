package pt.rasbet.backend.repository;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pt.rasbet.backend.entity.Transacoes;
import pt.rasbet.backend.entity.QTransacoes;
import pt.rasbet.backend.projection.TransacoesView;

@RepositoryRestResource(collectionResourceRel = "transacoes", path = "transacoes", excerptProjection = TransacoesView.class)
public interface TransacoesRepository extends JpaRepository<Transacoes, Long> , QuerydslPredicateExecutor<Transacoes>, QuerydslBinderCustomizer<QTransacoes> {

    @Override
    default void customize(QuerydslBindings bindings, QTransacoes qTransacoes) {
        // Make case-insensitive 'like' filter for all string properties
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }
}
