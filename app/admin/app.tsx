"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { UnitList } from "./unit/list";
import { UnitCreate } from "./unit/create";
import { UnitEdit } from "./unit/edit";
import { LessonList } from "./lesson/list";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";
import { ChallengeList } from "./challenge/list";
import { ChallengeCreate } from "./challenge/create";
import { Challenge } from "../lesson/challenge";
import { ChallengeOptionList } from "./challengeOption/list";
import { ChallengeOptionCreate } from "./challengeOption/create";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeEdit } from "./challenge/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation={"title"}
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />
      <Resource
        name="units"
        recordRepresentation={"title"}
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />
      <Resource
        name="lessons"
        recordRepresentation={"title"}
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />
      <Resource
        name="challenges"
        recordRepresentation={"question"}
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />
      <Resource
        name="challengeOptions"
        recordRepresentation={"title"}
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
      />
    </Admin>
  );
};

export default App;
