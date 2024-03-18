import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";
import { Quiz } from "../quiz";

const LessonIdPage = async ({ params }: { params: { lessonId: number } }) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !lesson) redirect("/learn");

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialHearts={userProgress.hearts}
      initialLessonChallenges={lesson.challenges}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default LessonIdPage;
