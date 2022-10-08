public class Apostador extends Utilizador {
    private Carteira carteira;

    public Apostador(String username, String password) {
        super(username, password);
    }

    public Apostador(Apostador apostador) {
        super(apostador);
    }

    public Apostador clone() {
        return new Apostador(this);
    }
}
