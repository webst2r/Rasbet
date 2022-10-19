import java.util.List;

public class Desporto {
    private String nome;
    private int tipo; // individual -> 0 ou coletivo -> 1
    private boolean comEmpate;
    private List<Jogo> jogos;

    public Desporto(String nome, int tipo, boolean comEmpate){
        this.nome = nome;
        this.tipo = tipo;
        this.comEmpate = comEmpate;
    }

    public Desporto(Desporto d){
        this.nome = d.getNome();
        this.tipo = d.getTipo();
        this.comEmpate = d.getComEmpate();
    }

    public String getNome() {
        return this.nome;
    }

    public int getTipo() {
        return this.tipo;
    }

    public boolean getComEmpate(){
        return this.comEmpate;
    }

    public Desporto clone(){
        return new Desporto(this);
    }
}
