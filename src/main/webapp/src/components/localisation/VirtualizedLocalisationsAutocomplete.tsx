import { ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useIntl } from "react-intl";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import { KeyLocalizations } from "types";

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

interface Props {
  values: Array<KeyLocalizations>;
  onChange: (keyLocalizations: KeyLocalizations | null) => void;
}

export function VirtualizedLocalizationsAutocomplete({ values, onChange }: Props) {
  const intl = useIntl();

  function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const dataSet = data[index];

    return (
      <ListItem {...dataSet.props} style={style} key={index}>
        <ListItemButton>
          <ListItemText primary={dataSet.key} />
        </ListItemButton>
      </ListItem>
    );
  }

  const OuterElementContext = React.createContext({});

  const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemCount = (children as React.ReactChild[]).length;
    const itemSize = 40;

    const getHeight = () => {
      if (itemCount > 10) {
        return 10 * itemSize;
      }

      return itemCount * itemSize;
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={children}
            height={getHeight() + 16}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => itemSize}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });

  return (
    <Autocomplete
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      style={{ minWidth: "300px" }}
      disableListWrap
      options={values ?? []}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      renderInput={(params) => <TextField {...params} variant="outlined" label={intl.formatMessage({ id: "global.search" })} />}
    />
  );
}
