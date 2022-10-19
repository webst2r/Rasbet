public class Administrador extends Utilizador{
    public Administrador(String username, String password) {
        super(username, password);
    }

    public Administrador(Administrador administrador) {
        super(administrador);
    }

    public Administrador clone() {
        return new Administrador(this);
    }
}
