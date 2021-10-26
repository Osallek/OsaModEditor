package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.Power;
import fr.osallek.eu4parser.model.game.IdeaGroup;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class IdeaGroupDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private Power category;

    private Boolean free;

    private ModifiersDTO start;

    private ModifiersDTO bonus;

    private Map<String, ModifiersDTO> ideas;

    public IdeaGroupDTO(IdeaGroup ideaGroup, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(ideaGroup.getName(), localisations);
        this.name = ideaGroup.getName();
        this.category = ideaGroup.getCategory();
        this.free = ideaGroup.isFree();
        this.start = new ModifiersDTO(ideaGroup.getStart());
        this.bonus = new ModifiersDTO(ideaGroup.getBonus());
        this.ideas = ideaGroup.getIdeas()
                              .entrySet()
                              .stream()
                              .collect(Collectors.toMap(Map.Entry::getKey, entry -> new ModifiersDTO(entry.getValue()), (a, b) -> b, LinkedHashMap::new));
    }

    @Override
    @JsonIgnore
    public String getKey() {
        return this.name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Power getCategory() {
        return category;
    }

    public void setCategory(Power category) {
        this.category = category;
    }

    public Boolean getFree() {
        return free;
    }

    public void setFree(Boolean free) {
        this.free = free;
    }

    public ModifiersDTO getStart() {
        return start;
    }

    public void setStart(ModifiersDTO start) {
        this.start = start;
    }

    public ModifiersDTO getBonus() {
        return bonus;
    }

    public void setBonus(ModifiersDTO bonus) {
        this.bonus = bonus;
    }

    public Map<String, ModifiersDTO> getIdeas() {
        return ideas;
    }

    public void setIdeas(Map<String, ModifiersDTO> ideas) {
        this.ideas = ideas;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}
