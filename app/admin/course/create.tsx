import { Create, SimpleForm, TextInput, required } from "react-admin";

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} label="Title" source="title" />
        <TextInput
          validate={[required()]}
          label="Image Source"
          source="imageSrc"
        />
      </SimpleForm>
    </Create>
  );
};
