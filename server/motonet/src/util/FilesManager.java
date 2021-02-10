package util;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.awt.RenderingHints;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermissions;

import javax.imageio.ImageIO;

import Config.Config;

public class FilesManager {
    public static String guardar_file(String url, String nombre) throws IOException {
        int dbs = 2048;
        String arr[] = url.split("/");
        String rootPath = Config.getJSON("files").getString("url");

        File roF = new File(rootPath);
        if (!roF.exists()) {
            roF.mkdirs();
        }
        String urlTemp = "images";
        for (int i = 0; i < arr.length; i++) {
            urlTemp += "/" + arr[i];
            File d = new File(rootPath + urlTemp);
            if (!d.exists()) {
                d.mkdirs();
            }

        }
        FileInputStream fileInputStream = new FileInputStream("");

        File f = new File(rootPath + "/images/" + url + "/" + nombre);
        BufferedImage image = ImageIO.read(fileInputStream);
        int w, h;
        double porc = 100;
        if (image.getWidth() > image.getHeight()) {
            if (image.getWidth() > 1024) {
                porc = 1024 * 100 / image.getWidth();
            }
        } else {
            if (image.getHeight() > 1024) {
                porc = 1024 * 100 / image.getHeight();
            }
        }
        w = (int) (image.getWidth() * (porc / 100));
        h = (int) (image.getHeight() * (porc / 100));
        Graphics2D g = image.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);

        g.drawImage(image, 0, 0, w, h, null);
        g.dispose();
        ImageIO.write(image.getSubimage(0, 0, w, h), "png", f);
        return nombre;
    }

    public static String guardar_file_(byte[] image, String nombre, String user_key, String tipe) throws IOException {
        String rootPath = Config.getJSON("files").getString("url");
        rootPath += user_key + "/" + tipe + "/";
        File file = new File(rootPath);
        if (!file.exists()) {
            file.mkdirs();
        }
        rootPath += nombre;
        file = new File(rootPath);
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(image);
        fos.close();
        return nombre;
    }

    public static String guardar_file_type(byte[] image, String nombre, String user_key, String tipe)
            throws IOException {
        String rootPath = Config.getJSON("files").getString(tipe);
        rootPath += user_key + "/";
        String arr[] = rootPath.split("/");
        File file = new File(rootPath);
        String urlTemp = "";
        for (int i = 0; i < arr.length; i++) {
            urlTemp += arr[i] + "/";
            File d = new File(urlTemp);
            if (!d.exists()) {
                boolean exito = d.mkdir();
                if (!exito) {
                    Files.createDirectory(Paths.get(urlTemp),
                            PosixFilePermissions.asFileAttribute(PosixFilePermissions.fromString("rwxr-x---")));
                }

            }

        }
        rootPath += nombre;
        file = new File(rootPath);
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(image);
        fos.close();
        return nombre;
    }

    public static String rezizeImage(String url, int width, int height) throws IOException {
        String arr[] = url.split("/");
        String newUrl = "";
        for (int i = 0; i < arr.length-1; i++) {
            newUrl = newUrl + "/"+arr[i];
        }
        String name = arr[arr.length-1].split("\\.")[0];
        String extencion = arr[arr.length-1].split("\\.")[1];
        newUrl=newUrl+"/"+name+"_small"+"."+extencion;
        File fileOriginal = new File(url);
        File f = new File(newUrl);
        FileInputStream fileInputStream = new FileInputStream(fileOriginal);
        
        BufferedImage image = ImageIO.read(fileInputStream);
        int w, h;
        double porc = 100;
        if (image.getWidth() > image.getHeight()) {
            if (image.getWidth() > width) {
                porc = width * 100 / image.getWidth();
            }
        } else {
            if (image.getHeight() > height) {
                porc = height * 100 / image.getHeight();
            }
        }
        w = (int) (image.getWidth() * (porc / 100));
        h = (int) (image.getHeight() * (porc / 100));
        Graphics2D g = image.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);

        g.drawImage(image, 0, 0, w, h, null);
        g.dispose();
        ImageIO.write(image.getSubimage(0, 0, w, h), "png", f);
        return url;
    }
}