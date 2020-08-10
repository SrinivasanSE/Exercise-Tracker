import React, { useEffect, useState } from "react";
import { getExercises, deleteExercise, Exercise } from "../axios/apis";
import { RouteComponentProps } from "react-router-dom";
import ExerciseComp from "./Exercise";

interface MatchParams {
  id: string;
}

interface ComponentProps extends RouteComponentProps<MatchParams> {}

const ExerciseList: React.FC<ComponentProps> = (props: ComponentProps) => {
  const [list, setList] = useState<Exercise[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const fetchExercises = async () => {
    const res = await getExercises();
    setList(res);
  };

  const delExercise = async (id: string) => {
    setIsDelete(true);
    await deleteExercise(id);
    setIsDelete(false);
  };
  useEffect(() => {
    fetchExercises();
  }, [isDelete]);
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        {list.map((exercise: Exercise) => (
          <ExerciseComp
            key={exercise._id}
            exercise={exercise}
            deleteExercise={delExercise}
            {...props}
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
