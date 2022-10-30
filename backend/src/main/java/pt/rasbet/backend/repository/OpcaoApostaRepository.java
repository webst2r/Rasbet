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
import pt.rasbet.backend.entity.OpcaoAposta;
import pt.rasbet.backend.entity.QOpcaoAposta;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "opcaoAposta", path = "opcaoAposta")
public interface OpcaoApostaRepository extends JpaRepository<OpcaoAposta, Long>, QuerydslPredicateExecutor<OpcaoAposta>, QuerydslBinderCustomizer<QOpcaoAposta> {

    @Override
    default void customize(QuerydslBindings bindings, QOpcaoAposta qOpcaoAposta) {
        // Make case-insensitive 'like' filter for all string properties
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    Optional<OpcaoAposta> findOpcaoApostaByJogo_IdAndType(Long id_jogo, String type);
}
