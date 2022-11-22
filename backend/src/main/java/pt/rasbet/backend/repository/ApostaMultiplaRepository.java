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
import pt.rasbet.backend.entity.QApostasMultiplas;
import pt.rasbet.backend.projection.ApostaMultiplaView;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "apostaMultipla", path = "apostaMultipla", excerptProjection = ApostaMultiplaView.class)
public interface ApostaMultiplaRepository extends JpaRepository<ApostasMultiplas, Long>, QuerydslPredicateExecutor<ApostasMultiplas>, QuerydslBinderCustomizer<QApostasMultiplas> {

    @Override
    default void customize(QuerydslBindings bindings, QApostasMultiplas qApostasMultiplas) {
        // Make case-insensitive 'like' filter for all string properties
        bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
    }

    @Query("select a from ApostasMultiplas a " +
            "join a.apostas as aposta " +
            "join aposta.opcaoAposta as op " +
            "join op.jogo as j where j = :jogo and a.estado = :eApostaEstado")
    List<ApostasMultiplas> findApostasMultiplasByJogos(Jogo jogo, String eApostaEstado);

    Long countApostasMultiplasByUser_IdAndAndEstado(Long idUser, String estado);
}
