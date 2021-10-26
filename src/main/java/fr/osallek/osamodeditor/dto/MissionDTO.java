package fr.osallek.osamodeditor.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.osallek.eu4parser.model.game.Mission;
import fr.osallek.eu4parser.model.game.localisation.Eu4Language;
import fr.osallek.eu4parser.model.game.localisation.Localisation;
import org.apache.commons.collections4.CollectionUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class MissionDTO extends LocalisedDTO implements MappedDTO<String> {

    private String name;

    private String icon;

    private String iconFile;

    private Integer position;

    private Boolean isGeneric;

    private LocalDate completedBy;

    private List<String> requiredMissions;

    private String missionsTree;

    public MissionDTO(Mission mission, Map<String, Map<Eu4Language, Localisation>> localisations) {
        super(mission.getName() + "_title", localisations);
        this.name = mission.getName();
        this.icon = mission.getIcon();
        this.iconFile = mission.getIconPath("png").toString();
        this.position = mission.getPosition();
        this.isGeneric = mission.isGeneric();
        this.completedBy = mission.getCompletedBy();
        this.requiredMissions = CollectionUtils.isEmpty(mission.getRequiredMissions()) ? null : mission.getRequiredMissions()
                                                                                                       .stream()
                                                                                                       .filter(Objects::nonNull)
                                                                                                       .map(Mission::getName)
                                                                                                       .collect(Collectors.toList());
        this.missionsTree = mission.getMissionsTree().getName();
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getIconFile() {
        return iconFile;
    }

    public void setIconFile(String iconFile) {
        this.iconFile = iconFile;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Boolean getGeneric() {
        return isGeneric;
    }

    public void setGeneric(Boolean generic) {
        isGeneric = generic;
    }

    public LocalDate getCompletedBy() {
        return completedBy;
    }

    public void setCompletedBy(LocalDate completedBy) {
        this.completedBy = completedBy;
    }

    public List<String> getRequiredMissions() {
        return requiredMissions;
    }

    public void setRequiredMissions(List<String> requiredMissions) {
        this.requiredMissions = requiredMissions;
    }

    public String getMissionsTree() {
        return missionsTree;
    }

    public void setMissionsTree(String missionsTree) {
        this.missionsTree = missionsTree;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return name;
    }
}
