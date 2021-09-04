package fr.osallek.osamodeditor.dto;

import java.util.Objects;

public class IdName<I, N> {

    private I id;

    private N name;

    public IdName() {
    }

    public IdName(I id, N name) {
        this.id = id;
        this.name = name;
    }

    public static <I, N> IdName<I, N> of(I id, N name) {
        return new IdName<>(id, name);
    }

    public I getId() {
        return id;
    }

    public void setId(I id) {
        this.id = id;
    }

    public N getName() {
        return name;
    }

    public void setName(N name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof IdName)) {
            return false;
        }

        IdName<?, ?> idName = (IdName<?, ?>) o;
        return Objects.equals(id, idName.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
