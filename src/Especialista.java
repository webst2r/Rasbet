public class Especialista extends Utilizador{

    public Especialista(String username, String password) {
        super(username, password);
    }

    public Especialista(Especialista especialista) {
        super(especialista);
    }

    public Especialista clone() {
        return new Especialista(this);
    }
}
