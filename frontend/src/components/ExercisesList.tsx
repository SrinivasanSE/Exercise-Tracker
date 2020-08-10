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
  const [loading, setLoading] = useState<boolean>(true);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const fetchExercises = async () => {
    const res = await getExercises();
    setList(res);
    setLoading(false);
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
        {list.length > 0 ? (
          list.map((exercise: Exercise) => (
            <ExerciseComp
              key={exercise._id}
              exercise={exercise}
              deleteExercise={delExercise}
              {...props}
            />
          ))
        ) : !loading ? (
          <div className="d-flex justify-content-center align-content-center mt-5">
            No Exercise Available!
          </div>
        ) : (
          <div className="d-flex justify-content-center align-content-center mt-5">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseList;
