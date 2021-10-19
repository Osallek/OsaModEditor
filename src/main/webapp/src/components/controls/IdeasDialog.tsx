import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { RootState } from "store/types";
import { Power } from "../../types";
import { localize } from "../../utils/localisations.utils";

interface Props {
  buttonKey: string;
  title: string;
  free: boolean;
  initialValue: Array<string>;
  onValidate: (ideas: Array<string>) => void;
}

const LoadButton = ({ title, buttonKey, free, initialValue = [], onValidate }: Props) => {
  const intl = useIntl();

  const { sortedIdeaGroups, technologies } = useSelector((state: RootState) => {
    return state.game || {};
  });

  const nbGroups = Math.max.apply(
    Math,
    technologies[Power.ADM]
      .filter((tech) => tech.modifiers && tech.modifiers.modifiers && tech.modifiers.modifiers["allowed_idea_groups"])
      .map((tech) =>
        tech.modifiers && tech.modifiers.modifiers && tech.modifiers.modifiers["allowed_idea_groups"] ? tech.modifiers.modifiers["allowed_idea_groups"] : 0
      )
  );
  const [open, setOpen] = useState<boolean>(false);
  const [selectedIdeas, setSelectedIdeas] = useState<Array<string>>(
    initialValue.map((value) => {
      return `${value}`;
    }) ?? []
  );

  const reset = () => {
    setSelectedIdeas(
      initialValue.map((value) => {
        return `${value}`;
      }) ?? []
    );
  };

  let selects = [];
  for (let i = 0; i < nbGroups; i++) {
    selects.push(
      <FormControl style={{ marginBottom: 8, marginTop: 8, width: "100%" }}>
        <InputLabel>{intl.formatMessage({ id: "global.ideaGroup" }) + " " + (i + 1)}</InputLabel>
        <Select
          label={intl.formatMessage({ id: "global.ideaGroup" }) + " " + (i + 1)}
          value={selectedIdeas[i] ?? ""}
          onChange={(event) => {
            const copy = [...selectedIdeas];
            copy[i] = event.target.value;
            setSelectedIdeas(copy);
          }}
        >
          {sortedIdeaGroups
            .filter((group) => {
              if (free) {
                return group.free === free;
              } else {
                return group.free === null || !group.free;
              }
            })
            .filter((group) => selectedIdeas[i] === group.name || !selectedIdeas.includes(group.name))
            .map((group) => (
              <MenuItem value={group.name} key={group.name}>
                {localize(group)}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
          reset();
        }}
      >
        {intl.formatMessage({ id: buttonKey })}
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={(event) => setOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      >
        <DialogTitle>{intl.formatMessage({ id: title })}</DialogTitle>
        <DialogContent>{selects}</DialogContent>
        <DialogActions style={{ padding: "16px 24px" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              setOpen(false);
              onValidate(selectedIdeas);
            }}
          >
            {intl.formatMessage({ id: "global.validate" })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoadButton;
