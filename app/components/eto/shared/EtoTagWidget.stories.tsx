import { action, configureActions } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Form, Formik } from "formik";
import * as React from "react";

import { formWrapper } from "../../shared/forms/formField/form-utils";
import { EtoTagWidget, generateTagOptions } from "./EtoTagWidget";

const tagList = ["Science", "Technology", "Blockchain", "Medical", "Research"];

storiesOf("TagsFormWidget", module)
  .add(
    "Empty",
    formWrapper({ tags: [] })(() => (
      <EtoTagWidget selectedTagsLimit={5} options={generateTagOptions(tagList)} name="tags" />
    )),
  )
  .add(
    "Already Tags",
    formWrapper({ tags: ["Fintech", "Black Magic"] })(() => (
      <EtoTagWidget selectedTagsLimit={5} options={generateTagOptions(tagList)} name="tags" />
    )),
  );
