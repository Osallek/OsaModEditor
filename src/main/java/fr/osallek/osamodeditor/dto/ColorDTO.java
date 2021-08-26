package fr.osallek.eu4exporter.objects;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;

public class Color implements Serializable {

    private final int red;

    private final int green;

    private final int blue;

    public Color(int red, int green, int blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public Color(fr.osallek.eu4parser.model.Color color) {
        this.red = color.getRed();
        this.green = color.getGreen();
        this.blue = color.getBlue();
    }

    public Color(java.awt.Color color) {
        this.red = color.getRed();
        this.green = color.getGreen();
        this.blue = color.getBlue();
    }

    @JsonIgnore
    public int getRed() {
        return red;
    }

    @JsonIgnore
    public int getGreen() {
        return green;
    }

    @JsonIgnore
    public int getBlue() {
        return blue;
    }

    @JsonGetter("rgb")
    public List<Integer> rgb() {
        return List.of(this.red, this.green, this.blue);
    }

    @JsonGetter("hex")
    public String hex() {
        return String.format("#%02X%02X%02X", this.red, this.green, this.blue);
    }

    @JsonIgnore
    public java.awt.Color toColor() {
        return new java.awt.Color(getRed(), getGreen(), getBlue());
    }
}
