package fr.osallek.osamodeditor.dto;

import java.time.LocalDate;
import java.util.List;

public class MissionEditDTO {

    private Integer position;

    private Boolean isGeneric;

    private String icon;

    private LocalDate completedBy;

    private List<String> requiredMissions;

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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
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
}
