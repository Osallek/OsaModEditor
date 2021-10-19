package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.game.Modifiers;
import fr.osallek.osamodeditor.common.Constants;
import org.apache.commons.collections4.MapUtils;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class ModifiersDTO {

    private Set<String> enables;

    private Map<String, Double> modifiers;

    public ModifiersDTO(Modifiers modifiers) {
        this.enables = modifiers.getEnables();

        if (MapUtils.isNotEmpty(modifiers.getModifiers())) {
            this.modifiers = modifiers.getModifiers()
                                      .entrySet()
                                      .stream()
                                      .collect(Collectors.toMap(entry -> Constants.cleanModifierName(entry.getKey().getName()), Map.Entry::getValue));
        }
    }

    public Set<String> getEnables() {
        return enables;
    }

    public void setEnables(Set<String> enables) {
        this.enables = enables;
    }

    public Map<String, Double> getModifiers() {
        return modifiers;
    }

    public void setModifiers(Map<String, Double> modifiers) {
        this.modifiers = modifiers;
    }
}
