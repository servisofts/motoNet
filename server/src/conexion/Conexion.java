package conexion;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Savepoint;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONArray;
import org.json.JSONObject;

import util.console;

public class Conexion {

    private static Connection con;
    private static String ip;
    private static String puerto;
    private static String usuario;
    private static String contrasena;
    private static String bd_name;
    private static String ruta_pg_dump;
    private static String ruta_pg_restore;

    public static Connection getConexion() {
        return conectar();
    }

    public static Connection setConexion(JSONObject data_base) {
        ip = data_base.getString("ip");
        bd_name = data_base.getString("bd_name");
        puerto = data_base.getInt("puerto") + "";
        usuario = data_base.getString("user");
        contrasena = data_base.getString("pass");
        ruta_pg_dump = data_base.getString("pg_dump");
        ruta_pg_restore = data_base.getString("pg_restore");
        return conectar();

    }

    private static Connection conectar() {
        try {
            Class.forName("org.postgresql.Driver");
            try {
                if (con != null) {
                    if (!con.isClosed()) {
                        return con;
                    }
                }
                console.log(console.ANSI_YELLOW, "Conectando a la base de datos...");
                System.out.println();
                con = DriverManager.getConnection("jdbc:postgresql://" + ip + ":" + puerto + "/" + bd_name, usuario,
                        contrasena);
                console.log(console.ANSI_YELLOW, "Conexion exitosa postgres");
                return con;
            } catch (SQLException e) {
                // restore_backup();
                console.log(console.ANSI_YELLOW, "Base de datos restaurada exitosamente");
            }
            return con;
        } catch (Exception e) {
            console.log(console.ANSI_YELLOW, "Error en la conexion: " + e.getLocalizedMessage());
            return null;
        }
    }

    public static void Transacction() {
        try {
            if (con.getAutoCommit()) {
                con.setAutoCommit(false);
            }
        } catch (SQLException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void Transacction_end() {
        try {
            if (!con.getAutoCommit())
                con.setAutoCommit(true);
        } catch (SQLException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void commit() {
        try {
            con.commit();
        } catch (SQLException ex) {
            // Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void rollback() {
        try {
            con.rollback();
        } catch (SQLException ex) {
            // Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void rollback(Savepoint savepoint) {
        try {
            con.rollback(savepoint);
        } catch (SQLException ex) {
            Logger.getLogger(Conexion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static PreparedStatement preparedStatement(String query) throws SQLException {
        return getConexion().prepareStatement(query);
    }

    public static void insertObject(String nombre_tabla, JSONObject json) throws SQLException {
        insertArray(nombre_tabla, new JSONArray().put(json));
    }

    public static void insertArray(String nombre_tabla, JSONArray json) throws SQLException {
        String funct = "insert into " + nombre_tabla + " (select * from json_populate_recordset(null::" + nombre_tabla
                + ", '" + json.toString() + "')) RETURNING key";
        PreparedStatement ps = con.prepareStatement(funct);
        ps.executeQuery();
    }

    public static JSONArray ejecutarConsultaArray(String consulta) throws SQLException {
        PreparedStatement ps = getConexion().prepareStatement(consulta);
        ResultSet rs = ps.executeQuery();
        JSONArray arr = new JSONArray();
        if (rs.next()) {
            arr = rs.getString("json") == null ? new JSONArray() : new JSONArray(rs.getString("json"));
        }
        rs.close();
        ps.close();
        return arr;
    }

    public static int ejecutarConsultaInt(String consulta) throws SQLException {
        PreparedStatement ps = getConexion().prepareStatement(consulta);
        ResultSet rs = ps.executeQuery();
        int resp = 0;
        if (rs.next()) {
            resp = rs.getInt(1);
        }
        rs.close();
        ps.close();
        return resp;
    }

    public static void ejecutar(String consulta) {
        try {
            PreparedStatement ps = con.prepareStatement(consulta);
            ps.executeQuery();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void ejecutarUpdate(String consulta) {
        try {
            PreparedStatement ps = con.prepareStatement(consulta);
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static JSONObject ejecutarConsultaObject(String consulta) throws SQLException {
        PreparedStatement ps = getConexion().prepareStatement(consulta);
        ResultSet rs = ps.executeQuery();
        JSONObject obj = new JSONObject();
        if (rs.next()) {
            obj = rs.getString("json") != null ? new JSONObject(rs.getString("json")) : new JSONObject();
        }
        rs.close();
        ps.close();
        return obj;
    }

    public static JSONObject ejecutarFuncionObject(String consulta) throws SQLException {
        PreparedStatement ps = getConexion().prepareStatement(consulta);
        ResultSet rs = ps.executeQuery();
        JSONObject obj = new JSONObject();
        if (rs.next()) {
            obj = rs.getString("json") != null ? new JSONObject(rs.getString("json")) : new JSONObject();
        }
        rs.close();
        ps.close();
        return obj;
    }

    public static boolean save_backup() {
        boolean hecho = false;
        Process proceso;
        ProcessBuilder constructor;
        String path = new File(".").getAbsolutePath();
        path = path.substring(0, path.length() - 1);
        path += bd_name;
        // C:\Program Files\PostgreSQL\12\bin
        try {
            console.log(console.ANSI_YELLOW, "Guardando backup en " + path);
            System.out.println();
            File pgdump = new File(ruta_pg_dump);
            if (pgdump.exists()) {
                if (!path.equalsIgnoreCase("")) {
                    constructor = new ProcessBuilder(ruta_pg_dump, "--verbose", "--format", "custom", "-f", path);
                } else {
                    constructor = new ProcessBuilder(ruta_pg_dump, "--verbose", "--inserts", "--column-inserts", "-f",
                            path);
                    System.out.println("ERROR");
                }
                constructor.environment().put("PGHOST", ip);
                constructor.environment().put("PGPORT", puerto);
                constructor.environment().put("PGUSER", usuario);
                constructor.environment().put("PGPASSWORD", contrasena);
                constructor.environment().put("PGDATABASE", bd_name);
                constructor.redirectErrorStream(true);
                proceso = constructor.start();
                System.out.println(proceso);
                System.out.println("terminado backup " + path);
                hecho = true;
            } else {
                System.out.println("Error en la ruta del pg_dump ingrese nuevamente");
                hecho = false;
            }
        } catch (Exception ex) {
            System.err.println(ex.getMessage() + "Error de backup");
            hecho = false;
        }
        return hecho;
    }

    public static boolean restore_backup() {
        boolean hecho = false;
        Process proceso;
        ProcessBuilder constructor;
        String path = new File(".").getAbsolutePath();
        path = path.substring(0, path.length() - 1);
        path += bd_name;
        try {
            System.out.println("Restaurando Base de datos desde " + path + " ");
            File pgrestore = new File(ruta_pg_restore);
            if (pgrestore.exists()) {
                constructor = new ProcessBuilder(ruta_pg_restore, "-h", ip, "-p", puerto, "-U", usuario, "-C", "-d",
                        "postgres", "-v", path);
                constructor.environment().put("PGPASSWORD", contrasena);
                constructor.redirectErrorStream(true);
                proceso = constructor.start();
                System.out.println(proceso);
                proceso.destroy();
                hecho = true;
            } else {
                System.out.println("Error en la ruta del pg_dump ingrese nuevamente");
                hecho = false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            hecho = false;
        }
        return hecho;
    }

    public static void setContrasena(String contrasena) {
        Conexion.contrasena = contrasena;
    }

    public static void setPuerto(String puerto) {
        Conexion.puerto = puerto;
    }

    public static void setIp(String ip) {
        Conexion.ip = ip;
    }

    public static void setUsuario(String usuario) {
        Conexion.usuario = usuario;
    }

    public static void setBd_name(String bd_name) {
        Conexion.bd_name = bd_name;
    }

    public static void setRuta_pg_dump(String ruta_pg_dump) {
        Conexion.ruta_pg_dump = ruta_pg_dump;
    }

    public static void setRuta_pg_restore(String ruta_pg_restore) {
        Conexion.ruta_pg_restore = ruta_pg_restore;
    }

}