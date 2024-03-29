package pt.rasbet.backend.repository;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pt.rasbet.backend.entity.Aposta;
import pt.rasbet.backend.entity.Jogo;
import pt.rasbet.backend.entity.QAposta;
import pt.rasbet.backend.projection.ApostaView;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "aposta", path = "aposta",  excerptProjection = ApostaView.class)
public interface ApostaRepository extends JpaRepository<Aposta, Long>, QuerydslPredicateExecutor<Aposta>, QuerydslBinderCustomizer<QAposta> {

    @Override
    default void customize(QuerydslBindings bindings, QAposta qAposta) {
        // Make case-insensitive 'like' filter for all string properties
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    List<Aposta> findApostaByOpcaoAposta_JogoAndEstado(Jogo jogo, String eApostaEstado);

    Long countApostaByUser_IdAndAndEstado(Long idUser, String estado);
}
