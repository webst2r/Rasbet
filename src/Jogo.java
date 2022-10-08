import java.util.ArrayList;
import java.util.List;

public class Jogo {
    private int id;
    private String modalidade;
    private String ladoA;
    private String ladoB;
    private List<Resultado> resultadosDisponiveis;
    private Resultado resultadoFinal;


    public Jogo(int id,String modalidade, String ladoA, String ladoB, List<Resultado> resultados, Resultado resultadoFinal){
        this.id = id;
        this.modalidade = modalidade;
        this.ladoA = ladoA;
        this.ladoB = ladoB;
        this.resultadosDisponiveis = resultados;
        this.resultadoFinal = resultadoFinal;
    }

    public Jogo(Jogo jogo){
        this.id = jogo.getId();
        this.modalidade = jogo.getModalidade();
        this.ladoA = jogo.getLadoA();
        this.ladoB = jogo.getLadoB();
        this.resultadosDisponiveis = jogo.getResultadosDisponiveis();
        this.resultadoFinal = jogo.getResultadoFinal();
    }

    public int getId() {
        return this.id;
    }

    public String getModalidade() {
        return this.modalidade;
    }

    public String getLadoA() {
        return this.ladoA;
    }

    public String getLadoB() {
        return this.ladoB;
    }

    public List<Resultado> getResultadosDisponiveis() {
        List<Resultado> results = new ArrayList<>();
        for(Resultado r : this.resultadosDisponiveis){
            results.add(r.clone());
        }
        return results;
    }

    public Resultado getResultadoFinal() {
        return this.resultadoFinal.clone();
    }

    public Jogo clone() {
        return new Jogo(this);
    }
}
