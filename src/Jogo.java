public class Jogo {
    private Desporto desporto;

    public Jogo(Desporto desporto){
        this.desporto = desporto;
    }

    public Jogo(Jogo jogo){
        this.desporto = jogo.getDesporto();
    }

    public Desporto getDesporto() {
        return this.desporto;
    }

    public Jogo clone() {
        return new Jogo(this);
    }
}
