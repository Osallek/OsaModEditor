package fr.osallek.osamodeditor.form;

import java.time.LocalDate;
import java.util.List;

public class MapActionForm extends SimpleMapActionForm {

    private LocalDate date;

    public MapActionForm() {
    }

    public MapActionForm(List<Integer> provinces, String target, LocalDate date) {
        super(provinces, target);
        this.date = date;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

}
