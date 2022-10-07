package ServerHttp;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.LinkedHashMap;
import java.util.Map;

import org.jboss.com.sun.net.httpserver.Headers;
import org.jboss.com.sun.net.httpserver.HttpContext;
import org.jboss.com.sun.net.httpserver.HttpExchange;
import org.jboss.com.sun.net.httpserver.HttpPrincipal;
import org.jboss.com.sun.net.httpserver.HttpServer;

import Config.Config;
import util.console;

public class ServerHttp {

    public static void Start(int puerto) {
        HttpServer server;
        try {
            console.log(console.ANSI_YELLOW,
                    "** Iniciando HTTP-SERVER " + Config.getJSON().getString("ss") + " en el puerto " + puerto + " **");
            server = HttpServer.create(new InetSocketAddress(puerto), 0);
            HttpContext context = server.createContext("/");
            HttpContext contextManejador = server.createContext("/manejador");

            contextManejador.setHandler(HandleRequestManejador::handle);
            context.setHandler(ServerHttp::handleRequest);
            server.start();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    private static void handleRequest(HttpExchange exchange) throws IOException {
        URI requestURI = exchange.getRequestURI();
        Map<String, String> parametros = splitQuery(requestURI.getQuery());
        String imgName = requestURI.getPath().substring(1);
        String type = parametros.get("type");

        File file = null;
        String key = "";
        switch (type) {
            case "getCi":
                key = parametros.get("key_usuario");
                file = getCi(file, imgName, key);
                break;
            case "getPerfil":
                key = parametros.get("key_usuario");
                file = getPerfil(file, imgName, key);
                break;
            case "publicidad":
                key = parametros.get("key");
                file = publicidad(file, imgName, key);
                break;
            case "pedido":
                key = parametros.get("key");
                file = pedido(file, imgName, key);
                break;
            case "paquete":
                key = parametros.get("key");
                file = paquete(file, imgName, key);
                break;
        }
        // System.out.println(type);
        // printRequestInfo(exchange);
        if (!file.exists()) {
            file = new File("./default.png");
        }
        String response = "This is the response at " + requestURI;
        exchange.sendResponseHeaders(200, file.length());
        OutputStream os = exchange.getResponseBody();
        Files.copy(file.toPath(), os);
        // os.write(response.getBytes());
        os.close();
    }

    public static Map<String, String> splitQuery(String query) throws UnsupportedEncodingException {
        Map<String, String> query_pairs = new LinkedHashMap<String, String>();

        String[] pairs = query.split("&");
        for (String pair : pairs) {
            int idx = pair.indexOf("=");
            query_pairs.put(URLDecoder.decode(pair.substring(0, idx), "UTF-8"),
                    URLDecoder.decode(pair.substring(idx + 1), "UTF-8"));
        }
        return query_pairs;
    }

    private static void printRequestInfo(HttpExchange exchange) {
        System.out.println("-- headers --");
        Headers requestHeaders = exchange.getRequestHeaders();
        requestHeaders.entrySet().forEach(System.out::println);

        System.out.println("-- principle --");
        HttpPrincipal principal = exchange.getPrincipal();
        System.out.println(principal);

        System.out.println("-- HTTP method --");
        String requestMethod = exchange.getRequestMethod();
        System.out.println(requestMethod);

        System.out.println("-- query --");
        URI requestURI = exchange.getRequestURI();
        String query = requestURI.getQuery();
        System.out.println(query);
    }

    private static File getCi(File file, String imgName, String key_usuario) throws IOException {
        String url = Config.getJSON("files").getString("url") + key_usuario + "/ci/" + imgName;
        return new File(url);
    }

    private static File getPerfil(File file, String imgName, String key_usuario) throws IOException {
        String url = Config.getJSON("files").getString("url") + key_usuario + "/perfil/" + imgName;
        return new File(url);
    }

    private static File publicidad(File file, String imgName, String key) throws IOException {
        String url = Config.getJSON("files").getString("url_publicidad") + key + "/" + imgName;
        return new File(url);
    }

    private static File pedido(File file, String imgName, String key) throws IOException {
        String url = Config.getJSON("files").getString("pedido") + key + "/" + imgName;
        return new File(url);
    }

    private static File paquete(File file, String imgName, String key) throws IOException {
        String url = Config.getJSON("files").getString("paquete") + key + "/" + imgName;
        return new File(url);
    }
}