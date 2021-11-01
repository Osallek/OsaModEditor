package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;
import java.util.Map;

public class ModdedKeyLocalisedDTO extends KeyLocalisedDTO {

    private boolean modded;

    public ModdedKeyLocalisedDTO(String name, Map<String, Map<Eu4Language, Localisation>> localisations, boolean modded) {
        super(name, localisations);
        this.modded = modded;
    }

    public ModdedKeyLocalisedDTO(String name, Map<String, Map<Eu4Language, Localisation>> localisations, boolean keyAsDefault, boolean modded) {
        super(name, localisations, keyAsDefault);
        this.modded = modded;
    }

    public ModdedKeyLocalisedDTO(String key, String name, Map<String, Map<Eu4Language, Localisation>> localisations, boolean modded) {
        super(key, name, localisations);
        this.modded = modded;
    }

    public boolean isModded() {
        return modded;
    }

    public void setModded(boolean modded) {
        this.modded = modded;
    }
}
