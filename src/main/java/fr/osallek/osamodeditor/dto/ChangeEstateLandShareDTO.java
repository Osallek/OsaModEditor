package fr.osallek.osamodeditor.dto;

import fr.osallek.eu4parser.model.game.ChangeEstateLandShare;

public class ChangeEstateLandShareDTO {

    private String estate;

    private Double share;

    public ChangeEstateLandShareDTO(ChangeEstateLandShare changeEstateLandShare) {
        this.estate = changeEstateLandShare.getEstateName();
        this.share = changeEstateLandShare.getShare();
    }

    public String getEstate() {
        return estate;
    }

    public void setEstate(String estate) {
        this.estate = estate;
    }

    public Double getShare() {
        return share;
    }

    public void setShare(Double share) {
        this.share = share;
    }
}
