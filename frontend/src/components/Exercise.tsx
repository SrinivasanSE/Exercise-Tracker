import React from "react";
import { RouteComponentProps } from "react-router";
import { Exercise } from "../axios/apis";
import moment from "moment";
import Styles from "./styles.module.css";
interface MatchParams {
  id: string;
}

interface ComponentProps extends RouteComponentProps<MatchParams> {
  exercise: Exercise;
  deleteExercise: (id: string) => void;
}

const ExerciseComp: React.FC<ComponentProps> = (props: ComponentProps) => {
  const { userName, description, duration, date, _id } = props.exercise;
  return (
    <div className="col-sm-12 col-md-4 mb-4">
      <div className="card h-100 mt-5 ">
        <div className="card-body">
          <h5 className={`card-title text-center ${Styles.cardWrap}`}>
            {description}
          </h5>
          <p className="card-text text-center">
            Duration:{" "}
            <span className="badge badge-pill badge-success">
              {duration} min
            </span>
          </p>
          <div className="row justify-content-between">
            <div className="col-auto">
              <button
                className="btn btn-primary"
                onClick={() => props.history.push(`/edit/${_id}`)}
              >
                Edit
              </button>
            </div>
            <div className="col-auto">
              <button
                className={`btn btn-primary`}
                onClick={() => props.deleteExercise(_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <small className="text-muted">
            Created by {userName} at{" "}
            {moment(date).format("MMM D,YYYY, hh:mm A")}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComp;
