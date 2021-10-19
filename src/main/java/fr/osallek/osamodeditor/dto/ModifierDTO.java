package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.game.Modifier;
import fr.osallek.eu4parser.model.game.ModifierScope;
import fr.osallek.eu4parser.model.game.ModifierType;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.osamodeditor.common.Constants;

import java.util.Map;

public class ModifierDTO extends LocalisedDTO implements MappedDTO<String> {

    private String id;

    private ModifierType type;

    private ModifierScope scope;

    public ModifierDTO(Modifier modifier, Map<Eu4Language, Map<String, String>> localisations) {
        super(localisations, modifier.getName(), Constants.modifierToLocalisationKeys(modifier.getName()));
        this.id = modifier.getName();
        this.type = modifier.getType();
        this.scope = modifier.getScope();
    }

    @Override
    public String getKey() {
        return this.id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ModifierType getType() {
        return type;
    }

    public void setType(ModifierType type) {
        this.type = type;
    }

    public ModifierScope getScope() {
        return scope;
    }

    public void setScope(ModifierScope scope) {
        this.scope = scope;
    }
}
