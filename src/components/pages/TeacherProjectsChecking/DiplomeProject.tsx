import React, {FC, useEffect, useRef, useState} from 'react';
import {IGraduationProject} from "../CourseList/DiplomeElement";
import {Accordion, Button, Dropdown} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import CircularProgress from "@mui/material/CircularProgress";
import UserStore, {IUser} from "../../../mobx/stores/user.store";
import s from './TeacherProjectsCheckking.module.sass'
import DiplomeService from "../../../mobx/services/diplom.service";
import EditDiplomeModal from "./EditDiplomeModal";
import DiplomeStage from "./DiplomeStage";

const DiplomeProject: FC<IGraduationProject> = ({id, user_student_id, percent_of_completion, theme, pattern_of_education, stages}) => {
    const [user_student, setUserStudent] = useState<IUser>()
    const [isModalDiplomeEditShow, setIsModalDiplomeEditShow] = useState(false);


    useEffect(() => {
        UserStore.getUserById(String(user_student_id)).then(data => setUserStudent(data))
    },[])

    const handleSetIsDone = (stage_id: number) => {
        if (stage_id != undefined){
            DiplomeService.setIsDoneForStage(stage_id).then(data => console.log(data.data))
        }
    }

    const {current: handleOpenModal} = useRef(() => {
        setIsModalDiplomeEditShow(true)
    })

    const {current: handleCloseModal} = useRef(() => {
        setIsModalDiplomeEditShow(false)
    })

    return (
        <div>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <CircularProgress variant="determinate" value={percent_of_completion != undefined? (percent_of_completion * 100) : (percent_of_completion)} />
                            <div className={s.title_diplome}>
                                <div>
                                    Тема: {theme}
                                </div>
                                <div className={s.title_diplome__name}>
                                    Студнент: {user_student?.name} {user_student?.surname}
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className={s.title_diplome}>
                                <div>
                                    Методические указания:
                                </div>
                                <div>
                                    <button type="button" className="btn btn-default" onClick={() => setIsModalDiplomeEditShow(true)}>
                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                            {stages?.map(stage => (
                                <DiplomeStage
                                    id={stage.id}
                                    graduation_project_id={stage.graduation_project_id}
                                    title={stage.title}
                                    description={stage.description}
                                    is_done={stage.is_done}
                                    deadline_date={stage.deadline_date}
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            <EditDiplomeModal
                isModalOpened={isModalDiplomeEditShow}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                id={id}
                updateGraduationProject={{
                    user_student_id: user_student_id,
                    percent_of_completion: percent_of_completion,
                    pattern_of_education: pattern_of_education,
                    theme: theme,
                }}
            />
        </div>
    );
};

export default DiplomeProject;
