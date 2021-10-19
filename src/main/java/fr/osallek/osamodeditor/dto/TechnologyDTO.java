package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.Power;
import fr.osallek.eu4parser.model.game.Technology;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;

import java.util.Comparator;
import java.util.Map;

public class TechnologyDTO extends LocalisedDTO implements Comparable<TechnologyDTO> {

    private int number;

    private Power type;

    private int year;

    private ModifiersDTO modifiers;

    public TechnologyDTO(Technology technology, Map<Eu4Language, Map<String, String>> localisations) {
        super(technology.getType().toString().toLowerCase() + "_tech_cs_" + technology.getNumber() + "_name", localisations);
        this.number = technology.getNumber();
        this.type = technology.getType();
        this.year = technology.getYear();
        this.modifiers = new ModifiersDTO(technology.getModifiers());
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Power getType() {
        return type;
    }

    public void setType(Power type) {
        this.type = type;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public ModifiersDTO getModifiers() {
        return modifiers;
    }

    public void setModifiers(ModifiersDTO modifiers) {
        this.modifiers = modifiers;
    }

    @Override
    public int compareTo(TechnologyDTO o) {
        return Comparator.comparingInt(TechnologyDTO::getNumber).compare(this, o);
    }

    @Override
    @JsonIgnore
    public String toString() {
        return type + " " + number + " (" + year + ')';
    }
}
