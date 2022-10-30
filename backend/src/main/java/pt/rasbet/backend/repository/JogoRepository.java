package pt.rasbet.backend.repository;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.entity.QJogo;
import pt.rasbet.backend.projection.JogoView;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "jogo", path = "jogo",  excerptProjection = JogoView.class)
public interface JogoRepository extends JpaRepository<Jogo, Long>, QuerydslPredicateExecutor<Jogo>, QuerydslBinderCustomizer<QJogo> {

    @Override
    default void customize(QuerydslBindings bindings, QJogo qJogo) {
        // Make case-insensitive 'like' filter for all string properties
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    Optional<Jogo> findByIdApi(String idApi);
}
