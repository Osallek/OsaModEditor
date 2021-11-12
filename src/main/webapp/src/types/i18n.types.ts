import { MessageDescriptor } from "@formatjs/intl/src/types";
import { FormatXMLElementFn, PrimitiveType } from "intl-messageformat";
import { Options as IntlMessageFormatOptions } from "intl-messageformat/src/core";

export type FormatMessage = {
  descriptor: MessageDescriptor;
  values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>;
  opts?: IntlMessageFormatOptions;
};
