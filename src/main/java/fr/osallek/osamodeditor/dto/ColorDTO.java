package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

public class ColorDTO {

    private final int red;

    private final int green;

    private final int blue;

    private final boolean fake;

    public ColorDTO(int color, boolean fake) {
        this.red = color >> 16 & 0xFF;
        this.green = color >> 8 & 0xFF;
        this.blue = color & 0xFF;
        this.fake = fake;
    }

    public ColorDTO(String s, boolean fake) {
        this(s.toUpperCase().hashCode() % 0xFFFFFF, fake);
    }

    public ColorDTO(int red, int green, int blue, boolean fake) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.fake = fake;
    }

    public ColorDTO(fr.osallek.eu4parser.model.Color color) {
        this.red = color.getRed();
        this.green = color.getGreen();
        this.blue = color.getBlue();
        this.fake = false;
    }

    public ColorDTO(java.awt.Color color, boolean fake) {
        this.red = color.getRed();
        this.green = color.getGreen();
        this.blue = color.getBlue();
        this.fake = fake;
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

    public boolean isFake() {
        return fake;
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
