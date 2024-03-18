import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput validate={[required()]} label="Course ID" source="id" />
        <TextInput validate={[required()]} label="Title" source="title" />
        <TextInput
          validate={[required()]}
          label="Image Source"
          source="imageSrc"
        />
      </SimpleForm>
    </Edit>
  );
};
