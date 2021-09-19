package fr.osallek.osamodeditor.form;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class SimpleMapActionForm {

    @JsonProperty(required = true)
    private List<Integer> provinces;

    @JsonProperty(required = true)
    private String target;

    public SimpleMapActionForm() {
    }

    public SimpleMapActionForm(List<Integer> provinces, String target) {
        this.provinces = provinces;
        this.target = target;
    }

    public List<Integer> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Integer> provinces) {
        this.provinces = provinces;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }
}
