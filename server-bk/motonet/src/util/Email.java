package util;

import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.json.JSONException;
import org.json.JSONObject;

public class Email extends Thread {

    /*
     * asunto para pass
     */
    private JSONObject data;

    public Email(JSONObject data) {
        this.data = data;
    }

    @Override
    public void run() {
        try {
            Properties props = new Properties();
            // Nombre del host de correo, es smtp.gmail.com
            props.setProperty("mail.smtp.host", "smtp.gmail.com");
            // TLS si está disponible
            // props.setProperty("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.ssl.enable", "true");
            // Puerto de gmail para envio de correos
            props.setProperty("mail.smtp.port", "465");
            // Nombre del usuario
            props.setProperty("mail.smtp.user", "servisofts.srl@gmail.com");
            // Si requiere o no usuario y password para conectarse.
            props.setProperty("mail.smtp.auth", "true");

            Session session = Session.getDefaultInstance(props);
            // session.setDebug(true);

            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("servisofts.srl@gmail.com"));
            // message.addRecipient(Message.RecipientType.TO, new
            // InternetAddress(data.getString("E")));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(data.getString("E")));
            message.setSubject("prueba ");
            message.setContent(getHtml(data), "text/html");

            Transport t = session.getTransport("smtp");
            t.connect("servisofts.srl@gmail.com", "servisofts123.");
            t.sendMessage(message, message.getAllRecipients());
            t.close();
        } catch (Exception ex) {
            Logger.getLogger(Email.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void main(String args[]) throws JSONException {

    }

    private static String getHtml1() {
        return "<h1>HOla mundo</h1>";
    }

    private static String getHtml(JSONObject data) throws JSONException {
        String cuerpo = "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Document</title><link href='https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap' rel='stylesheet'><style>body {background: rgb(0, 0, 0);background: linear-gradient(145deg, rgba(0, 0, 0, 1) 70%, rgba(102, 102, 102, 1) 100%);color: #fff;height: 100%;}p {color: #fff;font-family: 'Patrick Hand', cursive;}</style></head>"
        +"<body>"
        +"<div style='background: rgb(0, 0, 0);background: linear-gradient(145deg, rgba(0, 0, 0, 1) 70%, rgba(102, 102, 102, 1) 100%);color: #fff;height: 100%;>"
        +"<p style='font-size: 30px; text-align: center;'>Servisofts.com</p>"
        +"<div><div style='margin:10px;display:inline-block;width: 60%;height: 170px;border-radius: 50px;padding: 10px;text-align: end;background-color: #ffffff44;'>"
        +"<p style='font-size: 20px;''>Bienvenido a Servisofts SRL</p>"
        +"<p style='font-size: 15px;  color: #999;'>"
        +"Servisofts SRL. Somos una empresa dedicada a al diseño, desarrollo, administracion, de software."
        +"</p>"
        +"<p style='font-size: 15px; text-align: start;  color: #999;'>"
        +"Servisofts SRL. Somos una empresa dedicada a al diseño, desarrollo, administracion, de software."
        +"</p>"
        +"</div>"
        +"<div style='margin:10px; display:inline-block; width: 60%; height: 170px; border-radius: 50px; background-color: #ffffff44; position: relative; padding: 10px; margin-left: 35%;'>"
        +"<p style='font-size: 20px;'>Renovacion de certificado.</p>"
        +"<p style='font-size: 15px; color: #999;'>"
        +"El servicio OU solicito una renovacion de certificado. Porfavor registre el siguiente adjunto en la terminal Servicio.Servisofts para permitir al servicio continuar operaciones."
        +"</p>"
        +"</div>"
        +"<div style='margin:10px; display:inline-block; width: 80%; border-radius: 50px; position: relative; padding: 10px; margin-left: 10%;'>"
        +"<p style='font-size: 20px; text-align: center;'>PEM.</p>"
        +"<p style='font-size: 15px; color: #999; overflow: auto;     word-break: break-word;'>"
        +"<img width='100%' src='data:image/png;base64, "+data.getString("cert")+"' />"
        +"</p>"
        +"</div>"
        +"</div>"
        +"</div>"
        +"</body>"
        +"</html>";
        return cuerpo;
    }
}
